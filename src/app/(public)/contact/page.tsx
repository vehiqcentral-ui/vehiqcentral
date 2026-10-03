'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const officeInfo = [
  { icon: MapPin, label: 'Direccion', value: 'Calle de Serrano 45, 28001 Madrid, Espana' },
  { icon: Phone, label: 'Telefono', value: '+34 910 123 456' },
  { icon: Mail, label: 'Email', value: 'info@vehiq.es' },
  { icon: Clock, label: 'Horario', value: 'Lunes a Viernes, 9:00 - 18:00 CET' },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Contacto
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Hablemos sobre como VEHIQ puede ayudarte. Rellena el formulario o contactanos directamente.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="font-heading font-extrabold text-2xl text-brand-navy">Enviar mensaje</h2>
            {submitted ? (
              <div className="mt-6 rounded-card bg-pastel-mint p-8 border border-brand-teal/20 text-center">
                <p className="font-heading font-bold text-lg text-brand-navy">Mensaje enviado correctamente</p>
                <p className="mt-2 text-brand-muted">Nos pondremos en contacto contigo en un plazo de 24 horas.</p>
              </div>
            ) : (
              <form
                className="mt-6 space-y-5"
                onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-brand-navy">Nombre completo</label>
                  <input id="name" name="name" required className="mt-1 w-full rounded-button border border-brand-border px-4 py-2.5 text-brand-body focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-brand-navy">Email profesional</label>
                  <input id="email" name="email" type="email" required className="mt-1 w-full rounded-button border border-brand-border px-4 py-2.5 text-brand-body focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-brand-navy">Empresa</label>
                    <input id="company" name="company" className="mt-1 w-full rounded-button border border-brand-border px-4 py-2.5 text-brand-body focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none" />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-brand-navy">Telefono</label>
                    <input id="phone" name="phone" type="tel" className="mt-1 w-full rounded-button border border-brand-border px-4 py-2.5 text-brand-body focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none" />
                  </div>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-brand-navy">Mensaje</label>
                  <textarea id="message" name="message" rows={5} required className="mt-1 w-full rounded-button border border-brand-border px-4 py-2.5 text-brand-body focus:border-brand-teal focus:ring-1 focus:ring-brand-teal outline-none resize-none" />
                </div>
                <Button type="submit" size="lg">Enviar mensaje</Button>
              </form>
            )}
          </div>

          <div>
            <h2 className="font-heading font-extrabold text-2xl text-brand-navy">Oficina principal</h2>
            <div className="mt-6 space-y-5">
              {officeInfo.map((o) => (
                <div key={o.label} className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-pastel-blue flex items-center justify-center">
                    <o.icon className="w-5 h-5 text-brand-indigo" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-brand-navy">{o.label}</p>
                    <p className="text-sm text-brand-muted">{o.value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 rounded-card bg-brand-alt-bg border border-brand-border h-64 flex items-center justify-center">
              <p className="text-brand-muted text-sm">Mapa de ubicacion — Madrid, Espana</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
