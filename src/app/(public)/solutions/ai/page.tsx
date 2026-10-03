import { Metadata } from 'next';
import {
  Bot, MessageSquare, Sparkles, Workflow, Brain, Search, Bell, Lightbulb,
} from 'lucide-react';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'Asistente IA Automotriz | VEHIQ',
  description: 'Asistente de inteligencia artificial para el sector automotriz: consultas en lenguaje natural, recomendaciones y automatizacion.',
};

const benefits = [
  { icon: MessageSquare, title: 'Consultas en lenguaje natural', desc: 'Pregunta en espanol lo que necesites: "¿Que coches tengo con mas de 60 dias en stock?" y obtiene respuestas instantaneas.' },
  { icon: Sparkles, title: 'Recomendaciones inteligentes', desc: 'Sugerencias de precio, canales de venta y acciones comerciales basadas en patrones del mercado y tu historico.' },
  { icon: Workflow, title: 'Automatizacion de tareas', desc: 'Automatiza procesos repetitivos: alertas de ITV, recordatorios de seguimiento, generacion de informes periodicos.' },
  { icon: Brain, title: 'Aprendizaje continuo', desc: 'El asistente aprende de tus patrones de uso, preferencias comerciales y tendencias del mercado espanol.' },
];

const steps = [
  { step: '01', title: 'Haz tu pregunta', desc: 'Escribe o dicta tu consulta en espanol. El asistente entiende terminologia automotriz: bastidor, IEDMT, ficha reducida, COC...' },
  { step: '02', title: 'Analisis inteligente', desc: 'El asistente cruza datos de tu inventario, mercado, tramites y documentacion para generar una respuesta contextualizada.' },
  { step: '03', title: 'Accion inmediata', desc: 'Recibe la respuesta con opciones de accion directa: generar informe, ajustar precio, enviar presupuesto o programar tarea.' },
];

const features = [
  'Chat en lenguaje natural en espanol',
  'Busqueda inteligente en todo tu inventario',
  'Analisis predictivo de demanda por modelo',
  'Sugerencias de precio de venta optimizado',
  'Generacion automatica de descripciones de anuncios',
  'Alertas proactivas de oportunidades de mercado',
  'Resumen diario de actividad y KPIs',
  'Automatizacion de tareas recurrentes',
  'Respuestas contextualizadas a normativa espanola',
  'Integracion con WhatsApp Business para atencion al cliente',
];

const integrations = [
  { icon: Search, title: 'Datos de VEHIQ', desc: 'El asistente accede a todo tu ecosistema VEHIQ: inventario, ventas, tramites, informes y datos de mercado.' },
  { icon: Bell, title: 'Notificaciones proactivas', desc: 'Alertas inteligentes por email, app movil o panel cuando detecta oportunidades, riesgos o tareas pendientes.' },
  { icon: Lightbulb, title: 'Base de conocimiento', desc: 'Normativa DGT actualizada, requisitos de importacion, fiscalidad automotriz y procedimientos administrativos.' },
];

export default function AiPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-mint">
              <Bot className="w-7 h-7 text-brand-teal" />
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Asistente IA Automotriz
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Tu copiloto inteligente para el negocio automotriz. Consultas en lenguaje natural, recomendaciones basadas en datos y automatizacion de tareas repetitivas.
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
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pastel-purple flex items-center justify-center">
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
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Integraciones</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {integrations.map((i) => (
              <div key={i.title} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pastel-peach flex items-center justify-center">
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
        heading="Descubre el poder de la IA automotriz"
        subheading="Precio bajo consulta. Prueba el asistente inteligente que transforma tu forma de trabajar."
        primaryLabel="Solicitar demo"
        primaryHref="/pricing-request"
        secondaryLabel="Ver soluciones"
        secondaryHref="/solutions"
      />
    </>
  );
}
