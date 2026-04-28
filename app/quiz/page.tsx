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

  function handleAnswer(value: string) {
    setAnswers((prev) => ({ ...prev, [question.id]: value }));
    if (question.type === "choice") {
      setTimeout(() => advance({ ...answers, [question.id]: value }), 200);
    }
  }

  function advance(latestAnswers: Record<string, string>) {
    if (step < questions.length - 1) {
      setStep((s) => s + 1);
    } else {
      submit(latestAnswers);
    }
  }

  async function submit(latestAnswers: Record<string, string>) {
    setSubmitting(true);
    setError("");
    try {
      const res = await fetch("/api/save-answers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: latestAnswers }),
      });
      if (!res.ok) throw new Error("Failed to save");
      const { sessionId } = await res.json();
      router.push(`/preview?s=${sessionId}`);
    } catch {
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  function handleNext() {
    advance({ ...answers });
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      <header className="px-6 py-4 max-w-2xl mx-auto w-full flex items-center justify-between">
        <span className="text-lg font-bold" style={{ color: "var(--rose-dark)" }}>ALVA 15</span>
        <span className="text-sm" style={{ color: "var(--warm-gray)" }}>
          {step + 1} / {questions.length}
        </span>
      </header>

      {/* Progress bar */}
      <div className="w-full h-1.5" style={{ background: "var(--rose-light)" }}>
        <div
          className="h-full transition-all duration-300"
          style={{ width: `${progress}%`, background: "var(--rose)" }}
        />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "var(--rose)" }}>
            Question {step + 1} of {questions.length}
          </p>
          <h2 className="text-2xl font-bold mb-8 leading-snug" style={{ color: "var(--foreground)" }}>
            {question.text}
          </h2>

          {question.type === "choice" && question.options && (
            <div className="flex flex-col gap-3">
              {question.options.map((opt) => {
                const selected = currentAnswer === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    className="w-full text-left px-5 py-4 rounded-xl font-medium transition-all"
                    style={{
                      background: selected ? "var(--rose)" : "#fff",
                      color: selected ? "#fff" : "var(--foreground)",
                      border: `2px solid ${selected ? "var(--rose)" : "var(--rose-light)"}`,
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          )}

          {question.type === "text" && (
            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={currentAnswer}
                onChange={(e) => setAnswers((prev) => ({ ...prev, [question.id]: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && currentAnswer.trim() && handleNext()}
                placeholder="Type your answer..."
                className="w-full px-5 py-4 rounded-xl text-base outline-none"
                style={{
                  background: "#fff",
                  border: "2px solid var(--rose-light)",
                  color: "var(--foreground)",
                }}
                autoFocus
              />
              <button
                onClick={handleNext}
                disabled={!currentAnswer.trim() || submitting}
                className="w-full py-4 rounded-xl font-semibold text-white transition-opacity disabled:opacity-40"
                style={{ background: "var(--rose)" }}
              >
                {submitting ? "Generating your plan…" : step === questions.length - 1 ? "See My Plan →" : "Continue →"}
              </button>
            </div>
          )}

          {error && (
            <p className="mt-4 text-sm text-red-500">{error}</p>
          )}

          {step > 0 && !submitting && (
            <button
              onClick={() => setStep((s) => s - 1)}
              className="mt-6 text-sm"
              style={{ color: "var(--warm-gray)" }}
            >
              ← Back
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
