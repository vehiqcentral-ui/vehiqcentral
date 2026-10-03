import { Metadata } from 'next';
import { ShieldCheck, ShieldAlert, TrendingUp, Car, FileText, Search, AlertTriangle, Database } from 'lucide-react';
import { SolutionCard } from '@/components/public/SolutionCard';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'Para Aseguradoras | VEHIQ',
  description: 'Deteccion de fraude, valoracion de siniestros e historial vehicular completo para aseguradoras en Espana.',
};

const challenges = [
  { icon: AlertTriangle, title: 'Fraude en reclamaciones', desc: 'Detectar siniestros simulados, kilometraje manipulado y reclamaciones duplicadas requiere cruzar multiples fuentes de datos.' },
  { icon: Search, title: 'Valoracion de siniestros', desc: 'Determinar el valor real de un vehiculo siniestrado sin datos de mercado actualizados genera disputas y costes extra.' },
  { icon: Database, title: 'Datos vehiculares incompletos', desc: 'Evaluar riesgos sin acceso al historial completo del vehiculo — siniestros previos, kilometraje real, titulares — genera primas imprecisas.' },
  { icon: FileText, title: 'Verificacion manual', desc: 'Consultar el historial de un vehiculo manualmente en multiples registros es lento y propenso a errores.' },
];

const solutions = [
  { icon: ShieldAlert, title: 'Deteccion de Fraude', desc: 'Algoritmos de IA que detectan kilometraje manipulado, siniestros ocultos y patrones sospechosos en reclamaciones.', href: '/solutions/fraud', accent: 'peach' as const },
  { icon: TrendingUp, title: 'Valoracion de Mercado', desc: 'Valor real del vehiculo basado en datos de mercado actualizados para peritaciones y liquidaciones justas.', href: '/solutions/valuation', accent: 'mint' as const },
  { icon: Car, title: 'Datos de Vehiculo', desc: 'Historial completo, datos DGT, decodificacion VIN y ficha tecnica para evaluacion de riesgos.', href: '/solutions/vehicle-data', accent: 'blue' as const },
  { icon: FileText, title: 'Informes Vehiculares', desc: 'Informes detallados con historial de ITV, kilometraje verificado y titulares para cada poliza.', href: '/solutions/reports', accent: 'purple' as const },
];

const metrics = [
  { value: '95%', label: 'Precision en valoraciones de mercado' },
  { value: '< 5s', label: 'Informe completo de un vehiculo' },
  { value: '847M', label: 'Anuncios analizados en Espana' },
  { value: '24/7', label: 'Acceso a datos via plataforma y API' },
];

export default function ForInsurersPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-purple">
              <ShieldCheck className="w-7 h-7 text-brand-indigo" />
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Para Aseguradoras
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Datos vehiculares fiables para detectar fraude, valorar siniestros con precision y evaluar riesgos con el historial completo de cada vehiculo asegurado.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Retos del sector asegurador</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {challenges.map((c) => (
              <div key={c.title} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pastel-peach flex items-center justify-center">
                  <c.icon className="w-6 h-6 text-amber-600" />
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
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">VEHIQ para aseguradoras</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s) => (
              <SolutionCard key={s.title} icon={s.icon} title={s.title} description={s.desc} href={s.href} accent={s.accent} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">VEHIQ en numeros</h2>
          <div className="mt-10 grid gap-6 grid-cols-2 lg:grid-cols-4">
            {metrics.map((m) => (
              <div key={m.label} className="text-center rounded-card bg-brand-alt-bg p-6 border border-brand-border">
                <span className="font-heading font-extrabold text-4xl text-brand-teal">{m.value}</span>
                <p className="mt-2 text-sm text-brand-muted">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Datos vehiculares para aseguradoras"
        subheading="Solicita acceso y empieza a verificar vehiculos y detectar fraude con la fuente de datos mas completa del mercado espanol."
        primaryLabel="Solicitar acceso"
        primaryHref="/pricing-request"
        secondaryLabel="Ver API"
        secondaryHref="/solutions/api"
      />
    </>
  );
}
