'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { updateCampaign } from '@/actions/campaigns';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';

export default function EditCampaignForm({ campaign }: { campaign: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [name, setName] = useState(campaign.name);
  const [description, setDescription] = useState(campaign.description || '');
  const [status, setStatus] = useState(campaign.status);
  const [signupCap, setSignupCap] = useState(campaign.signup_cap?.toString() || '100');
  const [benefits, setBenefits] = useState<string[]>(
    campaign.benefits?.length > 0 ? campaign.benefits.map((b: any) => b.text) : ['']
  );

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
      await updateCampaign(campaign.id, {
        name,
        description,
        status,
        signup_cap: parseInt(signupCap, 10),
        benefits: filteredBenefits
      });
      router.refresh();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 text-sm text-red-500 bg-red-50 rounded-md">{error}</div>}
      
      <div>
        <label className="text-sm font-medium leading-none">Status</label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="mt-2">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="ended">Ended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="text-sm font-medium leading-none">Name</label>
        <Input required value={name} onChange={(e) => setName(e.target.value)} className="mt-2" />
      </div>

      <div>
        <label className="text-sm font-medium leading-none">Description</label>
        <Textarea required value={description} onChange={(e) => setDescription(e.target.value)} className="mt-2" />
      </div>

      <div>
        <label className="text-sm font-medium leading-none">Signup Cap</label>
        <Input type="number" required min="0" value={signupCap} onChange={(e) => setSignupCap(e.target.value)} className="mt-2" />
      </div>

      <div>
        <label className="text-sm font-medium leading-none mb-2 block">Benefits</label>
        <div className="space-y-2">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex gap-2">
              <Input value={benefit} onChange={(e) => handleBenefitChange(index, e.target.value)} />
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

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </Button>
    </form>
  );
}
