import { Metadata } from 'next';
import {
  ShieldAlert, Search, AlertTriangle, Eye, Database, FileWarning, Scale, Fingerprint,
} from 'lucide-react';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'Deteccion de Fraude | VEHIQ',
  description: 'Detecta fraude de kilometraje, siniestros ocultos, cargas financieras y vehiculos robados con inteligencia artificial.',
};

const benefits = [
  { icon: Search, title: 'Verificacion de kilometraje', desc: 'Cruza lecturas de odometro de multiples fuentes — ITV, talleres oficiales y portales de venta — para detectar manipulaciones.' },
  { icon: AlertTriangle, title: 'Historial de siniestros', desc: 'Identifica accidentes previos, reparaciones estructurales y vehiculos declarados como siniestro total por aseguradoras.' },
  { icon: Eye, title: 'Cargas y embargos', desc: 'Consulta en tiempo real reservas de dominio, embargos judiciales y cargas financieras pendientes en el registro de la DGT.' },
  { icon: Fingerprint, title: 'Vehiculos robados', desc: 'Comprueba bases de datos policiales europeas (SIS II) para detectar vehiculos reportados como robados.' },
];

const steps = [
  { step: '01', title: 'Introduce matricula o bastidor', desc: 'Busca por matricula espanola o numero de bastidor (VIN) del vehiculo que quieres verificar.' },
  { step: '02', title: 'Analisis automatico con IA', desc: 'VEHIQ analiza mas de 20 fuentes de datos y aplica algoritmos de deteccion de anomalias para identificar senales de fraude.' },
  { step: '03', title: 'Informe de riesgo', desc: 'Recibe un informe con puntuacion de riesgo, alertas detalladas y recomendaciones para cada vehiculo verificado.' },
];

const features = [
  'Puntuacion de riesgo de 0 a 100 por vehiculo',
  'Deteccion de retroceso de kilometraje con IA',
  'Verificacion de siniestros en bases de datos de aseguradoras',
  'Comprobacion de vehiculos robados en SIS II europeo',
  'Alertas de cargas, embargos y reservas de dominio',
  'Deteccion de matriculas re-registradas tras siniestro total',
  'Verificacion de coherencia entre VIN y documentacion',
  'Historial de anuncios en portales para detectar inconsistencias',
  'Integracion con flujos de tasacion y compra',
  'Exportacion de informes de riesgo en PDF',
];

const dataSources = [
  { icon: Database, title: 'DGT y registros oficiales', desc: 'Datos administrativos del vehiculo: situacion, titulares, cargas y estado de la ITV directamente de Trafico.' },
  { icon: FileWarning, title: 'Aseguradoras y peritos', desc: 'Bases de datos de siniestros, vehiculos con dano estructural y declaraciones de siniestro total.' },
  { icon: Scale, title: 'Bases policiales europeas', desc: 'Acceso al Sistema de Informacion de Schengen (SIS II) para comprobacion de vehiculos robados en toda Europa.' },
];

export default function FraudDetectionPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-peach">
              <ShieldAlert className="w-7 h-7 text-brand-indigo" />
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Deteccion de Fraude
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Protege tu negocio contra el fraude vehicular. Detecta manipulaciones de kilometraje, siniestros ocultos, cargas financieras y vehiculos robados antes de cerrar una operacion.
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
        heading="Protege cada operacion contra el fraude"
        subheading="Solicita acceso y empieza a verificar vehiculos con la deteccion de fraude mas avanzada del mercado espanol."
        primaryLabel="Solicitar acceso"
        primaryHref="/pricing-request"
        secondaryLabel="Ver soluciones"
        secondaryHref="/solutions"
      />
    </>
  );
}
