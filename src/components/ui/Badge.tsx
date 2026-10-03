import { type HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'teal' | 'gold';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-gray-100 text-brand-muted',
  success: 'bg-pastel-mint text-brand-teal',
  warning: 'bg-pastel-peach text-amber-700',
  danger: 'bg-red-50 text-red-700',
  info: 'bg-pastel-blue text-brand-indigo',
  teal: 'bg-pastel-mint text-brand-teal',
  gold: 'bg-amber-50 text-amber-700',
};

export function Badge({ variant = 'default', className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold',
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}
