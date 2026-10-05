import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const footerColumns = [
  {
    title: 'Oplossingen',
    links: [
      { label: 'Voertuigdata', href: '/solutions/vehicle-data' },
      { label: 'AI-taxatie', href: '/solutions/valuation' },
      { label: 'Fraudedetectie', href: '/solutions/fraud' },
      { label: 'Voertuigrapporten', href: '/solutions/reports' },
      { label: 'Marktanalyse', href: '/solutions/market' },
      { label: 'API & Integraties', href: '/solutions/api' },
      { label: 'AI-assistent', href: '/solutions/ai' },
    ],
  },
  {
    title: 'Voor wie',
    links: [
      { label: 'Dealers', href: '/for-dealers' },
      { label: 'Importeurs', href: '/for-importers' },
      { label: 'Lease & fleet', href: '/for-fleet' },
      { label: 'Garages & taxateurs', href: '/for-garages' },
      { label: 'Verzekeraars', href: '/for-insurers' },
      { label: 'Dealer holdings', href: '/for-dealers' },
      { label: 'Developers', href: '/for-startups' },
    ],
  },
  {
    title: 'Resources',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Nieuws', href: '/news' },
      { label: 'Downloads', href: '/downloads' },
      { label: 'Helpcentrum', href: '/help' },
      { label: 'FAQ', href: '/faq' },
      { label: 'API-documentatie', href: '/docs/api' },
    ],
  },
  {
    title: 'Bedrijf',
    links: [
      { label: 'Over ons', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Demo aanvragen', href: '/pricing-request' },
    ],
  },
];

const legalLinks = [
  { label: 'Privacy', href: '/privacy' },
  { label: 'Algemene voorwaarden', href: '/terms' },
  { label: 'Cookies', href: '/cookies' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1A1A2E] text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top: logo + columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="col-span-2 mb-6 lg:mb-0">
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="VehiqCentral home">
              <div className="w-9 h-9 rounded-lg bg-[#0057B8] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 22 22" fill="none" aria-hidden="true">
                  <path
                    d="M3 7L7.5 15H9L11 11L13 15H14.5L19 7H17L14.5 13L11 8L7.5 13L5 7H3Z"
                    fill="white"
                  />
                  <circle cx="18" cy="14" r="2" fill="#FFC107" />
                </svg>
              </div>
              <div className="leading-tight">
                <span className="font-extrabold text-[17px] text-white tracking-tight">
                  Vehiq<span className="text-blue-300">Central</span>
                </span>
                <div className="text-[9px] font-semibold text-white/40 tracking-[0.18em] uppercase -mt-0.5">
                  Automotive Platform
                </div>
              </div>
            </Link>

            <p className="mt-5 text-sm text-white/55 leading-relaxed max-w-xs">
              Het alles-in-één automotive dataplatform voor professionals in Nederland.
              Betrouwbare data, slimme taxaties en fraudedetectie in één overzicht.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-2">
              <a href="tel:+31850001234" className="flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors">
                <Phone size={13} />
                085 000 12 34
              </a>
              <a href="mailto:info@vehiqcentral.nl" className="flex items-center gap-2 text-sm text-white/55 hover:text-white transition-colors">
                <Mail size={13} />
                info@vehiqcentral.nl
              </a>
              <div className="flex items-center gap-2 text-sm text-white/55">
                <MapPin size={13} />
                Nederland
              </div>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
              {[
                { name: 'LinkedIn', letter: 'in' },
                { name: 'X', letter: 'X' },
                { name: 'YouTube', letter: '▶' },
              ].map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white/60 hover:bg-[#0057B8] hover:text-white transition-colors text-xs font-bold"
                >
                  {social.letter}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-bold text-white mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/55 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider + legal */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/40">
              <span>&copy; {currentYear} VehiqCentral B.V. Alle rechten voorbehouden.</span>
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-white/70 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* BOVAG / RDW badges (placeholder) */}
            <div className="flex items-center gap-3 text-xs text-white/30 font-semibold tracking-wide">
              <span className="px-2.5 py-1 rounded border border-white/15">RDW Partner</span>
              <span className="px-2.5 py-1 rounded border border-white/15">NAP Aangesloten</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
