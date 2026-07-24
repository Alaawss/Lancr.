'use server';

import { createClient } from '@/lib/supabase/server';
import { nanoid } from 'nanoid';

export async function joinCampaign(campaignId: string, email: string, referrerCode?: string) {
  const supabase = await createClient();
  
  // Verify campaign
  const { data: campaign, error: campaignError } = await supabase
    .from('campaigns')
    .select('status, signup_cap, signups(count)')
    .eq('id', campaignId)
    .single();

  if (campaignError || !campaign) {
    throw new Error('Campaign not found');
  }

  if (campaign.status === 'draft') {
    throw new Error('Campaign not found');
  }

  if (campaign.status === 'ended') {
    throw new Error('This campaign has ended');
  }

  if (campaign.signup_cap && campaign.signups[0].count >= campaign.signup_cap) {
    throw new Error('This campaign has reached its signup limit');
  }

  // Check if email already signed up
  const { data: existingSignup } = await supabase
    .from('signups')
    .select('*')
    .eq('campaign_id', campaignId)
    .eq('email', email)
    .single();

  if (existingSignup) {
    throw new Error("You've already joined this waitlist");
  }

  let referredById = null;
  let source = 'direct';

  if (referrerCode) {
    const { data: referrer } = await supabase
      .from('signups')
      .select('id')
      .eq('campaign_id', campaignId)
      .eq('referral_code', referrerCode)
      .single();

    if (referrer) {
      referredById = referrer.id;
      source = 'referral';
    }
  }

  const referralCode = nanoid(8);

  const { data: signup, error: signupError } = await supabase
    .from('signups')
    .insert({
      campaign_id: campaignId,
      email,
      referral_code: referralCode,
      referred_by: referredById,
      source,
    })
    .select()
    .single();

  if (signupError) {
    // Handle unique constraint violation specifically
    if (signupError.code === '23505') {
      throw new Error("You've already joined this waitlist");
    }
    throw new Error(signupError.message);
  }

  return signup;
}

export async function getSignupReferralCount(signupId: string) {
  const supabase = await createClient();

  const { count, error } = await supabase
    .from('signups')
    .select('*', { count: 'exact', head: true })
    .eq('referred_by', signupId);

  if (error) {
    console.error('Error fetching referral count:', error);
    return 0;
  }

  return count || 0;
}
