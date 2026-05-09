'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/Button';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  Tag, 
  CheckCircle2, 
  Clock, 
  AlertTriangle 
} from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { clsx } from 'clsx';

export default function ReportDetailPage({ params }: { params: { id: string } }) {
  const [status, setStatus] = useState<'Verified' | 'In Progress' | 'Resolved'>('Verified');

  const report = {
    id: params.id,
    title: 'Lubang Dalam di Jl. Sudirman',
    category: 'Jalanan',
    description: 'Sebuah lubang besar terbentuk di lajur kanan, menyebabkan kendaraan menghindar secara berbahaya. Tampaknya semakin membesar setelah hujan turun baru-baru ini.',
    location: 'Jl. Jenderal Sudirman No. 12, Jakarta Pusat',
    date: '24 Oktober 2024',
    citizen: 'Budi Santoso',
    citizenId: '19842A',
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=1200&auto=format&fit=crop',
  };

  return (
    <DashboardLayout>
      <div className="py-6 space-y-6 pb-12">
        <Link href="/reports" className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-900 transition-colors">
          <ArrowLeft size={16} />
          Kembali ke Daftar Laporan
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <img src={report.imageUrl} alt={report.title} className="w-full aspect-video object-cover" />
              <div className="p-8 space-y-6">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{report.title}</h1>
                  <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                      <Tag size={16} />
                      {report.category}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      {report.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      {report.location}
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-3">Deskripsi Masalah</h3>
                  <p className="text-gray-600 leading-relaxed">{report.description}</p>
                </div>
              </div>
            </div>

            {/* Activity Log Placeholder */}
            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-6">Log Aktivitas</h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Laporan Diverifikasi</p>
                    <p className="text-xs text-gray-400">25 Okt 2024 • 10:30 WIB</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mt-2" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Petugas Ditugaskan</p>
                    <p className="text-xs text-gray-400">24 Okt 2024 • 14:15 WIB</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Informasi Pelapor</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-900">
                  <User size={24} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{report.citizen}</p>
                  <p className="text-xs text-gray-500">ID: {report.citizenId}</p>
                </div>
              </div>
              <Button variant="outline" className="w-full mt-6">
                Hubungi Pelapor
              </Button>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Manajemen Status</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => setStatus('Verified')}
                  className={clsx(
                    'w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between',
                    status === 'Verified' ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500' : 'border-gray-100'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Verifikasi</p>
                      <p className="text-xs text-gray-500">Tandai sudah dicek</p>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => setStatus('In Progress')}
                  className={clsx(
                    'w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between',
                    status === 'In Progress' ? 'border-orange-500 bg-orange-50 ring-1 ring-orange-500' : 'border-gray-100'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
                      <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Sedang Diproses</p>
                      <p className="text-xs text-gray-500">Petugas di lapangan</p>
                    </div>
                  </div>
                </button>

                <button 
                  onClick={() => setStatus('Resolved')}
                  className={clsx(
                    'w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between',
                    status === 'Resolved' ? 'border-green-500 bg-green-50 ring-1 ring-green-500' : 'border-gray-100'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-100 rounded-lg text-green-600">
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Selesai</p>
                      <p className="text-xs text-gray-500">Masalah diperbaiki</p>
                    </div>
                  </div>
                </button>
              </div>

              <Button className="w-full mt-6 py-4">
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
