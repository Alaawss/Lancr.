import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { getCampaignById } from '@/actions/campaigns';
import { getSubscriptionStatus } from '@/actions/billing';
import { CampaignSettingsForm } from '@/components/dashboard/campaign-settings-form';
import { CampaignTabs } from '@/components/dashboard/campaign-tabs';

export default async function CampaignSettingsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [campaign, { plan }] = await Promise.all([getCampaignById(id), getSubscriptionStatus()]);
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 pt-6 md:p-8"><Link href={`/dashboard/campaigns/${id}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#FF2A54] font-small"><ArrowLeft className="h-4 w-4" /> Back to campaign</Link><div><p className="text-sm font-semibold text-[#FF2A54] font-small">Campaign management</p><h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1><p className="mt-1 text-sm text-[#64748B] font-small">Manage the public link, signup capacity, and deletion controls.</p></div><CampaignTabs campaignId={id} /><CampaignSettingsForm campaignId={id} initialSlug={campaign.slug} initialSignupCap={campaign.signup_cap ?? 0} isPremium={plan === 'premium'} /></div>
  );
}
