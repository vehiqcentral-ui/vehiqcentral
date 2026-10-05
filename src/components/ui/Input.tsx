import { forwardRef, InputHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: ReactNode;
  label?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ className, icon, label, ...props }, ref) => (
  <div className="w-full">
    {label && (
      <label className="block text-xs font-semibold text-brand-muted mb-1.5">{label}</label>
    )}
    <div className="relative flex items-center">
      {icon && (
        <span className="absolute left-3 text-brand-muted pointer-events-none">{icon}</span>
      )}
      <input
        ref={ref}
        className={cn(
          'w-full rounded-button border border-brand-border bg-white px-4 py-2.5 text-sm text-brand-teal placeholder:text-brand-muted',
          'focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal',
          'transition-colors duration-150',
          icon && 'pl-10',
          className,
        )}
        {...props}
      />
    </div>
  </div>
));

Input.displayName = 'Input';

export default Input;
