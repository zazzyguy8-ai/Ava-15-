import Link from "next/link";
import { StreamingPlan } from "./StreamingPlan";
import { PrintButton } from "./PrintButton";

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ s?: string; a?: string }>;
}) {
  const { s: sessionId, a: answersEncoded } = await searchParams;
  const planParam = answersEncoded ?? sessionId;

  if (!planParam) {
    return (
      <div style={{ minHeight: "100dvh", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(160deg,#13080f,#1e0d1a)" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,.4)", marginBottom: 20 }}>No session found.</p>
          <Link href="/quiz" style={{ padding: "12px 28px", borderRadius: 99, background: "linear-gradient(135deg,#a04060,#c9627a)", color: "#fff", textDecoration: "none", fontWeight: 600, fontSize: ".9rem" }}>
            Take the quiz →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: linear-gradient(160deg,#13080f 0%,#1e0d1a 60%,#0e0a0f 100%); }
        .res-wrap { min-height: 100dvh; font-family: Inter, sans-serif; color: #fff; }
        .res-nav { position: sticky; top: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; background: rgba(19,8,15,.85); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(201,98,122,.12); }
        .res-logo { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; background: linear-gradient(135deg,#e8a0b0,#d4a96a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .res-main { max-width: 760px; margin: 0 auto; padding: 40px 20px 80px; }
        .res-header { text-align: center; margin-bottom: 40px; }
        .res-badge { display: inline-block; font-size: .68rem; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; padding: 5px 14px; border-radius: 99px; background: rgba(212,169,106,.1); border: 1px solid rgba(212,169,106,.25); color: #d4a96a; margin-bottom: 16px; }
        .res-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,5vw,2.8rem); font-weight: 700; margin: 0 0 10px; line-height: 1.2; }
        .res-sub { font-size: .85rem; color: rgba(255,255,255,.35); margin: 0; }
        .res-card { background: rgba(255,255,255,.03); border: 1px solid rgba(201,98,122,.15); border-radius: 24px; padding: 32px 28px; }
        @media(max-width: 600px) { .res-card { padding: 24px 18px; border-radius: 18px; } }
        .res-back { display: block; text-align: center; margin-top: 32px; font-size: .8rem; color: rgba(255,255,255,.25); text-decoration: none; transition: color .2s; }
        .res-back:hover { color: rgba(255,255,255,.5); }
        @keyframes fadeUp { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
        .res-header { animation: fadeUp .6s ease both; }
        .res-card { animation: fadeUp .6s .15s ease both; }
      `}</style>

      <div className="res-wrap">
        <nav className="res-nav">
          <span className="res-logo">ALVA 15</span>
          <PrintButton />
        </nav>

        <main className="res-main">
          <div className="res-header">
            <span className="res-badge">Your personalized plan</span>
            <h1 className="res-title">Your 30-Day ALVA Journey</h1>
            <p className="res-sub">Generated just for you · Start today</p>
          </div>

          <div className="res-card">
            <StreamingPlan planParam={planParam} isEncoded={!!answersEncoded} />
          </div>

          <Link href="/" className="res-back">← Back to ALVA 15</Link>
        </main>
      </div>
    </>
  );
}
