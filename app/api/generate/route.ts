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
          max_tokens: 8000,
          system: buildSystem(),
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
        const msg = err instanceof Error ? err.message : String(err);
        controller.enqueue(encoder.encode(`data: ${JSON.stringify({ error: msg })}\n\n`));
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

function buildSystem(): string {
  return `You are ALVA — a women's functional health specialist combining 20 years of clinical experience in hormonal medicine, circadian biology, nutritional science, and behavioral psychology. You have helped thousands of women aged 40–60 transform their health during the most hormonally complex decade of their lives.

Your expertise:
- Perimenopause and menopause physiology: declining estrogen, progesterone fluctuations, cortisol dysregulation, insulin resistance
- Circadian rhythm optimization: cortisol awakening response, sleep architecture in midlife, light-dark cycle effects
- Mitochondrial health: why energy drops after 40 and exactly how to reverse it
- HPA axis regulation: how chronic stress physically damages the body of a woman over 40 differently than younger women
- Habit neuroscience: how to build habits that survive real life — not just perfect days
- Somatic approaches: body-based stress release that actually works for a busy woman

Your communication style:
- Warm, direct, honest — like a brilliant friend who happens to be a doctor
- You explain the science in 1 sentence, then give the action
- You never give generic advice. You speak to THIS woman's exact situation.
- You write with the intimacy of a private consultation, not a wellness blog
- You are not afraid to say "most plans fail because they do X — we are not doing X"

CRITICAL RULES:
- Every time recommendation must use her EXACT wake time as the anchor
- Every routine step must have an exact duration in minutes
- Every nutrition suggestion must respect her dietary restrictions completely
- Movement recommendations must match her current fitness level exactly — never push beyond it
- If she said past plans were "too complicated" — every step must take under 2 minutes to understand
- Never use the word "journey" as a filler. Never write "listen to your body" without explaining what to listen for.
- The plan must feel like it was written after a 2-hour consultation, not generated from a template`;
}

function buildPrompt(a: Record<string, string>): string {
  const name = a.name || "Beautiful";
  const age = a.age || "40–60";
  const goal = a.main_goal || "improve overall health";
  const energy = a.energy_level || "inconsistent energy";
  const stress = a.stress_level || "moderate stress";
  const sleep = a.sleep || "6–7 hours";
  const exercise = a.exercise || "minimal movement";
  const movement = a.workout_preference || "gentle movement";
  const dietStruggle = a.diet_struggle || "unsure about food";
  const diet = a.dietary_restrictions || "no restrictions";
  const wakeTime = a.wake_time || "7am";
  const schedule = a.work_situation || "working";
  const pastObstacle = a.past_attempts || "plans too complex";
  const motivation = a.motivation || "motivated";
  const idealMorning = a.ideal_morning || "peaceful and energized";

  // Calculate specific times based on wake time
  const wakeHour = wakeTime.includes("6") ? "6" : wakeTime.includes("7") ? "7" : wakeTime.includes("8") ? "8" : "7";
  const wakeLabel = wakeTime.includes("Before 6") ? "5:45" : wakeTime.includes("6–7") ? "6:30" : wakeTime.includes("7–8") ? "7:15" : wakeTime.includes("After 8") ? "8:30" : "7:00";
  const t = (addMin: number) => {
    const [h, m] = wakeLabel.split(":").map(Number);
    const total = h * 60 + m + addMin;
    const hh = Math.floor(total / 60);
    const mm = total % 60;
    return `${hh}:${mm.toString().padStart(2, "0")}`;
  };

  return `Create a complete, deeply personalized 30-day wellness plan for ${name}, aged ${age}.

CRITICAL CONTEXT — read every line before writing a single word:
- Her #1 goal: ${goal}
- Energy pattern: ${energy}
- Stress reality: ${stress}
- Sleep: ${sleep} per night — this tells you about her cortisol and sleep architecture
- Current movement: ${exercise}
- Movement she'll actually do: ${movement}
- Her relationship with food: ${dietStruggle}
- Dietary needs: ${diet} — NEVER violate this
- She wakes at: ${wakeTime} — all times MUST be anchored to this
- Her daily reality: ${schedule}
- What killed her last attempt: ${pastObstacle}
- Where she is emotionally: ${motivation}
- What she dreams her mornings feel like: "${idealMorning}"

IMPORTANT: Because her past plans failed due to "${pastObstacle}", this plan must be structured around avoiding EXACTLY that failure pattern. Every week, remind her of one thing NOT to do.

Now write her plan with this structure:

---

# ${name}'s Personal 30-Day ALVA Plan

Write 4–5 sentences that show you have read every single thing about her. Name her SPECIFIC goal. Name her specific energy pattern and why it happens hormonally at her age. Acknowledge her past struggle with "${pastObstacle}" without making her feel bad — make her feel understood. End with one sentence that makes her feel this time is different.

---

## Why This Works When Other Plans Haven't

Write 3–4 short paragraphs explaining (briefly, in plain language):
1. What is actually happening in her body at ${age} — the specific hormonal shift causing her symptoms (cortisol, estrogen, insulin sensitivity — be specific to what matches her profile)
2. Why generic plans fail for women at this stage and what makes this approach different
3. Why 15 minutes works better than 60 minutes for her nervous system specifically

---

## How to Use This Plan

3 bullets — simple, practical, no fluff.

---

## Week 1: Stabilize (Days 1–7)

**The one thing we're fixing this week:** (name the most urgent issue from her profile in 1 sentence)

**Why this week comes first:** (1–2 sentences of science: what happens in the body when we fix this first)

### Your Morning Ritual — 15 Minutes

Give a step-by-step routine with EXACT clock times starting from ${wakeLabel}. Format:

**${wakeLabel} — [Step name] (X min)**
[What exactly to do. Be so specific she could do it with her eyes half-open. Tell her WHY this step matters in 1 sentence.]

**${t(3)} — [Next step] (X min)**
[...]

Continue for 4–5 steps totaling exactly 15 minutes. Make each step feel doable, even beautiful. The routine should match her preferred movement (${movement}) and her schedule (${schedule}).

### Your Evening Wind-Down — 10 Minutes

Same format — exact times counting back from a reasonable bedtime based on her ${sleep} sleep and schedule. 3–4 steps. Address her specific stress level (${stress}) directly. If she's very stressed, explain briefly what happens physiologically when she does this practice.

### This Week's Nourishment Shift

NOT a diet. One specific addition that will make her feel better within 3–4 days. Name actual foods. Explain the mechanism in 1 sentence. Make it sound delicious. Respect ${diet} completely. Address her specific food struggle: "${dietStruggle}".

### Your Energy Insight This Week

One non-obvious, science-backed insight about her specific energy pattern (${energy}). Something she has never heard before. Something that makes her think "oh, THAT'S why." Give her one action to test it.

### What NOT to Do This Week

One specific thing that feels healthy but will sabotage week 1 given her profile. Be direct. Brief. This builds enormous trust.

---

## Week 2: Activate (Days 8–14)

**This week's shift:** (what changes internally when week 1 habits compound — be specific)

**The science behind this week:** (what biological process we're now targeting — 2 sentences max)

### Morning Ritual — 15 Minutes

Build on Week 1 with one meaningful upgrade. Keep what she already loves, add one new element. Same exact-time format. The routine should feel slightly more powerful but not harder.

### Evening Wind-Down — 10 Minutes

Deepen the practice. One new element that builds on week 1. Tell her what change she should be noticing in her sleep by now.

### Nourishment Shift

A new focus that builds on week 1. More specific than week 1. Name specific meals or combinations. Short explanation of why this matters for her specific goal (${goal}).

### Stress & Nervous System Tip

Address her stress level (${stress}) with one specific, science-backed technique. Not "do deep breathing." Tell her the exact breath ratio, the exact duration, what it does to her vagal tone, when to use it.

### What NOT to Do This Week

A different pitfall — something she might be tempted to do now that she's feeling better.

---

## Week 3: Transform (Days 15–21)

**This week's breakthrough:** (what most women report feeling for the first time by day 15–18 — be specific)

**The hormonal shift happening now:** (what is changing in her body at this point — estrogen, cortisol, blood sugar — specific to her age ${age})

### Morning Ritual — 15 Minutes

The ritual is now a flowing, almost automatic sequence. Add one element that addresses her specific hormonal profile. It should feel like a significant upgrade from week 1 but take the same time.

### Evening Wind-Down — 10 Minutes

She should now feel a noticeable difference in sleep quality. Introduce one practice specifically targeting hormonal balance for women ${age} — explain the mechanism briefly.

### Nourishment Shift

Week 3 is about hormonal nutrition. Name specific foods with specific effects. Phytoestrogens, liver-supporting foods, anti-inflammatory combinations. Make it sound like real food she wants to eat, not a medical protocol.

### Hormonal Harmony Practice

One deeply researched, specific practice for women in perimenopause or menopause (based on age ${age}). Could be related to light exposure, temperature, specific movement, or a specific supplement (always say "speak to your doctor first" if supplement). Explain the hormonal mechanism. This is the section that will make her share this plan with her friends.

### What NOT to Do This Week

The subtlest mistake — something well-intentioned that often unravels week 3 progress.

---

## Week 4: Integrate (Days 22–30)

**What this week is really about:** (not just completing the plan — embedding a new identity)

**The science of lasting change:** (what has physically changed in her brain and body over 21 days that makes week 4 different — neuroplasticity, habit loops — 2 sentences)

### Morning Ritual — 15 Minutes

The final, complete version of her ritual. It should feel like a signature practice — something she would describe to a friend as "my thing." Every step should feel earned. Same time format.

### Evening Wind-Down — 10 Minutes

Her signature wind-down. Complete and refined. Should feel luxurious, not like a task.

### Nourishment Philosophy

Not a weekly focus anymore — a sustainable relationship with food she can carry for life. 3–4 sentences about how to think about eating from now on, not what to eat. Specific to her struggle with "${dietStruggle}". Warm, freeing, not prescriptive.

### A Letter From Your Future Self

Write a deeply personal, specific, emotional letter as if from ${name} at day 30 looking back. Reference her specific goal, her specific struggles, her dream morning "${idealMorning}". Name specific sensations — what she feels when she wakes up, how her body feels different, one specific moment that surprised her. Make her cry — in the best way. This is the most important paragraph in the entire plan.

---

## Start Right Now — Your First 5 Steps

5 micro-actions for TODAY. Numbered. The first one takes under 90 seconds. Each one sets up the week 1 morning ritual. Make them feel like the very beginning of something real.

---

Write everything with the warmth of a private consultation and the precision of clinical expertise. Use ${name}'s name 5–6 times — naturally, never forced. The total plan should be comprehensive and deeply detailed. Do not rush any section. This plan should feel like it cost $500, not $4.99.`;
}
