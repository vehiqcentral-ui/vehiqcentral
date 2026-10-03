'use client';

import { useState } from 'react';
import { Webhook, Plus, CheckCircle, XCircle, Clock, ExternalLink, Trash2 } from 'lucide-react';

const eventTypes = [
  'vehicle.created', 'vehicle.updated', 'report.generated',
  'valuation.completed', 'fraud.alert',
];

const initialWebhooks = [
  {
    id: 1, url: 'https://miapp.com/webhooks/vehiq', events: ['vehicle.created', 'vehicle.updated', 'report.generated'],
    active: true, created: '12/08/2024',
  },
  {
    id: 2, url: 'https://crm.empresa.com/api/vehiq-hook', events: ['valuation.completed', 'fraud.alert'],
    active: true, created: '25/09/2024',
  },
];

const recentDeliveries = [
  { id: 'd1', event: 'vehicle.updated', url: 'https://miapp.com/webhooks/vehiq', status: 200, time: 'Hace 12 min', duration: '230 ms' },
  { id: 'd2', event: 'report.generated', url: 'https://miapp.com/webhooks/vehiq', status: 200, time: 'Hace 1 hora', duration: '180 ms' },
  { id: 'd3', event: 'valuation.completed', url: 'https://crm.empresa.com/api/vehiq-hook', status: 200, time: 'Hace 2 horas', duration: '310 ms' },
  { id: 'd4', event: 'fraud.alert', url: 'https://crm.empresa.com/api/vehiq-hook', status: 500, time: 'Hace 3 horas', duration: '1.2 s' },
  { id: 'd5', event: 'vehicle.created', url: 'https://miapp.com/webhooks/vehiq', status: 200, time: 'Hace 5 horas', duration: '195 ms' },
];

export default function WebhooksPage() {
  const [webhooks] = useState(initialWebhooks);
  const [showCreate, setShowCreate] = useState(false);
  const [newUrl, setNewUrl] = useState('');
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  function toggleEvent(ev: string) {
    setSelectedEvents((prev) =>
      prev.includes(ev) ? prev.filter((e) => e !== ev) : [...prev, ev]
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Webhooks</h1>
          <p className="text-brand-muted mt-1">Recibe notificaciones en tiempo real sobre eventos de VEHIQ</p>
        </div>
        <button onClick={() => setShowCreate(!showCreate)}
          className="bg-brand-teal text-white font-heading font-bold px-5 py-2.5 rounded-button hover:brightness-110 transition-all text-sm flex items-center gap-2">
          <Plus className="w-4 h-4" />Crear webhook
        </button>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="card space-y-4 border-brand-teal">
          <h3 className="font-heading font-extrabold text-lg">Nuevo webhook</h3>
          <div>
            <label className="text-sm font-heading font-bold text-brand-indigo block mb-1">URL de destino</label>
            <input value={newUrl} onChange={(e) => setNewUrl(e.target.value)}
              placeholder="https://tuapp.com/webhook" className="input text-sm font-mono" />
          </div>
          <div>
            <label className="text-sm font-heading font-bold text-brand-indigo block mb-2">Eventos</label>
            <div className="flex flex-wrap gap-2">
              {eventTypes.map((ev) => (
                <button key={ev} onClick={() => toggleEvent(ev)}
                  className={`px-3 py-1.5 rounded-button text-xs font-mono font-bold transition-colors ${
                    selectedEvents.includes(ev)
                      ? 'bg-brand-teal text-white' : 'bg-brand-alt-bg text-brand-muted hover:text-brand-indigo'
                  }`}>
                  {ev}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button className="bg-brand-teal text-white font-heading font-bold px-5 py-2 rounded-button text-sm hover:brightness-110 transition-all">
              Guardar
            </button>
            <button onClick={() => setShowCreate(false)}
              className="border border-brand-border text-brand-muted font-heading font-bold px-5 py-2 rounded-button text-sm hover:bg-brand-alt-bg transition-all">
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Webhook list */}
      <div>
        <h2 className="text-xl font-extrabold mb-4">Webhooks configurados</h2>
        <div className="space-y-4">
          {webhooks.map((wh) => (
            <div key={wh.id} className="card flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-10 h-10 rounded-button bg-pastel-mint flex items-center justify-center flex-shrink-0">
                <Webhook className="w-5 h-5 text-brand-teal" />
              </div>
              <div className="flex-1 min-w-0">
                <code className="text-sm font-bold text-brand-indigo break-all">{wh.url}</code>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {wh.events.map((ev) => (
                    <span key={ev} className="text-xs font-mono px-2 py-0.5 rounded bg-pastel-blue text-brand-indigo">{ev}</span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-3 flex-shrink-0">
                <span className={`badge text-xs ${wh.active ? 'badge-success' : 'badge-danger'}`}>
                  {wh.active ? 'Activo' : 'Inactivo'}
                </span>
                <span className="text-xs text-brand-muted">Creado: {wh.created}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent deliveries */}
      <div>
        <h2 className="text-xl font-extrabold mb-4">Entregas recientes</h2>
        <div className="card overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-brand-border text-left text-brand-muted">
                <th className="py-2 font-semibold">Evento</th>
                <th className="py-2 font-semibold">Destino</th>
                <th className="py-2 font-semibold">Estado</th>
                <th className="py-2 font-semibold">Duracion</th>
                <th className="py-2 font-semibold">Cuando</th>
              </tr>
            </thead>
            <tbody>
              {recentDeliveries.map((d) => (
                <tr key={d.id} className="border-b border-brand-border last:border-0">
                  <td className="py-3">
                    <code className="text-xs font-bold text-brand-indigo">{d.event}</code>
                  </td>
                  <td className="py-3 text-xs text-brand-muted max-w-[200px] truncate">{d.url}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center gap-1 text-xs font-bold ${d.status < 300 ? 'text-brand-teal' : 'text-red-600'}`}>
                      {d.status < 300 ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                      {d.status}
                    </span>
                  </td>
                  <td className="py-3 text-xs text-brand-muted">{d.duration}</td>
                  <td className="py-3 text-xs text-brand-muted">{d.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
