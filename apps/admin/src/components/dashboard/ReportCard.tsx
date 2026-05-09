import { CheckCircle2, Circle, Clock } from 'lucide-react';
import { clsx } from 'clsx';

interface ReportCardProps {
  title: string;
  location: string;
  date: string;
  description: string;
  status: 'Selesai' | 'Sedang Diproses' | 'Butuh Tindakan';
  imageUrl: string;
  progress: number; // 0-100
}

export function ReportCard({ 
  title, 
  location, 
  date, 
  description, 
  status, 
  imageUrl, 
  progress 
}: ReportCardProps) {
  const statusStyles = {
    'Selesai': 'bg-[#E8F5E9] text-green-700',
    'Sedang Diproses': 'bg-[#FFF3E0] text-orange-700',
    'Butuh Tindakan': 'bg-[#FFEBEE] text-red-700',
  };

  return (
    <div className="bg-white p-6 flex gap-6 group hover:bg-gray-50 transition-all border-b border-gray-100 last:border-0">
      <div className="w-48 h-32 rounded-xl overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-100 shadow-sm">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div>
            <h4 className="text-lg font-bold text-gray-900 group-hover:text-primary-900 transition-colors">
              {title}
            </h4>
            <div className="flex items-center gap-2 mt-1 text-xs text-gray-400">
              <span className="font-medium text-gray-600">{location}</span>
              <span>•</span>
              <span>{date}</span>
            </div>
          </div>
          <span className={clsx('px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider', statusStyles[status])}>
            {status}
          </span>
        </div>

        <p className="text-sm text-gray-500 mt-3 line-clamp-2 leading-relaxed">
          {description}
        </p>

        <div className="mt-6 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <CheckCircle2 size={16} className="text-green-500" />
            <div className="w-8 h-[2px] bg-green-500" />
            <CheckCircle2 size={16} className={progress >= 50 ? 'text-green-500' : 'text-gray-300'} />
            <div className={clsx('w-8 h-[2px]', progress >= 100 ? 'bg-green-500' : 'bg-gray-200')} />
            <Circle size={16} className={progress >= 100 ? 'text-green-500' : 'text-gray-300'} />
          </div>
          <span className="text-xs font-semibold text-gray-600">
            {progress >= 100 ? 'Masalah diperbaiki' : progress >= 50 ? 'Kontraktor Ditugaskan' : 'Diverifikasi'}
          </span>
        </div>
      </div>
    </div>
  );
}
