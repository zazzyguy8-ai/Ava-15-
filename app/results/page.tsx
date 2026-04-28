import Link from "next/link";
import { StreamingPlan } from "./StreamingPlan";
import { PrintButton } from "./PrintButton";

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string; s?: string }>;
}) {
  const params = await searchParams;
  const stripeSessionId = params.session_id;
  const directSessionId = params.s;
  const sessionId = stripeSessionId || directSessionId;

  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--cream)" }}>
        <div className="text-center">
          <p className="mb-4" style={{ color: "var(--warm-gray)" }}>No session found.</p>
          <Link href="/quiz" className="font-semibold" style={{ color: "var(--rose)" }}>
            Take the quiz →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--cream)" }}>
      <header className="px-6 py-4 max-w-4xl mx-auto w-full flex items-center justify-between">
        <span className="text-lg font-bold" style={{ color: "var(--rose-dark)" }}>ALVA 15</span>
        <PrintButton />
      </header>

      <main className="flex-1 px-6 py-8 max-w-4xl mx-auto w-full">
        <div className="text-center mb-10">
          <span
            className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{ background: "var(--rose-light)", color: "var(--rose-dark)" }}
          >
            Your personalized plan
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-3" style={{ color: "var(--foreground)" }}>
            Your 30-Day Health Plan
          </h1>
          <p className="text-base" style={{ color: "var(--warm-gray)" }}>
            Generated just for you. Start today.
          </p>
        </div>

        <div
          className="rounded-2xl p-6 sm:p-10"
          style={{ background: "#fff", border: "1px solid var(--rose-light)" }}
        >
          <StreamingPlan sessionId={sessionId} isStripe={!!stripeSessionId} />
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm mb-4" style={{ color: "var(--warm-gray)" }}>
            Use the Print button above to save your plan as a PDF.
          </p>
          <Link href="/" className="text-sm font-semibold" style={{ color: "var(--rose)" }}>
            ← Back to ALVA 15
          </Link>
        </div>
      </main>
    </div>
  );
}
