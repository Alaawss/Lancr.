'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createCampaign } from '@/actions/campaigns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

export default function NewCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('saas');
  const [launchDate, setLaunchDate] = useState('');
  const [signupCap, setSignupCap] = useState('100');
  const [benefits, setBenefits] = useState<string[]>(['']);
  const [publishImmediately, setPublishImmediately] = useState(true);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setName(val);
    if (!slug || slug === name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, ''));
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

    try {
      const filteredBenefits = benefits.filter(b => b.trim() !== '');
      const campaign = await createCampaign({
        name,
        description,
        category,
        slug,
        launchDate: launchDate ? new Date(launchDate).toISOString() : null,
        signupCap: parseInt(signupCap, 10),
        benefits: filteredBenefits,
        status: publishImmediately ? 'published' : 'draft',
      });

      router.push(`/dashboard/campaigns/${campaign.id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 md:p-8 pt-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Create Campaign</h2>
        <p className="text-muted-foreground">Setup your waitlist page in seconds.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium leading-none">Name</label>
            <Input required value={name} onChange={handleNameChange} placeholder="e.g. Lancr Beta" className="mt-2" />
          </div>

          <div>
            <label className="text-sm font-medium leading-none">Slug</label>
            <Input required value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="e.g. lancr-beta" className="mt-2" />
          </div>

          <div>
            <label className="text-sm font-medium leading-none">Description</label>
            <Textarea required value={description} onChange={(e) => setDescription(e.target.value)} placeholder="What are you launching?" className="mt-2" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium leading-none">Category</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger className="mt-2">
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
              <label className="text-sm font-medium leading-none">Signup Cap (0 for unlimited)</label>
              <Input type="number" required min="0" value={signupCap} onChange={(e) => setSignupCap(e.target.value)} className="mt-2" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium leading-none">Launch Date</label>
            <Input type="datetime-local" value={launchDate} onChange={(e) => setLaunchDate(e.target.value)} className="mt-2" />
          </div>

          <label className="flex items-start gap-3 rounded-lg border p-4 cursor-pointer">
            <input
              type="checkbox"
              checked={publishImmediately}
              onChange={(event) => setPublishImmediately(event.target.checked)}
              className="mt-0.5 h-4 w-4 accent-violet-600"
            />
            <span>
              <span className="block text-sm font-medium">Publish when created</span>
              <span className="block text-sm text-muted-foreground mt-1">Your public campaign link will work immediately. Turn this off to save a private draft.</span>
            </span>
          </label>

          <div>
            <label className="text-sm font-medium leading-none mb-2 block">Benefits / Features</label>
            <div className="space-y-2">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex gap-2">
                  <Input value={benefit} onChange={(e) => handleBenefitChange(index, e.target.value)} placeholder={`Benefit ${index + 1}`} />
                  <Button type="button" variant="outline" size="icon" onClick={() => handleRemoveBenefit(index)} disabled={benefits.length === 1}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            <Button type="button" variant="link" onClick={handleAddBenefit} className="mt-2 px-0">
              <Plus className="h-4 w-4 mr-1" /> Add benefit
            </Button>
          </div>
        </div>

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Creating...' : 'Create Campaign'}
        </Button>
      </form>
    </div>
  );
}
