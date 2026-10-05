import { cn } from '@/lib/utils';

type ProgressColor = 'teal' | 'indigo' | 'gold' | 'red';
type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  value: number; // 0-100
  size?: ProgressSize;
  color?: ProgressColor;
  className?: string;
  showLabel?: boolean;
}

const colorMap: Record<ProgressColor, string> = {
  teal: 'bg-brand-teal',
  indigo: 'bg-brand-indigo',
  gold: 'bg-yellow-400',
  red: 'bg-red-500',
};

const sizeMap: Record<ProgressSize, string> = {
  sm: 'h-1',
  md: 'h-2',
  lg: 'h-3',
};

export default function ProgressBar({
  value,
  size = 'md',
  color = 'teal',
  className,
  showLabel = false,
}: ProgressBarProps) {
  const clamped = Math.max(0, Math.min(100, value));

  return (
    <div className={cn('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between text-xs text-brand-muted mb-1">
          <span>{clamped}%</span>
        </div>
      )}
      <div className={cn('w-full rounded-full bg-brand-alt-bg overflow-hidden', sizeMap[size])}>
        <div
          className={cn('h-full rounded-full transition-all duration-500', colorMap[color])}
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
}
