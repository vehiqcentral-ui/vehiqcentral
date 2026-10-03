'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Play,
  BarChart3,
  Shield,
  Zap,
  Globe,
  CheckCircle2,
  User,
  Mail,
  Phone,
  Building2,
  Briefcase,
  MessageSquare,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

const COMPANY_TYPES = [
  'Concesionario',
  'Importador',
  'Exportador',
  'Taller',
  'Flota',
  'Alquiler',
  'Aseguradora',
  'Otro',
];

const DEMO_BENEFITS = [
  {
    icon: BarChart3,
    title: 'Datos en tiempo real',
    description: 'Accede a datos de vehiculos de mas de 30 mercados europeos y latinoamericanos.',
  },
  {
    icon: Shield,
    title: 'Informes vehiculares completos',
    description: 'Historial, siniestros, kilometraje, cargas financieras y mucho mas en un solo informe.',
  },
  {
    icon: Zap,
    title: 'Valoracion inteligente',
    description: 'Algoritmos de IA que calculan el precio justo de cualquier vehiculo al instante.',
  },
  {
    icon: Globe,
    title: 'Importacion y exportacion',
    description: 'Herramientas para gestionar compraventas internacionales de principio a fin.',
  },
];

function InputField({
  label,
  icon: Icon,
  ...props
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label className="block text-sm font-body font-medium text-brand-navy mb-1.5">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
        )}
        <input className={`input ${Icon ? 'pl-10' : ''}`} {...props} />
      </div>
    </div>
  );
}

export default function DemoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    companyType: '',
    message: '',
  });

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const canSubmit = formData.name && formData.email && formData.company;

  return (
    <section className="bg-brand-alt-bg min-h-screen py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-1.5 bg-pastel-purple text-brand-indigo text-sm font-heading font-bold px-4 py-1.5 rounded-full mb-4">
            <Play className="w-3.5 h-3.5" />
            Demo en vivo
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-indigo mb-3">
            Descubre VEHIQ en accion
          </h1>
          <p className="text-brand-muted font-body text-lg max-w-2xl mx-auto">
            Solicita una demostracion personalizada y te mostraremos como VEHIQ puede transformar tu negocio de vehiculos.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left — benefits */}
          <div className="space-y-6">
            <h2 className="text-xl font-heading font-bold text-brand-indigo">
              Que veras en la demo
            </h2>
            <div className="space-y-4">
              {DEMO_BENEFITS.map((b) => (
                <div key={b.title} className="flex gap-4 p-4 bg-white rounded-card border border-brand-border">
                  <div className="w-10 h-10 rounded-button bg-pastel-mint flex items-center justify-center flex-shrink-0">
                    <b.icon className="w-5 h-5 text-brand-teal" />
                  </div>
                  <div>
                    <h3 className="font-heading font-bold text-brand-navy text-sm mb-0.5">
                      {b.title}
                    </h3>
                    <p className="text-sm text-brand-muted font-body leading-relaxed">
                      {b.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-5 bg-pastel-blue rounded-card">
              <p className="text-sm font-body text-brand-indigo leading-relaxed">
                <strong className="font-heading">Sin compromiso.</strong> La demo dura unos 30 minutos y esta adaptada a tu tipo de negocio. Un especialista te guiara por las funciones mas relevantes para ti.
              </p>
            </div>
          </div>

          {/* Right — form */}
          <div className="bg-white rounded-card border border-brand-border shadow-sm p-6 md:p-8">
            {!submitted ? (
              <>
                <h2 className="text-lg font-heading font-bold text-brand-indigo mb-1">
                  Reserva tu demo
                </h2>
                <p className="text-sm text-brand-muted mb-6 font-body">
                  Te contactaremos en menos de 24 horas para agendar la sesion.
                </p>

                <div className="space-y-4">
                  <InputField label="Nombre completo *" icon={User} placeholder="Juan Garcia" value={formData.name} onChange={(e) => update('name', e.target.value)} required />
                  <InputField label="Email corporativo *" icon={Mail} type="email" placeholder="juan@empresa.com" value={formData.email} onChange={(e) => update('email', e.target.value)} required />
                  <InputField label="Empresa *" icon={Building2} placeholder="AutoMax S.L." value={formData.company} onChange={(e) => update('company', e.target.value)} required />
                  <InputField label="Telefono" icon={Phone} type="tel" placeholder="+34 600 000 000" value={formData.phone} onChange={(e) => update('phone', e.target.value)} />

                  <div>
                    <label className="block text-sm font-body font-medium text-brand-navy mb-1.5">Tipo de empresa</label>
                    <div className="relative">
                      <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
                      <select
                        className="input appearance-none bg-white pl-10"
                        value={formData.companyType}
                        onChange={(e) => update('companyType', e.target.value)}
                      >
                        <option value="">Seleccionar...</option>
                        {COMPANY_TYPES.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-body font-medium text-brand-navy mb-1.5">Mensaje (opcional)</label>
                    <div className="relative">
                      <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-brand-muted pointer-events-none" />
                      <textarea
                        className="input pl-10 min-h-[100px] resize-y"
                        placeholder="Cuentanos que te gustaria ver en la demo..."
                        value={formData.message}
                        onChange={(e) => update('message', e.target.value)}
                      />
                    </div>
                  </div>

                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full"
                    disabled={!canSubmit}
                    onClick={() => setSubmitted(true)}
                  >
                    Solicitar demo gratuita
                  </Button>

                  <p className="text-xs text-brand-muted text-center font-body">
                    Al enviar, aceptas nuestra{' '}
                    <Link href="/privacy" className="underline hover:text-brand-indigo">politica de privacidad</Link>.
                  </p>
                </div>
              </>
            ) : (
              <div className="text-center py-8">
                <div className="w-14 h-14 bg-pastel-mint rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-7 h-7 text-brand-teal" />
                </div>
                <h2 className="text-xl font-heading font-extrabold text-brand-indigo mb-2">
                  Solicitud recibida
                </h2>
                <p className="text-brand-muted font-body mb-1">
                  Nos pondremos en contacto contigo en menos de 24 horas para programar tu demo.
                </p>
                <p className="text-sm text-brand-muted mb-6">
                  Hemos enviado una confirmacion a <strong className="text-brand-navy">{formData.email}</strong>.
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 rounded-button px-6 py-2.5 text-brand-indigo font-heading font-bold hover:bg-brand-indigo/5 transition-colors"
                >
                  Volver al inicio
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
