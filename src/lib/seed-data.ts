import { createClient } from '@/lib/supabase/server';
import { nanoid } from 'nanoid';

export async function seedDemoCampaigns(userId: string) {
  const supabase = await createClient();

  const mockCampaigns = [
    {
      user_id: userId,
      name: 'Nova AI',
      slug: `nova-ai-${nanoid(6)}`,
      description: 'The next generation of AI-assisted coding. Join the waitlist for early access.',
      theme: 'Dark',
      brand_color: '#3b82f6',
      status: 'active',
      signup_count: 1420,
    },
    {
      user_id: userId,
      name: 'Summit 2025',
      slug: `summit-${nanoid(6)}`,
      description: 'The ultimate tech conference for founders and builders.',
      theme: 'Minimal',
      brand_color: '#000000',
      status: 'active',
      signup_count: 856,
    },
    {
      user_id: userId,
      name: 'Creator\'s Blueprint',
      slug: `creators-${nanoid(6)}`,
      description: 'A 4-week cohort-based course to launch your creator career.',
      theme: 'Modern',
      brand_color: '#f43f5e',
      status: 'active',
      signup_count: 312,
    },
    {
      user_id: userId,
      name: 'HealthTrack',
      slug: `healthtrack-${nanoid(6)}`,
      description: 'Sync all your health data into one beautiful dashboard.',
      theme: 'Startup',
      brand_color: '#10b981',
      status: 'active',
      signup_count: 54,
    }
  ];

  for (const campaign of mockCampaigns) {
    await supabase.from('campaigns').insert(campaign);
  }

  return { success: true, count: mockCampaigns.length };
}
