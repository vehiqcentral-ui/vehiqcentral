import { forwardRef, HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface CardProps extends HTMLAttributes<HTMLDivElement> {}

const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'rounded-card bg-white border border-brand-border shadow-sm p-6',
      className,
    )}
    {...props}
  />
));

Card.displayName = 'Card';

export default Card;
