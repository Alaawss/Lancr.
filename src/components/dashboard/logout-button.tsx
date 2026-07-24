'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { logout } = await import('@/actions/auth');
    await logout();
    router.push('/login');
  };

  return (
    <button 
      onClick={handleLogout}
      className="flex items-center gap-2 p-2 w-full text-left hover:bg-[#F8FAFC] rounded-2xl text-[#FF2A54] font-small"
    >
      <LogOut className="w-4 h-4" /> Log Out
    </button>
  );
}
