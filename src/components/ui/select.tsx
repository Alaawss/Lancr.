'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { ChevronDown } from 'lucide-react';

export function Select({ children, value, onValueChange, defaultValue, name, disabled }: any) {
  return (
    <div className="relative w-full">
      <select
        name={name}
        value={value}
        defaultValue={defaultValue}
        disabled={disabled}
        onChange={(e) => onValueChange && onValueChange(e.target.value)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm appearance-none",
          "focus:outline-none focus:ring-2 focus:ring-purple-500/30 focus:border-purple-500 transition-colors cursor-pointer",
          disabled && "cursor-not-allowed opacity-50"
        )}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
        <ChevronDown className="h-4 w-4" />
      </div>
    </div>
  );
}

export function SelectTrigger({ children, className }: any) {
  return <>{children}</>;
}

export function SelectValue({ placeholder }: any) {
  return <option value="" disabled hidden>{placeholder || 'Select...'}</option>;
}

export function SelectContent({ children }: any) {
  return <>{children}</>;
}

export function SelectItem({ value, children }: any) {
  return <option value={value}>{children}</option>;
}
