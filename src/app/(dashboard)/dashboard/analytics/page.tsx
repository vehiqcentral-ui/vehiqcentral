'use client';

import { useState, useEffect } from 'react';
import {
  Car,
  BarChart3,
  ShieldAlert,
  Search as SearchIcon,
  TrendingUp,
  Activity,
  Calendar,
  Loader2,
} from 'lucide-react';
import Link from 'next/link';

/* ── Types ──────────────────────────────── */

interface DashboardData {
  kpis: {
    totalVehicles: number;
    totalValuations: number;
    valuationsThisMonth: number;
    activeFraudAlerts: number;
    lookupsThisMonth: number;
    lookupsToday: number;
  };
  recentActivity: {
    id: string;
    type: string;
    source: string;
    createdAt: string;
    vehicle: {
      id: string;
      matricula: string;
      marca: string;
      modelo: string;
      version: string | null;
      year: number | null;
    };
  }[];
  vehiclesByBrand: { brand: string; count: number }[];
  vehiclesByFuel: { fuel: string | null; count: number }[];
  recentAlerts: {
    id: string;
    alertType: string;
    severity: string;
    title: string;
    description: string;
    createdAt: string;
    vehicle: { matricula: string; marca: string; modelo: string };
  }[];
}

/* ── Helpers ─────────────────────────────── */

const fuelLabels: Record<string, string> = {
  GASOLINA: 'Gasolina',
  DIESEL: 'Diesel',
  HIBRIDO: 'Hibrido',
  ELECTRICO: 'Electrico',
  GLP: 'GLP',
  GNC: 'GNC',
  HIDROGENO: 'Hidrogeno',
};

const severityColors: Record<string, string> = {
  CRITICA: 'bg-red-100 text-red-700',
  ALTA: 'bg-orange-100 text-orange-700',
  MEDIA: 'bg-amber-100 text-amber-700',
  BAJA: 'bg-blue-100 text-blue-700',
};

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

function fmtTime(iso: string): string {
  return new Date(iso).toLocaleTimeString('es-ES', {
    hour: '2-digit',
    minute: '2-digit',
  });
}

const lookupTypeLabels: Record<string, string> = {
  MATRICULA: 'Matricula',
  VIN: 'VIN',
  FRAUD_CHECK: 'Fraude',
  VALUATION: 'Valoracion',
  HISTORY: 'Historial',
};

/* ── Component ──────────────────────────── */

export default function AnalyticsPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/dashboard/stats');
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-brand-muted">
        <Loader2 size={28} className="animate-spin mr-3" /> Cargando analiticas...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-24 text-brand-muted">
        <p className="font-heading font-bold text-lg">Error al cargar datos</p>
        <p className="text-sm mt-1">Intenta recargar la pagina</p>
      </div>
    );
  }

  const { kpis, vehiclesByBrand, vehiclesByFuel, recentActivity, recentAlerts } = data;
  const maxBrandCount = Math.max(...vehiclesByBrand.map(b => b.count), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold">Analiticas</h1>
        <p className="text-brand-muted mt-1">Metricas clave de la plataforma de inteligencia vehicular</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          { label: 'Vehiculos en BD', value: kpis.totalVehicles.toLocaleString('es-ES'), icon: Car, color: 'bg-pastel-blue text-brand-indigo' },
          { label: 'Valoraciones totales', value: kpis.totalValuations.toLocaleString('es-ES'), icon: TrendingUp, color: 'bg-pastel-mint text-brand-teal' },
          { label: 'Valoraciones mes', value: kpis.valuationsThisMonth.toLocaleString('es-ES'), icon: Calendar, color: 'bg-pastel-purple text-purple-700' },
          { label: 'Alertas activas', value: kpis.activeFraudAlerts.toLocaleString('es-ES'), icon: ShieldAlert, color: 'bg-red-50 text-red-600' },
          { label: 'Consultas mes', value: kpis.lookupsThisMonth.toLocaleString('es-ES'), icon: SearchIcon, color: 'bg-pastel-peach text-amber-700' },
          { label: 'Consultas hoy', value: kpis.lookupsToday.toLocaleString('es-ES'), icon: Activity, color: 'bg-blue-50 text-blue-600' },
        ].map(k => (
          <div key={k.label} className="card">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${k.color}`}>
              <k.icon size={16} />
            </div>
            <p className="text-2xl font-heading font-extrabold text-brand-indigo">{k.value}</p>
            <p className="text-xs text-brand-muted">{k.label}</p>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Vehicles by brand — horizontal bar chart */}
        <div className="card">
          <h2 className="font-heading font-bold text-brand-indigo mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-brand-muted" /> Vehiculos por marca
          </h2>
          {vehiclesByBrand.length === 0 ? (
            <p className="text-sm text-brand-muted text-center py-6">Sin datos</p>
          ) : (
            <div className="space-y-2.5">
              {vehiclesByBrand.map(b => (
                <div key={b.brand} className="flex items-center gap-3">
                  <span className="w-24 text-sm font-semibold text-brand-indigo truncate">{b.brand}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                    <div
                      className="h-5 rounded-full bg-brand-indigo/80 flex items-center justify-end pr-2 transition-all"
                      style={{ width: `${Math.max((b.count / maxBrandCount) * 100, 8)}%` }}
                    >
                      <span className="text-[10px] text-white font-semibold">{b.count}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Vehicles by fuel type */}
        <div className="card">
          <h2 className="font-heading font-bold text-brand-indigo mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-brand-muted" /> Distribucion por combustible
          </h2>
          {vehiclesByFuel.length === 0 ? (
            <p className="text-sm text-brand-muted text-center py-6">Sin datos</p>
          ) : (
            <div className="space-y-2">
              {(() => {
                const totalFuel = vehiclesByFuel.reduce((s, f) => s + f.count, 0);
                const fuelColors = ['bg-brand-indigo', 'bg-brand-teal', 'bg-amber-500', 'bg-green-500', 'bg-purple-500', 'bg-red-400', 'bg-blue-400'];
                return (
                  <>
                    {/* Stacked bar */}
                    <div className="flex rounded-full h-6 overflow-hidden">
                      {vehiclesByFuel.map((f, i) => (
                        <div
                          key={f.fuel ?? 'unknown'}
                          className={`${fuelColors[i % fuelColors.length]} h-6 transition-all`}
                          style={{ width: `${(f.count / totalFuel) * 100}%` }}
                          title={`${fuelLabels[f.fuel ?? ''] ?? f.fuel ?? 'Otro'}: ${f.count}`}
                        />
                      ))}
                    </div>
                    {/* Legend */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                      {vehiclesByFuel.map((f, i) => (
                        <div key={f.fuel ?? 'unknown'} className="flex items-center gap-1.5 text-sm">
                          <span className={`w-3 h-3 rounded-sm ${fuelColors[i % fuelColors.length]}`} />
                          <span className="text-brand-muted">{fuelLabels[f.fuel ?? ''] ?? f.fuel ?? 'Otro'}</span>
                          <span className="font-semibold text-brand-indigo">{f.count}</span>
                          <span className="text-brand-muted text-xs">({((f.count / totalFuel) * 100).toFixed(1)}%)</span>
                        </div>
                      ))}
                    </div>
                  </>
                );
              })()}
            </div>
          )}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent activity */}
        <div className="card">
          <h2 className="font-heading font-bold text-brand-indigo mb-4 flex items-center gap-2">
            <Activity size={18} className="text-brand-muted" /> Actividad reciente
          </h2>
          {recentActivity.length === 0 ? (
            <p className="text-sm text-brand-muted text-center py-6">Sin actividad reciente</p>
          ) : (
            <div className="space-y-2">
              {recentActivity.map(a => (
                <div key={a.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="w-8 h-8 rounded-lg bg-pastel-blue flex items-center justify-center shrink-0">
                    <SearchIcon size={14} className="text-brand-indigo" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <Link href={`/dashboard/vehicles/${a.vehicle.id}`} className="text-sm font-semibold text-brand-indigo hover:underline truncate">
                        {a.vehicle.marca} {a.vehicle.modelo}
                      </Link>
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-100 text-brand-muted shrink-0">
                        {lookupTypeLabels[a.type] ?? a.type}
                      </span>
                    </div>
                    <p className="text-xs text-brand-muted font-mono">{a.vehicle.matricula}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-brand-muted">{fmtDate(a.createdAt)}</p>
                    <p className="text-[10px] text-brand-muted">{fmtTime(a.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent fraud alerts */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-brand-indigo flex items-center gap-2">
              <ShieldAlert size={18} className="text-red-500" /> Alertas recientes
            </h2>
            <Link href="/dashboard/fraud" className="text-xs text-brand-teal hover:underline">Ver todas</Link>
          </div>
          {recentAlerts.length === 0 ? (
            <p className="text-sm text-brand-muted text-center py-6">Sin alertas activas</p>
          ) : (
            <div className="space-y-2">
              {recentAlerts.map(a => (
                <div key={a.id} className="p-2.5 rounded-lg border border-brand-border hover:shadow-sm transition-shadow">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] px-1.5 py-0.5 rounded font-semibold ${severityColors[a.severity] ?? 'bg-gray-100 text-gray-600'}`}>
                          {a.severity}
                        </span>
                        <span className="text-xs text-brand-muted">{a.alertType}</span>
                      </div>
                      <p className="text-sm font-semibold text-brand-indigo mt-1 truncate">{a.title}</p>
                      <p className="text-xs text-brand-muted mt-0.5">
                        {a.vehicle.matricula} &middot; {a.vehicle.marca} {a.vehicle.modelo}
                      </p>
                    </div>
                    <p className="text-xs text-brand-muted shrink-0">{fmtDate(a.createdAt)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
