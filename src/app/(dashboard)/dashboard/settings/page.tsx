import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect('/login');

  return (
    <div className="max-w-2xl mx-auto space-y-8 p-4 pt-6 md:p-8">
      <div>
        <p className="text-sm font-semibold text-[#FF2A54] font-small">Account Settings</p>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Settings</h1>
        <p className="mt-1 text-sm text-[#64748B] font-small">Manage your profile and account preferences.</p>
      </div>

      <div className="bg-white rounded-3xl border border-[#CBD5E1] shadow-sm p-6 space-y-6">
        <div>
          <label className="block text-sm font-medium text-[#0F172A] mb-1 font-small">Email Address</label>
          <input type="email" disabled defaultValue={user.email} className="block w-full px-3 py-2 border border-[#CBD5E1] rounded-2xl bg-[#F8FAFC] text-[#64748B] sm:text-sm font-small" />
          <p className="mt-1 text-xs text-[#64748B] font-small">Email cannot be changed at this time.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#0F172A] mb-1 font-small">Display Name</label>
          <input type="text" placeholder="Your name" className="block w-full px-3 py-2 border border-[#CBD5E1] rounded-2xl outline-none focus:border-[#FF2A54] sm:text-sm font-small" />
        </div>

        <hr className="border-[#CBD5E1]" />

        <div>
          <h3 className="text-md font-medium text-[#0F172A] mb-4 font-headline">Change Password</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1 font-small">New Password</label>
              <input type="password" placeholder="••••••••" className="block w-full px-3 py-2 border border-[#CBD5E1] rounded-2xl outline-none focus:border-[#FF2A54] sm:text-sm font-small" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#0F172A] mb-1 font-small">Confirm Password</label>
              <input type="password" placeholder="••••••••" className="block w-full px-3 py-2 border border-[#CBD5E1] rounded-2xl outline-none focus:border-[#FF2A54] sm:text-sm font-small" />
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end border-t border-[#CBD5E1]">
          <button className="bg-[#FF2A54] text-white px-6 py-2 rounded-2xl hover:bg-[#E62348] transition-colors text-sm font-medium font-small">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
