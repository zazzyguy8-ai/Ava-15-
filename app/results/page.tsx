import Link from "next/link";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { StreamingPlan } from "./StreamingPlan";
import { PrintButton } from "./PrintButton";

export default async function ResultsPage({
  searchParams,
}: {
  searchParams: Promise<{ cs?: string; a?: string }>;
}) {
  const { cs: checkoutSessionId, a: answersEncoded } = await searchParams;

  // Must have answers to generate anything
  if (!answersEncoded) {
    redirect("/quiz");
  }

  // Verify Stripe payment
  if (checkoutSessionId) {
    try {
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-04-22.dahlia" });
      const session = await stripe.checkout.sessions.retrieve(checkoutSessionId);
      if (session.payment_status !== "paid") {
        redirect(`/preview?a=${encodeURIComponent(answersEncoded)}`);
      }
    } catch {
      redirect(`/preview?a=${encodeURIComponent(answersEncoded)}`);
    }
  } else {
    // No checkout session → send to preview/payment
    redirect(`/preview?a=${encodeURIComponent(answersEncoded)}`);
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; }
        body { margin: 0; background: #fdf8f5; }
        .res-wrap { min-height: 100dvh; font-family: Inter, sans-serif; color: #1e0f17; }
        .res-nav { position: sticky; top: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between; padding: 16px 24px; background: rgba(253,248,245,.92); backdrop-filter: blur(20px); -webkit-backdrop-filter: blur(20px); border-bottom: 1px solid rgba(201,98,122,.1); }
        .res-logo { font-family: 'Playfair Display', serif; font-size: 1rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; background: linear-gradient(135deg,#c9627a,#a87c2a); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
        .res-main { max-width: 760px; margin: 0 auto; padding: 40px 20px 80px; }
        .res-header { text-align: center; margin-bottom: 40px; }
        .res-badge { display: inline-block; font-size: .68rem; font-weight: 600; letter-spacing: .2em; text-transform: uppercase; padding: 5px 14px; border-radius: 99px; background: rgba(168,124,42,.08); border: 1px solid rgba(168,124,42,.2); color: #a87c2a; margin-bottom: 16px; }
        .res-title { font-family: 'Playfair Display', serif; font-size: clamp(1.8rem,5vw,2.8rem); font-weight: 700; margin: 0 0 10px; line-height: 1.2; color: #1e0f17; }
        .res-sub { font-size: .85rem; color: rgba(42,21,32,.38); margin: 0; }
        .res-card { background: #fff; border: 1px solid rgba(201,98,122,.12); border-radius: 24px; padding: 32px 28px; box-shadow: 0 4px 24px rgba(201,98,122,.07); }
        @media(max-width: 600px) { .res-card { padding: 24px 18px; border-radius: 18px; } }
        .res-back { display: block; text-align: center; margin-top: 32px; font-size: .8rem; color: rgba(42,21,32,.28); text-decoration: none; transition: color .2s; }
        .res-back:hover { color: rgba(42,21,32,.5); }
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
            <StreamingPlan planParam={answersEncoded} isEncoded={true} />
          </div>

          <Link href="/" className="res-back">← Back to ALVA 15</Link>
        </main>
      </div>
    </>
  );
}
