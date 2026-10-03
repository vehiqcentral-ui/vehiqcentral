import Link from 'next/link';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SolutionCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  href: string;
  accent?: 'mint' | 'blue' | 'peach' | 'purple';
  className?: string;
}

const accentStyles = {
  mint: 'bg-pastel-mint text-brand-teal group-hover:bg-brand-teal group-hover:text-white',
  blue: 'bg-pastel-blue text-brand-indigo group-hover:bg-brand-indigo group-hover:text-white',
  peach: 'bg-pastel-peach text-amber-600 group-hover:bg-amber-500 group-hover:text-white',
  purple: 'bg-pastel-purple text-brand-indigo group-hover:bg-brand-indigo group-hover:text-white',
};

export function SolutionCard({
  icon: Icon,
  title,
  description,
  href,
  accent = 'mint',
  className,
}: SolutionCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group block bg-white border border-brand-border rounded-card p-6 hover:shadow-lg hover:border-brand-teal/30 transition-all duration-300',
        className,
      )}
    >
      <div
        className={cn(
          'w-12 h-12 rounded-button flex items-center justify-center transition-colors duration-300',
          accentStyles[accent],
        )}
      >
        <Icon size={24} />
      </div>

      <h3 className="mt-5 font-heading font-bold text-lg text-brand-navy">{title}</h3>

      <p className="mt-2 text-sm text-brand-muted leading-relaxed">{description}</p>

      <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-teal group-hover:gap-2.5 transition-all duration-200">
        Saber mas
        <ArrowRight size={14} />
      </span>
    </Link>
  );
}
