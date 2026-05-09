'use client';

import { Button } from '@/components/ui/Button';
import { Lock, Mail } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 border border-primary-100">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-900">LaporInfrastruktur</h1>
          <p className="text-gray-500 mt-2 text-sm">Masuk ke Dashboard Admin</p>
        </div>

        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="email" 
                placeholder="admin@laporinfrastruktur.id"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Kata Sandi</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input type="checkbox" id="remember" className="h-4 w-4 text-primary-900 focus:ring-primary-900 border-gray-300 rounded" />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">Ingat Saya</label>
            </div>
            <a href="#" className="text-sm font-medium text-primary-900 hover:underline">Lupa Sandi?</a>
          </div>

          <Button className="w-full py-4 text-lg font-bold" type="submit">
            Masuk Sekarang
          </Button>
        </form>

        <div className="mt-8 pt-8 border-t border-gray-100 text-center">
          <p className="text-sm text-gray-500 italic">
            "Melayani dengan transparansi untuk infrastruktur yang lebih baik."
          </p>
        </div>
      </div>
    </div>
  );
}
