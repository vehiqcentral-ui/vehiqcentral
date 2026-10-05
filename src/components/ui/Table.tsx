import { HTMLAttributes, ThHTMLAttributes, TdHTMLAttributes, ReactNode } from 'react';
import { cn } from '@/lib/utils';

export function Table({ className, ...props }: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn('w-full text-sm border-collapse', className)}
        {...props}
      />
    </div>
  );
}

export function TableHeader({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className={cn('border-b border-brand-border', className)} {...props} />;
}

export function TableBody({ className, ...props }: HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className={cn('divide-y divide-brand-border', className)} {...props} />;
}

export function TableRow({ className, ...props }: HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn('hover:bg-brand-alt-bg/50 transition-colors duration-100', className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        'px-4 py-3 text-left text-xs font-semibold text-brand-muted uppercase tracking-wide whitespace-nowrap',
        className,
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={cn('px-4 py-3 text-sm text-brand-teal align-middle', className)}
      {...props}
    />
  );
}

export function TableEmpty({ children, colSpan = 10 }: { children: ReactNode; colSpan?: number }) {
  return (
    <tr>
      <td colSpan={colSpan} className="py-16 text-center text-sm text-brand-muted">
        {children}
      </td>
    </tr>
  );
}
