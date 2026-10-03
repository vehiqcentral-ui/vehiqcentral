import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AudienceCardProps {
  title: string;
  description: string;
  benefits: string[];
  href: string;
  className?: string;
}

export function AudienceCard({
  title,
  description,
  benefits,
  href,
  className,
}: AudienceCardProps) {
  return (
    <div
      className={cn(
        'group bg-white border border-brand-border rounded-card p-7 flex flex-col hover:shadow-lg hover:border-brand-teal/30 transition-all duration-300',
        className,
      )}
    >
      <h3 className="font-heading font-bold text-xl text-brand-navy">{title}</h3>

      <p className="mt-3 text-sm text-brand-muted leading-relaxed">{description}</p>

      <ul className="mt-5 space-y-2.5 flex-1">
        {benefits.map((benefit) => (
          <li key={benefit} className="flex items-start gap-2.5 text-sm text-brand-body">
            <Check
              size={16}
              className="flex-shrink-0 mt-0.5 text-brand-teal"
              aria-hidden="true"
            />
            <span>{benefit}</span>
          </li>
        ))}
      </ul>

      <Link
        href={href}
        className="inline-flex items-center gap-1.5 mt-6 text-sm font-semibold text-brand-teal hover:gap-2.5 transition-all duration-200"
      >
        Descubrir mas
        <ArrowRight size={14} />
      </Link>
    </div>
  );
}
