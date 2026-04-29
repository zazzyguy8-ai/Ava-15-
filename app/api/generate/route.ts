import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import Stripe from "stripe";
import { getSession } from "@/lib/sessions";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const stripeSessionId = searchParams.get("stripe_session_id");

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-04-22.dahlia" });

  // Must come from Stripe checkout
  if (!stripeSessionId) return sseError("Missing session ID.");

  let answers: Record<string, string> = {};
  let isPaid = false;

  try {
    const checkout = await stripe.checkout.sessions.retrieve(stripeSessionId);

    // Verify payment directly via Stripe — no webhook needed
    isPaid = checkout.payment_status === "paid";

    if (!isPaid) return sseError("Payment not verified.");

    // 1. Try in-memory store first (fast, same server)
    const sessionId = checkout.metadata?.sessionId;
    if (sessionId) {
      const mem = getSession(sessionId);
      if (mem) {
        answers = JSON.parse(mem.answers);
      }
    }

    // 2. Fallback: reconstruct answers from Stripe metadata chunks
    if (Object.keys(answers).length === 0) {
      const meta = checkout.metadata ?? {};
      const chunks: string[] = [];
      for (let i = 0; meta[`ans${i}`]; i++) chunks.push(meta[`ans${i}`]);
      if (chunks.length > 0) {
        answers = JSON.parse(chunks.join(""));
      }
    }
  } catch (err) {
    console.error("Stripe error:", err);
    return sseError("Could not verify payment. Please refresh.");
  }

  if (Object.keys(answers).length === 0) {
    return sseError("Could not find your answers. Please retake the quiz.");
  }

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    async start(controller) {
      controller.enqueue(encoder.encode(": connected\n\n"));
      try {
        const response = await anthropic.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 4096,
          messages: [{ role: "user", content: buildPrompt(answers) }],
        });
        for await (const chunk of response) {
          if (chunk.type === "content_block_delta" && chunk.delta.type === "text_delta") {
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(chunk.delta.text)}\n\n`));
          }
        }
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        console.error("Generation error:", err);
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Generation failed." })}\n\n`));
        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function sseError(message: string) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(c) {
      c.enqueue(encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`));
      c.enqueue(encoder.encode("data: [DONE]\n\n"));
      c.close();
    },
  });
  return new Response(stream, {
    headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", "X-Accel-Buffering": "no" },
  });
}

function buildPrompt(a: Record<string, string>): string {
  return `You are ALVA, a warm women's health coach specializing in hormonal health for women aged 40–60.

Create a personalized 30-day plan for ${a.name || "her"}, aged ${a.age || "40–60"}.

Profile:
- Goal: ${a.main_goal || "improve overall health"}
- Energy: ${a.energy_level || "low energy"}
- Stress: ${a.stress_level || "moderate stress"}
- Sleep: ${a.sleep || "6–7 hours"}
- Exercise: ${a.exercise || "minimal"}
- Movement preference: ${a.workout_preference || "gentle movement"}
- Food struggle: ${a.diet_struggle || "unsure"}
- Diet: ${a.dietary_restrictions || "no restrictions"}
- Wake time: ${a.wake_time || "7am"}
- Life situation: ${a.work_situation || "working"}
- Past obstacles: ${a.past_attempts || "plans too complex"}
- Motivation: ${a.motivation || "motivated"}
- Ideal morning: ${a.ideal_morning || "peaceful"}

Structure:
# Welcome, ${a.name || ""}! Your 30-Day ALVA Plan
(Warm 2-sentence intro based on her profile)

## How to Use This Plan
(3 bullets)

## Week 1: Foundation (Days 1–7)
**Theme:** ...
### Morning Routine (15 min)
### Evening Routine (10 min)
### Nutrition Focus
### Energy Tip

## Week 2: Building Momentum (Days 8–14)
### Morning Routine Upgrade
### Evening Routine
### Nutrition Focus
### Stress & Mindset Tip

## Week 3: Deepening (Days 15–21)
### Morning Routine
### Evening Routine
### Nutrition Focus
### Hormonal Balance Tip

## Week 4: Integration (Days 22–30)
### Morning Routine
### Evening Routine
### Nutrition Focus
### Your Long-Term Vision

## Quick-Start Checklist
5 things she can do TODAY.

Write warmly, personally. Address her by name occasionally. Be specific, not generic. Keep it realistic.`;
}
