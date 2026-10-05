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
  RotateCcw,
} from 'lucide-react';
import Link from 'next/link';
import {
  Input, Select, Badge, Card, ProgressBar, EmptyState,
} from '@/components/ui';
import { DonutChart } from '@/components/dashboard/DonutChart';

/* -- Types -------------------------------- */

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

/* -- Label / color maps ------------------- */

const severityLabels: Record<string, string> = {
  CRITICA: 'Critica',
  ALTA: 'Alta',
  MEDIA: 'Media',
  BAJA: 'Baja',
};

const severityBadgeVariant: Record<string, 'danger' | 'warning' | 'gold' | 'info'> = {
  CRITICA: 'danger',
  ALTA: 'warning',
  MEDIA: 'gold',
  BAJA: 'info',
};

const statusLabels: Record<string, string> = {
  ACTIVE: 'Activa',
  INVESTIGATING: 'Investigando',
  RESOLVED: 'Resuelta',
  DISMISSED: 'Descartada',
};

const statusBadgeVariant: Record<string, 'danger' | 'warning' | 'success' | 'default'> = {
  ACTIVE: 'danger',
  INVESTIGATING: 'warning',
  RESOLVED: 'success',
  DISMISSED: 'default',
};

const severityOptions = [
  { value: '', label: 'Todas severidades' },
  { value: 'CRITICA', label: 'Critica' },
  { value: 'ALTA', label: 'Alta' },
  { value: 'MEDIA', label: 'Media' },
  { value: 'BAJA', label: 'Baja' },
];

const statusOptions = [
  { value: '', label: 'Todos estados' },
  { value: 'ACTIVE', label: 'Activa' },
  { value: 'INVESTIGATING', label: 'Investigando' },
  { value: 'RESOLVED', label: 'Resuelta' },
  { value: 'DISMISSED', label: 'Descartada' },
];

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

const severityColors: Record<string, string> = {
  CRITICA: '#EF4444',
  ALTA: '#F97316',
  MEDIA: '#F59E0B',
  BAJA: '#6366F1',
};

const riskBarColor = (score: number): 'teal' | 'indigo' | 'gold' | 'red' => {
  if (score >= 80) return 'red';
  if (score >= 60) return 'gold';
  if (score >= 40) return 'gold';
  return 'teal';
};

const riskBadgeVariant = (level: string): 'success' | 'info' | 'warning' | 'danger' | 'default' => {
  const map: Record<string, 'success' | 'info' | 'warning' | 'danger'> = {
    SAFE: 'success',
    LOW: 'info',
    MEDIUM: 'warning',
    HIGH: 'danger',
    CRITICAL: 'danger',
  };
  return map[level] ?? 'default';
};

/* -- Helpers ------------------------------ */

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/* -- Component ---------------------------- */

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

  // Batch selection state
  const [selectedAlertIds, setSelectedAlertIds] = useState<Set<string>>(new Set());

  /* -- Fetch alerts ----------------------- */

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

  /* -- Fraud check ------------------------ */

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

  /* -- Render ----------------------------- */

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
          <Card key={s.label}>
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}><s.icon size={18} /></div>
              <div>
                <p className="text-xl font-heading font-extrabold text-brand-indigo">{s.value}</p>
                <p className="text-xs text-brand-muted">{s.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Risk distribution + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Donut chart */}
        <Card>
          <DonutChart
            title="Distribucion por severidad"
            data={(() => {
              const counts: Record<string, number> = { CRITICA: 0, ALTA: 0, MEDIA: 0, BAJA: 0 };
              alerts.forEach(a => { counts[a.severity] = (counts[a.severity] || 0) + 1; });
              return Object.entries(counts)
                .filter(([, v]) => v > 0)
                .map(([key, value]) => ({
                  label: severityLabels[key] ?? key,
                  value,
                  color: severityColors[key] ?? '#94A3B8',
                }));
            })()}
            centerLabel="Total"
            centerValue={String(alerts.length)}
            size={180}
          />
        </Card>

        {/* Recent activity timeline */}
        <Card>
          <h3 className="font-heading font-bold text-brand-indigo mb-4 text-sm">Actividad reciente</h3>
          {alerts.length === 0 ? (
            <p className="text-sm text-brand-muted">Sin actividad reciente</p>
          ) : (
            <div className="relative pl-6">
              {/* Vertical line */}
              <div className="absolute left-[7px] top-1 bottom-1 w-px bg-brand-border" />
              <div className="space-y-4">
                {alerts.slice(0, 5).map(a => (
                  <div key={a.id} className="relative flex items-start gap-3">
                    {/* Dot */}
                    <div
                      className="absolute -left-6 top-1 w-[14px] h-[14px] rounded-full border-2 border-white shrink-0"
                      style={{ backgroundColor: severityColors[a.severity] ?? '#94A3B8' }}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-brand-indigo truncate">{a.title}</p>
                      <p className="text-xs text-brand-muted">
                        <span className="font-mono">{a.vehicle.matricula}</span>
                        {' '}&middot; {fmtDate(a.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>

      {/* Fraud check form */}
      <Card>
        <h2 className="font-heading font-bold text-brand-indigo mb-3">Verificar vehiculo</h2>
        <form onSubmit={runFraudCheck} className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input
              value={checkMatricula}
              onChange={e => setCheckMatricula(e.target.value)}
              placeholder="Matricula (ej. 1234 ABC)"
              icon={<Search size={16} />}
            />
            <p className="text-xs text-brand-muted mt-1">Introduce la matricula del vehiculo para analizar su historial de fraude</p>
          </div>
          <button type="submit" disabled={checking || !checkMatricula.trim()} className="btn-primary whitespace-nowrap disabled:opacity-50 self-start">
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
          <Card className="mt-4 border border-brand-border">
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
                <Badge variant={riskBadgeVariant(checkResult.riskLevel)}>
                  {riskLevelLabels[checkResult.riskLevel] ?? checkResult.riskLevel}
                </Badge>
              </div>
            </div>

            {/* Risk bar */}
            <ProgressBar
              value={checkResult.riskScore}
              size="md"
              color={riskBarColor(checkResult.riskScore)}
              className="mt-3"
            />

            {/* Individual checks */}
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3 mt-4">
              {checkResult.checks.map(c => {
                const cfg = checkStatusIcons[c.status] ?? checkStatusIcons.UNAVAILABLE;
                const Icon = cfg.icon;
                return (
                  <div key={c.name} className="flex items-start gap-2 p-2 rounded-lg bg-brand-alt-bg">
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
              <div className="mt-4">
                <p className="text-sm font-semibold text-brand-indigo mb-2">Alertas activas ({checkResult.alerts.length})</p>
                <div className="space-y-1">
                  {checkResult.alerts.map(a => (
                    <div key={a.id} className="flex items-center gap-2 text-sm">
                      <AlertTriangle size={14} className="text-red-500 shrink-0" />
                      <span className="font-medium">{a.title}</span>
                      <Badge variant={severityBadgeVariant[a.severity] ?? 'default'} className="text-[10px]">
                        {severityLabels[a.severity] ?? a.severity}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reset button */}
            <button
              type="button"
              onClick={() => { setCheckResult(null); setCheckMatricula(''); setCheckError(''); }}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-brand-indigo hover:text-brand-teal transition-colors"
            >
              <RotateCcw size={14} />
              Verificar otro vehiculo
            </button>
          </Card>
        )}
      </Card>

      {/* Alerts list */}
      <Card>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <h2 className="font-heading font-bold text-brand-indigo">Alertas de fraude</h2>
          <div className="flex flex-wrap items-center gap-2">
            <Select
              value={filterSeverity}
              onChange={e => setFilterSeverity(e.target.value)}
              options={severityOptions}
            />
            <Select
              value={filterStatus}
              onChange={e => setFilterStatus(e.target.value)}
              options={statusOptions}
            />
            <div className="w-48">
              <Input
                value={searchQ}
                onChange={e => setSearchQ(e.target.value)}
                placeholder="Buscar..."
                icon={<Search size={16} />}
              />
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12 text-brand-muted">
            <Loader2 size={24} className="animate-spin mr-2" /> Cargando alertas...
          </div>
        ) : alerts.length === 0 ? (
          <EmptyState
            icon={<ShieldCheck size={40} />}
            title="Sin alertas"
            description="No se encontraron alertas con los filtros seleccionados"
          />
        ) : (
          <div className="space-y-3">
            {alerts.map(a => (
              <div key={a.id} className={`border rounded-card p-4 hover:shadow-md transition-shadow cursor-pointer ${a.severity === 'CRITICA' ? 'border-red-200 bg-red-50/30' : 'border-brand-border'} ${selectedAlertIds.has(a.id) ? 'ring-2 ring-brand-indigo/30' : ''}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {/* Checkbox */}
                    <input
                      type="checkbox"
                      checked={selectedAlertIds.has(a.id)}
                      onChange={(e) => {
                        e.stopPropagation();
                        setSelectedAlertIds(prev => {
                          const next = new Set(prev);
                          if (next.has(a.id)) next.delete(a.id); else next.add(a.id);
                          return next;
                        });
                      }}
                      className="mt-1.5 h-4 w-4 rounded border-brand-border text-brand-indigo focus:ring-brand-indigo cursor-pointer shrink-0"
                    />
                    <div className={`mt-1 ${a.severity === 'CRITICA' ? 'text-red-500' : a.severity === 'ALTA' ? 'text-orange-500' : a.severity === 'MEDIA' ? 'text-amber-500' : 'text-brand-muted'}`}>
                      {a.status === 'RESOLVED' || a.status === 'DISMISSED' ? <CheckCircle size={20} /> : <AlertTriangle size={20} />}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge variant={severityBadgeVariant[a.severity] ?? 'default'} className="text-[10px]">
                          {severityLabels[a.severity]}
                        </Badge>
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
                    <Badge variant={statusBadgeVariant[a.status] ?? 'default'} className="text-[10px]">
                      {statusLabels[a.status]}
                    </Badge>
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
      </Card>
      {/* Floating batch action bar */}
      {selectedAlertIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-brand-indigo text-white rounded-xl shadow-xl px-6 py-3 flex items-center gap-4 animate-in slide-in-from-bottom-4">
          <span className="text-sm font-medium">{selectedAlertIds.size} alerta{selectedAlertIds.size > 1 ? 's' : ''} seleccionada{selectedAlertIds.size > 1 ? 's' : ''}</span>
          <div className="h-5 w-px bg-white/30" />
          <button
            onClick={() => { /* TODO: batch update status to RESOLVED */ setSelectedAlertIds(new Set()); }}
            className="text-sm font-medium px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
          >
            <CheckCircle size={14} className="inline mr-1.5 -mt-0.5" />
            Marcar como resuelta
          </button>
          <button
            onClick={() => { /* TODO: batch update status to INVESTIGATING */ setSelectedAlertIds(new Set()); }}
            className="text-sm font-medium px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
          >
            <Eye size={14} className="inline mr-1.5 -mt-0.5" />
            Marcar como investigando
          </button>
          <button
            onClick={() => { /* TODO: batch update status to DISMISSED */ setSelectedAlertIds(new Set()); }}
            className="text-sm font-medium px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 transition-colors"
          >
            <XCircle size={14} className="inline mr-1.5 -mt-0.5" />
            Descartar
          </button>
          <button
            onClick={() => setSelectedAlertIds(new Set())}
            className="text-sm text-white/70 hover:text-white ml-2 transition-colors"
          >
            Cancelar
          </button>
        </div>
      )}
    </div>
  );
}
