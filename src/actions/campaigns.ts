'use server';

import { createClient } from '@/lib/supabase/server';
import { revalidatePath } from 'next/cache';

const CAMPAIGN_CATEGORIES = [
  'mobile_app',
  'saas',
  'website',
  'product',
  'event',
  'course',
  'community',
  'newsletter',
  'game',
  'other',
] as const;

type CampaignCategory = (typeof CAMPAIGN_CATEGORIES)[number];
type CampaignStatus = 'draft' | 'published' | 'ended';

type CreateCampaignInput = {
  name: string;
  description: string;
  category: string;
  slug: string;
  launchDate: string | null;
  signupCap: number;
  benefits: string[];
  status?: CampaignStatus;
};

function formatDatabaseError(prefix: string, error: { message: string; code?: string; details?: string | null; hint?: string | null }) {
  const metadata = [error.code, error.details, error.hint].filter(Boolean).join(' — ');
  return `${prefix}: ${error.message}${metadata ? ` (${metadata})` : ''}`;
}

async function requireAuthenticatedUser() {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error) {
    throw new Error(`Unable to verify your session. Please refresh the page and sign in again. (${error.message})`);
  }

  if (!user) {
    throw new Error('Your session has expired. Please sign in again.');
  }

  return { supabase, user };
}

function validateCreateCampaignInput(data: CreateCampaignInput) {
  const name = data.name.trim();
  const description = data.description.trim();
  const slug = data.slug.trim().toLowerCase();

  if (!name || !description) throw new Error('Campaign name and description are required.');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
    throw new Error('Use lowercase letters, numbers, and single hyphens for the campaign link.');
  }
  if (!CAMPAIGN_CATEGORIES.includes(data.category as CampaignCategory)) {
    throw new Error('Choose a valid campaign category.');
  }
  if (!Number.isInteger(data.signupCap) || data.signupCap < 1) {
    throw new Error('Signup cap must be at least 1.');
  }
  if (data.status && !['draft', 'published', 'ended'].includes(data.status)) {
    throw new Error('Choose a valid campaign status.');
  }

  return {
    name,
    description,
    slug,
    category: data.category as CampaignCategory,
    benefits: data.benefits.map((benefit) => benefit.trim()).filter(Boolean),
  };
}

export async function createCampaign(data: CreateCampaignInput) {
  const validated = validateCreateCampaignInput(data);
  const { supabase, user } = await requireAuthenticatedUser();

  // Check user plan to set appropriate signup cap
  const { data: profile } = await supabase.from('users').select('plan').eq('id', user.id).single();
  const isPremium = profile?.plan === 'premium';
  
  // For free users, enforce 50 signup cap
  const signupCap = isPremium ? data.signupCap : Math.min(data.signupCap, 50);

  // Insert campaign
  const { data: campaign, error: campaignError } = await supabase
    .from('campaigns')
    .insert({
      user_id: user.id,
      name: validated.name,
      description: validated.description,
      category: validated.category,
      slug: validated.slug,
      launch_date: data.launchDate,
      signup_cap: signupCap,
      status: data.status ?? 'published',
      theme: 'default',
    })
    .select()
    .single();

  if (campaignError) {
    if (campaignError.code === '23505') {
      throw new Error('Campaign slug already exists');
    }
    throw new Error(formatDatabaseError('Unable to create campaign', campaignError));
  }

  // Insert benefits
  if (validated.benefits.length > 0) {
    const benefitsData = validated.benefits.map((benefit, index) => ({
      campaign_id: campaign.id,
      text: benefit,
      sort_order: index,
    }));

    const { error: benefitsError } = await supabase
      .from('benefits')
      .insert(benefitsData);

    if (benefitsError) {
      // A failed second insert must not leave behind a campaign that looks valid.
      const { error: rollbackError } = await supabase.from('campaigns').delete().eq('id', campaign.id);
      const rollbackMessage = rollbackError
        ? ` The cleanup also failed: ${formatDatabaseError('', rollbackError)}`
        : '';
      throw new Error(`${formatDatabaseError('Unable to save campaign benefits', benefitsError)}.${rollbackMessage}`);
    }
  }

  revalidatePath('/dashboard/campaigns');
  return campaign;
}

export async function updateCampaign(id: string, data: Record<string, unknown> & { benefits?: string[] }) {
  const { supabase, user } = await requireAuthenticatedUser();

  // Verify owner
  const { data: existing, error: verifyError } = await supabase
    .from('campaigns')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (verifyError || !existing) {
    throw new Error('Unauthorized or not found');
  }

  const updateData: Record<string, unknown> = { ...data };
  delete updateData.benefits;

  const { error: updateError } = await supabase
    .from('campaigns')
    .update(updateData)
    .eq('id', id);

  if (updateError) {
    throw new Error(updateError.message);
  }

  if (data.benefits) {
    // Replace benefits
    await supabase.from('benefits').delete().eq('campaign_id', id);
    
    if (data.benefits.length > 0) {
      const benefitsData = data.benefits.map((benefit, index) => ({
        campaign_id: id,
        text: benefit,
        sort_order: index,
      }));

      const { error: benefitsError } = await supabase
        .from('benefits')
        .insert(benefitsData);

      if (benefitsError) {
        throw new Error('Failed to update benefits');
      }
    }
  }

  revalidatePath(`/dashboard/campaigns/${id}`);
  revalidatePath('/dashboard/campaigns');
}

export async function deleteCampaign(id: string) {
  const { supabase, user } = await requireAuthenticatedUser();

  const { error } = await supabase
    .from('campaigns')
    .delete()
    .eq('id', id)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  revalidatePath('/dashboard/campaigns');
}

export async function getCampaignSignups(id: string) {
  const { supabase, user } = await requireAuthenticatedUser();
  const { data: campaign, error: campaignError } = await supabase
    .from('campaigns')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (campaignError || !campaign) throw new Error('Campaign not found.');

  const { data: signups, error } = await supabase
    .from('signups')
    .select('id, email, referral_code, referred_by, source, created_at')
    .eq('campaign_id', id)
    .order('created_at', { ascending: false });

  if (error) throw new Error(formatDatabaseError('Unable to load signups', error));

  const referralCounts = new Map<string, number>();
  for (const signup of signups ?? []) {
    if (signup.referred_by) {
      referralCounts.set(signup.referred_by, (referralCounts.get(signup.referred_by) ?? 0) + 1);
    }
  }

  return (signups ?? []).map((signup) => ({
    ...signup,
    referral_count: referralCounts.get(signup.id) ?? 0,
  }));
}

export async function getCampaignAnalytics(id: string) {
  const { supabase, user } = await requireAuthenticatedUser();
  const { data: campaign, error: campaignError } = await supabase
    .from('campaigns')
    .select('id')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (campaignError || !campaign) throw new Error('Campaign not found.');

  const [{ data: signups, error: signupsError }, { data: views, error: viewsError }] = await Promise.all([
    supabase.from('signups').select('created_at, source').eq('campaign_id', id),
    supabase.from('campaign_views').select('viewed_at').eq('campaign_id', id),
  ]);

  if (signupsError) throw new Error(formatDatabaseError('Unable to load signup analytics', signupsError));
  if (viewsError) throw new Error(formatDatabaseError('Unable to load view analytics', viewsError));

  return { signups: signups ?? [], views: views ?? [] };
}

export async function updateCampaignSettings(id: string, input: { slug: string; signupCap: number }) {
  const { supabase, user } = await requireAuthenticatedUser();
  const { data: campaign, error: campaignError } = await supabase
    .from('campaigns')
    .select('id, slug')
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (campaignError || !campaign) throw new Error('Campaign not found.');
  if (!Number.isInteger(input.signupCap) || input.signupCap < 1) throw new Error('Signup cap must be at least 1.');

  const { data: profile } = await supabase.from('users').select('plan').eq('id', user.id).single();
  const isPremium = profile?.plan === 'premium';
  const slug = input.slug.trim().toLowerCase();

  if (slug !== campaign.slug && !isPremium) throw new Error('A Premium plan is required to change the campaign link.');
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error('Use lowercase letters, numbers, and single hyphens for the campaign link.');
  if (!isPremium && input.signupCap > 50) throw new Error('Free campaigns are limited to 50 signups.');

  const { error } = await supabase
    .from('campaigns')
    .update({ slug, signup_cap: input.signupCap })
    .eq('id', id)
    .eq('user_id', user.id);

  if (error?.code === '23505') throw new Error('That campaign link is already in use.');
  if (error) throw new Error(formatDatabaseError('Unable to save campaign settings', error));

  revalidatePath('/dashboard/campaigns');
  revalidatePath(`/dashboard/campaigns/${id}`);
  revalidatePath(`/c/${campaign.slug}`);
  revalidatePath(`/c/${slug}`);
}

export async function deleteCampaignConfirmed(id: string, confirmation: string) {
  if (confirmation.trim() !== 'DELETE') throw new Error('Type DELETE exactly to permanently delete this campaign.');
  await deleteCampaign(id);
}

export async function getCampaigns() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return [];
  }

  const { data: campaigns, error } = await supabase
    .from('campaigns')
    .select(`
      *,
      signups (count),
      campaign_views (count)
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching campaigns:', error);
    return [];
  }

  return campaigns;
}

export async function getCampaignById(id: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Unauthorized');
  }

  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select(`
      *,
      benefits (*),
      signups (*)
    `)
    .eq('id', id)
    .eq('user_id', user.id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  // sort benefits
  campaign.benefits.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order);

  return campaign;
}

export async function getCampaignBySlug(slug: string) {
  const supabase = await createClient();

  const { data: campaign, error } = await supabase
    .from('campaigns')
    .select(`
      *,
      benefits (*)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error || !campaign) {
    return null;
  }

  campaign.benefits.sort((a: { sort_order: number }, b: { sort_order: number }) => a.sort_order - b.sort_order);

  return campaign;
}

export async function trackCampaignView(campaignId: string) {
  const supabase = await createClient();
  
  await supabase.from('campaign_views').insert({
    campaign_id: campaignId,
  });
}
