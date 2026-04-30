import { NextRequest } from "next/server";
import Stripe from "stripe";
import { Resend } from "resend";

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
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.metadata?.email;
    const checkoutId = session.id;

    // Reconstruct answersEncoded from metadata chunks
    let answersEncoded = "";
    for (let i = 0; session.metadata?.[`a${i}`]; i++) {
      answersEncoded += session.metadata[`a${i}`];
    }

    if (email && answersEncoded) {
      try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? "https://ava-15.onrender.com";
        const planUrl = `${baseUrl}/results?cs=${checkoutId}&a=${encodeURIComponent(answersEncoded)}`;

        await resend.emails.send({
          from: "ALVA 15 <onboarding@resend.dev>",
          to: email,
          subject: "Your 30-Day ALVA Plan is ready",
          html: `
            <div style="font-family:Georgia,serif;max-width:520px;margin:0 auto;padding:40px 24px;background:#13080f;color:#fff;border-radius:16px;">
              <h1 style="font-size:1.6rem;font-weight:700;margin-bottom:8px;background:linear-gradient(135deg,#e8a0b0,#d4a96a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
                Your ALVA plan is ready
              </h1>
              <p style="color:rgba(255,255,255,.6);font-size:.9rem;line-height:1.7;margin-bottom:28px;">
                Your personalized 30-day health journey has been generated just for you.
                Click the button below to view it anytime — and save it as PDF so you always have it.
              </p>
              <a href="${planUrl}"
                style="display:inline-block;padding:14px 32px;border-radius:99px;background:linear-gradient(135deg,#a04060,#c9627a);color:#fff;font-weight:700;font-size:.95rem;text-decoration:none;">
                View My 30-Day Plan →
              </a>
              <p style="margin-top:32px;color:rgba(255,255,255,.25);font-size:.75rem;">
                ALVA 15 · Built for women 40–60
              </p>
            </div>
          `,
        });
        console.log("Email sent to:", email);
      } catch (err) {
        console.error("Resend error:", err);
      }
    }
  }

  return Response.json({ received: true });
}
