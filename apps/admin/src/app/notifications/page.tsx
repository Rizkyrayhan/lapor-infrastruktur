import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <DashboardLayout>
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center text-primary-900 mb-6">
          <Bell size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Belum Ada Notifikasi</h2>
        <p className="text-gray-500 mt-2 max-w-md">
          Anda akan menerima pemberitahuan di sini ketika ada pembaruan status pada laporan infrastruktur Anda.
        </p>
      </div>
    </DashboardLayout>
  );
}
