'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  FileText,
  Download,
  Search,
  Plus,
  Clock,
  CheckCircle,
  Loader2,
  Filter,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  ShieldAlert,
  TrendingUp,
  Car,
  FileSpreadsheet,
} from 'lucide-react';

/* ── Types ──────────────────────────────── */

interface ReportItem {
  id: string;
  type: string;
  title: string;
  format: string;
  fileUrl: string | null;
  expiresAt: string | null;
  createdAt: string;
}

interface Stats {
  total: number;
  byType: Record<string, number>;
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

/* ── Helpers ─────────────────────────────── */

const typeLabels: Record<string, string> = {
  VEHICLE_HISTORY: 'Historial vehicular',
  VALUATION: 'Valoracion',
  FRAUD_ANALYSIS: 'Analisis de fraude',
  MARKET_REPORT: 'Informe de mercado',
  FLEET_OVERVIEW: 'Resumen de flota',
  CUSTOM: 'Personalizado',
};

const typeIcons: Record<string, typeof FileText> = {
  VEHICLE_HISTORY: Car,
  VALUATION: TrendingUp,
  FRAUD_ANALYSIS: ShieldAlert,
  MARKET_REPORT: BarChart3,
  FLEET_OVERVIEW: FileSpreadsheet,
  CUSTOM: FileText,
};

const typeColors: Record<string, string> = {
  VEHICLE_HISTORY: 'bg-pastel-blue text-brand-indigo',
  VALUATION: 'bg-pastel-mint text-brand-teal',
  FRAUD_ANALYSIS: 'bg-red-50 text-red-600',
  MARKET_REPORT: 'bg-pastel-peach text-amber-700',
  FLEET_OVERVIEW: 'bg-pastel-purple text-purple-700',
  CUSTOM: 'bg-gray-100 text-gray-600',
};

const formatLabels: Record<string, string> = {
  pdf: 'PDF',
  xlsx: 'Excel',
  csv: 'CSV',
};

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function fmtDateTime(iso: string): string {
  const d = new Date(iso);
  return `${d.toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' })} ${d.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })}`;
}

/* ── Component ──────────────────────────── */

const TYPES = ['VEHICLE_HISTORY', 'VALUATION', 'FRAUD_ANALYSIS', 'MARKET_REPORT', 'FLEET_OVERVIEW', 'CUSTOM'] as const;

export default function ReportsPage() {
  const [reports, setReports] = useState<ReportItem[]>([]);
  const [stats, setStats] = useState<Stats>({ total: 0, byType: {} });
  const [pagination, setPagination] = useState<Pagination>({ page: 1, perPage: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');

  // Create form
  const [showCreate, setShowCreate] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<string>('VEHICLE_HISTORY');
  const [newFormat, setNewFormat] = useState<string>('pdf');
  const [creating, setCreating] = useState(false);
  const [createSuccess, setCreateSuccess] = useState(false);

  const fetchReports = useCallback(async (page = 1) => {
    try {
      const params = new URLSearchParams({ page: String(page), perPage: '20' });
      if (typeFilter) params.set('type', typeFilter);
      if (search.trim()) params.set('q', search.trim());

      const res = await fetch(`/api/reports?${params}`);
      const json = await res.json();
      if (json.success) {
        setReports(json.data.reports);
        setStats(json.data.stats);
        setPagination(json.data.pagination);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [typeFilter, search]);

  useEffect(() => {
    setLoading(true);
    fetchReports(1);
  }, [fetchReports]);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setCreating(true);
    setCreateSuccess(false);

    try {
      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newTitle.trim(),
          type: newType,
          format: newFormat,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setCreateSuccess(true);
        setNewTitle('');
        fetchReports(1);
        setTimeout(() => setCreateSuccess(false), 3000);
      }
    } catch {
      // silently fail
    } finally {
      setCreating(false);
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-brand-muted">
        <Loader2 size={28} className="animate-spin mr-3" /> Cargando informes...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Informes</h1>
          <p className="text-brand-muted mt-1">Genera y gestiona informes de inteligencia vehicular</p>
        </div>
        <button
          onClick={() => { setShowCreate(!showCreate); setCreateSuccess(false); }}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} /> Nuevo informe
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total informes', value: stats.total.toLocaleString('es-ES'), icon: FileText, color: 'bg-pastel-blue text-brand-indigo' },
          { label: 'Historial vehicular', value: (stats.byType.VEHICLE_HISTORY ?? 0).toLocaleString('es-ES'), icon: Car, color: 'bg-pastel-mint text-brand-teal' },
          { label: 'Valoraciones', value: (stats.byType.VALUATION ?? 0).toLocaleString('es-ES'), icon: TrendingUp, color: 'bg-pastel-peach text-amber-700' },
          { label: 'Analisis fraude', value: (stats.byType.FRAUD_ANALYSIS ?? 0).toLocaleString('es-ES'), icon: ShieldAlert, color: 'bg-pastel-purple text-purple-700' },
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
          <h3 className="font-heading font-bold text-brand-indigo mb-3">Generar nuevo informe</h3>
          <form onSubmit={handleCreate} className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Titulo del informe (ej. Historial BMW X3 4523BCD)"
                className="input flex-1"
              />
              <select
                value={newType}
                onChange={e => setNewType(e.target.value)}
                className="input w-full sm:w-52"
              >
                {TYPES.map(t => (
                  <option key={t} value={t}>{typeLabels[t]}</option>
                ))}
              </select>
              <select
                value={newFormat}
                onChange={e => setNewFormat(e.target.value)}
                className="input w-full sm:w-28"
              >
                <option value="pdf">PDF</option>
                <option value="xlsx">Excel</option>
                <option value="csv">CSV</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="submit"
                disabled={creating || !newTitle.trim()}
                className="btn-primary whitespace-nowrap disabled:opacity-50"
              >
                {creating ? <Loader2 size={16} className="animate-spin mr-2 inline" /> : <FileText size={16} className="mr-2 inline" />}
                Generar informe
              </button>
              {createSuccess && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle size={14} /> Informe creado correctamente
                </span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Reports list */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar informes..."
              className="input pl-10 text-sm"
            />
          </div>
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <select
              value={typeFilter}
              onChange={e => setTypeFilter(e.target.value)}
              className="input pl-10 text-sm w-full sm:w-52"
            >
              <option value="">Todos los tipos</option>
              {TYPES.map(t => (
                <option key={t} value={t}>{typeLabels[t]}</option>
              ))}
            </select>
          </div>
        </div>

        {reports.length === 0 ? (
          <div className="text-center py-12 text-brand-muted">
            <FileText size={40} className="mx-auto mb-3" />
            <p className="font-heading font-bold">Sin informes</p>
            <p className="text-sm mt-1">Genera tu primer informe para obtener inteligencia vehicular detallada</p>
          </div>
        ) : (
          <>
            <div className="space-y-2">
              {reports.map(r => {
                const TypeIcon = typeIcons[r.type] ?? FileText;
                const typeColor = typeColors[r.type] ?? 'bg-gray-100 text-gray-600';

                return (
                  <div key={r.id} className="flex items-center gap-4 p-3 rounded-card border border-brand-border hover:shadow-md transition-shadow">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${typeColor}`}>
                      <TypeIcon size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-heading font-bold text-brand-indigo truncate">{r.title}</p>
                      <div className="flex items-center gap-3 mt-0.5">
                        <span className="text-xs text-brand-muted">{typeLabels[r.type] ?? r.type}</span>
                        <span className="text-xs px-1.5 py-0.5 rounded bg-gray-100 text-brand-muted font-semibold">{formatLabels[r.format] ?? r.format.toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xs text-brand-muted">{fmtDateTime(r.createdAt)}</p>
                      {r.expiresAt && (
                        <p className="text-[10px] text-brand-muted flex items-center gap-1 justify-end mt-0.5">
                          <Clock size={10} /> Expira {fmtDate(r.expiresAt)}
                        </p>
                      )}
                    </div>
                    {r.fileUrl ? (
                      <button className="p-2 rounded-lg hover:bg-pastel-mint text-brand-teal shrink-0" title="Descargar">
                        <Download size={18} />
                      </button>
                    ) : (
                      <div className="p-2 text-brand-muted shrink-0" title="Generando...">
                        <Clock size={18} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-border">
                <p className="text-sm text-brand-muted">
                  {pagination.total} informes &middot; Pagina {pagination.page} de {pagination.totalPages}
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => fetchReports(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                    const start = Math.max(1, Math.min(pagination.page - 2, pagination.totalPages - 4));
                    const p = start + i;
                    if (p > pagination.totalPages) return null;
                    return (
                      <button
                        key={p}
                        onClick={() => fetchReports(p)}
                        className={`w-8 h-8 rounded-lg text-sm font-semibold ${p === pagination.page ? 'bg-brand-indigo text-white' : 'hover:bg-gray-100 text-brand-muted'}`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => fetchReports(pagination.page + 1)}
                    disabled={pagination.page >= pagination.totalPages}
                    className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
