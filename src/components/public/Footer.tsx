import Link from 'next/link';
import { Globe } from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Data                                                              */
/* ------------------------------------------------------------------ */

const footerColumns = [
  {
    title: 'Soluciones',
    links: [
      { label: 'Plataforma', href: '/solutions/platform' },
      { label: 'Datos de vehiculos', href: '/solutions/vehicle-data' },
      { label: 'Informes vehiculares', href: '/solutions/reports' },
      { label: 'Valoracion inteligente', href: '/solutions/valuation' },
      { label: 'Deteccion de fraude', href: '/solutions/fraud' },
      { label: 'Analitica de mercado', href: '/solutions/market' },
      { label: 'API & Datos', href: '/solutions/api' },
      { label: 'Asistente IA', href: '/solutions/ai' },
    ],
  },
  {
    title: 'Para empresas',
    links: [
      { label: 'Concesionarios', href: '/for-dealers' },
      { label: 'Importadores', href: '/for-importers' },
      { label: 'Exportadores', href: '/for-exporters' },
      { label: 'Alquiler y flotas', href: '/for-fleet' },
      { label: 'Talleres', href: '/for-garages' },
      { label: 'Aseguradoras', href: '/for-insurers' },
      { label: 'Startups y developers', href: '/for-startups' },
    ],
  },
  {
    title: 'Recursos',
    links: [
      { label: 'Blog', href: '/blog' },
      { label: 'Noticias', href: '/noticias' },
      { label: 'Guias', href: '/guias' },
      { label: 'Descargas', href: '/descargas' },
      { label: 'Centro de ayuda', href: '/ayuda' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Documentacion API', href: '/docs/api' },
    ],
  },
  {
    title: 'Empresa',
    links: [
      { label: 'Sobre nosotros', href: '/sobre-nosotros' },
      { label: 'Contacto', href: '/contacto' },
      { label: 'Trabaja con nosotros', href: '/empleo' },
    ],
  },
];

const legalLinks = [
  { label: 'Privacidad', href: '/privacidad' },
  { label: 'Terminos', href: '/terminos' },
  { label: 'Cookies', href: '/cookies' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-navy text-white" role="contentinfo">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* Top: logo + columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 mb-6 lg:mb-0">
            <Link href="/" className="inline-flex items-center gap-2" aria-label="VEHIQ inicio">
              <svg
                width="32"
                height="32"
                viewBox="0 0 36 36"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect width="36" height="36" rx="8" fill="#0FAFA9" />
                <path
                  d="M8 12L13.5 24H15.5L18 18.5L20.5 24H22.5L28 12H25L21.5 21L18 13H18L14.5 21L11 12H8Z"
                  fill="white"
                />
              </svg>
              <span className="font-heading font-extrabold text-lg tracking-tight leading-tight">
                VEHIQ
                <span className="block text-[8px] font-semibold text-white/50 tracking-[0.2em] -mt-0.5">CENTRAL</span>
              </span>
            </Link>
            <p className="mt-4 text-sm text-white/60 leading-relaxed max-w-xs">
              Tu centro de datos automotriz en España. Datos fiables, valoraciones precisas y
              herramientas profesionales para tu negocio.
            </p>

            {/* Social placeholders */}
            <div className="flex items-center gap-3 mt-6">
              {['LinkedIn', 'X', 'YouTube'].map((name) => (
                <a
                  key={name}
                  href="#"
                  aria-label={name}
                  className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-brand-teal hover:text-white transition-colors text-xs font-semibold"
                >
                  {name[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="text-sm font-heading font-bold text-white mb-4">{col.title}</h3>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/60 hover:text-brand-teal transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mt-12 pt-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Legal links */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-white/50">
              <span>&copy; {currentYear} VEHIQ Central. Todos los derechos reservados.</span>
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hover:text-white/80 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Language selector */}
            <div className="flex items-center gap-2 text-sm text-white/50">
              <Globe size={14} />
              <select
                className="bg-transparent text-white/50 text-sm border-none focus:outline-none cursor-pointer"
                defaultValue="es"
                aria-label="Idioma"
              >
                <option value="es" className="text-brand-navy">
                  ES
                </option>
                <option value="en" className="text-brand-navy">
                  EN
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
