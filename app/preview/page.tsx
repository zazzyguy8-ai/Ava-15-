import Link from "next/link";

export default async function PreviewPage({ searchParams }: { searchParams: Promise<{ s?: string }> }) {
  const { s: sessionId } = await searchParams;

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

      {/* Glow */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(201,98,122,0.1) 0%, transparent 70%)", filter: "blur(40px)" }} />

      {/* Nav */}
      <header className="px-6 py-5 max-w-4xl mx-auto w-full flex items-center justify-between">
        <span className="text-base font-semibold tracking-widest uppercase gradient-text"
          style={{ fontFamily: "'Playfair Display', serif" }}>ALVA 15</span>
        <span className="text-xs px-3 py-1 rounded-full"
          style={{ background: "rgba(212,169,106,.12)", color: "var(--gold)", border: "1px solid rgba(212,169,106,.25)" }}>
          Your plan is ready
        </span>
      </header>

      <main className="flex-1 px-6 py-8 max-w-4xl mx-auto w-full relative z-10">

        {/* Headline */}
        <div className="text-center mb-12 animate-fade-up">
          <h1 className="mb-4 leading-tight" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700 }}>
            Your personalized plan<br />
            <span className="gradient-text">is waiting for you</span>
          </h1>
          <p className="text-base max-w-md mx-auto" style={{ color: "var(--muted)" }}>
            Unlock your full 30-day plan — built specifically for your goals, schedule and lifestyle.
          </p>
        </div>

        {/* Blurred preview */}
        <div className="grid sm:grid-cols-3 gap-5 mb-10 animate-fade-up delay-100">
          {previewDays.map((day) => (
            <div key={day.label} className="glass rounded-3xl p-6 relative overflow-hidden" style={{ minHeight: 160 }}>
              <div className="blur-sm select-none pointer-events-none">
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--gold)" }}>{day.label}</p>
                <p className="font-semibold text-sm mb-2">{day.title}</p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--muted)" }}>{day.desc}</p>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(201,98,122,.15)", border: "1px solid rgba(201,98,122,.3)" }}>
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                    <rect x="1" y="9" width="16" height="12" rx="2" stroke="#c9627a" strokeWidth="1.5"/>
                    <path d="M5 9V6a4 4 0 018 0v3" stroke="#c9627a" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* What's included */}
        <div className="glass rounded-3xl p-7 mb-10 animate-fade-up delay-200">
          <h3 className="font-semibold mb-5" style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem" }}>
            Your plan includes
          </h3>
          <div className="grid sm:grid-cols-2 gap-3">
            {included.map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm" style={{ color: "#cfc0c5" }}>
                <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center text-xs"
                  style={{ background: "rgba(201,98,122,.2)", color: "var(--rose-light)" }}>✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Price + CTA */}
        <div className="flex flex-col items-center text-center animate-fade-up delay-300">
          <div className="mb-2 flex items-baseline gap-2">
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "3.5rem", fontWeight: 700 }}>$19.99</span>
            <span className="text-sm line-through" style={{ color: "var(--muted)" }}>$49</span>
          </div>
          <p className="text-sm mb-7" style={{ color: "var(--muted)" }}>
            One-time payment · No subscription · Instant access
          </p>

          <form action="/api/checkout" method="POST">
            <input type="hidden" name="sessionId" value={sessionId} />
            <button type="submit" className="btn-primary text-base" style={{ padding: "1rem 3rem", fontSize: "1.05rem" }}>
              Unlock My 30-Day Plan →
            </button>
          </form>

          <div className="flex items-center gap-5 mt-6 text-xs" style={{ color: "var(--muted)" }}>
            <span className="flex items-center gap-1.5">
              <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><rect x=".5" y="5.5" width="11" height="8" rx="1.5" stroke="currentColor"/><path d="M3 5.5V4a3 3 0 016 0v1.5" stroke="currentColor" strokeLinecap="round"/></svg>
              Secure payment
            </span>
            <span>Instant access</span>
            <span>All cards accepted</span>
          </div>
        </div>
      </main>
    </div>
  );
}

const previewDays = [
  { label: "Day 1 — Morning", title: "Energizing Start Routine", desc: "5-min gentle stretch, breathing exercise, hydration ritual to jumpstart your metabolism." },
  { label: "Week 1 — Focus", title: "Sleep & Recovery Reset", desc: "Rebuild your foundation with targeted evening routines and simple midday recharge practices." },
  { label: "Day 7 — Evening", title: "Stress Release Sequence", desc: "Progressive relaxation, journaling prompt, and herbal wind-down ritual tailored to your stress profile." },
];

const included = [
  "30-day personalized daily plan (morning + evening routines)",
  "Weekly nutrition focus — simple food swaps, not a diet",
  "Weekly energy and stress management tips",
  "Tailored to your age, schedule and specific goals",
  "Hormonal balance guidance for women 40–60",
  "Printable / saveable format",
];
