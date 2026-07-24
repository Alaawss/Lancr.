import Link from 'next/link';
import { ArrowLeft, BarChart3, Eye, TrendingUp, Users } from 'lucide-react';
import { getCampaignAnalytics } from '@/actions/campaigns';
import { CampaignTabs } from '@/components/dashboard/campaign-tabs';

function dayKey(date: Date) {
  return new Intl.DateTimeFormat('en-CA', { year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

export default async function AnalyticsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { signups, views } = await getCampaignAnalytics(id);
  const today = new Date();
  const days = Array.from({ length: 14 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (13 - index));
    return { key: dayKey(date), label: new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' }).format(date), signups: 0, views: 0 };
  });
  const dayMap = new Map(days.map((day) => [day.key, day]));
  for (const signup of signups) {
    const day = dayMap.get(dayKey(new Date(signup.created_at)));
    if (day) day.signups += 1;
  }
  for (const view of views) {
    const day = dayMap.get(dayKey(new Date(view.viewed_at)));
    if (day) day.views += 1;
  }

  const totalSignups = signups.length;
  const totalViews = views.length;
  const todayViews = dayMap.get(dayKey(today))?.views ?? 0;
  const yesterday = new Date(today); yesterday.setDate(today.getDate() - 1);
  const yesterdayViews = dayMap.get(dayKey(yesterday))?.views ?? 0;
  const conversion = totalViews ? ((totalSignups / totalViews) * 100).toFixed(1) : '0.0';
  const direct = signups.filter((signup) => signup.source === 'direct').length;
  const referral = signups.filter((signup) => signup.source === 'referral').length;
  const largestValue = Math.max(1, ...days.map((day) => Math.max(day.signups, day.views)));
  const stats = [{ label: 'Views today', value: todayViews, icon: Eye }, { label: 'Views yesterday', value: yesterdayViews, icon: Eye }, { label: 'Total signups', value: totalSignups, icon: Users }, { label: 'Conversion rate', value: `${conversion}%`, icon: TrendingUp }];

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 pt-6 md:p-8">
      <Link href={`/dashboard/campaigns/${id}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#FF2A54] font-small"><ArrowLeft className="h-4 w-4" /> Back to campaign</Link>
      <div><p className="text-sm font-semibold text-[#FF2A54] font-small">Campaign performance</p><h1 className="text-3xl font-bold tracking-tight font-headline">Analytics</h1><p className="mt-1 text-sm text-[#64748B] font-small">Real-time totals calculated from this campaign's views and signups.</p></div>
      <CampaignTabs campaignId={id} />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{stats.map(({ label, value, icon: Icon }) => <div key={label} className="rounded-3xl border border-[#CBD5E1] bg-white p-5 shadow-sm"><div className="flex items-center justify-between text-sm text-[#64748B] font-small"><span>{label}</span><Icon className="h-4 w-4 text-[#FF2A54]" /></div><p className="mt-3 text-3xl font-bold text-[#0F172A] font-headline">{value}</p></div>)}</div>
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.5fr)_minmax(18rem,.7fr)]">
        <section className="rounded-3xl border border-[#CBD5E1] bg-white p-6 shadow-sm"><div className="flex items-center gap-2"><BarChart3 className="h-5 w-5 text-[#FF2A54]" /><div><h2 className="font-semibold font-headline">Last 14 days</h2><p className="text-sm text-[#64748B] font-small">Views and signups per day</p></div></div><div className="mt-8 flex h-64 items-end gap-1.5 border-b border-[#CBD5E1] pb-6">{days.map((day) => <div key={day.key} className="group flex h-full min-w-0 flex-1 flex-col justify-end gap-1" title={`${day.label}: ${day.views} views, ${day.signups} signups`}><div className="rounded-t bg-[#FF2A54]/20 transition-colors group-hover:bg-[#FF2A54]/30" style={{ height: `${(day.views / largestValue) * 100}%`, minHeight: day.views ? '4px' : undefined }} /><div className="rounded-t bg-[#FF2A54] transition-colors group-hover:bg-[#E62348]" style={{ height: `${(day.signups / largestValue) * 100}%`, minHeight: day.signups ? '4px' : undefined }} /></div>)}</div><div className="mt-3 flex items-center justify-between text-xs text-[#64748B] font-small"><span>{days[0].label}</span><span className="flex items-center gap-4"><span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-[#FF2A54]/20" />Views</span><span><i className="mr-1 inline-block h-2 w-2 rounded-sm bg-[#FF2A54]" />Signups</span></span><span>{days.at(-1)?.label}</span></div></section>
        <section className="rounded-3xl border border-[#CBD5E1] bg-white p-6 shadow-sm"><h2 className="font-semibold font-headline">Signup sources</h2><p className="mt-1 text-sm text-[#64748B] font-small">How people joined your waitlist</p><div className="mt-8 space-y-5">{[{ label: 'Direct', value: direct, className: 'bg-[#0F172A]' }, { label: 'Referral', value: referral, className: 'bg-[#FF2A54]' }].map((source) => { const percentage = totalSignups ? Math.round((source.value / totalSignups) * 100) : 0; return <div key={source.label}><div className="mb-2 flex justify-between text-sm"><span className="font-medium text-[#0F172A] font-headline">{source.label}</span><span className="text-[#64748B] font-small">{source.value} · {percentage}%</span></div><div className="h-2 overflow-hidden rounded-full bg-[#F8FAFC]"><div className={`h-full rounded-full ${source.className}`} style={{ width: `${percentage}%` }} /></div></div>; })}</div><div className="mt-8 rounded-2xl bg-[#F8FAFC] p-4 text-sm text-[#64748B] font-small">{totalSignups ? `${referral} of ${totalSignups} signups came from referral links.` : 'No signups yet—share your campaign to start collecting data.'}</div></section>
      </div>
    </div>
  );
}
