import { Check, Star } from 'lucide-react';
import Link from 'next/link';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-[#E2E8F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A] mb-4 font-headline">Simple, transparent pricing.</h2>
          <p className="text-lg text-[#64748B] font-small">
            Start for free, upgrade when you need more power.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
          {/* Free Tier */}
          <div className="bg-white rounded-3xl p-8 border border-[#CBD5E1] shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-full">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#0F172A] mb-2 font-headline">Free</h3>
              <div className="text-[#64748B] mb-6 font-small">Perfect for side projects.</div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-[#0F172A] font-headline">$0</span>
                <span className="text-[#64748B] font-medium font-small">/mo</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {[
                '1 Campaign',
                'Up to 100 signups',
                'Basic theme',
                'Accent color customization',
                'Lancr branding shown'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[#0F172A] font-small">
                  <div className="flex-shrink-0 w-6 h-6 rounded-xl bg-[#E2E8F0] flex items-center justify-center">
                    <Check size={14} className="text-[#FF2A54]" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <Link href="/register" className="w-full block text-center py-4 px-6 rounded-2xl border-2 border-[#CBD5E1] text-[#0F172A] font-bold hover:bg-[#F8FAFC] hover:border-[#94A3B8] transition-all font-small">
              Get Started Free
            </Link>
          </div>

          {/* Premium Tier */}
          <div className="bg-[#0F172A] rounded-3xl p-8 border-2 border-[#FF2A54] shadow-xl flex flex-col h-full relative">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <div className="bg-[#FF2A54] text-white text-xs font-bold uppercase tracking-wider py-1.5 px-4 rounded-full shadow-lg flex items-center gap-1 font-small">
                <Star size={12} fill="white" /> Popular
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-2xl font-bold text-[#E2E8F0] mb-2 font-headline">Premium</h3>
              <div className="text-[#94A3B8] mb-6 font-small">For serious product launches.</div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-[#E2E8F0] font-headline">$19</span>
                <span className="text-[#94A3B8] font-medium font-small">/mo</span>
              </div>
            </div>

            <ul className="space-y-4 mb-8 flex-1">
              {[
                'Unlimited Campaigns',
                'Unlimited signups',
                'Premium themes (5 options)',
                'Remove Lancr branding',
                'Custom confirmation message',
                'CSV export',
                'Priority support'
              ].map((feature, i) => (
                <li key={i} className="flex items-center gap-3 text-[#E2E8F0] font-small">
                  <div className="flex-shrink-0 w-6 h-6 rounded-xl bg-[#FF2A54]/20 flex items-center justify-center">
                    <Check size={14} className="text-[#FF2A54]" />
                  </div>
                  {feature}
                </li>
              ))}
            </ul>

            <Link href="/register?plan=premium" className="w-full block text-center py-4 px-6 rounded-2xl bg-[#FF2A54] text-white font-bold hover:bg-[#E62348] hover:shadow-lg hover:-translate-y-0.5 transition-all font-small">
              Start Premium
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
