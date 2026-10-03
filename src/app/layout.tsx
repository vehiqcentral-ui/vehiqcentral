import type { Metadata } from 'next';
import { Nunito, Fira_Sans } from 'next/font/google';
import { AuthProvider } from '@/components/providers/AuthProvider';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
  weight: ['400', '600', '700', '800'],
});

const firaSans = Fira_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'VEHIQ Central — Tu centro de datos automotriz en España',
  description:
    'Historial de vehículos, valoraciones con IA, detección de fraude y analítica de mercado para el sector automotriz español.',
  keywords: ['automotive', 'vehicle history', 'valuation', 'Spain', 'DGT', 'ITV'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={`${nunito.variable} ${firaSans.variable}`}>
      <body className="font-body text-brand-body bg-white antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
