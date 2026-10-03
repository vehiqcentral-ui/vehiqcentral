'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import {
  Car, ShieldAlert, TrendingUp, Search as SearchIcon,
  FileText, Eye, Bot, Zap, ArrowRight, Loader2,
  AlertTriangle, CheckCircle, Info,
} from 'lucide-react';

interface DashboardStats {
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
    source: string | null;
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

const lookupTypeLabels: Record<string, string> = {
  HISTORY: 'Consulta historial',
  VALUATION: 'Valoracion',
  FRAUD_CHECK: 'Verificacion fraude',
  FULL_REPORT: 'Informe completo',
};

const fuelLabels: Record<string, string> = {
  GASOLINA: 'Gasolina',
  DIESEL: 'Diesel',
  HIBRIDO: 'Hibrido',
  HIBRIDO_ENCHUFABLE: 'Hibrido Enchufable',
  ELECTRICO: 'Electrico',
  GLP: 'GLP',
  GNC: 'GNC',
  HIDROGENO: 'Hidrogeno',
};

const severityColors: Record<string, string> = {
  CRITICA: 'bg-red-100 text-red-700',
  ALTA: 'bg-orange-100 text-orange-700',
  MEDIA: 'bg-yellow-100 text-yellow-700',
  BAJA: 'bg-blue-100 text-blue-700',
};

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

function getGreeting(): string {
  const h = new Date().getHours();
  if (h < 12) return 'Buenos dias';
  if (h < 20) return 'Buenas tardes';
  return 'Buenas noches';
}

export default function DashboardPage() {
  const { data: session } = useSession();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/dashboard/stats');
      const json = await res.json();
      if (json.success) {
        setStats(json.data);
      } else {
        setError(json.error?.message ?? 'Error al cargar datos');
      }
    } catch {
      setError('Error de conexion');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  const firstName = session?.user?.name?.split(' ')[0] ?? 'Usuario';
  const today = new Date().toLocaleDateString('es-ES', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 size={32} className="animate-spin text-brand-indigo" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <AlertTriangle size={48} className="text-amber-500" />
        <p className="text-brand-muted">{error ?? 'Error desconocido'}</p>
        <button onClick={() => { setLoading(true); setError(null); fetchStats(); }} className="btn-primary text-sm">
          Reintentar
        </button>
      </div>
    );
  }

  const kpis = [
    { label: 'Vehiculos totales', value: stats.kpis.totalVehicles.toLocaleString('es-ES'), icon: Car, color: 'bg-pastel-blue text-brand-indigo' },
    { label: 'Valoraciones este mes', value: stats.kpis.valuationsThisMonth.toLocaleString('es-ES'), icon: TrendingUp, color: 'bg-pastel-mint text-brand-teal' },
    { label: 'Consultas hoy', value: stats.kpis.lookupsToday.toLocaleString('es-ES'), icon: Eye, color: 'bg-pastel-peach text-amber-700' },
    { label: 'Alertas fraude activas', value: stats.kpis.activeFraudAlerts.toLocaleString('es-ES'), icon: ShieldAlert, color: stats.kpis.activeFraudAlerts > 0 ? 'bg-red-50 text-red-600' : 'bg-pastel-mint text-brand-teal' },
    { label: 'Informes generados', value: stats.kpis.totalValuations.toLocaleString('es-ES'), icon: FileText, color: 'bg-pastel-purple text-brand-indigo' },
    { label: 'Consultas este mes', value: stats.kpis.lookupsThisMonth.toLocaleString('es-ES'), icon: SearchIcon, color: 'bg-pastel-blue text-brand-indigo' },
  ];

  const maxBrand = Math.max(...stats.vehiclesByBrand.map((b) => b.count), 1);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold">
          {getGreeting()}, {firstName}
        </h1>
        <p className="text-brand-muted mt-1 capitalize">{today} &mdash; Resumen de tu actividad</p>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((s) => (
          <div key={s.label} className="card flex flex-col gap-2">
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
              <s.icon size={20} />
            </div>
            <p className="text-2xl font-heading font-extrabold text-brand-indigo">{s.value}</p>
            <p className="text-xs text-brand-muted">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Brand distribution */}
        <div className="card">
          <h2 className="font-heading font-bold text-brand-indigo mb-4">Vehiculos por marca</h2>
          {stats.vehiclesByBrand.length > 0 ? (
            <div className="space-y-2">
              {stats.vehiclesByBrand.map((b) => (
                <div key={b.brand} className="flex items-center gap-3">
                  <span className="text-xs text-brand-muted w-20 text-right truncate">{b.brand}</span>
                  <div className="flex-1 bg-pastel-blue rounded-full h-5 overflow-hidden">
                    <div
                      className="h-full bg-brand-indigo rounded-full transition-all"
                      style={{ width: `${(b.count / maxBrand) * 100}%` }}
                    />
                  </div>
                  <span className="text-xs font-bold text-brand-indigo w-8">{b.count}</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-brand-muted">Sin datos disponibles</p>
          )}
        </div>

        {/* Fuel type distribution */}
        <div className="card">
          <h2 className="font-heading font-bold text-brand-indigo mb-4">Distribucion por combustible</h2>
          {stats.vehiclesByFuel.length > 0 ? (
            <div className="space-y-2">
              {stats.vehiclesByFuel.map((f) => {
                const maxFuel = Math.max(...stats.vehiclesByFuel.map((x) => x.count), 1);
                return (
                  <div key={f.fuel} className="flex items-center gap-3">
                    <span className="text-xs text-brand-muted w-28 text-right truncate">
                      {fuelLabels[f.fuel ?? ''] ?? f.fuel ?? 'Otro'}
                    </span>
                    <div className="flex-1 bg-pastel-mint rounded-full h-5 overflow-hidden">
                      <div
                        className="h-full bg-brand-teal rounded-full transition-all"
                        style={{ width: `${(f.count / maxFuel) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-bold text-brand-teal w-8">{f.count}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <p className="text-sm text-brand-muted">Sin datos disponibles</p>
          )}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent activity */}
        <div className="card">
          <h2 className="font-heading font-bold text-brand-indigo mb-4">Actividad reciente</h2>
          {stats.recentActivity.length > 0 ? (
            <div className="space-y-3">
              {stats.recentActivity.map((a) => (
                <Link
                  key={a.id}
                  href={`/dashboard/vehicles/${a.vehicle.id}`}
                  className="flex items-start gap-3 text-sm hover:bg-pastel-blue/30 rounded-lg p-2 -mx-2 transition-colors"
                >
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${
                    a.type === 'FRAUD_CHECK' ? 'bg-red-500' : a.type === 'VALUATION' ? 'bg-brand-teal' : 'bg-brand-indigo'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-brand-body truncate">
                      {lookupTypeLabels[a.type] ?? a.type}: {a.vehicle.matricula} — {a.vehicle.marca} {a.vehicle.modelo}
                    </p>
                    <p className="text-xs text-brand-muted">{timeAgo(a.createdAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Info size={32} className="mx-auto text-brand-muted/50 mb-2" />
              <p className="text-sm text-brand-muted">Aun no hay actividad registrada</p>
              <p className="text-xs text-brand-muted mt-1">Busca un vehiculo para empezar</p>
            </div>
          )}
        </div>

        {/* Fraud alerts */}
        <div className="card">
          <div className="flex items-center gap-2 mb-4">
            <ShieldAlert size={20} className="text-red-500" />
            <h2 className="font-heading font-bold text-brand-indigo">Alertas de fraude</h2>
          </div>
          {stats.recentAlerts.length > 0 ? (
            <div className="space-y-3">
              {stats.recentAlerts.map((a) => (
                <div key={a.id} className="bg-red-50/50 rounded-lg p-3 border border-red-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${severityColors[a.severity] ?? 'bg-gray-100 text-gray-600'}`}>
                      {a.severity}
                    </span>
                    <span className="text-xs text-brand-muted">{a.vehicle.matricula}</span>
                  </div>
                  <p className="font-semibold text-sm text-brand-navy">{a.title}</p>
                  <p className="text-xs text-brand-muted mt-1 line-clamp-2">{a.description}</p>
                  <p className="text-xs text-brand-muted mt-1">{a.vehicle.marca} {a.vehicle.modelo} &middot; {timeAgo(a.createdAt)}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <CheckCircle size={32} className="mx-auto text-brand-teal/50 mb-2" />
              <p className="text-sm text-brand-muted">Sin alertas activas</p>
              <p className="text-xs text-brand-muted mt-1">Todo esta en orden</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="flex flex-wrap gap-3">
        <Link href="/dashboard/vehicles" className="btn-primary text-sm flex items-center gap-2">
          <SearchIcon size={14} /> Buscar vehiculo <ArrowRight size={14} />
        </Link>
        <Link href="/dashboard/valuations" className="btn-primary text-sm flex items-center gap-2">
          <TrendingUp size={14} /> Nueva valoracion <ArrowRight size={14} />
        </Link>
        <Link href="/dashboard/fraud" className="btn-primary text-sm flex items-center gap-2">
          <ShieldAlert size={14} /> Verificar fraude <ArrowRight size={14} />
        </Link>
        <Link href="/dashboard/ai-assistant" className="btn-primary text-sm flex items-center gap-2">
          <Bot size={14} /> IA Asistente <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
