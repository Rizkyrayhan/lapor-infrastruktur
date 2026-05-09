import { DashboardLayout } from '@/components/layout/DashboardLayout';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="py-8">
        <div className="p-8 bg-primary-50 rounded-2xl border border-primary-100 border-dashed flex items-center justify-center min-h-[300px]">
          <div className="text-center">
            <h2 className="text-primary-900 font-semibold text-lg">Dashboard Konten</h2>
            <p className="text-gray-500 text-sm mt-1">Laporan terbaru akan muncul di sini setelah diintegrasikan.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
