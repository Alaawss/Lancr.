'use client';

import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CopyCampaignLink({ slug, compact = false }: { slug: string; compact?: boolean }) {
  const [copied, setCopied] = useState(false);

  async function copyLink() {
    await navigator.clipboard.writeText(`${window.location.origin}/c/${slug}`);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Button type="button" variant="outline" size={compact ? 'icon' : 'md'} onClick={copyLink} title="Copy public link">
      {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
      {!compact && <span className="ml-2">{copied ? 'Copied' : 'Copy link'}</span>}
    </Button>
  );
}
