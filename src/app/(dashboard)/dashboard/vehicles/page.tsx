'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Car, Search, Filter, ChevronLeft, ChevronRight,
  Loader2, AlertTriangle, ShieldAlert, Eye, Fuel,
} from 'lucide-react';

interface VehicleRow {
  id: string;
  matricula: string;
  vin: string | null;
  marca: string;
  modelo: string;
  version: string | null;
  combustible: string | null;
  potenciaCv: number | null;
  color: string | null;
  year: number | null;
  provinciaActual: string | null;
  dgtStatus: string | null;
  activeAlerts: number;
  totalValuations: number;
  totalEvents: number;
}

interface Pagination {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

const fuelLabels: Record<string, string> = {
  GASOLINA: 'Gasolina',
  DIESEL: 'Diesel',
  HIBRIDO: 'Hibrido',
  HIBRIDO_ENCHUFABLE: 'PHEV',
  ELECTRICO: 'Electrico',
  GLP: 'GLP',
  GNC: 'GNC',
  HIDROGENO: 'H2',
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

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<VehicleRow[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, perPage: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [marca, setMarca] = useState('');
  const [combustible, setCombustible] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchVehicles = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), perPage: '20' });
      if (search) params.set('q', search);
      if (marca) params.set('marca', marca);
      if (combustible) params.set('combustible', combustible);

      const res = await fetch(`/api/vehicles/list?${params}`);
      const json = await res.json();
      if (json.success) {
        setVehicles(json.data.vehicles);
        setPagination(json.data.pagination);
      }
    } catch {
      // Silently fail, show empty state
    } finally {
      setLoading(false);
    }
  }, [search, marca, combustible]);

  useEffect(() => {
    fetchVehicles(1);
  }, [fetchVehicles]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput);
  };

  const clearFilters = () => {
    setSearch('');
    setSearchInput('');
    setMarca('');
    setCombustible('');
  };

  const hasFilters = search || marca || combustible;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-extrabold">Vehiculos</h1>
          <p className="text-brand-muted mt-1">
            {pagination.total.toLocaleString('es-ES')} vehiculos en la base de datos
          </p>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="card space-y-4">
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar por matricula, VIN, marca o modelo..."
              className="input pl-10 py-2.5 text-sm w-full"
            />
          </div>
          <button type="submit" className="btn-primary text-sm px-6">
            Buscar
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
              showFilters ? 'bg-brand-indigo text-white border-brand-indigo' : 'border-brand-border text-brand-body hover:bg-gray-50'
            }`}
          >
            <Filter size={16} />
          </button>
        </form>

        {/* Expandable filters */}
        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-2 border-t border-brand-border">
            <div>
              <label className="text-xs font-semibold text-brand-muted block mb-1">Marca</label>
              <input
                type="text"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                placeholder="Ej: Volkswagen"
                className="input text-sm w-full"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-brand-muted block mb-1">Combustible</label>
              <select
                value={combustible}
                onChange={(e) => setCombustible(e.target.value)}
                className="input text-sm w-full"
              >
                <option value="">Todos</option>
                <option value="GASOLINA">Gasolina</option>
                <option value="DIESEL">Diesel</option>
                <option value="HIBRIDO">Hibrido</option>
                <option value="HIBRIDO_ENCHUFABLE">Hibrido enchufable</option>
                <option value="ELECTRICO">Electrico</option>
                <option value="GLP">GLP</option>
              </select>
            </div>
            <div className="col-span-2 flex items-end">
              {hasFilters && (
                <button onClick={clearFilters} className="text-sm text-brand-indigo hover:underline">
                  Limpiar filtros
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 size={32} className="animate-spin text-brand-indigo" />
          </div>
        ) : vehicles.length === 0 ? (
          <div className="text-center py-20">
            <Car size={48} className="mx-auto text-brand-muted/30 mb-3" />
            <p className="text-brand-muted font-semibold">No se encontraron vehiculos</p>
            {hasFilters && (
              <button onClick={clearFilters} className="text-sm text-brand-indigo hover:underline mt-2">
                Limpiar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-brand-border bg-gray-50/50">
                  <th className="text-left px-4 py-3 font-semibold text-brand-muted">Matricula</th>
                  <th className="text-left px-4 py-3 font-semibold text-brand-muted">Vehiculo</th>
                  <th className="text-left px-4 py-3 font-semibold text-brand-muted hidden md:table-cell">Combustible</th>
                  <th className="text-left px-4 py-3 font-semibold text-brand-muted hidden lg:table-cell">Provincia</th>
                  <th className="text-left px-4 py-3 font-semibold text-brand-muted hidden lg:table-cell">Estado</th>
                  <th className="text-center px-4 py-3 font-semibold text-brand-muted">Alertas</th>
                  <th className="text-center px-4 py-3 font-semibold text-brand-muted hidden md:table-cell">Eventos</th>
                  <th className="text-right px-4 py-3 font-semibold text-brand-muted"></th>
                </tr>
              </thead>
              <tbody>
                {vehicles.map((v) => (
                  <tr
                    key={v.id}
                    className="border-b border-brand-border/50 hover:bg-pastel-blue/20 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <span className="font-mono font-bold text-brand-indigo">{v.matricula}</span>
                    </td>
                    <td className="px-4 py-3">
                      <p className="font-semibold text-brand-navy">
                        {v.marca} {v.modelo}
                      </p>
                      <p className="text-xs text-brand-muted">
                        {v.version ?? ''} {v.year ? `· ${v.year}` : ''} {v.potenciaCv ? `· ${v.potenciaCv} CV` : ''}
                      </p>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      {v.combustible && (
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${fuelColors[v.combustible] ?? 'bg-gray-100 text-gray-600'}`}>
                          {fuelLabels[v.combustible] ?? v.combustible}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell text-brand-muted">
                      {v.provinciaActual ?? '—'}
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      {v.dgtStatus && (
                        <span className={`text-[10px] font-bold px-2 py-1 rounded-full ${statusColors[v.dgtStatus] ?? 'bg-gray-100 text-gray-600'}`}>
                          {v.dgtStatus}
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center">
                      {v.activeAlerts > 0 ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600">
                          <ShieldAlert size={14} /> {v.activeAlerts}
                        </span>
                      ) : (
                        <span className="text-xs text-brand-muted">0</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <span className="text-xs text-brand-muted">{v.totalEvents}</span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/dashboard/vehicles/${v.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-indigo hover:text-brand-teal transition-colors"
                      >
                        <Eye size={14} /> Ver
                      </Link>
                    </td>
                  </tr>
                ))}
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
                onClick={() => fetchVehicles(pagination.page - 1)}
                disabled={pagination.page <= 1}
                className="p-1.5 rounded-lg border border-brand-border hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={16} />
              </button>
              <span className="text-sm font-semibold text-brand-indigo">
                {pagination.page} / {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchVehicles(pagination.page + 1)}
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
