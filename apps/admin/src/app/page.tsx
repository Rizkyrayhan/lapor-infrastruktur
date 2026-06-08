'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ReportCard } from '@/components/dashboard/ReportCard';
import { CreateReportModal } from '@/components/reports/CreateReportModal';
import { CheckCircle2, ClipboardList, AlertTriangle, Plus } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [stats, setStats] = useState({
    resolved: 0,
    inProgress: 0,
    pending: 0
  });

  const fetchData = async () => {
    const storedUser = localStorage.getItem('user');
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    const isCitizen = currentUser?.role === 'CITIZEN';

    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/reports', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        const items = data.items || [];
        
        const filteredItems = isCitizen 
          ? items.filter((r: any) => r.citizenId === currentUser.id)
          : items;

        setStats({
          resolved: filteredItems.filter((r: any) => r.status === 'RESOLVED').length,
          inProgress: filteredItems.filter((r: any) => r.status === 'IN_PROGRESS').length,
          pending: filteredItems.filter((r: any) => r.status === 'PENDING').length,
        });
      } catch (error) {
        console.error(error);
      }
    };

    const fetchReports = async () => {
      try {
        const token = localStorage.getItem('token');
        const url = isCitizen 
          ? `http://localhost:3000/reports?citizenId=${currentUser.id}&limit=5`
          : 'http://localhost:3000/reports?limit=5';
          
        const response = await fetch(url, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        const data = await response.json();
        setReports(data.items || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    await Promise.all([fetchStats(), fetchReports()]);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    fetchData();
  }, []);

  const statItems = [
    {
      label: 'Masalah berhasil diperbaiki',
      value: stats.resolved,
      description: 'Masalah berhasil diperbaiki',
      icon: CheckCircle2,
      variant: 'success' as const,
      badgeLabel: 'Selesai',
    },
    {
      label: 'Sedang ditangani',
      value: stats.inProgress,
      description: 'Sedang ditangani',
      icon: ClipboardList,
      variant: 'warning' as const,
      badgeLabel: 'Sedang Diproses',
    },
    {
      label: 'Perlu info tambahan',
      value: stats.pending,
      description: 'Laporan baru masuk',
      icon: AlertTriangle,
      variant: 'danger' as const,
      badgeLabel: 'Butuh Tindakan',
    },
  ];

  return (
    <DashboardLayout>
      <div className="py-6 space-y-8 pb-12">
        {/* Header Actions */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Selamat Datang, {user?.name || 'User'}</h1>
            <p className="text-gray-500 text-sm">Berikut ringkasan infrastruktur di wilayah Anda hari ini.</p>
          </div>
          <Button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-6 py-6 rounded-2xl shadow-lg shadow-primary-200"
          >
            <Plus size={20} />
            Buat Laporan
          </Button>
        </div>

        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statItems.map((stat) => (
            <StatCard key={stat.label} {...stat} loading={loading} />
          ))}
        </div>

        {/* Latest Reports Section */}
        <section className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Laporan Terbaru</h3>
            <Link href="/reports" className="text-primary-900 text-sm font-semibold hover:underline">
              Lihat Semua
            </Link>
          </div>

          <div className="divide-y divide-gray-50">
            {loading ? (
              <div className="p-20 text-center text-gray-400">Memuat data...</div>
            ) : reports.length > 0 ? (
              reports.map((report: any) => (
                <ReportCard 
                  key={report.id} 
                  title={report.title}
                  location={report.location}
                  date={new Date(report.createdAt).toLocaleDateString('id-ID')}
                  description={report.description}
                  status={report.status === 'RESOLVED' ? 'Selesai' : report.status === 'IN_PROGRESS' ? 'Sedang Diproses' : 'Butuh Tindakan'}
                  imageUrl={report.imageUrl ? `http://localhost:3000${report.imageUrl}` : 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=500&auto=format&fit=crop'}
                  progress={report.status === 'RESOLVED' ? 100 : report.status === 'IN_PROGRESS' ? 50 : 10}
                />
              ))
            ) : (
              <div className="p-20 text-center text-gray-400">Belum ada laporan terbaru.</div>
            )}
          </div>
        </section>

        <CreateReportModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          onSuccess={fetchData}
        />
      </div>
    </DashboardLayout>
  );
}
