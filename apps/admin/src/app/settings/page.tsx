import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <DashboardLayout>
      <div className="py-20 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 bg-primary-50 rounded-full flex items-center justify-center text-primary-900 mb-6">
          <Settings size={40} />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Pengaturan Akun</h2>
        <p className="text-gray-500 mt-2 max-w-md">
          Fitur pengaturan profil dan keamanan akun sedang dalam tahap pengembangan.
        </p>
      </div>
    </DashboardLayout>
  );
}
