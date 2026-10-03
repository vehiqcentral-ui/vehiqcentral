import { Metadata } from 'next';
import { Target, Eye, Heart, Zap, Globe, Users, ShieldCheck, TrendingUp } from 'lucide-react';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'Sobre Nosotros | VEHIQ',
  description: 'VEHIQ es la plataforma de inteligencia automotriz lider en Espana. Conoce nuestra mision, vision, equipo y valores.',
};

const values = [
  { icon: ShieldCheck, title: 'Transparencia', desc: 'Datos fiables y procesos claros para un sector que necesita confianza.' },
  { icon: Zap, title: 'Innovacion', desc: 'Tecnologia de vanguardia aplicada a los retos reales del sector automotriz.' },
  { icon: Heart, title: 'Compromiso', desc: 'Dedicacion absoluta al exito de cada profesional que confie en nuestra plataforma.' },
  { icon: Globe, title: 'Enfoque espanol', desc: 'Disenado especificamente para el mercado, la normativa y los procesos de Espana.' },
];

const team = [
  { name: 'Carlos Martinez', role: 'CEO y Cofundador', desc: '15 anos de experiencia en el sector automotriz espanol.' },
  { name: 'Laura Sanchez', role: 'CTO y Cofundadora', desc: 'Experta en plataformas SaaS y datos vehiculares.' },
  { name: 'Miguel Torres', role: 'Director de Producto', desc: 'Anteriormente en startups de movilidad y fintech.' },
  { name: 'Ana Garcia', role: 'Directora Comercial', desc: 'Especialista en ventas B2B en el sector del automovil.' },
];

const stats = [
  { value: '500+', label: 'Profesionales activos' },
  { value: '1M+', label: 'Vehiculos procesados' },
  { value: '50+', label: 'Integraciones activas' },
  { value: '2021', label: 'Ano de fundacion' },
];

export default function AboutPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Sobre VEHIQ
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Somos la plataforma de inteligencia automotriz disenada para profesionales del motor en Espana. Nuestra mision es digitalizar y simplificar cada proceso del sector.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-12 md:grid-cols-2">
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-pastel-mint">
              <Target className="w-6 h-6 text-brand-teal" />
            </div>
            <h2 className="mt-4 font-heading font-extrabold text-2xl text-brand-navy">Nuestra Mision</h2>
            <p className="mt-3 text-brand-muted leading-relaxed">
              Empoderar a los profesionales del sector automotriz espanol con tecnologia inteligente que simplifique sus operaciones, mejore sus decisiones y potencie su crecimiento.
            </p>
          </div>
          <div>
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-pastel-blue">
              <Eye className="w-6 h-6 text-brand-indigo" />
            </div>
            <h2 className="mt-4 font-heading font-extrabold text-2xl text-brand-navy">Nuestra Vision</h2>
            <p className="mt-3 text-brand-muted leading-relaxed">
              Ser la plataforma de referencia del ecosistema automotriz en Espana, conectando a todos los actores del sector en un unico entorno digital colaborativo e inteligente.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-brand-alt-bg py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Nuestros valores</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-card bg-white p-6 border border-brand-border">
                <div className="w-12 h-12 rounded-xl bg-pastel-purple flex items-center justify-center">
                  <v.icon className="w-6 h-6 text-brand-indigo" />
                </div>
                <h3 className="mt-4 font-heading font-bold text-lg text-brand-navy">{v.title}</h3>
                <p className="mt-2 text-sm text-brand-muted leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy">Nuestro equipo</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t) => (
              <div key={t.name} className="rounded-card bg-brand-alt-bg p-6 border border-brand-border text-center">
                <div className="mx-auto w-20 h-20 rounded-full bg-pastel-blue flex items-center justify-center">
                  <Users className="w-8 h-8 text-brand-indigo" />
                </div>
                <h3 className="mt-4 font-heading font-bold text-lg text-brand-navy">{t.name}</h3>
                <p className="text-sm text-brand-teal font-semibold">{t.role}</p>
                <p className="mt-2 text-sm text-brand-muted">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-alt-bg py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-extrabold text-3xl text-brand-navy text-center">VEHIQ en numeros</h2>
          <div className="mt-10 grid gap-6 grid-cols-2 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="text-center">
                <span className="font-heading font-extrabold text-4xl text-brand-teal">{s.value}</span>
                <p className="mt-2 text-sm text-brand-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading="Unete al futuro del motor en Espana"
        subheading="Descubre como VEHIQ puede transformar tu negocio automotriz."
        primaryLabel="Solicitar demo"
        primaryHref="/contact"
        secondaryLabel="Ver soluciones"
        secondaryHref="/solutions"
      />
    </>
  );
}
