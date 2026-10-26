import React from 'react';

interface MetricCardProps {
  label: string;
  value: string | number;
  subValue?: string;
  icon?: React.ReactNode;
  trend?: {
    positive: boolean;
    text: string;
  };
  highlightColor?: 'default' | 'amber' | 'emerald' | 'blue';
}

export const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  subValue,
  icon,
  trend,
  highlightColor = 'default',
}) => {
  const bgStyles = {
    default: 'bg-white border-stone-200',
    amber: 'bg-amber-50/60 border-amber-200/80',
    emerald: 'bg-emerald-50/60 border-emerald-200/80',
    blue: 'bg-sky-50/60 border-sky-200/80',
  }[highlightColor];

  return (
    <div className={`p-4 md:p-5 rounded-xl border ${bgStyles} flex flex-col justify-between transition-all`}>
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className="text-xs font-medium text-stone-500 uppercase tracking-wider line-clamp-1">
          {label}
        </span>
        {icon && <div className="text-stone-400 shrink-0">{icon}</div>}
      </div>

      <div className="mt-1">
        <div className="text-xl md:text-2xl font-bold tracking-tight text-neutral-900 tabular-nums">
          {value}
        </div>
        {subValue && (
          <p className="text-xs text-stone-500 mt-1 line-clamp-1">
            {subValue}
          </p>
        )}
      </div>

      {trend && (
        <div className="mt-3 pt-2 border-t border-stone-100 flex items-center gap-1.5 text-[11px]">
          <span className={trend.positive ? 'text-emerald-700 font-medium' : 'text-amber-700 font-medium'}>
            {trend.text}
          </span>
        </div>
      )}
    </div>
  );
};
