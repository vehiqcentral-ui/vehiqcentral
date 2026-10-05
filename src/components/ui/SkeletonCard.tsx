import { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface SkeletonCardProps extends HTMLAttributes<HTMLDivElement> {
  lines?: number;
}

function SkeletonLine({ className }: { className?: string }) {
  return (
    <div
      className={cn('h-4 rounded bg-brand-border animate-pulse', className)}
    />
  );
}

export default function SkeletonCard({ className, lines = 3, ...props }: SkeletonCardProps) {
  return (
    <div
      className={cn(
        'rounded-card bg-white border border-brand-border shadow-sm p-6 space-y-3',
        className,
      )}
      {...props}
    >
      <SkeletonLine className="w-1/3" />
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLine key={i} className={i === lines - 1 ? 'w-2/3' : 'w-full'} />
      ))}
    </div>
  );
}
