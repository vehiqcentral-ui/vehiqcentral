'use client';

import { useState, useEffect, useCallback } from 'react';
import { Zap, Loader2, FileText, Search, TrendingUp, Key } from 'lucide-react';

/* ── Types ──────────────────────────────── */

interface UsageItem {
  used: number;
  limit: number; // -1 = unlimited
}

interface BillingData {
  plan: string;
  subscription: {
    status: string;
    currentPeriodEnd: string | null;
    cancelAtEnd: boolean;
    lookupQuota: number;
    lookupUsed: number;
    apiCallQuota: number;
    apiCallUsed: number;
  } | null;
  usage: {
    reports: UsageItem;
    valuations: UsageItem;
    lookups: UsageItem;
    apiCalls: UsageItem;
  };
}

/* ── Helpers ─────────────────────────────── */

const planLabels: Record<string, string> = {
  FREE: 'Gratuito',
  STARTER: 'Starter',
  PROFESSIONAL: 'Profesional',
  ENTERPRISE: 'Enterprise',
};

const planPrices: Record<string, string> = {
  FREE: '0',
  STARTER: '49',
  PROFESSIONAL: '149',
  ENTERPRISE: '499',
};

const statusLabels: Record<string, { label: string; color: string }> = {
  ACTIVE: { label: 'Activa', color: 'text-brand-teal' },
  PAST_DUE: { label: 'Pago pendiente', color: 'text-amber-500' },
  CANCELED: { label: 'Cancelada', color: 'text-red-500' },
  TRIALING: { label: 'Prueba', color: 'text-purple-600' },
};

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/* ── Component ──────────────────────────── */

export default function BillingPage() {
  const [data, setData] = useState<BillingData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchBilling = useCallback(async () => {
    try {
      const res = await fetch('/api/billing');
      const json = await res.json();
      if (json.success) {
        setData(json.data);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBilling();
  }, [fetchBilling]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-brand-muted">
        <Loader2 size={28} className="animate-spin mr-3" /> Cargando facturacion...
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-24 text-brand-muted">
        <p className="font-heading font-bold">Error al cargar datos de facturacion</p>
      </div>
    );
  }

  const plan = data.plan;
  const sub = data.subscription;
  const subStatus = statusLabels[sub?.status ?? ''] ?? statusLabels.ACTIVE;

  const usageItems = [
    { name: 'Informes generados', icon: FileText, ...data.usage.reports, unit: 'informes' },
    { name: 'Valoraciones IA', icon: TrendingUp, ...data.usage.valuations, unit: 'valoraciones' },
    { name: 'Consultas vehiculares', icon: Search, ...data.usage.lookups, unit: 'consultas' },
    { name: 'Llamadas API', icon: Key, ...data.usage.apiCalls, unit: 'llamadas' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">Facturacion</h1>
        <p className="text-brand-muted mt-1">Plan actual, uso y cuotas de tu suscripcion</p>
      </div>

      {/* Current plan */}
      <div className="card border-brand-gold/40 bg-brand-gold/5">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap size={18} className="text-brand-gold" />
              <h2 className="font-heading font-bold text-brand-indigo">Plan {planLabels[plan] ?? plan}</h2>
            </div>
            <div className="flex items-center gap-3 text-sm text-brand-muted">
              {sub && (
                <>
                  <span className={`font-semibold ${subStatus.color}`}>{subStatus.label}</span>
                  {sub.currentPeriodEnd && (
                    <span>&middot; Renovacion: {fmtDate(sub.currentPeriodEnd)}</span>
                  )}
                  {sub.cancelAtEnd && (
                    <span className="text-amber-500 font-semibold">&middot; Cancela al final del periodo</span>
                  )}
                </>
              )}
              {!sub && <span>Sin suscripcion activa</span>}
            </div>
          </div>
          <div className="text-right">
            <p className="text-3xl font-heading font-extrabold text-brand-indigo">
              {planPrices[plan] ?? '?'}&nbsp;€
              <span className="text-sm font-normal text-brand-muted">/mes</span>
            </p>
          </div>
        </div>
      </div>

      {/* Usage */}
      <div className="card">
        <h2 className="font-heading font-bold text-brand-indigo mb-4">Uso este mes</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {usageItems.map(u => {
            const isUnlimited = u.limit === -1;
            const pct = isUnlimited ? 0 : u.limit > 0 ? (u.used / u.limit) * 100 : 0;
            return (
              <div key={u.name} className="p-3 rounded-lg bg-brand-alt-bg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-brand-indigo flex items-center gap-2">
                    <u.icon size={14} className="text-brand-muted" /> {u.name}
                  </span>
                  <span className="text-xs text-brand-muted">
                    {u.used.toLocaleString('es-ES')} / {isUnlimited ? 'Ilimitado' : `${u.limit.toLocaleString('es-ES')} ${u.unit}`}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${pct > 80 ? 'bg-amber-400' : 'bg-brand-teal'}`}
                    style={{ width: isUnlimited ? '0%' : `${Math.min(pct, 100)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Plan comparison */}
      <div className="card">
        <h2 className="font-heading font-bold text-brand-indigo mb-4">Planes disponibles</h2>
        <div className="grid md:grid-cols-4 gap-4">
          {[
            { name: 'FREE', price: '0', features: ['5 informes/mes', '10 valoraciones/mes', '25 consultas/mes', '100 llamadas API'] },
            { name: 'STARTER', price: '49', features: ['50 informes/mes', '100 valoraciones/mes', '250 consultas/mes', '5.000 llamadas API'] },
            { name: 'PROFESSIONAL', price: '149', features: ['500 informes/mes', '1.000 valoraciones/mes', '2.500 consultas/mes', '50.000 llamadas API'] },
            { name: 'ENTERPRISE', price: '499', features: ['Informes ilimitados', 'Valoraciones ilimitadas', 'Consultas ilimitadas', 'API ilimitada'] },
          ].map(p => (
            <div
              key={p.name}
              className={`p-4 rounded-card border-2 transition-colors ${
                plan === p.name
                  ? 'border-brand-teal bg-pastel-mint/10'
                  : 'border-brand-border hover:border-brand-teal/30'
              }`}
            >
              <h3 className="font-heading font-bold text-brand-indigo">{planLabels[p.name]}</h3>
              <p className="text-2xl font-heading font-extrabold text-brand-indigo mt-1">
                {p.price}&nbsp;€<span className="text-xs font-normal text-brand-muted">/mes</span>
              </p>
              <ul className="mt-3 space-y-1.5">
                {p.features.map(f => (
                  <li key={f} className="text-xs text-brand-muted flex items-start gap-1.5">
                    <span className="text-brand-teal mt-0.5">&#10003;</span> {f}
                  </li>
                ))}
              </ul>
              {plan === p.name ? (
                <div className="mt-4 text-center text-xs font-semibold text-brand-teal">Plan actual</div>
              ) : (
                <button className="mt-4 w-full text-center text-xs font-semibold px-3 py-2 rounded-button border border-brand-teal text-brand-teal hover:bg-pastel-mint transition-colors">
                  Cambiar plan
                </button>
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-brand-muted mt-4">La gestion de pagos se realizara a traves de Stripe en una version futura.</p>
      </div>
    </div>
  );
}
