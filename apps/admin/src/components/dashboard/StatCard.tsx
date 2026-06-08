import { LucideIcon, HelpCircle } from 'lucide-react';
import { clsx } from 'clsx';

interface StatCardProps {
  label: string;
  value?: number;
  description: string;
  icon: LucideIcon;
  variant: 'success' | 'warning' | 'danger';
  badgeLabel: string;
  loading?: boolean;
}

export function StatCard({ 
  label, 
  value = 0, 
  description, 
  icon: Icon, 
  variant, 
  badgeLabel,
  loading = false
}: StatCardProps) {
  const variants = {
    success: {
      bg: 'bg-green-50',
      iconBg: 'bg-[#E8F5E9]',
      iconColor: 'text-green-600',
      badge: 'bg-[#E8F5E9] text-green-700',
    },
    warning: {
      bg: 'bg-orange-50',
      iconBg: 'bg-[#FFF3E0]',
      iconColor: 'text-orange-600',
      badge: 'bg-[#FFF3E0] text-orange-700',
    },
    danger: {
      bg: 'bg-red-50',
      iconBg: 'bg-[#FFEBEE]',
      iconColor: 'text-red-600',
      badge: 'bg-[#FFEBEE] text-red-700',
    },
  };

  if (loading) {
    return (
      <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col min-h-[180px] justify-between shadow-sm animate-pulse">
        <div className="flex items-start justify-between">
          <div className="w-12 h-12 bg-gray-100 rounded-xl" />
          <div className="w-20 h-6 bg-gray-100 rounded-md" />
        </div>
        <div className="mt-4 space-y-2">
          <div className="h-8 bg-gray-100 rounded w-16" />
          <div className="h-4 bg-gray-100 rounded w-32" />
        </div>
      </div>
    );
  }

  const style = variants[variant];

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 flex flex-col min-h-[180px] justify-between shadow-sm" title={description}>
      <div className="flex items-start justify-between">
        <div className={clsx('p-3 rounded-xl', style.iconBg)}>
          <Icon className={style.iconColor} size={24} />
        </div>
        <div className="flex items-center gap-1.5">
          <span className={clsx('px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider', style.badge)}>
            {badgeLabel}
          </span>
          <HelpCircle size={14} className="text-gray-300 hover:text-gray-500 cursor-help transition-colors" />
        </div>
      </div>

      <div className="mt-4">
        <h3 className="text-4xl font-bold text-gray-900">{value}</h3>
        <p className="text-gray-500 text-sm mt-1">{label}</p>
      </div>
    </div>
  );
}
