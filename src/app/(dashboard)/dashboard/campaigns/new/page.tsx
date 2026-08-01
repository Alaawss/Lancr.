'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCampaign } from '@/actions/campaigns';
import { generateSlug } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

export default function NewCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [slugError, setSlugError] = useState('');
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('saas');
  const [launchDate, setLaunchDate] = useState('');
  const [signupCap, setSignupCap] = useState('50');
  const [benefits, setBenefits] = useState<string[]>(['']);
  const [publishImmediately, setPublishImmediately] = useState(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!slug || slug === generateSlug(name)) {
      setSlug(generateSlug(val));
    }
  };

  const handleSlugChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
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
      setSlugError('');
    }
  };

  const handleAddBenefit = () => {
    setBenefits([...benefits, '']);
  };

  const handleRemoveBenefit = (index: number) => {
    const newBenefits = [...benefits];
    newBenefits.splice(index, 1);
    setBenefits(newBenefits);
  };

  const handleBenefitChange = (index: number, value: string) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSlugError('');

    try {
      const filteredBenefits = benefits.filter(b => b.trim() !== '');
      const result = await createCampaign({
        name,
        description,
        category,
        slug,
        launchDate: launchDate ? new Date(launchDate).toISOString() : null,
        signupCap: parseInt(signupCap, 10),
        benefits: filteredBenefits,
        status: publishImmediately ? 'published' : 'draft',
      });

      if ('error' in result) {
        if (result.error?.includes('campaign link') || result.error?.includes('lowercase')) {
          setSlugError(result.error);
        } else {
          setError(result.error);
        }
        return;
      }

      router.push(`/dashboard/campaigns/${result.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 pt-6 md:p-8">
      <div>
        <p className="text-sm font-semibold text-[#FF2A54] font-small">Campaigns</p>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Create Campaign</h1>
        <p className="mt-1 text-sm text-[#64748B] font-small">Setup your waitlist page in seconds.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="p-3 text-sm text-red-600 bg-red-50 rounded-2xl font-small">{error}</div>}
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium leading-none font-small">Name</label>
            <Input required value={name} onChange={handleNameChange} placeholder="e.g. Lancr Beta" className="mt-2 rounded-2xl" />
          </div>

          <div>
            <label className="text-sm font-medium leading-none font-small">Slug</label>
            <Input 
              required 
              value={slug} 
              onChange={handleSlugChange} 
              placeholder="e.g. lancr-beta" 
              className={`mt-2 rounded-2xl ${slugError ? 'border-red-500' : ''}`} 
            />
            {slugError && <p className="mt-1 text-xs text-red-600 font-small">{slugError}</p>}
          </div>

          <div>
            <label className="text-sm font-medium leading-none font-small">Description</label>
            <Textarea required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What are you launching?" className="mt-2 rounded-2xl" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium leading-none font-small">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-2 rounded-2xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="saas">SaaS</SelectItem>
                  <SelectItem value="mobile_app">Mobile App</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="event">Event</SelectItem>
                  <SelectItem value="course">Course</SelectItem>
                  <SelectItem value="community">Community</SelectItem>
                  <SelectItem value="newsletter">Newsletter</SelectItem>
                  <SelectItem value="game">Game</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium leading-none font-small">Signup Cap (0 for unlimited)</label>
              <Input type="number" required min="0" value={signupCap} onChange={(e) => setSignupCap(e.target.value)} className="mt-2 rounded-2xl" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium leading-none font-small">Launch Date</label>
            <Input type="datetime-local" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} className="mt-2 rounded-2xl" />
          </div>

          <label className="flex items-start gap-3 rounded-2xl border border-[#CBD5E1] p-4 cursor-pointer bg-white">
            <input
              type="checkbox"
              checked={publishImmediately}
              onChange={(event) => setPublishImmediately(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-[#FF2A54]"
            />
            <span>
              <span className="block text-sm font-medium font-headline">Publish when created</span>
              <span className="block text-sm text-[#64748B] mt-1 font-small">Your public campaign link will work immediately. Turn this off to save a private draft.</span>
            </span>
          </label>

          <div>
            <label className="text-sm font-medium leading-none mb-2 block font-small">Benefits / Features</label>
            <div className="space-y-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <Input value={benefit} onChange={(e) => handleBenefitChange(index, e.target.value)} placeholder={`Benefit ${index + 1}`} className="rounded-2xl" />
                  <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveBenefit(index)} disabled={benefits.length === 1} className="rounded-2xl">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button type="button" variant="link" onClick={handleAddBenefit} className="mt-2 px-0 text-[#FF2A54] font-small">
              <Plus className="h-4 w-4 mr-1" /> Add benefit
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full bg-[#FF2A54] hover:bg-[#E62348] text-white rounded-2xl font-small" disabled={loading}>
          {loading ? 'Creating...' : 'Create Campaign'}
        </Button>
      </form>
    </div>
  );
}
