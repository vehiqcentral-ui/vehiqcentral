import { Metadata } from 'next';
import { Ship, ShieldAlert, TrendingUp, FileText, Car, Globe, Search, AlertTriangle } from 'lucide-react';
import { SolutionCard } from '@/components/public/SolutionCard';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'Para Importadores y Exportadores | VEHIQ',
  description: 'Historial vehicular europeo, verificacion de fraude transfronterizo y valoracion de mercado para importadores y exportadores en Espana.',
};

const challenges = [
  { icon: Search, title: 'Historial desconocido', desc: 'Los vehiculos importados llegan sin historial verificable en Espana: no sabes si el kilometraje es real ni si ha tenido siniestros.' },
  { icon: AlertTriangle, title: 'Fraude transfronterizo', desc: 'Manipulacion de cuentakilometros, siniestros ocultos en otros paises y cargas financieras que no aparecen en los registros locales.' },
  { icon: TrendingUp, title: 'Valoracion compleja', desc: 'El valor de mercado de un vehiculo importado depende de multiples factores locales que difieren del pais de origen.' },
  { icon: FileText, title: 'Documentacion fragmentada', desc: 'Verificar el historial completo requiere consultar registros de multiples paises europeos manualmente.' },
];

const solutions = [
  { icon: Globe, title: 'Historial Europeo', desc: 'Consulta el historial completo de vehiculos registrados en los principales mercados europeos.', href: '/solutions/reports', accent: 'blue' as const },
  { icon: ShieldAlert, title: 'Verificacion Transfronteriza', desc: 'Detecta kilometraje manipulado, siniestros y cargas financieras en el pais de origen.', href: '/solutions/fraud', accent: 'peach' as const },
  { icon: TrendingUp, title: 'Valoracion de Mercado', desc: 'Precio justo en el mercado espanol basado en datos reales de anuncios y transacciones.', href: '/solutions/valuation', accent: 'mint' as const },
  { icon: Car, title: 'Datos de Vehiculo', desc: 'Decodificacion VIN y ficha tecnica completa independientemente del pais de origen.', href: '/solutions/vehicle-data', accent: 'purple' as const },
];

const metrics = [
  { value: '< 5s', label: 'Informe completo de un vehiculo importado' },
  { value: '30+', label: 'Paises europeos cubiertos' },
  { value: '95%', label: 'Precision en valoraciones de mercado' },
  { value: '24/7', label: 'Acceso a datos via plataforma y API' },
];

export default function ForImportersPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-blue">
              <Ship className="w-7 h-7 text-brand-indigo" />
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Para Importadores y Exportadores
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Verifica el historial de vehiculos europeos antes de comprar. Detecta fraude transfronterizo, consulta datos tecnicos y valora vehiculos con datos reales del mercado espanol.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Tus retos en la importacion</h2>
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
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">VEHIQ para importadores</h2>
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
        heading="Datos vehiculares para importacion segura"
        subheading="Solicita acceso y verifica el historial de cualquier vehiculo europeo antes de comprarlo."
        primaryLabel="Solicitar acceso"
        primaryHref="/pricing-request"
        secondaryLabel="Ver soluciones"
        secondaryHref="/solutions"
      />
    </>
  );
}
