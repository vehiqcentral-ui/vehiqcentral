'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Building2,
  Users,
  Bell,
  Plug,
  Save,
  Loader2,
  CheckCircle,
  User,
} from 'lucide-react';

/* ── Types ──────────────────────────────── */

interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  phone: string | null;
  locale: string;
  image: string | null;
  role: string;
  plan: string;
  createdAt: string;
}

interface OrgData {
  id: string;
  name: string;
  type: string;
  taxId: string | null;
  address: string | null;
  city: string | null;
  province: string | null;
  postcode: string | null;
  country: string;
  phone: string | null;
  website: string | null;
  logo: string | null;
  plan: string;
}

/* ── Helpers ─────────────────────────────── */

const orgTypeLabels: Record<string, string> = {
  DEALERSHIP: 'Concesionario',
  INSURANCE_COMPANY: 'Aseguradora',
  FLEET_OPERATOR: 'Operador de flota',
  LEASING_COMPANY: 'Empresa de leasing',
  FINANCE_COMPANY: 'Financiera',
  INSPECTION_CENTER: 'Centro ITV',
  GOVERNMENT: 'Administracion publica',
  OTHER: 'Otro',
};

const roleLabels: Record<string, string> = {
  SUPER_ADMIN: 'Super Admin',
  ADMIN: 'Administrador',
  MANAGER: 'Gestor',
  EDITOR: 'Editor',
  USER: 'Usuario',
  VIEWER: 'Visor',
};

const planLabels: Record<string, string> = {
  FREE: 'Gratuito',
  STARTER: 'Starter',
  PROFESSIONAL: 'Profesional',
  ENTERPRISE: 'Enterprise',
};

const integrations = [
  { name: 'DGT', status: 'conectado', desc: 'Consultas de historial vehicular y datos de trafico' },
  { name: 'Coches.net', status: 'conectado', desc: 'Scraping de anuncios y datos de mercado' },
  { name: 'AutoScout24', status: 'conectado', desc: 'Datos de precios internacionales' },
  { name: 'Wallapop', status: 'desconectado', desc: 'Datos de mercado de segunda mano' },
  { name: 'Carfax EU', status: 'desconectado', desc: 'Historial de vehiculos importados' },
];

/* ── Component ──────────────────────────── */

export default function SettingsPage() {
  const [tab, setTab] = useState('perfil');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [org, setOrg] = useState<OrgData | null>(null);

  // Editable profile fields
  const [profileName, setProfileName] = useState('');
  const [profilePhone, setProfilePhone] = useState('');
  const [profileLocale, setProfileLocale] = useState('es');

  // Editable org fields
  const [orgName, setOrgName] = useState('');
  const [orgType, setOrgType] = useState('');
  const [orgTaxId, setOrgTaxId] = useState('');
  const [orgAddress, setOrgAddress] = useState('');
  const [orgCity, setOrgCity] = useState('');
  const [orgProvince, setOrgProvince] = useState('');
  const [orgPostcode, setOrgPostcode] = useState('');
  const [orgPhone, setOrgPhone] = useState('');
  const [orgWebsite, setOrgWebsite] = useState('');

  const fetchSettings = useCallback(async () => {
    try {
      const res = await fetch('/api/settings');
      const json = await res.json();
      if (json.success) {
        const u = json.data.user;
        const o = json.data.organization;
        setProfile(u);
        setOrg(o);

        setProfileName(u.name ?? '');
        setProfilePhone(u.phone ?? '');
        setProfileLocale(u.locale ?? 'es');

        if (o) {
          setOrgName(o.name ?? '');
          setOrgType(o.type ?? '');
          setOrgTaxId(o.taxId ?? '');
          setOrgAddress(o.address ?? '');
          setOrgCity(o.city ?? '');
          setOrgProvince(o.province ?? '');
          setOrgPostcode(o.postcode ?? '');
          setOrgPhone(o.phone ?? '');
          setOrgWebsite(o.website ?? '');
        }
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  async function handleSaveProfile() {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: {
            name: profileName || undefined,
            phone: profilePhone || null,
            locale: profileLocale,
          },
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  }

  async function handleSaveOrg() {
    setSaving(true);
    setSaveSuccess(false);
    try {
      const res = await fetch('/api/settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organization: {
            name: orgName || undefined,
            type: orgType || undefined,
            taxId: orgTaxId || null,
            address: orgAddress || null,
            city: orgCity || null,
            province: orgProvince || null,
            postcode: orgPostcode || null,
            phone: orgPhone || null,
            website: orgWebsite || null,
          },
        }),
      });
      const json = await res.json();
      if (json.success) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    } catch {
      // silently fail
    } finally {
      setSaving(false);
    }
  }

  const tabs = [
    { id: 'perfil', label: 'Mi perfil', icon: User },
    { id: 'empresa', label: 'Organizacion', icon: Building2 },
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell },
    { id: 'integraciones', label: 'Integraciones', icon: Plug },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-brand-muted">
        <Loader2 size={28} className="animate-spin mr-3" /> Cargando configuracion...
      </div>
    );
  }

  const isAdmin = profile?.role === 'ADMIN' || profile?.role === 'SUPER_ADMIN';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">Configuracion</h1>
        <p className="text-brand-muted mt-1">Perfil, organizacion, notificaciones e integraciones</p>
      </div>

      <div className="flex gap-2 border-b border-brand-border pb-0">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t.id
                ? 'border-brand-teal text-brand-indigo'
                : 'border-transparent text-brand-muted hover:text-brand-indigo'
            }`}
          >
            <t.icon size={16} /> {t.label}
          </button>
        ))}
      </div>

      {/* Mi perfil */}
      {tab === 'perfil' && profile && (
        <div className="card">
          <h2 className="font-heading font-bold text-brand-indigo mb-4">Mi perfil</h2>

          <div className="flex items-center gap-4 mb-6 pb-6 border-b border-brand-border">
            <div className="w-16 h-16 bg-brand-teal rounded-full flex items-center justify-center text-white font-heading font-bold text-xl shrink-0">
              {(profile.name ?? profile.email)
                .split(' ')
                .map(n => n[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            </div>
            <div>
              <p className="font-heading font-bold text-brand-indigo text-lg">{profile.name ?? 'Sin nombre'}</p>
              <p className="text-sm text-brand-muted">{profile.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs px-2 py-0.5 rounded bg-pastel-blue text-brand-indigo font-semibold">
                  {roleLabels[profile.role] ?? profile.role}
                </span>
                <span className="text-xs px-2 py-0.5 rounded bg-pastel-mint text-brand-teal font-semibold">
                  Plan {planLabels[profile.plan] ?? profile.plan}
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-brand-muted font-semibold block mb-1">Nombre completo</label>
              <input value={profileName} onChange={e => setProfileName(e.target.value)} className="input text-sm" />
            </div>
            <div>
              <label className="text-xs text-brand-muted font-semibold block mb-1">Email</label>
              <input value={profile.email} disabled className="input text-sm bg-gray-50 text-brand-muted cursor-not-allowed" />
            </div>
            <div>
              <label className="text-xs text-brand-muted font-semibold block mb-1">Telefono</label>
              <input value={profilePhone} onChange={e => setProfilePhone(e.target.value)} placeholder="+34 600 000 000" className="input text-sm" />
            </div>
            <div>
              <label className="text-xs text-brand-muted font-semibold block mb-1">Idioma</label>
              <select value={profileLocale} onChange={e => setProfileLocale(e.target.value)} className="input text-sm">
                <option value="es">Espanol</option>
                <option value="en">English</option>
                <option value="nl">Nederlands</option>
              </select>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            <button onClick={handleSaveProfile} disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Guardar perfil
            </button>
            {saveSuccess && (
              <span className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle size={14} /> Guardado correctamente
              </span>
            )}
          </div>
        </div>
      )}

      {/* Organizacion */}
      {tab === 'empresa' && (
        <div className="card">
          <h2 className="font-heading font-bold text-brand-indigo mb-4">Datos de la organizacion</h2>

          {!org ? (
            <div className="text-center py-12 text-brand-muted">
              <Building2 size={40} className="mx-auto mb-3" />
              <p className="font-heading font-bold">Sin organizacion</p>
              <p className="text-sm mt-1">No tienes una organizacion asignada. Contacta con un administrador.</p>
            </div>
          ) : (
            <>
              {!isAdmin && (
                <div className="bg-pastel-peach/30 text-amber-700 text-sm px-4 py-2 rounded-lg mb-4">
                  Solo los administradores pueden editar los datos de la organizacion.
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-brand-muted font-semibold block mb-1">Nombre</label>
                  <input value={orgName} onChange={e => setOrgName(e.target.value)} disabled={!isAdmin} className={`input text-sm ${!isAdmin ? 'bg-gray-50 text-brand-muted cursor-not-allowed' : ''}`} />
                </div>
                <div>
                  <label className="text-xs text-brand-muted font-semibold block mb-1">Tipo</label>
                  <select value={orgType} onChange={e => setOrgType(e.target.value)} disabled={!isAdmin} className={`input text-sm ${!isAdmin ? 'bg-gray-50 text-brand-muted cursor-not-allowed' : ''}`}>
                    {Object.entries(orgTypeLabels).map(([k, v]) => (
                      <option key={k} value={k}>{v}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-brand-muted font-semibold block mb-1">CIF / NIF</label>
                  <input value={orgTaxId} onChange={e => setOrgTaxId(e.target.value)} disabled={!isAdmin} placeholder="B-12345678" className={`input text-sm ${!isAdmin ? 'bg-gray-50 text-brand-muted cursor-not-allowed' : ''}`} />
                </div>
                <div>
                  <label className="text-xs text-brand-muted font-semibold block mb-1">Telefono</label>
                  <input value={orgPhone} onChange={e => setOrgPhone(e.target.value)} disabled={!isAdmin} placeholder="+34 912 345 678" className={`input text-sm ${!isAdmin ? 'bg-gray-50 text-brand-muted cursor-not-allowed' : ''}`} />
                </div>
                <div className="md:col-span-2">
                  <label className="text-xs text-brand-muted font-semibold block mb-1">Direccion</label>
                  <input value={orgAddress} onChange={e => setOrgAddress(e.target.value)} disabled={!isAdmin} placeholder="Calle, numero" className={`input text-sm ${!isAdmin ? 'bg-gray-50 text-brand-muted cursor-not-allowed' : ''}`} />
                </div>
                <div>
                  <label className="text-xs text-brand-muted font-semibold block mb-1">Ciudad</label>
                  <input value={orgCity} onChange={e => setOrgCity(e.target.value)} disabled={!isAdmin} className={`input text-sm ${!isAdmin ? 'bg-gray-50 text-brand-muted cursor-not-allowed' : ''}`} />
                </div>
                <div>
                  <label className="text-xs text-brand-muted font-semibold block mb-1">Provincia</label>
                  <input value={orgProvince} onChange={e => setOrgProvince(e.target.value)} disabled={!isAdmin} className={`input text-sm ${!isAdmin ? 'bg-gray-50 text-brand-muted cursor-not-allowed' : ''}`} />
                </div>
                <div>
                  <label className="text-xs text-brand-muted font-semibold block mb-1">Codigo postal</label>
                  <input value={orgPostcode} onChange={e => setOrgPostcode(e.target.value)} disabled={!isAdmin} placeholder="28001" className={`input text-sm ${!isAdmin ? 'bg-gray-50 text-brand-muted cursor-not-allowed' : ''}`} />
                </div>
                <div>
                  <label className="text-xs text-brand-muted font-semibold block mb-1">Sitio web</label>
                  <input value={orgWebsite} onChange={e => setOrgWebsite(e.target.value)} disabled={!isAdmin} placeholder="www.ejemplo.es" className={`input text-sm ${!isAdmin ? 'bg-gray-50 text-brand-muted cursor-not-allowed' : ''}`} />
                </div>
              </div>

              {isAdmin && (
                <div className="flex items-center gap-3 mt-4">
                  <button onClick={handleSaveOrg} disabled={saving} className="btn-primary flex items-center gap-2 disabled:opacity-50">
                    {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Guardar organizacion
                  </button>
                  {saveSuccess && (
                    <span className="text-sm text-green-600 flex items-center gap-1">
                      <CheckCircle size={14} /> Guardado correctamente
                    </span>
                  )}
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Notificaciones */}
      {tab === 'notificaciones' && (
        <div className="card">
          <h2 className="font-heading font-bold text-brand-indigo mb-4">Preferencias de notificaciones</h2>
          <div className="space-y-4">
            {[
              { label: 'Alertas de fraude', desc: 'Recibir notificaciones cuando se detecte un vehiculo con riesgo', default: true },
              { label: 'Nuevos informes', desc: 'Aviso cuando un informe este listo para descargar', default: true },
              { label: 'Cambios de precio en mercado', desc: 'Alertas de variaciones significativas de precio por modelo', default: false },
              { label: 'Resumen semanal', desc: 'Email con resumen de actividad y tendencias cada lunes', default: false },
              { label: 'Nuevas fuentes de datos', desc: 'Notificacion cuando se integren nuevos portales de datos', default: true },
            ].map((n, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-brand-border/50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-brand-indigo">{n.label}</p>
                  <p className="text-xs text-brand-muted">{n.desc}</p>
                </div>
                <label className="relative inline-flex cursor-pointer">
                  <input type="checkbox" defaultChecked={n.default} className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-checked:bg-brand-teal rounded-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
            ))}
          </div>
          <p className="text-xs text-brand-muted mt-4">Las preferencias de notificaciones se guardaran automaticamente en una version futura.</p>
        </div>
      )}

      {/* Integraciones */}
      {tab === 'integraciones' && (
        <div className="card">
          <h2 className="font-heading font-bold text-brand-indigo mb-4">Fuentes de datos e integraciones</h2>
          <p className="text-sm text-brand-muted mb-4">Conexiones con portales de datos vehiculares y servicios externos.</p>
          <div className="space-y-3">
            {integrations.map(int => (
              <div key={int.name} className="flex items-center justify-between p-3 rounded-lg border border-brand-border">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                    <Plug size={18} className="text-brand-indigo" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-brand-indigo">{int.name}</p>
                    <p className="text-xs text-brand-muted">{int.desc}</p>
                  </div>
                </div>
                <span
                  className={`text-xs font-semibold px-3 py-1.5 rounded-button ${
                    int.status === 'conectado'
                      ? 'bg-pastel-mint text-brand-teal'
                      : 'bg-gray-100 text-brand-muted'
                  }`}
                >
                  {int.status === 'conectado' ? 'Conectado' : 'Proximamente'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
