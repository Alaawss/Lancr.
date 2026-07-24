'use client';

import Link from 'next/link';
import { LayoutDashboard } from 'lucide-react';
import { DashboardNav } from '@/components/dashboard/dashboard-nav';
import { LogoutButton } from '@/components/dashboard/logout-button';
import Sticker from '@/components/ui/sticker';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#E2E8F0] flex flex-col md:flex-row text-[#0F172A] relative overflow-hidden">
      {/* Decorative stars for dashboard */}
      <div className="absolute top-20 left-[2%] opacity-20 animate-spin-slow hidden md:block">
        <Sticker size="lg" color="#FF2A54" rotation={15} />
      </div>
      <div className="absolute top-40 right-[5%] opacity-15 animate-spin-slow hidden md:block" style={{ animationDelay: '1s' }}>
        <Sticker size="md" color="#FF6B8E" rotation={-20} />
      </div>
      <div className="absolute bottom-32 left-[8%] opacity-18 animate-spin-slow hidden md:block" style={{ animationDelay: '2s' }}>
        <Sticker size="sm" color="#6366F1" rotation={45} />
      </div>
      <div className="absolute bottom-48 right-[10%] opacity-15 animate-spin-slow hidden md:block" style={{ animationDelay: '0.5s' }}>
        <Sticker size="md" color="#10B981" rotation={-30} />
      </div>
      
      <aside className="hidden w-64 shrink-0 border-r border-[#CBD5E1] bg-white p-4 md:flex md:flex-col relative z-10">
        <Link href="/dashboard" className="mb-8 flex items-center gap-3 px-2">
          <img src="/lancr_lg.png" alt="Lancr" className="h-16 w-auto" />
          <span className="text-2xl font-bold text-[#FF2A54] font-headline">Lancr</span>
        </Link>
        <div className="flex-1"><DashboardNav /></div>
        <div className="mt-auto">
          <LogoutButton />
        </div>
      </aside>
      
      <div className="sticky top-0 z-10 border-b border-[#CBD5E1] bg-white/95 backdrop-blur md:hidden">
        <Link href="/dashboard" className="flex items-center gap-2 px-4 py-3">
          <img src="/lancr_lg.png" alt="Lancr" className="h-14 w-auto" />
          <span className="text-xl font-bold text-[#FF2A54] font-headline">Lancr</span>
        </Link>
        <DashboardNav mobile />
      </div>

      <main className="min-w-0 flex-1 overflow-y-auto relative z-10">
        {children}
      </main>
    </div>
  );
}
