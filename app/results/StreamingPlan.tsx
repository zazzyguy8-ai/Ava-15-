"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type Status = "loading" | "streaming" | "done" | "error";

export function StreamingPlan({ sessionId, isStripe }: { sessionId: string; isStripe: boolean }) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const param = isStripe
      ? `stripe_session_id=${encodeURIComponent(sessionId)}`
      : `s=${encodeURIComponent(sessionId)}`;

    const es = new EventSource(`/api/generate?${param}`);

    es.onmessage = (e: MessageEvent) => {
      if (e.data === "[DONE]") {
        setStatus((p) => (p === "error" ? "error" : "done"));
        es.close();
        return;
      }
      try {
        const parsed = JSON.parse(e.data);
        if (parsed?.error) {
          setStatus("error");
          setErrorMsg(parsed.error as string);
          es.close();
          return;
        }
        if (typeof parsed === "string") {
          setStatus("streaming");
          setContent((p) => p + parsed);
        }
      } catch {
        setStatus("streaming");
        setContent((p) => p + e.data);
      }
    };

    es.onerror = () => {
      es.close();
      setStatus((p) => {
        if (p !== "done" && p !== "error") {
          setErrorMsg("Could not load your plan. Please refresh the page.");
          return "error";
        }
        return p;
      });
    };

    return () => es.close();
  }, [sessionId, isStripe]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center py-20 gap-6">
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "rgba(201,98,122,.2)", borderTopColor: "var(--rose)" }} />
          <div className="absolute inset-0 rounded-full animate-glow"
            style={{ background: "radial-gradient(circle, rgba(201,98,122,.15) 0%, transparent 70%)" }} />
        </div>
        <div className="text-center">
          <p className="font-semibold mb-1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.15rem" }}>
            Building your personalized plan…
          </p>
          <p className="text-sm" style={{ color: "var(--muted)" }}>This takes about 20–30 seconds</p>
        </div>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-16">
        <p className="text-red-400 mb-5">{errorMsg}</p>
        <button onClick={() => window.location.reload()} className="btn-primary">Try Again</button>
      </div>
    );
  }

  return (
    <div>
      <div className="prose-plan"><ReactMarkdown>{content}</ReactMarkdown></div>
      {status === "streaming" && (
        <div className="flex items-center gap-3 mt-6" style={{ color: "var(--muted)" }}>
          <div className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
            style={{ borderColor: "rgba(201,98,122,.2)", borderTopColor: "var(--rose)" }} />
          <span className="text-sm">Writing your plan…</span>
        </div>
      )}
      {status === "done" && (
        <div className="mt-10 pt-8 text-center" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-sm font-medium" style={{ color: "var(--gold)" }}>
            Your plan is complete. Use the Print button to save as PDF.
          </p>
        </div>
      )}
    </div>
  );
}
