'use client';

import { useState } from 'react';
import { BookOpen, Lock, Car, FileText, TrendingUp, Shield, Database, Webhook } from 'lucide-react';

const sections = [
  { key: 'auth', label: 'Autenticacion', icon: Lock },
  { key: 'vehicles', label: 'Vehiculos', icon: Car },
  { key: 'reports', label: 'Informes', icon: FileText },
  { key: 'valuations', label: 'Valoraciones', icon: TrendingUp },
  { key: 'fraud', label: 'Fraude', icon: Shield },
  { key: 'data', label: 'Datos', icon: Database },
  { key: 'webhooks', label: 'Webhooks', icon: Webhook },
];

function CodeBlock({ title, code }: { title: string; code: string }) {
  return (
    <div className="rounded-button overflow-hidden my-4">
      <div className="px-4 py-2 bg-brand-navy">
        <span className="text-xs text-green-400 font-heading font-bold">{title}</span>
      </div>
      <pre className="p-4 bg-brand-navy text-green-400 text-sm overflow-x-auto font-mono leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  );
}

function Endpoint({ method, path, desc }: { method: string; path: string; desc: string }) {
  const colors: Record<string, string> = {
    GET: 'bg-brand-teal', POST: 'bg-brand-indigo', PUT: 'bg-amber-600', DELETE: 'bg-red-600',
  };
  return (
    <div className="flex items-center gap-3 py-3 border-b border-brand-border">
      <span className={`${colors[method] || 'bg-gray-500'} text-white text-xs font-bold px-2 py-1 rounded font-mono`}>{method}</span>
      <code className="text-sm text-brand-indigo font-bold">{path}</code>
      <span className="text-sm text-brand-muted ml-auto hidden sm:inline">{desc}</span>
    </div>
  );
}

const getVehicleResponse = `{
  "vin": "WVWZZZ1KZLW123456",
  "plate": "1234 ABC",
  "brand": "Volkswagen",
  "model": "Golf 8",
  "version": "GTI",
  "year": 2021,
  "fuel": "Gasolina",
  "power_cv": 245,
  "co2_gkm": 168,
  "euro_norm": "Euro 6d",
  "color": "Gris Urano",
  "doors": 5,
  "transmission": "DSG 7 velocidades",
  "status": "disponible",
  "first_registration": "2021-03-12"
}`;

const searchResponse = `{
  "data": [
    { "vin": "WVWZZZ1KZLW123456", "plate": "1234 ABC", "brand": "Volkswagen", "model": "Golf 8" },
    { "vin": "WVWZZZ3CZWE654321", "plate": "5678 DEF", "brand": "Volkswagen", "model": "Golf 8" }
  ],
  "total": 2,
  "page": 1,
  "per_page": 20
}`;

const reportRequest = `{
  "vin": "WVWZZZ1KZLW123456",
  "type": "full",
  "include": ["history", "valuation", "fraud", "itv"]
}`;

const reportResponse = `{
  "report_id": "rpt_abc123",
  "status": "processing",
  "estimated_seconds": 15,
  "callback_url": null
}`;

function SectionVehicles() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-extrabold mb-2">Vehiculos</h2>
        <p className="text-brand-muted">Consulta la informacion completa de cualquier vehiculo por VIN o matricula.</p>
      </div>

      <div>
        <h3 className="text-lg font-extrabold mb-3">Endpoints</h3>
        <Endpoint method="GET" path="/api/v1/vehicles/{vin}" desc="Obtener vehiculo por VIN" />
        <Endpoint method="GET" path="/api/v1/vehicles/search" desc="Buscar vehiculos" />
        <Endpoint method="POST" path="/api/v1/reports" desc="Generar informe" />
      </div>

      <div>
        <h3 className="text-lg font-extrabold mb-2">GET /api/v1/vehicles/{'{vin}'}</h3>
        <p className="text-sm text-brand-body mb-2">Devuelve la informacion completa de un vehiculo identificado por su VIN.</p>
        <CodeBlock title="Peticion" code={`curl -X GET "https://api.vehiq.com/v1/vehicles/WVWZZZ1KZLW123456" \\
  -H "Authorization: Bearer vq_live_abc123..."`} />
        <CodeBlock title="Respuesta — 200 OK" code={getVehicleResponse} />
      </div>

      <div>
        <h3 className="text-lg font-extrabold mb-2">GET /api/v1/vehicles/search</h3>
        <p className="text-sm text-brand-body mb-2">Busca vehiculos por marca, modelo, ano u otros criterios.</p>
        <div className="card mb-4">
          <h4 className="font-heading font-bold text-sm text-brand-indigo mb-3">Parametros de consulta</h4>
          <div className="space-y-2 text-sm">
            {[
              ['brand', 'string', 'Marca del vehiculo (ej: Volkswagen)'],
              ['model', 'string', 'Modelo (ej: Golf 8)'],
              ['year_min', 'integer', 'Ano minimo de fabricacion'],
              ['year_max', 'integer', 'Ano maximo de fabricacion'],
              ['fuel', 'string', 'Tipo de combustible'],
              ['page', 'integer', 'Pagina de resultados (defecto: 1)'],
              ['per_page', 'integer', 'Resultados por pagina (defecto: 20, max: 100)'],
            ].map(([name, type, desc]) => (
              <div key={name} className="flex gap-4 py-1 border-b border-brand-border last:border-0">
                <code className="text-brand-teal font-bold min-w-[100px]">{name}</code>
                <span className="text-brand-muted min-w-[60px]">{type}</span>
                <span className="text-brand-body">{desc}</span>
              </div>
            ))}
          </div>
        </div>
        <CodeBlock title="Respuesta — 200 OK" code={searchResponse} />
      </div>

      <div>
        <h3 className="text-lg font-extrabold mb-2">POST /api/v1/reports</h3>
        <p className="text-sm text-brand-body mb-2">Genera un informe completo del vehiculo. El informe se procesa de forma asincrona.</p>
        <CodeBlock title="Peticion" code={`curl -X POST "https://api.vehiq.com/v1/reports" \\
  -H "Authorization: Bearer vq_live_abc123..." \\
  -H "Content-Type: application/json" \\
  -d '${reportRequest}'`} />
        <CodeBlock title="Respuesta — 202 Accepted" code={reportResponse} />
      </div>
    </div>
  );
}

function SectionAuth() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-extrabold mb-2">Autenticacion</h2>
        <p className="text-brand-muted">Todas las peticiones requieren un token Bearer en la cabecera Authorization.</p>
      </div>
      <CodeBlock title="Cabecera de autenticacion" code={`Authorization: Bearer vq_live_tu_clave_api`} />
      <div className="card">
        <h3 className="font-heading font-bold text-brand-indigo mb-2">Tipos de claves</h3>
        <div className="space-y-2 text-sm">
          <div className="flex gap-3"><code className="text-brand-teal font-bold">vq_live_*</code><span>Clave de produccion</span></div>
          <div className="flex gap-3"><code className="text-brand-teal font-bold">vq_test_*</code><span>Clave de pruebas (sandbox)</span></div>
        </div>
      </div>
      <div className="card bg-pastel-peach border-amber-200">
        <p className="text-sm text-amber-800"><strong>Importante:</strong> No compartas tu clave API. Rotala si sospechas que ha sido comprometida.</p>
      </div>
    </div>
  );
}

function SectionDefault({ title }: { title: string }) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <p className="text-brand-muted">Documentacion en preparacion. Consulta la seccion de Vehiculos para ejemplos de uso.</p>
    </div>
  );
}

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState('vehicles');

  return (
    <div className="flex gap-6 min-h-[calc(100vh-140px)]">
      {/* Sidebar */}
      <aside className="w-56 flex-shrink-0 hidden lg:block">
        <h2 className="text-lg font-extrabold mb-4">API Reference</h2>
        <nav className="space-y-1">
          {sections.map((s) => {
            const Icon = s.icon;
            const active = activeSection === s.key;
            return (
              <button key={s.key} onClick={() => setActiveSection(s.key)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-button text-sm font-heading font-semibold transition-colors text-left ${
                  active ? 'bg-pastel-blue text-brand-indigo' : 'text-brand-muted hover:text-brand-indigo hover:bg-brand-alt-bg'
                }`}>
                <Icon className="w-4 h-4" />{s.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        {activeSection === 'auth' && <SectionAuth />}
        {activeSection === 'vehicles' && <SectionVehicles />}
        {activeSection === 'reports' && <SectionDefault title="Informes" />}
        {activeSection === 'valuations' && <SectionDefault title="Valoraciones" />}
        {activeSection === 'fraud' && <SectionDefault title="Fraude" />}
        {activeSection === 'data' && <SectionDefault title="Datos" />}
        {activeSection === 'webhooks' && <SectionDefault title="Webhooks" />}
      </div>
    </div>
  );
}
