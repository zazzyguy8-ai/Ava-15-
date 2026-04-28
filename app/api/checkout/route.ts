import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const sessionId = formData.get("sessionId") as string;
    if (!sessionId) return Response.json({ error: "Missing sessionId" }, { status: 400 });

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-04-22.dahlia" });
    const origin = req.headers.get("origin") || process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const checkoutSession = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        price_data: {
          currency: "usd",
          unit_amount: 1999,
          product_data: {
            name: "ALVA 15 — Your Personalized 30-Day Health Plan",
            description: "AI-generated daily health routines tailored for women 40–60",
          },
        },
        quantity: 1,
      }],
      metadata: { sessionId },
      success_url: `${origin}/results?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/preview?s=${sessionId}`,
    });

    return Response.redirect(checkoutSession.url!, 303);
  } catch (err) {
    console.error("checkout error:", err);
    return Response.json({ error: "Could not create checkout session" }, { status: 500 });
  }
}
