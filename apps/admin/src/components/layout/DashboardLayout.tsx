'use client';

import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
        <div className="hidden md:block w-64 bg-[#F8FAFC] border-r border-gray-200 h-screen sticky top-0" />
        <main className="flex-1 px-4 md:px-12 overflow-y-auto">
          <header className="flex items-center justify-between py-6">
            <div className="h-10 w-48 bg-gray-100 rounded animate-pulse" />
          </header>
          {children}
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white relative">
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsSidebarOpen(true)}
        className="md:hidden fixed top-6 left-4 z-40 p-2 bg-white border border-gray-200 rounded-lg shadow-sm"
      >
        <Menu size={20} />
      </button>

      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      <main className="flex-1 px-4 md:px-12 overflow-y-auto w-full">
        <div className="md:block hidden">
          <Header userName={user?.name || 'Warga'} />
        </div>
        
        {/* Mobile Header (Simplified) */}
        <div className="md:hidden flex items-center justify-between py-6 pl-12">
          <h1 className="text-xl font-bold text-gray-900 truncate">
             {user?.name || 'Warga'}
          </h1>
        </div>

        {children}
      </main>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}
