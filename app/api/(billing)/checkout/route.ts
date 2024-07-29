// app/api/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

export async function POST(req: NextRequest) {
  const { plan, userId } = await req.json();

  let priceId: string | undefined;
  let mode: typeof PAYMENT_MODE | typeof SUBSCRIPTION_MODE;

  switch (plan) {
    case "lifetime":
      priceId = process.env.STRIPE_PRICE_ID_LIFETIME;
      mode = PAYMENT_MODE;
      break;
    case "monthly":
      priceId = process.env.STRIPE_PRICE_ID_MONTHLY;
      mode = SUBSCRIPTION_MODE;
      break;
    case "annual":
      priceId = process.env.STRIPE_PRICE_ID_YEARLY;
      mode = SUBSCRIPTION_MODE;
      break;
    default:
      return NextResponse.json({ error: "Invalid plan type" }, { status: 400 });
  }

  // Validate that priceId is not undefined
  if (!priceId) {
    return NextResponse.json(
      { error: "Price ID not defined for the selected plan" },
      { status: 400 }
    );
  }

  try {
    const metadata = {
      userId: String(userId), // Ensure it's a string
      planType: String(plan),
    };

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: mode as typeof SUBSCRIPTION_MODE | typeof PAYMENT_MODE,
      billing_address_collection: "required",
      success_url: `${process.env.BASE_URL}/payment-success`,
      cancel_url: `${process.env.BASE_URL}/account`,
      metadata, // Attach metadata here
    });

    return NextResponse.json({ sessionUrl: session.url, metadata: metadata });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
