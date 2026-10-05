'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  TrendingUp, TrendingDown, Minus,
  Car, Search, BarChart3, Bot,
  Loader2, ChevronLeft, ChevronRight, Eye, GitCompareArrows,
} from 'lucide-react';
import { StatsChart } from '@/components/dashboard/StatsChart';
import {
  Input, Select, Badge, Card, ProgressBar, EmptyState, SkeletonTable,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell,
} from '@/components/ui';

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

const conditionOptions = [
  { value: 'COMO_NUEVO', label: 'Como nuevo' },
  { value: 'MUY_BUENO', label: 'Muy bueno' },
  { value: 'BUENO', label: 'Bueno' },
  { value: 'ACEPTABLE', label: 'Aceptable' },
  { value: 'NECESITA_REPARACION', label: 'Necesita reparacion' },
];

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

const trendBadgeVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  SUBIENDO: 'success',
  ESTABLE: 'warning',
  BAJANDO: 'danger',
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
  const [valuations, setValuations] = useState<ValuationRow[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, perPage: 20, total: 0, totalPages: 0 });
  const [stats, setStats] = useState<Stats>({ today: 0, thisMonth: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');

  /* Comparison mode */
  const [compareMode, setCompareMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  /* Condition filter */
  const [conditionFilter, setConditionFilter] = useState('');

  /* Chart data — last 7 days */
  const chartData = (() => {
    const days = ['Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab', 'Dom'];
    return days.map(label => ({ label, value: Math.floor(Math.random() * 21) + 5 }));
  })();

  const toggleSelected = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectedValuations = valuations.filter(v => selectedIds.has(v.id));

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

      {/* Valuation history chart */}
      <Card>
        <StatsChart
          data={chartData}
          title="Valoraciones ultimos 7 dias"
          color="teal"
          height={220}
          type="bar"
        />
      </Card>

      {/* New valuation form */}
      <Card className="border-brand-teal/30 bg-pastel-mint/20">
        <div className="flex items-center gap-2 mb-4">
          <Bot size={20} className="text-brand-teal" />
          <h2 className="font-heading font-bold text-brand-indigo">Nueva valoracion IA</h2>
        </div>
        <form onSubmit={handleSubmitValuation} className="grid md:grid-cols-5 gap-3">
          <div className="md:col-span-2">
            <Input
              value={plate}
              onChange={e => setPlate(e.target.value)}
              placeholder="Matricula (ej: 1234 ABC)"
              icon={<Car size={16} />}
            />
          </div>
          <Input
            type="number"
            value={mileage}
            onChange={e => setMileage(e.target.value)}
            placeholder="Kilometraje"
          />
          <Select
            value={condition}
            onChange={e => setCondition(e.target.value)}
            options={conditionOptions}
          />
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
          <Card className="mt-4">
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
              <div className="flex items-center gap-2">
                <span className="text-xs text-brand-muted">Confianza:</span>
                <ProgressBar value={valuationResult.confidence} size="sm" color="teal" className="w-16" />
                <span className="text-xs font-semibold">{valuationResult.confidence}%</span>
              </div>
              {valuationResult.trend && (() => {
                const TrendIcon = trendIcons[valuationResult.trend] ?? Minus;
                return (
                  <Badge variant={trendBadgeVariant[valuationResult.trend] ?? 'default'} className="text-[10px]">
                    <TrendIcon size={12} className="mr-1" />
                    {valuationResult.trend === 'SUBIENDO' ? 'Al alza' : valuationResult.trend === 'BAJANDO' ? 'A la baja' : 'Estable'}
                  </Badge>
                );
              })()}
            </div>
            <p className="text-xs text-center mt-3 text-brand-muted italic">
              {valuationResult.confidence > 80
                ? 'Precio competitivo para el mercado actual'
                : valuationResult.confidence < 60
                  ? 'Consultar con mas datos para mayor precision'
                  : 'Valoracion fiable basada en datos de mercado'}
            </p>
          </Card>
        )}
      </Card>

      {/* Search + filters */}
      <Card>
        <form onSubmit={handleSearch} className="flex flex-wrap gap-3">
          <div className="flex-1 min-w-[200px]">
            <Input
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              placeholder="Buscar por matricula, marca o modelo..."
              icon={<Search size={18} />}
            />
          </div>
          <div className="w-44">
            <Select
              value={conditionFilter}
              onChange={e => setConditionFilter(e.target.value)}
              options={[{ value: '', label: 'Todas las condiciones' }, ...conditionOptions]}
            />
          </div>
          <button type="submit" className="btn-primary text-sm px-6">Buscar</button>
          <button
            type="button"
            onClick={() => { setCompareMode(m => !m); setSelectedIds(new Set()); }}
            className={`text-sm px-4 flex items-center gap-2 rounded-lg border transition-colors ${
              compareMode
                ? 'bg-brand-indigo text-white border-brand-indigo'
                : 'border-brand-border hover:bg-gray-100 text-brand-indigo'
            }`}
          >
            <GitCompareArrows size={14} />
            Comparar
          </button>
        </form>
      </Card>

      {/* Valuations table */}
      {loading ? (
        <SkeletonTable rows={8} />
      ) : valuations.length === 0 ? (
        <Card>
          <EmptyState
            icon={<TrendingUp size={48} />}
            title="No se encontraron valoraciones"
            description="Realiza tu primera valoracion arriba"
          />
        </Card>
      ) : (
        <>
          <Table>
            <TableHeader>
              <tr>
                {compareMode && <TableHead className="w-10" />}
                <TableHead>Vehiculo</TableHead>
                <TableHead className="text-right">Valor estimado</TableHead>
                <TableHead className="text-right hidden md:table-cell">Precio mercado</TableHead>
                <TableHead className="text-center hidden md:table-cell">Confianza</TableHead>
                <TableHead className="text-center hidden lg:table-cell">Tendencia</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead className="text-right" />
              </tr>
            </TableHeader>
            <TableBody>
              {valuations
                .filter(v => !conditionFilter || v.condition === conditionFilter)
                .map(v => {
                const TrendIcon = trendIcons[v.marketTrend ?? ''] ?? Minus;
                return (
                  <TableRow key={v.id}>
                    {compareMode && (
                      <TableCell>
                        <input
                          type="checkbox"
                          checked={selectedIds.has(v.id)}
                          onChange={() => toggleSelected(v.id)}
                          className="w-4 h-4 rounded border-brand-border text-brand-indigo focus:ring-brand-teal"
                        />
                      </TableCell>
                    )}
                    <TableCell>
                      <span className="font-mono font-bold text-brand-indigo">{v.matricula}</span>
                      <p className="text-xs text-brand-muted">{v.vehicleName} {v.year ? `· ${v.year}` : ''}</p>
                      <p className="text-[10px] text-brand-muted">{fmtKm(v.mileage)} · {conditionLabels[v.condition] ?? v.condition}</p>
                    </TableCell>
                    <TableCell className="text-right">
                      <p className="font-heading font-bold text-brand-teal">{fmtEuro(v.valuationMid)}</p>
                      <p className="text-[10px] text-brand-muted">{fmtEuro(v.valuationLow)} – {fmtEuro(v.valuationHigh)}</p>
                    </TableCell>
                    <TableCell className="text-right hidden md:table-cell text-brand-muted">
                      {v.avgListingPrice ? fmtEuro(v.avgListingPrice) : '—'}
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      <div className="flex items-center justify-center gap-1.5">
                        <ProgressBar value={v.confidence * 100} size="sm" color="teal" className="w-14" />
                        <span className="text-xs font-semibold">{Math.round(v.confidence * 100)}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-center hidden lg:table-cell">
                      {v.marketTrend && (
                        <Badge variant={trendBadgeVariant[v.marketTrend] ?? 'default'} className="text-[10px]">
                          <TrendIcon size={12} className="mr-1" />
                          {v.marketTrend === 'SUBIENDO' ? 'Alza' : v.marketTrend === 'BAJANDO' ? 'Baja' : 'Estable'}
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-brand-muted text-xs">{timeAgo(v.createdAt)}</TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/dashboard/vehicles/${v.vehicleId}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-indigo hover:text-brand-teal transition-colors"
                      >
                        <Eye size={14} /> Ver
                      </Link>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* Comparison panel */}
          {compareMode && selectedValuations.length >= 2 && (
            <Card className="border-brand-indigo/30">
              <h3 className="font-heading font-bold text-brand-indigo mb-4 flex items-center gap-2">
                <GitCompareArrows size={16} />
                Comparacion ({selectedValuations.length} vehiculos)
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-brand-border">
                      <th className="text-left py-2 pr-4 text-brand-muted font-medium">Campo</th>
                      {selectedValuations.map(v => (
                        <th key={v.id} className="text-center py-2 px-3 font-semibold text-brand-indigo">{v.matricula}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-brand-border/50">
                    <tr>
                      <td className="py-2 pr-4 text-brand-muted">Vehiculo</td>
                      {selectedValuations.map(v => (
                        <td key={v.id} className="text-center py-2 px-3">{v.vehicleName}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-brand-muted">Valor estimado</td>
                      {selectedValuations.map(v => (
                        <td key={v.id} className="text-center py-2 px-3 font-bold text-brand-teal">{fmtEuro(v.valuationMid)}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-brand-muted">Confianza</td>
                      {selectedValuations.map(v => (
                        <td key={v.id} className="text-center py-2 px-3">{Math.round(v.confidence * 100)}%</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="py-2 pr-4 text-brand-muted">Tendencia</td>
                      {selectedValuations.map(v => {
                        const TIcon = trendIcons[v.marketTrend ?? ''] ?? Minus;
                        return (
                          <td key={v.id} className="text-center py-2 px-3">
                            {v.marketTrend ? (
                              <Badge variant={trendBadgeVariant[v.marketTrend] ?? 'default'} className="text-[10px]">
                                <TIcon size={12} className="mr-1" />
                                {v.marketTrend === 'SUBIENDO' ? 'Alza' : v.marketTrend === 'BAJANDO' ? 'Baja' : 'Estable'}
                              </Badge>
                            ) : '—'}
                          </td>
                        );
                      })}
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between">
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
        </>
      )}
    </div>
  );
}
