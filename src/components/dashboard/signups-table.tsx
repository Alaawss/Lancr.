'use client';

import { useMemo, useState } from 'react';
import { Search, Users } from 'lucide-react';

type Signup = {
  id: string;
  email: string;
  source: 'direct' | 'referral';
  created_at: string;
  referral_count: number;
};

export function SignupsTable({ signups }: { signups: Signup[] }) {
  const [query, setQuery] = useState('');
  const filtered = useMemo(() => signups.filter((signup) => signup.email.toLowerCase().includes(query.trim().toLowerCase())), [query, signups]);

  return (
    <section className="overflow-hidden rounded-3xl border border-[#CBD5E1] bg-white shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#CBD5E1] p-4">
        <div className="relative min-w-56 flex-1"><Search className="absolute left-3 top-3 h-4 w-4 text-[#94A3B8]" /><input value={query} onChange={(event) => setQuery(event.target.value)} type="search" placeholder="Search by email" className="w-full rounded-2xl border border-[#CBD5E1] py-2 pl-9 pr-4 text-sm outline-none focus:border-[#FF2A54] focus:ring-2 focus:ring-[#FF2A54]/10 font-small" /></div>
        <p className="text-sm text-[#64748B] font-small">{filtered.length} of {signups.length} signups</p>
      </div>
      {filtered.length === 0 ? (
        <div className="flex min-h-56 flex-col items-center justify-center px-6 text-center"><Users className="h-8 w-8 text-[#CBD5E1]" /><p className="mt-3 font-medium text-[#0F172A] font-headline">{signups.length ? 'No matching signups' : 'No signups yet'}</p><p className="mt-1 text-sm text-[#64748B] font-small">{signups.length ? 'Try another email address.' : 'Publish and share your campaign link to start collecting leads.'}</p></div>
      ) : (
        <div className="overflow-x-auto"><table className="w-full min-w-[40rem] text-left text-sm"><thead className="bg-[#F8FAFC] text-xs font-medium uppercase tracking-wide text-[#64748B] font-small"><tr><th className="px-5 py-3">Email</th><th className="px-5 py-3">Joined</th><th className="px-5 py-3">Source</th><th className="px-5 py-3 text-right">Referrals</th></tr></thead><tbody className="divide-y divide-[#CBD5E1]">{filtered.map((signup) => <tr key={signup.id} className="transition-colors hover:bg-[#F8FAFC]"><td className="px-5 py-4 font-medium text-[#0F172A] font-headline">{signup.email}</td><td className="px-5 py-4 text-[#64748B] font-small">{new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(signup.created_at))}</td><td className="px-5 py-4"><span className={signup.source === 'referral' ? 'rounded-full bg-[#FF2A54]/10 px-2.5 py-1 text-xs font-medium text-[#FF2A54] font-small' : 'rounded-full bg-[#F8FAFC] px-2.5 py-1 text-xs font-medium text-[#64748B] font-small'}>{signup.source === 'referral' ? 'Referral' : 'Direct'}</span></td><td className="px-5 py-4 text-right font-medium text-[#0F172A] font-headline">{signup.referral_count}</td></tr>)}</tbody></table></div>
      )}
    </section>
  );
}
