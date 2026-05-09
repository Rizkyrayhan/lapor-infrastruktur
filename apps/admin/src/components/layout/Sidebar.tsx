'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  FileText, 
  Bell, 
  Settings, 
  LogOut 
} from 'lucide-react';
import { clsx } from 'clsx';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/' },
  { name: 'Laporan Saya', icon: FileText, href: '/reports' },
  { name: 'Notifikasi', icon: Bell, href: '/notifications' },
  { name: 'Pengaturan', icon: Settings, href: '/settings' },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-[#F8FAFC] border-r border-gray-200 flex flex-col h-screen sticky top-0">
      <div className="p-6">
        <h2 className="text-primary-900 font-bold text-lg">Dashboard Warga</h2>
        <p className="text-gray-400 text-xs">Pelaporan Resmi</p>
      </div>

      <nav className="flex-1 px-4 space-y-1 mt-4">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                'flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all',
                isActive 
                  ? 'bg-primary-900 text-white shadow-md' 
                  : 'text-gray-500 hover:bg-gray-100'
              )}
            >
              <item.icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 p-2">
          <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
            <img 
              src="https://ui-avatars.com/api/?name=Budi+Santoso&background=random" 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Budi Santoso</p>
            <p className="text-xs text-gray-500 truncate">ID Warga: 19842A</p>
          </div>
        </div>
        <button className="flex items-center gap-3 w-full px-4 py-2 mt-4 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all">
          <LogOut size={18} />
          Keluar
        </button>
      </div>
    </aside>
  );
}
