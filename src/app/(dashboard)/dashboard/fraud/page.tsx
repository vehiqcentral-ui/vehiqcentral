'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  ShieldAlert,
  AlertTriangle,
  CheckCircle,
  Eye,
  Search,
  XCircle,
  ChevronLeft,
  ChevronRight,
  Loader2,
  ShieldCheck,
  ShieldX,
  Info,
} from 'lucide-react';
import Link from 'next/link';

/* ── Types ────────────────────────────── */

interface AlertVehicle {
  id: string;
  matricula: string;
  marca: string;
  modelo: string;
  version: string | null;
  year: number | null;
}

interface FraudAlert {
  id: string;
  alertType: string;
  severity: 'CRITICA' | 'ALTA' | 'MEDIA' | 'BAJA';
  title: string;
  description: string;
  status: 'ACTIVE' | 'INVESTIGATING' | 'RESOLVED' | 'DISMISSED';
  createdAt: string;
  vehicle: AlertVehicle;
}

interface FraudCheck {
  name: string;
  status: 'PASS' | 'FAIL' | 'WARNING' | 'UNAVAILABLE';
  detail: string;
}

interface FraudCheckResult {
  vehicle: {
    id: string;
    matricula: string;
    marca: string;
    modelo: string;
    version: string | null;
    year: number | null;
  };
  riskScore: number;
  riskLevel: string;
  alerts: {
    id: string;
    alertType: string;
    severity: string;
    title: string;
    description: string;
    status: string;
    createdAt: string;
  }[];
  checks: FraudCheck[];
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

/* ── Label / color maps ────────────────── */

const severityLabels: Record<string, string> = {
  CRITICA: 'Critica',
  ALTA: 'Alta',
  MEDIA: 'Media',
  BAJA: 'Baja',
};

const severityColors: Record<string, string> = {
  CRITICA: 'bg-red-100 text-red-700',
  ALTA: 'bg-orange-100 text-orange-700',
  MEDIA: 'bg-amber-100 text-amber-700',
  BAJA: 'bg-blue-100 text-blue-700',
};

const statusLabels: Record<string, string> = {
  ACTIVE: 'Activa',
  INVESTIGATING: 'Investigando',
  RESOLVED: 'Resuelta',
  DISMISSED: 'Descartada',
};

const statusColors: Record<string, string> = {
  ACTIVE: 'text-red-600',
  INVESTIGATING: 'text-amber-600',
  RESOLVED: 'text-brand-teal',
  DISMISSED: 'text-brand-muted',
};

const checkStatusIcons: Record<string, { icon: typeof CheckCircle; color: string }> = {
  PASS: { icon: ShieldCheck, color: 'text-green-500' },
  FAIL: { icon: ShieldX, color: 'text-red-500' },
  WARNING: { icon: AlertTriangle, color: 'text-amber-500' },
  UNAVAILABLE: { icon: Info, color: 'text-gray-400' },
};

const riskLevelLabels: Record<string, string> = {
  SAFE: 'Seguro',
  LOW: 'Bajo',
  MEDIUM: 'Medio',
  HIGH: 'Alto',
  CRITICAL: 'Critico',
};

const riskLevelColors: Record<string, string> = {
  SAFE: 'text-green-600 bg-green-50',
  LOW: 'text-blue-600 bg-blue-50',
  MEDIUM: 'text-amber-600 bg-amber-50',
  HIGH: 'text-orange-600 bg-orange-50',
  CRITICAL: 'text-red-600 bg-red-50',
};

/* ── Helpers ───────────────────────────── */

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/* ── Component ─────────────────────────── */

export default function FraudPage() {
  // Alert list state
  const [alerts, setAlerts] = useState<FraudAlert[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, perPage: 20, total: 0, totalPages: 0 });
  const [stats, setStats] = useState({ active: 0, investigating: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [searchQ, setSearchQ] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  // Fraud check form state
  const [checkMatricula, setCheckMatricula] = useState('');
  const [checking, setChecking] = useState(false);
  const [checkResult, setCheckResult] = useState<FraudCheckResult | null>(null);
  const [checkError, setCheckError] = useState('');

  /* ── Fetch alerts ─────────────────────── */

  const fetchAlerts = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), perPage: '20' });
      if (searchQ) params.set('q', searchQ);
      if (filterSeverity) params.set('severity', filterSeverity);
      if (filterStatus) params.set('status', filterStatus);

      const res = await fetch(`/api/fraud/alerts?${params}`);
      const json = await res.json();
      if (json.success) {
        setAlerts(json.data.alerts);
        setPagination(json.data.pagination);
        setStats(json.data.stats);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [searchQ, filterSeverity, filterStatus]);

  useEffect(() => {
    fetchAlerts(1);
  }, [fetchAlerts]);

  /* ── Fraud check ──────────────────────── */

  async function runFraudCheck(e: React.FormEvent) {
    e.preventDefault();
    if (!checkMatricula.trim()) return;

    setChecking(true);
    setCheckError('');
    setCheckResult(null);

    try {
      const res = await fetch(`/api/fraud?matricula=${encodeURIComponent(checkMatricula.trim().toUpperCase())}`);
      const json = await res.json();

      if (json.success) {
        setCheckResult(json.data);
      } else {
        setCheckError(json.error?.message ?? 'Vehiculo no encontrado');
      }
    } catch {
      setCheckError('Error al realizar la verificacion');
    } finally {
      setChecking(false);
    }
  }

  /* ── Render ───────────────────────────── */

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold">Deteccion de fraude</h1>
        <p className="text-brand-muted mt-1">Sistema de alertas automaticas y analisis de riesgo</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Alertas activas', value: stats.active, icon: ShieldAlert, color: 'bg-red-50 text-red-600' },
          { label: 'En investigacion', value: stats.investigating, icon: Eye, color: 'bg-pastel-peach text-amber-700' },
          { label: 'Resueltas', value: stats.resolved, icon: CheckCircle, color: 'bg-pastel-mint text-brand-teal' },
          { label: 'Total alertas', value: pagination.total, icon: ShieldAlert, color: 'bg-pastel-purple text-brand-indigo' },
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

      {/* Fraud check form */}
      <div className="card">
        <h2 className="font-heading font-bold text-brand-indigo mb-3">Verificar vehiculo</h2>
        <form onSubmit={runFraudCheck} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              value={checkMatricula}
              onChange={e => setCheckMatricula(e.target.value)}
              placeholder="Matricula (ej. 1234 ABC)"
              className="input pl-10 w-full"
            />
          </div>
          <button type="submit" disabled={checking || !checkMatricula.trim()} className="btn-primary whitespace-nowrap disabled:opacity-50">
            {checking ? <Loader2 size={16} className="animate-spin mr-2 inline" /> : <ShieldAlert size={16} className="mr-2 inline" />}
            Analizar fraude
          </button>
        </form>

        {checkError && (
          <div className="mt-4 p-3 rounded-lg bg-red-50 text-red-700 text-sm flex items-center gap-2">
            <XCircle size={16} /> {checkError}
          </div>
        )}

        {checkResult && (
          <div className="mt-4 border border-brand-border rounded-card p-4 space-y-4">
            {/* Vehicle + risk header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <Link href={`/dashboard/vehicles/${checkResult.vehicle.id}`} className="font-heading font-bold text-brand-indigo hover:underline">
                  {checkResult.vehicle.marca} {checkResult.vehicle.modelo} {checkResult.vehicle.version ?? ''}
                </Link>
                <p className="text-sm text-brand-muted font-mono">{checkResult.vehicle.matricula}{checkResult.vehicle.year ? ` · ${checkResult.vehicle.year}` : ''}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-brand-muted">Puntuacion de riesgo</p>
                  <p className="text-2xl font-heading font-extrabold text-brand-indigo">{checkResult.riskScore}<span className="text-sm font-normal">/100</span></p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${riskLevelColors[checkResult.riskLevel] ?? 'text-gray-600 bg-gray-50'}`}>
                  {riskLevelLabels[checkResult.riskLevel] ?? checkResult.riskLevel}
                </span>
              </div>
            </div>

            {/* Risk bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className={`h-2.5 rounded-full transition-all ${
                  checkResult.riskScore >= 80 ? 'bg-red-500' :
                  checkResult.riskScore >= 60 ? 'bg-orange-500' :
                  checkResult.riskScore >= 40 ? 'bg-amber-500' :
                  checkResult.riskScore >= 20 ? 'bg-blue-500' : 'bg-green-500'
                }`}
                style={{ width: `${checkResult.riskScore}%` }}
              />
            </div>

            {/* Individual checks */}
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {checkResult.checks.map(c => {
                const cfg = checkStatusIcons[c.status] ?? checkStatusIcons.UNAVAILABLE;
                const Icon = cfg.icon;
                return (
                  <div key={c.name} className="flex items-start gap-2 p-2 rounded-lg bg-gray-50">
                    <Icon size={18} className={`mt-0.5 shrink-0 ${cfg.color}`} />
                    <div>
                      <p className="text-sm font-semibold text-brand-indigo">{c.name}</p>
                      <p className="text-xs text-brand-muted">{c.detail}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active alerts from check */}
            {checkResult.alerts.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-brand-indigo mb-2">Alertas activas ({checkResult.alerts.length})</p>
                <div className="space-y-1">
                  {checkResult.alerts.map(a => (
                    <div key={a.id} className="flex items-center gap-2 text-sm">
                      <AlertTriangle size={14} className="text-red-500 shrink-0" />
                      <span className="font-medium">{a.title}</span>
                      <span className={`text-xs px-1.5 py-0.5 rounded ${severityColors[a.severity] ?? ''}`}>{severityLabels[a.severity] ?? a.severity}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Alerts list */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="font-heading font-bold text-brand-indigo">Alertas de fraude</h2>
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={filterSeverity}
              onChange={e => setFilterSeverity(e.target.value)}
              className="input text-sm py-1.5 w-auto"
            >
              <option value="">Todas severidades</option>
              <option value="CRITICA">Critica</option>
              <option value="ALTA">Alta</option>
              <option value="MEDIA">Media</option>
              <option value="BAJA">Baja</option>
            </select>
            <select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              className="input text-sm py-1.5 w-auto"
            >
              <option value="">Todos estados</option>
              <option value="ACTIVE">Activa</option>
              <option value="INVESTIGATING">Investigando</option>
              <option value="RESOLVED">Resuelta</option>
              <option value="DISMISSED">Descartada</option>
            </select>
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
              <input
                type="text"
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Buscar..."
                className="input pl-10 text-sm w-48"
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-brand-muted">
            <Loader2 size={24} className="animate-spin mr-2" /> Cargando alertas...
          </div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-12 text-brand-muted">
            <ShieldCheck size={40} className="mx-auto mb-3 text-brand-teal" />
            <p className="font-heading font-bold">Sin alertas</p>
            <p className="text-sm mt-1">No se encontraron alertas con los filtros seleccionados</p>
          </div>
        ) : (
          <div className="space-y-3">
            {alerts.map(a => (
              <div key={a.id} className={`border rounded-card p-4 hover:shadow-md transition-shadow cursor-pointer ${a.severity === 'CRITICA' ? 'border-red-200 bg-red-50/30' : 'border-brand-border'}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 ${a.severity === 'CRITICA' ? 'text-red-500' : a.severity === 'ALTA' ? 'text-orange-500' : a.severity === 'MEDIA' ? 'text-amber-500' : 'text-brand-muted'}`}>
                      {a.status === 'RESOLVED' || a.status === 'DISMISSED' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${severityColors[a.severity]}`}>
                          {severityLabels[a.severity]}
                        </span>
                        <span className="text-xs text-brand-muted">{a.alertType}</span>
                      </div>
                      <p className="font-heading font-bold text-brand-indigo mt-1">{a.title}</p>
                      <p className="text-sm text-brand-muted mt-0.5">
                        <Link href={`/dashboard/vehicles/${a.vehicle.id}`} className="font-mono hover:underline">
                          {a.vehicle.matricula}
                        </Link>
                        {' '}&middot; {a.vehicle.marca} {a.vehicle.modelo} {a.vehicle.version ?? ''}{a.vehicle.year ? ` (${a.vehicle.year})` : ''}
                      </p>
                      <p className="text-sm text-brand-muted mt-1">{a.description}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className={`text-xs font-semibold ${statusColors[a.status]}`}>{statusLabels[a.status]}</p>
                    <p className="text-xs text-brand-muted mt-1">{fmtDate(a.createdAt)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-border">
            <p className="text-sm text-brand-muted">
              Mostrando {(pagination.page - 1) * pagination.perPage + 1}–{Math.min(pagination.page * pagination.perPage, pagination.total)} de {pagination.total}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => fetchAlerts(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"
              >
                <ChevronLeft size={18} />
              </button>
              {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
                const start = Math.max(1, Math.min(pagination.page - 2, pagination.totalPages - 4));
                const p = start + i;
                if (p > pagination.totalPages) return null;
                return (
                  <button
                    key={p}
                    onClick={() => fetchAlerts(p)}
                    className={`w-8 h-8 rounded text-sm font-medium ${p === pagination.page ? 'bg-brand-indigo text-white' : 'hover:bg-gray-100 text-brand-muted'}`}
                  >
                    {p}
                  </button>
                );
              })}
              <button
                onClick={() => fetchAlerts(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="p-1.5 rounded hover:bg-gray-100 disabled:opacity-30"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
