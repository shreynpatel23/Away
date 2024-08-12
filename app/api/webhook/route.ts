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

    const buf = Buffer.from(await req.arrayBuffer());
    const sig = req.headers.get('stripe-signature')!;

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err) {
      return new NextResponse('Webhook Error: ', { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      
      case 'checkout.session.completed':
        const session =  event.data.object as Stripe.Checkout.Session;



        const email = session.metadata?.userId;
        const planType = session.metadata?.planType;



        if (email && planType) {
          
          try {
            await ConnectDB();
            await User.findOneAndUpdate(
              { email: email }, 
              {
                isPaidUser: true,
                planType: planType,
              }
            );
          } catch (dbErr) {
            
            return new NextResponse('Database update failed', { status: 500 });
          }
        }
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);

    return new NextResponse('Received', { status: 200 });
  } 
};
