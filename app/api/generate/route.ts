import { NextRequest } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { getSession } from "@/lib/sessions";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  let answers: Record<string, string>;

  const answersEncoded = searchParams.get("a");
  if (answersEncoded) {
    try {
      const json = Buffer.from(decodeURIComponent(answersEncoded), "base64").toString("utf8");
      answers = JSON.parse(json);
    } catch {
      return sseError("Invalid answers data. Please retake the quiz.");
    }
  } else {
    // Legacy: session-ID-based lookup
    const sessionId = searchParams.get("s");
    if (!sessionId) return sseError("Missing session data.");
    const mem = getSession(sessionId);
    if (!mem) return sseError("Session not found or expired. Please retake the quiz.");
    answers = JSON.parse(mem.answers);
  }

  const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
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
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: "Generation failed. Check ANTHROPIC_API_KEY." })}\n\n`));
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
  return `You are ALVA, a deeply empathetic and expert women's health coach with 20 years of experience in hormonal health, holistic wellness, and lifestyle transformation for women aged 40–60.

You are creating a highly personalized, detailed 30-day health and lifestyle plan for ${a.name || "her"}, aged ${a.age || "40–60"}.

Her unique profile:
- Primary goal: ${a.main_goal || "improve overall health"}
- Current energy: ${a.energy_level || "low energy"}
- Stress level: ${a.stress_level || "moderate stress"}
- Sleep: ${a.sleep || "6–7 hours"} per night
- Current movement: ${a.exercise || "minimal"}
- Preferred movement style: ${a.workout_preference || "gentle movement"}
- Food relationship: ${a.diet_struggle || "unsure"}
- Dietary preferences: ${a.dietary_restrictions || "no restrictions"}
- Wake time: ${a.wake_time || "7am"}
- Daily schedule: ${a.work_situation || "working"}
- Past obstacles: ${a.past_attempts || "plans too complex"}
- Current motivation: ${a.motivation || "motivated"}
- Dream morning: ${a.ideal_morning || "peaceful and energized"}

Write her complete 30-day plan with this EXACT structure. Be specific, warm, and personal — use her name naturally. Every routine must be realistic and achievable. No generic advice — speak directly to HER situation.

# Welcome, ${a.name || "Beautiful"}! Your Personal 30-Day ALVA Journey

(Write 3 warm, personal sentences that show you truly understand her situation based on her profile. Mention her specific goal and acknowledge what she's been through.)

---

## How This Plan Works

(3 concise, encouraging bullets explaining how to use the plan)

---

## ✦ Week 1: Awakening (Days 1–7)

**This week's intention:** (one powerful sentence tailored to her biggest challenge)

### Morning Ritual — 15 Minutes
(Give a very specific, timed routine that matches her wake time and movement preference. Example: "6:45am — Before your feet touch the floor..." Include exact timings for each step. Make it feel luxurious, not like a chore.)

### Evening Wind-Down — 10 Minutes
(A specific calming routine that addresses her stress level and sleep issues. Make it feel like self-care.)

### This Week's Nourishment Focus
(One simple, joyful food addition or swap. NO restriction language. Respect her dietary preferences. Make it sound delicious.)

### Your Energy Secret This Week
(One counterintuitive, specific tip for her exact energy pattern. Not generic "drink more water".)

---

## ✦ Week 2: Building Your Rhythm (Days 8–14)

**This week's intention:** (progression from week 1)

### Morning Ritual — 15 Minutes
(Slight, satisfying upgrade from Week 1. Keep the same structure she loves, add one new element.)

### Evening Wind-Down — 10 Minutes
(Deepen the practice. Add one new element.)

### Nourishment Focus
(New weekly focus. Build on Week 1.)

### Stress & Inner Peace Tip
(Specific, practical advice for her exact stress triggers.)

---

## ✦ Week 3: The Transformation Point (Days 15–21)

**This week's intention:** (this is where real change happens)

### Morning Ritual — 15 Minutes
(Continue the beautiful progression.)

### Evening Wind-Down — 10 Minutes
(The practice deepens.)

### Nourishment Focus
(Week 3 focus — building on previous weeks.)

### Hormonal Harmony Tip
(One specific, science-backed tip for women 40–60. Address the hormonal changes happening in her body and how this tip helps.)

---

## ✦ Week 4: Your New Normal (Days 22–30)

**This week's intention:** Making this her life, not just a program

### Morning Ritual — 15 Minutes
(The final, refined version of her morning routine — one she'll want to keep forever.)

### Evening Wind-Down — 10 Minutes
(Her signature evening ritual.)

### Nourishment Philosophy
(Not a "focus" — a sustainable, joyful approach to eating she can carry forward.)

### A Letter to Your Future Self
(Write a warm, specific, emotional paragraph about what her life can look and feel like after 30 days if she follows this plan. Reference her specific goals and dreams. Make her feel genuinely hopeful and excited.)

---

## ✦ Start Today — Your First 5 Steps

(5 very specific, immediate actions she can take in the next 24 hours. Number them. Make them tiny and easy. First one should take under 2 minutes.)

---

Write in a warm, intimate tone — like a trusted friend who happens to be an expert. Use her name 4–5 times naturally throughout. The plan should feel like it was written specifically for her, not copied from a template. Total length: thorough but not overwhelming.`;
}
