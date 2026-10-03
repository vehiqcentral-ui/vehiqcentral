'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="w-full max-w-md">
        <div className="bg-white rounded-card border border-brand-border shadow-sm p-8 text-center">
          <div className="w-14 h-14 bg-pastel-mint rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle2 className="w-7 h-7 text-brand-teal" />
          </div>
          <h1 className="text-2xl font-heading font-extrabold text-brand-indigo mb-2">
            Revisa tu email
          </h1>
          <p className="text-brand-muted font-body mb-1">
            Hemos enviado un enlace de recuperacion a:
          </p>
          <p className="text-sm font-semibold text-brand-navy mb-6">{email}</p>
          <p className="text-xs text-brand-muted font-body mb-6">
            Si no recibes el email en unos minutos, revisa tu carpeta de spam o{' '}
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              className="text-brand-teal hover:underline"
            >
              intentalo de nuevo
            </button>
            .
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-brand-teal font-heading font-bold text-sm hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a iniciar sesion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-card border border-brand-border shadow-sm p-8">
        <h1 className="text-2xl font-heading font-extrabold text-brand-indigo text-center mb-1">
          Recuperar contrasena
        </h1>
        <p className="text-sm text-brand-muted text-center font-body mb-8">
          Introduce tu email y te enviaremos un enlace para restablecer tu contrasena.
        </p>

        <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
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
              />
            </div>
          </div>

          <Button
            variant="primary"
            size="lg"
            className="w-full"
            disabled={!email}
            onClick={() => setSubmitted(true)}
          >
            Enviar enlace de recuperacion
          </Button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-brand-muted hover:text-brand-indigo font-body text-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver a iniciar sesion
          </Link>
        </div>
      </div>
    </div>
  );
}
