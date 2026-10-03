'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  User,
  Mail,
  Phone,
  Globe,
  MapPin,
  Hash,
  FileText,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Users,
  MapPinned,
  Link as LinkIcon,
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

const INTEREST_OPTIONS = [
  'Datos de vehiculos',
  'Informes vehiculares',
  'Valoracion',
  'Importacion',
  'Exportacion',
  'Registro',
  'Plataforma dealer',
  'Publicidad',
  'Administracion',
  'API',
  'IA',
  'Marketplace',
  'Flotas',
  'Otro',
];

const VOLUME_RANGES = [
  'Menos de 50',
  '50 - 200',
  '200 - 500',
  '500 - 1.000',
  '1.000 - 5.000',
  'Mas de 5.000',
];

const STEP_LABELS = ['Empresa', 'Intereses', 'Detalles', 'Confirmacion'];

function ProgressBar({ currentStep }: { currentStep: number }) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-3">
        {STEP_LABELS.map((label, i) => {
          const step = i + 1;
          const isActive = step === currentStep;
          const isComplete = step < currentStep;
          return (
            <div key={label} className="flex flex-col items-center flex-1">
              <div
                className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-heading font-bold transition-colors duration-300 ${
                  isComplete
                    ? 'bg-brand-teal text-white'
                    : isActive
                      ? 'bg-brand-indigo text-white'
                      : 'bg-brand-border text-brand-muted'
                }`}
              >
                {isComplete ? <CheckCircle2 className="w-5 h-5" /> : step}
              </div>
              <span
                className={`mt-1.5 text-xs font-body ${
                  isActive ? 'text-brand-indigo font-semibold' : 'text-brand-muted'
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="h-1.5 bg-brand-border rounded-full overflow-hidden">
        <div
          className="h-full bg-brand-teal rounded-full transition-all duration-500 ease-out"
          style={{ width: `${((currentStep - 1) / (STEP_LABELS.length - 1)) * 100}%` }}
        />
      </div>
    </div>
  );
}

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
        <input
          className={`input ${Icon ? 'pl-10' : ''}`}
          {...props}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  icon: Icon,
  options,
  ...props
}: {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  options: string[];
} & React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <div>
      <label className="block text-sm font-body font-medium text-brand-navy mb-1.5">{label}</label>
      <div className="relative">
        {Icon && (
          <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
        )}
        <select
          className={`input appearance-none bg-white ${Icon ? 'pl-10' : ''}`}
          {...props}
        >
          <option value="">Seleccionar...</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function PricingRequestPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    companyType: '',
    vehicleCount: '',
    employeeCount: '',
    locationCount: '',
    website: '',
    taxId: '',
    interests: [] as string[],
    monthlyVolume: '',
    message: '',
  });

  const update = (field: string, value: string | string[]) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const toggleInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const canAdvance = () => {
    if (step === 1) return formData.companyName && formData.firstName && formData.email && formData.companyType;
    if (step === 2) return formData.interests.length > 0;
    if (step === 3) return true;
    return false;
  };

  return (
    <section className="bg-brand-alt-bg min-h-screen py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-extrabold text-brand-indigo mb-3">
            Solicitar precios
          </h1>
          <p className="text-brand-muted font-body text-lg">
            Completa el formulario y recibiras una propuesta personalizada en menos de 24 horas.
          </p>
        </div>

        <div className="bg-white rounded-card border border-brand-border shadow-sm p-6 md:p-10">
          <ProgressBar currentStep={step} />

          {/* Step 1 — Company info */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in">
              <h2 className="text-xl font-heading font-bold text-brand-indigo mb-1">
                Informacion de la empresa
              </h2>
              <p className="text-sm text-brand-muted mb-4">
                Cuentanos sobre tu empresa para ofrecerte la mejor solucion.
              </p>

              <InputField label="Nombre de la empresa *" icon={Building2} placeholder="Ej. AutoMax S.L." value={formData.companyName} onChange={(e) => update('companyName', e.target.value)} required />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Nombre *" icon={User} placeholder="Juan" value={formData.firstName} onChange={(e) => update('firstName', e.target.value)} required />
                <InputField label="Apellidos" placeholder="Garcia Lopez" value={formData.lastName} onChange={(e) => update('lastName', e.target.value)} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Email corporativo *" icon={Mail} type="email" placeholder="juan@empresa.com" value={formData.email} onChange={(e) => update('email', e.target.value)} required />
                <InputField label="Telefono" icon={Phone} type="tel" placeholder="+34 600 000 000" value={formData.phone} onChange={(e) => update('phone', e.target.value)} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Pais" icon={Globe} placeholder="Espana" value={formData.country} onChange={(e) => update('country', e.target.value)} />
                <InputField label="Ciudad" icon={MapPin} placeholder="Madrid" value={formData.city} onChange={(e) => update('city', e.target.value)} />
              </div>

              <SelectField label="Tipo de empresa *" icon={Briefcase} options={COMPANY_TYPES} value={formData.companyType} onChange={(e) => update('companyType', e.target.value)} required />

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <InputField label="Num. vehiculos" icon={Hash} type="number" placeholder="150" value={formData.vehicleCount} onChange={(e) => update('vehicleCount', e.target.value)} />
                <InputField label="Num. empleados" icon={Users} type="number" placeholder="25" value={formData.employeeCount} onChange={(e) => update('employeeCount', e.target.value)} />
                <InputField label="Num. sedes" icon={MapPinned} type="number" placeholder="3" value={formData.locationCount} onChange={(e) => update('locationCount', e.target.value)} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="Sitio web" icon={LinkIcon} placeholder="https://www.empresa.com" value={formData.website} onChange={(e) => update('website', e.target.value)} />
                <InputField label="CIF / NIF" icon={FileText} placeholder="B12345678" value={formData.taxId} onChange={(e) => update('taxId', e.target.value)} />
              </div>
            </div>
          )}

          {/* Step 2 — Interest selection */}
          {step === 2 && (
            <div className="space-y-5 animate-in fade-in">
              <h2 className="text-xl font-heading font-bold text-brand-indigo mb-1">
                Que soluciones te interesan?
              </h2>
              <p className="text-sm text-brand-muted mb-4">
                Selecciona todas las areas que sean relevantes para tu negocio.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {INTEREST_OPTIONS.map((interest) => {
                  const selected = formData.interests.includes(interest);
                  return (
                    <button
                      key={interest}
                      type="button"
                      onClick={() => toggleInterest(interest)}
                      className={`flex items-center gap-3 p-3.5 rounded-button border text-left text-sm font-body transition-all duration-200 ${
                        selected
                          ? 'border-brand-teal bg-pastel-mint text-brand-teal font-semibold'
                          : 'border-brand-border bg-white text-brand-body hover:border-brand-teal/40'
                      }`}
                    >
                      <span
                        className={`w-5 h-5 rounded flex-shrink-0 flex items-center justify-center border-2 transition-colors ${
                          selected ? 'bg-brand-teal border-brand-teal' : 'border-brand-border'
                        }`}
                      >
                        {selected && (
                          <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                            <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      {interest}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 3 — Additional info */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <h2 className="text-xl font-heading font-bold text-brand-indigo mb-1">
                Detalles adicionales
              </h2>
              <p className="text-sm text-brand-muted mb-4">
                Ayudanos a entender mejor tus necesidades.
              </p>

              <SelectField
                label="Volumen mensual estimado de transacciones"
                options={VOLUME_RANGES}
                value={formData.monthlyVolume}
                onChange={(e) => update('monthlyVolume', e.target.value)}
              />

              <div>
                <label className="block text-sm font-body font-medium text-brand-navy mb-1.5">
                  Mensaje adicional
                </label>
                <textarea
                  className="input min-h-[140px] resize-y"
                  placeholder="Cuentanos mas sobre tu proyecto, necesidades especificas, integraciones requeridas..."
                  value={formData.message}
                  onChange={(e) => update('message', e.target.value)}
                />
              </div>
            </div>
          )}

          {/* Step 4 — Confirmation */}
          {step === 4 && (
            <div className="text-center py-10 animate-in fade-in">
              <div className="w-16 h-16 bg-pastel-mint rounded-full flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-8 h-8 text-brand-teal" />
              </div>
              <h2 className="text-2xl font-heading font-extrabold text-brand-indigo mb-3">
                Gracias por tu solicitud
              </h2>
              <p className="text-brand-muted font-body text-lg max-w-md mx-auto mb-2">
                Nos pondremos en contacto en menos de 24 horas con una propuesta adaptada a tus necesidades.
              </p>
              <p className="text-sm text-brand-muted mb-8">
                Hemos enviado una confirmacion a <strong className="text-brand-navy">{formData.email}</strong>.
              </p>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-button px-8 py-3 bg-brand-teal text-white font-heading font-bold hover:bg-brand-teal/90 transition-colors"
              >
                Volver al inicio
              </Link>
            </div>
          )}

          {/* Navigation buttons */}
          {step < 4 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-border">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="flex items-center gap-1.5 text-brand-muted hover:text-brand-indigo font-body text-sm transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Anterior
                </button>
              ) : (
                <span />
              )}
              <Button
                variant="primary"
                size="md"
                disabled={!canAdvance()}
                onClick={() => setStep(step + 1)}
              >
                {step === 3 ? 'Enviar solicitud' : 'Siguiente'}
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-brand-muted mt-6 font-body">
          Tus datos estan protegidos. Consulta nuestra{' '}
          <Link href="/privacy" className="underline hover:text-brand-indigo">politica de privacidad</Link>.
        </p>
      </div>
    </section>
  );
}
