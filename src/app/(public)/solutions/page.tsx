import Link from 'next/link';
import { Metadata } from 'next';
import {
  Car, FileText, TrendingUp, ShieldAlert, LineChart, Code, Bot, LayoutDashboard,
} from 'lucide-react';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'Soluciones | VEHIQ',
  description: 'Plataforma de inteligencia de datos vehiculares: historial, valoracion, fraude, analitica de mercado y API para profesionales.',
};

const solutions = [
  { title: 'MiVEHIQ', desc: 'Panel central de inteligencia vehicular con KPIs, alertas y acceso rapido a todas las herramientas', icon: LayoutDashboard, href: '/solutions/platform', color: 'bg-pastel-purple' },
  { title: 'Datos de Vehiculos', desc: 'Decodificacion VIN, fichas tecnicas DGT y especificaciones completas de cualquier vehiculo', icon: Car, href: '/solutions/vehicle-data', color: 'bg-pastel-blue' },
  { title: 'Informes Vehiculares', desc: 'Historial completo, inspecciones ITV, kilometraje verificado y titulares anteriores', icon: FileText, href: '/solutions/reports', color: 'bg-pastel-peach' },
  { title: 'Valoracion Inteligente', desc: 'Precio de mercado con IA basado en millones de anuncios y transacciones reales', icon: TrendingUp, href: '/solutions/valuation', color: 'bg-pastel-mint' },
  { title: 'Deteccion de Fraude', desc: 'Alertas de kilometraje manipulado, siniestros ocultos, cargas y vehiculos robados', icon: ShieldAlert, href: '/solutions/fraud', color: 'bg-pastel-peach' },
  { title: 'Analitica de Mercado', desc: 'Tendencias de precios, oferta y demanda, y competencia en el mercado espanol en tiempo real', icon: LineChart, href: '/solutions/market', color: 'bg-pastel-blue' },
  { title: 'API & Datos', desc: 'REST API con documentacion completa para integrar datos vehiculares en tus propios sistemas', icon: Code, href: '/solutions/api', color: 'bg-pastel-purple' },
  { title: 'Asistente IA', desc: 'Consultas en lenguaje natural sobre vehiculos, valoraciones y mercado con respuestas instantaneas', icon: Bot, href: '/solutions/ai', color: 'bg-pastel-mint' },
];

export default function SolutionsPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-heading font-bold uppercase tracking-widest text-brand-teal">Soluciones</p>
          <h1 className="mt-3 font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-brand-navy leading-tight">
            Inteligencia de datos vehiculares para profesionales
          </h1>
          <p className="mt-5 mx-auto max-w-2xl text-lg text-brand-muted leading-relaxed">
            VEHIQ te da acceso a datos fiables, valoraciones precisas y herramientas de analisis
            para tomar mejores decisiones en cada operacion vehicular.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {solutions.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group relative rounded-card border border-brand-border bg-white p-6 transition-all hover:shadow-lg hover:border-brand-teal/30"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${s.color}`}>
                  <s.icon className="w-6 h-6 text-brand-indigo" />
                </div>
                <h3 className="mt-4 font-heading font-extrabold text-xl text-brand-navy group-hover:text-brand-teal transition-colors">
                  {s.title}
                </h3>
                <p className="mt-2 text-brand-muted text-sm leading-relaxed">{s.desc}</p>
                <span className="mt-4 inline-flex items-center text-sm font-heading font-bold text-brand-teal opacity-0 group-hover:opacity-100 transition-opacity">
                  Descubrir mas &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Descubre el potencial de VEHIQ"
        subheading="Solicita una demostracion personalizada y descubre como VEHIQ transforma tu acceso a datos vehiculares."
        primaryLabel="Solicitar demo"
        primaryHref="/pricing-request"
        secondaryLabel="Contactar ventas"
        secondaryHref="/contact"
      />
    </>
  );
}
