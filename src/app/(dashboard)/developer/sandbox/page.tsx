'use client';

import { useState } from 'react';
import { Play, Plus, Trash2, Copy } from 'lucide-react';

const methods = ['GET', 'POST', 'PUT', 'DELETE'] as const;
type Method = typeof methods[number];

const methodColors: Record<Method, string> = {
  GET: 'bg-brand-teal', POST: 'bg-brand-indigo', PUT: 'bg-amber-600', DELETE: 'bg-red-600',
};

const mockResponses: Record<string, { status: number; body: string }> = {
  'GET /api/v1/vehicles/WVWZZZ1KZLW123456': {
    status: 200,
    body: JSON.stringify({
      vin: 'WVWZZZ1KZLW123456', plate: '1234 ABC', brand: 'Volkswagen',
      model: 'Golf 8', version: 'GTI', year: 2021, fuel: 'Gasolina',
      power_cv: 245, co2_gkm: 168, color: 'Gris Urano', status: 'disponible',
    }, null, 2),
  },
  'GET /api/v1/vehicles/search': {
    status: 200,
    body: JSON.stringify({
      data: [
        { vin: 'WVWZZZ1KZLW123456', plate: '1234 ABC', brand: 'Volkswagen', model: 'Golf 8' },
      ],
      total: 1, page: 1, per_page: 20,
    }, null, 2),
  },
  'POST /api/v1/reports': {
    status: 202,
    body: JSON.stringify({
      report_id: 'rpt_abc123', status: 'processing', estimated_seconds: 15,
    }, null, 2),
  },
};

const defaultResponse = {
  status: 200,
  body: JSON.stringify({ message: 'Endpoint simulado correctamente', timestamp: new Date().toISOString() }, null, 2),
};

export default function SandboxPage() {
  const [method, setMethod] = useState<Method>('GET');
  const [endpoint, setEndpoint] = useState('/api/v1/vehicles/WVWZZZ1KZLW123456');
  const [headers, setHeaders] = useState([
    { key: 'Authorization', value: 'Bearer vq_test_demo123' },
    { key: 'Content-Type', value: 'application/json' },
  ]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState<{ status: number; body: string } | null>(null);
  const [loading, setLoading] = useState(false);

  function addHeader() {
    setHeaders([...headers, { key: '', value: '' }]);
  }

  function removeHeader(i: number) {
    setHeaders(headers.filter((_, idx) => idx !== i));
  }

  function updateHeader(i: number, field: 'key' | 'value', val: string) {
    const next = [...headers];
    next[i] = { ...next[i], [field]: val };
    setHeaders(next);
  }

  function send() {
    setLoading(true);
    setTimeout(() => {
      const key = `${method} ${endpoint}`;
      setResponse(mockResponses[key] || defaultResponse);
      setLoading(false);
    }, 600);
  }

  function copyResponse() {
    if (response) navigator.clipboard.writeText(response.body);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">Sandbox</h1>
        <p className="text-brand-muted mt-1">Prueba los endpoints de la API de VEHIQ en tiempo real</p>
      </div>

      <div className="card space-y-5">
        {/* Method + endpoint */}
        <div className="flex gap-2">
          <select value={method} onChange={(e) => setMethod(e.target.value as Method)}
            className="input w-28 font-mono font-bold text-sm">
            {methods.map((m) => <option key={m} value={m}>{m}</option>)}
          </select>
          <input value={endpoint} onChange={(e) => setEndpoint(e.target.value)}
            placeholder="/api/v1/..." className="input flex-1 font-mono text-sm" />
          <button onClick={send} disabled={loading}
            className="bg-brand-teal text-white font-heading font-bold px-6 py-2.5 rounded-button hover:brightness-110 transition-all text-sm flex items-center gap-2 disabled:opacity-50">
            <Play className="w-4 h-4" />{loading ? 'Enviando...' : 'Enviar'}
          </button>
        </div>

        {/* Headers */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-heading font-bold text-sm text-brand-indigo">Cabeceras</h3>
            <button onClick={addHeader} className="text-brand-teal text-sm flex items-center gap-1 hover:underline">
              <Plus className="w-3 h-3" />Anadir
            </button>
          </div>
          <div className="space-y-2">
            {headers.map((h, i) => (
              <div key={i} className="flex gap-2">
                <input value={h.key} onChange={(e) => updateHeader(i, 'key', e.target.value)}
                  placeholder="Clave" className="input flex-1 text-sm font-mono" />
                <input value={h.value} onChange={(e) => updateHeader(i, 'value', e.target.value)}
                  placeholder="Valor" className="input flex-1 text-sm font-mono" />
                <button onClick={() => removeHeader(i)} className="p-2 text-brand-muted hover:text-red-500 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Body */}
        {(method === 'POST' || method === 'PUT') && (
          <div>
            <h3 className="font-heading font-bold text-sm text-brand-indigo mb-2">Cuerpo de la peticion</h3>
            <textarea value={body} onChange={(e) => setBody(e.target.value)}
              rows={6} placeholder='{"vin": "WVWZZZ1KZLW123456", "type": "full"}'
              className="input font-mono text-sm resize-y" />
          </div>
        )}
      </div>

      {/* Response */}
      {response && (
        <div className="card p-0 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-brand-navy">
            <div className="flex items-center gap-3">
              <span className="text-xs text-green-400 font-heading font-bold">Respuesta</span>
              <span className={`text-xs font-bold px-2 py-0.5 rounded font-mono ${
                response.status < 300 ? 'bg-brand-teal/20 text-green-400' :
                response.status < 400 ? 'bg-amber-500/20 text-amber-400' :
                'bg-red-500/20 text-red-400'
              }`}>{response.status}</span>
            </div>
            <button onClick={copyResponse} className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors">
              <Copy className="w-3 h-3" />Copiar
            </button>
          </div>
          <pre className="p-4 bg-brand-navy text-green-400 text-sm overflow-x-auto font-mono leading-relaxed max-h-96">
            <code>{response.body}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
