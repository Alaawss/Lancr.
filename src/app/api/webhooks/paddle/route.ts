import { NextResponse } from 'next/server';
import { Paddle, EventName } from '@paddle/paddle-node-sdk';
import { createClient } from '@/lib/supabase/server';

const paddle = new Paddle(process.env.PADDLE_API_KEY || 'dummy_key');
const webhookSecret = process.env.PADDLE_WEBHOOK_SECRET || '';

export async function POST(req: Request) {
  try {
    const signature = req.headers.get('paddle-signature');
    if (!signature || !webhookSecret) {
      console.warn('Missing signature or webhook secret');
      return NextResponse.json({ error: 'Invalid configuration or signature' }, { status: 400 });
    }

    const rawBody = await req.text();
    let eventData;
    
    try {
      eventData = await paddle.webhooks.unmarshal(rawBody, webhookSecret, signature);
    } catch (e) {
      console.error('Webhook signature verification failed:', e);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }

    if (!eventData) {
      return NextResponse.json({ error: 'No event data' }, { status: 400 });
    }

    const supabase = await createClient();

    switch (eventData.eventType) {
      case EventName.SubscriptionCreated:
      case EventName.SubscriptionUpdated: {
        const subscription = eventData.data as any;
        const userId = subscription.customData?.userId;
        if (userId) {
          await supabase.from('users').update({ plan: 'premium' }).eq('id', userId);
          await supabase.from('subscriptions').upsert({
            user_id: userId,
            paddle_subscription_id: subscription.id,
            status: subscription.status,
            updated_at: new Date().toISOString(),
          });
        }
        break;
      }
      case EventName.SubscriptionCanceled: {
        const subscription = eventData.data as any;
        const userId = subscription.customData?.userId;
        if (userId) {
          await supabase.from('users').update({ plan: 'free' }).eq('id', userId);
          await supabase.from('subscriptions').update({ status: 'canceled' }).eq('paddle_subscription_id', subscription.id);
        }
        break;
      }
      default:
        console.log(`Unhandled webhook event: ${eventData.eventType}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Webhook handler error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
