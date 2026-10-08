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
  title: 'VehiqCentral — Alles-in-één platform voor automotive professionals',
  description:
    'Voertuiggeschiedenis, AI-taxaties, fraudedetectie en marktanalyse voor de Nederlandse automotive sector.',
  keywords: ['automotive', 'voertuighistorie', 'taxatie', 'Nederland', 'RDW', 'APK'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${nunito.variable} ${firaSans.variable}`}>
      <body className="font-body text-brand-body bg-white antialiased">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
