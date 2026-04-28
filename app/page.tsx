import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex flex-col min-h-screen" style={{ background: "var(--cream)" }}>
      <Nav />
      <Hero />
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <CTABanner />
      <Footer />
    </main>
  );
}

function Nav() {
  return (
    <nav className="w-full px-6 py-4 flex items-center justify-between max-w-5xl mx-auto">
      <span className="text-xl font-bold tracking-tight" style={{ color: "var(--rose-dark)" }}>
        ALVA 15
      </span>
      <Link
        href="/quiz"
        className="text-sm font-semibold px-5 py-2 rounded-full text-white transition-opacity hover:opacity-90"
        style={{ background: "var(--rose)" }}
      >
        Start Free Assessment
      </Link>
    </nav>
  );
}

function Hero() {
  return (
    <section className="flex flex-col items-center text-center px-6 pt-12 pb-16 max-w-3xl mx-auto">
      <span
        className="text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6"
        style={{ background: "var(--rose-light)", color: "var(--rose-dark)" }}
      >
        Designed for women 40–60
      </span>
      <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-5" style={{ color: "var(--foreground)" }}>
        Your personalized 30-day plan to feel{" "}
        <span style={{ color: "var(--rose)" }}>energized and balanced</span>
      </h1>
      <p className="text-lg max-w-xl mb-8 leading-relaxed" style={{ color: "var(--warm-gray)" }}>
        Answer 15 quick questions. Get an AI-generated daily health routine
        tailored to your body, lifestyle, and goals — just 15 minutes a day.
      </p>
      <Link
        href="/quiz"
        className="text-base font-semibold px-8 py-4 rounded-full text-white shadow-md transition-transform hover:scale-105 active:scale-95"
        style={{ background: "var(--rose)" }}
      >
        Start My Free Assessment →
      </Link>
      <p className="mt-4 text-sm" style={{ color: "var(--warm-gray)" }}>
        Takes 3 minutes · No account required
      </p>
    </section>
  );
}

const benefits = [
  { icon: "⚡", title: "More Energy", desc: "Daily micro-habits that rebuild your energy without exhausting you." },
  { icon: "🌿", title: "Weight Support", desc: "Gentle, sustainable guidance — not a crash diet." },
  { icon: "🧘", title: "Less Stress", desc: "Simple evening routines to calm your nervous system." },
  { icon: "⏱️", title: "Just 15 Min/Day", desc: "Realistic routines that fit into a busy life." },
];

function Benefits() {
  return (
    <section className="px-6 py-12 max-w-5xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-center mb-8" style={{ color: "var(--foreground)" }}>
        What your plan covers
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {benefits.map((b) => (
          <div
            key={b.title}
            className="flex flex-col items-center text-center p-6 rounded-2xl"
            style={{ background: "#fff", border: "1px solid var(--rose-light)" }}
          >
            <span className="text-3xl mb-3">{b.icon}</span>
            <h3 className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>{b.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--warm-gray)" }}>{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const steps = [
  { n: "1", title: "Answer 15 questions", desc: "About your lifestyle, energy, goals, and daily routine." },
  { n: "2", title: "Unlock your plan", desc: "One-time payment of $19.99. Instant access." },
  { n: "3", title: "Start today", desc: "Your personalized 30-day plan is ready immediately." },
];

function HowItWorks() {
  return (
    <section className="px-6 py-12 max-w-3xl mx-auto w-full">
      <h2 className="text-2xl font-bold text-center mb-8" style={{ color: "var(--foreground)" }}>
        How it works
      </h2>
      <div className="flex flex-col sm:flex-row gap-6 justify-center">
        {steps.map((s) => (
          <div key={s.n} className="flex-1 flex flex-col items-center text-center">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-white text-lg mb-3"
              style={{ background: "var(--rose)" }}
            >
              {s.n}
            </div>
            <h3 className="font-semibold mb-1" style={{ color: "var(--foreground)" }}>{s.title}</h3>
            <p className="text-sm" style={{ color: "var(--warm-gray)" }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

const testimonials = [
  {
    quote: "I finally have a morning routine I actually stick to. My energy is so much better after just two weeks.",
    name: "Sandra, 47",
  },
  {
    quote: "It felt like the plan was made specifically for me — because it was. No generic advice.",
    name: "Maria, 53",
  },
  {
    quote: "The evening wind-down routine changed everything for my sleep. I wake up feeling rested for the first time in years.",
    name: "Claire, 51",
  },
];

function Testimonials() {
  return (
    <section className="px-6 py-12 w-full" style={{ background: "var(--rose-light)" }}>
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8" style={{ color: "var(--foreground)" }}>
          What women are saying
        </h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="p-6 rounded-2xl bg-white shadow-sm">
              <p className="text-sm leading-relaxed mb-4 italic" style={{ color: "var(--warm-gray)" }}>
                &ldquo;{t.quote}&rdquo;
              </p>
              <p className="text-sm font-semibold" style={{ color: "var(--rose-dark)" }}>— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section className="px-6 py-16 flex flex-col items-center text-center max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-4" style={{ color: "var(--foreground)" }}>
        Ready to feel like yourself again?
      </h2>
      <p className="mb-8 text-base" style={{ color: "var(--warm-gray)" }}>
        Your personalized plan is 3 minutes away.
      </p>
      <Link
        href="/quiz"
        className="text-base font-semibold px-8 py-4 rounded-full text-white shadow-md transition-transform hover:scale-105 active:scale-95"
        style={{ background: "var(--rose)" }}
      >
        Start My Free Assessment →
      </Link>
      <p className="mt-4 text-sm" style={{ color: "var(--warm-gray)" }}>
        One-time $19.99 · No subscription · Instant access
      </p>
    </section>
  );
}

function Footer() {
  return (
    <footer
      className="border-t px-6 py-6 text-center text-xs"
      style={{ color: "var(--warm-gray)", borderColor: "var(--rose-light)" }}
    >
      © {new Date().getFullYear()} ALVA 15. All rights reserved.
    </footer>
  );
}
