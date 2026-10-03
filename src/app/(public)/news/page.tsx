import { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ArrowRight, Megaphone } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Noticias | VEHIQ',
  description: 'Ultimas noticias de VEHIQ: actualizaciones de producto, nuevas funcionalidades y novedades de la empresa.',
};

const newsItems = [
  {
    title: 'VEHIQ lanza su nuevo modulo de Inteligencia Artificial para valoraciones',
    excerpt: 'El nuevo motor de IA permite valoraciones mas precisas basadas en mas de 2 millones de transacciones del mercado espanol.',
    date: '20 septiembre 2025',
    type: 'Producto',
    slug: '#',
  },
  {
    title: 'Acuerdo de colaboracion con la Asociacion Nacional de Vendedores de Vehiculos',
    excerpt: 'VEHIQ se convierte en partner tecnologico oficial de GANVAM para la digitalizacion del sector.',
    date: '10 septiembre 2025',
    type: 'Empresa',
    slug: '#',
  },
  {
    title: 'Nueva integracion con AutoScout24 para publicacion automatica',
    excerpt: 'Los usuarios de VEHIQ pueden ahora publicar y sincronizar anuncios directamente con AutoScout24 desde la plataforma.',
    date: '1 septiembre 2025',
    type: 'Producto',
    slug: '#',
  },
  {
    title: 'VEHIQ cierra una ronda de financiacion Serie A de 5M de euros',
    excerpt: 'La ronda liderada por inversores especializados en autotech permitira expandir el equipo y acelerar el desarrollo de producto.',
    date: '15 agosto 2025',
    type: 'Empresa',
    slug: '#',
  },
];

export default function NewsPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Noticias
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Novedades de VEHIQ: actualizaciones de producto, alianzas y noticias de la empresa.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            {newsItems.map((n) => (
              <Link
                key={n.title}
                href={n.slug}
                className="group block rounded-card bg-white border border-brand-border p-6 sm:p-8 hover:shadow-lg hover:border-brand-teal/30 transition-all duration-300"
              >
                <div className="flex items-center gap-3 text-xs text-brand-muted">
                  <span className="inline-flex items-center gap-1">
                    <Calendar size={12} />
                    {n.date}
                  </span>
                  <span className="inline-flex items-center gap-1 text-brand-indigo font-semibold">
                    <Megaphone size={12} />
                    {n.type}
                  </span>
                </div>
                <h2 className="mt-3 font-heading font-bold text-xl text-brand-navy leading-snug group-hover:text-brand-teal transition-colors">
                  {n.title}
                </h2>
                <p className="mt-2 text-brand-muted leading-relaxed">{n.excerpt}</p>
                <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-teal group-hover:gap-2.5 transition-all duration-200">
                  Leer mas
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
