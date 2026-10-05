import { Metadata } from 'next';
import { Code, Key, Gauge, Layers, ShieldCheck, Zap, BookOpen, Terminal, CheckCircle2, Lock, FileCode, AlertTriangle, Webhook } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CTASection } from '@/components/public/CTASection';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const ApiPlayground = dynamic(() => import('./ApiPlayground').then(m => ({ default: m.ApiPlayground })), { ssr: false });

export const metadata: Metadata = {
  title: 'API de Datos Vehiculares | VEHIQ',
  description: 'Documentacion de la API REST de VEHIQ: endpoints de vehiculos, valoraciones, fraude y mercado. Integra datos vehiculares en tu aplicacion.',
};

const sections = [
  { icon: Layers, title: 'API REST', desc: 'API RESTful con respuestas en JSON. Compatible con cualquier lenguaje de programación y framework.', accent: 'bg-pastel-blue text-brand-indigo' },
  { icon: Key, title: 'Autenticación', desc: 'Autenticación segura mediante API keys con permisos granulares por endpoint y entorno (sandbox/producción).', accent: 'bg-pastel-peach text-amber-600' },
  { icon: Gauge, title: 'Rate Limits', desc: 'Límites generosos adaptados a tu plan. Desde 100 req/min en el plan básico hasta límites personalizados para enterprise.', accent: 'bg-pastel-mint text-brand-teal' },
  { icon: ShieldCheck, title: 'HTTPS y Seguridad', desc: 'Todas las comunicaciones cifradas con TLS 1.3. Cumplimiento GDPR y protección de datos personales.', accent: 'bg-pastel-purple text-brand-indigo' },
];

const endpoints = [
  {
    method: 'GET',
    path: '/v1/vehicles/{vin}',
    desc: 'Datos completos del vehículo: marca, modelo, especificaciones técnicas y decodificación VIN.',
    params: ['vin (string) — VIN del vehículo (17 caracteres)'],
    status: '200 OK',
  },
  {
    method: 'GET',
    path: '/v1/vehicles/{vin}/history',
    desc: 'Historial completo: propietarios, ITV, siniestros, kilometraje y cargas financieras.',
    params: ['vin (string) — VIN del vehículo', 'include (string, optional) — Secciones: itv,owners,accidents'],
    status: '200 OK',
  },
  {
    method: 'GET',
    path: '/v1/valuations/{vin}',
    desc: 'Valoración de mercado con rango de precios, comparables y tendencia de precio.',
    params: ['vin (string) — VIN del vehículo', 'mileage_km (number, optional) — Kilometraje actual'],
    status: '200 OK',
  },
  {
    method: 'GET',
    path: '/v1/fraud/check/{vin}',
    desc: 'Verificación de fraude: kilometraje, siniestros ocultos, cargas y alertas.',
    params: ['vin (string) — VIN del vehículo'],
    status: '200 OK',
  },
  {
    method: 'GET',
    path: '/v1/market/prices',
    desc: 'Datos de mercado: precios por segmento, marca, modelo y comunidad autónoma.',
    params: ['make (string) — Marca', 'model (string, optional) — Modelo', 'year (number, optional) — Año'],
    status: '200 OK',
  },
  {
    method: 'POST',
    path: '/v1/reports/generate',
    desc: 'Genera un informe PDF completo del vehículo para descarga o envío.',
    params: ['vin (string) — VIN del vehículo', 'format (string) — pdf o html', 'sections (array, optional) — Secciones a incluir'],
    status: '201 Created',
  },
];

const sdks = [
  { name: 'Python', version: 'vehiq-python v2.1', install: 'pip install vehiq', color: 'bg-pastel-blue text-brand-indigo' },
  { name: 'Node.js', version: 'vehiq-node v2.0', install: 'npm install @vehiq/sdk', color: 'bg-pastel-mint text-brand-teal' },
  { name: 'PHP', version: 'vehiq-php v1.4', install: 'composer require vehiq/sdk', color: 'bg-pastel-purple text-brand-indigo' },
  { name: 'Java', version: 'vehiq-java v1.2', install: 'Maven: com.vehiq:sdk:1.2', color: 'bg-pastel-peach text-amber-600' },
];

const rateLimits = [
  { plan: 'Starter', requests: '100 req/min', daily: '5.000/día', price: 'Desde 49€/mes' },
  { plan: 'Professional', requests: '500 req/min', daily: '50.000/día', price: 'Desde 199€/mes' },
  { plan: 'Enterprise', requests: 'Personalizado', daily: 'Sin límite', price: 'Contactar' },
];

export default function ApiDocsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-pastel-blue">
              <Terminal className="w-7 h-7 text-brand-indigo" />
            </div>
            <h1 className="mt-6 font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              API de Datos Vehiculares
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Integra datos vehiculares en tu aplicación con nuestra API REST. Accede a historial, valoraciones, detección de fraude y datos de mercado.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-sm text-brand-muted">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-teal" /> REST + JSON</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-teal" /> Sandbox gratuito</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-teal" /> 99.9% uptime SLA</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-brand-teal" /> Webhooks</span>
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/pricing-request">
                <Button size="lg">Solicitar API key</Button>
              </Link>
              <Link href="/guides">
                <Button size="lg" variant="secondary" className="gap-1.5">
                  <BookOpen size={16} />
                  Guía de inicio
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Características de la API</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {sections.map((s) => (
              <div key={s.title} className="rounded-card bg-white border border-brand-border p-6">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${s.accent}`}>
                  <s.icon className="w-6 h-6" />
                </div>
                <h3 className="mt-4 font-heading font-bold text-lg text-brand-navy">{s.title}</h3>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Autenticacion */}
      <section className="bg-brand-alt-bg py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-pastel-peach">
              <Lock className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Autenticacion</h2>
          </div>
          <p className="mt-3 text-brand-muted max-w-3xl">
            Todas las peticiones a la API requieren una API key valida. Las claves se envian en el header <code className="text-sm bg-white px-2 py-1 rounded-md border border-brand-border font-mono text-brand-navy">X-API-Key</code> de cada solicitud.
          </p>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <h3 className="font-heading font-bold text-lg text-brand-navy">Obtener tu API key</h3>
              <ol className="space-y-3 text-sm text-brand-body">
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-indigo text-white text-xs font-bold flex items-center justify-center">1</span>
                  <span>Registrate en <Link href="/pricing-request" className="text-brand-indigo font-semibold hover:underline">VEHIQ</Link> y accede al panel de desarrollador.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-indigo text-white text-xs font-bold flex items-center justify-center">2</span>
                  <span>Crea un nuevo proyecto y genera tu par de claves (sandbox y produccion).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-indigo text-white text-xs font-bold flex items-center justify-center">3</span>
                  <span>Incluye tu clave en el header <code className="font-mono text-brand-navy bg-gray-100 px-1 rounded">X-API-Key</code> de cada peticion.</span>
                </li>
              </ol>
              <h3 className="font-heading font-bold text-lg text-brand-navy pt-2">Entornos disponibles</h3>
              <div className="space-y-2 text-sm text-brand-body">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-brand-teal mt-0.5 flex-shrink-0" />
                  <span><strong>Sandbox:</strong> <code className="font-mono text-brand-navy bg-gray-100 px-1 rounded">https://sandbox.api.vehiq.es</code> — Datos de prueba, sin coste. Ideal para desarrollo e integracion.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-brand-teal mt-0.5 flex-shrink-0" />
                  <span><strong>Produccion:</strong> <code className="font-mono text-brand-navy bg-gray-100 px-1 rounded">https://api.vehiq.es</code> — Datos reales. Requiere plan activo.</span>
                </div>
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mb-3">Ejemplo de header</p>
              <pre className="rounded-xl bg-gray-900 text-gray-100 p-5 text-sm font-mono overflow-x-auto">
                <code>{`GET /v1/vehicles/WVWZZZ3CZWE123456 HTTP/1.1
Host: api.vehiq.es
X-API-Key: vhq_live_a1b2c3d4e5f6g7h8i9j0
Content-Type: application/json`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Endpoints */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Endpoints principales</h2>
          <p className="mt-3 text-brand-muted">Base URL: <code className="text-sm bg-white px-2 py-1 rounded-md border border-brand-border font-mono text-brand-navy">https://api.vehiq.es</code></p>
          <div className="mt-10 space-y-4">
            {endpoints.map((e) => (
              <details key={e.path} className="group rounded-card bg-white border border-brand-border overflow-hidden">
                <summary className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 p-5 cursor-pointer hover:bg-gray-50/50 transition-colors">
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-button text-xs font-bold font-mono ${e.method === 'POST' ? 'bg-pastel-peach text-amber-700' : 'bg-pastel-mint text-brand-teal'}`}>
                      {e.method}
                    </span>
                    <code className="text-sm font-mono text-brand-navy">{e.path}</code>
                  </div>
                  <p className="text-sm text-brand-muted leading-relaxed flex-1">{e.desc}</p>
                </summary>
                <div className="px-5 pb-5 pt-0 border-t border-brand-border/50">
                  <p className="text-xs font-semibold text-brand-muted uppercase tracking-wider mt-4 mb-2">Parámetros</p>
                  <ul className="space-y-1.5">
                    {e.params.map((param) => (
                      <li key={param} className="text-sm text-brand-body font-mono flex items-start gap-2">
                        <span className="text-brand-teal mt-0.5">•</span>
                        {param}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 text-xs text-brand-muted">Respuesta: <code className="text-brand-teal">{e.status}</code></p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Ejemplos de codigo */}
      <section className="bg-brand-alt-bg py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-pastel-blue">
              <FileCode className="w-5 h-5 text-brand-indigo" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Ejemplos de codigo</h2>
          </div>
          <p className="mt-3 text-brand-muted">Consulta los datos de un vehiculo con una simple peticion GET.</p>
          <div className="mt-10 space-y-6">
            {/* Python */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-button bg-pastel-blue text-brand-indigo text-xs font-bold font-mono">Python</span>
              </div>
              <pre className="rounded-xl bg-gray-900 text-gray-100 p-5 text-sm font-mono overflow-x-auto leading-relaxed">
                <code>{`import requests

url = "https://api.vehiq.es/v1/vehicles/WVWZZZ3CZWE123456"
headers = {
    "X-API-Key": "vhq_live_tu_clave_aqui",
    "Content-Type": "application/json"
}

response = requests.get(url, headers=headers)
data = response.json()

print(data["data"]["marca"])   # Volkswagen
print(data["data"]["modelo"])  # Golf`}</code>
              </pre>
            </div>
            {/* JavaScript */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-button bg-pastel-mint text-brand-teal text-xs font-bold font-mono">JavaScript</span>
              </div>
              <pre className="rounded-xl bg-gray-900 text-gray-100 p-5 text-sm font-mono overflow-x-auto leading-relaxed">
                <code>{`const response = await fetch(
  "https://api.vehiq.es/v1/vehicles/WVWZZZ3CZWE123456",
  {
    headers: {
      "X-API-Key": "vhq_live_tu_clave_aqui",
      "Content-Type": "application/json",
    },
  }
);

const { data } = await response.json();

console.log(data.marca);   // Volkswagen
console.log(data.modelo);  // Golf`}</code>
              </pre>
            </div>
            {/* cURL */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-button bg-pastel-peach text-amber-700 text-xs font-bold font-mono">cURL</span>
              </div>
              <pre className="rounded-xl bg-gray-900 text-gray-100 p-5 text-sm font-mono overflow-x-auto leading-relaxed">
                <code>{`curl -X GET "https://api.vehiq.es/v1/vehicles/WVWZZZ3CZWE123456" \\
  -H "X-API-Key: vhq_live_tu_clave_aqui" \\
  -H "Content-Type: application/json"`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* Esquema de respuesta */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-pastel-mint">
              <Code className="w-5 h-5 text-brand-teal" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Esquema de respuesta</h2>
          </div>
          <p className="mt-3 text-brand-muted">Ejemplo de respuesta JSON para el endpoint <code className="text-sm bg-gray-100 px-2 py-1 rounded-md border border-brand-border font-mono text-brand-navy">/v1/vehicles/{'{vin}'}</code>.</p>
          <div className="mt-8">
            <pre className="rounded-xl bg-gray-900 text-gray-100 p-5 text-sm font-mono overflow-x-auto leading-relaxed">
              <code>{`{
  "success": true,
  "data": {
    "vin": "WVWZZZ3CZWE123456",
    "marca": "Volkswagen",
    "modelo": "Golf",
    "year": 2022,
    "combustible": "Gasolina",
    "potencia_cv": 150,
    "color": "Blanco",
    "provincia": "Madrid",
    "dgt_status": "Alta definitiva"
  }
}`}</code>
            </pre>
          </div>
        </div>
      </section>

      {/* Codigos de error */}
      <section className="bg-brand-alt-bg py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-pastel-peach">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Codigos de error</h2>
          </div>
          <p className="mt-3 text-brand-muted">La API utiliza codigos de estado HTTP estandar. Todas las respuestas de error incluyen un mensaje descriptivo.</p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-border">
                  <th className="text-left py-3 px-4 font-heading font-bold text-brand-navy">Codigo</th>
                  <th className="text-left py-3 px-4 font-heading font-bold text-brand-navy">Estado</th>
                  <th className="text-left py-3 px-4 font-heading font-bold text-brand-navy">Descripcion</th>
                  <th className="text-left py-3 px-4 font-heading font-bold text-brand-navy">Ejemplo de mensaje</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-brand-border/50 bg-white">
                  <td className="py-3 px-4 font-mono font-bold text-amber-600">400</td>
                  <td className="py-3 px-4 text-brand-navy font-semibold">Solicitud invalida</td>
                  <td className="py-3 px-4 text-brand-muted">Los parametros enviados no son validos o faltan campos obligatorios.</td>
                  <td className="py-3 px-4 font-mono text-xs text-brand-body">{'"El campo \'vin\' debe tener 17 caracteres."'}</td>
                </tr>
                <tr className="border-b border-brand-border/50">
                  <td className="py-3 px-4 font-mono font-bold text-amber-600">401</td>
                  <td className="py-3 px-4 text-brand-navy font-semibold">No autorizado</td>
                  <td className="py-3 px-4 text-brand-muted">La API key no fue proporcionada o es invalida.</td>
                  <td className="py-3 px-4 font-mono text-xs text-brand-body">{'"API key invalida o expirada."'}</td>
                </tr>
                <tr className="border-b border-brand-border/50 bg-white">
                  <td className="py-3 px-4 font-mono font-bold text-amber-600">403</td>
                  <td className="py-3 px-4 text-brand-navy font-semibold">Acceso denegado</td>
                  <td className="py-3 px-4 text-brand-muted">Tu plan no incluye acceso a este endpoint o recurso.</td>
                  <td className="py-3 px-4 font-mono text-xs text-brand-body">{'"Tu plan no incluye acceso al endpoint de fraude."'}</td>
                </tr>
                <tr className="border-b border-brand-border/50">
                  <td className="py-3 px-4 font-mono font-bold text-amber-600">404</td>
                  <td className="py-3 px-4 text-brand-navy font-semibold">Recurso no encontrado</td>
                  <td className="py-3 px-4 text-brand-muted">El VIN o recurso solicitado no existe en nuestra base de datos.</td>
                  <td className="py-3 px-4 font-mono text-xs text-brand-body">{'"No se encontro un vehiculo con el VIN proporcionado."'}</td>
                </tr>
                <tr className="border-b border-brand-border/50 bg-white">
                  <td className="py-3 px-4 font-mono font-bold text-amber-600">429</td>
                  <td className="py-3 px-4 text-brand-navy font-semibold">Limite de solicitudes</td>
                  <td className="py-3 px-4 text-brand-muted">Has superado el limite de peticiones de tu plan. Espera antes de reintentar.</td>
                  <td className="py-3 px-4 font-mono text-xs text-brand-body">{'"Rate limit excedido. Reintenta en 30 segundos."'}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-bold text-red-600">500</td>
                  <td className="py-3 px-4 text-brand-navy font-semibold">Error interno</td>
                  <td className="py-3 px-4 text-brand-muted">Error inesperado en el servidor. Contacta con soporte si persiste.</td>
                  <td className="py-3 px-4 font-mono text-xs text-brand-body">{'"Error interno del servidor. Referencia: err_x7k9m."'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Interactive playground */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Prueba la API</h2>
          <p className="mt-3 text-brand-muted">Explora las respuestas de cada endpoint con datos de ejemplo.</p>
          <div className="mt-8">
            <ApiPlayground />
          </div>
        </div>
      </section>

      {/* Rate limits */}
      <section className="bg-brand-alt-bg py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Límites y planes</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {rateLimits.map((plan) => (
              <div key={plan.plan} className="rounded-card bg-white border border-brand-border p-6">
                <h3 className="font-heading font-bold text-lg text-brand-navy">{plan.plan}</h3>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-muted">Solicitudes</span>
                    <span className="font-semibold text-brand-navy">{plan.requests}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-brand-muted">Límite diario</span>
                    <span className="font-semibold text-brand-navy">{plan.daily}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-brand-border pt-2 mt-3">
                    <span className="text-brand-muted">Precio</span>
                    <span className="font-bold text-brand-indigo">{plan.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Webhooks */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-pastel-purple">
              <Webhook className="w-5 h-5 text-brand-indigo" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Webhooks</h2>
          </div>
          <p className="mt-3 text-brand-muted max-w-3xl">
            Recibe notificaciones en tiempo real cuando ocurren eventos relevantes. Configura tu URL de webhook en el panel de desarrollador.
          </p>
          <div className="mt-10 space-y-6">
            {/* vehicle.updated */}
            <div className="rounded-card bg-white border border-brand-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <code className="text-sm font-mono font-bold text-brand-indigo bg-pastel-blue px-3 py-1 rounded-button">vehicle.updated</code>
              </div>
              <p className="text-sm text-brand-muted mb-4">Se dispara cuando los datos de un vehiculo se actualizan en nuestra base de datos (cambio de titular, ITV, etc.).</p>
              <pre className="rounded-xl bg-gray-900 text-gray-100 p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                <code>{`{
  "event": "vehicle.updated",
  "timestamp": "2026-10-04T14:30:00Z",
  "data": {
    "vin": "WVWZZZ3CZWE123456",
    "fields_changed": ["dgt_status", "provincia"],
    "dgt_status": "Alta definitiva"
  }
}`}</code>
              </pre>
            </div>
            {/* valuation.completed */}
            <div className="rounded-card bg-white border border-brand-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <code className="text-sm font-mono font-bold text-brand-teal bg-pastel-mint px-3 py-1 rounded-button">valuation.completed</code>
              </div>
              <p className="text-sm text-brand-muted mb-4">Se dispara cuando una valoracion de mercado ha sido procesada y esta lista para consultar.</p>
              <pre className="rounded-xl bg-gray-900 text-gray-100 p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                <code>{`{
  "event": "valuation.completed",
  "timestamp": "2026-10-04T14:35:00Z",
  "data": {
    "vin": "WVWZZZ3CZWE123456",
    "valuation_id": "val_8f3k2m9x",
    "price_min": 18500,
    "price_max": 21200,
    "currency": "EUR"
  }
}`}</code>
              </pre>
            </div>
            {/* fraud.alert_created */}
            <div className="rounded-card bg-white border border-brand-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <code className="text-sm font-mono font-bold text-amber-700 bg-pastel-peach px-3 py-1 rounded-button">fraud.alert_created</code>
              </div>
              <p className="text-sm text-brand-muted mb-4">Se dispara cuando se detecta una alerta de fraude en un vehiculo monitorizado.</p>
              <pre className="rounded-xl bg-gray-900 text-gray-100 p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                <code>{`{
  "event": "fraud.alert_created",
  "timestamp": "2026-10-04T15:00:00Z",
  "data": {
    "vin": "WVWZZZ3CZWE123456",
    "alert_id": "alert_4n7p1q",
    "type": "mileage_rollback",
    "severity": "high",
    "description": "Posible manipulacion de kilometraje detectada."
  }
}`}</code>
              </pre>
            </div>
            {/* report.generated */}
            <div className="rounded-card bg-white border border-brand-border p-6">
              <div className="flex items-center gap-3 mb-2">
                <code className="text-sm font-mono font-bold text-brand-indigo bg-pastel-purple px-3 py-1 rounded-button">report.generated</code>
              </div>
              <p className="text-sm text-brand-muted mb-4">Se dispara cuando un informe PDF solicitado ha sido generado y esta disponible para descarga.</p>
              <pre className="rounded-xl bg-gray-900 text-gray-100 p-4 text-xs font-mono overflow-x-auto leading-relaxed">
                <code>{`{
  "event": "report.generated",
  "timestamp": "2026-10-04T15:10:00Z",
  "data": {
    "vin": "WVWZZZ3CZWE123456",
    "report_id": "rpt_2x5v8b",
    "format": "pdf",
    "download_url": "https://api.vehiq.es/v1/reports/rpt_2x5v8b/download"
  }
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* SDKs */}
      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">SDKs oficiales</h2>
          <p className="mt-4 text-brand-muted">Librerías oficiales para los lenguajes más populares. Instalación rápida y documentación incluida.</p>
          <div className="mt-10 grid gap-6 grid-cols-2 lg:grid-cols-4">
            {sdks.map((sdk) => (
              <div key={sdk.name} className="rounded-card bg-white border border-brand-border p-6 text-center">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${sdk.color}`}>
                  <Code className="w-6 h-6" />
                </div>
                <h3 className="mt-4 font-heading font-bold text-lg text-brand-navy">{sdk.name}</h3>
                <p className="mt-1 text-xs text-brand-muted font-mono">{sdk.version}</p>
                <code className="mt-3 block text-[11px] bg-gray-50 border border-brand-border rounded-lg px-3 py-2 font-mono text-brand-body">
                  {sdk.install}
                </code>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Integra datos vehiculares en tu aplicación"
        subheading="Solicita tu API key y empieza a construir con datos vehiculares fiables en minutos."
        primaryLabel="Solicitar API key"
        primaryHref="/pricing-request"
        secondaryLabel="Ver guía de inicio"
        secondaryHref="/guides"
      />
    </>
  );
}
