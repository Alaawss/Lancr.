'use client';

import Link from 'next/link';
import { ArrowRight, Zap } from 'lucide-react';
import Sticker from '@/components/ui/sticker';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 bg-[#E2E8F0] overflow-hidden">
      {/* Decorative stickers with spinning animation */}
      <div className="absolute top-20 left-[5%] opacity-60 animate-spin-slow">
        <Sticker size="lg" color="brand-red" rotation={15} />
      </div>
      <div className="absolute top-32 right-[10%] opacity-40 animate-spin-slow" style={{ animationDelay: '1s' }}>
        <Sticker size="md" color="brand-red-light" rotation={-20} />
      </div>
      <div className="absolute top-48 left-[15%] opacity-50 animate-spin-slow" style={{ animationDelay: '2s' }}>
        <Sticker size="sm" color="dark-navy" rotation={45} />
      </div>
      <div className="absolute bottom-32 right-[20%] opacity-40 animate-spin-slow" style={{ animationDelay: '0.5s' }}>
        <Sticker size="md" color="brand-red" rotation={-30} />
      </div>
      <div className="absolute bottom-40 left-[8%] opacity-50 animate-spin-slow" style={{ animationDelay: '1.5s' }}>
        <Sticker size="sm" color="brand-red-light" rotation={25} />
      </div>
      <div className="absolute top-60 right-[5%] opacity-30 animate-spin-slow" style={{ animationDelay: '2.5s' }}>
        <Sticker size="lg" color="#FF6B8E" rotation={-15} />
      </div>
      <div className="absolute bottom-20 right-[30%] opacity-45 animate-spin-slow" style={{ animationDelay: '3s' }}>
        <Sticker size="sm" color="#FFB84D" rotation={60} />
      </div>
      <div className="absolute top-40 left-[25%] opacity-35 animate-spin-slow" style={{ animationDelay: '0.8s' }}>
        <Sticker size="md" color="#6366F1" rotation={-45} />
      </div>
      <div className="absolute bottom-48 left-[3%] opacity-40 animate-spin-slow" style={{ animationDelay: '1.2s' }}>
        <Sticker size="sm" color="#10B981" rotation={30} />
      </div>
      <div className="absolute top-16 right-[25%] opacity-25 animate-spin-slow" style={{ animationDelay: '2.2s' }}>
        <Sticker size="md" color="#F59E0B" rotation={-60} />
      </div>

      {/* Signature */}
      <div className="absolute top-[41%] right-[-0.7rem] -translate-y-1/2 rotate-90 origin-center opacity-65 hidden md:block">
        <span className="text-xl font-bold text-[#0F172A] font-headline tracking-widest">0-3</span>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-[#0F172A] tracking-tight mb-6 font-headline leading-[0.9]">
          Build <span className="inline-flex items-center justify-center">
            <Zap className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-20 lg:h-20 text-[#FF2A54] mx-1" />
          </span> hype before<br className="hidden md:block" /> you launch.
        </h1>
        
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl text-[#64748B] mb-8 md:mb-10 leading-relaxed font-small">
          Create referral-driven waitlists for your next product, event, or community. Collect emails, track referrals, and grow your audience before launch day.
        </p>
        
        {/* Pill-style input box like Linktree */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 mb-12 md:mb-16 max-w-xl mx-auto">
          <div className="flex-1 flex items-center bg-white rounded-full px-4 sm:px-6 py-3 sm:py-4 shadow-lg border border-[#CBD5E1] w-full">
            <span className="text-[#64748B] font-semibold font-small mr-2 text-sm sm:text-base">lancr.app/</span>
            <input 
              type="text" 
              placeholder="claim your campaign" 
              className="flex-1 bg-transparent text-[#0F172A] placeholder:text-[#94A3B8] focus:outline-none text-sm sm:text-base font-small"
            />
          </div>
          <Link 
            href="/register" 
            className="h-12 sm:h-14 px-6 sm:px-8 bg-[#FF2A54] hover:bg-[#E62348] text-white font-bold rounded-full transition-all flex items-center justify-center gap-2 whitespace-nowrap shadow-lg font-small text-sm sm:text-base"
          >
            Get Started <ArrowRight size={16} />
          </Link>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-[#64748B] font-medium font-small">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF2A54]"></span>
            2,500+ campaigns created
          </div>
          <div className="hidden sm:block text-[#CBD5E1]">•</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#0F172A]"></span>
            150K+ signups collected
          </div>
          <div className="hidden sm:block text-[#CBD5E1]">•</div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF2A54]"></span>
            12K+ referrals tracked
          </div>
        </div>
      </div>
    </section>
  );
}
