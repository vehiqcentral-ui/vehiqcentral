import { Metadata } from 'next';
import {
  Car, Search, Database, FileCheck, Shield, Zap, Server, RefreshCw,
} from 'lucide-react';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'Datos de Vehiculos | VEHIQ',
  description: 'Decodificacion VIN, fichas tecnicas, datos DGT y especificaciones completas de cualquier vehiculo.',
};

const benefits = [
  { icon: Search, title: 'Decodificacion VIN instantanea', desc: 'Introduce un numero de bastidor y obtiene marca, modelo, version, motorizacion y equipamiento en segundos.' },
  { icon: Database, title: 'Ficha tecnica completa', desc: 'Accede a todos los datos homologados: potencia, emisiones CO2, peso, dimensiones, tipo de combustible y norma Euro.' },
  { icon: FileCheck, title: 'Datos oficiales DGT', desc: 'Consulta en tiempo real el estado del vehiculo en la Direccion General de Trafico: titular, cargas, embargos e ITV.' },
  { icon: Shield, title: 'Cobertura europea', desc: 'Datos de vehiculos matriculados en Espana y principales mercados europeos para importaciones y exportaciones.' },
];

const steps = [
  { step: '01', title: 'Introduce la matricula o bastidor', desc: 'Busca por matricula espanola, numero de bastidor (VIN) o referencia interna de tu inventario.' },
  { step: '02', title: 'Consulta automatica', desc: 'VEHIQ cruza multiples fuentes: DGT, fabricantes, bases de datos tecnicas y registros europeos.' },
  { step: '03', title: 'Recibe datos estructurados', desc: 'Toda la informacion del vehiculo normalizada y lista para usar en tasacion, informes o publicidad.' },
];

const features = [
  'Decodificacion VIN/bastidor con mas de 150 campos',
  'Consulta por matricula espanola en tiempo real',
  'Ficha tecnica homologada con datos de emisiones',
  'Estado en DGT: situacion administrativa, ITV vigente',
  'Deteccion de cargas, embargos y reservas de dominio',
  'Historial de titulares y fechas de transferencia',
  'Equipamiento de serie y opcionales por version',
  'Fotografias de referencia por marca/modelo/version',
  'Comparativa de versiones y motorizaciones',
  'Exportacion de datos en PDF, Excel y JSON',
];

const integrations = [
  { icon: Server, title: 'DGT / Trafico', desc: 'Conexion directa con los sistemas de la Direccion General de Trafico para datos oficiales actualizados.' },
  { icon: Zap, title: 'Fabricantes OEM', desc: 'Bases de datos tecnicas de los principales fabricantes para especificaciones exactas por VIN.' },
  { icon: RefreshCw, title: 'Registros europeos', desc: 'Acceso a registros de vehiculos de Alemania, Francia, Italia, Paises Bajos y otros mercados clave.' },
];

export default function VehicleDataPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-blue">
              <Car className="w-7 h-7 text-brand-indigo" />
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Datos de Vehiculos
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Toda la informacion tecnica, administrativa y comercial de cualquier vehiculo. Decodificacion VIN, fichas tecnicas y datos oficiales de la DGT al instante.
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
        heading="Accede a datos de vehiculos fiables"
        subheading="Precio bajo consulta. Solicita acceso y empieza a consultar datos de vehiculos al instante."
        primaryLabel="Solicitar acceso"
        primaryHref="/pricing-request"
        secondaryLabel="Ver soluciones"
        secondaryHref="/solutions"
      />
    </>
  );
}
