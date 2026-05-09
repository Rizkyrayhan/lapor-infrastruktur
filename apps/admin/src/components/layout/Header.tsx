'use client';

import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface HeaderProps {
  userName: string;
}

export function Header({ userName }: HeaderProps) {
  return (
    <header className="flex items-center justify-between py-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Selamat datang kembali, {userName}</h1>
        <p className="text-gray-500 mt-1 text-sm">Sistem Pelaporan Infrastruktur Terpadu.</p>
      </div>
    </header>
  );
}
