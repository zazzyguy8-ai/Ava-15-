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

  const q = questions[step];
  const pct = Math.round(((step) / questions.length) * 100);
  const current = answers[q.id] ?? "";

  function pick(val: string) {
    const next = { ...answers, [q.id]: val };
    setAnswers(next);
    setTimeout(() => go(next), 260);
  }

  function go(latest: Record<string, string>) {
    if (step < questions.length - 1) setStep(s => s + 1);
    else save(latest);
  }

  async function save(latest: Record<string, string>) {
    setSubmitting(true);
    setError("");
    try {
      const json = JSON.stringify(latest);
      const bytes = new TextEncoder().encode(json);
      const binary = Array.from(bytes).map(b => String.fromCharCode(b)).join("");
      const encoded = btoa(binary);
      router.push(`/preview?a=${encodeURIComponent(encoded)}`);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Something went wrong";
      setError(msg);
      setSubmitting(false);
    }
  }

  return (
    <div className="quiz-wrap">
      <style>{`
        .quiz-wrap {
          min-height: 100dvh;
          background: linear-gradient(160deg, #13080f 0%, #1e0d1a 40%, #120810 100%);
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        /* progress */
        .q-bar-bg { height: 3px; background: rgba(255,255,255,.06); }
        .q-bar-fill { height: 3px; background: linear-gradient(90deg,#a04060,#e8a0b0); transition: width .5s ease; }
        /* top nav */
        .q-nav {
          display: flex; align-items: center; justify-content: space-between;
          padding: 18px 24px 12px;
          position: sticky; top: 0; z-index: 10;
          background: rgba(19,8,15,.85);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        .q-brand {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: .95rem; font-weight: 700;
          letter-spacing: .18em; text-transform: uppercase;
          background: linear-gradient(135deg,#e8a0b0,#d4a96a);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .q-counter {
          font-size: .72rem; font-weight: 500;
          color: #e8a0b0; letter-spacing: .1em;
          background: rgba(201,98,122,.12);
          border: 1px solid rgba(201,98,122,.28);
          padding: 4px 12px; border-radius: 99px;
        }
        /* main */
        .q-body {
          flex: 1; display: flex; flex-direction: column;
          align-items: center; justify-content: center;
          padding: 32px 20px 40px;
        }
        .q-inner { width: 100%; max-width: 480px; }
        .q-num {
          font-size: .7rem; font-weight: 600; letter-spacing: .22em;
          text-transform: uppercase; color: #c9627a; margin-bottom: 14px;
        }
        .q-text {
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(1.35rem, 5.5vw, 1.85rem);
          font-weight: 600; line-height: 1.3;
          color: #fff; margin-bottom: 28px;
          word-break: break-word; overflow-wrap: break-word;
        }
        /* option button */
        .opt {
          width: 100%; text-align: left;
          padding: 16px 20px; border-radius: 16px;
          font-size: .93rem; font-weight: 400; line-height: 1.4;
          color: #ddd0d5; cursor: pointer;
          border: 1px solid rgba(201,98,122,.2);
          background: rgba(255,255,255,.035);
          margin-bottom: 10px; transition: all .18s ease;
          display: block;
          -webkit-tap-highlight-color: transparent;
        }
        .opt:hover, .opt:active {
          border-color: rgba(201,98,122,.55);
          background: rgba(201,98,122,.1);
          color: #fff; transform: translateX(4px);
        }
        .opt.selected {
          background: linear-gradient(135deg,rgba(160,64,96,.7),rgba(201,98,122,.55));
          border-color: #c9627a;
          color: #fff;
          box-shadow: 0 4px 20px rgba(201,98,122,.25);
          transform: translateX(4px);
        }
        /* text input */
        .q-input {
          width: 100%; padding: 16px 20px;
          border-radius: 16px; font-size: .93rem;
          background: rgba(255,255,255,.04);
          border: 1px solid rgba(201,98,122,.25);
          color: #fff; outline: none;
          font-family: Inter, sans-serif;
          transition: border-color .2s;
          -webkit-appearance: none;
        }
        .q-input:focus { border-color: #c9627a; background: rgba(201,98,122,.07); }
        .q-input::placeholder { color: rgba(255,255,255,.28); }
        .q-btn {
          width: 100%; padding: 16px;
          border-radius: 16px; margin-top: 12px;
          font-size: .95rem; font-weight: 600;
          background: linear-gradient(135deg,#a04060,#c9627a);
          color: #fff; border: none; cursor: pointer;
          box-shadow: 0 6px 24px rgba(201,98,122,.35);
          transition: opacity .2s, transform .15s;
          -webkit-tap-highlight-color: transparent;
        }
        .q-btn:active { transform: scale(.97); }
        .q-btn:disabled { opacity: .38; cursor: default; }
        .q-back {
          display: inline-block; margin-top: 20px;
          font-size: .82rem; color: rgba(255,255,255,.3);
          cursor: pointer; transition: color .2s;
          background: none; border: none;
        }
        .q-back:hover { color: rgba(255,255,255,.6); }
        .q-error { color: #f87171; font-size: .82rem; margin-top: 12px; text-align: center; }
        /* decoration circle */
        .q-blob {
          position: fixed; border-radius: 50%; pointer-events: none;
          filter: blur(80px); z-index: 0;
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .q-inner { animation: slideIn .35s ease both; }
      `}</style>

      {/* blobs */}
      <div className="q-blob" style={{ width: 340, height: 340, top: -60, right: -80, background: "rgba(160,64,96,.18)" }} />
      <div className="q-blob" style={{ width: 260, height: 260, bottom: 40, left: -60, background: "rgba(212,169,106,.1)" }} />

      {/* top nav + progress */}
      <div className="q-nav">
        <span className="q-brand">ALVA 15</span>
        <span className="q-counter">{step + 1} / {questions.length}</span>
      </div>
      <div className="q-bar-bg">
        <div className="q-bar-fill" style={{ width: `${pct}%` }} />
      </div>

      {/* question */}
      <div className="q-body">
        <div className="q-inner" key={step}>
          <p className="q-num">Question {step + 1} of {questions.length}</p>
          <h2 className="q-text">{q.text}</h2>

          {q.type === "choice" && q.options?.map(opt => (
            <button key={opt} className={`opt${current === opt ? " selected" : ""}`}
              onClick={() => pick(opt)}>
              {opt}
            </button>
          ))}

          {q.type === "text" && (
            <>
              <input className="q-input" type={q.id === "email" ? "email" : "text"} value={current}
                placeholder={q.placeholder ?? "Type your answer…"}
                autoFocus
                onChange={e => setAnswers(p => ({ ...p, [q.id]: e.target.value }))}
                onKeyDown={e => e.key === "Enter" && current.trim() && go({ ...answers, [q.id]: current })}
              />
              <button className="q-btn" disabled={!current.trim() || submitting}
                onClick={() => go({ ...answers })}>
                {submitting
                  ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
                      <span style={{ width: 16, height: 16, borderRadius: "50%", border: "2px solid rgba(255,255,255,.3)", borderTopColor: "#fff", display: "inline-block", animation: "spin 0.7s linear infinite" }} />
                      Saving…
                    </span>
                  : step === questions.length - 1 ? "See My Plan →" : "Continue →"
                }
              </button>
            </>
          )}

          {error && <p className="q-error">{error}</p>}

          {step > 0 && !submitting && (
            <button className="q-back" onClick={() => setStep(s => s - 1)}>← Back</button>
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
