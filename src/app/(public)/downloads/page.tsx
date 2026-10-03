import { Metadata } from 'next';
import { FileText, Download, BookOpen, BarChart3, Users, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Descargas | VEHIQ',
  description: 'Descarga whitepapers, guias y casos de exito sobre gestion automotriz, importacion, flotas y datos vehiculares.',
};

const downloads = [
  {
    icon: FileText,
    type: 'Whitepaper',
    title: 'El futuro de la compraventa de vehiculos en Espana',
    desc: 'Analisis del mercado, tendencias tecnologicas y oportunidades para concesionarios en la era digital.',
    pages: '24 paginas',
    accent: 'bg-pastel-mint text-brand-teal',
  },
  {
    icon: BookOpen,
    type: 'Guia',
    title: 'Guia completa de importacion de vehiculos',
    desc: 'Paso a paso para importar vehiculos a Espana: documentacion, impuestos, homologacion y matriculacion.',
    pages: '32 paginas',
    accent: 'bg-pastel-blue text-brand-indigo',
  },
  {
    icon: BarChart3,
    type: 'Caso de exito',
    title: 'Como AutoSur redujo un 40% sus costes operativos',
    desc: 'Caso practico de un concesionario en Andalucia que transformo su negocio con VEHIQ.',
    pages: '8 paginas',
    accent: 'bg-pastel-peach text-amber-600',
  },
  {
    icon: Users,
    type: 'Whitepaper',
    title: 'Gestion de flotas: de la intuicion a los datos',
    desc: 'Como optimizar el TCO, mantenimiento y renovacion de flotas con inteligencia de datos.',
    pages: '20 paginas',
    accent: 'bg-pastel-purple text-brand-indigo',
  },
  {
    icon: TrendingUp,
    type: 'Informe',
    title: 'Informe de precios del mercado VO - T3 2025',
    desc: 'Datos y tendencias de precios de vehiculos de ocasion por segmento, marca y comunidad autonoma.',
    pages: '16 paginas',
    accent: 'bg-pastel-mint text-brand-teal',
  },
  {
    icon: BookOpen,
    type: 'Guia',
    title: 'API de datos vehiculares: guia de inicio rapido',
    desc: 'Documentacion tecnica para desarrolladores que quieran integrar datos de VEHIQ en sus aplicaciones.',
    pages: '12 paginas',
    accent: 'bg-pastel-blue text-brand-indigo',
  },
];

export default function DownloadsPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Descargas
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Whitepapers, guias practicas y casos de exito para profesionales del sector automotriz.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {downloads.map((d) => (
              <div key={d.title} className="rounded-card bg-white border border-brand-border p-6 flex flex-col">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${d.accent}`}>
                    <d.icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-semibold text-brand-teal uppercase tracking-wide">{d.type}</span>
                </div>
                <h2 className="mt-4 font-heading font-bold text-lg text-brand-navy leading-snug">{d.title}</h2>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed flex-1">{d.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-brand-muted">{d.pages}</span>
                  <Button size="sm" variant="secondary" className="gap-1.5">
                    <Download size={14} />
                    Descargar
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
