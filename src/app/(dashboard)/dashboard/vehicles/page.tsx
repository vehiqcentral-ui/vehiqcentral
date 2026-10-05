'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Car, Search, Filter, ChevronLeft, ChevronRight,
  ShieldAlert, Eye, X, LayoutGrid, TableIcon, Download,
  Fuel, Clock, AlertTriangle,
} from 'lucide-react';
import {
  Input, Select, Badge,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableEmpty,
  Card, CardTitle, EmptyState, SkeletonTable,
} from '@/components/ui';

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

const fuelBadgeVariant: Record<string, 'default' | 'success' | 'warning' | 'danger' | 'info' | 'teal' | 'gold'> = {
  GASOLINA: 'warning',
  DIESEL: 'default',
  HIBRIDO: 'info',
  HIBRIDO_ENCHUFABLE: 'info',
  ELECTRICO: 'success',
  GLP: 'teal',
  GNC: 'teal',
  HIDROGENO: 'teal',
};

const statusBadgeVariant: Record<string, 'success' | 'warning' | 'danger'> = {
  Alta: 'success',
  'Baja temporal': 'warning',
  'Baja definitiva': 'danger',
};

const fuelOptions = [
  { value: '', label: 'Todos' },
  { value: 'GASOLINA', label: 'Gasolina' },
  { value: 'DIESEL', label: 'Diesel' },
  { value: 'HIBRIDO', label: 'Hibrido' },
  { value: 'HIBRIDO_ENCHUFABLE', label: 'Hibrido enchufable' },
  { value: 'ELECTRICO', label: 'Electrico' },
  { value: 'GLP', label: 'GLP' },
];

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<VehicleRow[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, perPage: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [marca, setMarca] = useState('');
  const [combustible, setCombustible] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [yearMin, setYearMin] = useState('');
  const [yearMax, setYearMax] = useState('');
  const [provincia, setProvincia] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table');

  const fetchVehicles = useCallback(async (page: number) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), perPage: '20' });
      if (search) params.set('q', search);
      if (marca) params.set('marca', marca);
      if (combustible) params.set('combustible', combustible);
      if (yearMin) params.set('yearMin', yearMin);
      if (yearMax) params.set('yearMax', yearMax);
      if (provincia) params.set('provincia', provincia);

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
  }, [search, marca, combustible, yearMin, yearMax, provincia]);

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
    setYearMin('');
    setYearMax('');
    setProvincia('');
  };

  const hasFilters = search || marca || combustible || yearMin || yearMax || provincia;

  // Summary stats
  const totalAlerts = vehicles.reduce((sum, v) => sum + v.activeAlerts, 0);
  const fuelCounts: Record<string, number> = {};
  vehicles.forEach((v) => {
    if (v.combustible) fuelCounts[v.combustible] = (fuelCounts[v.combustible] || 0) + 1;
  });
  const mostCommonFuel = Object.entries(fuelCounts).sort((a, b) => b[1] - a[1])[0];
  const mostCommonFuelLabel = mostCommonFuel ? (fuelLabels[mostCommonFuel[0]] ?? mostCommonFuel[0]) : '—';

  // Export CSV
  const handleExportCsv = () => {
    const headers = ['Matricula', 'Marca', 'Modelo', 'Version', 'Combustible', 'Ano', 'Provincia', 'Estado DGT', 'Alertas', 'Eventos'];
    const rows = vehicles.map((v) => [
      v.matricula,
      v.marca,
      v.modelo,
      v.version ?? '',
      v.combustible ? (fuelLabels[v.combustible] ?? v.combustible) : '',
      v.year ?? '',
      v.provinciaActual ?? '',
      v.dgtStatus ?? '',
      v.activeAlerts,
      v.totalEvents,
    ]);
    const csvContent = [headers, ...rows].map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const blob = new Blob(['﻿' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `vehiculos_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

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

      {/* Summary Stats */}
      {!loading && vehicles.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-indigo/10">
                <Car size={20} className="text-brand-indigo" />
              </div>
              <div>
                <p className="text-xs text-brand-muted">Total vehiculos</p>
                <p className="text-xl font-bold text-brand-navy">{pagination.total.toLocaleString('es-ES')}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-red-50">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <div>
                <p className="text-xs text-brand-muted">Alertas activas</p>
                <p className="text-xl font-bold text-brand-navy">{totalAlerts}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-teal/10">
                <Fuel size={20} className="text-brand-teal" />
              </div>
              <div>
                <p className="text-xs text-brand-muted">Combustible mas comun</p>
                <p className="text-xl font-bold text-brand-navy">{mostCommonFuelLabel}</p>
              </div>
            </div>
          </Card>
          <Card>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-brand-indigo/10">
                <Clock size={20} className="text-brand-indigo" />
              </div>
              <div>
                <p className="text-xs text-brand-muted">Ultima consulta</p>
                <p className="text-xl font-bold text-brand-navy">Hoy</p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Search & Filters */}
      <Card>
        <form onSubmit={handleSearch} className="flex gap-3">
          <div className="flex-1">
            <Input
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Buscar por matricula, VIN, marca o modelo..."
              icon={<Search size={18} />}
            />
          </div>
          <button type="submit" className="btn-primary text-sm px-6">
            Buscar
          </button>
          <button
            type="button"
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 rounded-button border text-sm font-medium transition-colors ${
              showFilters ? 'bg-brand-indigo text-white border-brand-indigo' : 'border-brand-border text-brand-body hover:bg-gray-50'
            }`}
          >
            <Filter size={16} />
          </button>
          <div className="flex border border-brand-border rounded-button overflow-hidden">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 transition-colors ${viewMode === 'table' ? 'bg-brand-indigo text-white' : 'text-brand-body hover:bg-gray-50'}`}
              title="Vista tabla"
            >
              <TableIcon size={16} />
            </button>
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 transition-colors ${viewMode === 'grid' ? 'bg-brand-indigo text-white' : 'text-brand-body hover:bg-gray-50'}`}
              title="Vista tarjetas"
            >
              <LayoutGrid size={16} />
            </button>
          </div>
          <button
            type="button"
            onClick={handleExportCsv}
            disabled={vehicles.length === 0}
            className="px-4 py-2 rounded-button border border-brand-border text-sm font-medium text-brand-body hover:bg-gray-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
          >
            <Download size={16} /> Exportar CSV
          </button>
        </form>

        {/* Expandable filters */}
        {showFilters && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 mt-4 border-t border-brand-border">
            <Input
              label="Marca"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Ej: Volkswagen"
            />
            <Select
              label="Combustible"
              value={combustible}
              onChange={(e) => setCombustible(e.target.value)}
              options={fuelOptions}
            />
            <Input
              label="Ano minimo"
              type="number"
              value={yearMin}
              onChange={(e) => setYearMin(e.target.value)}
              placeholder="Ej: 2015"
            />
            <Input
              label="Ano maximo"
              type="number"
              value={yearMax}
              onChange={(e) => setYearMax(e.target.value)}
              placeholder="Ej: 2024"
            />
            <Input
              label="Provincia"
              value={provincia}
              onChange={(e) => setProvincia(e.target.value)}
              placeholder="Ej: Madrid"
            />
            <div className="col-span-1 md:col-span-3 flex items-end">
              {hasFilters && (
                <button onClick={clearFilters} className="text-sm text-brand-indigo hover:underline flex items-center gap-1">
                  <X size={14} /> Limpiar filtros
                </button>
              )}
            </div>
          </div>
        )}
      </Card>

      {/* Table */}
      {loading ? (
        <SkeletonTable rows={8} />
      ) : vehicles.length === 0 ? (
        <Card>
          <EmptyState
            icon={<Car size={48} />}
            title="No se encontraron vehiculos"
            description={hasFilters ? 'Prueba con otros filtros de busqueda' : 'Aun no hay vehiculos en la base de datos'}
            action={
              hasFilters ? (
                <button onClick={clearFilters} className="btn-primary text-sm">
                  Limpiar filtros
                </button>
              ) : undefined
            }
          />
        </Card>
      ) : (
        <>
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {vehicles.map((v) => (
                <Card key={v.id}>
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <span className="font-mono font-bold text-brand-indigo text-lg">{v.matricula}</span>
                      {v.activeAlerts > 0 && (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600">
                          <ShieldAlert size={14} /> {v.activeAlerts}
                        </span>
                      )}
                    </div>
                    <p className="font-semibold text-brand-navy">
                      {v.marca} {v.modelo}
                    </p>
                    <p className="text-xs text-brand-muted">
                      {v.version ?? ''} {v.year ? `· ${v.year}` : ''} {v.potenciaCv ? `· ${v.potenciaCv} CV` : ''}
                    </p>
                    <div className="flex items-center justify-between pt-2 border-t border-brand-border">
                      {v.combustible ? (
                        <Badge variant={fuelBadgeVariant[v.combustible] ?? 'default'} className="text-[10px]">
                          {fuelLabels[v.combustible] ?? v.combustible}
                        </Badge>
                      ) : <span />}
                      <Link
                        href={`/dashboard/vehicles/${v.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-indigo hover:text-brand-teal transition-colors"
                      >
                        <Eye size={14} /> Ver
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
          <Table>
            <TableHeader>
              <tr>
                <TableHead>Matricula</TableHead>
                <TableHead>Vehiculo</TableHead>
                <TableHead className="hidden md:table-cell">Combustible</TableHead>
                <TableHead className="hidden lg:table-cell">Provincia</TableHead>
                <TableHead className="hidden lg:table-cell">Estado</TableHead>
                <TableHead className="text-center">Alertas</TableHead>
                <TableHead className="text-center hidden md:table-cell">Eventos</TableHead>
                <TableHead className="text-right" />
              </tr>
            </TableHeader>
            <TableBody>
              {vehicles.map((v) => (
                <TableRow key={v.id}>
                  <TableCell>
                    <span className="font-mono font-bold text-brand-indigo">{v.matricula}</span>
                  </TableCell>
                  <TableCell>
                    <p className="font-semibold text-brand-navy">
                      {v.marca} {v.modelo}
                    </p>
                    <p className="text-xs text-brand-muted">
                      {v.version ?? ''} {v.year ? `· ${v.year}` : ''} {v.potenciaCv ? `· ${v.potenciaCv} CV` : ''}
                    </p>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {v.combustible && (
                      <Badge variant={fuelBadgeVariant[v.combustible] ?? 'default'} className="text-[10px]">
                        {fuelLabels[v.combustible] ?? v.combustible}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-brand-muted">
                    {v.provinciaActual ?? '—'}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell">
                    {v.dgtStatus && (
                      <Badge variant={statusBadgeVariant[v.dgtStatus] ?? 'default'} className="text-[10px]">
                        {v.dgtStatus}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    {v.activeAlerts > 0 ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600">
                        <ShieldAlert size={14} /> {v.activeAlerts}
                      </span>
                    ) : (
                      <span className="text-xs text-brand-muted">0</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center hidden md:table-cell">
                    <span className="text-xs text-brand-muted">{v.totalEvents}</span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Link
                      href={`/dashboard/vehicles/${v.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-indigo hover:text-brand-teal transition-colors"
                    >
                      <Eye size={14} /> Ver
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
        </>
      )}
    </div>
  );
}
