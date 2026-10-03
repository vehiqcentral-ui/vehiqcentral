'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
  const errorParam = searchParams.get('error');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    errorParam === 'CredentialsSignin'
      ? 'Email o contraseña incorrectos'
      : errorParam
        ? 'Ha ocurrido un error. Inténtalo de nuevo.'
        : ''
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Email o contraseña incorrectos');
        setLoading(false);
        return;
      }

      router.push(callbackUrl);
      router.refresh();
    } catch {
      setError('Error de conexión. Inténtalo de nuevo.');
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-card border border-brand-border shadow-sm p-8">
        <h1 className="text-2xl font-heading font-extrabold text-brand-indigo text-center mb-1">
          Accede a tu cuenta
        </h1>
        <p className="text-sm text-brand-muted text-center font-body mb-8">
          Introduce tus credenciales para continuar
        </p>

        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm rounded-lg px-4 py-3 mb-5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-body font-medium text-brand-navy mb-1.5">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
              <input
                type="email"
                className="input pl-10"
                placeholder="tu@empresa.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
                autoComplete="email"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-body font-medium text-brand-navy mb-1.5">
              Contraseña
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-muted pointer-events-none" />
              <input
                type={showPassword ? 'text' : 'password'}
                className="input pl-10 pr-10"
                placeholder="Tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
                autoComplete="current-password"
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

          {/* Remember / Forgot */}
          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-brand-border text-brand-teal focus:ring-brand-teal/30"
              />
              <span className="text-sm text-brand-body font-body">Recordar sesión</span>
            </label>
            <Link
              href="/forgot-password"
              className="text-sm text-brand-teal font-body hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Submit */}
          <Button variant="primary" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Iniciando sesión...
              </span>
            ) : (
              'Iniciar sesión'
            )}
          </Button>
        </form>

        {/* Demo credentials hint */}
        <div className="mt-5 p-3 bg-brand-alt-bg rounded-lg border border-brand-border">
          <p className="text-xs text-brand-muted font-body text-center">
            <strong className="text-brand-navy">Demo:</strong> admin@vehiqcentral.es / Vehiq2024!
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-brand-border" />
          <span className="text-xs text-brand-muted font-body">o continúa con</span>
          <div className="flex-1 h-px bg-brand-border" />
        </div>

        {/* Social login */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-button border-2 border-brand-border text-sm font-heading font-bold text-brand-navy hover:bg-brand-alt-bg transition-colors"
            disabled={loading}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
            </svg>
            Google
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-button border-2 border-brand-border text-sm font-heading font-bold text-brand-navy hover:bg-brand-alt-bg transition-colors"
            disabled={loading}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
              <path d="M11.4 24H0V12.6L4.8 7.8H11.4V0H24V11.4H16.2L11.4 16.2V24Z" fill="#F25022" />
              <path d="M11.4 0H24V11.4H11.4V0Z" fill="#00A4EF" />
              <path d="M0 12.6H11.4V24H0V12.6Z" fill="#7FBA00" />
              <path d="M11.4 12.6H24V24H11.4V12.6Z" fill="#FFB900" />
            </svg>
            Microsoft
          </button>
        </div>
      </div>

      <p className="text-sm text-brand-muted font-body text-center mt-6">
        ¿No tienes cuenta?{' '}
        <Link href="/pricing-request" className="text-brand-teal font-semibold hover:underline">
          Solicitar acceso
        </Link>
      </p>
    </div>
  );
}
