'use client';

import { useState } from 'react';
import {
  Car, FileText, Shield, ClipboardCheck, TrendingUp, Store,
  Download, Star, CheckCircle, AlertTriangle, Clock, MapPin,
  ChevronUp, ChevronDown, Calendar, Hash, Fuel, Gauge, Weight,
  Palette, DoorOpen, Wind, Info, ArrowUpRight, ArrowDownRight,
} from 'lucide-react';

const tabs = [
  { key: 'general', label: 'Datos generales', icon: Car },
  { key: 'historial', label: 'Historial', icon: Clock },
  { key: 'valoracion', label: 'Valoracion', icon: TrendingUp },
  { key: 'fraude', label: 'Fraude', icon: Shield },
  { key: 'itv', label: 'ITV', icon: ClipboardCheck },
  { key: 'mercado', label: 'Mercado', icon: Store },
  { key: 'documentos', label: 'Documentos', icon: FileText },
];

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between py-3 border-b border-brand-border last:border-0">
      <span className="text-brand-muted text-sm">{label}</span>
      <span className="font-heading font-bold text-sm text-brand-indigo">{value}</span>
    </div>
  );
}

function TabGeneral() {
  const specs = [
    ['VIN', 'WVWZZZ1KZLW123456'], ['Matricula', '1234 ABC'],
    ['Marca', 'Volkswagen'], ['Modelo', 'Golf 8'], ['Version', 'GTI'],
    ['Ano', '2021'], ['Mes matriculacion', 'Marzo 2021'],
    ['Combustible', 'Gasolina'], ['Transmision', 'DSG 7 velocidades'],
    ['Potencia', '245 CV (180 kW)'], ['Cilindrada', '1.984 cc'],
    ['Color', 'Gris Urano'], ['Puertas', '5'],
    ['CO2', '168 g/km'], ['Norma Euro', 'Euro 6d'],
    ['Peso', '1.395 kg'], ['MMA', '1.870 kg'],
    ['N. bastidores anteriores', '0'],
  ];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="card">
        <h3 className="text-lg font-extrabold mb-4">Identificacion</h3>
        {specs.slice(0, 5).map(([l, v]) => <SpecRow key={l} label={l} value={v} />)}
      </div>
      <div className="card">
        <h3 className="text-lg font-extrabold mb-4">Matriculacion</h3>
        {specs.slice(5, 9).map(([l, v]) => <SpecRow key={l} label={l} value={v} />)}
      </div>
      <div className="card">
        <h3 className="text-lg font-extrabold mb-4">Mecanica</h3>
        {specs.slice(9, 13).map(([l, v]) => <SpecRow key={l} label={l} value={v} />)}
      </div>
      <div className="card">
        <h3 className="text-lg font-extrabold mb-4">Emisiones y peso</h3>
        {specs.slice(13).map(([l, v]) => <SpecRow key={l} label={l} value={v} />)}
      </div>
    </div>
  );
}

const timeline = [
  { date: '15/03/2024', title: 'Transferencia de titularidad', desc: 'Nuevo propietario registrado en DGT', color: 'bg-pastel-purple text-brand-indigo' },
  { date: '02/01/2024', title: 'Inspeccion ITV', desc: 'Resultado favorable, proxima: 01/2026', color: 'bg-pastel-mint text-brand-teal' },
  { date: '18/11/2023', title: 'Registro de kilometraje', desc: '87.432 km (coherente)', color: 'bg-pastel-blue text-brand-indigo' },
  { date: '05/06/2023', title: 'Alta seguro', desc: 'Poliza a todo riesgo con Mapfre', color: 'bg-pastel-peach text-amber-700' },
  { date: '12/03/2021', title: 'Primera matriculacion', desc: 'Alta nueva en DGT, Madrid', color: 'bg-pastel-purple text-brand-indigo' },
];

function TabHistorial() {
  return (
    <div className="card">
      <h3 className="text-lg font-extrabold mb-6">Historial del vehiculo</h3>
      <div className="relative pl-8 space-y-6">
        <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-brand-border" />
        {timeline.map((ev, i) => (
          <div key={i} className="relative">
            <div className="absolute -left-5 top-1 w-4 h-4 rounded-full bg-brand-teal border-2 border-white" />
            <div className="flex flex-col sm:flex-row sm:items-start gap-2">
              <span className="text-xs font-bold text-brand-muted whitespace-nowrap min-w-[90px]">{ev.date}</span>
              <div>
                <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded-full mb-1 ${ev.color}`}>{ev.title}</span>
                <p className="text-sm text-brand-body">{ev.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const comparables = [
  { name: 'VW Golf GTI 2021 — 65.000 km', price: '25.200' },
  { name: 'VW Golf GTI 2020 — 92.000 km', price: '23.800' },
  { name: 'VW Golf GTI 2021 — 78.000 km', price: '24.900' },
];

function TabValoracion() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ['Valor mercado', '24.500'], ['Valor concesion', '22.800'],
          ['Valor venta', '26.200'], ['Valor mayorista', '21.500'],
        ].map(([label, val]) => (
          <div key={label} className="stat-card bg-pastel-blue">
            <span className="text-xs text-brand-muted">{label}</span>
            <span className="text-2xl font-heading font-extrabold text-brand-indigo">{val} EUR</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-extrabold mb-4">Confianza y tendencia</h3>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-full bg-pastel-mint flex items-center justify-center">
              <span className="text-xl font-heading font-extrabold text-brand-teal">92%</span>
            </div>
            <div>
              <p className="font-heading font-bold text-brand-indigo">Confianza alta</p>
              <p className="text-sm text-brand-muted">Basado en 234 vehiculos similares</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <ArrowUpRight className="w-4 h-4 text-brand-teal" />
            <span className="text-brand-teal font-bold">+2,3%</span>
            <span className="text-brand-muted">vs. mes anterior</span>
          </div>
        </div>
        <div className="card">
          <h3 className="text-lg font-extrabold mb-4">Vehiculos comparables</h3>
          {comparables.map((c, i) => (
            <div key={i} className="flex justify-between py-2 border-b border-brand-border last:border-0">
              <span className="text-sm text-brand-body">{c.name}</span>
              <span className="text-sm font-bold text-brand-indigo">{c.price} EUR</span>
            </div>
          ))}
        </div>
      </div>
      <p className="text-xs text-brand-muted text-right">Ultima actualizacion: hace 2 horas</p>
    </div>
  );
}

const fraudChecks = [
  { label: 'Kilometraje', ok: true, detail: 'Sin indicios de manipulacion' },
  { label: 'Titularidad', ok: true, detail: 'Historico coherente (2 propietarios)' },
  { label: 'Documentacion', ok: true, detail: 'Ficha tecnica y permiso validos' },
  { label: 'Siniestralidad', ok: true, detail: 'Sin siniestros de importancia' },
  { label: 'Gravamenes', ok: true, detail: 'Vehiculo libre de cargas' },
];

function TabFraude() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="card flex flex-col items-center justify-center text-center">
        <div className="w-24 h-24 rounded-full bg-pastel-mint flex items-center justify-center mb-3">
          <span className="text-3xl font-heading font-extrabold text-brand-teal">12</span>
        </div>
        <p className="font-heading font-bold text-brand-indigo text-lg">Riesgo bajo</p>
        <p className="text-sm text-brand-muted">Puntuacion 12 / 100</p>
      </div>
      <div className="card md:col-span-2">
        <h3 className="text-lg font-extrabold mb-4">Verificaciones</h3>
        <div className="space-y-3">
          {fraudChecks.map((ch) => (
            <div key={ch.label} className="flex items-center gap-3 p-3 rounded-button bg-brand-alt-bg">
              <CheckCircle className="w-5 h-5 text-brand-teal flex-shrink-0" />
              <div className="flex-1">
                <span className="font-heading font-bold text-sm text-brand-indigo">{ch.label}</span>
                <p className="text-xs text-brand-muted">{ch.detail}</p>
              </div>
              <span className="badge-success text-xs">OK</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const itvHistory = [
  { date: '02/01/2024', station: 'ITV Getafe', result: 'Favorable', km: '87.432' },
  { date: '15/01/2023', station: 'ITV Getafe', result: 'Favorable', km: '62.100' },
  { date: '20/03/2021', station: 'ITV Madrid Sur', result: 'Favorable', km: '15' },
];

function TabITV() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          ['Estado actual', 'Favorable'], ['Ultima inspeccion', '02/01/2024'],
          ['Proxima', '01/2026'], ['Estacion', 'ITV Getafe'],
        ].map(([l, v]) => (
          <div key={l} className="stat-card bg-pastel-mint">
            <span className="text-xs text-brand-muted">{l}</span>
            <span className="font-heading font-extrabold text-brand-teal">{v}</span>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 className="text-lg font-extrabold mb-4">Historial de inspecciones</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-brand-border text-left text-brand-muted">
              <th className="py-2 font-semibold">Fecha</th><th className="py-2 font-semibold">Estacion</th>
              <th className="py-2 font-semibold">Resultado</th><th className="py-2 font-semibold">Kilometros</th>
            </tr></thead>
            <tbody>
              {itvHistory.map((r, i) => (
                <tr key={i} className="border-b border-brand-border last:border-0">
                  <td className="py-3 font-bold text-brand-indigo">{r.date}</td>
                  <td className="py-3">{r.station}</td>
                  <td className="py-3"><span className="badge-success">{r.result}</span></td>
                  <td className="py-3">{r.km} km</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function TabMercado() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[
          ['Precio medio publicado', '25.100 EUR'], ['Vehiculos similares', '234'],
          ['Dias medios en venta', '42'], ['Rango de precios', '21.000 - 29.000 EUR'],
          ['Precio mas bajo', '21.000 EUR'], ['Precio mas alto', '29.000 EUR'],
        ].map(([l, v]) => (
          <div key={l} className="stat-card bg-pastel-peach">
            <span className="text-xs text-brand-muted">{l}</span>
            <span className="font-heading font-extrabold text-brand-indigo">{v}</span>
          </div>
        ))}
      </div>
      <div className="card">
        <h3 className="text-lg font-extrabold mb-4">Principales portales</h3>
        <div className="flex flex-wrap gap-3">
          {['Coches.net', 'AutoScout24', 'Wallapop', 'Milanuncios', 'SurMotor'].map((p) => (
            <span key={p} className="badge-info">{p}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

const docs = [
  { name: 'Ficha tecnica', date: '12/03/2021', type: 'PDF' },
  { name: 'Permiso de circulacion', date: '15/03/2024', type: 'PDF' },
  { name: 'Contrato compraventa', date: '15/03/2024', type: 'PDF' },
  { name: 'Informe ITV', date: '02/01/2024', type: 'PDF' },
];

function TabDocumentos() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {docs.map((d) => (
        <div key={d.name} className="card flex items-center gap-4">
          <div className="w-12 h-12 rounded-button bg-pastel-purple flex items-center justify-center">
            <FileText className="w-6 h-6 text-brand-indigo" />
          </div>
          <div className="flex-1">
            <p className="font-heading font-bold text-brand-indigo">{d.name}</p>
            <p className="text-xs text-brand-muted">{d.type} &middot; {d.date}</p>
          </div>
          <button className="p-2 rounded-button hover:bg-brand-alt-bg transition-colors">
            <Download className="w-5 h-5 text-brand-muted" />
          </button>
        </div>
      ))}
    </div>
  );
}

const tabContent: Record<string, () => JSX.Element> = {
  general: TabGeneral, historial: TabHistorial, valoracion: TabValoracion,
  fraude: TabFraude, itv: TabITV, mercado: TabMercado, documentos: TabDocumentos,
};

export default function VehicleDetailPage() {
  const [activeTab, setActiveTab] = useState('general');
  const Content = tabContent[activeTab];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card flex flex-col sm:flex-row items-start sm:items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-brand-indigo flex items-center justify-center">
          <span className="font-heading text-xl font-extrabold text-white">VW</span>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-2xl font-extrabold">1234 ABC</h1>
            <span className="badge-success">Disponible</span>
          </div>
          <p className="text-brand-muted">Volkswagen Golf 8 GTI &mdash; 2021</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-brand-teal text-white font-heading font-bold px-5 py-2.5 rounded-button hover:brightness-110 transition-all text-sm">
            Valorar
          </button>
          <button className="border border-brand-border text-brand-indigo font-heading font-bold px-5 py-2.5 rounded-button hover:bg-brand-alt-bg transition-all text-sm">
            Descargar informe
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto border-b border-brand-border">
        {tabs.map((t) => {
          const Icon = t.icon;
          const active = activeTab === t.key;
          return (
            <button key={t.key} onClick={() => setActiveTab(t.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-heading font-semibold whitespace-nowrap border-b-2 transition-colors ${
                active ? 'border-brand-teal text-brand-teal' : 'border-transparent text-brand-muted hover:text-brand-indigo'
              }`}>
              <Icon className="w-4 h-4" />{t.label}
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <Content />
    </div>
  );
}
