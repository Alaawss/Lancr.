import { getSubscriptionStatus } from '@/actions/billing';
import { Check, Star } from 'lucide-react';
import { PaddleCheckoutButton } from '@/components/billing/paddle-checkout-button';

export default async function BillingPage() {
  const { plan, userId } = await getSubscriptionStatus();
  
  return (
    <div className="max-w-4xl mx-auto space-y-8 p-4 pt-6 md:p-8">
      <div>
        <p className="text-sm font-semibold text-[#FF2A54] font-small">Billing & Plans</p>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Subscription</h1>
        <p className="mt-1 text-sm text-[#64748B] font-small">Manage your subscription and billing details.</p>
      </div>

      <div className="bg-[#FF2A54]/10 border border-[#FF2A54]/20 rounded-3xl p-6 flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-[#0F172A] mb-1 font-headline">Current Plan: <span className="capitalize text-[#FF2A54]">{plan}</span></h2>
          <p className="text-[#64748B] text-sm font-small">
            {plan === 'free' ? 'Upgrade to unlock premium themes, CSV exports, and remove Lancr branding.' : 'You have access to all premium features!'}
          </p>
        </div>
        {plan === 'premium' && (
          <div className="bg-[#FF2A54] text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Star className="w-3 h-3"/> Pro
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Free Plan */}
        <div className={`p-6 rounded-3xl border ${plan === 'free' ? 'border-[#FF2A54] shadow-md ring-1 ring-[#FF2A54]' : 'border-[#CBD5E1]'} bg-white`}>
          <h3 className="text-xl font-bold mb-2 font-headline">Free</h3>
          <p className="text-[#64748B] mb-4 text-sm font-small">Perfect for getting started.</p>
          <div className="text-3xl font-bold mb-6 font-headline">$0<span className="text-sm font-normal text-[#64748B] font-small">/mo</span></div>
          <ul className="space-y-3 mb-8 text-sm">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981]"/> Unlimited campaigns</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981]"/> Up to 50 signups per campaign</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#10B981]"/> Standard themes</li>
          </ul>
          {plan === 'free' ? (
            <button className="w-full py-2 bg-[#F8FAFC] text-[#64748B] rounded-2xl cursor-not-allowed font-medium font-small">Current Plan</button>
          ) : (
            <button className="w-full py-2 border border-[#CBD5E1] text-[#0F172A] rounded-2xl font-medium hover:bg-[#F8FAFC] font-small">Downgrade</button>
          )}
        </div>

        {/* Premium Plan */}
        <div className={`p-6 rounded-3xl border ${plan === 'premium' ? 'border-[#FF2A54] shadow-md ring-1 ring-[#FF2A54]' : 'border-[#CBD5E1]'} bg-white relative overflow-hidden`}>
          {plan === 'premium' && (
            <div className="absolute top-0 right-0 bg-[#FF2A54] text-white text-xs font-bold px-3 py-1 rounded-bl-2xl">
              Active
            </div>
          )}
          <h3 className="text-xl font-bold mb-2 font-headline">Pro</h3>
          <p className="text-[#64748B] mb-4 text-sm font-small">For serious product launches.</p>
          <div className="text-3xl font-bold mb-6 font-headline">$19<span className="text-sm font-normal text-[#64748B] font-small">/mo</span></div>
          <ul className="space-y-3 mb-8 text-sm">
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF2A54]"/> Unlimited signups</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF2A54]"/> Premium themes & custom branding</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF2A54]"/> Remove Lancr watermark</li>
            <li className="flex items-center gap-2"><Check className="w-4 h-4 text-[#FF2A54]"/> CSV Exports</li>
          </ul>
          {plan === 'premium' ? (
            <button className="w-full py-2 border border-[#CBD5E1] text-[#0F172A] rounded-2xl font-medium hover:bg-[#F8FAFC] font-small">Manage Subscription</button>
          ) : userId ? (
            <PaddleCheckoutButton userId={userId} />
          ) : (
            <p className="rounded-2xl bg-[#F8FAFC] px-4 py-2 text-center text-sm text-[#64748B] font-small">Sign in to upgrade.</p>
          )}
        </div>
      </div>
    </div>
  );
}
