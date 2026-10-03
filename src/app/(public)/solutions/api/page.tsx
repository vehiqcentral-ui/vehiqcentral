import { Metadata } from 'next';
import {
  Code, Webhook, Database, BookOpen, Lock, Zap, Server, GitBranch,
} from 'lucide-react';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'API y Datos | VEHIQ',
  description: 'REST API, webhooks, datos en lote y portal para desarrolladores. Integra VEHIQ en tu sistema.',
};

const benefits = [
  { icon: Zap, title: 'REST API completa', desc: 'Endpoints documentados para todos los modulos de VEHIQ: vehiculos, tasaciones, informes, tramites e inventario.' },
  { icon: Webhook, title: 'Webhooks en tiempo real', desc: 'Recibe notificaciones automaticas cuando cambia el estado de un vehiculo, se completa un tramite o se genera un lead.' },
  { icon: Database, title: 'Datos en lote', desc: 'Endpoints de bulk para importar y exportar grandes volumenes de datos: inventarios completos, listados de precios y catalogos.' },
  { icon: BookOpen, title: 'Portal de desarrolladores', desc: 'Documentacion interactiva con ejemplos en curl, Python, Node.js y PHP. Sandbox de pruebas con datos ficticios.' },
];

const steps = [
  { step: '01', title: 'Solicita tus credenciales', desc: 'Registrate en el portal de desarrolladores. Recibe tu API key y acceso al entorno sandbox para pruebas.' },
  { step: '02', title: 'Integra con tu sistema', desc: 'Usa nuestra documentacion interactiva y SDKs para conectar VEHIQ con tu DMS, web, app movil o ERP.' },
  { step: '03', title: 'Escala con confianza', desc: 'Monitoriza uso, latencia y errores desde tu panel de API. Soporte tecnico dedicado para integraciones complejas.' },
];

const features = [
  'Autenticacion OAuth 2.0 y API keys',
  'Rate limiting configurable por plan',
  'Versionado de API con compatibilidad hacia atras',
  'Respuestas en JSON con paginacion cursor-based',
  'Filtros avanzados y ordenacion en todas las colecciones',
  'Webhooks con firma HMAC para verificacion',
  'SDKs oficiales en Python, Node.js y PHP',
  'Entorno sandbox con datos de prueba',
  'Logs de peticiones y dashboard de uso',
  'Soporte para GraphQL en endpoints seleccionados',
];

const integrations = [
  { icon: Server, title: 'Infraestructura robusta', desc: 'API alojada en servidores europeos con SLA del 99.9%. Latencia media inferior a 200ms para consultas estandar.' },
  { icon: Lock, title: 'Seguridad certificada', desc: 'Cifrado TLS 1.3, tokens con expiracion configurable y registro de auditoria de todas las llamadas a la API.' },
  { icon: GitBranch, title: 'Entorno de desarrollo', desc: 'Sandbox completo con datos ficticios, herramientas de depuracion y webhook testing integrado.' },
];

export default function ApiPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-peach">
              <Code className="w-7 h-7 text-brand-indigo" />
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              API y Soluciones de Datos
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Integra los datos y servicios de VEHIQ en tu propio sistema. REST API completa, webhooks, datos en lote y un portal de desarrolladores con documentacion interactiva.
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
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Infraestructura</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {integrations.map((i) => (
              <div key={i.title} className="flex gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-pastel-mint flex items-center justify-center">
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
        heading="Integra VEHIQ en tu ecosistema"
        subheading="Precio bajo consulta. Accede al portal de desarrolladores y empieza a construir hoy."
        primaryLabel="Solicitar acceso API"
        primaryHref="/pricing-request"
        secondaryLabel="Ver soluciones"
        secondaryHref="/solutions"
      />
    </>
  );
}
