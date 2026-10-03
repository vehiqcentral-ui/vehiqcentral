import { Metadata } from 'next';
import {
  LayoutDashboard, BarChart3, Bell, Users, Layers, Zap, Shield, Globe,
} from 'lucide-react';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'MiVEHIQ — Panel Central | VEHIQ',
  description: 'Tu centro de mando para gestionar todo tu negocio automotriz desde una unica plataforma.',
};

const benefits = [
  { icon: BarChart3, title: 'Vision 360 de tu negocio', desc: 'Metricas clave, KPIs de ventas, stock activo y rendimiento de tu equipo en tiempo real.' },
  { icon: Bell, title: 'Alertas inteligentes', desc: 'Notificaciones sobre cambios de precios, documentos pendientes y oportunidades de mercado.' },
  { icon: Users, title: 'Gestion de equipo', desc: 'Permisos por rol, actividad de usuarios y productividad individual de cada comercial.' },
  { icon: Layers, title: 'Modulos integrados', desc: 'Acceso a todos los modulos de VEHIQ desde un unico punto de entrada personalizable.' },
];

const steps = [
  { step: '01', title: 'Configura tu espacio', desc: 'Define tu empresa, sedes, usuarios y permisos. Personaliza tu dashboard con los widgets que necesitas.' },
  { step: '02', title: 'Conecta tus datos', desc: 'Importa tu inventario, conecta tus portales de venta y sincroniza con la DGT automaticamente.' },
  { step: '03', title: 'Gestiona desde el panel', desc: 'Controla ventas, stock, tramites y publicidad desde una interfaz unificada con informes en tiempo real.' },
];

const features = [
  'Dashboard personalizable con drag & drop',
  'Widgets de KPIs: ventas, margen, rotacion de stock',
  'Centro de notificaciones y tareas pendientes',
  'Gestion multi-sede y multi-usuario',
  'Registro de actividad y auditoria completa',
  'Busqueda global por matricula, bastidor o cliente',
  'Acceso rapido a todos los modulos VEHIQ',
  'Modo oscuro y adaptacion movil completa',
];

const integrations = [
  { icon: Globe, title: 'Portales de venta', desc: 'Sincronizacion automatica con Coches.net, Milanuncios, AutoScout24 y mas.' },
  { icon: Zap, title: 'Sistemas externos', desc: 'Conecta con tu DMS, CRM o ERP existente via API o integraciones nativas.' },
  { icon: Shield, title: 'DGT y Trafico', desc: 'Consultas en tiempo real a la Direccion General de Trafico para datos oficiales de vehiculos.' },
];

export default function PlatformPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-purple">
              <LayoutDashboard className="w-7 h-7 text-brand-indigo" />
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              MiVEHIQ
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Tu centro de mando automotriz. Gestiona stock, ventas, tramites y publicidad desde un unico panel inteligente con datos en tiempo real.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Beneficios clave</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {benefits.map((b) => (
              <div key={b.title} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pastel-mint flex items-center justify-center">
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

      {/* How it works */}
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

      {/* Features */}
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

      {/* Integrations */}
      <section className="bg-brand-alt-bg py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Integraciones</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {integrations.map((i) => (
              <div key={i.title} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pastel-blue flex items-center justify-center">
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
        heading="Empieza a gestionar con MiVEHIQ"
        subheading="Precio bajo consulta. Solicita una demo y descubre como centralizar tu negocio."
        primaryLabel="Solicitar demo"
        primaryHref="/pricing-request"
        secondaryLabel="Ver todas las soluciones"
        secondaryHref="/solutions"
      />
    </>
  );
}
