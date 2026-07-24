'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const isPassword = type === 'password';
    const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-semibold text-[#0F172A] mb-1.5">
            {label}
          </label>
        )}
        <div className="relative">
          <input
            type={inputType}
            className={cn(
              'flex h-11 w-full rounded-md border border-[#CBD5E1] bg-white px-4 py-2.5 text-sm placeholder:text-[#94A3B8] focus:outline-none focus:ring-2 focus:ring-[#FF2A54]/30 focus:border-[#FF2A54] transition-colors disabled:cursor-not-allowed disabled:opacity-50',
              error && 'border-red-500 focus:ring-red-500/30 focus:border-red-500',
              isPassword && 'pr-10',
              className
            )}
            ref={ref}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#64748B] transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          )}
        </div>
        {error ? (
          <p className="mt-1.5 text-xs text-red-500">{error}</p>
        ) : helperText ? (
          <p className="mt-1.5 text-xs text-[#64748B]">{helperText}</p>
        ) : null}
      </div>
    );
  }
);
Input.displayName = 'Input';
