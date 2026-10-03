import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight, Tag } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Blog | VEHIQ',
  description: 'Articulos, guias y analisis sobre el sector automotriz espanol. Tendencias, normativa y mejores practicas.',
};

const articles = [
  {
    title: 'Guia completa para importar vehiculos de Alemania a Espana en 2025',
    excerpt: 'Todo lo que necesitas saber sobre documentacion, impuestos y homologacion para importar coches alemanes al mercado espanol.',
    date: '15 septiembre 2025',
    category: 'Importacion',
    slug: '#',
  },
  {
    title: 'Como calcular el IEDMT: tabla de emisiones y excepciones',
    excerpt: 'Desglose completo del Impuesto Especial sobre Determinados Medios de Transporte y como afecta a cada tipo de vehiculo.',
    date: '8 septiembre 2025',
    category: 'Fiscalidad',
    slug: '#',
  },
  {
    title: 'Tendencias del mercado de vehiculos de ocasion en Espana',
    excerpt: 'Analisis de precios, demanda por segmento y previsiones para el segundo semestre del mercado de segunda mano.',
    date: '1 septiembre 2025',
    category: 'Mercado',
    slug: '#',
  },
  {
    title: 'Normativa Euro 7: impacto en concesionarios y talleres',
    excerpt: 'Que cambia con la nueva normativa de emisiones Euro 7 y como preparar tu negocio para su entrada en vigor.',
    date: '25 agosto 2025',
    category: 'Normativa',
    slug: '#',
  },
  {
    title: 'Digitalizacion del taller: por donde empezar',
    excerpt: 'Pasos practicos para transformar un taller tradicional en un negocio digitalizado y eficiente.',
    date: '18 agosto 2025',
    category: 'Tecnologia',
    slug: '#',
  },
  {
    title: 'Vehiculos electricos en flotas: analisis de TCO frente a combustion',
    excerpt: 'Comparativa real de costes totales de propiedad entre flotas electricas y de combustion en el mercado espanol.',
    date: '10 agosto 2025',
    category: 'Flotas',
    slug: '#',
  },
];

export default function BlogPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Blog
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Articulos, analisis y guias practicas para profesionales del sector automotriz en Espana.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Link
                key={a.title}
                href={a.slug}
                className="group block rounded-card bg-white border border-brand-border p-6 hover:shadow-lg hover:border-brand-teal/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 text-xs text-brand-muted">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} />
                    {a.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-brand-teal font-semibold">
                    <Tag size={12} />
                    {a.category}
                  </span>
                </div>
                <h2 className="mt-3 font-heading font-bold text-lg text-brand-navy leading-snug group-hover:text-brand-teal transition-colors">
                  {a.title}
                </h2>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">{a.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-teal group-hover:gap-2.5 transition-all duration-200">
                  Leer articulo
                  <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
