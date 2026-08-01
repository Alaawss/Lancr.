'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertTriangle, Crown, Lock, Trash2 } from 'lucide-react';
import { deleteCampaignConfirmed, updateCampaignSettings } from '@/actions/campaigns';
import { Button } from '@/components/ui/button';

type CampaignSettingsFormProps = { campaignId: string; initialSlug: string; initialSignupCap: number; isPremium: boolean };

export function CampaignSettingsForm({ campaignId, initialSlug, initialSignupCap, isPremium }: CampaignSettingsFormProps) {
  const router = useRouter();
  const [slug, setSlug] = useState(initialSlug);
  const [signupCap, setSignupCap] = useState(initialSignupCap.toString());
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [slugError, setSlugError] = useState<string | null>(null);

  const handleSlugChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const val = event.target.value;
    // Auto-format: lowercase, replace invalid chars with hyphens, collapse multiple hyphens
    const formatted = val
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    setSlug(formatted);
    
    // Validate slug format
    if (formatted && !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(formatted)) {
      setSlugError('Use lowercase letters, numbers, and single hyphens');
    } else {
      setSlugError(null);
    }
  };

  async function saveSettings(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSlugError(null);
    setSaving(true);
    
    const result = await updateCampaignSettings(campaignId, { slug, signupCap: Number(signupCap) });
    
    if ('error' in result) {
      if (result.error?.includes('campaign link') || result.error?.includes('lowercase')) {
        setSlugError(result.error ?? null);
      } else {
        setError(result.error ?? null);
      }
      setSaving(false);
      return;
    }
    
    router.refresh();
    setSaving(false);
  }

  async function permanentlyDelete() {
    setError(null); setDeleting(true);
    try {
      await deleteCampaignConfirmed(campaignId, deleteConfirmation);
      router.replace('/dashboard/campaigns');
      router.refresh();
    } catch (caught: unknown) {
      setError(caught instanceof Error ? caught.message : 'Unable to delete campaign.');
      setDeleting(false);
    }
  }

  return (
    <div className="space-y-6">
      {error && <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>}
      <form onSubmit={saveSettings} className="space-y-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div><h2 className="text-lg font-semibold">Campaign settings</h2><p className="mt-1 text-sm text-slate-500">Control your public link and signup limit.</p></div>
        <div><div className="mb-1 flex items-center justify-between gap-3"><label htmlFor="campaign-slug" className="text-sm font-medium text-slate-800">Campaign link</label>{!isPremium && <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700"><Lock className="h-3 w-3" /> Premium</span>}</div><div className="flex"><span className="inline-flex items-center rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">/c/</span><input id="campaign-slug" value={slug} onChange={handleSlugChange} disabled={!isPremium} className={`min-w-0 flex-1 rounded-r-lg border px-3 py-2 text-sm outline-none focus:ring-2 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-500 ${slugError ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-slate-200 focus:border-violet-500 focus:ring-violet-100'}`} /></div>{slugError && <p className="mt-1 text-xs text-red-600">{slugError}</p>}<p className="mt-2 text-xs text-slate-500">{isPremium ? 'Changing this will break existing shared links.' : 'Upgrade to Premium to customize your campaign link.'}</p></div>
        <div><label htmlFor="signup-cap" className="mb-1 block text-sm font-medium text-slate-800">Signup cap</label><input id="signup-cap" type="number" min="0" max={isPremium ? undefined : 50} value={signupCap} onChange={(event) => setSignupCap(event.target.value)} className="block w-full rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100" /><p className="mt-2 text-xs text-slate-500">Use 0 for unlimited{isPremium ? '.' : '; Free campaigns allow up to 50 signups.'}</p></div>
        <div className="flex justify-end border-t border-slate-100 pt-5"><Button type="submit" isLoading={saving}>Save settings</Button></div>
      </form>
      {!isPremium && <div className="flex gap-3 rounded-xl border border-violet-100 bg-violet-50 p-5"><Crown className="mt-0.5 h-5 w-5 shrink-0 text-violet-700" /><div><p className="font-medium text-violet-950">Unlock a custom campaign link</p><p className="mt-1 text-sm text-violet-800">Premium lets you change your public link without starting a new campaign.</p></div></div>}
      <section className="rounded-xl border border-red-200 bg-red-50 p-6"><div className="flex gap-3"><AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-700" /><div><h2 className="font-semibold text-red-900">Delete campaign</h2><p className="mt-1 text-sm text-red-700">This permanently removes the campaign, its signups, benefits, and analytics. This cannot be undone.</p></div></div><div className="mt-5"><label htmlFor="delete-confirmation" className="block text-sm font-medium text-red-900">Type <code className="rounded bg-red-100 px-1.5 py-0.5">DELETE</code> to confirm</label><input id="delete-confirmation" value={deleteConfirmation} onChange={(event) => setDeleteConfirmation(event.target.value)} placeholder="DELETE" className="mt-2 w-full rounded-lg border border-red-200 bg-white px-3 py-2 text-sm outline-none focus:border-red-500 focus:ring-2 focus:ring-red-100" /></div><div className="mt-4 flex justify-end"><Button type="button" variant="danger" isLoading={deleting} disabled={deleteConfirmation !== 'DELETE'} onClick={permanentlyDelete}><Trash2 className="mr-2 h-4 w-4" /> Delete permanently</Button></div></section>
    </div>
  );
}
