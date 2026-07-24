import { initializePaddle, Paddle } from '@paddle/paddle-js';

let paddleInstance: Paddle | undefined;

export async function getPaddleInstance() {
  if (paddleInstance) {
    return paddleInstance;
  }

  const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
  if (!clientToken) {
    console.warn('Paddle client token is missing. Billing features will not work.');
    return undefined;
  }

  try {
    paddleInstance = await initializePaddle({
      // `.env.example` documents NEXT_PUBLIC_PADDLE_ENV. Keep the legacy name
      // as a fallback so existing local setups do not silently break.
      environment: (process.env.NEXT_PUBLIC_PADDLE_ENV ?? process.env.NEXT_PUBLIC_PADDLE_ENVIRONMENT) === 'production' ? 'production' : 'sandbox',
      token: clientToken,
    });
    return paddleInstance;
  } catch (err) {
    console.error('Failed to initialize Paddle:', err);
    return undefined;
  }
}
