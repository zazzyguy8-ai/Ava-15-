import Link from "next/link";

export default function LandingPage() {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0f0810; }
        .land { background: linear-gradient(160deg,#13080f 0%,#1e0d1a 50%,#0e0a0f 100%); min-height: 100dvh; color:#fff; font-family: Inter, sans-serif; overflow-x:hidden; }

        /* Nav */
        .l-nav { position:fixed;top:0;left:0;right:0;z-index:50; display:flex;align-items:center;justify-content:space-between; padding:16px 24px; background:rgba(19,8,15,.88); backdrop-filter:blur(20px); border-bottom:1px solid rgba(201,98,122,.12); }
        .l-logo { font-family:'Playfair Display',serif;font-size:1rem;font-weight:700;letter-spacing:.18em;text-transform:uppercase; background:linear-gradient(135deg,#e8a0b0,#d4a96a); -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .l-nav-btn { padding:10px 22px;border-radius:99px;font-size:.82rem;font-weight:600; background:linear-gradient(135deg,#a04060,#c9627a); color:#fff;border:none;cursor:pointer; box-shadow:0 4px 16px rgba(201,98,122,.3); transition:transform .15s; text-decoration:none; display:inline-block; }
        .l-nav-btn:hover { transform:translateY(-1px); }

        /* Hero */
        .l-hero { min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center; text-align:center;padding:110px 24px 60px;position:relative; }
        .l-badge { display:inline-flex;align-items:center;gap:8px;font-size:.7rem;font-weight:600;letter-spacing:.18em;text-transform:uppercase; padding:7px 18px;border-radius:99px;margin-bottom:28px; background:rgba(201,98,122,.1);border:1px solid rgba(201,98,122,.28);color:#e8a0b0; }
        .l-badge-dot { width:6px;height:6px;border-radius:50%;background:#c9627a;animation:blink 2s ease-in-out infinite; }
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }

        .l-h1 { font-family:'Playfair Display',serif;font-size:clamp(2.2rem,7vw,4.2rem);font-weight:700;line-height:1.12;margin-bottom:22px;max-width:700px; }
        .l-h1 em { font-style:italic; background:linear-gradient(135deg,#e8a0b0 0%,#d4a96a 50%,#c9627a 100%); background-size:200% auto; -webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; animation:shimmer 4s linear infinite; }
        @keyframes shimmer { 0%{background-position:-200% center}100%{background-position:200% center} }

        .l-sub { font-size:clamp(.93rem,2.5vw,1.05rem);color:rgba(255,255,255,.48);line-height:1.75;max-width:440px;margin:0 auto 36px; }

        /* Price anchor */
        .l-price-anchor { display:inline-flex;align-items:center;gap:10px;margin-bottom:20px; padding:10px 22px;border-radius:99px; background:rgba(212,169,106,.08);border:1px solid rgba(212,169,106,.2); }
        .l-price-old { font-size:.9rem;color:rgba(255,255,255,.3);text-decoration:line-through; }
        .l-price-new { font-size:1.05rem;font-weight:700;color:#d4a96a; }
        .l-price-tag { font-size:.68rem;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#c9627a; padding:3px 8px;border-radius:99px;background:rgba(201,98,122,.15); }

        .l-cta { display:inline-flex;align-items:center;gap:10px;padding:18px 40px;border-radius:99px; font-size:1rem;font-weight:700;background:linear-gradient(135deg,#a04060,#c9627a);color:#fff;border:none;cursor:pointer; box-shadow:0 8px 32px rgba(201,98,122,.4);transition:transform .2s;text-decoration:none; animation:pulse-glow 2.5s ease-in-out infinite; }
        @keyframes pulse-glow { 0%,100%{box-shadow:0 8px 32px rgba(201,98,122,.4)} 50%{box-shadow:0 12px 48px rgba(201,98,122,.65)} }
        .l-cta:hover { transform:translateY(-3px) scale(1.02); }
        .l-cta:active { transform:scale(.97); }
        .l-note { margin-top:14px;font-size:.75rem;color:rgba(255,255,255,.25); }

        /* Stats */
        .l-stats { display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:340px;margin:36px auto 0; }
        .l-stat { background:rgba(255,255,255,.03);border:1px solid rgba(201,98,122,.13);border-radius:18px;padding:16px 8px;text-align:center; }
        .l-stat-n { font-family:'Playfair Display',serif;font-size:1.55rem;font-weight:700; background:linear-gradient(135deg,#e8a0b0,#d4a96a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text; }
        .l-stat-l { font-size:.62rem;color:rgba(255,255,255,.32);margin-top:3px;letter-spacing:.04em; }

        /* Blobs */
        .blob { position:absolute;border-radius:50%;pointer-events:none;filter:blur(90px); }

        /* Sections */
        .l-section { padding:80px 24px; }
        .l-section-title { font-family:'Playfair Display',serif;font-size:clamp(1.7rem,5vw,2.5rem);font-weight:700;text-align:center;margin-bottom:10px;line-height:1.2; }
        .l-divider { width:48px;height:2px;background:linear-gradient(90deg,transparent,#c9627a,transparent);margin:0 auto 44px; }

        /* Pain points */
        .l-pain-grid { display:grid;gap:14px;max-width:640px;margin:0 auto; }
        @media(min-width:600px){ .l-pain-grid { grid-template-columns:1fr 1fr; } }
        .l-pain { display:flex;align-items:flex-start;gap:14px;padding:20px;border-radius:18px; background:rgba(255,255,255,.03);border:1px solid rgba(201,98,122,.12); }
        .l-pain-check { width:22px;height:22px;border-radius:50%;background:rgba(201,98,122,.18);display:flex;align-items:center;justify-content:center;flex-shrink:0;margin-top:1px; }
        .l-pain p { font-size:.86rem;color:rgba(255,255,255,.55);line-height:1.6; }

        /* Benefits */
        .l-grid-4 { display:grid;grid-template-columns:repeat(2,1fr);gap:14px;max-width:700px;margin:0 auto; }
        @media(min-width:640px){ .l-grid-4 { grid-template-columns:repeat(4,1fr); } }
        .l-card { background:rgba(255,255,255,.03);border:1px solid rgba(201,98,122,.13);border-radius:22px;padding:26px 18px; transition:border-color .25s,transform .25s; }
        .l-card:hover { border-color:rgba(201,98,122,.38);transform:translateY(-3px); }
        .l-card-icon { width:38px;height:38px;border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:14px; background:rgba(201,98,122,.14); }
        .l-card-icon svg { width:18px;height:18px;stroke:#e8a0b0;fill:none;stroke-width:1.5; }
        .l-card h3 { font-size:.9rem;font-weight:600;margin-bottom:7px;color:#fff; }
        .l-card p { font-size:.78rem;color:rgba(255,255,255,.38);line-height:1.6; }

        /* Steps */
        .l-steps { display:flex;flex-direction:column;gap:0;max-width:520px;margin:0 auto; }
        .l-step { display:flex;gap:20px;padding:24px 0;border-bottom:1px solid rgba(201,98,122,.08); }
        .l-step:last-child { border-bottom:none; }
        .l-step-n { width:48px;height:48px;border-radius:50%;display:flex;align-items:center;justify-content:center;flex-shrink:0; font-family:'Playfair Display',serif;font-size:1rem;font-weight:700; background:linear-gradient(135deg,#a04060,#c9627a); box-shadow:0 4px 16px rgba(201,98,122,.35); }
        .l-step-body h3 { font-size:.92rem;font-weight:600;margin-bottom:5px; }
        .l-step-body p { font-size:.8rem;color:rgba(255,255,255,.38);line-height:1.6; }

        /* Testimonials */
        .l-test-grid { display:grid;gap:14px;max-width:860px;margin:0 auto; }
        @media(min-width:640px){ .l-test-grid { grid-template-columns:repeat(3,1fr); } }
        .l-test { background:rgba(255,255,255,.03);border:1px solid rgba(201,98,122,.12);border-radius:22px;padding:26px;position:relative; }
        .l-stars { display:flex;gap:3px;margin-bottom:14px; }
        .l-star { color:#d4a96a;font-size:.85rem; }
        .l-test-q { font-size:.83rem;color:rgba(255,255,255,.58);line-height:1.75;margin-bottom:18px; }
        .l-test-meta { display:flex;align-items:center;gap:10px; }
        .l-test-av { width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:.82rem;font-weight:700;flex-shrink:0; background:linear-gradient(135deg,#a04060,#c9627a); }
        .l-test-info { }
        .l-test-name { font-size:.82rem;font-weight:600;color:#e8a0b0;display:block; }
        .l-test-age { font-size:.72rem;color:rgba(255,255,255,.3); }

        /* Guarantee */
        .l-guarantee { max-width:560px;margin:0 auto;padding:28px;border-radius:24px; background:rgba(212,169,106,.06);border:1px solid rgba(212,169,106,.2);text-align:center; }
        .l-guarantee h3 { font-family:'Playfair Display',serif;font-size:1.15rem;font-weight:600;margin-bottom:10px;color:#d4a96a; }
        .l-guarantee p { font-size:.83rem;color:rgba(255,255,255,.45);line-height:1.7; }

        /* Bottom CTA */
        .l-cta-section { padding:80px 24px;text-align:center;position:relative;overflow:hidden; }

        /* Footer */
        .l-footer { padding:24px;text-align:center;font-size:.72rem;color:rgba(255,255,255,.18); border-top:1px solid rgba(201,98,122,.08); }

        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .fade-up { animation:fadeUp .7s ease both; }
      `}</style>

      <div className="land">
        {/* Nav */}
        <nav className="l-nav">
          <span className="l-logo">ALVA 15</span>
          <Link href="/quiz" className="l-nav-btn">Start Free →</Link>
        </nav>

        {/* Hero */}
        <section className="l-hero">
          <div className="blob" style={{ width: 520, height: 520, top: "0%", left: "50%", transform: "translateX(-50%)", background: "rgba(160,64,96,.13)" }} />
          <div className="blob" style={{ width: 300, height: 300, bottom: "5%", right: "-8%", background: "rgba(212,169,106,.08)" }} />

          <span className="l-badge fade-up">
            <span className="l-badge-dot" />
            For women 40–60
          </span>

          <h1 className="l-h1 fade-up">
            You deserve to wake up<br />
            feeling <em>energized,</em><br />
            <em>light and like yourself</em>
          </h1>

          <p className="l-sub fade-up">
            Answer 15 simple questions. Get a personalized 30-day wellness plan
            built around your body, your schedule and your goals.
            Just 15 minutes a day.
          </p>

          <div className="l-price-anchor fade-up">
            <span className="l-price-old">$19.99</span>
            <span className="l-price-new">$4.99</span>
            <span className="l-price-tag">Launch offer</span>
          </div>

          <Link href="/quiz" className="l-cta fade-up">
            Get My Personalized Plan
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </Link>
          <p className="l-note">3 minutes · No account required · 30-day money-back guarantee</p>

          <div className="l-stats fade-up">
            {[["30", "Day plan"], ["15", "Min / day"], ["100%", "Personal"]].map(([n, l]) => (
              <div key={l} className="l-stat">
                <div className="l-stat-n">{n}</div>
                <div className="l-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Pain points */}
        <section className="l-section" style={{ background: "rgba(30,13,26,.5)" }}>
          <h2 className="l-section-title">Does this sound familiar?</h2>
          <div className="l-divider" />
          <div className="l-pain-grid">
            {[
              "You wake up tired even after 7 hours of sleep",
              "You've tried diets and plans that worked for others — but not for you",
              "Your energy crashes in the afternoon and you reach for sugar or coffee",
              "Stress feels harder to shake than it used to",
              "You feel like your body changed and nothing fits anymore",
              "You know what you should do — you just can't make it stick",
            ].map(p => (
              <div key={p} className="l-pain">
                <div className="l-pain-check">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6l3 3 5-5" stroke="#e8a0b0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p>{p}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: "center", marginTop: 36, fontSize: ".88rem", color: "rgba(255,255,255,.35)", maxWidth: 400, margin: "36px auto 0" }}>
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
              { title: "Stress & Sleep", desc: "Evening rituals that calm your nervous system and improve deep sleep.", icon: <><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></> },
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
        <section className="l-section" style={{ background: "rgba(30,13,26,.5)" }}>
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
              { q: "I finally have a morning routine I actually stick to. My energy levels after two weeks are genuinely different. I didn't expect it to feel this personal.", n: "Sandra", age: "47, teacher" },
              { q: "It felt like the plan was written by someone who actually knows me. No generic advice, no impossible expectations. Just real, doable steps.", n: "Maria", age: "53, works from home" },
              { q: "The evening wind-down changed my sleep completely. I wake up rested for the first time in years. Worth every cent.", n: "Claire", age: "51, mother of 3" },
            ].map(t => (
              <div key={t.n} className="l-test">
                <div className="l-stars">
                  {[1,2,3,4,5].map(i => <span key={i} className="l-star">★</span>)}
                </div>
                <p className="l-test-q">"{t.q}"</p>
                <div className="l-test-meta">
                  <div className="l-test-av">{t.n[0]}</div>
                  <div className="l-test-info">
                    <span className="l-test-name">{t.n}</span>
                    <span className="l-test-age">{t.age}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Guarantee */}
        <section className="l-section" style={{ background: "rgba(30,13,26,.5)", paddingTop: 60, paddingBottom: 60 }}>
          <div className="l-guarantee">
            <div style={{ fontSize: "2rem", marginBottom: 12 }}>🛡</div>
            <h3>30-Day Money-Back Guarantee</h3>
            <p>
              Not happy with your plan? Email us within 30 days and we'll refund you — no questions asked.
              We're confident you'll love it, but we want you to feel safe trying it.
            </p>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="l-cta-section">
          <div className="blob" style={{ width: 420, height: 420, top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: "rgba(160,64,96,.11)" }} />
          <h2 className="l-section-title" style={{ position: "relative", zIndex: 1 }}>
            Ready to feel like yourself again?
          </h2>
          <p style={{ color: "rgba(255,255,255,.38)", margin: "12px auto 28px", position: "relative", zIndex: 1, fontSize: ".9rem", maxWidth: 380 }}>
            Your personalized plan is 3 minutes away.
            Women across Europe are starting their journey today.
          </p>

          <div className="l-price-anchor" style={{ display: "inline-flex", marginBottom: 20, position: "relative", zIndex: 1 }}>
            <span className="l-price-old">$19.99</span>
            <span className="l-price-new">$4.99</span>
            <span className="l-price-tag">Launch offer</span>
          </div>
          <br />

          <Link href="/quiz" className="l-cta" style={{ position: "relative", zIndex: 1 }}>
            Get My Personalized Plan →
          </Link>
          <p className="l-note" style={{ position: "relative", zIndex: 1, marginTop: 14 }}>
            No subscription · Instant access · 30-day money-back guarantee
          </p>
        </section>

        <footer className="l-footer">© {new Date().getFullYear()} ALVA 15. All rights reserved.</footer>
      </div>
    </>
  );
}
