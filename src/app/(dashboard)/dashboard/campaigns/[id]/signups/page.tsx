import Link from 'next/link';
import { ArrowLeft, Download, Lock, Users } from 'lucide-react';
import { getCampaignSignups } from '@/actions/campaigns';
import { getSubscriptionStatus } from '@/actions/billing';
import { Button } from '@/components/ui/button';
import { SignupsTable } from '@/components/dashboard/signups-table';
import { CampaignTabs } from '@/components/dashboard/campaign-tabs';

export default async function SignupsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [signups, { plan }] = await Promise.all([getCampaignSignups(id), getSubscriptionStatus()]);
  const referrals = signups.filter((signup) => signup.source === 'referral').length;

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 pt-6 md:p-8">
      <Link href={`/dashboard/campaigns/${id}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#FF2A54] font-small"><ArrowLeft className="h-4 w-4" /> Back to campaign</Link>
      <div className="flex flex-wrap items-end justify-between gap-4"><div><p className="text-sm font-semibold text-[#FF2A54] font-small">Campaign audience</p><h1 className="text-3xl font-bold tracking-tight font-headline">Signups</h1><p className="mt-1 text-sm text-[#64748B] font-small">Every email captured by this campaign, with referral attribution.</p></div>{plan === 'premium' ? <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export CSV</Button> : <Button variant="outline" disabled><Lock className="mr-2 h-4 w-4" /> Export CSV · Premium</Button>}</div>
      <CampaignTabs campaignId={id} />
      <div className="grid gap-4 sm:grid-cols-2"><div className="rounded-3xl border border-[#CBD5E1] bg-white p-5 shadow-sm"><div className="flex items-center gap-2 text-sm text-[#64748B] font-small"><Users className="h-4 w-4 text-[#FF2A54]" /> Total signups</div><p className="mt-3 text-3xl font-bold font-headline">{signups.length}</p></div><div className="rounded-3xl border border-[#CBD5E1] bg-white p-5 shadow-sm"><p className="text-sm text-[#64748B] font-small">From referral links</p><p className="mt-3 text-3xl font-bold font-headline">{referrals}</p></div></div>
      <SignupsTable signups={signups} />
    </div>
  );
}
