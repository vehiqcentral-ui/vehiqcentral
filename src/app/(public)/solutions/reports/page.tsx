import { Metadata } from 'next';
import {
  FileText, ClipboardCheck, History, Gauge, AlertTriangle, Download, Lock, Building,
} from 'lucide-react';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'Informes de Vehiculos | VEHIQ',
  description: 'Informes completos de historial vehicular: ITV, kilometraje, titulares, siniestros y estado administrativo.',
};

const benefits = [
  { icon: History, title: 'Historial completo', desc: 'Trazabilidad total del vehiculo: propietarios anteriores, fechas de transferencia y comunidad autonoma de matriculacion.' },
  { icon: ClipboardCheck, title: 'Inspecciones ITV', desc: 'Resultado de todas las inspecciones tecnicas: fecha, estacion, resultado favorable/desfavorable y proxima cita.' },
  { icon: Gauge, title: 'Verificacion de kilometraje', desc: 'Cruce de lecturas de odometro en ITV, talleres y registros para detectar manipulaciones de cuentakilometros.' },
  { icon: AlertTriangle, title: 'Alertas de riesgo', desc: 'Deteccion de vehiculos con cargas, embargos judiciales, reservas de dominio o declaracion de siniestro total.' },
];

const steps = [
  { step: '01', title: 'Solicita el informe', desc: 'Introduce matricula o bastidor. Selecciona el tipo de informe: basico, completo o premium con historial europeo.' },
  { step: '02', title: 'Recopilacion automatica', desc: 'VEHIQ consulta DGT, estaciones ITV, aseguradoras y registros de talleres para generar un informe unificado.' },
  { step: '03', title: 'Informe listo en segundos', desc: 'Recibe el informe en tu panel, descargalo en PDF profesional o compartelo con tu cliente directamente.' },
];

const features = [
  'Informe de historial con todos los propietarios',
  'Resultado de inspecciones ITV con detalle de defectos',
  'Historial de kilometraje con deteccion de fraude',
  'Estado administrativo: cargas, embargos, siniestro total',
  'Informacion de seguros y siniestros declarados',
  'Fecha de primera matriculacion y antiguedad real',
  'Historial de cambios de comunidad autonoma',
  'Verificacion de numero de bastidor y concordancia',
  'Informe de valor de mercado adjunto opcional',
  'Marca blanca: informes personalizados con tu logo',
];

const integrations = [
  { icon: Building, title: 'DGT y estaciones ITV', desc: 'Datos oficiales de la Direccion General de Trafico y red de estaciones de Inspeccion Tecnica de Vehiculos.' },
  { icon: Lock, title: 'Registros de seguros', desc: 'Consulta de siniestralidad y declaraciones de perdida total en bases de datos aseguradoras.' },
  { icon: Download, title: 'Exportacion profesional', desc: 'Informes en PDF con diseno profesional, enlace de verificacion y codigo QR para validacion.' },
];

export default function ReportsPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-peach">
              <FileText className="w-7 h-7 text-brand-indigo" />
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Informes de Vehiculos
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Informes completos de historial vehicular. Inspecciones ITV, verificacion de kilometraje, titulares anteriores y alertas de riesgo para tomar decisiones informadas.
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
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pastel-blue flex items-center justify-center">
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
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Fuentes y exportacion</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {integrations.map((i) => (
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
        heading="Informes fiables para decisiones seguras"
        subheading="Precio bajo consulta. Genera informes de vehiculos profesionales al instante."
        primaryLabel="Solicitar acceso"
        primaryHref="/pricing-request"
        secondaryLabel="Ver soluciones"
        secondaryHref="/solutions"
      />
    </>
  );
}
