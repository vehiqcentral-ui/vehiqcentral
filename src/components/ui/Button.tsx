import { forwardRef, type ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-brand-teal text-white font-heading font-bold hover:bg-brand-teal/90 focus:ring-brand-teal/40',
  secondary:
    'border-2 border-brand-indigo text-brand-indigo font-heading font-bold hover:bg-brand-indigo hover:text-white focus:ring-brand-indigo/30',
  ghost:
    'text-brand-indigo font-heading font-semibold hover:bg-brand-indigo/5 focus:ring-brand-indigo/20',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-2.5 text-base',
  lg: 'px-8 py-3.5 text-lg',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', disabled, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          'inline-flex items-center justify-center gap-2 rounded-button transition-all duration-200',
          'focus:outline-none focus:ring-2 focus:ring-offset-2',
          'disabled:opacity-50 disabled:pointer-events-none',
          variantStyles[variant],
          sizeStyles[size],
          className,
        )}
        {...props}
      />
    );
  },
);

Button.displayName = 'Button';

export { Button, type ButtonProps };
