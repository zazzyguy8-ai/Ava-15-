import Link from "next/link";

export default function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ s?: string }>;
}) {
  return <PreviewContent searchParams={searchParams} />;
}

async function PreviewContent({
  searchParams,
}: {
  searchParams: Promise<{ s?: string }>;
}) {
  const { s: sessionId } = await searchParams;

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
      <header className="px-6 py-4 max-w-3xl mx-auto w-full">
        <span className="text-lg font-bold" style={{ color: "var(--rose-dark)" }}>ALVA 15</span>
      </header>

      <main className="flex-1 px-6 py-8 max-w-3xl mx-auto w-full">
        {/* Headline */}
        <div className="text-center mb-10">
          <span
            className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full"
            style={{ background: "var(--rose-light)", color: "var(--rose-dark)" }}
          >
            Your plan is ready
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-4 mb-3" style={{ color: "var(--foreground)" }}>
            Your personalized 30-day plan is waiting
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: "var(--warm-gray)" }}>
            Unlock your full plan — built specifically for your goals, schedule, and lifestyle.
          </p>
        </div>

        {/* Blurred preview cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-10">
          {previewDays.map((day) => (
            <div
              key={day.label}
              className="relative rounded-2xl p-5 overflow-hidden"
              style={{ background: "#fff", border: "1px solid var(--rose-light)" }}
            >
              <div className="blur-sm select-none pointer-events-none">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--rose)" }}>
                  {day.label}
                </p>
                <p className="font-semibold text-sm mb-1" style={{ color: "var(--foreground)" }}>{day.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--warm-gray)" }}>{day.desc}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl">🔒</span>
              </div>
            </div>
          ))}
        </div>

        {/* What's included */}
        <div
          className="rounded-2xl p-6 mb-8"
          style={{ background: "var(--rose-light)" }}
        >
          <h3 className="font-bold text-base mb-4" style={{ color: "var(--foreground)" }}>Your plan includes:</h3>
          <ul className="space-y-2">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-2 text-sm" style={{ color: "var(--foreground)" }}>
                <span style={{ color: "var(--rose)" }}>✓</span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Price + CTA */}
        <div className="flex flex-col items-center text-center">
          <p className="text-4xl font-bold mb-1" style={{ color: "var(--foreground)" }}>$19.99</p>
          <p className="text-sm mb-6" style={{ color: "var(--warm-gray)" }}>
            One-time payment · No subscription · Instant access
          </p>
          <CheckoutButton sessionId={sessionId} />
          <div className="flex items-center gap-4 mt-5 text-xs" style={{ color: "var(--warm-gray)" }}>
            <span>🔒 Secure payment</span>
            <span>⚡ Instant access</span>
            <span>💳 All cards accepted</span>
          </div>
        </div>
      </main>
    </div>
  );
}

function CheckoutButton({ sessionId }: { sessionId: string }) {
  return (
    <form action="/api/checkout" method="POST">
      <input type="hidden" name="sessionId" value={sessionId} />
      <button
        type="submit"
        className="px-10 py-4 rounded-full font-semibold text-white text-base shadow-md transition-transform hover:scale-105 active:scale-95"
        style={{ background: "var(--rose)" }}
      >
        Unlock My 30-Day Plan →
      </button>
    </form>
  );
}

const previewDays = [
  {
    label: "Day 1 — Morning",
    title: "Energizing Start Routine",
    desc: "5-minute gentle stretch, 2-minute breathing exercise, hydration ritual to jumpstart your metabolism.",
  },
  {
    label: "Week 1 — Focus",
    title: "Sleep & Recovery Reset",
    desc: "Rebuild your foundation with targeted evening routines and simple midday recharge practices.",
  },
  {
    label: "Day 7 — Evening",
    title: "Stress Release Sequence",
    desc: "Progressive relaxation, journaling prompt, and herbal wind-down ritual designed for your stress profile.",
  },
];

const included = [
  "30-day personalized daily plan (morning + evening routines)",
  "Weekly nutrition focus — simple food swaps, not a diet",
  "Weekly energy and stress management tips",
  "Tailored to your age, schedule, and goals",
  "Printable / saveable format",
];
