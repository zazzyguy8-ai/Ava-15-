import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
        .land { background: linear-gradient(160deg,#13080f 0%,#1e0d1a 50%,#0e0a0f 100%); min-height: 100dvh; color:#fff; font-family: Inter, sans-serif; overflow-x:hidden; }
        /* Nav */
        .l-nav { position:fixed;top:0;left:0;right:0;z-index:50; display:flex;align-items:center;justify-content:space-between; padding:18px 28px; background:rgba(19,8,15,.8); backdrop-filter:blur(20px); -webkit-backdrop-filter:blur(20px); border-bottom:1px solid rgba(201,98,122,.12); }
        .l-logo { font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase; background:linear-gradient(135deg,#e8a0b0,#d4a96a); -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .l-nav-btn { padding:10px 22px;border-radius:99px;font-size:.82rem;font-weight:600; background:linear-gradient(135deg,#a04060,#c9627a); color:#fff;border:none;cursor:pointer; box-shadow:0 4px 16px rgba(201,98,122,.3); transition:transform .15s,box-shadow .15s; text-decoration:none; }
        .l-nav-btn:hover { transform:translateY(-1px);box-shadow:0 6px 24px rgba(201,98,122,.45); }
        /* Hero */
        .l-hero { min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center; text-align:center;padding:100px 24px 60px;position:relative; }
        .l-badge { display:inline-block;font-size:.7rem;font-weight:600;letter-spacing:.2em;text-transform:uppercase; padding:6px 16px;border-radius:99px;margin-bottom:28px; background:rgba(201,98,122,.1);border:1px solid rgba(201,98,122,.28);color:#e8a0b0; }
        .l-h1 { font-family:'Playfair Display',serif;font-size:clamp(2.4rem,8vw,4.5rem);font-weight:700;line-height:1.1;margin-bottom:22px; }
        .l-h1 em { font-style:italic; background:linear-gradient(135deg,#e8a0b0 0%,#d4a96a 50%,#c9627a 100%); background-size:200% auto; -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; animation:shimmer 4s linear infinite; }
        @keyframes shimmer { 0%{background-position:-200% center}100%{background-position:200% center} }
        .l-sub { font-size:clamp(.95rem,3vw,1.1rem);color:rgba(255,255,255,.5);line-height:1.7;max-width:460px;margin:0 auto 36px; }
        .l-cta { display:inline-flex;align-items:center;gap:10px;padding:16px 36px;border-radius:99px; font-size:1rem;font-weight:600;background:linear-gradient(135deg,#a04060,#c9627a);color:#fff;border:none;cursor:pointer; box-shadow:0 8px 32px rgba(201,98,122,.4);transition:transform .2s,box-shadow .2s;text-decoration:none; animation:pulse-ring 2.5s ease-in-out infinite; }
        @keyframes pulse-ring { 0%,100%{box-shadow:0 8px 32px rgba(201,98,122,.4)} 50%{box-shadow:0 8px 40px rgba(201,98,122,.65)} }
        .l-cta:hover { transform:translateY(-3px) scale(1.03); }
        .l-cta:active { transform:scale(.97); }
        .l-note { margin-top:16px;font-size:.78rem;color:rgba(255,255,255,.28); }
        /* Stats */
        .l-stats { display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:340px;margin:40px auto 0; }
        .l-stat { background:rgba(255,255,255,.04);border:1px solid rgba(201,98,122,.15);border-radius:18px;padding:18px 8px;text-align:center; }
        .l-stat-n { font-family:'Playfair Display',serif;font-size:1.6rem;font-weight:700; background:linear-gradient(135deg,#e8a0b0,#d4a96a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .l-stat-l { font-size:.65rem;color:rgba(255,255,255,.35);margin-top:2px;letter-spacing:.05em; }
        /* Blobs */
        .blob { position:absolute;border-radius:50%;pointer-events:none;filter:blur(80px); }
        /* Benefits */
        .l-section { padding:80px 24px; }
        .l-section-title { font-family:'Playfair Display',serif;font-size:clamp(1.8rem,5vw,2.6rem);font-weight:700;text-align:center;margin-bottom:10px; }
        .l-divider { width:50px;height:2px;background:linear-gradient(90deg,transparent,#c9627a,transparent);margin:0 auto 48px; }
        .l-grid-4 { display:grid;grid-template-columns:repeat(2,1fr);gap:16px;max-width:700px;margin:0 auto; }
        @media(min-width:640px){.l-grid-4{grid-template-columns:repeat(4,1fr);}}
        .l-card { background:rgba(255,255,255,.03);border:1px solid rgba(201,98,122,.14);border-radius:24px;padding:28px 20px; transition:border-color .25s,background .25s,transform .25s; }
        .l-card:hover { border-color:rgba(201,98,122,.4);background:rgba(201,98,122,.06);transform:translateY(-3px); }
        .l-card-icon { width:36px;height:36px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px; background:rgba(201,98,122,.15); }
        .l-card-icon svg { width:18px;height:18px;stroke:#e8a0b0;fill:none;stroke-width:1.5; }
        .l-card h3 { font-size:.92rem;font-weight:600;margin-bottom:8px;color:#fff; }
        .l-card p { font-size:.8rem;color:rgba(255,255,255,.4);line-height:1.6; }
        /* Steps */
        .l-steps { display:flex;flex-direction:column;gap:20px;max-width:440px;margin:0 auto; }
        @media(min-width:600px){.l-steps{flex-direction:row;max-width:800px;}}
        .l-step { flex:1;display:flex;flex-direction:column;align-items:center;text-align:center; }
        .l-step-n { width:56px;height:56px;border-radius:50%;display:flex;align-items:center;justify-content:center; font-family:'Playfair Display',serif;font-size:1.1rem;font-weight:700; background:linear-gradient(135deg,#a04060,#c9627a); box-shadow:0 4px 20px rgba(201,98,122,.4);margin-bottom:16px; }
        .l-step h3 { font-size:.92rem;font-weight:600;margin-bottom:6px; }
        .l-step p { font-size:.8rem;color:rgba(255,255,255,.4);line-height:1.6; }
        /* Testimonials */
        .l-test-grid { display:grid;gap:16px;max-width:900px;margin:0 auto; }
        @media(min-width:640px){.l-test-grid{grid-template-columns:repeat(3,1fr);}}
        .l-test { background:rgba(255,255,255,.03);border:1px solid rgba(201,98,122,.13);border-radius:24px;padding:28px;position:relative; }
        .l-test::before { content:'"';position:absolute;top:16px;left:22px;font-size:3rem;line-height:1;color:rgba(201,98,122,.25);font-family:'Playfair Display',serif; }
        .l-test-q { font-size:.83rem;font-style:italic;color:rgba(255,255,255,.55);line-height:1.7;margin-bottom:18px;padding-top:24px; }
        .l-test-meta { display:flex;align-items:center;gap:10px; }
        .l-test-av { width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.8rem;font-weight:700; background:linear-gradient(135deg,#a04060,#c9627a); }
        .l-test-name { font-size:.8rem;font-weight:600;color:#e8a0b0; }
        /* CTA banner */
        .l-cta-section { padding:80px 24px;text-align:center;position:relative;overflow:hidden; background:rgba(30,13,26,.6); }
        /* Footer */
        .l-footer { padding:24px;text-align:center;font-size:.72rem;color:rgba(255,255,255,.2); border-top:1px solid rgba(201,98,122,.1); }
      `}</style>

      <div className="land">
        {/* Nav */}
        <nav className="l-nav">
          <span className="l-logo">ALVA 15</span>
          <Link href="/quiz" className="l-nav-btn">Begin Assessment</Link>
        </nav>

        {/* Hero */}
        <section className="l-hero">
          <div className="blob" style={{ width: 500, height: 500, top: "5%", left: "50%", transform: "translateX(-50%)", background: "rgba(160,64,96,.15)", animation: "pulse-ring 5s ease-in-out infinite" }} />
          <div className="blob" style={{ width: 280, height: 280, bottom: "10%", right: "-5%", background: "rgba(212,169,106,.09)" }} />

          <span className="l-badge">Designed for women 40–60</span>
          <h1 className="l-h1">
            30 days to feel<br />
            <em>energized, balanced</em><br />
            and like yourself
          </h1>
          <p className="l-sub">
            Answer 15 questions. Get an AI-generated daily plan tailored
            to your body, lifestyle and goals — just 15 minutes a day.
          </p>
          <Link href="/quiz" className="l-cta">
            Start My Free Assessment
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <p className="l-note">3 minutes · No account required · $19.99 one-time</p>
          <div className="l-stats">
            {[["30", "Day Plan"], ["15", "Min/Day"], ["100%", "Personal"]].map(([n, l]) => (
              <div key={l} className="l-stat">
                <div className="l-stat-n">{n}</div>
                <div className="l-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section className="l-section" style={{ background: "rgba(30,13,26,.5)" }}>
          <h2 className="l-section-title">What your plan covers</h2>
          <div className="l-divider" />
          <div className="l-grid-4">
            {[
              { title: "More Energy", desc: "Daily micro-habits that rebuild vitality without exhausting you.", icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /> },
              { title: "Weight Support", desc: "Gentle, sustainable guidance. Not a crash diet.", icon: <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></> },
              { title: "Less Stress", desc: "Simple evening rituals to calm your nervous system.", icon: <><path d="M18 8h1a4 4 0 010 8h-1"/><path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></> },
              { title: "15 Min/Day", desc: "Realistic routines that fit into a real, busy life.", icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></> },
            ].map(b => (
              <div key={b.title} className="l-card">
                <div className="l-card-icon"><svg viewBox="0 0 24 24">{b.icon}</svg></div>
                <h3>{b.title}</h3>
                <p>{b.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How it works */}
        <section className="l-section">
          <h2 className="l-section-title">How it works</h2>
          <div className="l-divider" />
          <div className="l-steps">
            {[
              { n: "01", t: "Answer 15 questions", d: "About your energy, lifestyle, goals and daily schedule." },
              { n: "02", t: "Unlock your plan", d: "One-time $19.99. No subscription, instant access." },
              { n: "03", t: "Start today", d: "Your personalized 30-day plan is ready in seconds." },
            ].map(s => (
              <div key={s.n} className="l-step">
                <div className="l-step-n">{s.n}</div>
                <h3>{s.t}</h3>
                <p>{s.d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="l-section" style={{ background: "rgba(30,13,26,.5)" }}>
          <h2 className="l-section-title">Real women, real results</h2>
          <div className="l-divider" />
          <div className="l-test-grid">
            {[
              { q: "I finally have a morning routine I actually stick to. My energy is so much better after just two weeks.", n: "Sandra, 47" },
              { q: "It felt like the plan was made specifically for me — because it was. No generic advice at all.", n: "Maria, 53" },
              { q: "The evening wind-down routine changed everything for my sleep. I wake up rested for the first time in years.", n: "Claire, 51" },
            ].map(t => (
              <div key={t.n} className="l-test">
                <p className="l-test-q">{t.q}</p>
                <div className="l-test-meta">
                  <div className="l-test-av">{t.n[0]}</div>
                  <span className="l-test-name">{t.n}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="l-cta-section">
          <div className="blob" style={{ width: 400, height: 400, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "rgba(160,64,96,.12)" }} />
          <h2 className="l-section-title" style={{ position: "relative", zIndex: 1 }}>Ready to feel like yourself again?</h2>
          <p style={{ color: "rgba(255,255,255,.4)", marginBottom: 32, position: "relative", zIndex: 1, fontSize: ".9rem" }}>Your personalized plan is 3 minutes away.</p>
          <Link href="/quiz" className="l-cta" style={{ position: "relative", zIndex: 1 }}>
            Start My Free Assessment →
          </Link>
          <p className="l-note" style={{ position: "relative", zIndex: 1 }}>One-time $19.99 · No subscription · Instant access</p>
        </section>

        <footer className="l-footer">© {new Date().getFullYear()} ALVA 15. All rights reserved.</footer>
      </div>
    </>
  );
}
