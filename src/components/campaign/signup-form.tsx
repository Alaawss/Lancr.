'use client';

import { useState, useEffect } from 'react';
import { joinCampaign, getSignupReferralCount } from '@/actions/signups';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, CheckCircle2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

interface SignupFormProps {
  campaignId: string;
  campaignSlug: string;
  signupCap: number | null;
  currentSignups: number;
}

export default function SignupForm({ campaignId, campaignSlug, signupCap, currentSignups }: SignupFormProps) {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [referralLink, setReferralLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [referralsCount, setReferralsCount] = useState(0);

  const isFull = signupCap !== null && signupCap > 0 && currentSignups >= signupCap;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isFull) return;

    setLoading(true);
    setError('');

    try {
      const refCode = searchParams.get('ref') || undefined;
      const signup = await joinCampaign(campaignId, email, refCode);
      
      const link = `${window.location.origin}/c/${campaignSlug}?ref=${signup.referral_code}`;
      setReferralLink(link);
      setSuccess(true);
      
      // Fetch initial referral count (should be 0, but just in case)
      const count = await getSignupReferralCount(signup.id);
      setReferralsCount(count);
    } catch (err: any) {
      setError(err.message || 'Failed to join waitlist');
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  if (isFull && !success) {
    return (
      <div className="p-6 bg-white rounded-2xl text-center border border-[#CBD5E1] shadow-sm">
        <h3 className="font-semibold text-lg font-headline text-[#0F172A]">Waitlist is full</h3>
        <p className="text-[#64748B] mt-2 text-sm font-small">This campaign has reached its signup limit.</p>
      </div>
    );
  }

  if (success) {
    return (
      <div className="space-y-6 bg-card border rounded-xl p-6 shadow-sm">
        <div className="flex flex-col items-center text-center space-y-2">
          <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-2">
            <CheckCircle2 className="h-6 w-6 text-green-600" />
          </div>
          <h3 className="text-xl font-bold">You're in!</h3>
          <p className="text-muted-foreground text-sm">
            Thank you for joining. Share your unique link below to move up the waitlist!
          </p>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Your referral link</label>
          <div className="flex gap-2">
            <Input readOnly value={referralLink} className="bg-muted font-mono text-sm" />
            <Button variant="outline" size="icon" onClick={copyToClipboard}>
              {copied ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Friends referred:</span>
          <span className="font-bold text-lg">{referralsCount}</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-2xl font-small">{error}</div>}
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Input 
          type="email" 
          placeholder="Enter your email address" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-12 flex-1"
        />
        <Button type="submit" size="lg" disabled={loading} className="h-12 px-8 bg-[#FF2A54] hover:bg-[#E62348] text-white font-small">
          {loading ? 'Joining...' : 'Join Waitlist'}
        </Button>
      </div>
      
      <p className="text-xs text-muted-foreground text-center">
        By joining, you agree to receive updates about this launch.
      </p>
    </form>
  );
}
