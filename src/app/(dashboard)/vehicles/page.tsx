'use client';

import { useState } from 'react';
import { Search, Car, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

export default function VehiclesPage() {
  const [query, setQuery] = useState('');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold">Consulta de vehiculos</h1>
        <p className="text-brand-muted mt-1">
          Busca por matricula o VIN para obtener historial completo, valoracion y analisis de fraude.
        </p>
      </div>

      {/* Search card */}
      <div className="card">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // TODO: trigger lookup
          }}
          className="flex gap-4"
        >
          <div className="relative flex-1">
            <Car
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-muted"
            />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Introduce matricula (ej: 1234 ABC) o VIN"
              className="input pl-12 text-lg"
            />
          </div>
          <button type="submit" className="btn-primary flex items-center gap-2 px-8">
            <Search size={20} />
            Consultar
          </button>
        </form>
      </div>

      {/* Recent lookups */}
      <div>
        <h2 className="text-xl font-bold mb-4">Consultas recientes</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {/* Placeholder cards — replaced by real data in production */}
          {[
            { plate: '1234 ABC', brand: 'Volkswagen Golf', status: 'clean', time: 'Hace 2 horas' },
            { plate: '5678 DEF', brand: 'SEAT Leon', status: 'warning', time: 'Hace 5 horas' },
            { plate: '9012 GHI', brand: 'BMW Serie 3', status: 'clean', time: 'Ayer' },
          ].map((item) => (
            <div key={item.plate} className="card flex items-center gap-4 cursor-pointer hover:border-brand-teal">
              <div className="w-12 h-12 bg-pastel-blue rounded-lg flex items-center justify-center">
                <Car size={24} className="text-brand-indigo" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-heading font-bold text-brand-indigo">{item.plate}</p>
                <p className="text-sm text-brand-muted truncate">{item.brand}</p>
              </div>
              <div className="flex flex-col items-end gap-1">
                {item.status === 'clean' ? (
                  <span className="badge-success text-xs">
                    <CheckCircle size={12} className="mr-1" /> Limpio
                  </span>
                ) : (
                  <span className="badge-warning text-xs">
                    <AlertTriangle size={12} className="mr-1" /> Alerta
                  </span>
                )}
                <span className="text-xs text-brand-muted flex items-center gap-1">
                  <Clock size={12} /> {item.time}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
