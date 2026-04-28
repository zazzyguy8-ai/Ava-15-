import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { Redis } from "@upstash/redis";
import Stripe from "stripe";

export async function GET(req: NextRequest) {
  const redis = Redis.fromEnv();
  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-04-22.dahlia" });
  const { searchParams } = new URL(req.url);
  const stripeSessionId = searchParams.get("stripe_session_id");
  const directSessionId = searchParams.get("s");

  let sessionId: string | null = null;

  if (stripeSessionId) {
    try {
      const checkoutSession = await stripe.checkout.sessions.retrieve(stripeSessionId);
      sessionId = checkoutSession.metadata?.sessionId ?? null;
      if (!sessionId) {
        return sseError("Invalid checkout session.");
      }
    } catch {
      return sseError("Could not verify payment.");
    }
  } else if (directSessionId) {
    sessionId = directSessionId;
  }

  if (!sessionId) {
    return sseError("Missing session ID.");
  }

  // Check Redis paid flag first (set by webhook)
  let paid = await redis.get(`session:${sessionId}:paid`);

  // Fallback: verify directly with Stripe if webhook hasn't fired yet
  if (!paid && stripeSessionId) {
    try {
      const session = await stripe.checkout.sessions.retrieve(stripeSessionId);
      if (session.payment_status === "paid") {
        paid = "true";
        // Cache in Redis so future requests are instant
        await redis.set(`session:${sessionId}:paid`, "true", { ex: 86400 * 7 });
      }
    } catch {
      // ignore — will fail below with proper error
    }
  }

  if (!paid) {
    return sseError("Payment not verified. Please complete payment first.");
  }

  const answersRaw = await redis.get(`session:${sessionId}`);
  if (!answersRaw) {
    return sseError("Session expired. Please retake the quiz.");
  }

  const answers = typeof answersRaw === "string" ? JSON.parse(answersRaw) : answersRaw;

  const prompt = buildPrompt(answers);

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      // Send immediate heartbeat — flushes nginx buffer and confirms connection
      controller.enqueue(encoder.encode(": connected\n\n"));

      try {
        const response = await anthropic.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 4096,
          messages: [{ role: "user", content: prompt }],
        });

        for await (const chunk of response) {
          if (
            chunk.type === "content_block_delta" &&
            chunk.delta.type === "text_delta"
          ) {
            const text = chunk.delta.text;
            controller.enqueue(encoder.encode(`data: ${JSON.stringify(text)}\n\n`));
          }
        }

        controller.enqueue(encoder.encode("data: [DONE]\n\n"));
        controller.close();
      } catch (err) {
        console.error("Generation error:", err);
        controller.enqueue(encoder.encode("data: [ERROR]\n\n"));
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
      "X-Accel-Buffering": "no",   // disables nginx buffering on Render
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function sseError(message: string) {
  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: message })}\n\n`));
      controller.enqueue(encoder.encode("data: [DONE]\n\n"));
      controller.close();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      "X-Accel-Buffering": "no",
    },
  });
}

function buildPrompt(answers: Record<string, string>): string {
  const name = answers.name || "there";
  const age = answers.age || "40–60";
  const goal = answers.main_goal || "improve overall health";
  const energy = answers.energy_level || "low energy";
  const stress = answers.stress_level || "moderate stress";
  const sleep = answers.sleep || "6–7 hours";
  const exercise = answers.exercise || "minimal";
  const movement = answers.workout_preference || "gentle movement";
  const dietStruggle = answers.diet_struggle || "unsure";
  const diet = answers.dietary_restrictions || "no restrictions";
  const wakeTime = answers.wake_time || "7am";
  const workSituation = answers.work_situation || "working";
  const pastAttempts = answers.past_attempts || "plans too complex";
  const motivation = answers.motivation || "motivated";
  const idealMorning = answers.ideal_morning || "peaceful";

  return `You are ALVA, a warm and experienced women's health coach specializing in hormonal health, energy, and wellness for women aged 40–60.

You are creating a personalized 30-day health and lifestyle plan for ${name}, aged ${age}.

Her profile:
- Main goal: ${goal}
- Current energy: ${energy}
- Stress level: ${stress}
- Sleep: ${sleep} per night
- Current exercise: ${exercise}
- Preferred movement: ${movement}
- Food struggle: ${dietStruggle}
- Dietary preferences: ${diet}
- Wake time: ${wakeTime}
- Life situation: ${workSituation}
- Past obstacles: ${pastAttempts}
- Motivation level: ${motivation}
- Ideal/current morning: ${idealMorning}

Create her personalized 30-day plan. Structure it as follows:

# Welcome, ${name}! Your 30-Day ALVA Plan

Write a warm 2-sentence personal introduction based on her profile.

## How to Use This Plan
Brief 3-bullet guide on how to follow the plan.

## Week 1: Foundation (Days 1–7)
**Theme:** [relevant theme based on her goals]

### Your Daily Morning Routine (15 min)
Give a specific, timed morning routine (e.g., 3 min breathing, 7 min movement, 5 min journaling). Make it match her wake time and movement preference.

### Your Daily Evening Routine (10 min)
A calming wind-down routine tailored to her stress level and sleep struggles.

### This Week's Nutrition Focus
One simple, non-restrictive food swap or addition. No calorie counting. Respect her dietary preferences.

### This Week's Energy Tip
One practical tip tailored to her energy pattern.

## Week 2: Building Momentum (Days 8–14)
**Theme:** [relevant progression]

### Morning Routine Upgrade
Slightly progress from Week 1 — keep it 15 min max.

### Evening Routine
Refine or deepen the wind-down practice.

### Nutrition Focus
A new simple focus for this week.

### Stress & Mindset Tip
Practical advice tailored to her stress level.

## Week 3: Deepening (Days 15–21)
**Theme:** [relevant deepening]

### Morning Routine
Continue progression.

### Evening Routine
Deepen the practice.

### Nutrition Focus
Week 3 focus.

### Hormonal Balance Tip
One tip specifically for women 40–60 (hormones, metabolism, sleep connection).

## Week 4: Integration (Days 22–30)
**Theme:** Sustaining what works

### Morning Routine
The fully evolved routine she can keep forever.

### Evening Routine
Her personalized wind-down ritual.

### Nutrition Focus
Simple sustainable approach going forward.

### Your Long-Term Vision
A warm, encouraging paragraph about what life can look and feel like after 30 days.

## Your Quick-Start Checklist
5 simple things she can do TODAY to begin.

---
Write in a warm, personal, encouraging tone. Address her by name occasionally. Be specific — no generic advice. Keep routines realistic and achievable. Never use the word "just" in a dismissive way. Total length: comprehensive but digestible.`;
}
