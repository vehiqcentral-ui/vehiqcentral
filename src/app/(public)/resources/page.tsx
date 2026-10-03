import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, Newspaper, Download, HelpCircle, MessageCircle, Code, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Recursos | VEHIQ',
  description: 'Centro de recursos VEHIQ: blog, noticias, descargas, guias, FAQ y centro de ayuda para profesionales del motor.',
};

const resources = [
  { icon: BookOpen, title: 'Blog', desc: 'Articulos, analisis y guias sobre el sector automotriz espanol.', href: '/blog', accent: 'bg-pastel-mint text-brand-teal' },
  { icon: Newspaper, title: 'Noticias', desc: 'Novedades de producto, alianzas y actualizaciones de VEHIQ.', href: '/news', accent: 'bg-pastel-blue text-brand-indigo' },
  { icon: Download, title: 'Descargas', desc: 'Whitepapers, guias PDF y casos de exito para descargar.', href: '/downloads', accent: 'bg-pastel-peach text-amber-600' },
  { icon: HelpCircle, title: 'Centro de Ayuda', desc: 'Documentacion, tutoriales y respuestas a tus preguntas.', href: '/help', accent: 'bg-pastel-purple text-brand-indigo' },
  { icon: MessageCircle, title: 'Preguntas Frecuentes', desc: 'Respuestas rapidas a las dudas mas comunes sobre VEHIQ.', href: '/faq', accent: 'bg-pastel-mint text-brand-teal' },
  { icon: Code, title: 'Documentacion API', desc: 'Referencia tecnica completa para integrar VEHIQ en tus sistemas.', href: '/solutions/api', accent: 'bg-pastel-blue text-brand-indigo' },
];

export default function ResourcesPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Recursos
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Todo lo que necesitas para aprovechar al maximo VEHIQ: articulos, guias, descargas y soporte tecnico.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resources.map((r) => (
              <Link
                key={r.title}
                href={r.href}
                className="group block rounded-card bg-white border border-brand-border p-6 hover:shadow-lg hover:border-brand-teal/30 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${r.accent}`}>
                  <r.icon className="w-6 h-6" />
                </div>
                <h2 className="mt-5 font-heading font-bold text-lg text-brand-navy">{r.title}</h2>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">{r.desc}</p>
                <span className="inline-flex items-center gap-1.5 mt-4 text-sm font-semibold text-brand-teal group-hover:gap-2.5 transition-all duration-200">
                  Explorar
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
