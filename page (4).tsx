'use client';

import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, CheckCircle, ChevronDown, Send, Building2, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const officeInfo = [
  { icon: MapPin, label: 'Direccion', value: 'Calle de Serrano 45, 28001 Madrid, Espana' },
  { icon: Phone, label: 'Telefono', value: '+34 910 123 456' },
  { icon: Mail, label: 'Email', value: 'info@vehiq.es' },
  { icon: Clock, label: 'Horario', value: 'Lunes a Viernes, 9:00 - 18:00 CET' },
];

const consultaOptions = [
  'Informacion general',
  'Solicitar demo',
  'Planes y precios',
  'Soporte tecnico',
  'Colaboracion / partnership',
];

const companySizeOptions = [
  '1-10 empleados',
  '11-50',
  '51-200',
  '201-1000',
  '1000+',
];

const faqItems = [
  {
    question: 'Cuanto tiempo tarda la respuesta?',
    answer: 'Nuestro equipo responde en un plazo maximo de 24 horas laborables.',
  },
  {
    question: 'Ofreceis periodo de prueba?',
    answer: 'Si, ofrecemos 14 dias gratis sin compromiso para que pruebes todas las funcionalidades.',
  },
  {
    question: 'Que planes teneis disponibles?',
    answer: 'Disponemos de tres planes: Starter, Professional y Enterprise, adaptados a diferentes necesidades.',
  },
  {
    question: 'Puedo solicitar una demo personalizada?',
    answer: 'Si, selecciona "Solicitar demo" en el tipo de consulta del formulario y nos pondremos en contacto contigo.',
  },
];

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
  consulta?: string;
  privacy?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const spanishPhoneRegex = /^(\+34\s?)?(6|7|9)\d{8}$/;

function validateForm(data: {
  name: string;
  email: string;
  phone: string;
  message: string;
  consulta: string;
  privacy: boolean;
}): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) {
    errors.name = 'El nombre es obligatorio';
  } else if (data.name.trim().length < 2) {
    errors.name = 'El nombre debe tener al menos 2 caracteres';
  }

  if (!data.email.trim()) {
    errors.email = 'El email es obligatorio';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Introduce un email valido';
  }

  if (data.phone.trim() && !spanishPhoneRegex.test(data.phone.replace(/\s/g, ''))) {
    errors.phone = 'Introduce un telefono valido (+34 o que empiece por 6, 7 o 9)';
  }

  if (!data.message.trim()) {
    errors.message = 'El mensaje es obligatorio';
  } else if (data.message.trim().length < 10) {
    errors.message = 'El mensaje debe tener al menos 10 caracteres';
  }

  if (!data.consulta) {
    errors.consulta = 'Selecciona un tipo de consulta';
  }

  if (!data.privacy) {
    errors.privacy = 'Debes aceptar la politica de privacidad';
  }

  return errors;
}

function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqItems.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className="rounded-card border border-brand-border bg-white overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex w-full items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-semibold text-brand-navy text-sm">{item.question}</span>
              <ChevronDown
                className={`w-4 h-4 text-brand-muted flex-shrink-0 transition-transform duration-200 ${
                  isOpen ? 'rotate-180' : ''
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-4 text-sm text-brand-muted leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [consulta, setConsulta] = useState('');
  const [companySize, setCompanySize] = useState('');
  const [message, setMessage] = useState('');
  const [privacy, setPrivacy] = useState(false);

  const inputBase =
    'mt-1 w-full rounded-button border px-4 py-2.5 text-brand-body outline-none transition-colors focus:border-brand-teal focus:ring-1 focus:ring-brand-teal';

  function inputClass(field: keyof FormErrors) {
    return `${inputBase} ${errors[field] ? 'border-red-400 bg-red-50/40' : 'border-brand-border'}`;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validateForm({ name, email, phone, message, consulta, privacy });
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  }

  function handleReset() {
    setSubmitted(false);
    setErrors({});
    setName('');
    setEmail('');
    setPhone('');
    setCompany('');
    setConsulta('');
    setCompanySize('');
    setMessage('');
    setPrivacy(false);
  }

  return (
    <>
      {/* Hero */}
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

      {/* Form + Sidebar */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 lg:grid-cols-2">
          {/* Left column: form */}
          <div>
            <h2 className="font-heading font-extrabold text-2xl text-brand-navy">Enviar mensaje</h2>

            {submitted ? (
              <div className="mt-6 rounded-card bg-pastel-mint border border-brand-teal/20 p-10 text-center">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-brand-teal/10">
                  <CheckCircle className="h-8 w-8 text-brand-teal" />
                </div>
                <p className="mt-5 font-heading font-bold text-xl text-brand-navy">
                  Mensaje enviado correctamente
                </p>
                <p className="mt-2 text-brand-muted leading-relaxed">
                  Gracias por contactar con nosotros. Nuestro equipo revisara tu consulta y te
                  respondera en un plazo maximo de <strong className="text-brand-navy">24 horas laborables</strong>.
                </p>
                <p className="mt-1 text-sm text-brand-muted">
                  Revisa tu bandeja de entrada (y la carpeta de spam) para nuestra respuesta.
                </p>
                <Button type="button" size="lg" className="mt-6" onClick={handleReset}>
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form className="mt-6 space-y-5" onSubmit={handleSubmit} noValidate>
                {/* Tipo de consulta */}
                <div>
                  <label htmlFor="consulta" className="block text-sm font-semibold text-brand-navy">
                    Tipo de consulta <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="consulta"
                      value={consulta}
                      onChange={(e) => setConsulta(e.target.value)}
                      className={`${inputClass('consulta')} appearance-none pr-10`}
                    >
                      <option value="">Selecciona una opcion</option>
                      {consultaOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 h-4 w-4 text-brand-muted" />
                  </div>
                  {errors.consulta && <p className="mt-1 text-sm text-red-600">{errors.consulta}</p>}
                </div>

                {/* Name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-brand-navy">
                    Nombre completo <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass('name')}
                    placeholder="Tu nombre"
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-brand-navy">
                    Email profesional <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass('email')}
                    placeholder="tu@empresa.com"
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                </div>

                {/* Company + Phone row */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-brand-navy">
                      Empresa
                    </label>
                    <input
                      id="company"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className={`${inputBase} border-brand-border`}
                      placeholder="Nombre de tu empresa"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-brand-navy">
                      Telefono
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className={inputClass('phone')}
                      placeholder="+34 600 000 000"
                    />
                    {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                  </div>
                </div>

                {/* Company size */}
                <div>
                  <label className="block text-sm font-semibold text-brand-navy">
                    <span className="flex items-center gap-1.5">
                      <Users className="h-3.5 w-3.5" />
                      Tamano de empresa
                    </span>
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {companySizeOptions.map((size) => (
                      <label
                        key={size}
                        className={`cursor-pointer rounded-button border px-3.5 py-1.5 text-sm transition-colors ${
                          companySize === size
                            ? 'border-brand-teal bg-brand-teal/10 text-brand-teal font-semibold'
                            : 'border-brand-border text-brand-muted hover:border-brand-teal/40'
                        }`}
                      >
                        <input
                          type="radio"
                          name="companySize"
                          value={size}
                          checked={companySize === size}
                          onChange={(e) => setCompanySize(e.target.value)}
                          className="sr-only"
                        />
                        {size}
                      </label>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-brand-navy">
                    Mensaje <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClass('message')} resize-none`}
                    placeholder="Cuentanos en que podemos ayudarte..."
                  />
                  {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                </div>

                {/* Privacy checkbox */}
                <div>
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={privacy}
                      onChange={(e) => setPrivacy(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-brand-border text-brand-teal focus:ring-brand-teal"
                    />
                    <span className="text-sm text-brand-muted leading-snug">
                      Acepto la politica de privacidad y el tratamiento de mis datos personales <span className="text-red-500">*</span>
                    </span>
                  </label>
                  {errors.privacy && <p className="mt-1 ml-7 text-sm text-red-600">{errors.privacy}</p>}
                </div>

                <Button type="submit" size="lg">
                  <Send className="mr-2 h-4 w-4" />
                  Enviar mensaje
                </Button>
              </form>
            )}
          </div>

          {/* Right column: office info */}
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
              <p className="text-brand-muted text-sm">Mapa de ubicacion -- Madrid, Espana</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-brand-border bg-brand-alt-bg py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="font-heading font-extrabold text-2xl text-brand-navy">
              Preguntas frecuentes
            </h2>
            <p className="mt-2 text-brand-muted">
              Respuestas a las dudas mas habituales sobre VEHIQ
            </p>
          </div>
          <div className="mt-8">
            <FAQAccordion />
          </div>
        </div>
      </section>
    </>
  );
}
