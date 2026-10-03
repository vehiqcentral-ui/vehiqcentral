import { Metadata } from 'next';
import {
  TrendingUp, Brain, BarChart3, Target, RefreshCw, LineChart, Layers, Globe,
} from 'lucide-react';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'Tasacion de Vehiculos con IA | VEHIQ',
  description: 'Valoracion inteligente de vehiculos con inteligencia artificial, datos de mercado y comparativas en tiempo real.',
};

const benefits = [
  { icon: Brain, title: 'Valoracion con IA', desc: 'Algoritmos de machine learning entrenados con millones de transacciones reales del mercado espanol y europeo.' },
  { icon: BarChart3, title: 'Datos de mercado real', desc: 'Precios basados en anuncios activos, ventas cerradas y subastas B2B. Actualizacion diaria de valores.' },
  { icon: Target, title: 'Multiples valores', desc: 'Obtiene valor de mercado, valor de compra, precio de venta recomendado y valor minimo de liquidacion.' },
  { icon: RefreshCw, title: 'Actualizacion continua', desc: 'Los valores se recalculan automaticamente con cada cambio en el mercado. Alertas cuando un precio varia significativamente.' },
];

const steps = [
  { step: '01', title: 'Identifica el vehiculo', desc: 'Introduce matricula, bastidor o selecciona marca/modelo/version. VEHIQ decodifica automaticamente las especificaciones.' },
  { step: '02', title: 'Ajusta parametros', desc: 'Indica kilometraje real, estado general, equipamiento extra y ubicacion geografica para afinar la valoracion.' },
  { step: '03', title: 'Recibe la tasacion', desc: 'Obtiene un informe de valoracion con rango de precios, comparativas de mercado y recomendacion de precio de venta.' },
];

const features = [
  'Tasacion instantanea por matricula o bastidor',
  'Valor de mercado, compra, venta y liquidacion',
  'Comparativa con vehiculos similares en venta',
  'Historico de evolucion del precio del modelo',
  'Ajuste por kilometraje, estado y ubicacion',
  'Informe de tasacion descargable en PDF',
  'Tasacion masiva para flotas y lotes',
  'Widget de tasacion para tu pagina web',
  'Alertas de variacion de precios en tu stock',
  'API de tasacion para integracion en tu sistema',
];

const integrations = [
  { icon: LineChart, title: 'Portales de venta', desc: 'Datos de precios de Coches.net, AutoScout24, Milanuncios y otros portales del mercado espanol.' },
  { icon: Layers, title: 'Subastas B2B', desc: 'Resultados de subastas profesionales y plataformas de remarketing para valores de compra reales.' },
  { icon: Globe, title: 'Mercados europeos', desc: 'Comparativa de precios con Alemania, Francia e Italia para oportunidades de importacion y exportacion.' },
];

export default function ValuationPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-mint">
              <TrendingUp className="w-7 h-7 text-brand-teal" />
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Tasacion con Inteligencia Artificial
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Valoracion precisa de vehiculos impulsada por IA y datos de mercado en tiempo real. Conoce el valor exacto de cualquier vehiculo en segundos.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Beneficios clave</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pastel-peach flex items-center justify-center">
                  <b.icon className="w-6 h-6 text-brand-teal" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-brand-navy">{b.title}</h3>
                  <p className="mt-1 text-brand-muted text-sm leading-relaxed">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-alt-bg py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Como funciona</h2>
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
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Funcionalidades</h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {features.map((f) => (
              <li key={f} className="flex items-start gap-3">
                <span className="mt-1.5 w-2 h-2 rounded-full bg-brand-teal flex-shrink-0" />
                <span className="text-brand-body">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-brand-alt-bg py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Fuentes de valoracion</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {integrations.map((i) => (
              <div key={i.title} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pastel-blue flex items-center justify-center">
                  <i.icon className="w-6 h-6 text-brand-indigo" />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-brand-navy">{i.title}</h3>
                  <p className="mt-1 text-brand-muted text-sm leading-relaxed">{i.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Tasaciones precisas en segundos"
        subheading="Precio bajo consulta. Descubre como la IA de VEHIQ mejora tus decisiones de compra y venta."
        primaryLabel="Solicitar demo"
        primaryHref="/pricing-request"
        secondaryLabel="Ver soluciones"
        secondaryHref="/solutions"
      />
    </>
  );
}
