import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-alt-bg flex flex-col items-center justify-center px-4 py-12">
      <Link href="/" className="mb-8">
        <span className="text-3xl font-heading font-extrabold tracking-tight text-brand-indigo leading-tight text-center">
          VEHIQ
          <span className="block text-[11px] font-semibold text-brand-muted tracking-[0.25em] -mt-1">CENTRAL</span>
        </span>
      </Link>
      {children}
    </div>
  );
}
