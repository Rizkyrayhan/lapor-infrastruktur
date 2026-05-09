'use client';

import { Button } from '@/components/ui/Button';
import { User, Mail, Lock, ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role: 'CITIZEN' }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Pendaftaran gagal');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/login');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-primary-50 p-6">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-10 border border-primary-100">
        <Link href="/login" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-900 mb-8 transition-colors">
          <ArrowLeft size={16} />
          Kembali ke Login
        </Link>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-primary-900">Daftar Warga</h1>
          <p className="text-gray-500 mt-2 text-sm">Buat akun untuk mulai melaporkan masalah</p>
        </div>

        {success ? (
          <div className="p-6 bg-green-50 text-green-700 rounded-2xl border border-green-100 text-center">
            <h3 className="font-bold text-lg mb-2">Pendaftaran Berhasil!</h3>
            <p className="text-sm">Akun Anda telah dibuat. Mengalihkan ke halaman login...</p>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleRegister}>
            {error && (
              <div className="p-3 bg-red-50 text-red-600 text-sm rounded-lg border border-red-100">
                {error}
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Nama Lengkap</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Masukkan nama lengkap Anda"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@contoh.com"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-black"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Kata Sandi</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="password" 
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all text-black"
                />
              </div>
            </div>

            <Button 
              className="w-full py-4 text-lg font-bold mt-4" 
              type="submit"
              disabled={loading}
            >
              {loading ? 'Mendaftarkan...' : 'Daftar Sekarang'}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
