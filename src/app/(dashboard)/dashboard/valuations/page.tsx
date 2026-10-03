'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  TrendingUp, TrendingDown, Minus,
  Car, Search, BarChart3, Clock, Bot,
  Loader2, ChevronLeft, ChevronRight, Eye,
} from 'lucide-react';

interface ValuationRow {
  id: string;
  matricula: string;
  vehicleName: string;
  year: number | null;
  vehicleId: string;
  mileage: number;
  condition: string;
  valuationLow: number;
  valuationMid: number;
  valuationHigh: number;
  confidence: number;
  marketTrend: string | null;
  avgListingPrice: number | null;
  createdAt: string;
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

interface Stats {
  today: number;
  thisMonth: number;
  total: number;
}

const conditionLabels: Record<string, string> = {
  COMO_NUEVO: 'Como nuevo',
  MUY_BUENO: 'Muy bueno',
  BUENO: 'Bueno',
  ACEPTABLE: 'Aceptable',
  NECESITA_REPARACION: 'Necesita reparacion',
};

const trendIcons: Record<string, typeof TrendingUp> = {
  SUBIENDO: TrendingUp,
  ESTABLE: Minus,
  BAJANDO: TrendingDown,
};

const trendColors: Record<string, string> = {
  SUBIENDO: 'text-green-600',
  ESTABLE: 'text-amber-600',
  BAJANDO: 'text-red-600',
};

function fmtEuro(cents: number): string {
  return (cents / 100).toLocaleString('es-ES', { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + ' €';
}

function fmtKm(km: number): string {
  return km.toLocaleString('es-ES') + ' km';
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'Ahora mismo';
  if (mins < 60) return `Hace ${mins} min`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `Hace ${hours}h`;
  const days = Math.floor(hours / 24);
  return `Hace ${days}d`;
}

export default function ValuationsPage() {
  const router = useRouter();
  const [valuations, setValuations] = useState<ValuationRow[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, perPage: 20, total: 0, totalPages: 0 });
  const [stats, setStats] = useState<Stats>({ today: 0, thisMonth: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  /* New valuation form */
  const [plate, setPlate] = useState('');
  const [mileage, setMileage] = useState('');
  const [condition, setCondition] = useState('BUENO');
  const [submitting, setSubmitting] = useState(false);
  const [valuationResult, setValuationResult] = useState<null | {
    vehicle: string;
    low: number; mid: number; high: number;
    confidence: number;
    trend: string;
  }>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const fetchValuations = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), perPage: '20' });
      if (search) params.set('q', search);
      const res = await fetch(`/api/valuations/list?${params}`);
      const json = await res.json();
      if (json.success) {
        setValuations(json.data.valuations);
        setPagination(json.data.pagination);
        setStats(json.data.stats);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => { fetchValuations(1); }, [fetchValuations]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const handleSubmitValuation = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plate.trim()) return;
    setSubmitting(true);
    setSubmitError(null);
    setValuationResult(null);

    try {
      const res = await fetch('/api/valuations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matricula: plate.trim().toUpperCase(),
          mileage: parseInt(mileage) || 50000,
          condition,
        }),
      });
      const json = await res.json();
      if (json.success) {
        setValuationResult({
          vehicle: `${json.data.vehicle.marca} ${json.data.vehicle.modelo}`,
          low: json.data.valuation.low,
          mid: json.data.valuation.mid,
          high: json.data.valuation.high,
          confidence: json.data.valuation.confidence,
          trend: json.data.market.trend,
        });
        // Refresh list
        fetchValuations(1);
      } else {
        setSubmitError(json.error?.message ?? 'Error al valorar');
      }
    } catch {
      setSubmitError('Error de conexion');
    } finally {
      setSubmitting(false);
    }
  };

  const kpis = [
    { label: 'Valoraciones hoy', value: stats.today.toLocaleString('es-ES'), icon: TrendingUp, color: 'bg-pastel-blue text-brand-indigo' },
    { label: 'Este mes', value: stats.thisMonth.toLocaleString('es-ES'), icon: BarChart3, color: 'bg-pastel-mint text-brand-teal' },
    { label: 'Total realizadas', value: stats.total.toLocaleString('es-ES'), icon: Bot, color: 'bg-pastel-peach text-amber-700' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">Valoraciones</h1>
        <p className="text-brand-muted mt-1">Valoracion inteligente con IA basada en datos de mercado en tiempo real</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-4">
        {kpis.map(s => (
          <div key={s.label} className="card flex items-center gap-3">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}><s.icon size={18} /></div>
            <div>
              <p className="text-xl font-heading font-extrabold text-brand-indigo">{s.value}</p>
              <p className="text-xs text-brand-muted">{s.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* New valuation form */}
      <div className="card border-brand-teal/30 bg-pastel-mint/20">
        <div className="flex items-center gap-2 mb-4">
          <Bot size={20} className="text-brand-teal" />
          <h2 className="font-heading font-bold text-brand-indigo">Nueva valoracion IA</h2>
        </div>
        <form onSubmit={handleSubmitValuation} className="grid md:grid-cols-5 gap-3">
          <div className="relative md:col-span-2">
            <Car size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              value={plate}
              onChange={e => setPlate(e.target.value)}
              placeholder="Matricula (ej: 1234 ABC)"
              className="input pl-10 text-sm w-full"
            />
          </div>
          <input
            type="number"
            value={mileage}
            onChange={e => setMileage(e.target.value)}
            placeholder="Kilometraje"
            className="input text-sm w-full"
          />
          <select
            value={condition}
            onChange={e => setCondition(e.target.value)}
            className="input text-sm w-full"
          >
            <option value="COMO_NUEVO">Como nuevo</option>
            <option value="MUY_BUENO">Muy bueno</option>
            <option value="BUENO">Bueno</option>
            <option value="ACEPTABLE">Aceptable</option>
            <option value="NECESITA_REPARACION">Necesita reparacion</option>
          </select>
          <button type="submit" disabled={submitting} className="btn-primary text-sm flex items-center justify-center gap-2">
            {submitting ? <Loader2 size={14} className="animate-spin" /> : <Search size={14} />}
            Valorar
          </button>
        </form>

        {submitError && (
          <p className="text-sm text-red-600 mt-3">{submitError}</p>
        )}

        {/* Valuation result */}
        {valuationResult && (
          <div className="mt-4 p-4 bg-white rounded-lg border border-brand-border">
            <p className="text-sm text-brand-muted mb-2">{valuationResult.vehicle}</p>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-xs text-brand-muted">Minimo</p>
                <p className="text-lg font-bold text-brand-muted">{fmtEuro(valuationResult.low)}</p>
              </div>
              <div>
                <p className="text-xs text-brand-teal font-semibold">Valor estimado</p>
                <p className="text-2xl font-extrabold text-brand-teal">{fmtEuro(valuationResult.mid)}</p>
              </div>
              <div>
                <p className="text-xs text-brand-muted">Maximo</p>
                <p className="text-lg font-bold text-brand-muted">{fmtEuro(valuationResult.high)}</p>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="flex items-center gap-1">
                <span className="text-xs text-brand-muted">Confianza:</span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className="h-2 bg-brand-teal rounded-full" style={{ width: `${valuationResult.confidence}%` }} />
                </div>
                <span className="text-xs font-semibold">{valuationResult.confidence}%</span>
              </div>
              {valuationResult.trend && (() => {
                const TrendIcon = trendIcons[valuationResult.trend] ?? Minus;
                return (
                  <span className={`text-xs font-semibold flex items-center gap-1 ${trendColors[valuationResult.trend] ?? ''}`}>
                    <TrendIcon size={12} /> {valuationResult.trend === 'SUBIENDO' ? 'Al alza' : valuationResult.trend === 'BAJANDO' ? 'A la baja' : 'Estable'}
                  </span>
                );
              })()}
            </div>
          </div>
        )}
      </div>

      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-3">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
          <input
            type="text"
            value={searchInput}
            onChange={e => setSearchInput(e.target.value)}
            placeholder="Buscar por matricula, marca o modelo..."
            className="input pl-10 py-2.5 text-sm w-full"
          />
        </div>
        <button type="submit" className="btn-primary text-sm px-6">Buscar</button>
      </form>

      {/* Valuations table */}
      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-brand-indigo" />
          </div>
        ) : valuations.length === 0 ? (
          <div className="text-center py-20">
            <TrendingUp size={48} className="mx-auto text-brand-muted/30 mb-3" />
            <p className="text-brand-muted font-semibold">No se encontraron valoraciones</p>
            <p className="text-xs text-brand-muted mt-1">Realiza tu primera valoracion arriba</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-border bg-gray-50/50">
                  <th className="text-left px-4 py-3 font-semibold text-brand-muted">Vehiculo</th>
                  <th className="text-right px-4 py-3 font-semibold text-brand-muted">Valor estimado</th>
                  <th className="text-right px-4 py-3 font-semibold text-brand-muted hidden md:table-cell">Precio mercado</th>
                  <th className="text-center px-4 py-3 font-semibold text-brand-muted hidden md:table-cell">Confianza</th>
                  <th className="text-center px-4 py-3 font-semibold text-brand-muted hidden lg:table-cell">Tendencia</th>
                  <th className="text-left px-4 py-3 font-semibold text-brand-muted">Fecha</th>
                  <th className="text-right px-4 py-3 font-semibold text-brand-muted"></th>
                </tr>
              </thead>
              <tbody>
                {valuations.map(v => {
                  const TrendIcon = trendIcons[v.marketTrend ?? ''] ?? Minus;
                  return (
                    <tr key={v.id} className="border-b border-brand-border/50 hover:bg-pastel-blue/20 transition-colors">
                      <td className="px-4 py-3">
                        <span className="font-mono font-bold text-brand-indigo">{v.matricula}</span>
                        <p className="text-xs text-brand-muted">{v.vehicleName} {v.year ? `· ${v.year}` : ''}</p>
                        <p className="text-[10px] text-brand-muted">{fmtKm(v.mileage)} · {conditionLabels[v.condition] ?? v.condition}</p>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <p className="font-heading font-bold text-brand-teal">{fmtEuro(v.valuationMid)}</p>
                        <p className="text-[10px] text-brand-muted">{fmtEuro(v.valuationLow)} – {fmtEuro(v.valuationHigh)}</p>
                      </td>
                      <td className="px-4 py-3 text-right hidden md:table-cell text-brand-muted">
                        {v.avgListingPrice ? fmtEuro(v.avgListingPrice) : '—'}
                      </td>
                      <td className="px-4 py-3 text-center hidden md:table-cell">
                        <div className="flex items-center justify-center gap-1.5">
                          <div className="w-14 bg-gray-200 rounded-full h-1.5">
                            <div className="h-1.5 bg-brand-teal rounded-full" style={{ width: `${v.confidence * 100}%` }} />
                          </div>
                          <span className="text-xs font-semibold">{Math.round(v.confidence * 100)}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-center hidden lg:table-cell">
                        {v.marketTrend && (
                          <span className={`inline-flex items-center gap-1 text-xs font-semibold ${trendColors[v.marketTrend] ?? ''}`}>
                            <TrendIcon size={12} />
                            {v.marketTrend === 'SUBIENDO' ? 'Alza' : v.marketTrend === 'BAJANDO' ? 'Baja' : 'Estable'}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-brand-muted text-xs">{timeAgo(v.createdAt)}</td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/dashboard/vehicles/${v.vehicleId}`}
                          className="inline-flex items-center gap-1 text-xs font-semibold text-brand-indigo hover:text-brand-teal transition-colors"
                        >
                          <Eye size={14} /> Ver
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-brand-border bg-gray-50/50">
            <p className="text-xs text-brand-muted">
              Mostrando {((pagination.page - 1) * pagination.perPage) + 1}–
              {Math.min(pagination.page * pagination.perPage, pagination.total)} de {pagination.total.toLocaleString('es-ES')}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchValuations(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="p-1.5 rounded-lg border border-brand-border hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-semibold text-brand-indigo">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchValuations(pagination.page + 1)}
                disabled={pagination.page >= pagination.totalPages}
                className="p-1.5 rounded-lg border border-brand-border hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
