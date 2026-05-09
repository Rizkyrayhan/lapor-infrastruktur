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
  AlertTriangle,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { useRouter } from 'next/navigation';

export default function ReportDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<string>('');
  const router = useRouter();

  const fetchReport = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/reports/${id}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) throw new Error('Gagal mengambil detail laporan');
      const data = await response.json();
      setReport(data);
      setSelectedStatus(data.status);
    } catch (error) {
      console.error(error);
      router.push('/reports');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport();
  }, [id]);

  const handleUpdateStatus = async () => {
    setUpdating(true);
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:3000/reports/${id}/status`, {
        method: 'PATCH',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status: selectedStatus }),
      });

      if (!response.ok) throw new Error('Gagal memperbarui status');
      
      await fetchReport(); // Refresh data
      alert('Status berhasil diperbarui');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="py-20 text-center text-gray-400">Memuat detail laporan...</div>
      </DashboardLayout>
    );
  }

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
              <img 
                src={report.imageUrl ? `http://localhost:3000${report.imageUrl}` : 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=1200&auto=format&fit=crop'} 
                alt={report.title} 
                className="w-full aspect-video object-cover" 
              />
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
                      {new Date(report.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
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
          </div>

          {/* Sidebar Actions */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Informasi Pelapor</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center text-primary-900 font-bold">
                  {report.citizen?.name?.[0] || 'A'}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{report.citizen?.name || 'Anonim'}</p>
                  <p className="text-xs text-gray-500">ID: {report.citizenId.slice(0, 8)}...</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4">Manajemen Status</h3>
              <div className="space-y-3">
                {[
                  { id: 'VERIFIED', label: 'Verifikasi', sub: 'Tandai sudah dicek', icon: CheckCircle2, color: 'blue' },
                  { id: 'IN_PROGRESS', label: 'Sedang Diproses', sub: 'Petugas di lapangan', icon: Clock, color: 'orange' },
                  { id: 'RESOLVED', label: 'Selesai', sub: 'Masalah diperbaiki', icon: CheckCircle2, color: 'green' },
                ].map((s) => (
                  <button 
                    key={s.id}
                    onClick={() => setSelectedStatus(s.id)}
                    className={clsx(
                      'w-full p-4 rounded-xl border text-left transition-all flex items-center justify-between',
                      selectedStatus === s.id 
                        ? `border-${s.color}-500 bg-${s.color}-50 ring-1 ring-${s.color}-500` 
                        : 'border-gray-100'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={clsx('p-2 rounded-lg', selectedStatus === s.id ? `bg-${s.color}-100 text-${s.color}-600` : 'bg-gray-100 text-gray-400')}>
                        <s.icon size={18} />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-gray-900">{s.label}</p>
                        <p className="text-xs text-gray-500">{s.sub}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <Button 
                className="w-full mt-6 py-4" 
                onClick={handleUpdateStatus}
                disabled={updating || selectedStatus === report.status}
              >
                {updating ? <Loader2 className="animate-spin" size={20} /> : 'Simpan Perubahan'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
