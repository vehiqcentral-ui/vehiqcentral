'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Building2,
  Bell,
  Plug,
  Save,
  Loader2,
  CheckCircle,
  User,
  Key,
  Shield,
  CreditCard,
  Plus,
  Eye,
  EyeOff,
  LogOut,
  Monitor,
  Terminal,
} from 'lucide-react';
import { Card, Input, Select, Badge, SkeletonCard, EmptyState, ProgressBar } from '@/components/ui';

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

interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: string;
  status: 'active' | 'revoked';
}

interface ActiveSession {
  id: string;
  device: string;
  icon: typeof Monitor;
  lastActive: string;
  location: string;
  current: boolean;
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

  // Notification preferences
  const [notifPrefs, setNotifPrefs] = useState({
    fraudAlerts: true,
    newReports: true,
    priceChanges: false,
    weeklySummary: false,
    newSources: true,
  });
  const [notifSaveSuccess, setNotifSaveSuccess] = useState(false);

  // API Keys
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    { id: '1', name: 'Produccion', key: 'sk-vhq-prod-...a3f8', createdAt: '2026-08-15', status: 'active' },
    { id: '2', name: 'Desarrollo', key: 'sk-vhq-dev-...9c2d', createdAt: '2026-09-01', status: 'active' },
  ]);

  // Security
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPw, setShowCurrentPw] = useState(false);
  const [showNewPw, setShowNewPw] = useState(false);
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [sessions, setSessions] = useState<ActiveSession[]>([
    { id: '1', device: 'Chrome en Windows', icon: Monitor, lastActive: '2026-10-04T10:30:00', location: 'Madrid, Espana', current: true },
    { id: '2', device: 'Safari en macOS', icon: Monitor, lastActive: '2026-10-03T18:15:00', location: 'Barcelona, Espana', current: false },
    { id: '3', device: 'API', icon: Terminal, lastActive: '2026-10-04T09:00:00', location: 'Servidor', current: false },
  ]);

  function handleGenerateApiKey() {
    const suffix = Math.random().toString(36).substring(2, 6);
    const newKey: ApiKey = {
      id: String(Date.now()),
      name: `Nueva clave ${apiKeys.length + 1}`,
      key: `sk-vhq-new-...${suffix}`,
      createdAt: new Date().toISOString().split('T')[0],
      status: 'active',
    };
    setApiKeys(prev => [newKey, ...prev]);
  }

  function handleRevokeApiKey(id: string) {
    setApiKeys(prev => prev.map(k => k.id === id ? { ...k, status: 'revoked' as const } : k));
  }

  function handleChangePassword() {
    if (!currentPassword || !newPassword || newPassword !== confirmPassword) return;
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 3000);
  }

  function handleCloseSession(id: string) {
    setSessions(prev => prev.filter(s => s.id !== id));
  }

  function handleSaveNotifications() {
    setNotifSaveSuccess(true);
    setTimeout(() => setNotifSaveSuccess(false), 3000);
  }

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
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'seguridad', label: 'Seguridad', icon: Shield },
    { id: 'facturacion', label: 'Uso y facturacion', icon: CreditCard },
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold">Configuracion</h1>
          <p className="text-brand-muted mt-1">Perfil, organizacion, notificaciones e integraciones</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <SkeletonCard />
          <SkeletonCard />
        </div>
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
        <Card>
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
            <Input label="Nombre completo" value={profileName} onChange={e => setProfileName(e.target.value)} />
            <Input label="Email" value={profile.email} disabled />
            <Input label="Telefono" value={profilePhone} onChange={e => setProfilePhone(e.target.value)} placeholder="+34 600 000 000" />
            <Select label="Idioma" value={profileLocale} onChange={e => setProfileLocale(e.target.value)} options={[{value:'es',label:'Espanol'},{value:'en',label:'English'},{value:'nl',label:'Nederlands'}]} />
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
        </Card>
      )}

      {/* Organizacion */}
      {tab === 'empresa' && (
        <Card>
          <h2 className="font-heading font-bold text-brand-indigo mb-4">Datos de la organizacion</h2>

          {!org ? (
            <EmptyState icon={<Building2 size={48} />} title="Sin organizacion" description="No tienes una organizacion asignada. Contacta con un administrador." />
          ) : (
            <>
              {!isAdmin && (
                <div className="bg-pastel-peach/30 text-amber-700 text-sm px-4 py-2 rounded-lg mb-4">
                  Solo los administradores pueden editar los datos de la organizacion.
                </div>
              )}
              <div className="grid md:grid-cols-2 gap-4">
                <Input label="Nombre" value={orgName} onChange={e => setOrgName(e.target.value)} disabled={!isAdmin} />
                <Select label="Tipo" value={orgType} onChange={e => setOrgType(e.target.value)} disabled={!isAdmin} options={Object.entries(orgTypeLabels).map(([k, v]) => ({value:k, label:v}))} />
                <Input label="CIF / NIF" value={orgTaxId} onChange={e => setOrgTaxId(e.target.value)} disabled={!isAdmin} placeholder="B-12345678" />
                <Input label="Telefono" value={orgPhone} onChange={e => setOrgPhone(e.target.value)} disabled={!isAdmin} placeholder="+34 912 345 678" />
                <div className="md:col-span-2">
                  <Input label="Direccion" value={orgAddress} onChange={e => setOrgAddress(e.target.value)} disabled={!isAdmin} placeholder="Calle, numero" />
                </div>
                <Input label="Ciudad" value={orgCity} onChange={e => setOrgCity(e.target.value)} disabled={!isAdmin} />
                <Input label="Provincia" value={orgProvince} onChange={e => setOrgProvince(e.target.value)} disabled={!isAdmin} />
                <Input label="Codigo postal" value={orgPostcode} onChange={e => setOrgPostcode(e.target.value)} disabled={!isAdmin} placeholder="28001" />
                <Input label="Sitio web" value={orgWebsite} onChange={e => setOrgWebsite(e.target.value)} disabled={!isAdmin} placeholder="www.ejemplo.es" />
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
        </Card>
      )}

      {/* Notificaciones */}
      {tab === 'notificaciones' && (
        <Card>
          <h2 className="font-heading font-bold text-brand-indigo mb-4">Preferencias de notificaciones</h2>
          <div className="space-y-4">
            {([
              { key: 'fraudAlerts' as const, label: 'Alertas de fraude', desc: 'Recibir notificaciones cuando se detecte un vehiculo con riesgo' },
              { key: 'newReports' as const, label: 'Nuevos informes', desc: 'Aviso cuando un informe este listo para descargar' },
              { key: 'priceChanges' as const, label: 'Cambios de precio en mercado', desc: 'Alertas de variaciones significativas de precio por modelo' },
              { key: 'weeklySummary' as const, label: 'Resumen semanal', desc: 'Email con resumen de actividad y tendencias cada lunes' },
              { key: 'newSources' as const, label: 'Nuevas fuentes de datos', desc: 'Notificacion cuando se integren nuevos portales de datos' },
            ]).map((n) => (
              <div key={n.key} className="flex items-center justify-between py-2 border-b border-brand-border/50 last:border-0">
                <div>
                  <p className="text-sm font-semibold text-brand-indigo">{n.label}</p>
                  <p className="text-xs text-brand-muted">{n.desc}</p>
                </div>
                <label className="relative inline-flex cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifPrefs[n.key]}
                    onChange={() => setNotifPrefs(prev => ({ ...prev, [n.key]: !prev[n.key] }))}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-pastel-blue peer-checked:bg-brand-teal rounded-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
                </label>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-3 mt-4">
            <button onClick={handleSaveNotifications} className="btn-primary flex items-center gap-2">
              <Save size={16} /> Guardar preferencias
            </button>
            {notifSaveSuccess && (
              <span className="text-sm text-green-600 flex items-center gap-1">
                <CheckCircle size={14} /> Preferencias guardadas correctamente
              </span>
            )}
          </div>
        </Card>
      )}

      {/* Integraciones */}
      {tab === 'integraciones' && (
        <Card>
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
                {int.status === 'conectado'
                  ? <Badge variant="teal">Conectado</Badge>
                  : <Badge variant="default">Proximamente</Badge>
                }
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* API Keys */}
      {tab === 'api-keys' && (
        <div className="space-y-6">
          <Card>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="font-heading font-bold text-brand-indigo mb-1">Claves de API</h2>
                <p className="text-sm text-brand-muted">
                  Usa las claves de API para autenticar tus peticiones a la API de VEHIQ. Manten tus claves seguras y no las compartas publicamente.
                </p>
              </div>
              <button onClick={handleGenerateApiKey} className="btn-primary flex items-center gap-2 shrink-0">
                <Plus size={16} /> Generar nueva API key
              </button>
            </div>

            <div className="space-y-3">
              {apiKeys.map(apiKey => (
                <div key={apiKey.id} className="flex items-center justify-between p-3 rounded-lg border border-brand-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                      <Key size={18} className="text-brand-indigo" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-brand-indigo">{apiKey.name}</p>
                      <p className="text-xs text-brand-muted font-mono">{apiKey.key}</p>
                      <p className="text-xs text-brand-muted mt-0.5">Creada el {new Date(apiKey.createdAt).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {apiKey.status === 'active'
                      ? <Badge variant="teal">Activa</Badge>
                      : <Badge variant="default">Revocada</Badge>
                    }
                    {apiKey.status === 'active' && (
                      <button
                        onClick={() => handleRevokeApiKey(apiKey.id)}
                        className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors"
                      >
                        Revocar
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Seguridad */}
      {tab === 'seguridad' && (
        <div className="space-y-6">
          {/* Cambio de contrasena */}
          <Card>
            <h2 className="font-heading font-bold text-brand-indigo mb-4">Cambiar contrasena</h2>
            <div className="grid md:grid-cols-1 gap-4 max-w-md">
              <div className="relative">
                <Input
                  label="Contrasena actual"
                  type={showCurrentPw ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={e => setCurrentPassword(e.target.value)}
                  placeholder="Introduce tu contrasena actual"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPw(!showCurrentPw)}
                  className="absolute right-3 top-[34px] text-brand-muted hover:text-brand-indigo"
                >
                  {showCurrentPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="relative">
                <Input
                  label="Nueva contrasena"
                  type={showNewPw ? 'text' : 'password'}
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  placeholder="Minimo 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowNewPw(!showNewPw)}
                  className="absolute right-3 top-[34px] text-brand-muted hover:text-brand-indigo"
                >
                  {showNewPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <Input
                label="Confirmar nueva contrasena"
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Repite la nueva contrasena"
              />
            </div>
            <div className="flex items-center gap-3 mt-4">
              <button
                onClick={handleChangePassword}
                disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                className="btn-primary flex items-center gap-2 disabled:opacity-50"
              >
                <Save size={16} /> Actualizar contrasena
              </button>
              {passwordSuccess && (
                <span className="text-sm text-green-600 flex items-center gap-1">
                  <CheckCircle size={14} /> Contrasena actualizada correctamente
                </span>
              )}
              {newPassword && confirmPassword && newPassword !== confirmPassword && (
                <span className="text-sm text-red-500">Las contrasenas no coinciden</span>
              )}
            </div>
          </Card>

          {/* Autenticacion de dos factores */}
          <Card>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-heading font-bold text-brand-indigo mb-1">Autenticacion de dos factores (2FA)</h2>
                <p className="text-sm text-brand-muted">
                  Anade una capa adicional de seguridad a tu cuenta. Cuando este activada, necesitaras un codigo de verificacion ademas de tu contrasena para iniciar sesion.
                </p>
              </div>
              <label className="relative inline-flex cursor-pointer shrink-0 ml-4">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-pastel-blue peer-checked:bg-brand-teal rounded-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full" />
              </label>
            </div>
            {twoFactorEnabled && (
              <div className="mt-3 p-3 bg-pastel-mint/30 rounded-lg text-sm text-brand-teal">
                <CheckCircle size={14} className="inline mr-1" />
                La autenticacion de dos factores esta activada.
              </div>
            )}
          </Card>

          {/* Sesiones activas */}
          <Card>
            <h2 className="font-heading font-bold text-brand-indigo mb-4">Sesiones activas</h2>
            <p className="text-sm text-brand-muted mb-4">Dispositivos y aplicaciones que han iniciado sesion en tu cuenta.</p>
            <div className="space-y-3">
              {sessions.map(session => (
                <div key={session.id} className="flex items-center justify-between p-3 rounded-lg border border-brand-border">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-pastel-blue rounded-lg flex items-center justify-center">
                      <session.icon size={18} className="text-brand-indigo" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-brand-indigo flex items-center gap-2">
                        {session.device}
                        {session.current && <span className="text-xs px-1.5 py-0.5 rounded bg-pastel-mint text-brand-teal font-medium">Sesion actual</span>}
                      </p>
                      <p className="text-xs text-brand-muted">
                        {session.location} &middot; Ultimo acceso: {new Date(session.lastActive).toLocaleDateString('es-ES', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                  {!session.current && (
                    <button
                      onClick={() => handleCloseSession(session.id)}
                      className="text-xs text-red-500 hover:text-red-700 font-medium px-2 py-1 rounded hover:bg-red-50 transition-colors flex items-center gap-1"
                    >
                      <LogOut size={14} /> Cerrar sesion
                    </button>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Uso y facturacion */}
      {tab === 'facturacion' && (
        <div className="space-y-6">
          {/* Plan actual */}
          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-heading font-bold text-brand-indigo mb-1">Plan actual</h2>
                <p className="text-sm text-brand-muted">Tu suscripcion y detalles de facturacion.</p>
              </div>
              <button className="btn-primary flex items-center gap-2">
                Cambiar plan
              </button>
            </div>
            <div className="p-4 rounded-lg border border-brand-border bg-pastel-mint/10">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-teal rounded-lg flex items-center justify-center">
                  <CreditCard size={24} className="text-white" />
                </div>
                <div>
                  <p className="font-heading font-bold text-brand-indigo text-lg">
                    Plan {planLabels[profile?.plan ?? 'FREE'] ?? profile?.plan}
                  </p>
                  <p className="text-sm text-brand-muted">Proxima facturacion: 1 de noviembre de 2026</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Uso del mes */}
          <Card>
            <h2 className="font-heading font-bold text-brand-indigo mb-4">Uso este mes</h2>
            <div className="space-y-5">
              <ProgressBar
                label="Llamadas a la API"
                value={2847}
                max={5000}
                showValue
                size="md"
                color="teal"
              />
              <ProgressBar
                label="Informes generados"
                value={34}
                max={100}
                showValue
                size="md"
                color="indigo"
              />
              <ProgressBar
                label="Vehiculos rastreados"
                value={156}
                max={500}
                showValue
                size="md"
                color="gold"
              />
            </div>
            <p className="text-xs text-brand-muted mt-4">El ciclo de facturacion se reinicia el 1 de cada mes.</p>
          </Card>
        </div>
      )}
    </div>
  );
}
