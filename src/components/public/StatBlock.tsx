import { cn } from '@/lib/utils';

interface StatBlockProps {
  value: string;
  label: string;
  className?: string;
}

export function StatBlock({ value, label, className }: StatBlockProps) {
  return (
    <div className={cn('text-center', className)}>
      <p className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-indigo leading-none">
        {value}
      </p>
      <p className="mt-2 text-sm text-brand-muted">{label}</p>
    </div>
  );
}
