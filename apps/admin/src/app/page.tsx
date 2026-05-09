import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ReportCard } from '@/components/dashboard/ReportCard';
import { CheckCircle2, ClipboardList, AlertTriangle } from 'lucide-react';

const mockStats = [
  {
    label: 'Masalah berhasil diperbaiki',
    value: 12,
    description: 'Masalah berhasil diperbaiki',
    icon: CheckCircle2,
    variant: 'success' as const,
    badgeLabel: 'Selesai',
  },
  {
    label: 'Sedang ditangani',
    value: 3,
    description: 'Sedang ditangani',
    icon: ClipboardList,
    variant: 'warning' as const,
    badgeLabel: 'Sedang Diproses',
  },
  {
    label: 'Perlu info tambahan',
    value: 1,
    description: 'Perlu info tambahan',
    icon: AlertTriangle,
    variant: 'danger' as const,
    badgeLabel: 'Butuh Tindakan',
  },
];

const mockReports = [
  {
    title: 'Lubang Dalam di Jl. Sudirman',
    location: 'Kecamatan Pusat',
    date: '24 Okt 2024',
    description: 'Sebuah lubang besar terbentuk di lajur kanan, menyebabkan kendaraan menghindar secara berbahaya. Tampaknya semakin membesar setelah hujan turun baru-baru ini.',
    status: 'Sedang Diproses' as const,
    imageUrl: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?q=80&w=500&auto=format&fit=crop',
    progress: 50,
  },
  {
    title: 'Lampu Jalan Rusak',
    location: 'Kecamatan Utara',
    date: '15 Okt 2024',
    description: 'Lampu jalan di dekat persimpangan telah padam selama tiga hari, membuat penyeberangan jalan sangat gelap dan berbahaya di malam hari.',
    status: 'Selesai' as const,
    imageUrl: 'https://images.unsplash.com/photo-1498654896293-37aacf113fd9?q=80&w=500&auto=format&fit=crop',
    progress: 100,
  },
];

export default function Home() {
  return (
    <DashboardLayout>
      <div className="py-6 space-y-8 pb-12">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockStats.map((stat) => (
            <StatCard key={stat.label} {...stat} />
          ))}
        </div>

        {/* Latest Reports Section */}
        <section className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Laporan Terbaru</h3>
            <button className="text-primary-900 text-sm font-semibold hover:underline">
              Lihat Semua
            </button>
          </div>

          <div className="divide-y divide-gray-50">
            {mockReports.map((report) => (
              <ReportCard key={report.title} {...report} />
            ))}
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
