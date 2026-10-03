'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Key,
  Plus,
  Copy,
  Eye,
  EyeOff,
  CheckCircle,
  Loader2,
  XCircle,
  ShieldCheck,
  Clock,
} from 'lucide-react';

/* ── Types ──────────────────────────────── */

interface ApiKeyItem {
  id: string;
  name: string;
  keyPreview: string;
  active: boolean;
  rateLimit: number;
  permissions: string[];
  expiresAt: string | null;
  lastUsedAt: string | null;
  totalCalls: number;
  createdAt: string;
}

interface Stats {
  activeKeys: number;
  callsToday: number;
  callsThisMonth: number;
}

/* ── Helpers ─────────────────────────────── */

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/* ── Component ──────────────────────────── */

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKeyItem[]>([]);
  const [stats, setStats] = useState<Stats>({ activeKeys: 0, callsToday: 0, callsThisMonth: 0 });
  const [loading, setLoading] = useState(true);
  const [showKeyId, setShowKeyId] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  // Create form
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);
  const [createError, setCreateError] = useState('');

  const fetchKeys = useCallback(async () => {
    try {
      const res = await fetch('/api/api-keys');
      const json = await res.json();
      if (json.success) {
        setKeys(json.data.keys);
        setStats(json.data.stats);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchKeys();
  }, [fetchKeys]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;

    setCreating(true);
    setCreateError('');
    setNewKey(null);

    try {
      const res = await fetch('/api/api-keys', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName.trim() }),
      });
      const json = await res.json();

      if (json.success) {
        setNewKey(json.data.key);
        setNewName('');
        fetchKeys();
      } else {
        setCreateError(json.error?.message ?? 'Error al crear la clave');
      }
    } catch {
      setCreateError('Error de conexion');
    } finally {
      setCreating(false);
    }
  }

  function copyToClipboard(text: string, id: string) {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(id);
      setTimeout(() => setCopied(null), 2000);
    });
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-brand-muted">
        <Loader2 size={28} className="animate-spin mr-3" /> Cargando claves API...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">API Keys</h1>
          <p className="text-brand-muted mt-1">Gestiona las claves de acceso a la API de VEHIQ</p>
        </div>
        <button
          onClick={() => { setShowCreate(!showCreate); setNewKey(null); setCreateError(''); }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} /> Crear API Key
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          { label: 'Keys activas', value: stats.activeKeys.toLocaleString('es-ES'), icon: Key, color: 'bg-pastel-blue text-brand-indigo' },
          { label: 'Llamadas hoy', value: stats.callsToday.toLocaleString('es-ES'), icon: CheckCircle, color: 'bg-pastel-mint text-brand-teal' },
          { label: 'Llamadas mes', value: stats.callsThisMonth.toLocaleString('es-ES'), icon: Key, color: 'bg-pastel-peach text-amber-700' },
        ].map(s => (
          <div key={s.label} className="card flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}><s.icon size={18} /></div>
            <div>
              <p className="text-xl font-heading font-extrabold text-brand-indigo">{s.value}</p>
              <p className="text-xs text-brand-muted">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="card border-brand-teal/30 bg-pastel-mint/10">
          <h3 className="font-heading font-bold text-brand-indigo mb-3">Nueva API Key</h3>
          <form onSubmit={handleCreate} className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newName}
              onChange={e => setNewName(e.target.value)}
              placeholder="Nombre de la clave (ej. Produccion, CRM, App movil)"
              className="input flex-1"
            />
            <button type="submit" disabled={creating || !newName.trim()} className="btn-primary whitespace-nowrap disabled:opacity-50">
              {creating ? <Loader2 size={16} className="animate-spin mr-2 inline" /> : <Key size={16} className="mr-2 inline" />}
              Generar clave
            </button>
          </form>

          {createError && (
            <div className="mt-3 p-3 rounded-lg bg-red-50 text-red-700 text-sm flex items-center gap-2">
              <XCircle size={16} /> {createError}
            </div>
          )}

          {newKey && (
            <div className="mt-3 p-4 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm font-semibold text-green-800 mb-2 flex items-center gap-2">
                <ShieldCheck size={16} /> Clave creada — copiala ahora, no se mostrara de nuevo
              </p>
              <div className="flex items-center gap-2">
                <code className="text-sm font-mono bg-white px-3 py-1.5 rounded border border-green-300 flex-1 overflow-x-auto">
                  {newKey}
                </code>
                <button
                  onClick={() => copyToClipboard(newKey, 'new')}
                  className="p-2 rounded hover:bg-green-100 text-green-700"
                >
                  {copied === 'new' ? <CheckCircle size={16} /> : <Copy size={16} />}
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Keys list */}
      <div className="card">
        <h2 className="font-heading font-bold text-brand-indigo mb-4">Claves de API</h2>

        {keys.length === 0 ? (
          <div className="text-center py-12 text-brand-muted">
            <Key size={40} className="mx-auto mb-3" />
            <p className="font-heading font-bold">Sin claves API</p>
            <p className="text-sm mt-1">Crea tu primera clave para integrar VEHIQ con tus sistemas</p>
          </div>
        ) : (
          <div className="space-y-3">
            {keys.map(k => (
              <div key={k.id} className={`border rounded-card p-4 ${!k.active ? 'border-gray-200 bg-gray-50 opacity-60' : 'border-brand-border hover:shadow-md transition-shadow'}`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-heading font-bold text-brand-indigo">{k.name}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${k.active ? 'bg-green-100 text-green-700' : 'bg-gray-200 text-gray-500'}`}>
                        {k.active ? 'Activa' : 'Revocada'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <code className="text-sm font-mono text-brand-muted bg-gray-100 px-2 py-0.5 rounded">
                        {showKeyId === k.id ? k.keyPreview : k.keyPreview.replace(/[a-zA-Z0-9]/g, '•')}
                      </code>
                      <button onClick={() => setShowKeyId(showKeyId === k.id ? null : k.id)} className="text-brand-muted hover:text-brand-indigo">
                        {showKeyId === k.id ? <EyeOff size={14} /> : <Eye size={14} />}
                      </button>
                      <button
                        onClick={() => copyToClipboard(k.keyPreview, k.id)}
                        className="text-brand-muted hover:text-brand-teal"
                      >
                        {copied === k.id ? <CheckCircle size={14} className="text-green-500" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-xs text-brand-muted">
                    <div>
                      <p className="text-brand-muted">Creada</p>
                      <p className="font-semibold text-brand-indigo">{fmtDate(k.createdAt)}</p>
                    </div>
                    <div>
                      <p className="text-brand-muted">Ultimo uso</p>
                      <p className="font-semibold text-brand-indigo">{k.lastUsedAt ? fmtDate(k.lastUsedAt) : 'Nunca'}</p>
                    </div>
                    <div>
                      <p className="text-brand-muted">Llamadas</p>
                      <p className="font-semibold text-brand-indigo">{k.totalCalls.toLocaleString('es-ES')}</p>
                    </div>
                    <div>
                      <p className="text-brand-muted">Limite</p>
                      <p className="font-semibold text-brand-indigo">{k.rateLimit.toLocaleString('es-ES')}/h</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* API docs hint */}
      <div className="card bg-pastel-blue/30 border-brand-indigo/20">
        <h3 className="font-heading font-bold text-brand-indigo mb-2">Documentacion de la API</h3>
        <p className="text-sm text-brand-muted">
          Consulta la documentacion completa en{' '}
          <span className="text-brand-teal font-semibold">api.vehiq.com/docs</span>{' '}
          para integrar VEHIQ en tus sistemas. Endpoints disponibles: consulta de vehiculos, valoraciones, historial y deteccion de fraude.
        </p>
      </div>
    </div>
  );
}
