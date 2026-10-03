'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Car,
  FileText,
  TrendingUp,
  ShieldAlert,
  BarChart3,
  LineChart,
  Key,
  Bot,
  CreditCard,
  Settings,
} from 'lucide-react';
import { clsx } from 'clsx';

const sections = [
  {
    label: 'PRINCIPAL',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
      { label: 'Vehiculos', href: '/dashboard/vehicles', icon: Car },
      { label: 'Valoraciones', href: '/dashboard/valuations', icon: TrendingUp },
      { label: 'Fraude', href: '/dashboard/fraud', icon: ShieldAlert },
    ],
  },
  {
    label: 'INTELIGENCIA',
    items: [
      { label: 'Analiticas', href: '/dashboard/analytics', icon: BarChart3 },
      { label: 'Informes', href: '/dashboard/reports', icon: FileText },
      { label: 'Mercado', href: '/dashboard/market', icon: LineChart },
    ],
  },
  {
    label: 'PLATAFORMA',
    items: [
      { label: 'API Keys', href: '/dashboard/api-keys', icon: Key },
      { label: 'IA Asistente', href: '/dashboard/ai-assistant', icon: Bot },
      { label: 'Facturacion', href: '/dashboard/billing', icon: CreditCard },
      { label: 'Configuracion', href: '/dashboard/settings', icon: Settings },
    ],
  },
];

export function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const userName = session?.user?.name ?? 'Usuario';
  const userCompany = session?.user?.company ?? '';
  const planLabels: Record<string, string> = {
    FREE: 'Gratuito',
    STARTER: 'Starter',
    PROFESSIONAL: 'Profesional',
    ENTERPRISE: 'Enterprise',
  };
  const userPlan = planLabels[session?.user?.plan ?? 'FREE'] ?? 'Gratuito';
  const initials = userName
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <aside className="hidden lg:flex w-64 flex-col bg-brand-indigo text-white">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
        <div className="w-10 h-10 bg-brand-teal rounded-lg flex items-center justify-center">
          <svg width="24" height="24" viewBox="0 0 48 48" fill="none">
            <path
              d="M9 39L24 9l15 30H9z"
              stroke="white"
              strokeWidth="3"
              strokeLinejoin="round"
            />
            <circle cx="24" cy="27" r="4.5" fill="#FFD700" />
          </svg>
        </div>
        <span className="font-heading text-xl font-extrabold tracking-tight">
          VEHIQ
          <span className="block text-[10px] font-semibold text-white/50 tracking-widest -mt-1">CENTRAL</span>
        </span>
      </div>

      {/* Scrollable nav */}
      <nav className="flex-1 px-3 py-4 space-y-5 overflow-y-auto">
        {sections.map((section) => (
          <div key={section.label}>
            <p className="px-3 mb-2 text-[10px] uppercase text-white/40 tracking-wider font-semibold">
              {section.label}
            </p>
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const active =
                  item.href === '/dashboard'
                    ? pathname === '/dashboard'
                    : pathname === item.href || pathname.startsWith(item.href + '/');
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      'flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      active
                        ? 'bg-white/15 text-brand-gold'
                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                    )}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* User profile + plan */}
      <div className="px-4 py-4 border-t border-white/10 space-y-3">
        <div className="bg-brand-gold/20 text-brand-gold px-3 py-2 rounded-lg text-xs font-bold text-center">
          Plan {userPlan}
        </div>
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 bg-brand-teal rounded-full flex items-center justify-center text-white font-heading font-bold text-sm shrink-0">
            {initials}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{userName}</p>
            {userCompany && (
              <p className="text-xs text-white/50 truncate">{userCompany}</p>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
}
