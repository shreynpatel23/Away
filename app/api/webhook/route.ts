import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import mongoose from 'mongoose';
import User from '@/models/User'; 
import ConnectDB from '@/lib/mongodb';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!);

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export const POST = async (req: NextRequest) => {
  if (req.method === 'POST') {
    const buf = Buffer.from(await req.arrayBuffer());
    const sig = req.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      console.error(`⚠️  Webhook signature verification failed: `, err);
      return new NextResponse('Webhook Error: ', { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object as Stripe.Checkout.Session;

        console.log("session from webhook ---3433523", session);

        const email = session.customer_email; // Stripe Checkout Session's customer email
        const planType = session.metadata?.planType;

        if (email && planType) {
          try {
            await ConnectDB();
            await User.findOneAndUpdate(
              { email: email }, // Find the user by email
              {
                isPaid: true,
                planType: planType,
              }
            );
          } catch (dbErr) {
            console.error(`Database update failed`, dbErr);
            return new NextResponse('Database update failed', { status: 500 });
          }
        }
        break;

      case 'invoice.payment_succeeded':
        const invoice = event.data.object as Stripe.Invoice;

        const customerEmail = invoice.customer_email; // Stripe Invoice's customer email
        const planTypeForInvoice = invoice.metadata?.planType;
        

        console.log(customerEmail + "--------------------------------");
        console.log(invoice.metadata?.userId + "(((((((((((((()))))))))))))))))")
        console.log(planTypeForInvoice + "+++++++++++++++++++++++++++++++++");
        console.log(invoice.metadata + "(((((((((((((()))))))))))))))))")

        if (customerEmail && planTypeForInvoice) {
          try {
            await ConnectDB();
            const result = await User.findOneAndUpdate(
              { email: customerEmail }, // Find the user by email
              {
                isPaid: true,
                planType: planTypeForInvoice,
              }
            );

            console.log(result + "db responseeeee");

          } catch (dbErr) {
            console.error(`Database update failed`, dbErr);
            return new NextResponse('Database update failed', { status: 500 });
          }
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return new NextResponse('Received', { status: 200 });
  } else {
    return new NextResponse('Method Not Allowed', { status: 405, headers: { Allow: 'POST' } });
  }
};
