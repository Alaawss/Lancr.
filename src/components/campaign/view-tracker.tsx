'use client';

import { useEffect } from 'react';
import { trackCampaignView } from '@/actions/campaigns';

interface ViewTrackerProps {
  campaignId: string;
}

export function ViewTracker({ campaignId }: ViewTrackerProps) {
  useEffect(() => {
    const storageKey = `viewed_campaign_${campaignId}`;
    
    // Check if this visitor has already viewed this campaign
    const hasViewed = localStorage.getItem(storageKey);
    
    if (!hasViewed) {
      // Track the view
      trackCampaignView(campaignId);
      
      // Set the flag to prevent counting again
      localStorage.setItem(storageKey, 'true');
    }
  }, [campaignId]);

  return null; // This component doesn't render anything
}
