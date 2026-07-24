'use client';

import { useState } from 'react';
import { getPaddleInstance } from '@/lib/paddle/client';

type PaddleCheckoutButtonProps = {
  userId: string;
};

export function PaddleCheckoutButton({ userId }: PaddleCheckoutButtonProps) {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function openCheckout() {
    setError(null);
    const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_ID;

    if (!priceId) {
      setError('Sandbox checkout is not configured. Add NEXT_PUBLIC_PADDLE_PRICE_ID and restart the app.');
      return;
    }

    setLoading(true);
    try {
      const paddle = await getPaddleInstance();
      if (!paddle) {
        setError('Sandbox checkout could not start. Check NEXT_PUBLIC_PADDLE_CLIENT_TOKEN and restart the app.');
        return;
      }

      paddle.Checkout.open({
        items: [{ priceId, quantity: 1 }],
        customData: { userId },
      });
    } catch {
      setError('Sandbox checkout could not open. Please refresh and try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        onClick={openCheckout}
        disabled={loading}
        className="w-full rounded-2xl bg-[#FF2A54] py-2 font-medium text-white shadow-sm transition-colors hover:bg-[#E62348] disabled:cursor-not-allowed disabled:opacity-60 font-small"
      >
        {loading ? 'Opening sandbox checkout…' : 'Upgrade to Pro'}
      </button>
      {error && <p className="mt-2 text-sm text-red-600" role="alert">{error}</p>}
    </div>
  );
}
