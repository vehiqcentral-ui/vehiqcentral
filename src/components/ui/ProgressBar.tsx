import { cn } from '@/lib/utils';

type ProgressColor = 'teal' | 'indigo' | 'gold' | 'red';
type ProgressSize = 'sm' | 'md' | 'lg';

interface ProgressBarProps {
  value: number; // 0-100
  max?: number;  // if provided, value is treated as raw and divided by max
  size?: ProgressSize;
  color?: ProgressColor;
  className?: string;
  showLabel?: boolean;
  showValue?: boolean; // alias for showLabel
  label?: string;      // descriptive label rendered above the bar
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
  max,
  size = 'md',
  color = 'teal',
  className,
  showLabel = false,
  showValue = false,
  label,
}: ProgressBarProps) {
  const percentage = max != null ? Math.round((value / max) * 100) : value;
  const clamped = Math.max(0, Math.min(100, percentage));
  const displayShowLabel = showLabel || showValue;

  return (
    <div className={cn('w-full', className)}>
      {(label || displayShowLabel) && (
        <div className="flex justify-between text-xs text-brand-muted mb-1">
          <span>{label ?? ''}</span>
          {displayShowLabel && (
            <span>
              {max != null ? `${value} / ${max}` : `${clamped}%`}
            </span>
          )}
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
