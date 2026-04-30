import { NextRequest } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const answersEncoded = formData.get("a") as string;
    if (!answersEncoded) {
      return Response.json({ error: "Missing answers" }, { status: 400 });
    }

    // Decode to extract email for metadata
    let email = "";
    try {
      const json = Buffer.from(decodeURIComponent(answersEncoded), "base64").toString("utf8");
      const answers = JSON.parse(json);
      email = answers.email ?? "";
    } catch {}

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-04-22.dahlia" });
    const origin = req.headers.get("origin") ?? process.env.NEXT_PUBLIC_BASE_URL ?? "http://localhost:3000";

    // Split answersEncoded into ≤490-char chunks for Stripe metadata
    const chunks: Record<string, string> = {};
    const chunkSize = 490;
    for (let i = 0; i * chunkSize < answersEncoded.length; i++) {
      chunks[`a${i}`] = answersEncoded.slice(i * chunkSize, (i + 1) * chunkSize);
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [{
        price: process.env.STRIPE_PRICE_ID!,
        quantity: 1,
      }],
      customer_email: email || undefined,
      metadata: { email, ...chunks },
      success_url: `${origin}/results?cs={CHECKOUT_SESSION_ID}&a=${encodeURIComponent(answersEncoded)}`,
      cancel_url: `${origin}/preview?a=${encodeURIComponent(answersEncoded)}`,
    });

    return Response.redirect(session.url!, 303);
  } catch (err) {
    console.error("Checkout error:", err);
    return Response.json({ error: "Could not create checkout: " + String(err) }, { status: 500 });
  }
}
