'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

const tabs = [
  { href: 'overview', label: 'Overview' },
  { href: 'signups', label: 'Signups' },
  { href: 'analytics', label: 'Analytics' },
  { href: 'customize', label: 'Customize' },
  { href: 'settings', label: 'Settings' },
];

interface CampaignTabsProps {
  campaignId: string;
}

export function CampaignTabs({ campaignId }: CampaignTabsProps) {
  const pathname = usePathname();
  const basePath = `/dashboard/campaigns/${campaignId}`;
  
  // Get current tab from pathname
  const currentTab = pathname.replace(basePath, '').replace('/', '') || 'overview';

  return (
    <nav className="flex gap-2 overflow-x-auto border-b border-[#CBD5E1]" aria-label="Campaign sections">
      {tabs.map((tab) => {
        const isActive = currentTab === tab.href;
        const href = tab.href === 'overview' ? basePath : `${basePath}/${tab.href}`;
        
        return (
          <Link
            key={tab.href}
            href={href}
            className={cn(
              'shrink-0 border-b-2 px-3 py-3 text-sm font-medium transition-colors font-small',
              isActive
                ? 'border-[#FF2A54] text-[#FF2A54]'
                : 'border-transparent text-[#64748B] hover:text-[#0F172A]'
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
