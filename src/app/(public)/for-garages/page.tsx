import { Metadata } from 'next';
import { Wrench, Car, FileText, ShieldAlert, Search, AlertTriangle, History, ClipboardList } from 'lucide-react';
import { SolutionCard } from '@/components/public/SolutionCard';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'Para Talleres y Peritos | VEHIQ',
  description: 'Historial vehicular, datos tecnicos, verificaciones de kilometraje y deteccion de fraude para talleres y peritos en Espana.',
};

const challenges = [
  { icon: Search, title: 'Historial tecnico incompleto', desc: 'Sin acceso rapido al historial de ITV, reparaciones previas y recalls no puedes diagnosticar con toda la informacion.' },
  { icon: AlertTriangle, title: 'Kilometraje no verificable', desc: 'No sabes si el cuentakilometros ha sido manipulado, lo que afecta al diagnostico y al presupuesto de reparacion.' },
  { icon: ClipboardList, title: 'Datos tecnicos dispersos', desc: 'Buscar la ficha tecnica, especificaciones y piezas compatibles requiere consultar multiples fuentes por separado.' },
  { icon: History, title: 'Verificacion de siniestros', desc: 'Como perito, necesitas verificar si un vehiculo ha tenido siniestros previos antes de emitir un informe.' },
];

const solutions = [
  { icon: Car, title: 'Datos Tecnicos', desc: 'Ficha tecnica completa, especificaciones y decodificacion VIN al instante para cualquier vehiculo.', href: '/solutions/vehicle-data', accent: 'mint' as const },
  { icon: FileText, title: 'Informes Vehiculares', desc: 'Historial completo de ITV, kilometraje verificado y titulares anteriores de cualquier vehiculo.', href: '/solutions/reports', accent: 'blue' as const },
  { icon: ShieldAlert, title: 'Verificacion de Fraude', desc: 'Detecta retroceso de kilometraje, siniestros ocultos y cargas financieras antes de trabajar en un vehiculo.', href: '/solutions/fraud', accent: 'peach' as const },
  { icon: Wrench, title: 'API de Datos', desc: 'Integra los datos vehiculares directamente en tu sistema de gestion de taller via API.', href: '/solutions/api', accent: 'purple' as const },
];

const metrics = [
  { value: '< 5s', label: 'Ficha tecnica completa de un vehiculo' },
  { value: '95%', label: 'Precision en verificacion de kilometraje' },
  { value: '20M+', label: 'Vehiculos en la base de datos espanola' },
  { value: '24/7', label: 'Acceso a datos via plataforma y API' },
];

export default function ForGaragesPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-peach">
              <Wrench className="w-7 h-7 text-amber-600" />
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Para Talleres y Peritos
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Accede al historial tecnico, datos de ITV y verificaciones de kilometraje de cualquier vehiculo al instante. Datos fiables para diagnosticar, presupuestar y emitir informes con confianza.
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
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">VEHIQ para talleres y peritos</h2>
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
        heading="Datos vehiculares para tu taller"
        subheading="Solicita acceso y consulta el historial tecnico de cualquier vehiculo al instante."
        primaryLabel="Solicitar acceso"
        primaryHref="/pricing-request"
        secondaryLabel="Ver soluciones"
        secondaryHref="/solutions"
      />
    </>
  );
}
