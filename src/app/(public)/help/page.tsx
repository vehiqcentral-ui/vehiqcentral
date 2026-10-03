import { Metadata } from 'next';
import Link from 'next/link';
import { Search, Rocket, Car, CreditCard, Code, Settings, Users, HelpCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Centro de Ayuda | VEHIQ',
  description: 'Centro de ayuda VEHIQ: documentacion, tutoriales y soporte para todas las funcionalidades de la plataforma.',
};

const categories = [
  { icon: Rocket, title: 'Primeros pasos', desc: 'Configura tu cuenta, anade tu empresa y empieza a usar VEHIQ.', articles: 12, href: '#' },
  { icon: Car, title: 'Datos de vehiculos', desc: 'Consultas DGT, historial tecnico, informes y busqueda por matricula.', articles: 18, href: '#' },
  { icon: Settings, title: 'Gestion de inventario', desc: 'Alta de vehiculos, fotos, estados, precios y publicacion en portales.', articles: 15, href: '#' },
  { icon: CreditCard, title: 'Facturacion y pagos', desc: 'Planes, facturas, metodos de pago y gestion de suscripcion.', articles: 8, href: '#' },
  { icon: Code, title: 'API e integraciones', desc: 'Documentacion tecnica, endpoints, autenticacion y ejemplos de uso.', articles: 22, href: '#' },
  { icon: Users, title: 'Usuarios y permisos', desc: 'Gestion de equipo, roles, permisos y configuracion multi-sede.', articles: 10, href: '#' },
];

export default function HelpPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Centro de Ayuda
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Encuentra respuestas, tutoriales y documentacion para sacar el maximo partido a VEHIQ.
            </p>
            <div className="mt-8 relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-muted" />
              <input
                type="search"
                placeholder="Buscar en el centro de ayuda..."
                className="w-full rounded-button border border-brand-border pl-12 pr-4 py-3 text-brand-body focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="group block rounded-card bg-white border border-brand-border p-6 hover:shadow-lg hover:border-brand-teal/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-pastel-blue flex items-center justify-center group-hover:bg-brand-indigo transition-colors">
                  <c.icon className="w-6 h-6 text-brand-indigo group-hover:text-white transition-colors" />
                </div>
                <h2 className="mt-5 font-heading font-bold text-lg text-brand-navy">{c.title}</h2>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">{c.desc}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-xs text-brand-muted">{c.articles} articulos</span>
                  <ArrowRight size={16} className="text-brand-teal group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-alt-bg py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <HelpCircle className="w-10 h-10 text-brand-teal mx-auto" />
          <h2 className="mt-4 font-heading font-extrabold text-2xl text-brand-navy">No encuentras lo que buscas?</h2>
          <p className="mt-2 text-brand-muted">
            Nuestro equipo de soporte esta disponible de lunes a viernes de 9:00 a 18:00 CET.
          </p>
          <div className="mt-6">
            <Link href="/contact" className="inline-flex items-center gap-2 font-heading font-bold text-brand-teal hover:text-brand-teal/80 transition-colors">
              Contactar con soporte
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
