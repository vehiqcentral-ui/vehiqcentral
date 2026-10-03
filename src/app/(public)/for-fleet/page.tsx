import { Metadata } from 'next';
import { Warehouse, TrendingUp, ShieldAlert, LineChart, Car, Search, AlertTriangle, FileText } from 'lucide-react';
import { SolutionCard } from '@/components/public/SolutionCard';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'Para Alquiler y Flotas | VEHIQ',
  description: 'Valor residual, historial de vehiculos, analitica de mercado y deteccion de fraude para empresas de flotas y alquiler en Espana.',
};

const challenges = [
  { icon: Search, title: 'Valor residual incierto', desc: 'Sin datos de mercado actualizados, es dificil predecir la depreciacion real y el momento optimo de rotacion de cada vehiculo.' },
  { icon: AlertTriangle, title: 'Historial disperso', desc: 'El historial de cada vehiculo de la flota esta repartido entre talleres, aseguradoras y registros oficiales sin consolidar.' },
  { icon: LineChart, title: 'Momento optimo de venta', desc: 'Sin analitica de mercado no sabes cuando es el mejor momento para vender ni a que precio listar cada unidad.' },
  { icon: FileText, title: 'Reporting complejo', desc: 'Consolidar datos de valor, estado y mercado de toda la flota requiere cruzar multiples fuentes manualmente.' },
];

const solutions = [
  { icon: TrendingUp, title: 'Valoracion de Flota', desc: 'Valor de mercado actualizado de cada vehiculo de tu flota basado en datos reales de transacciones.', href: '/solutions/valuation', accent: 'mint' as const },
  { icon: ShieldAlert, title: 'Verificacion de Vehiculos', desc: 'Historial, kilometraje verificado y deteccion de fraude para vehiculos que entran o salen de tu flota.', href: '/solutions/fraud', accent: 'peach' as const },
  { icon: LineChart, title: 'Analitica de Mercado', desc: 'Tendencias de depreciacion, demanda por modelo y tiempos de venta para optimizar la rotacion.', href: '/solutions/market', accent: 'blue' as const },
  { icon: Car, title: 'Datos de Vehiculos', desc: 'Ficha tecnica completa, datos DGT y decodificacion VIN de cada unidad de tu flota.', href: '/solutions/vehicle-data', accent: 'purple' as const },
];

const metrics = [
  { value: '95%', label: 'Precision en valoracion de flota' },
  { value: '847M', label: 'Anuncios analizados en Espana' },
  { value: '< 5s', label: 'Informe completo por vehiculo' },
  { value: '24/7', label: 'Acceso a datos via plataforma y API' },
];

export default function ForFleetPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-mint">
              <Warehouse className="w-7 h-7 text-brand-teal" />
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Para Alquiler y Flotas
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Datos de mercado y valoraciones precisas para gestionar el ciclo de vida de tu flota. Conoce el valor real de cada vehiculo, detecta el momento optimo de rotacion y verifica el historial de nuevas adquisiciones.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Tus retos con la flota</h2>
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
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">VEHIQ para flotas</h2>
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
        heading="Inteligencia de datos para tu flota"
        subheading="Solicita acceso y empieza a valorar y verificar los vehiculos de tu flota con datos reales del mercado espanol."
        primaryLabel="Solicitar acceso"
        primaryHref="/pricing-request"
        secondaryLabel="Ver soluciones"
        secondaryHref="/solutions"
      />
    </>
  );
}
