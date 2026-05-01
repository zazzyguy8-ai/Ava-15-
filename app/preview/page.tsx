import Link from "next/link";
import { redirect } from "next/navigation";

export default async function PreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ a?: string }>;
}) {
  const { a: answersEncoded } = await searchParams;

  if (!answersEncoded) {
    redirect("/quiz");
  }

  // Decode name for personalisation
  let name = "You";
  try {
    const json = Buffer.from(decodeURIComponent(answersEncoded), "base64").toString("utf8");
    const answers = JSON.parse(json);
    if (answers.name) name = answers.name;
  } catch {}

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #fdf8f5; }
        .pv-wrap { min-height: 100dvh; font-family: Inter, sans-serif; color: #1e0f17; }
        .pv-nav { position: sticky; top: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; background: rgba(253,248,245,.92); backdrop-filter: blur(20px); border-bottom: 1px solid rgba(201,98,122,.1); }
        .pv-logo { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; background: linear-gradient(135deg,#c9627a,#a87c2a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .pv-badge { font-size: .68rem; font-weight: 600; letter-spacing: .15em; text-transform: uppercase; padding: 4px 12px; border-radius: 99px; background: rgba(168,124,42,.08); border: 1px solid rgba(168,124,42,.2); color: #a87c2a; }
        .pv-main { max-width: 680px; margin: 0 auto; padding: 48px 20px 80px; }
        .pv-header { text-align: center; margin-bottom: 44px; animation: fadeUp .6s ease both; }
        .pv-title { font-family: 'Playfair Display', serif; font-size: clamp(1.9rem,5vw,2.8rem); font-weight: 700; line-height: 1.2; margin: 0 0 14px; color: #1e0f17; }
        .pv-sub { font-size: .9rem; color: rgba(42,21,32,.42); margin: 0; }
        .pv-card { background: #fff; border: 1px solid rgba(201,98,122,.12); border-radius: 24px; padding: 28px 24px; margin-bottom: 20px; box-shadow: 0 2px 16px rgba(201,98,122,.06); animation: fadeUp .6s .1s ease both; }
        .pv-week-label { font-size: .65rem; font-weight: 600; letter-spacing: .22em; text-transform: uppercase; color: #c9627a; margin-bottom: 10px; }
        .pv-week-title { font-family: 'Playfair Display', serif; font-size: 1.15rem; font-weight: 600; margin-bottom: 8px; color: #1e0f17; }
        .pv-week-desc { font-size: .87rem; color: rgba(42,21,32,.52); line-height: 1.7; margin: 0; }
        .pv-locked { position: relative; overflow: hidden; }
        .pv-locked-inner { filter: blur(4px); pointer-events: none; user-select: none; opacity: .4; }
        .pv-lock-overlay { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px; }
        .pv-lock-icon { width: 40px; height: 40px; border-radius: 50%; background: rgba(201,98,122,.1); border: 1px solid rgba(201,98,122,.25); display: flex; align-items: center; justify-content: center; }
        .pv-lock-text { font-size: .75rem; color: rgba(42,21,32,.4); }
        .pv-includes { background: #fff; border: 1px solid rgba(201,98,122,.1); border-radius: 24px; padding: 28px 24px; margin-bottom: 32px; box-shadow: 0 2px 16px rgba(201,98,122,.05); animation: fadeUp .6s .2s ease both; }
        .pv-includes h3 { font-family: 'Playfair Display', serif; font-size: 1.05rem; font-weight: 600; margin: 0 0 18px; color: #1e0f17; }
        .pv-includes-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
        @media(max-width:480px) { .pv-includes-grid { grid-template-columns: 1fr; } }
        .pv-inc-item { display: flex; align-items: flex-start; gap: 10px; font-size: .84rem; color: rgba(42,21,32,.55); line-height: 1.5; }
        .pv-inc-check { width: 18px; height: 18px; border-radius: 50%; background: rgba(201,98,122,.1); color: #c9627a; font-size: .7rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
        .pv-cta { text-align: center; animation: fadeUp .6s .3s ease both; }
        .pv-price { font-family: 'Playfair Display', serif; font-size: 3.2rem; font-weight: 700; line-height: 1; color: #1e0f17; }
        .pv-price-note { font-size: .8rem; color: rgba(42,21,32,.35); margin: 6px 0 24px; }
        .pv-btn { display: inline-block; padding: 18px 48px; border-radius: 99px; background: linear-gradient(135deg,#a04060,#c9627a); color: #fff; font-weight: 700; font-size: 1rem; border: none; cursor: pointer; box-shadow: 0 8px 28px rgba(201,98,122,.3); letter-spacing: .02em; transition: transform .15s; text-decoration: none; }
        .pv-btn:active { transform: scale(.97); }
        .pv-trust { display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 18px; font-size: .75rem; color: rgba(42,21,32,.28); }
        @keyframes fadeUp { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
      `}</style>

      <div className="pv-wrap">
        <nav className="pv-nav">
          <span className="pv-logo">ALVA 15</span>
          <span className="pv-badge">Plan ready</span>
        </nav>

        <main className="pv-main">
          <div className="pv-header">
            <h1 className="pv-title">
              {name}, your 30-day plan<br />
              <span style={{ background: "linear-gradient(135deg,#e8a0b0,#d4a96a)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
                is ready
              </span>
            </h1>
            <p className="pv-sub">Unlock it below — instant access, one-time payment</p>
          </div>

          {/* Week 1 preview - visible */}
          <div className="pv-card">
            <p className="pv-week-label">Week 1 — Preview</p>
            <p className="pv-week-title">Awakening — Days 1–7</p>
            <p className="pv-week-desc">
              Your first week is all about laying the foundation. A gentle 15-minute morning ritual
              tailored to your wake time, an evening wind-down that melts the day's stress,
              and one simple nourishment shift that actually feels good.
            </p>
          </div>

          {/* Weeks 2-4 locked */}
          {[
            { week: "Week 2", title: "Building Your Rhythm — Days 8–14" },
            { week: "Week 3", title: "The Transformation Point — Days 15–21" },
            { week: "Week 4", title: "Your New Normal — Days 22–30" },
          ].map((w) => (
            <div key={w.week} className="pv-card pv-locked">
              <div className="pv-locked-inner">
                <p className="pv-week-label">{w.week}</p>
                <p className="pv-week-title">{w.title}</p>
                <p className="pv-week-desc">Your personalized routines, nutrition focus, and transformation tips for this week are waiting for you inside.</p>
              </div>
              <div className="pv-lock-overlay">
                <div className="pv-lock-icon">
                  <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
                    <rect x=".75" y="8.75" width="14.5" height="10.5" rx="2.25" stroke="#c9627a" strokeWidth="1.5"/>
                    <path d="M4 8.5V6a4 4 0 018 0v2.5" stroke="#c9627a" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <span className="pv-lock-text">Unlock to reveal</span>
              </div>
            </div>
          ))}

          {/* What's included */}
          <div className="pv-includes">
            <h3>Your plan includes</h3>
            <div className="pv-includes-grid">
              {[
                "4-week personalized daily plan",
                "Morning & evening rituals",
                "Weekly nutrition focus",
                "Energy & stress tips",
                "Hormonal balance guidance",
                "Saveable as PDF",
              ].map((item) => (
                <div key={item} className="pv-inc-item">
                  <span className="pv-inc-check">✓</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pv-cta">
            <div style={{ display: "flex", alignItems: "baseline", justifyContent: "center", gap: 12, marginBottom: 4 }}>
              <span style={{ fontSize: "1.1rem", color: "rgba(255,255,255,.3)", textDecoration: "line-through" }}>$19.99</span>
              <div className="pv-price">$4.99</div>
              <span style={{ fontSize: ".7rem", fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "#c9627a", padding: "4px 10px", borderRadius: 99, background: "rgba(201,98,122,.15)" }}>Launch offer</span>
            </div>
            <p className="pv-price-note">One-time · No subscription · 30-day money-back guarantee</p>

            <form action="/api/checkout" method="POST">
              <input type="hidden" name="a" value={answersEncoded} />
              <button type="submit" className="pv-btn">
                Unlock My Full Plan →
              </button>
            </form>

            <div className="pv-trust">
              <span>Secure payment</span>
              <span>·</span>
              <span>Powered by Stripe</span>
              <span>·</span>
              <span>Instant access</span>
            </div>
          </div>

          <div style={{ textAlign: "center", marginTop: 32 }}>
            <Link href="/quiz" style={{ fontSize: ".78rem", color: "rgba(255,255,255,.2)", textDecoration: "none" }}>
              ← Retake quiz
            </Link>
          </div>
        </main>
      </div>
    </>
  );
}
