'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Endpoint {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  path: string;
  description: string;
  body?: string;
}

const ENDPOINTS: Endpoint[] = [
  {
    method: 'GET',
    path: '/api/v1/vehicles',
    description: 'List all vehicles in your fleet',
  },
  {
    method: 'GET',
    path: '/api/v1/vehicles/:id',
    description: 'Get a single vehicle by ID',
  },
  {
    method: 'POST',
    path: '/api/v1/vehicles',
    description: 'Register a new vehicle',
    body: JSON.stringify({ make: 'Toyota', model: 'Camry', year: 2024, vin: '' }, null, 2),
  },
  {
    method: 'GET',
    path: '/api/v1/valuations/:id',
    description: 'Get the latest valuation for a vehicle',
  },
  {
    method: 'POST',
    path: '/api/v1/valuations/request',
    description: 'Request a new valuation',
    body: JSON.stringify({ vehicleId: '' }, null, 2),
  },
];

const METHOD_COLORS: Record<string, string> = {
  GET: 'bg-emerald-100 text-emerald-700',
  POST: 'bg-blue-100 text-blue-700',
  PUT: 'bg-amber-100 text-amber-700',
  PATCH: 'bg-orange-100 text-orange-700',
  DELETE: 'bg-red-100 text-red-700',
};

export function ApiPlayground() {
  const [selected, setSelected] = useState<Endpoint>(ENDPOINTS[0]);
  const [apiKey, setApiKey] = useState('');
  const [response, setResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);
    setResponse(null);
    await new Promise((r) => setTimeout(r, 600));
    setResponse(
      JSON.stringify(
        {
          status: 200,
          data: [
            { id: 'veh_01', make: 'Toyota', model: 'Camry', year: 2024, valuation: 28500 },
            { id: 'veh_02', make: 'BMW', model: '3 Series', year: 2023, valuation: 41200 },
          ],
          meta: { total: 2, page: 1, pageSize: 20 },
        },
        null,
        2,
      ),
    );
    setLoading(false);
  }

  return (
    <section className="rounded-card border border-brand-border overflow-hidden">
      <div className="bg-brand-teal px-6 py-4">
        <h2 className="text-base font-semibold text-white">API Playground</h2>
        <p className="text-xs text-white/70 mt-0.5">Test endpoints directly — no setup required</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[260px_1fr]">
        <nav className="border-r border-brand-border bg-brand-alt-bg p-3 space-y-1">
          {ENDPOINTS.map((ep) => (
            <button
              key={ep.path}
              onClick={() => { setSelected(ep); setResponse(null); }}
              className={cn(
                'w-full text-left rounded-button px-3 py-2.5 flex flex-col gap-0.5 transition-colors',
                selected.path === ep.path
                  ? 'bg-white shadow-sm'
                  : 'hover:bg-white/60',
              )}
            >
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'text-[10px] font-bold px-1.5 py-0.5 rounded',
                    METHOD_COLORS[ep.method],
                  )}
                >
                  {ep.method}
                </span>
                <span className="text-xs font-mono text-brand-teal truncate">{ep.path}</span>
              </div>
              <span className="text-[11px] text-brand-muted pl-0.5">{ep.description}</span>
            </button>
          ))}
        </nav>

        <div className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-semibold text-brand-muted mb-1.5">API Key</label>
            <input
              type="password"
              placeholder="vq_live_••••••••••••••••"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="w-full rounded-button border border-brand-border px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-brand-teal/30"
            />
          </div>

          {selected.body && (
            <div>
              <label className="block text-xs font-semibold text-brand-muted mb-1.5">Request Body</label>
              <pre className="rounded-button border border-brand-border bg-brand-alt-bg p-3 text-xs font-mono overflow-x-auto">
                {selected.body}
              </pre>
            </div>
          )}

          <button
            onClick={run}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-brand-teal text-white text-sm font-semibold px-5 py-2.5 rounded-button hover:bg-brand-teal/90 disabled:opacity-50 transition-colors"
          >
            {loading ? 'Sending…' : 'Send Request'}
          </button>

          {response && (
            <div>
              <label className="block text-xs font-semibold text-brand-muted mb-1.5">Response</label>
              <pre className="rounded-button border border-brand-border bg-[#0f172a] text-green-400 p-4 text-xs font-mono overflow-x-auto max-h-72">
                {response}
              </pre>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ApiPlayground;
