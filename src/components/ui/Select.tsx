import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  onChange?: (value: string) => void;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>((
  { className, options, onChange, ...props },
  ref,
) => (
  <select
    ref={ref}
    className={cn(
      'w-full rounded-button border border-brand-border bg-white px-4 py-2.5 text-sm text-brand-teal',
      'focus:outline-none focus:ring-2 focus:ring-brand-teal/30 focus:border-brand-teal',
      'transition-colors duration-150 appearance-none cursor-pointer',
      className,
    )}
    onChange={(e) => onChange?.(e.target.value)}
    {...props}
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
));

Select.displayName = 'Select';

export default Select;
