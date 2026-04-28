import Link from "next/link";
import { StreamingPlan } from "./StreamingPlan";
import { PrintButton } from "./PrintButton";

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; s?: string }>;
}) {
  const params = await searchParams;
  const sessionId = params.session_id || params.s;

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg)" }}>
        <div className="text-center">
          <p className="mb-4" style={{ color: "var(--muted)" }}>No session found.</p>
          <Link href="/quiz" className="btn-primary">Take the quiz →</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg)" }}>

      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] pointer-events-none z-0"
        style={{ background: "radial-gradient(ellipse, rgba(201,98,122,0.08) 0%, transparent 70%)", filter: "blur(40px)" }} />

      <header className="sticky top-0 z-50 px-6 py-4 flex items-center justify-between max-w-4xl mx-auto w-full"
        style={{ background: "rgba(14,10,15,0.85)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)" }}>
        <span className="text-base font-semibold tracking-widest uppercase gradient-text"
          style={{ fontFamily: "'Playfair Display', serif" }}>ALVA 15</span>
        <PrintButton />
      </header>

      <main className="flex-1 px-6 py-10 max-w-4xl mx-auto w-full relative z-10">
        <div className="text-center mb-10 animate-fade-up">
          <span className="inline-block text-xs font-medium uppercase tracking-[.2em] px-4 py-1.5 rounded-full mb-4"
            style={{ background: "rgba(212,169,106,.1)", color: "var(--gold)", border: "1px solid rgba(212,169,106,.25)" }}>
            Your personalized plan
          </span>
          <h1 className="leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.8rem)", fontWeight: 700 }}>
            Your 30-Day Health Plan
          </h1>
          <p className="mt-3 text-sm" style={{ color: "var(--muted)" }}>Generated just for you. Start today.</p>
        </div>

        <div className="glass rounded-3xl p-6 sm:p-10 animate-fade-up delay-100">
          <StreamingPlan sessionId={sessionId} isStripe={!!params.session_id} />
        </div>

        <div className="mt-10 text-center animate-fade-up delay-200">
          <Link href="/" className="text-sm transition-colors" style={{ color: "var(--muted)" }}
            onMouseOver={undefined}>
            ← Back to ALVA 15
          </Link>
        </div>
      </main>
    </div>
  );
}
