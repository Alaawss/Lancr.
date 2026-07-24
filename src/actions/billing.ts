'use server';

import { createClient } from '@/lib/supabase/server';

export async function getSubscriptionStatus() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { plan: 'free', status: null, userId: null };
  }

  const { data: userData } = await supabase
    .from('users')
    .select('plan')
    .eq('id', user.id)
    .single();

  const { data: subData } = await supabase
    .from('subscriptions')
    .select('status')
    .eq('user_id', user.id)
    .single();

  return {
    plan: userData?.plan || 'free',
    status: subData?.status || null,
    userId: user.id,
  };
}
