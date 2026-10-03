import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

interface CTASectionProps {
  heading: string;
  subheading?: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  className?: string;
}

export function CTASection({
  heading,
  subheading,
  primaryLabel = 'Solicitar acceso',
  primaryHref = '/solicitar-acceso',
  secondaryLabel,
  secondaryHref,
  className,
}: CTASectionProps) {
  return (
    <section
      className={cn(
        'relative overflow-hidden bg-brand-indigo py-20 sm:py-24',
        className,
      )}
    >
      {/* Decorative elements */}
      <div
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-brand-teal/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white leading-tight">
          {heading}
        </h2>
        {subheading && (
          <p className="mt-5 text-lg text-white/70 leading-relaxed">{subheading}</p>
        )}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={primaryHref}>
            <Button size="lg" className="bg-brand-teal text-white hover:bg-brand-teal/90">
              {primaryLabel}
            </Button>
          </Link>
          {secondaryLabel && secondaryHref && (
            <Link href={secondaryHref}>
              <Button
                variant="secondary"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-brand-indigo"
              >
                {secondaryLabel}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
