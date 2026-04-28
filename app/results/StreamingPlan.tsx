"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type Status = "loading" | "streaming" | "done" | "error";

export function StreamingPlan({
  sessionId,
  isStripe,
}: {
  sessionId: string;
  isStripe: boolean;
}) {
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
        setStatus((prev) => (prev === "error" ? "error" : "done"));
        es.close();
        return;
      }

      try {
        const parsed = JSON.parse(e.data);
        if (parsed && typeof parsed === "object" && parsed.error) {
          setStatus("error");
          setErrorMsg(parsed.error as string);
          es.close();
          return;
        }
        if (typeof parsed === "string") {
          setStatus("streaming");
          setContent((prev) => prev + parsed);
        }
      } catch {
        // raw text fallback
        setStatus("streaming");
        setContent((prev) => prev + e.data);
      }
    };

    es.onerror = () => {
      es.close();
      setStatus((prev) => {
        if (prev !== "done" && prev !== "error") {
          setErrorMsg("Could not load your plan. Please refresh the page.");
          return "error";
        }
        return prev;
      });
    };

    return () => es.close();
  }, [sessionId, isStripe]);

  if (status === "loading") {
    return (
      <div className="flex flex-col items-center py-16 gap-4">
        <div
          className="w-10 h-10 rounded-full border-4 animate-spin"
          style={{ borderColor: "var(--rose-light)", borderTopColor: "var(--rose)" }}
        />
        <p className="text-base font-medium" style={{ color: "var(--warm-gray)" }}>
          Building your personalized plan…
        </p>
        <p className="text-sm" style={{ color: "var(--warm-gray)" }}>
          This takes about 20–30 seconds
        </p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="text-center py-12">
        <p className="text-red-500 mb-4">{errorMsg}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-sm font-semibold px-5 py-2 rounded-full text-white"
          style={{ background: "var(--rose)" }}
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="prose-plan">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>

      {status === "streaming" && (
        <div className="flex items-center gap-2 mt-6" style={{ color: "var(--warm-gray)" }}>
          <div
            className="w-4 h-4 rounded-full border-2 animate-spin"
            style={{ borderColor: "var(--rose-light)", borderTopColor: "var(--rose)" }}
          />
          <span className="text-sm">Writing your plan…</span>
        </div>
      )}

      {status === "done" && (
        <div
          className="mt-8 pt-6 border-t text-center"
          style={{ borderColor: "var(--rose-light)" }}
        >
          <p className="text-sm font-semibold" style={{ color: "var(--sage)" }}>
            ✓ Your plan is complete. Use the Print button to save as PDF.
          </p>
        </div>
      )}
    </div>
  );
}
