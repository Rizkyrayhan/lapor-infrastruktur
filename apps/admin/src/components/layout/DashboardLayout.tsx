'use client';

import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useState, useEffect } from 'react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!mounted) {
    return (
      <div className="flex min-h-screen bg-white">
        <div className="w-64 bg-[#F8FAFC] border-r border-gray-200 h-screen sticky top-0" />
        <main className="flex-1 px-12 overflow-y-auto">
          <header className="flex items-center justify-between py-6">
            <div className="h-10 w-48 bg-gray-100 rounded animate-pulse" />
          </header>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 px-12 overflow-y-auto">
        <Header userName={user?.name || 'Warga'} />
        {children}
      </main>
    </div>
  );
}
