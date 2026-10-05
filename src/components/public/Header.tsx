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
  Phone,
} from 'lucide-react';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const solutionItems = [
  {
    icon: Car,
    title: 'Voertuigdata',
    description: 'VIN-decodering, technische gegevens en RDW-data direct opvragen.',
    href: '/solutions/vehicle-data',
  },
  {
    icon: BarChart3,
    title: 'Slimme taxatie',
    description: 'Marktwaarde met AI op basis van miljoenen datapunten.',
    href: '/solutions/valuation',
  },
  {
    icon: Shield,
    title: 'Fraudedetectie',
    description: 'Kilometerstand-fraude, verborgen schades en lasten detecteren.',
    href: '/solutions/fraud',
  },
  {
    icon: FileSearch,
    title: 'Voertuigrapporten',
    description: 'Volledig historisch rapport: APK, km-stand en eigenaren.',
    href: '/solutions/reports',
  },
  {
    icon: Brain,
    title: 'Marktanalyse',
    description: 'Prijstrends, vraag en concurrentie in realtime.',
    href: '/solutions/market',
  },
  {
    icon: Globe,
    title: 'API & Data',
    description: 'REST API om voertuigdata in uw systemen te integreren.',
    href: '/solutions/api',
  },
];

const audienceItems = [
  {
    icon: CarFront,
    title: 'Dealers',
    description: 'Data, taxaties en verificaties voor in- en verkoop.',
    href: '/for-dealers',
  },
  {
    icon: Truck,
    title: 'Importeurs & exporteurs',
    description: 'Voertuighistorie en verificatie bij grensoverschrijdende handel.',
    href: '/for-importers',
  },
  {
    icon: Warehouse,
    title: 'Lease & fleet',
    description: 'Restwaarde, historie en vlootanalyse per voertuig.',
    href: '/for-fleet',
  },
  {
    icon: Wrench,
    title: 'Garages & taxateurs',
    description: 'Technische verificaties en voertuighistorie opvragen.',
    href: '/for-garages',
  },
  {
    icon: ShieldCheck,
    title: 'Verzekeraars',
    description: 'Fraudedetectie en taxatie voor schadeclaims.',
    href: '/for-insurers',
  },
  {
    icon: Building2,
    title: 'Startups & developers',
    description: 'Voertuigdata-API voor uw applicaties en platforms.',
    href: '/for-startups',
  },
];

const mainNavLinks = [
  { label: 'Platform', href: '/solutions/platform' },
  { label: 'Tarieven', href: '/pricing-request' },
  { label: 'Over ons', href: '/about' },
];

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 group" aria-label="VehiqCentral home">
      <div className="w-9 h-9 rounded-lg bg-[#0057B8] flex items-center justify-center shadow-sm">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <path
            d="M3 7L7.5 15H9L11 11L13 15H14.5L19 7H17L14.5 13L11 8L7.5 13L5 7H3Z"
            fill="white"
          />
          <circle cx="18" cy="14" r="2" fill="#FFC107" />
        </svg>
      </div>
      <div className="leading-tight">
        <span className="font-extrabold text-[17px] text-[#0057B8] tracking-tight">
          Vehiq
        </span>
        <span className="font-extrabold text-[17px] text-[#1A1A2E] tracking-tight">
          Central
        </span>
        <div className="text-[9px] font-semibold text-gray-400 tracking-[0.18em] uppercase -mt-0.5">
          Automotive Platform
        </div>
      </div>
    </Link>
  );
}

interface DropdownProps {
  label: string;
  items: typeof solutionItems;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}

function DesktopDropdown({ label, items, open, onToggle, onClose }: DropdownProps) {
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
          'flex items-center gap-1 px-3 py-2 text-sm font-semibold rounded transition-colors',
          open
            ? 'text-[#0057B8] bg-blue-50'
            : 'text-[#1A1A2E] hover:text-[#0057B8] hover:bg-blue-50',
        )}
        aria-expanded={open}
      >
        {label}
        <ChevronDown
          size={15}
          className={cn('transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {open && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 w-[600px] p-6">
          <div className="grid grid-cols-2 gap-2">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-blue-50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-lg bg-blue-100 text-[#0057B8] group-hover:bg-[#0057B8] group-hover:text-white transition-colors">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1A1A2E]">{item.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-snug">{item.description}</p>
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
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      {/* Top bar */}
      <div className="bg-[#0057B8] text-white text-xs py-1.5 hidden md:block">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <span>Het alles-in-één platform voor automotive professionals in Nederland</span>
          <div className="flex items-center gap-4">
            <a href="tel:+31850001234" className="flex items-center gap-1 hover:text-blue-200 transition-colors">
              <Phone size={11} />
              085 000 12 34
            </a>
            <Link href="/login" className="hover:text-blue-200 transition-colors">Inloggen</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-[68px]">
          {/* Logo */}
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Hoofdnavigatie">
            <DesktopDropdown
              label="Oplossingen"
              items={solutionItems}
              open={openDropdown === 'solutions'}
              onToggle={() => toggleDropdown('solutions')}
              onClose={() => setOpenDropdown(null)}
            />
            <DesktopDropdown
              label="Voor wie"
              items={audienceItems}
              open={openDropdown === 'audience'}
              onToggle={() => toggleDropdown('audience')}
              onClose={() => setOpenDropdown(null)}
            />
            {mainNavLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3 py-2 text-sm font-semibold text-[#1A1A2E] hover:text-[#0057B8] hover:bg-blue-50 rounded transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/contact"
              className="text-sm font-semibold text-[#1A1A2E] hover:text-[#0057B8] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/pricing-request"
              className="inline-flex items-center gap-2 bg-[#0057B8] hover:bg-[#0047A0] text-white text-sm font-bold px-5 py-2.5 rounded-lg transition-colors shadow-sm"
            >
              Demo aanvragen
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 text-[#1A1A2E]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Menu sluiten' : 'Menu openen'}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="px-4 py-4 space-y-1" aria-label="Mobiel menu">
            {/* Oplossingen accordion */}
            <div>
              <button
                onClick={() => toggleMobileSection('solutions')}
                className="flex items-center justify-between w-full py-3 text-sm font-semibold text-[#1A1A2E]"
              >
                Oplossingen
                <ChevronDown
                  size={16}
                  className={cn('transition-transform', mobileExpandedSection === 'solutions' && 'rotate-180')}
                />
              </button>
              {mobileExpandedSection === 'solutions' && (
                <div className="pl-4 pb-2 space-y-1">
                  {solutionItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm text-gray-600 hover:text-[#0057B8]"
                    >
                      {item.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Voor wie accordion */}
            <div>
              <button
                onClick={() => toggleMobileSection('audience')}
                className="flex items-center justify-between w-full py-3 text-sm font-semibold text-[#1A1A2E]"
              >
                Voor wie
                <ChevronDown
                  size={16}
                  className={cn('transition-transform', mobileExpandedSection === 'audience' && 'rotate-180')}
                />
              </button>
              {mobileExpandedSection === 'audience' && (
                <div className="pl-4 pb-2 space-y-1">
                  {audienceItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block py-2 text-sm text-gray-600 hover:text-[#0057B8]"
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
                className="block py-3 text-sm font-semibold text-[#1A1A2E] hover:text-[#0057B8]"
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block text-center py-2.5 text-sm font-semibold text-[#1A1A2E] hover:text-[#0057B8]"
              >
                Inloggen
              </Link>
              <Link
                href="/pricing-request"
                onClick={() => setMobileOpen(false)}
                className="block text-center bg-[#0057B8] text-white text-sm font-bold px-5 py-3 rounded-lg"
              >
                Demo aanvragen
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
