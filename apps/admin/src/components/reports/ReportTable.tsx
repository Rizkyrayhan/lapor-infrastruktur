'use client';

import { Eye, MoreVertical } from 'lucide-react';
import { Button } from '../ui/Button';
import { clsx } from 'clsx';

interface Report {
  id: string;
  title: string;
  category: string;
  status: 'Pending' | 'Verified' | 'In Progress' | 'Resolved';
  date: string;
  citizen: string;
}

const reports: Report[] = [
  { id: '1', title: 'Lubang Dalam di Jl. Sudirman', category: 'Jalanan', status: 'In Progress', date: '24 Okt 2024', citizen: 'Budi Santoso' },
  { id: '2', title: 'Lampu Jalan Rusak', category: 'Penerangan', status: 'Resolved', date: '15 Okt 2024', citizen: 'Budi Santoso' },
  { id: '3', title: 'Drainase Tersumbat', category: 'Drainase', status: 'Verified', date: '10 Okt 2024', citizen: 'Ani Wijaya' },
  { id: '4', title: 'Jembatan Retak', category: 'Jembatan', status: 'Pending', date: '05 Okt 2024', citizen: 'Joko Susilo' },
];

export function ReportTable() {
  const statusColors = {
    'Pending': 'bg-gray-100 text-gray-600',
    'Verified': 'bg-blue-100 text-blue-600',
    'In Progress': 'bg-orange-100 text-orange-600',
    'Resolved': 'bg-green-100 text-green-600',
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100">
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Judul Laporan</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Kategori</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Status</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Tanggal</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">Pelapor</th>
              <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="text-sm font-semibold text-gray-900">{report.title}</div>
                  <div className="text-xs text-gray-400">ID: {report.id}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.category}</td>
                <td className="px-6 py-4">
                  <span className={clsx('px-3 py-1 rounded-full text-[10px] font-bold uppercase', statusColors[report.status])}>
                    {report.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.date}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.citizen}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="sm" className="p-2">
                      <Eye size={16} />
                    </Button>
                    <Button variant="ghost" size="sm" className="p-2">
                      <MoreVertical size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="p-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
        <p>Menampilkan 4 dari 128 laporan</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Sebelumnya</Button>
          <Button variant="outline" size="sm">Selanjutnya</Button>
        </div>
      </div>
    </div>
  );
}
