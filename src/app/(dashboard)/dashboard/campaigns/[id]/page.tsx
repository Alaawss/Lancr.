import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Settings2, Sparkles, Users } from 'lucide-react';
import { getCampaignById } from '@/actions/campaigns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyCampaignLink } from '@/components/dashboard/copy-campaign-link';
import { CampaignTabs } from '@/components/dashboard/campaign-tabs';
import EditCampaignForm from './edit-form';

type Signup = { id: string; email: string; created_at: string };

export default async function CampaignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  let campaign;
  try {
    campaign = await getCampaignById(id);
  } catch {
    notFound();
  }

  if (!campaign) notFound();
  const signups = (campaign.signups ?? []) as Signup[];

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 pt-6 md:p-8">
      <Link href="/dashboard/campaigns" className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#FF2A54] font-small"><ArrowLeft className="h-4 w-4" /> Back to campaigns</Link>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3"><h1 className="text-3xl font-medium tracking-tight font-small">{campaign.name}</h1><Badge variant={campaign.status === 'published' ? 'success' : 'warning'} status>{campaign.status === 'published' ? 'Live' : 'Draft'}</Badge></div>
          <p className="mt-2 text-sm text-[#64748B] font-small">/c/{campaign.slug}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <CopyCampaignLink slug={campaign.slug} />
          {campaign.status === 'published' && <Link href={`/c/${campaign.slug}`} target="_blank"><Button variant="outline"><ExternalLink className="mr-2 h-4 w-4" /> View live page</Button></Link>}
        </div>
      </div>

      {campaign.status !== 'published' && (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-[#FF6B8E] bg-[#FF2A54]/10 px-5 py-4">
          <div><p className="font-medium text-[#FF2A54] font-small">This campaign is a draft</p><p className="mt-1 text-sm text-[#FF2A54]/80 font-small">Set its status to Published below to activate the public link.</p></div>
          <a href="#edit-campaign"><Button variant="outline" size="sm">Review and publish</Button></a>
        </div>
      )}

      <CampaignTabs campaignId={campaign.id} />

      <section id="edit-campaign" className="rounded-3xl border border-[#CBD5E1] bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center gap-3"><span className="rounded-2xl bg-[#FF2A54]/10 p-2 text-[#FF2A54]"><Settings2 className="h-5 w-5" /></span><div><h2 className="text-lg font-semibold font-headline">Campaign details</h2><p className="text-sm text-[#64748B] font-small">Update the essentials and control when your page is live.</p></div></div>
        <EditCampaignForm campaign={campaign} />
      </section>

      <div className="grid gap-6 md:grid-cols-2">
        <section className="rounded-3xl border border-[#CBD5E1] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3"><span className="rounded-2xl bg-[#FF2A54]/10 p-2 text-[#FF2A54]"><Users className="h-5 w-5" /></span><div><h2 className="text-lg font-semibold font-headline">Recent signups</h2><p className="text-sm text-[#64748B] font-small">{signups.length} captured so far</p></div></div>
          <div className="space-y-3">
            {signups.length === 0 ? <p className="rounded-2xl bg-[#F8FAFC] p-4 text-sm text-[#64748B] font-small">No signups yet. Publish and share your link to get started.</p> : signups.slice(0, 5).map((signup) => <div key={signup.id} className="flex items-center justify-between gap-3 border-b border-[#CBD5E1] pb-3 text-sm last:border-0 last:pb-0"><span className="truncate font-medium font-headline">{signup.email}</span><span className="shrink-0 text-xs text-[#64748B] font-small">{new Date(signup.created_at).toLocaleDateString()}</span></div>)}
          </div>
          <Link href={`/dashboard/campaigns/${campaign.id}/signups`} className="mt-4 inline-block text-sm font-medium text-[#FF2A54] hover:text-[#E62348] font-small">View all signups →</Link>
        </section>
        <section className="rounded-3xl border border-[#FF2A54]/20 bg-[#FF2A54]/5 p-6"><div className="flex gap-3"><Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-[#FF2A54]" /><div><h2 className="font-semibold text-[#0F172A] font-headline">Next step: share your link</h2><p className="mt-1 text-sm text-[#64748B] font-small">Your signup page is ready as soon as the campaign is published.</p></div></div></section>
      </div>
    </div>
  );
}
