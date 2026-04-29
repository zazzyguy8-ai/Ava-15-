import { NextRequest } from "next/server";
import Stripe from "stripe";
import { markPaid } from "@/lib/sessions";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return Response.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-04-22.dahlia" });
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("Webhook error:", err);
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const s = event.data.object as Stripe.Checkout.Session;
    const sessionId = s.metadata?.sessionId;
    if (sessionId) markPaid(sessionId);
  }

  return Response.json({ received: true });
}
