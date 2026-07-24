import { getCampaigns } from '@/actions/campaigns';
import Link from 'next/link';
import { Plus, BarChart, Users, Eye, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return (
    <div className="mx-auto max-w-7xl space-y-6 p-4 pt-6 md:p-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-[#FF2A54] font-small">Campaigns</p>
          <h1 className="text-3xl font-semibold tracking-tight font-headline">Your waitlists</h1>
          <p className="mt-1 text-sm text-[#64748B] font-small">Create, publish, and monitor every launch from one place.</p>
        </div>
        <div className="flex items-center space-x-2">
          <Link href="/dashboard/campaigns/new">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> New Campaign
            </Button>
          </Link>
        </div>
      </div>
      
      {campaigns.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-[400px] border rounded-3xl border-dashed border-[#CBD5E1]">
          <div className="text-center space-y-4">
            <h3 className="text-lg font-semibold font-headline">No campaigns yet</h3>
            <p className="text-sm text-[#64748B] font-small">
              Create your first waitlist campaign to start capturing leads.
            </p>
            <Link href="/dashboard/campaigns/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" /> Create Campaign
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {campaigns.map((campaign) => {
            const views = campaign.campaign_views?.[0]?.count || 0;
            const signups = campaign.signups?.[0]?.count || 0;
            const conversion = views > 0 ? ((signups / views) * 100).toFixed(1) : '0';

            return (
              <div key={campaign.id} className="rounded-3xl border border-[#CBD5E1] bg-white text-card-foreground shadow-sm">
                <div className="p-6 flex flex-col gap-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <h3 className="font-semibold leading-none tracking-tight font-headline">{campaign.name}</h3>
                      <p className="text-sm text-[#64748B] font-small">{campaign.category}</p>
                    </div>
                    <Badge variant={campaign.status === 'published' ? 'success' : campaign.status === 'ended' ? 'default' : 'warning'} status>
                      {campaign.status === 'published' ? 'Live' : campaign.status === 'ended' ? 'Ended' : 'Draft'}
                    </Badge>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 border-y border-[#CBD5E1] py-4">
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-[#64748B] flex items-center gap-1 font-small"><Eye className="h-3 w-3"/> Views</span>
                      <span className="font-bold font-headline">{views}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-[#64748B] flex items-center gap-1 font-small"><Users className="h-3 w-3"/> Signups</span>
                      <span className="font-bold font-headline">{signups}</span>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs text-[#64748B] flex items-center gap-1 font-small"><BarChart className="h-3 w-3"/> Conv.</span>
                      <span className="font-bold font-headline">{conversion}%</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/dashboard/campaigns/${campaign.id}`} className="flex-1"><Button variant="outline" className="w-full rounded-2xl">Manage</Button></Link>
                    {campaign.status === 'published' && <Link href={`/c/${campaign.slug}`} target="_blank"><Button variant="outline" size="icon" title="Open public campaign" className="rounded-2xl"><ExternalLink className="h-4 w-4" /></Button></Link>}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
