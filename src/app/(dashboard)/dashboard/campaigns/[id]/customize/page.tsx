import Link from 'next/link';
import { ArrowLeft, Construction, Palette } from 'lucide-react';
import { CampaignTabs } from '@/components/dashboard/campaign-tabs';

export default async function CustomizePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 pt-6 md:p-8">
      <Link href={`/dashboard/campaigns/${id}`} className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#FF2A54] font-small"><ArrowLeft className="h-4 w-4" /> Back to campaign</Link>
      <div><p className="text-sm font-semibold text-[#FF2A54] font-small">Campaign appearance</p><h1 className="text-3xl font-bold tracking-tight font-headline">Customize</h1><p className="mt-1 text-sm text-[#64748B] font-small">Themes, brand assets, and advanced post-signup settings.</p></div>
      <CampaignTabs campaignId={id} />
      <section className="rounded-3xl border border-[#CBD5E1] bg-white p-8 text-center shadow-sm md:p-12"><div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF2A54]/10 text-[#FF2A54]"><Palette className="h-7 w-7" /></div><p className="mt-6 text-sm font-semibold text-[#FF2A54] font-small">Coming soon</p><h1 className="mt-2 text-3xl font-bold tracking-tight font-headline">Campaign customization is under construction</h1><p className="mx-auto mt-4 max-w-lg text-[#64748B] font-small">Themes, brand assets, and advanced post-signup settings will arrive in a dedicated experience. For now, your campaign is ready to publish and share.</p><div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#F8FAFC] px-4 py-2 text-sm text-[#64748B] font-small"><Construction className="h-4 w-4" /> We are building this next.</div></section>
    </div>
  );
}
