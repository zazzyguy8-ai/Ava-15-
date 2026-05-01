import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fdf8f5; }
        .land { background: #fdf8f5; min-height: 100dvh; color: #2a1520; font-family: Inter, sans-serif; overflow-x: hidden; }

        /* Nav */
        .l-nav { position:fixed;top:0;left:0;right:0;z-index:50; display:flex;align-items:center;justify-content:space-between; padding:16px 24px; background:rgba(253,248,245,.92); backdrop-filter:blur(20px); border-bottom:1px solid rgba(201,98,122,.12); }
        .l-logo { font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase; background:linear-gradient(135deg,#c9627a,#a87c2a); -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .l-nav-btn { padding:10px 22px;border-radius:99px;font-size:.82rem;font-weight:600; background:linear-gradient(135deg,#a04060,#c9627a); color:#fff;border:none;cursor:pointer; box-shadow:0 4px 16px rgba(201,98,122,.25); transition:transform .15s; text-decoration:none; display:inline-block; }
        .l-nav-btn:hover { transform:translateY(-1px); }

        /* Hero */
        .l-hero { min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center; text-align:center;padding:110px 24px 60px;position:relative;overflow:hidden; }
        .l-hero-bg { position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,98,122,.08) 0%, transparent 70%);pointer-events:none; }
        .l-badge { display:inline-flex;align-items:center;gap:8px;font-size:.7rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase; padding:7px 18px;border-radius:99px;margin-bottom:28px; background:rgba(201,98,122,.08);border:1px solid rgba(201,98,122,.22);color:#c9627a; }
        .l-badge-dot { width:6px;height:6px;border-radius:50%;background:#c9627a;animation:blink 2s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

        .l-h1 { font-family:'Playfair Display',serif;font-size:clamp(2.2rem,7vw,4rem);font-weight:700;line-height:1.12;margin-bottom:22px;max-width:680px;color:#1e0f17; }
        .l-h1 em { font-style:italic; background:linear-gradient(135deg,#c9627a 0%,#a87c2a 100%); background-size:200% auto; -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; animation:shimmer 4s linear infinite; }
        @keyframes shimmer { 0%{background-position:-200% center}100%{background-position:200% center} }

        .l-sub { font-size:clamp(.93rem,2.5vw,1.05rem);color:rgba(42,21,32,.5);line-height:1.75;max-width:440px;margin:0 auto 36px; }

        /* Price anchor */
        .l-price-anchor { display:inline-flex;align-items:center;gap:10px;margin-bottom:20px; padding:10px 22px;border-radius:99px; background:rgba(168,124,42,.07);border:1px solid rgba(168,124,42,.2); }
        .l-price-old { font-size:.9rem;color:rgba(42,21,32,.3);text-decoration:line-through; }
        .l-price-new { font-size:1.05rem;font-weight:700;color:#a87c2a; }
        .l-price-tag { font-size:.65rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9627a; padding:3px 8px;border-radius:99px;background:rgba(201,98,122,.1); }

        .l-cta { display:inline-flex;align-items:center;gap:10px;padding:18px 40px;border-radius:99px; font-size:1rem;font-weight:700;background:linear-gradient(135deg,#a04060,#c9627a);color:#fff;border:none;cursor:pointer; box-shadow:0 8px 28px rgba(201,98,122,.35);transition:transform .2s;text-decoration:none; animation:pulse-glow 2.5s ease-in-out infinite; }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 8px 28px rgba(201,98,122,.35)} 50%{box-shadow:0 12px 40px rgba(201,98,122,.55)} }
        .l-cta:hover { transform:translateY(-2px) scale(1.02); }
        .l-note { margin-top:14px;font-size:.75rem;color:rgba(42,21,32,.35); }

        /* Stats */
        .l-stats { display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:340px;margin:36px auto 0; }
        .l-stat { background:#fff;border:1px solid rgba(201,98,122,.12);border-radius:18px;padding:16px 8px;text-align:center;box-shadow:0 2px 12px rgba(201,98,122,.06); }
        .l-stat-n { font-family:'Playfair Display',serif;font-size:1.55rem;font-weight:700; background:linear-gradient(135deg,#c9627a,#a87c2a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .l-stat-l { font-size:.62rem;color:rgba(42,21,32,.38);margin-top:3px; }

        /* Sections */
        .l-section { padding:80px 24px; }
        .l-section-alt { background: #f7f0ec; }
        .l-section-title { font-family:'Playfair Display',serif;font-size:clamp(1.7rem,5vw,2.4rem);font-weight:700;text-align:center;margin-bottom:10px;line-height:1.2;color:#1e0f17; }
        .l-divider { width:48px;height:2px;background:linear-gradient(90deg,transparent,#c9627a,transparent);margin:0 auto 44px; }

        /* Pain points */
        .l-pain-grid { display:grid;gap:12px;max-width:640px;margin:0 auto; }
        @media(min-width:600px){ .l-pain-grid { grid-template-columns:1fr 1fr; } }
        .l-pain { display:flex;align-items:flex-start;gap:14px;padding:18px 20px;border-radius:18px; background:#fff;border:1px solid rgba(201,98,122,.1);box-shadow:0 2px 10px rgba(201,98,122,.05); }
        .l-pain-check { width:22px;height:22px;border-radius:50%;background:rgba(201,98,122,.12);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px; }
        .l-pain p { font-size:.86rem;color:rgba(42,21,32,.58);line-height:1.65; }

        /* Benefits */
        .l-grid-4 { display:grid;grid-template-columns:repeat(2,1fr);gap:14px;max-width:700px;margin:0 auto; }
        @media(min-width:640px){ .l-grid-4 { grid-template-columns:repeat(4,1fr); } }
        .l-card { background:#fff;border:1px solid rgba(201,98,122,.1);border-radius:22px;padding:26px 18px;box-shadow:0 2px 16px rgba(201,98,122,.06); transition:transform .25s,box-shadow .25s; }
        .l-card:hover { transform:translateY(-3px);box-shadow:0 8px 28px rgba(201,98,122,.12); }
        .l-card-icon { width:40px;height:40px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:14px; background:rgba(201,98,122,.08); }
        .l-card-icon svg { width:18px;height:18px;stroke:#c9627a;fill:none;stroke-width:1.5; }
        .l-card h3 { font-size:.9rem;font-weight:600;margin-bottom:7px;color:#1e0f17; }
        .l-card p { font-size:.78rem;color:rgba(42,21,32,.45);line-height:1.6; }

        /* Steps */
        .l-steps { display:flex;flex-direction:column;gap:0;max-width:520px;margin:0 auto; }
        .l-step { display:flex;gap:20px;padding:24px 0;border-bottom:1px solid rgba(201,98,122,.08); }
        .l-step:last-child { border-bottom:none; }
        .l-step-n { width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0; font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;color:#fff; background:linear-gradient(135deg,#a04060,#c9627a); box-shadow:0 4px 16px rgba(201,98,122,.3); }
        .l-step-body h3 { font-size:.92rem;font-weight:600;margin-bottom:5px;color:#1e0f17; }
        .l-step-body p { font-size:.8rem;color:rgba(42,21,32,.45);line-height:1.6; }

        /* Testimonials */
        .l-test-grid { display:grid;gap:14px;max-width:860px;margin:0 auto; }
        @media(min-width:640px){ .l-test-grid { grid-template-columns:repeat(3,1fr); } }
        .l-test { background:#fff;border:1px solid rgba(201,98,122,.1);border-radius:22px;padding:26px;box-shadow:0 2px 16px rgba(201,98,122,.06); }
        .l-stars { display:flex;gap:3px;margin-bottom:14px; }
        .l-star { color:#a87c2a;font-size:.85rem; }
        .l-test-q { font-size:.83rem;color:rgba(42,21,32,.6);line-height:1.75;margin-bottom:18px;font-style:italic; }
        .l-test-meta { display:flex;align-items:center;gap:10px; }
        .l-test-av { width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.82rem;font-weight:700;flex-shrink:0;color:#fff; background:linear-gradient(135deg,#a04060,#c9627a); }
        .l-test-name { font-size:.82rem;font-weight:600;color:#c9627a;display:block; }
        .l-test-age { font-size:.72rem;color:rgba(42,21,32,.38); }

        /* Guarantee */
        .l-guarantee { max-width:560px;margin:0 auto;padding:32px;border-radius:24px; background:#fff;border:1px solid rgba(168,124,42,.2);text-align:center;box-shadow:0 4px 24px rgba(168,124,42,.08); }
        .l-guarantee h3 { font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:600;margin-bottom:10px;color:#a87c2a; }
        .l-guarantee p { font-size:.83rem;color:rgba(42,21,32,.5);line-height:1.7; }

        /* Bottom CTA */
        .l-cta-section { padding:80px 24px;text-align:center;background:#f7f0ec; }

        /* Footer */
        .l-footer { padding:24px;text-align:center;font-size:.72rem;color:rgba(42,21,32,.28); border-top:1px solid rgba(201,98,122,.1);background:#fdf8f5; }
      `}</style>

      <div className="land">
        <nav className="l-nav">
          <span className="l-logo">ALVA 15</span>
          <Link href="/quiz" className="l-nav-btn">Start Free →</Link>
        </nav>

        <section className="l-hero">
          <div className="l-hero-bg" />
          <span className="l-badge">
            <span className="l-badge-dot" />
            For women 40–60
          </span>
          <h1 className="l-h1">
            You deserve to wake up<br />
            feeling <em>energized,</em><br />
            <em>light and like yourself</em>
          </h1>
          <p className="l-sub">
            Answer 15 simple questions. Get a personalized 30-day wellness plan
            built around your body, your schedule and your goals. Just 15 minutes a day.
          </p>
          <div className="l-price-anchor">
            <span className="l-price-old">$19.99</span>
            <span className="l-price-new">$4.99</span>
            <span className="l-price-tag">Launch offer</span>
          </div>
          <Link href="/quiz" className="l-cta">
            Get My Personalized Plan
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <p className="l-note">3 minutes · No account required · 30-day money-back guarantee</p>
          <div className="l-stats">
            {[["30", "Day plan"], ["15", "Min / day"], ["100%", "Personal"]].map(([n, l]) => (
              <div key={l} className="l-stat">
                <div className="l-stat-n">{n}</div>
                <div className="l-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pain points */}
        <section className={`l-section l-section-alt`}>
          <h2 className="l-section-title">Does this sound familiar?</h2>
          <div className="l-divider" />
          <div className="l-pain-grid">
            {[
              "You wake up tired even after 7 hours of sleep",
              "You've tried plans that worked for others — but not for you",
              "Your energy crashes in the afternoon",
              "Stress feels harder to shake than it used to",
              "You feel like your body changed and nothing fits anymore",
              "You know what you should do — you just can't make it stick",
            ].map(p => (
              <div key={p} className="l-pain">
                <div className="l-pain-check">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#c9627a" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p>{p}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 36, fontSize: ".87rem", color: "rgba(42,21,32,.4)", maxWidth: 420, margin: "36px auto 0" }}>
            ALVA was built specifically for women in their 40s and 50s — because generic wellness plans simply don't work for your body.
          </p>
        </section>

        {/* Benefits */}
        <section className="l-section">
          <h2 className="l-section-title">What your plan covers</h2>
          <div className="l-divider" />
          <div className="l-grid-4">
            {[
              { title: "More Energy", desc: "Daily micro-habits that rebuild vitality without exhausting you.", icon: <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /> },
              { title: "Gentle Weight Support", desc: "No restriction, no crash diets. Sustainable shifts that last.", icon: <><circle cx="12" cy="8" r="4"/><path d="M6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2"/></> },
              { title: "Stress & Sleep", desc: "Evening rituals that calm your nervous system and improve deep sleep.", icon: <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/> },
              { title: "15 Min/Day", desc: "Routines designed for real, busy women. No gym required.", icon: <><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></> },
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
        <section className="l-section l-section-alt">
          <h2 className="l-section-title">How it works</h2>
          <div className="l-divider" />
          <div className="l-steps">
            {[
              { n: "01", t: "Answer 15 quick questions", d: "About your energy, sleep, stress, lifestyle and goals. Takes 3 minutes." },
              { n: "02", t: "Get your personalized plan", d: "Unlock for $4.99 — one-time, no subscription. Your plan is generated instantly." },
              { n: "03", t: "Start today, feel it in days", d: "Follow your 30-day plan. Just 15 minutes a day — morning and evening routines." },
            ].map(s => (
              <div key={s.n} className="l-step">
                <div className="l-step-n">{s.n}</div>
                <div className="l-step-body">
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section className="l-section">
          <h2 className="l-section-title">Women who tried it</h2>
          <div className="l-divider" />
          <div className="l-test-grid">
            {[
              { q: "I finally have a morning routine I actually stick to. My energy after two weeks is genuinely different. I didn't expect it to feel this personal.", n: "Sandra", age: "47, teacher" },
              { q: "It felt like the plan was written by someone who actually knows me. No generic advice, no impossible expectations. Just real, doable steps.", n: "Maria", age: "53, works from home" },
              { q: "The evening wind-down changed my sleep completely. I wake up rested for the first time in years. Worth every cent.", n: "Claire", age: "51, mother of 3" },
            ].map(t => (
              <div key={t.n} className="l-test">
                <div className="l-stars">{[1,2,3,4,5].map(i => <span key={i} className="l-star">★</span>)}</div>
                <p className="l-test-q">"{t.q}"</p>
                <div className="l-test-meta">
                  <div className="l-test-av">{t.n[0]}</div>
                  <div>
                    <span className="l-test-name">{t.n}</span>
                    <span className="l-test-age">{t.age}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guarantee */}
        <section className="l-section l-section-alt" style={{ paddingTop: 60, paddingBottom: 60 }}>
          <div className="l-guarantee">
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>🛡️</div>
            <h3>30-Day Money-Back Guarantee</h3>
            <p>Not happy with your plan? Email us within 30 days and we'll refund you — no questions asked. We're confident you'll love it, but we want you to feel safe trying it.</p>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="l-cta-section">
          <h2 className="l-section-title">Ready to feel like yourself again?</h2>
          <p style={{ color: "rgba(42,21,32,.42)", margin: "12px auto 24px", fontSize: ".9rem", maxWidth: 380 }}>
            Your personalized plan is 3 minutes away.
          </p>
          <div className="l-price-anchor" style={{ display: "inline-flex", marginBottom: 20 }}>
            <span className="l-price-old">$19.99</span>
            <span className="l-price-new">$4.99</span>
            <span className="l-price-tag">Launch offer</span>
          </div>
          <br />
          <Link href="/quiz" className="l-cta">Get My Personalized Plan →</Link>
          <p className="l-note" style={{ marginTop: 14 }}>No subscription · Instant access · 30-day money-back guarantee</p>
        </section>

        <footer className="l-footer">© {new Date().getFullYear()} ALVA 15. All rights reserved.</footer>
      </div>
    </>
  );
}
