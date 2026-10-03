import { Metadata } from 'next';
import { Code, Rocket, Car, TrendingUp, ShieldAlert, FileText, Zap, BookOpen } from 'lucide-react';
import { SolutionCard } from '@/components/public/SolutionCard';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'Para Startups y Developers | VEHIQ',
  description: 'API de datos vehiculares para startups y developers: decodificacion VIN, valoraciones, deteccion de fraude e informes para tus aplicaciones.',
};

const useCases = [
  { icon: Car, title: 'Apps de compraventa', desc: 'Integra datos tecnicos, valoraciones y verificaciones de fraude en tu marketplace o app de vehiculos.' },
  { icon: ShieldAlert, title: 'Fintech y seguros', desc: 'Usa datos vehiculares verificados para scoring de riesgo, suscripcion de polizas o financiacion de vehiculos.' },
  { icon: TrendingUp, title: 'Analitica y BI', desc: 'Accede a datos de mercado a gran escala para construir dashboards, modelos predictivos o informes sectoriales.' },
  { icon: FileText, title: 'Plataformas de flotas', desc: 'Enriquece tu sistema de gestion de flotas con datos de valoracion, historial y verificacion de vehiculos.' },
];

const solutions = [
  { icon: Code, title: 'REST API', desc: 'API documentada con endpoints para VIN, valoracion, fraude, informes y datos de mercado.', href: '/solutions/api', accent: 'blue' as const },
  { icon: Car, title: 'Datos de Vehiculos', desc: 'Decodificacion VIN, fichas tecnicas DGT y especificaciones completas de cualquier vehiculo.', href: '/solutions/vehicle-data', accent: 'mint' as const },
  { icon: TrendingUp, title: 'Valoracion con IA', desc: 'Precio de mercado con IA basado en millones de anuncios y transacciones reales.', href: '/solutions/valuation', accent: 'peach' as const },
  { icon: ShieldAlert, title: 'Deteccion de Fraude', desc: 'Verificacion de kilometraje, siniestros, cargas y vehiculos robados via API.', href: '/solutions/fraud', accent: 'purple' as const },
];

const steps = [
  { step: '01', title: 'Solicita tu API key', desc: 'Crea tu cuenta, elige tu plan y obtiene tu clave de API en minutos.' },
  { step: '02', title: 'Integra en tu aplicacion', desc: 'Documentacion completa con ejemplos en Python, Node.js, PHP y mas. SDKs disponibles.' },
  { step: '03', title: 'Escala con datos fiables', desc: 'Desde 100 consultas al mes hasta millones. Infraestructura disenada para escalar contigo.' },
];

export default function ForStartupsPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-blue">
              <Code className="w-7 h-7 text-brand-indigo" />
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Para Startups y Developers
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Integra datos vehiculares del mercado espanol en tus aplicaciones. API REST con decodificacion VIN, valoraciones con IA, deteccion de fraude y analitica de mercado.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Casos de uso</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {useCases.map((c) => (
              <div key={c.title} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pastel-mint flex items-center justify-center">
                  <c.icon className="w-6 h-6 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-brand-navy">{c.title}</h3>
                  <p className="mt-1 text-brand-muted text-sm leading-relaxed">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-alt-bg py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Como empezar</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {steps.map((s) => (
              <div key={s.step} className="relative rounded-card bg-white p-6 border border-brand-border">
                <span className="font-heading font-extrabold text-4xl text-brand-teal/20">{s.step}</span>
                <h3 className="mt-2 font-heading font-bold text-lg text-brand-navy">{s.title}</h3>
                <p className="mt-2 text-brand-muted text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Datos vehiculares via API</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s) => (
              <SolutionCard key={s.title} icon={s.icon} title={s.title} description={s.desc} href={s.href} accent={s.accent} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Integra datos vehiculares en tu producto"
        subheading="Solicita tu API key y empieza a construir con la fuente de datos vehiculares mas completa del mercado espanol."
        primaryLabel="Solicitar acceso API"
        primaryHref="/pricing-request"
        secondaryLabel="Ver documentacion API"
        secondaryHref="/solutions/api"
      />
    </>
  );
}
