import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'link';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading = false, children, disabled, ...props }, ref) => {
    const variants = {
      primary: 'bg-[#FF2A54] hover:bg-[#E62348] text-white border border-transparent',
      secondary: 'bg-[#E2E8F0] hover:bg-[#CBD5E1] text-[#0F172A] border border-transparent',
      outline: 'bg-white hover:bg-[#F8FAFC] text-[#0F172A] border border-[#CBD5E1]',
      ghost: 'bg-transparent hover:bg-[#F1F5F9] text-[#0F172A] border border-transparent',
      danger: 'bg-red-50 hover:bg-red-100 text-red-600 border border-transparent',
      link: 'bg-transparent text-[#FF2A54] hover:text-[#E62348] underline-offset-4 hover:underline border border-transparent shadow-none',
    };

    const sizes = {
      sm: 'h-9 px-4 text-xs font-bold',
      md: 'h-11 px-6 text-sm font-bold',
      lg: 'h-13 px-8 text-base font-bold',
      icon: 'h-10 w-10 p-0 text-sm',
    };

    return (
      <button
        ref={ref}
        disabled={isLoading || disabled}
        className={cn(
          'inline-flex items-center justify-center rounded-md transition-all focus:outline-none focus:ring-2 focus:ring-[#FF2A54]/30 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
