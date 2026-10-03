import { Metadata } from 'next';
import { Store, ShieldAlert, TrendingUp, FileText, Car, LineChart, Search, AlertTriangle } from 'lucide-react';
import { SolutionCard } from '@/components/public/SolutionCard';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'Para Concesionarios | VEHIQ',
  description: 'Datos vehiculares, valoraciones con IA y deteccion de fraude para concesionarios y compraventas en Espana.',
};

const challenges = [
  { icon: Search, title: 'Valoraciones a ciegas', desc: 'Sin acceso a datos de mercado actualizados, las tasaciones de compra y venta se basan en intuicion, no en datos reales.' },
  { icon: AlertTriangle, title: 'Riesgo de fraude en compras', desc: 'Kilometraje manipulado, siniestros ocultos y cargas financieras que solo descubres despues de cerrar la operacion.' },
  { icon: FileText, title: 'Historial incompleto', desc: 'Reunir el historial completo de un vehiculo requiere consultar multiples fuentes manualmente y lleva demasiado tiempo.' },
  { icon: LineChart, title: 'Mercado opaco', desc: 'Dificil saber a que precio vender, cuanto tiempo tardara en venderse o que modelos tienen mas demanda en tu zona.' },
];

const solutions = [
  { icon: TrendingUp, title: 'Valoracion Inteligente', desc: 'Precio de mercado con IA basado en anuncios reales y transacciones del mercado espanol.', href: '/solutions/valuation', accent: 'mint' as const },
  { icon: ShieldAlert, title: 'Deteccion de Fraude', desc: 'Verifica kilometraje, siniestros, cargas y robos antes de comprar un vehiculo.', href: '/solutions/fraud', accent: 'peach' as const },
  { icon: Car, title: 'Datos de Vehiculos', desc: 'Decodificacion VIN, ficha tecnica y datos DGT de cualquier vehiculo al instante.', href: '/solutions/vehicle-data', accent: 'blue' as const },
  { icon: LineChart, title: 'Analitica de Mercado', desc: 'Tendencias de precios, demanda por modelo y tiempos de venta en tu provincia.', href: '/solutions/market', accent: 'purple' as const },
];

const metrics = [
  { value: '< 5s', label: 'Historial completo de un vehiculo' },
  { value: '95%', label: 'Precision en valoraciones de mercado' },
  { value: '847M', label: 'Anuncios analizados en Espana' },
  { value: '24/7', label: 'Acceso a datos via plataforma y API' },
];

export default function ForDealersPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-mint">
              <Store className="w-7 h-7 text-brand-teal" />
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Para Concesionarios
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Datos fiables para comprar y vender con confianza. Valoraciones precisas, deteccion de fraude e inteligencia de mercado disenada para concesionarios y compraventas.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Tus retos diarios</h2>
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
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">VEHIQ para concesionarios</h2>
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
        heading="Datos vehiculares para tu concesionario"
        subheading="Solicita acceso y empieza a verificar y valorar vehiculos con datos reales del mercado espanol."
        primaryLabel="Solicitar acceso"
        primaryHref="/pricing-request"
        secondaryLabel="Ver soluciones"
        secondaryHref="/solutions"
      />
    </>
  );
}
