'use client';

import { useState } from 'react';
import {
  Code2, Key, Webhook, BookOpen, Terminal, Activity,
  CheckCircle, ArrowRight, Copy, ExternalLink,
} from 'lucide-react';

const stats = [
  { label: 'Llamadas API este mes', value: '12.456', icon: Activity, bg: 'bg-pastel-blue' },
  { label: 'Tasa de exito', value: '99,2%', icon: CheckCircle, bg: 'bg-pastel-mint' },
  { label: 'Claves activas', value: '3', icon: Key, bg: 'bg-pastel-purple' },
  { label: 'Webhooks', value: '2', icon: Webhook, bg: 'bg-pastel-peach' },
];

const quickLinks = [
  { title: 'Documentacion', desc: 'Referencia completa de la API REST de VEHIQ', icon: BookOpen, href: '/developer/docs' },
  { title: 'Sandbox', desc: 'Prueba los endpoints en tiempo real', icon: Terminal, href: '/developer/sandbox' },
  { title: 'API Keys', desc: 'Gestiona tus claves de autenticacion', icon: Key, href: '/dashboard/api-keys' },
  { title: 'Webhooks', desc: 'Configura notificaciones en tiempo real', icon: Webhook, href: '/developer/webhooks' },
];

const curlExample = `curl -X GET "https://api.vehiq.com/v1/vehicles/WVWZZZ1KZLW123456" \\
  -H "Authorization: Bearer vq_live_abc123..." \\
  -H "Content-Type: application/json"`;

const responseExample = `{
  "vin": "WVWZZZ1KZLW123456",
  "plate": "1234 ABC",
  "brand": "Volkswagen",
  "model": "Golf 8",
  "version": "GTI",
  "year": 2021,
  "fuel": "Gasolina",
  "power_cv": 245,
  "status": "disponible"
}`;

export default function DeveloperPage() {
  const [copied, setCopied] = useState(false);

  function copyCode() {
    navigator.clipboard.writeText(curlExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold">Portal de desarrolladores</h1>
        <p className="text-brand-muted mt-1">Integra los datos de VEHIQ en tus aplicaciones</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`stat-card ${s.bg}`}>
              <div className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-brand-muted" />
                <span className="text-xs text-brand-muted">{s.label}</span>
              </div>
              <span className="text-2xl font-heading font-extrabold text-brand-indigo">{s.value}</span>
            </div>
          );
        })}
      </div>

      {/* Quick links */}
      <div>
        <h2 className="text-xl font-extrabold mb-4">Comenzar</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickLinks.map((l) => {
            const Icon = l.icon;
            return (
              <a key={l.title} href={l.href} className="card group flex flex-col gap-3">
                <div className="w-10 h-10 rounded-button bg-pastel-blue flex items-center justify-center">
                  <Icon className="w-5 h-5 text-brand-indigo" />
                </div>
                <h3 className="text-base font-extrabold flex items-center gap-1">
                  {l.title}
                  <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-brand-teal" />
                </h3>
                <p className="text-sm text-brand-muted">{l.desc}</p>
              </a>
            );
          })}
        </div>
      </div>

      {/* Code example */}
      <div>
        <h2 className="text-xl font-extrabold mb-4">Ejemplo rapido</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="card p-0 overflow-hidden">
            <div className="flex items-center justify-between px-4 py-2 bg-brand-navy">
              <span className="text-xs text-green-400 font-heading font-bold">Peticion</span>
              <button onClick={copyCode} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
                <Copy className="w-3 h-3" />{copied ? 'Copiado' : 'Copiar'}
              </button>
            </div>
            <pre className="p-4 bg-brand-navy text-green-400 text-sm overflow-x-auto font-mono leading-relaxed">
              <code>{curlExample}</code>
            </pre>
          </div>
          <div className="card p-0 overflow-hidden">
            <div className="px-4 py-2 bg-brand-navy">
              <span className="text-xs text-green-400 font-heading font-bold">Respuesta — 200 OK</span>
            </div>
            <pre className="p-4 bg-brand-navy text-green-400 text-sm overflow-x-auto font-mono leading-relaxed">
              <code>{responseExample}</code>
            </pre>
          </div>
        </div>
      </div>

      {/* Base URL info */}
      <div className="card flex items-center gap-4">
        <ExternalLink className="w-5 h-5 text-brand-teal flex-shrink-0" />
        <div>
          <p className="font-heading font-bold text-brand-indigo text-sm">URL base de la API</p>
          <code className="text-sm text-brand-teal">https://api.vehiq.com/v1</code>
        </div>
      </div>
    </div>
  );
}
