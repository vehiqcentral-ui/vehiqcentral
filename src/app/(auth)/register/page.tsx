'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { User, Mail, Lock, Phone, Building2, Eye, EyeOff, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function RegisterPage() {
  const router = useRouter();
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: '',
    phone: '',
  });

  const update = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const canSubmit = formData.name && formData.email && formData.password.length >= 8;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.error?.code === 'EMAIL_EXISTS') {
          setError('Este email ya está registrado. ¿Quieres iniciar sesión?');
        } else if (data.error?.code === 'VALIDATION_ERROR') {
          const fields = data.error.details?.fields as string[] | undefined;
          setError(fields?.join(', ') || 'Datos de registro no válidos');
        } else {
          setError('Error al crear la cuenta. Inténtalo de nuevo.');
        }
        setLoading(false);
        return;
      }

      // Auto-login after registration
      const signInResult = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (signInResult?.error) {
        // Registration succeeded but login failed — show success page
        setSubmitted(true);
        setLoading(false);
        return;
      }

      router.push('/dashboard');
      router.refresh();
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.');
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-card border border-brand-border shadow-sm p-8 text-center">
          <div className="w-14 h-14 bg-pastel-mint rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-brand-teal" />
          </div>
          <h1 className="text-2xl font-heading font-extrabold text-brand-indigo mb-2">
            Cuenta creada
          </h1>
          <p className="text-brand-muted font-body mb-1">
            Tu cuenta ha sido creada correctamente.
          </p>
          <p className="text-sm text-brand-muted mb-6">
            Inicia sesión con <strong className="text-brand-navy">{formData.email}</strong>.
          </p>
          <Link
            href="/login"
            className="text-brand-teal font-heading font-bold text-sm hover:underline"
          >
            Iniciar sesión
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-card border border-brand-border shadow-sm p-8">
        <h1 className="text-2xl font-heading font-extrabold text-brand-indigo text-center mb-1">
          Crear cuenta
        </h1>
        <p className="text-sm text-brand-muted text-center font-body mb-8">
          Regístrate para acceder a VEHIQ Central
        </p>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-body font-medium text-brand-navy mb-1.5">
              Nombre completo *
            </label>
            <div className="relative">
              <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
              <input
                className="input pl-10"
                placeholder="Juan García"
                value={formData.name}
                onChange={(e) => update('name', e.target.value)}
                required
                disabled={loading}
                autoComplete="name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-body font-medium text-brand-navy mb-1.5">
              Email *
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
              <input
                type="email"
                className="input pl-10"
                placeholder="juan@empresa.com"
                value={formData.email}
                onChange={(e) => update('email', e.target.value)}
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-body font-medium text-brand-navy mb-1.5">
              Contraseña *
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="input pl-10 pr-10"
                placeholder="Mín. 8 caracteres, 1 mayúscula, 1 número"
                value={formData.password}
                onChange={(e) => update('password', e.target.value)}
                required
                disabled={loading}
                autoComplete="new-password"
                minLength={8}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-brand-muted hover:text-brand-navy transition-colors"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Company */}
          <div>
            <label className="block text-sm font-body font-medium text-brand-navy mb-1.5">
              Empresa
            </label>
            <div className="relative">
              <Building2 className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
              <input
                className="input pl-10"
                placeholder="AutoMax S.L."
                value={formData.company}
                onChange={(e) => update('company', e.target.value)}
                disabled={loading}
                autoComplete="organization"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-body font-medium text-brand-navy mb-1.5">
              Teléfono
            </label>
            <div className="relative">
              <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
              <input
                type="tel"
                className="input pl-10"
                placeholder="+34 600 000 000"
                value={formData.phone}
                onChange={(e) => update('phone', e.target.value)}
                disabled={loading}
                autoComplete="tel"
              />
            </div>
          </div>

          <p className="text-xs text-brand-muted font-body leading-relaxed">
            Al registrarte, aceptas nuestros{' '}
            <Link href="/terms" className="underline hover:text-brand-indigo">términos de servicio</Link>{' '}
            y nuestra{' '}
            <Link href="/privacy" className="underline hover:text-brand-indigo">política de privacidad</Link>.
          </p>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!canSubmit || loading}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Creando cuenta...
              </span>
            ) : (
              'Crear cuenta'
            )}
          </Button>
        </form>
      </div>

      <p className="text-sm text-brand-muted font-body text-center mt-6">
        ¿Ya tienes cuenta?{' '}
        <Link href="/login" className="text-brand-teal font-semibold hover:underline">
          Iniciar sesión
        </Link>
      </p>
    </div>
  );
}
