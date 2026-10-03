'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  LineChart,
  Search,
  Loader2,
  Filter,
  ChevronLeft,
  ChevronRight,
  Euro,
  Car,
  Gauge,
  MapPin,
  ExternalLink,
  BarChart3,
} from 'lucide-react';

/* ── Types ──────────────────────────────── */

interface MarketListing {
  id: string;
  source: string;
  marca: string;
  modelo: string;
  version: string | null;
  year: number;
  mileage: number;
  price: number;
  fuelType: string | null;
  province: string | null;
  city: string | null;
  dealerName: string | null;
  url: string | null;
  scrapedAt: string;
}

interface MarketStats {
  totalListings: number;
  avgPrice: number;
  minPrice: number;
  maxPrice: number;
  avgMileage: number;
  avgYear: number;
  bySource: { source: string; count: number }[];
  byFuel: { fuel: string | null; count: number }[];
  topBrands: { brand: string; count: number; avgPrice: number }[];
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

/* ── Helpers ─────────────────────────────── */

const fuelLabels: Record<string, string> = {
  GASOLINA: 'Gasolina',
  DIESEL: 'Diesel',
  HIBRIDO: 'Hibrido',
  HIBRIDO_ENCHUFABLE: 'Hibrido ench.',
  ELECTRICO: 'Electrico',
  GLP: 'GLP',
  GNC: 'GNC',
  HIDROGENO: 'Hidrogeno',
};

const sourceColors: Record<string, string> = {
  'coches.net': 'bg-blue-100 text-blue-700',
  'autocasion': 'bg-orange-100 text-orange-700',
  'wallapop': 'bg-teal-100 text-teal-700',
  'milanuncios': 'bg-yellow-100 text-yellow-700',
  'autoscout24': 'bg-green-100 text-green-700',
};

function fmtPrice(cents: number): string {
  return (cents / 100).toLocaleString('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
}

function fmtKm(km: number): string {
  return km.toLocaleString('es-ES') + ' km';
}

function fmtDate(iso: string): string {
  return new Date(iso).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
}

/* ── Component ──────────────────────────── */

export default function MarketPage() {
  const [listings, setListings] = useState<MarketListing[]>([]);
  const [stats, setStats] = useState<MarketStats | null>(null);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, perPage: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [fuelFilter, setFuelFilter] = useState('');

  const fetchMarket = useCallback(async (page = 1) => {
    try {
      const params = new URLSearchParams({ page: String(page), perPage: '20' });
      if (search.trim()) params.set('q', search.trim());
      if (sourceFilter) params.set('source', sourceFilter);
      if (fuelFilter) params.set('fuelType', fuelFilter);

      const res = await fetch(`/api/market?${params}`);
      const json = await res.json();
      if (json.success) {
        setListings(json.data.listings);
        setStats(json.data.stats);
        setPagination(json.data.pagination);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [search, sourceFilter, fuelFilter]);

  useEffect(() => {
    setLoading(true);
    fetchMarket(1);
  }, [fetchMarket]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-brand-muted">
        <Loader2 size={28} className="animate-spin mr-3" /> Cargando datos de mercado...
      </div>
    );
  }

  const maxBrandCount = Math.max(...(stats?.topBrands.map(b => b.count) ?? [1]), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold">Inteligencia de Mercado</h1>
        <p className="text-brand-muted mt-1">Datos en tiempo real de anuncios en portales de vehiculos en Espana</p>
      </div>

      {/* KPI cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Anuncios activos', value: stats.totalListings.toLocaleString('es-ES'), icon: Car, color: 'bg-pastel-blue text-brand-indigo' },
            { label: 'Precio medio', value: fmtPrice(stats.avgPrice), icon: Euro, color: 'bg-pastel-mint text-brand-teal' },
            { label: 'Km medio', value: fmtKm(stats.avgMileage), icon: Gauge, color: 'bg-pastel-peach text-amber-700' },
            { label: 'Ano medio', value: Math.round(stats.avgYear).toString(), icon: LineChart, color: 'bg-pastel-purple text-purple-700' },
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
      )}

      {/* Charts row */}
      {stats && (
        <div className="grid md:grid-cols-2 gap-6">
          {/* Top brands */}
          <div className="card">
            <h2 className="font-heading font-bold text-brand-indigo mb-4 flex items-center gap-2">
              <BarChart3 size={18} className="text-brand-muted" /> Top marcas por anuncios
            </h2>
            {stats.topBrands.length === 0 ? (
              <p className="text-sm text-brand-muted text-center py-6">Sin datos</p>
            ) : (
              <div className="space-y-2.5">
                {stats.topBrands.map(b => (
                  <div key={b.brand} className="flex items-center gap-3">
                    <span className="w-24 text-sm font-semibold text-brand-indigo truncate">{b.brand}</span>
                    <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                      <div
                        className="h-5 rounded-full bg-brand-teal/80 flex items-center justify-end pr-2 transition-all"
                        style={{ width: `${Math.max((b.count / maxBrandCount) * 100, 8)}%` }}
                      >
                        <span className="text-[10px] text-white font-semibold">{b.count}</span>
                      </div>
                    </div>
                    <span className="text-xs text-brand-muted w-20 text-right">{fmtPrice(b.avgPrice)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* By source */}
          <div className="card">
            <h2 className="font-heading font-bold text-brand-indigo mb-4 flex items-center gap-2">
              <MapPin size={18} className="text-brand-muted" /> Por portal
            </h2>
            {stats.bySource.length === 0 ? (
              <p className="text-sm text-brand-muted text-center py-6">Sin datos</p>
            ) : (
              <div className="space-y-2">
                {(() => {
                  const totalSource = stats.bySource.reduce((s, f) => s + f.count, 0);
                  const colors = ['bg-brand-indigo', 'bg-brand-teal', 'bg-amber-500', 'bg-green-500', 'bg-purple-500', 'bg-red-400', 'bg-blue-400'];
                  return (
                    <>
                      <div className="flex rounded-full h-6 overflow-hidden">
                        {stats.bySource.map((s, i) => (
                          <div
                            key={s.source}
                            className={`${colors[i % colors.length]} h-6 transition-all`}
                            style={{ width: `${(s.count / totalSource) * 100}%` }}
                            title={`${s.source}: ${s.count}`}
                          />
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3">
                        {stats.bySource.map((s, i) => (
                          <div key={s.source} className="flex items-center gap-1.5 text-sm">
                            <span className={`w-3 h-3 rounded-sm ${colors[i % colors.length]}`} />
                            <span className="text-brand-muted">{s.source}</span>
                            <span className="font-semibold text-brand-indigo">{s.count.toLocaleString('es-ES')}</span>
                            <span className="text-brand-muted text-xs">({((s.count / totalSource) * 100).toFixed(1)}%)</span>
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
      )}

      {/* Listings table */}
      <div className="card">
        <h2 className="font-heading font-bold text-brand-indigo mb-4">Anuncios recientes</h2>

        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Buscar marca, modelo..."
              className="input pl-10 text-sm"
            />
          </div>
          <div className="relative">
            <Filter size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <select
              value={sourceFilter}
              onChange={e => setSourceFilter(e.target.value)}
              className="input pl-10 text-sm w-full sm:w-44"
            >
              <option value="">Todos los portales</option>
              {stats?.bySource.map(s => (
                <option key={s.source} value={s.source}>{s.source}</option>
              ))}
            </select>
          </div>
          <select
            value={fuelFilter}
            onChange={e => setFuelFilter(e.target.value)}
            className="input text-sm w-full sm:w-40"
          >
            <option value="">Todo combustible</option>
            {Object.entries(fuelLabels).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-12 text-brand-muted">
            <LineChart size={40} className="mx-auto mb-3" />
            <p className="font-heading font-bold">Sin anuncios</p>
            <p className="text-sm mt-1">No hay anuncios que coincidan con los filtros seleccionados</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-brand-border text-left text-brand-muted">
                    <th className="pb-3 font-semibold">Vehiculo</th>
                    <th className="pb-3 font-semibold">Ano</th>
                    <th className="pb-3 font-semibold">Km</th>
                    <th className="pb-3 font-semibold">Precio</th>
                    <th className="pb-3 font-semibold">Combustible</th>
                    <th className="pb-3 font-semibold">Portal</th>
                    <th className="pb-3 font-semibold">Ubicacion</th>
                    <th className="pb-3 font-semibold">Fecha</th>
                    <th className="pb-3"></th>
                  </tr>
                </thead>
                <tbody>
                  {listings.map(l => (
                    <tr key={l.id} className="border-b border-brand-border/50 hover:bg-pastel-blue/20 transition-colors">
                      <td className="py-3">
                        <p className="font-bold text-brand-indigo">{l.marca} {l.modelo}</p>
                        {l.version && <p className="text-xs text-brand-muted">{l.version}</p>}
                      </td>
                      <td className="py-3 text-brand-muted">{l.year}</td>
                      <td className="py-3 text-brand-muted">{fmtKm(l.mileage)}</td>
                      <td className="py-3 font-semibold text-brand-indigo">{fmtPrice(l.price)}</td>
                      <td className="py-3">
                        <span className="text-xs text-brand-muted">{fuelLabels[l.fuelType ?? ''] ?? l.fuelType ?? '-'}</span>
                      </td>
                      <td className="py-3">
                        <span className={`text-xs px-1.5 py-0.5 rounded font-semibold ${sourceColors[l.source] ?? 'bg-gray-100 text-gray-600'}`}>
                          {l.source}
                        </span>
                      </td>
                      <td className="py-3 text-xs text-brand-muted">
                        {[l.city, l.province].filter(Boolean).join(', ') || '-'}
                      </td>
                      <td className="py-3 text-xs text-brand-muted">{fmtDate(l.scrapedAt)}</td>
                      <td className="py-3">
                        {l.url && (
                          <a
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-brand-teal hover:text-brand-indigo"
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-brand-border">
                <p className="text-sm text-brand-muted">
                  {pagination.total.toLocaleString('es-ES')} anuncios &middot; Pagina {pagination.page} de {pagination.totalPages}
                </p>
                <div className="flex gap-1">
                  <button
                    onClick={() => fetchMarket(pagination.page - 1)}
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
                        onClick={() => fetchMarket(p)}
                        className={`w-8 h-8 rounded-lg text-sm font-semibold ${p === pagination.page ? 'bg-brand-indigo text-white' : 'hover:bg-gray-100 text-brand-muted'}`}
                      >
                        {p}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => fetchMarket(pagination.page + 1)}
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
