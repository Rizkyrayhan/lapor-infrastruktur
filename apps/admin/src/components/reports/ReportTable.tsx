'use client';

import { Eye, MoreVertical } from 'lucide-react';
import { Button } from '../ui/Button';
import { clsx } from 'clsx';
import Link from 'next/link';

interface Report {
  id: string;
  title: string;
  category: string;
  status: string;
  createdAt: string;
  citizen?: { name: string };
}

interface ReportTableProps {
  reports: Report[];
  onRefresh?: () => void;
}

const statusMap: Record<string, { label: string, color: string }> = {
  'PENDING': { label: 'Pending', color: 'bg-gray-100 text-gray-600' },
  'VERIFIED': { label: 'Verified', color: 'bg-blue-100 text-blue-600' },
  'IN_PROGRESS': { label: 'Proses', color: 'bg-orange-100 text-orange-600' },
  'RESOLVED': { label: 'Selesai', color: 'bg-green-100 text-green-600' },
};

export function ReportTable({ reports }: ReportTableProps) {
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
                  <span className={clsx('px-3 py-1 rounded-full text-[10px] font-bold uppercase', statusMap[report.status]?.color)}>
                    {statusMap[report.status]?.label || report.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {new Date(report.createdAt).toLocaleDateString('id-ID')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{report.citizen?.name || 'Anonim'}</td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/reports/${report.id}`}>
                      <Button variant="ghost" size="sm" className="p-2">
                        <Eye size={16} />
                      </Button>
                    </Link>
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
        <p>Menampilkan {reports.length} laporan</p>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" disabled>Sebelumnya</Button>
          <Button variant="outline" size="sm">Selanjutnya</Button>
        </div>
      </div>
    </div>
  );
}
