import React from 'react';
import { cn } from '@/lib/utils';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  icon?: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  description?: string;
}

export function StatCard({ title, value, icon: Icon, trend, description, className, ...props }: StatCardProps) {
  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-xl bg-white p-6 border border-slate-200 shadow-sm",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-slate-500 truncate">{title}</p>
        {Icon && <Icon className="h-5 w-5 text-slate-400" />}
      </div>
      
      <div className="mt-4 flex items-baseline gap-2">
        <p className="text-3xl font-semibold text-slate-900 tracking-tight">{value}</p>
        
        {trend && (
          <span className={cn(
            "flex items-center text-sm font-medium",
            trend.isPositive ? "text-emerald-600" : "text-red-600"
          )}>
            {trend.isPositive ? (
              <TrendingUp className="mr-1 h-3.5 w-3.5" />
            ) : (
              <TrendingDown className="mr-1 h-3.5 w-3.5" />
            )}
            {Math.abs(trend.value)}%
          </span>
        )}
      </div>
      
      {description && (
        <p className="mt-1 text-xs text-slate-500">{description}</p>
      )}
      
      {/* Decorative background gradient */}
      <div 
        className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-purple-50 blur-2xl opacity-50 pointer-events-none" 
        aria-hidden="true" 
      />
    </div>
  );
}
