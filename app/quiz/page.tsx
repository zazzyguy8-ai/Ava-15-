"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { questions } from "@/lib/questions";

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const question = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const currentAnswer = answers[question.id] ?? "";

  function handleChoice(value: string) {
    const next = { ...answers, [question.id]: value };
    setAnswers(next);
    setTimeout(() => advance(next), 220);
  }

  function advance(latest: Record<string, string>) {
    if (step < questions.length - 1) setStep((s) => s + 1);
    else submit(latest);
  }

  async function submit(latest: Record<string, string>) {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/save-answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: latest }),
      });
      if (!res.ok) throw new Error("Failed");
      const { sessionId } = await res.json();
      router.push(`/preview?s=${sessionId}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(14,10,15,0.9)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-sm font-semibold tracking-widest uppercase gradient-text"
            style={{ fontFamily: "'Playfair Display', serif" }}>ALVA 15</span>
          <span className="text-xs font-medium px-3 py-1 rounded-full"
            style={{ background: "rgba(201,98,122,.12)", color: "var(--rose-light)", border: "1px solid rgba(201,98,122,.25)" }}>
            {step + 1} / {questions.length}
          </span>
        </div>

        {/* Progress bar */}
        <div className="h-0.5 w-full" style={{ background: "rgba(255,255,255,.05)" }}>
          <div className="h-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%`, background: "linear-gradient(90deg, var(--rose-dark), var(--rose-light))" }} />
        </div>
      </div>

      {/* Question */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pt-28 pb-16">
        <div className="w-full max-w-lg animate-fade-up" key={step}>

          <p className="text-xs font-semibold uppercase tracking-[.2em] mb-4"
            style={{ color: "var(--rose)" }}>
            Question {step + 1} of {questions.length}
          </p>

          <h2 className="mb-8 leading-snug"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.4rem, 4vw, 2rem)", fontWeight: 600 }}>
            {question.text}
          </h2>

          {question.type === "choice" && question.options && (
            <div className="flex flex-col gap-3">
              {question.options.map((opt) => {
                const sel = currentAnswer === opt;
                return (
                  <button key={opt} onClick={() => handleChoice(opt)}
                    className="w-full text-left px-5 py-4 rounded-2xl text-sm font-medium transition-all duration-200"
                    style={{
                      background: sel ? "linear-gradient(135deg, var(--rose-dark), var(--rose))" : "var(--card)",
                      border: `1px solid ${sel ? "var(--rose)" : "var(--border)"}`,
                      color: sel ? "#fff" : "#e0d0d5",
                      boxShadow: sel ? "0 4px 20px rgba(201,98,122,.3)" : "none",
                      transform: sel ? "scale(1.01)" : "scale(1)",
                    }}>
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {question.type === "text" && (
            <div className="flex flex-col gap-4">
              <input type="text" value={currentAnswer}
                onChange={(e) => setAnswers((p) => ({ ...p, [question.id]: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && currentAnswer.trim() && advance({ ...answers, [question.id]: currentAnswer })}
                placeholder="Type your answer..."
                className="w-full px-5 py-4 rounded-2xl text-sm outline-none transition-all"
                style={{ background: "var(--card)", border: "1px solid var(--border)", color: "#fff",
                  fontFamily: "Inter, sans-serif" }}
                autoFocus
              />
              <button onClick={() => advance({ ...answers })}
                disabled={!currentAnswer.trim() || submitting}
                className="btn-primary w-full disabled:opacity-40 disabled:cursor-not-allowed">
                {submitting ? (
                  <>
                    <span className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin inline-block" />
                    Saving…
                  </>
                ) : step === questions.length - 1 ? "See My Plan →" : "Continue →"}
              </button>
            </div>
          )}

          {error && (
            <p className="mt-5 text-sm text-red-400 text-center">{error}</p>
          )}

          {step > 0 && !submitting && (
            <button onClick={() => setStep((s) => s - 1)}
              className="mt-8 text-sm transition-colors"
              style={{ color: "var(--muted)" }}
              onMouseOver={(e) => (e.currentTarget.style.color = "var(--rose-light)")}
              onMouseOut={(e) => (e.currentTarget.style.color = "var(--muted)")}>
              ← Back
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
