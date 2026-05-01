"use client";

import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

type Status = "loading" | "streaming" | "done" | "error";

export function StreamingPlan({
  planParam,
  isEncoded,
}: {
  planParam: string;
  isEncoded: boolean;
}) {
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<Status>("loading");
  const [errorMsg, setErrorMsg] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;

    const paramKey = isEncoded ? "a" : "s";
    const es = new EventSource(`/api/generate?${paramKey}=${encodeURIComponent(planParam)}`);

    es.onmessage = (e: MessageEvent) => {
      if (e.data === "[DONE]") {
        setStatus(p => p === "error" ? "error" : "done");
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
          setContent(p => p + parsed);
        }
      } catch {
        setStatus("streaming");
        setContent(p => p + e.data);
      }
    };

    es.onerror = () => {
      es.close();
      setStatus(p => {
        if (p !== "done" && p !== "error") {
          setErrorMsg("Connection lost. Please refresh.");
          return "error";
        }
        return p;
      });
    };

    return () => es.close();
  }, [planParam]);

  if (status === "loading") {
    return (
      <div style={styles.loadWrap}>
        <div style={styles.spinner} />
        <p style={styles.loadTitle}>Building your personal plan…</p>
        <p style={styles.loadSub}>ALVA is crafting your unique 30-day journey</p>
        <div style={styles.dots}>
          <span style={{ ...styles.dot, animationDelay: "0s" }} />
          <span style={{ ...styles.dot, animationDelay: ".2s" }} />
          <span style={{ ...styles.dot, animationDelay: ".4s" }} />
        </div>
        <style>{`
          @keyframes spin { to { transform: rotate(360deg); } }
          @keyframes bounce { 0%,80%,100%{transform:scale(0);opacity:.3} 40%{transform:scale(1);opacity:1} }
        `}</style>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <p style={{ color: "#f87171", marginBottom: 20, fontSize: ".95rem" }}>{errorMsg}</p>
        <button onClick={() => window.location.reload()} style={styles.retryBtn}>
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="plan-body">
        <ReactMarkdown
          components={{
            h1: ({ children }) => <h1 style={styles.h1}>{children}</h1>,
            h2: ({ children }) => <h2 style={styles.h2}>{children}</h2>,
            h3: ({ children }) => <h3 style={styles.h3}>{children}</h3>,
            p: ({ children }) => <p style={styles.p}>{children}</p>,
            ul: ({ children }) => <ul style={styles.ul}>{children}</ul>,
            li: ({ children }) => (
              <li style={styles.li}>
                <span style={styles.liDot}>✦</span>
                <span>{children}</span>
              </li>
            ),
            strong: ({ children }) => <strong style={styles.strong}>{children}</strong>,
            hr: () => <hr style={styles.hr} />,
          }}
        >
          {content}
        </ReactMarkdown>
      </div>

      {status === "streaming" && (
        <div style={styles.writingRow}>
          <div style={styles.writingDot} />
          <span style={{ fontSize: ".8rem", color: "rgba(255,255,255,.3)" }}>Writing your plan…</span>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      )}

      {status === "done" && (
        <div style={styles.doneBox}>
          <span style={styles.doneIcon}>✓</span>
          <span>Your plan is complete. Save it as PDF using the button above.</span>
        </div>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  loadWrap: { display: "flex", flexDirection: "column", alignItems: "center", padding: "80px 20px", gap: 16 },
  spinner: { width: 52, height: 52, borderRadius: "50%", border: "2px solid rgba(201,98,122,.15)", borderTopColor: "#c9627a", animation: "spin .8s linear infinite" },
  loadTitle: { fontFamily: "'Playfair Display',serif", fontSize: "1.2rem", color: "#1e0f17", margin: 0 },
  loadSub: { fontSize: ".82rem", color: "rgba(42,21,32,.45)", margin: 0 },
  dots: { display: "flex", gap: 8 },
  dot: { width: 8, height: 8, borderRadius: "50%", background: "#c9627a", display: "inline-block", animation: "bounce 1.4s ease-in-out infinite" },
  retryBtn: { padding: "12px 28px", borderRadius: 99, background: "linear-gradient(135deg,#a04060,#c9627a)", color: "#fff", border: "none", cursor: "pointer", fontSize: ".9rem", fontWeight: 600 },
  h1: { fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.6rem,4vw,2.2rem)", fontWeight: 700, color: "#1e0f17", marginBottom: "1.2rem", lineHeight: 1.2 },
  h2: { fontFamily: "'Playfair Display',serif", fontSize: "clamp(1.2rem,3vw,1.55rem)", fontWeight: 600, color: "#c9627a", marginTop: "2.5rem", marginBottom: ".8rem", paddingBottom: ".5rem", borderBottom: "1px solid rgba(201,98,122,.15)", lineHeight: 1.3 },
  h3: { fontSize: "1rem", fontWeight: 600, color: "#a87c2a", marginTop: "1.5rem", marginBottom: ".4rem", letterSpacing: ".02em" },
  p: { fontSize: ".93rem", lineHeight: 1.8, color: "rgba(42,21,32,.68)", marginBottom: ".85rem" },
  ul: { listStyle: "none", padding: 0, margin: "0 0 1rem" },
  li: { display: "flex", alignItems: "flex-start", gap: 10, fontSize: ".9rem", lineHeight: 1.7, color: "rgba(42,21,32,.62)", marginBottom: ".4rem" },
  liDot: { color: "#c9627a", fontSize: ".7rem", marginTop: ".35rem", flexShrink: 0 },
  strong: { color: "#1e0f17", fontWeight: 600 },
  hr: { border: "none", borderTop: "1px solid rgba(201,98,122,.12)", margin: "2rem 0" },
  writingRow: { display: "flex", alignItems: "center", gap: 10, marginTop: 24, paddingTop: 16, borderTop: "1px solid rgba(201,98,122,.08)" },
  writingDot: { width: 14, height: 14, borderRadius: "50%", border: "2px solid rgba(201,98,122,.2)", borderTopColor: "#c9627a", animation: "spin .7s linear infinite", flexShrink: 0 },
  doneBox: { display: "flex", alignItems: "center", gap: 10, marginTop: 32, padding: "16px 20px", borderRadius: 14, background: "rgba(168,124,42,.06)", border: "1px solid rgba(168,124,42,.18)", fontSize: ".82rem", color: "#a87c2a" },
  doneIcon: { fontSize: "1rem" },
};
