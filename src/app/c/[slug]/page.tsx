import { notFound } from 'next/navigation';
import { getCampaignBySlug } from '@/actions/campaigns';
import { createClient } from '@/lib/supabase/server';
import Countdown from '@/components/campaign/countdown';
import SignupForm from '@/components/campaign/signup-form';
import { ViewTracker } from '@/components/campaign/view-tracker';
import { CheckCircle2 } from 'lucide-react';

export default async function PublicCampaignPage({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  const ref = resolvedSearchParams.ref as string | undefined;
  
  const campaign = await getCampaignBySlug(slug);

  if (!campaign || campaign.status === 'draft') {
    notFound();
  }

  if (campaign.status === 'ended') {
    return (
      <div className="min-h-screen bg-[#E2E8F0] flex flex-col">
        <main className="flex-1 max-w-md w-full mx-auto p-4 md:p-6 pt-8 md:pt-16 flex flex-col items-center">
          <div className="w-full text-center">
            <div className="mb-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#CBD5E1] flex items-center justify-center">
                <span className="text-3xl">🎉</span>
              </div>
            </div>
            <h1 className="text-2xl font-bold text-[#0F172A] font-headline mb-2">
              This campaign has ended
            </h1>
            <p className="text-sm text-[#64748B] font-small">
              The waitlist for {campaign.name} is now closed.
            </p>
          </div>
        </main>
      </div>
    );
  }

  const supabase = await createClient();

  const { count: signupsCount } = await supabase
    .from('signups')
    .select('*', { count: 'exact', head: true })
    .eq('campaign_id', campaign.id);

  // Check if user is premium for banner display
  const { data: userData } = await supabase
    .from('users')
    .select('plan')
    .eq('id', campaign.user_id)
    .single();
  
  const isPremium = userData?.plan === 'premium';

  return (
    <div className="min-h-screen bg-[#E2E8F0] flex flex-col">
      <ViewTracker campaignId={campaign.id} />
      <main className="flex-1 max-w-md w-full mx-auto p-4 md:p-6 pt-8 md:pt-16 flex flex-col items-center">
        
        {/* Banner (Premium Only) */}
        {isPremium && campaign.banner_url && (
          <div className="w-full mb-6">
            <img 
              src={campaign.banner_url} 
              alt="Campaign banner"
              className="w-full h-32 md:h-48 object-cover rounded-3xl shadow-lg"
            />
          </div>
        )}

        {/* Profile Section - Circular Logo */}
        <div className="w-full mb-6 text-center">
          <div className="relative inline-block mb-4">
            {campaign.logo_url ? (
              <img 
                src={campaign.logo_url} 
                alt={campaign.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
              />
            ) : (
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#FF2A54] to-[#FF6B8E] flex items-center justify-center border-4 border-white shadow-xl">
                <span className="text-4xl font-bold text-white font-headline">
                  {campaign.name.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-[#0F172A] font-headline">
              @{campaign.slug}
            </h1>
            <p className="text-base text-[#64748B] font-small">
              {campaign.name}
            </p>
            <div className="inline-flex items-center rounded-full border border-[#FF2A54]/20 bg-[#FF2A54]/10 px-3 py-1 text-xs font-semibold text-[#FF2A54] font-small">
              {campaign.category.toUpperCase()}
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="w-full mb-6 text-center">
          <p className="text-sm text-[#64748B] font-small leading-relaxed">
            {campaign.description}
          </p>
        </div>

        {/* Countdown */}
        {campaign.launch_date && (
          <div className="w-full mb-6">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#CBD5E1]">
              <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider text-center mb-3 font-small">
                Launching In
              </h3>
              <Countdown launchDate={campaign.launch_date} />
            </div>
          </div>
        )}

        {/* Signup Form */}
        <div className="w-full mb-6">
          <SignupForm 
            campaignId={campaign.id} 
            campaignSlug={campaign.slug} 
            signupCap={campaign.signup_cap}
            currentSignups={signupsCount || 0}
          />
        </div>

        {/* Benefits */}
        {campaign.benefits && campaign.benefits.length > 0 && (
          <div className="w-full">
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-[#CBD5E1]">
              <h3 className="text-xs font-semibold text-[#64748B] uppercase tracking-wider text-center mb-4 font-small">
                What's included
              </h3>
              <ul className="space-y-3">
                {campaign.benefits.map((b: any) => (
                  <li key={b.id} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-[#FF2A54] shrink-0 mt-0.5" />
                    <span className="text-sm text-[#0F172A] font-small">{b.text}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="w-full mt-8 text-center">
          <p className="text-xs text-[#94A3B8] font-small">
            Powered by <span className="text-[#FF2A54] font-semibold">Lancr</span>
          </p>
        </div>

      </main>
    </div>
  );
}
