'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Menu,
  X,
  ChevronDown,
  Car,
  BarChart3,
  Shield,
  FileSearch,
  Brain,
  Globe,
  Building2,
  Truck,
  Warehouse,
  Wrench,
  ShieldCheck,
  CarFront,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const solutionItems = [
  {
    icon: Car,
    title: 'Datos de vehiculos',
    description: 'Decodificacion VIN, fichas tecnicas y datos DGT al instante.',
    href: '/solutions/vehicle-data',
  },
  {
    icon: BarChart3,
    title: 'Valoracion inteligente',
    description: 'Precio de mercado con IA basado en millones de datos.',
    href: '/solutions/valuation',
  },
  {
    icon: Shield,
    title: 'Deteccion de fraude',
    description: 'Alertas de kilometraje, siniestros ocultos y cargas.',
    href: '/solutions/fraud',
  },
  {
    icon: FileSearch,
    title: 'Informes vehiculares',
    description: 'Historial completo, ITV, kilometraje y titulares.',
    href: '/solutions/reports',
  },
  {
    icon: Brain,
    title: 'Analitica de mercado',
    description: 'Tendencias de precios, demanda y competencia en tiempo real.',
    href: '/solutions/market',
  },
  {
    icon: Globe,
    title: 'API & Datos',
    description: 'REST API para integrar datos vehiculares en tus sistemas.',
    href: '/solutions/api',
  },
];

const audienceItems = [
  {
    icon: CarFront,
    title: 'Concesionarios',
    description: 'Datos, valoraciones y verificaciones para compra-venta.',
    href: '/for-dealers',
  },
  {
    icon: Truck,
    title: 'Importadores y exportadores',
    description: 'Historial y verificacion de vehiculos transfronterizos.',
    href: '/for-importers',
  },
  {
    icon: Warehouse,
    title: 'Alquiler y flotas',
    description: 'Valor residual, historial y analitica de flota.',
    href: '/for-fleet',
  },
  {
    icon: Wrench,
    title: 'Talleres y peritos',
    description: 'Verificaciones tecnicas e historiales de vehiculos.',
    href: '/for-garages',
  },
  {
    icon: ShieldCheck,
    title: 'Aseguradoras',
    description: 'Deteccion de fraude y valoracion para siniestros.',
    href: '/for-insurers',
  },
  {
    icon: Building2,
    title: 'Startups y developers',
    description: 'API de datos vehiculares para tus aplicaciones.',
    href: '/for-startups',
  },
];

const mainNavLinks = [
  { label: 'Plataforma', href: '/plataforma' },
  { label: 'Precios', href: '/solicitar-acceso' },
  { label: 'Recursos', href: '/recursos' },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 group" aria-label="VEHIQ inicio">
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect width="36" height="36" rx="8" fill="#2D2E80" />
        <path
          d="M8 12L13.5 24H15.5L18 18.5L20.5 24H22.5L28 12H25L21.5 21L18 13H18L14.5 21L11 12H8Z"
          fill="white"
        />
        <circle cx="27" cy="24" r="3" fill="#0FAFA9" />
      </svg>
      <span className="font-heading font-extrabold text-xl text-brand-indigo tracking-tight leading-tight">
        VEHIQ
        <span className="block text-[9px] font-semibold text-brand-muted tracking-[0.2em] -mt-0.5">CENTRAL</span>
      </span>
    </Link>
  );
}

interface DropdownProps {
  label: string;
  items: typeof solutionItems;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  megaMenu?: boolean;
}

function DesktopDropdown({ label, items, open, onToggle, onClose, megaMenu }: DropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onToggle}
        className={cn(
          'flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-button transition-colors',
          open
            ? 'text-brand-teal bg-pastel-mint'
            : 'text-brand-navy hover:text-brand-teal',
        )}
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          size={16}
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div
          className={cn(
            'absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-brand-border rounded-card shadow-xl z-50',
            megaMenu ? 'w-[640px] p-6' : 'w-[520px] p-5',
          )}
        >
          <div className={cn('grid gap-3', megaMenu ? 'grid-cols-2' : 'grid-cols-2')}>
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-start gap-3 p-3 rounded-button hover:bg-brand-alt-bg transition-colors group"
                >
                  <div className="flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-button bg-pastel-mint text-brand-teal group-hover:bg-brand-teal group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">{item.title}</p>
                    <p className="text-xs text-brand-muted mt-0.5">{item.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

  function toggleDropdown(key: string) {
    setOpenDropdown((prev) => (prev === key ? null : key));
  }

  function toggleMobileSection(key: string) {
    setMobileExpandedSection((prev) => (prev === key ? null : key));
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[72px]">
          {/* Logo */}
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Principal">
            <DesktopDropdown
              label="Soluciones"
              items={solutionItems}
              open={openDropdown === 'solutions'}
              onToggle={() => toggleDropdown('solutions')}
              onClose={() => setOpenDropdown(null)}
              megaMenu
            />
            <DesktopDropdown
              label="Para quien"
              items={audienceItems}
              open={openDropdown === 'audience'}
              onToggle={() => toggleDropdown('audience')}
              onClose={() => setOpenDropdown(null)}
            />
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-medium text-brand-navy hover:text-brand-teal rounded-button transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium text-brand-navy hover:text-brand-teal transition-colors"
            >
              Iniciar sesion
            </Link>
            <Link href="/solicitar-acceso">
              <Button size="sm">Solicitar acceso</Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-brand-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Cerrar menu' : 'Abrir menu'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-brand-border bg-white">
          <nav className="px-4 py-4 space-y-1" aria-label="Menu movil">
            {/* Soluciones accordion */}
            <div>
              <button
                onClick={() => toggleMobileSection('solutions')}
                className="flex items-center justify-between w-full py-3 text-sm font-semibold text-brand-navy"
              >
                Soluciones
                <ChevronDown
                  size={16}
                  className={cn(
                    'transition-transform',
                    mobileExpandedSection === 'solutions' && 'rotate-180',
                  )}
                />
              </button>
              {mobileExpandedSection === 'solutions' && (
                <div className="pl-4 pb-2 space-y-1">
                  {solutionItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm text-brand-muted hover:text-brand-teal"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Para quien accordion */}
            <div>
              <button
                onClick={() => toggleMobileSection('audience')}
                className="flex items-center justify-between w-full py-3 text-sm font-semibold text-brand-navy"
              >
                Para quien
                <ChevronDown
                  size={16}
                  className={cn(
                    'transition-transform',
                    mobileExpandedSection === 'audience' && 'rotate-180',
                  )}
                />
              </button>
              {mobileExpandedSection === 'audience' && (
                <div className="pl-4 pb-2 space-y-1">
                  {audienceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm text-brand-muted hover:text-brand-teal"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Static links */}
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="block py-3 text-sm font-semibold text-brand-navy hover:text-brand-teal"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 border-t border-brand-border space-y-3">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-center py-2.5 text-sm font-medium text-brand-navy hover:text-brand-teal"
              >
                Iniciar sesion
              </Link>
              <Link href="/solicitar-acceso" onClick={() => setMobileOpen(false)}>
                <Button className="w-full" size="md">
                  Solicitar acceso
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
