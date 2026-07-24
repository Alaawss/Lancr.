import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarStackProps extends React.HTMLAttributes<HTMLDivElement> {
  count: number;
  maxDisplay?: number;
  size?: 'sm' | 'md' | 'lg';
}

export function AvatarStack({ count, maxDisplay = 4, size = 'md', className, ...props }: AvatarStackProps) {
  const displayCount = Math.min(count, maxDisplay);
  const remainingCount = Math.max(0, count - displayCount);
  
  const sizes = {
    sm: 'h-6 w-6 text-[10px]',
    md: 'h-8 w-8 text-xs',
    lg: 'h-10 w-10 text-sm'
  };

  const ringSizes = {
    sm: 'ring-2',
    md: 'ring-2',
    lg: 'ring-2'
  };

  // Pre-defined pastel colors for decorative avatars
  const colors = [
    'bg-blue-100 text-blue-700',
    'bg-emerald-100 text-emerald-700',
    'bg-purple-100 text-purple-700',
    'bg-amber-100 text-amber-700',
    'bg-pink-100 text-pink-700',
  ];

  return (
    <div className={cn("flex items-center -space-x-2.5", className)} {...props}>
      {Array.from({ length: displayCount }).map((_, i) => (
        <div
          key={i}
          className={cn(
            "relative inline-flex items-center justify-center rounded-full ring-white",
            sizes[size],
            ringSizes[size],
            colors[i % colors.length]
          )}
          style={{ zIndex: displayCount - i }}
        >
          <span className="font-medium">
            {String.fromCharCode(65 + (i * 3) % 26)}
          </span>
        </div>
      ))}
      
      {remainingCount > 0 && (
        <div
          className={cn(
            "relative inline-flex items-center justify-center rounded-full bg-slate-100 text-slate-600 ring-white z-0",
            sizes[size],
            ringSizes[size]
          )}
        >
          <span className="font-medium">+{remainingCount}</span>
        </div>
      )}
    </div>
  );
}
