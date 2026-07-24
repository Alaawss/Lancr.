'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { CreditCard, LayoutDashboard, Megaphone, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

const navigation = [
  { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, exact: true },
  { href: '/dashboard/campaigns', label: 'Campaigns', icon: Megaphone },
  { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
  { href: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export function DashboardNav({ mobile = false }: { mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={cn(mobile ? 'flex gap-1 overflow-x-auto px-4 pb-3' : 'space-y-1')} aria-label="Dashboard navigation">
      {navigation.map((item) => {
        const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex shrink-0 items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-colors font-small',
              active ? 'bg-[#FF2A54]/10 text-[#FF2A54]' : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]',
            )}
          >
            <Icon className="h-4 w-4" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
