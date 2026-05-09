'use client';

import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { ReportTable } from '@/components/reports/ReportTable';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useState, useEffect } from 'react';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchReports = async () => {
    try {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      const user = storedUser ? JSON.parse(storedUser) : null;
      const isCitizen = user?.role === 'CITIZEN';

      let url = `http://localhost:3000/reports?search=${search}`;
      if (isCitizen) {
        url += `&citizenId=${user.id}`;
      }

      const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      setReports(data.items || []);
    } catch (error) {
      console.error('Failed to fetch reports', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchReports();
    }, 500); // Debounce search
    return () => clearTimeout(timer);
  }, [search]);

  return (
    <DashboardLayout>
      <div className="py-6 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari laporan..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm text-black"
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

        {loading ? (
          <div className="py-20 text-center text-gray-400 bg-white rounded-2xl border border-gray-100">
            Memuat laporan...
          </div>
        ) : (
          <ReportTable reports={reports} onRefresh={fetchReports} />
        )}
      </div>
    </DashboardLayout>
  );
}
