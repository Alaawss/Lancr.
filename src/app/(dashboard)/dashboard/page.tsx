import Link from 'next/link';
import { ArrowUpRight, Eye, Megaphone, Plus, Users } from 'lucide-react';
import { getCampaigns } from '@/actions/campaigns';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CopyCampaignLink } from '@/components/dashboard/copy-campaign-link';

export default async function DashboardPage() {
  const campaigns = await getCampaigns();

  if (campaigns.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <div className="mb-5 rounded-3xl bg-[#FF2A54]/10 p-4 text-[#FF2A54]"><Megaphone className="h-8 w-8" /></div>
        <p className="text-sm font-semibold text-[#FF2A54] font-small">Welcome to Lancr</p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight font-headline">Launch your first waitlist</h1>
        <p className="mt-3 text-sm sm:text-base text-[#64748B] font-small">Set up a public page, collect signups, and share one simple link. You can publish it the moment it is ready.</p>
        <Link href="/dashboard/campaigns/new" className="mt-7"><Button size="lg"><Plus className="mr-2 h-4 w-4" /> Create campaign</Button></Link>
      </div>
    );
  }

  const totals = campaigns.reduce((summary, campaign) => {
    const views = campaign.campaign_views?.[0]?.count ?? 0;
    const signups = campaign.signups?.[0]?.count ?? 0;
    return { views: summary.views + views, signups: summary.signups + signups };
  }, { views: 0, signups: 0 });
  const conversion = totals.views > 0 ? ((totals.signups / totals.views) * 100).toFixed(1) : '0.0';
  const liveCampaigns = campaigns.filter((campaign) => campaign.status === 'published');

  const stats = [
    { label: 'Total views', value: totals.views.toLocaleString(), icon: Eye },
    { label: 'Total signups', value: totals.signups.toLocaleString(), icon: Users },
    { label: 'Conversion', value: `${conversion}%`, icon: ArrowUpRight },
    { label: 'Live campaigns', value: liveCampaigns.length.toString(), icon: Megaphone },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-6 md:space-y-8 p-4 pt-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#FF2A54] font-small">Overview</p>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight font-headline">Launch dashboard</h1>
          <p className="mt-1 text-sm text-[#64748B] font-small">A live view of every campaign you are running.</p>
        </div>
        <Link href="/dashboard/campaigns/new"><Button><Plus className="mr-2 h-4 w-4" /> New campaign</Button></Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="rounded-2xl md:rounded-3xl border border-[#CBD5E1] bg-white p-4 md:p-5 shadow-sm">
            <div className="flex items-center justify-between text-sm text-[#64748B]"><span>{label}</span><Icon className="h-4 w-4 text-[#FF2A54]" /></div>
            <p className="mt-3 text-2xl md:text-3xl font-bold tracking-tight text-[#0F172A] font-headline">{value}</p>
          </div>
        ))}
      </div>

      <section className="rounded-2xl md:rounded-3xl border border-[#CBD5E1] bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#CBD5E1] px-4 md:px-6 py-4 md:py-5">
          <div><h2 className="font-semibold text-[#0F172A] font-headline">Recent campaigns</h2><p className="mt-1 text-sm text-[#64748B] font-small">Publish a draft to make its public link available.</p></div>
          <Link href="/dashboard/campaigns"><Button variant="ghost" size="sm">View all</Button></Link>
        </div>
        <div className="divide-y divide-[#CBD5E1]">
          {campaigns.slice(0, 5).map((campaign) => {
            const signups = campaign.signups?.[0]?.count ?? 0;
            return (
              <div key={campaign.id} className="flex flex-wrap items-center gap-3 md:gap-4 px-4 md:px-6 py-4">
                <div className="min-w-32 md:min-w-40 flex-1"><Link href={`/dashboard/campaigns/${campaign.id}`} className="font-medium text-[#0F172A] hover:text-[#FF2A54] font-headline text-sm md:text-base">{campaign.name}</Link><p className="mt-1 text-xs md:text-sm text-[#64748B] font-small">/c/{campaign.slug}</p></div>
                <div className="text-xs md:text-sm text-[#64748B] font-small"><span className="font-semibold text-[#0F172A]">{signups}</span> signups</div>
                <Badge variant={campaign.status === 'published' ? 'success' : 'warning'} status>{campaign.status === 'published' ? 'Live' : 'Draft'}</Badge>
                {campaign.status === 'published' ? <CopyCampaignLink slug={campaign.slug} compact /> : <Link href={`/dashboard/campaigns/${campaign.id}`}><Button variant="outline" size="sm">Publish</Button></Link>}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
