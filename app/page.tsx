import Link from "next/link";

export default function LandingPage() {
  return (
    <main style={{ background: "var(--bg)" }} className="min-h-screen overflow-hidden">
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

/* ─── Nav ─── */
function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between max-w-6xl mx-auto"
      style={{ background: "rgba(14,10,15,0.8)", backdropFilter: "blur(16px)", borderBottom: "1px solid var(--border)" }}>
      <span className="text-lg font-semibold tracking-[.15em] uppercase gradient-text" style={{ fontFamily: "'Playfair Display', serif" }}>
        ALVA 15
      </span>
      <Link href="/quiz" className="btn-secondary text-sm">
        Begin Assessment
      </Link>
    </nav>
  );
}

/* ─── Hero ─── */
function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pt-24 pb-16 overflow-hidden">

      {/* Glow blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full animate-glow pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(201,98,122,0.18) 0%, transparent 70%)", filter: "blur(40px)" }} />
      <div className="absolute bottom-10 right-10 w-[300px] h-[300px] rounded-full animate-glow pointer-events-none delay-300"
        style={{ background: "radial-gradient(circle, rgba(212,169,106,0.12) 0%, transparent 70%)", filter: "blur(30px)" }} />

      <div className="relative z-10 max-w-3xl mx-auto">
        <div className="animate-fade-up mb-6">
          <span className="inline-block text-xs font-medium uppercase tracking-[.2em] px-4 py-1.5 rounded-full"
            style={{ background: "rgba(201,98,122,.12)", border: "1px solid rgba(201,98,122,.3)", color: "var(--rose-light)" }}>
            Designed for women 40–60
          </span>
        </div>

        <h1 className="animate-fade-up delay-100 mb-6 leading-[1.1]"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 6vw, 4.2rem)", fontWeight: 700 }}>
          30 days to feel{" "}
          <em className="gradient-text not-italic">energized,</em>
          <br />
          <em className="gradient-text not-italic">balanced</em> and like yourself
        </h1>

        <p className="animate-fade-up delay-200 text-base sm:text-lg mb-10 mx-auto max-w-xl leading-relaxed"
          style={{ color: "var(--muted)" }}>
          Answer 15 questions. Get an AI-generated daily health plan
          tailored to your body, lifestyle and goals — just 15 minutes a day.
        </p>

        <div className="animate-fade-up delay-300 flex flex-col sm:flex-row gap-4 items-center justify-center">
          <Link href="/quiz" className="btn-primary text-base">
            Start My Free Assessment
            <span style={{ fontSize: "1.1rem" }}>→</span>
          </Link>
          <span className="text-sm" style={{ color: "var(--muted)" }}>3 minutes · No account needed</span>
        </div>

        {/* Stats */}
        <div className="animate-fade-up delay-400 mt-14 grid grid-cols-3 gap-4 max-w-md mx-auto">
          {[["30", "Day Plan"], ["15", "Min / Day"], ["100%", "Personalized"]].map(([n, l]) => (
            <div key={l} className="glass rounded-2xl py-4 px-2 text-center">
              <p className="text-xl font-bold gradient-text">{n}</p>
              <p className="text-xs mt-0.5" style={{ color: "var(--muted)" }}>{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Benefits ─── */
const benefits = [
  { title: "More Energy", desc: "Daily micro-habits that rebuild your vitality without exhausting you.", icon: "✦" },
  { title: "Weight Support", desc: "Gentle, sustainable guidance — not a crash diet.", icon: "✦" },
  { title: "Less Stress", desc: "Simple evening rituals to calm your nervous system.", icon: "✦" },
  { title: "15 Min / Day", desc: "Realistic routines that fit into a real, busy life.", icon: "✦" },
];

function Benefits() {
  return (
    <section className="px-6 py-20 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700 }}>
          What your plan covers
        </h2>
        <div className="mt-3 h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg, transparent, var(--rose), transparent)" }} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {benefits.map((b, i) => (
          <div key={b.title} className={`glass rounded-3xl p-7 group hover:border-rose-500/40 transition-all duration-300 animate-fade-up delay-${i * 100 + 100}`}
            style={{ borderColor: "var(--border)" }}>
            <div className="w-9 h-9 rounded-full flex items-center justify-center mb-5 text-sm"
              style={{ background: "rgba(201,98,122,.15)", color: "var(--rose-light)" }}>
              {b.icon}
            </div>
            <h3 className="font-semibold text-base mb-2 text-white">{b.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{b.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── How It Works ─── */
const steps = [
  { n: "01", title: "Answer 15 questions", desc: "About your lifestyle, energy levels, goals and daily schedule." },
  { n: "02", title: "Unlock your plan", desc: "One-time payment of $19.99. Instant, permanent access." },
  { n: "03", title: "Start today", desc: "Your personalized 30-day plan is generated immediately." },
];

function HowItWorks() {
  return (
    <section className="px-6 py-20" style={{ background: "var(--bg2)" }}>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-14">
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700 }}>
            How it works
          </h2>
          <div className="mt-3 h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg, transparent, var(--rose), transparent)" }} />
        </div>

        <div className="flex flex-col sm:flex-row gap-8 relative">
          {/* Connector line on desktop */}
          <div className="hidden sm:block absolute top-8 left-0 right-0 h-px" style={{ background: "linear-gradient(90deg, transparent, var(--border), var(--border), transparent)", margin: "0 15%" }} />

          {steps.map((s, i) => (
            <div key={s.n} className={`flex-1 flex flex-col items-center text-center relative animate-fade-up delay-${i * 150 + 100}`}>
              <div className="w-16 h-16 rounded-full flex items-center justify-center mb-5 font-bold text-sm z-10"
                style={{ background: "linear-gradient(135deg, var(--rose-dark), var(--rose))", boxShadow: "0 4px 20px rgba(201,98,122,.4)", fontFamily: "Inter, sans-serif" }}>
                {s.n}
              </div>
              <h3 className="font-semibold mb-2 text-white">{s.title}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Testimonials ─── */
const testimonials = [
  { quote: "I finally have a morning routine I actually stick to. My energy is so much better after just two weeks.", name: "Sandra, 47" },
  { quote: "It felt like the plan was made specifically for me — because it was. No generic advice at all.", name: "Maria, 53" },
  { quote: "The evening wind-down routine changed everything for my sleep. I wake up rested for the first time in years.", name: "Claire, 51" },
];

function Testimonials() {
  return (
    <section className="px-6 py-20 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 700 }}>
          Real women, real results
        </h2>
        <div className="mt-3 h-px w-16 mx-auto" style={{ background: "linear-gradient(90deg, transparent, var(--rose), transparent)" }} />
      </div>

      <div className="grid sm:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={t.name} className={`glass rounded-3xl p-8 animate-fade-up delay-${i * 150}`}>
            <div className="text-2xl mb-4" style={{ color: "var(--rose)", fontFamily: "Georgia, serif", lineHeight: 1 }}>&ldquo;</div>
            <p className="text-sm leading-relaxed mb-5 italic" style={{ color: "#cfc0c5" }}>{t.quote}</p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: "linear-gradient(135deg, var(--rose-dark), var(--rose))" }}>
                {t.name[0]}
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--rose-light)" }}>{t.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─── CTA Banner ─── */
function CTABanner() {
  return (
    <section className="px-6 py-24 text-center relative overflow-hidden" style={{ background: "var(--bg2)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(201,98,122,0.12) 0%, transparent 65%)" }} />
      <div className="relative z-10 max-w-2xl mx-auto">
        <h2 className="mb-4" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 700 }}>
          Ready to feel like yourself again?
        </h2>
        <p className="mb-8 text-base" style={{ color: "var(--muted)" }}>Your personalized plan is 3 minutes away.</p>
        <Link href="/quiz" className="btn-primary text-base">
          Start My Free Assessment →
        </Link>
        <p className="mt-5 text-sm" style={{ color: "var(--muted)" }}>One-time $19.99 · No subscription · Instant access</p>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function Footer() {
  return (
    <footer className="px-6 py-6 text-center text-xs" style={{ color: "var(--muted)", borderTop: "1px solid var(--border)" }}>
      © {new Date().getFullYear()} ALVA 15. All rights reserved.
    </footer>
  );
}
