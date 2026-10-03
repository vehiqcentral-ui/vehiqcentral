import { cn } from '@/lib/utils';

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  company: string;
  className?: string;
}

export function TestimonialCard({
  quote,
  name,
  role,
  company,
  className,
}: TestimonialCardProps) {
  return (
    <blockquote
      className={cn(
        'bg-white border border-brand-border rounded-card p-7 flex flex-col',
        className,
      )}
    >
      {/* Quote mark */}
      <svg
        width="32"
        height="24"
        viewBox="0 0 32 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-brand-teal/20 mb-4 flex-shrink-0"
        aria-hidden="true"
      >
        <path
          d="M0 24V14.4C0 11.7333 0.466667 9.33333 1.4 7.2C2.33333 5.06667 3.66667 3.2 5.4 1.6L9.8 4.4C8.33333 5.86667 7.26667 7.46667 6.6 9.2C5.93333 10.9333 5.6 12.7333 5.6 14.6H12V24H0ZM20 24V14.4C20 11.7333 20.4667 9.33333 21.4 7.2C22.3333 5.06667 23.6667 3.2 25.4 1.6L29.8 4.4C28.3333 5.86667 27.2667 7.46667 26.6 9.2C25.9333 10.9333 25.6 12.7333 25.6 14.6H32V24H20Z"
          fill="currentColor"
        />
      </svg>

      <p className="text-brand-body leading-relaxed flex-1">{quote}</p>

      <footer className="mt-6 pt-5 border-t border-brand-border">
        <cite className="not-italic">
          <p className="font-heading font-bold text-sm text-brand-navy">{name}</p>
          <p className="text-xs text-brand-muted mt-0.5">
            {role}, {company}
          </p>
        </cite>
      </footer>
    </blockquote>
  );
}
