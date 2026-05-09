import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ReportTable } from '@/components/reports/ReportTable';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ReportsPage() {
  return (
    <DashboardLayout>
      <div className="py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari laporan..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter size={18} />
              Filter
            </Button>
          </div>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download size={18} />
            Export CSV
          </Button>
        </div>

        <ReportTable />
      </div>
    </DashboardLayout>
  );
}
