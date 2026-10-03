'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Car, Fuel, Gauge, Calendar, MapPin, Shield,
  ShieldAlert, AlertTriangle, CheckCircle, XCircle, Clock,
  Eye, FileText, Users, Loader2, Info, Activity,
  Wrench, TrendingUp,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface InspectionSummary {
  id: string;
  date: string;
  result: string;
  mileage: number | null;
  stationName: string | null;
  nextInspection: string | null;
}

interface MileagePoint {
  date: string;
  mileage: number;
  source: string;
}

interface VehicleDetail {
  id: string;
  matricula: string;
  vin: string;
  marca: string;
  modelo: string;
  version: string;
  year: number | null;
  combustible: string;
  potenciaCv: number;
  color: string;
  provinciaActual: string;
  dgtStatus: string;
  carroceria: string;
  cilindrada: number;
  potenciaKw: number;
  co2Emissions: number;
  euroNorm: string;
  transmision: string;
  traccion: string;
  puertas: number;
  plazas: number;
  pesoMax: number;
  tara: number;
  uso: string;
  historyCount: number;
  inspectionCount: number;
  fraudAlertCount: number;
  lastInspection: InspectionSummary | null;
  latestMileage: MileagePoint | null;
  history: {
    ownerCount: number;
    events: {
      id: string;
      eventType: string;
      eventDate: string;
      description: string;
      source: string;
      province: string | null;
    }[];
    mileageHistory: MileagePoint[];
    inspections: InspectionSummary[];
    fraudAlerts: {
      id: string;
      alertType: string;
      severity: string;
      title: string;
      description: string;
      status: string;
      createdAt: string;
    }[];
  } | null;
}

/* ------------------------------------------------------------------ */
/*  Labels / colours                                                    */
/* ------------------------------------------------------------------ */

const fuelLabels: Record<string, string> = {
  GASOLINA: 'Gasolina', DIESEL: 'Diesel', HIBRIDO: 'Hibrido',
  HIBRIDO_ENCHUFABLE: 'PHEV', ELECTRICO: 'Electrico',
  GLP: 'GLP', GNC: 'GNC', HIDROGENO: 'H2',
};

const fuelColors: Record<string, string> = {
  GASOLINA: 'bg-amber-100 text-amber-800',
  DIESEL: 'bg-gray-100 text-gray-800',
  HIBRIDO: 'bg-blue-100 text-blue-800',
  HIBRIDO_ENCHUFABLE: 'bg-cyan-100 text-cyan-800',
  ELECTRICO: 'bg-green-100 text-green-800',
  GLP: 'bg-purple-100 text-purple-800',
  GNC: 'bg-indigo-100 text-indigo-800',
  HIDROGENO: 'bg-teal-100 text-teal-800',
};

const statusColors: Record<string, string> = {
  Alta: 'bg-green-100 text-green-700',
  'Baja temporal': 'bg-amber-100 text-amber-700',
  'Baja definitiva': 'bg-red-100 text-red-700',
};

const severityColors: Record<string, string> = {
  CRITICA: 'bg-red-100 text-red-700',
  ALTA: 'bg-orange-100 text-orange-700',
  MEDIA: 'bg-yellow-100 text-yellow-700',
  BAJA: 'bg-blue-100 text-blue-700',
};

const eventTypeLabels: Record<string, string> = {
  TRANSFERENCIA: 'Transferencia',
  MATRICULACION: 'Matriculacion',
  BAJA_TEMPORAL: 'Baja temporal',
  BAJA_DEFINITIVA: 'Baja definitiva',
  REHABILITACION: 'Rehabilitacion',
  CAMBIO_DOMICILIO: 'Cambio domicilio',
  DUPLICADO_PERMISO: 'Duplicado permiso',
  REFORMA: 'Reforma',
  ITV: 'Inspeccion ITV',
  CAMBIO_TITULAR: 'Cambio de titular',
};

const eventTypeIcons: Record<string, typeof Users> = {
  TRANSFERENCIA: Users,
  MATRICULACION: FileText,
  BAJA_TEMPORAL: AlertTriangle,
  BAJA_DEFINITIVA: XCircle,
  REHABILITACION: CheckCircle,
  CAMBIO_DOMICILIO: MapPin,
  ITV: Wrench,
};

const inspectionResultColors: Record<string, string> = {
  FAVORABLE: 'bg-green-100 text-green-700',
  DESFAVORABLE: 'bg-amber-100 text-amber-700',
  NEGATIVA: 'bg-red-100 text-red-700',
};

const inspectionResultLabels: Record<string, string> = {
  FAVORABLE: 'Favorable',
  DESFAVORABLE: 'Desfavorable',
  NEGATIVA: 'Negativa',
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('es-ES', {
    day: '2-digit', month: 'short', year: 'numeric',
  });
}

function fmtKm(km: number): string {
  return km.toLocaleString('es-ES') + ' km';
}

type Tab = 'ficha' | 'historial' | 'kilometraje' | 'itv' | 'alertas';

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function VehicleDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [vehicle, setVehicle] = useState<VehicleDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>('ficha');

  const fetchVehicle = useCallback(async () => {
    try {
      const res = await fetch(`/api/vehicles/${id}`);
      const json = await res.json();
      if (json.success) {
        setVehicle(json.data);
      } else {
        setError(json.error?.message ?? 'Error al cargar vehiculo');
      }
    } catch {
      setError('Error de conexion');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { fetchVehicle(); }, [fetchVehicle]);

  /* -- Loading / Error states ---------------------------------------- */

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-brand-indigo" />
      </div>
    );
  }

  if (error || !vehicle) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertTriangle size={48} className="text-amber-500" />
        <p className="text-brand-muted">{error ?? 'Vehiculo no encontrado'}</p>
        <button onClick={() => router.back()} className="btn-primary text-sm">Volver</button>
      </div>
    );
  }

  const history = vehicle.history;
  const tabs: { key: Tab; label: string; count?: number }[] = [
    { key: 'ficha', label: 'Ficha tecnica' },
    { key: 'historial', label: 'Historial', count: history?.events.length },
    { key: 'kilometraje', label: 'Kilometraje', count: history?.mileageHistory.length },
    { key: 'itv', label: 'ITV', count: history?.inspections.length },
    { key: 'alertas', label: 'Alertas', count: history?.fraudAlerts.length },
  ];

  /* -- Mileage sparkline (simple SVG) -------------------------------- */

  const renderMileageChart = () => {
    const points = history?.mileageHistory ?? [];
    if (points.length < 2) {
      return (
        <div className="text-center py-12">
          <Info size={32} className="mx-auto text-brand-muted/50 mb-2" />
          <p className="text-sm text-brand-muted">No hay suficientes datos de kilometraje</p>
        </div>
      );
    }

    const sorted = [...points].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    const maxKm = Math.max(...sorted.map(p => p.mileage));
    const minKm = Math.min(...sorted.map(p => p.mileage));
    const range = maxKm - minKm || 1;
    const w = 600;
    const h = 200;
    const padX = 60;
    const padY = 20;
    const chartW = w - padX * 2;
    const chartH = h - padY * 2;

    const pathPoints = sorted.map((p, i) => {
      const x = padX + (i / (sorted.length - 1)) * chartW;
      const y = padY + chartH - ((p.mileage - minKm) / range) * chartH;
      return `${x},${y}`;
    });

    const yTicks = 4;
    const yLines = Array.from({ length: yTicks + 1 }, (_, i) => {
      const val = minKm + (range / yTicks) * i;
      const y = padY + chartH - ((val - minKm) / range) * chartH;
      return { val, y };
    });

    return (
      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${w} ${h}`} className="w-full max-w-[600px] mx-auto" preserveAspectRatio="xMidYMid meet">
          {/* grid */}
          {yLines.map((l, i) => (
            <g key={i}>
              <line x1={padX} x2={w - padX} y1={l.y} y2={l.y} stroke="currentColor" className="text-gray-200" strokeWidth="0.5" />
              <text x={padX - 8} y={l.y + 4} textAnchor="end" className="fill-brand-muted" fontSize="9">
                {Math.round(l.val).toLocaleString('es-ES')}
              </text>
            </g>
          ))}
          {/* line */}
          <polyline
            points={pathPoints.join(' ')}
            fill="none"
            stroke="#2D2E80"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {/* dots */}
          {sorted.map((p, i) => {
            const x = padX + (i / (sorted.length - 1)) * chartW;
            const y = padY + chartH - ((p.mileage - minKm) / range) * chartH;
            return (
              <circle key={i} cx={x} cy={y} r="4" fill="#2D2E80" stroke="white" strokeWidth="2" />
            );
          })}
          {/* x labels (first & last) */}
          <text x={padX} y={h - 2} textAnchor="start" className="fill-brand-muted" fontSize="9">
            {fmt(sorted[0].date)}
          </text>
          <text x={w - padX} y={h - 2} textAnchor="end" className="fill-brand-muted" fontSize="9">
            {fmt(sorted[sorted.length - 1].date)}
          </text>
        </svg>

        {/* Table below chart */}
        <table className="w-full text-sm mt-4">
          <thead>
            <tr className="border-b border-brand-border">
              <th className="text-left px-3 py-2 font-semibold text-brand-muted">Fecha</th>
              <th className="text-right px-3 py-2 font-semibold text-brand-muted">Kilometraje</th>
              <th className="text-left px-3 py-2 font-semibold text-brand-muted">Fuente</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((p, i) => (
              <tr key={i} className="border-b border-brand-border/50">
                <td className="px-3 py-2 text-brand-body">{fmt(p.date)}</td>
                <td className="px-3 py-2 text-right font-semibold text-brand-indigo">{fmtKm(p.mileage)}</td>
                <td className="px-3 py-2 text-brand-muted">{p.source}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  /* ------------------------------------------------------------------ */
  /*  Render                                                             */
  /* ------------------------------------------------------------------ */

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link href="/dashboard/vehicles" className="inline-flex items-center gap-1.5 text-sm text-brand-indigo hover:text-brand-teal transition-colors">
        <ArrowLeft size={16} /> Volver a vehiculos
      </Link>

      {/* Header card */}
      <div className="card">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-xl bg-pastel-blue flex items-center justify-center flex-shrink-0">
              <Car size={28} className="text-brand-indigo" />
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-brand-navy">
                {vehicle.marca} {vehicle.modelo}
              </h1>
              <p className="text-sm text-brand-muted mt-0.5">
                {vehicle.version} {vehicle.year ? `· ${vehicle.year}` : ''}
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-2">
                <span className="font-mono font-bold text-brand-indigo bg-pastel-blue px-2.5 py-1 rounded-lg text-sm">
                  {vehicle.matricula}
                </span>
                {vehicle.vin && (
                  <span className="font-mono text-xs text-brand-muted bg-gray-100 px-2 py-1 rounded">
                    VIN: {vehicle.vin}
                  </span>
                )}
                {vehicle.combustible && (
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${fuelColors[vehicle.combustible] ?? 'bg-gray-100 text-gray-600'}`}>
                    {fuelLabels[vehicle.combustible] ?? vehicle.combustible}
                  </span>
                )}
                {vehicle.dgtStatus && (
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${statusColors[vehicle.dgtStatus] ?? 'bg-gray-100 text-gray-600'}`}>
                    {vehicle.dgtStatus}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex gap-4 md:gap-6 flex-wrap">
            <div className="text-center">
              <p className="text-2xl font-extrabold text-brand-indigo">{history?.ownerCount ?? '—'}</p>
              <p className="text-[10px] text-brand-muted font-semibold">Propietarios</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-brand-indigo">{vehicle.historyCount}</p>
              <p className="text-[10px] text-brand-muted font-semibold">Eventos</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-extrabold text-brand-indigo">{vehicle.inspectionCount}</p>
              <p className="text-[10px] text-brand-muted font-semibold">ITV</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-extrabold ${vehicle.fraudAlertCount > 0 ? 'text-red-600' : 'text-brand-teal'}`}>
                {vehicle.fraudAlertCount}
              </p>
              <p className="text-[10px] text-brand-muted font-semibold">Alertas</p>
            </div>
          </div>
        </div>

        {/* Latest mileage & inspection quick info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 pt-4 border-t border-brand-border">
          <div className="flex items-center gap-2 text-sm">
            <Gauge size={16} className="text-brand-teal" />
            <span className="text-brand-muted">Ultimo kilometraje:</span>
            <span className="font-semibold text-brand-navy">
              {vehicle.latestMileage ? fmtKm(vehicle.latestMileage.mileage) : 'Sin datos'}
            </span>
            {vehicle.latestMileage && (
              <span className="text-xs text-brand-muted">({fmt(vehicle.latestMileage.date)})</span>
            )}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Wrench size={16} className="text-brand-teal" />
            <span className="text-brand-muted">Ultima ITV:</span>
            {vehicle.lastInspection ? (
              <>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${inspectionResultColors[vehicle.lastInspection.result] ?? 'bg-gray-100 text-gray-600'}`}>
                  {inspectionResultLabels[vehicle.lastInspection.result] ?? vehicle.lastInspection.result}
                </span>
                <span className="text-xs text-brand-muted">({fmt(vehicle.lastInspection.date)})</span>
              </>
            ) : (
              <span className="font-semibold text-brand-navy">Sin datos</span>
            )}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-brand-border pb-px">
        {tabs.map(t => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition-colors rounded-t-lg ${
              tab === t.key
                ? 'text-brand-indigo border-b-2 border-brand-indigo bg-white'
                : 'text-brand-muted hover:text-brand-body hover:bg-gray-50'
            }`}
          >
            {t.label}
            {t.count !== undefined && t.count > 0 && (
              <span className={`ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                t.key === 'alertas' && t.count > 0 ? 'bg-red-100 text-red-700' : 'bg-pastel-blue text-brand-indigo'
              }`}>
                {t.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="card">
        {/* ---------- FICHA TECNICA ---------- */}
        {tab === 'ficha' && (
          <div>
            <h2 className="font-heading font-bold text-brand-indigo mb-4 flex items-center gap-2">
              <FileText size={18} /> Ficha tecnica
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-3">
              {[
                { label: 'Marca', value: vehicle.marca },
                { label: 'Modelo', value: vehicle.modelo },
                { label: 'Version', value: vehicle.version },
                { label: 'Ano', value: vehicle.year },
                { label: 'Combustible', value: fuelLabels[vehicle.combustible] ?? vehicle.combustible },
                { label: 'Potencia', value: `${vehicle.potenciaCv} CV / ${vehicle.potenciaKw} kW` },
                { label: 'Cilindrada', value: vehicle.cilindrada ? `${vehicle.cilindrada.toLocaleString('es-ES')} cc` : null },
                { label: 'Emisiones CO2', value: vehicle.co2Emissions ? `${vehicle.co2Emissions} g/km` : null },
                { label: 'Norma Euro', value: vehicle.euroNorm },
                { label: 'Transmision', value: vehicle.transmision },
                { label: 'Traccion', value: vehicle.traccion },
                { label: 'Carroceria', value: vehicle.carroceria },
                { label: 'Puertas', value: vehicle.puertas },
                { label: 'Plazas', value: vehicle.plazas },
                { label: 'Peso maximo', value: vehicle.pesoMax ? `${vehicle.pesoMax.toLocaleString('es-ES')} kg` : null },
                { label: 'Tara', value: vehicle.tara ? `${vehicle.tara.toLocaleString('es-ES')} kg` : null },
                { label: 'Color', value: vehicle.color },
                { label: 'Provincia', value: vehicle.provinciaActual },
                { label: 'Uso', value: vehicle.uso },
                { label: 'Estado DGT', value: vehicle.dgtStatus },
              ].map(row => (
                <div key={row.label} className="flex justify-between py-1.5 border-b border-brand-border/30">
                  <span className="text-sm text-brand-muted">{row.label}</span>
                  <span className="text-sm font-semibold text-brand-navy text-right">
                    {row.value ?? '—'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ---------- HISTORIAL ---------- */}
        {tab === 'historial' && (
          <div>
            <h2 className="font-heading font-bold text-brand-indigo mb-4 flex items-center gap-2">
              <Activity size={18} /> Historial del vehiculo
            </h2>
            {!history || history.events.length === 0 ? (
              <div className="text-center py-12">
                <Info size={32} className="mx-auto text-brand-muted/50 mb-2" />
                <p className="text-sm text-brand-muted">No hay eventos registrados</p>
              </div>
            ) : (
              <div className="relative pl-6 space-y-0">
                {/* Timeline line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-brand-border" />

                {history.events.map((ev, i) => {
                  const IconComp = eventTypeIcons[ev.eventType] ?? Clock;
                  return (
                    <div key={ev.id} className="relative pb-6 last:pb-0">
                      {/* dot */}
                      <div className="absolute -left-6 top-0.5 w-[22px] h-[22px] rounded-full bg-white border-2 border-brand-indigo flex items-center justify-center">
                        <IconComp size={12} className="text-brand-indigo" />
                      </div>
                      <div className="ml-2">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold text-brand-indigo bg-pastel-blue px-2 py-0.5 rounded-full">
                            {eventTypeLabels[ev.eventType] ?? ev.eventType}
                          </span>
                          <span className="text-xs text-brand-muted">{fmt(ev.eventDate)}</span>
                          {ev.province && (
                            <span className="text-xs text-brand-muted flex items-center gap-0.5">
                              <MapPin size={10} /> {ev.province}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-brand-body mt-1">{ev.description}</p>
                        <p className="text-[10px] text-brand-muted mt-0.5">Fuente: {ev.source}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ---------- KILOMETRAJE ---------- */}
        {tab === 'kilometraje' && (
          <div>
            <h2 className="font-heading font-bold text-brand-indigo mb-4 flex items-center gap-2">
              <TrendingUp size={18} /> Evolucion del kilometraje
            </h2>
            {renderMileageChart()}
          </div>
        )}

        {/* ---------- ITV ---------- */}
        {tab === 'itv' && (
          <div>
            <h2 className="font-heading font-bold text-brand-indigo mb-4 flex items-center gap-2">
              <Wrench size={18} /> Inspecciones ITV
            </h2>
            {!history || history.inspections.length === 0 ? (
              <div className="text-center py-12">
                <Info size={32} className="mx-auto text-brand-muted/50 mb-2" />
                <p className="text-sm text-brand-muted">No hay inspecciones registradas</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-brand-border">
                      <th className="text-left px-3 py-2 font-semibold text-brand-muted">Fecha</th>
                      <th className="text-left px-3 py-2 font-semibold text-brand-muted">Resultado</th>
                      <th className="text-right px-3 py-2 font-semibold text-brand-muted">Kilometraje</th>
                      <th className="text-left px-3 py-2 font-semibold text-brand-muted hidden md:table-cell">Estacion</th>
                      <th className="text-left px-3 py-2 font-semibold text-brand-muted hidden md:table-cell">Proxima ITV</th>
                    </tr>
                  </thead>
                  <tbody>
                    {history.inspections.map(insp => (
                      <tr key={insp.id} className="border-b border-brand-border/50 hover:bg-pastel-blue/20 transition-colors">
                        <td className="px-3 py-2.5 text-brand-body">{fmt(insp.date)}</td>
                        <td className="px-3 py-2.5">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${inspectionResultColors[insp.result] ?? 'bg-gray-100 text-gray-600'}`}>
                            {inspectionResultLabels[insp.result] ?? insp.result}
                          </span>
                        </td>
                        <td className="px-3 py-2.5 text-right font-semibold text-brand-indigo">
                          {insp.mileage != null ? fmtKm(insp.mileage) : '—'}
                        </td>
                        <td className="px-3 py-2.5 text-brand-muted hidden md:table-cell">{insp.stationName ?? '—'}</td>
                        <td className="px-3 py-2.5 text-brand-muted hidden md:table-cell">
                          {insp.nextInspection ? fmt(insp.nextInspection) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* ---------- ALERTAS ---------- */}
        {tab === 'alertas' && (
          <div>
            <h2 className="font-heading font-bold text-brand-indigo mb-4 flex items-center gap-2">
              <ShieldAlert size={18} /> Alertas de fraude
            </h2>
            {!history || history.fraudAlerts.length === 0 ? (
              <div className="text-center py-12">
                <CheckCircle size={32} className="mx-auto text-brand-teal/50 mb-2" />
                <p className="text-sm text-brand-muted">Sin alertas activas</p>
                <p className="text-xs text-brand-muted mt-1">Este vehiculo no tiene alertas de fraude</p>
              </div>
            ) : (
              <div className="space-y-3">
                {history.fraudAlerts.map(alert => (
                  <div key={alert.id} className="bg-red-50/50 rounded-lg p-4 border border-red-100">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${severityColors[alert.severity] ?? 'bg-gray-100 text-gray-600'}`}>
                        {alert.severity}
                      </span>
                      <span className="text-xs font-semibold text-brand-muted">{alert.alertType}</span>
                      <span className="text-xs text-brand-muted ml-auto">{fmt(alert.createdAt)}</span>
                    </div>
                    <p className="font-semibold text-brand-navy">{alert.title}</p>
                    <p className="text-sm text-brand-muted mt-1">{alert.description}</p>
                    <div className="mt-2">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        alert.status === 'ACTIVE' ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                      }`}>
                        {alert.status === 'ACTIVE' ? 'Activa' : alert.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
