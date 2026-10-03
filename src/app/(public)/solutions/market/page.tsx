import { Metadata } from 'next';
import {
  LineChart, TrendingUp, BarChart3, PieChart, Globe, Database, Layers, Filter,
} from 'lucide-react';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'Analitica de Mercado | VEHIQ',
  description: 'Tendencias de precios, analisis de demanda y inteligencia competitiva del mercado automotriz espanol en tiempo real.',
};

const benefits = [
  { icon: TrendingUp, title: 'Tendencias de precios en tiempo real', desc: 'Monitoriza la evolucion de precios por marca, modelo, version, edad y kilometraje con datos actualizados diariamente.' },
  { icon: BarChart3, title: 'Analisis de oferta y demanda', desc: 'Entiende que vehiculos se venden mas rapido, cuales acumulan stock y donde estan las oportunidades de mercado.' },
  { icon: PieChart, title: 'Distribucion por portal', desc: 'Visualiza la cuota de mercado por portal de venta: Coches.net, AutoScout24, Wallapop, Milanuncios y mas.' },
  { icon: Filter, title: 'Segmentacion avanzada', desc: 'Filtra por marca, modelo, combustible, provincia, rango de precios y periodo temporal para analisis a medida.' },
];

const steps = [
  { step: '01', title: 'Selecciona tu segmento', desc: 'Elige marca, modelo, tipo de combustible, provincia o cualquier combinacion de filtros para definir tu mercado.' },
  { step: '02', title: 'VEHIQ agrega millones de datos', desc: 'Cruzamos anuncios activos de todos los portales principales con datos historicos de transacciones reales.' },
  { step: '03', title: 'Obtiene inteligencia accionable', desc: 'Recibe graficos interactivos, KPIs clave y alertas de tendencia que puedes exportar o integrar via API.' },
];

const features = [
  'Precio medio, mediana, percentiles 25/75 por segmento',
  'Evolucion historica de precios con graficos interactivos',
  'Tiempo medio de venta por modelo y provincia',
  'Distribucion de oferta por portal, combustible y provincia',
  'Ranking de modelos mas buscados y vendidos',
  'Alertas de tendencia: subidas y bajadas significativas',
  'Comparativa de precios entre provincias',
  'Analisis de competencia: precios de otros profesionales',
  'Exportacion de datos en CSV, Excel y via API',
  'Dashboards personalizables con tus KPIs favoritos',
];

const dataSources = [
  { icon: Globe, title: 'Portales de venta', desc: 'Datos agregados de Coches.net, AutoScout24, Wallapop, Milanuncios y otros portales del mercado espanol.' },
  { icon: Database, title: 'Transacciones reales', desc: 'Historico de precios de cierre, no solo de publicacion, para valoraciones mas precisas.' },
  { icon: Layers, title: 'Datos macro del sector', desc: 'Matriculaciones, transferencias y tendencias macroeconomicas que impactan el mercado de segunda mano.' },
];

export default function MarketAnalyticsPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-mint">
              <LineChart className="w-7 h-7 text-brand-teal" />
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Analitica de Mercado
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Inteligencia de mercado en tiempo real para el sector automotriz espanol. Monitoriza precios, detecta tendencias y toma decisiones basadas en datos, no en intuicion.
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
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pastel-mint flex items-center justify-center">
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
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Fuentes de datos</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {dataSources.map((i) => (
              <div key={i.title} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pastel-purple flex items-center justify-center">
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
        heading="Toma decisiones basadas en datos reales"
        subheading="Solicita acceso y empieza a monitorizar el mercado automotriz espanol con la analitica mas completa del sector."
        primaryLabel="Solicitar acceso"
        primaryHref="/pricing-request"
        secondaryLabel="Ver soluciones"
        secondaryHref="/solutions"
      />
    </>
  );
}
