import Link from 'next/link';
import type { Metadata } from 'next';
import {
  Database,
  FileSearch,
  Brain,
  Shield,
  LineChart,
  Code,
  BarChart3,
  Zap,
  Lock,
  Globe,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { SolutionCard } from '@/components/public/SolutionCard';
import { AudienceCard } from '@/components/public/AudienceCard';
import { TestimonialCard } from '@/components/public/TestimonialCard';
import { StatBlock } from '@/components/public/StatBlock';
import { CTASection } from '@/components/public/CTASection';

export const metadata: Metadata = {
  title: 'VEHIQ — Inteligencia Automotriz para Espana',
  description:
    'La plataforma digital central para profesionales del sector automotriz en Espana. Historiales, valoraciones IA, deteccion de fraude y analitica de mercado.',
};

export default function HomePage() {
  return (
    <>
      {/* ================================================================
          HERO SECTION
          ================================================================ */}
      <section className="relative overflow-hidden bg-brand-indigo">
        {/* Geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.04]" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="hero-grid"
                x="0"
                y="0"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M60 0L0 60M45 0L0 45M60 15L15 60M30 0L0 30M60 30L30 60M15 0L0 15M60 45L45 60"
                  stroke="white"
                  strokeWidth="1"
                  fill="none"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#hero-grid)" />
          </svg>
        </div>

        {/* Decorative blurs */}
        <div
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand-teal/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-brand-gold/5 blur-3xl"
          aria-hidden="true"
        />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
          <div className="max-w-3xl">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl lg:text-6xl text-white leading-[1.1] tracking-tight">
              La inteligencia automotriz que{' '}
              <span className="text-brand-teal">impulsa tu negocio</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/70 leading-relaxed max-w-2xl">
              La plataforma digital central para profesionales del sector automotriz en
              Espana. Historiales completos, valoraciones con IA, deteccion de fraude y
              analitica de mercado en una sola herramienta.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/pricing-request"
                className="inline-flex items-center justify-center gap-2 rounded-button bg-brand-teal px-8 py-3.5 text-lg font-heading font-bold text-white transition-all duration-200 hover:bg-brand-teal/90 focus:outline-none focus:ring-2 focus:ring-brand-teal/40 focus:ring-offset-2 focus:ring-offset-brand-indigo"
              >
                Solicitar acceso
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 rounded-button border-2 border-white px-8 py-3.5 text-lg font-heading font-bold text-white transition-all duration-200 hover:bg-white hover:text-brand-indigo focus:outline-none focus:ring-2 focus:ring-white/40 focus:ring-offset-2 focus:ring-offset-brand-indigo"
              >
                Ver soluciones
              </Link>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 sm:mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 border-t border-white/10 pt-10">
            <div>
              <p className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-teal">
                500+
              </p>
              <p className="mt-1 text-sm text-white/60">Empresas confian en VEHIQ</p>
            </div>
            <div>
              <p className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-teal">
                2M+
              </p>
              <p className="mt-1 text-sm text-white/60">Vehiculos consultados al mes</p>
            </div>
            <div>
              <p className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-teal">
                99.9%
              </p>
              <p className="mt-1 text-sm text-white/60">Disponibilidad de la plataforma</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SOLUTIONS GRID
          ================================================================ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold tracking-widest uppercase text-brand-teal">
              Soluciones
            </p>
            <h2 className="mt-3 font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy leading-tight">
              Todo lo que necesitas para operar con confianza
            </h2>
            <p className="mt-4 text-brand-muted leading-relaxed">
              Desde la consulta de un historial hasta la valoracion con inteligencia
              artificial, VEHIQ cubre cada paso de tu operacion.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <SolutionCard
              icon={Database}
              title="Datos de vehiculos"
              description="Accede a datos completos de la DGT, ITV y registros oficiales. Matricula, bastidor, titularidad, cargas y mas en segundos."
              href="/solutions/vehicle-data"
              accent="blue"
            />
            <SolutionCard
              icon={FileSearch}
              title="Informes vehiculares"
              description="Genera informes detallados de historial, siniestros, kilometraje y estado legal para tomar decisiones informadas."
              href="/solutions/reports"
              accent="purple"
            />
            <SolutionCard
              icon={Brain}
              title="Valoracion IA"
              description="Obtén valoraciones precisas basadas en inteligencia artificial, datos de mercado en tiempo real y comparables verificados."
              href="/solutions/valuation"
              accent="mint"
            />
            <SolutionCard
              icon={Shield}
              title="Deteccion de fraude"
              description="Identifica manipulaciones de kilometraje, vehiculos robados, importaciones irregulares y documentacion falsificada."
              href="/solutions/fraud"
              accent="peach"
            />
            <SolutionCard
              icon={LineChart}
              title="Analitica de mercado"
              description="Datos de precios, tendencias, demanda y depreciacion actualizados diariamente para tomar decisiones basadas en datos."
              href="/solutions/market"
              accent="blue"
            />
            <SolutionCard
              icon={Code}
              title="API y datos"
              description="Integra VEHIQ en tus sistemas con nuestra API REST. Documentacion completa, SDKs y soporte tecnico dedicado."
              href="/solutions/api"
              accent="purple"
            />
          </div>
        </div>
      </section>

      {/* ================================================================
          PLATFORM PREVIEW
          ================================================================ */}
      <section className="py-20 sm:py-28 bg-brand-alt-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-semibold tracking-widest uppercase text-brand-teal">
                Plataforma
              </p>
              <h2 className="mt-3 font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy leading-tight">
                Una plataforma, todas las respuestas
              </h2>
              <p className="mt-4 text-brand-muted leading-relaxed">
                Centraliza toda la inteligencia automotriz que necesitas en un unico panel.
                Sin cambiar entre herramientas, sin datos dispersos.
              </p>

              <ul className="mt-8 space-y-5">
                {[
                  {
                    icon: Zap,
                    title: 'Consultas instantaneas',
                    desc: 'Resultados en menos de 2 segundos para cualquier matricula o bastidor espanol.',
                  },
                  {
                    icon: BarChart3,
                    title: 'Analitica de mercado',
                    desc: 'Datos de precios, tendencias y demanda actualizados diariamente.',
                  },
                  {
                    icon: Lock,
                    title: 'Seguridad y cumplimiento',
                    desc: 'Cifrado de extremo a extremo, conforme con RGPD y normativa espanola.',
                  },
                  {
                    icon: Globe,
                    title: 'Cobertura europea',
                    desc: 'Conectado a bases de datos de mas de 15 paises europeos para importaciones.',
                  },
                ].map((feature) => (
                  <li key={feature.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-button bg-pastel-mint flex items-center justify-center text-brand-teal">
                      <feature.icon size={20} />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-brand-navy">
                        {feature.title}
                      </p>
                      <p className="mt-1 text-sm text-brand-muted leading-relaxed">
                        {feature.desc}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mock dashboard preview */}
            <div className="relative">
              <div className="rounded-card border border-brand-border bg-white shadow-xl overflow-hidden">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 px-4 py-3 bg-brand-alt-bg border-b border-brand-border">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-amber-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 ml-2 h-6 rounded bg-white border border-brand-border flex items-center px-3">
                    <span className="text-xs text-brand-muted">app.vehiq.es/dashboard</span>
                  </div>
                </div>

                {/* Dashboard mockup content */}
                <div className="p-6 space-y-4">
                  {/* Search bar */}
                  <div className="h-11 rounded-button bg-brand-alt-bg border border-brand-border flex items-center px-4">
                    <span className="text-sm text-brand-muted">
                      Buscar por matricula, bastidor o referencia...
                    </span>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Consultas hoy', val: '247' },
                      { label: 'Alertas activas', val: '12' },
                      { label: 'Vehiculos', val: '1.834' },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="bg-brand-alt-bg rounded-button p-3 text-center"
                      >
                        <p className="font-heading font-bold text-xl text-brand-indigo">
                          {s.val}
                        </p>
                        <p className="text-xs text-brand-muted mt-0.5">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Table mock rows */}
                  <div className="space-y-2">
                    {[
                      {
                        plate: '4523 BKT',
                        model: 'BMW Serie 3',
                        status: 'Verificado',
                        color: 'text-green-600 bg-green-50',
                      },
                      {
                        plate: '7891 GHJ',
                        model: 'Audi A4',
                        status: 'Pendiente',
                        color: 'text-amber-600 bg-amber-50',
                      },
                      {
                        plate: '1256 MNP',
                        model: 'Mercedes Clase C',
                        status: 'Alerta',
                        color: 'text-red-600 bg-red-50',
                      },
                    ].map((row) => (
                      <div
                        key={row.plate}
                        className="flex items-center justify-between py-2.5 px-3 rounded bg-white border border-brand-border text-sm"
                      >
                        <span className="font-mono font-semibold text-brand-navy">
                          {row.plate}
                        </span>
                        <span className="text-brand-muted hidden sm:inline">
                          {row.model}
                        </span>
                        <span
                          className={`text-xs font-semibold px-2 py-0.5 rounded-full ${row.color}`}
                        >
                          {row.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -left-4 bg-brand-teal text-white rounded-card shadow-lg px-4 py-3 flex items-center gap-2">
                <CheckCircle2 size={20} />
                <span className="text-sm font-heading font-bold">
                  Datos actualizados en tiempo real
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          FOR WHOM SECTION
          ================================================================ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold tracking-widest uppercase text-brand-teal">
              Para quien
            </p>
            <h2 className="mt-3 font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy leading-tight">
              Disenado para cada actor del sector
            </h2>
            <p className="mt-4 text-brand-muted leading-relaxed">
              Sea cual sea tu rol en la cadena de valor automotriz, VEHIQ tiene las
              herramientas que necesitas.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <AudienceCard
              title="Concesionarios"
              description="Verifica cada vehiculo con datos fiables antes de comprarlo o venderlo."
              benefits={[
                'Historial completo y verificado',
                'Valoracion de mercado con IA',
                'Deteccion de fraude automatica',
                'Informes profesionales para clientes',
              ]}
              href="/for-dealers"
            />
            <AudienceCard
              title="Importadores y exportadores"
              description="Verifica el historial de vehiculos europeos y detecta fraude transfronterizo."
              benefits={[
                'Historial vehicular de 30+ paises',
                'Deteccion de kilometraje manipulado',
                'Valoracion de mercado espanol',
                'Decodificacion VIN internacional',
              ]}
              href="/for-importers"
            />
            <AudienceCard
              title="Flotas y alquiler"
              description="Datos de mercado y valoraciones precisas para gestionar el ciclo de vida de tu flota."
              benefits={[
                'Valor residual actualizado por vehiculo',
                'Verificacion de nuevas adquisiciones',
                'Analitica de depreciacion y rotacion',
                'Acceso via plataforma y API',
              ]}
              href="/for-fleet"
            />
            <AudienceCard
              title="Talleres y peritos"
              description="Accede al historial tecnico y verificaciones de kilometraje de cualquier vehiculo."
              benefits={[
                'Ficha tecnica y datos de ITV',
                'Verificacion de kilometraje',
                'Deteccion de siniestros previos',
                'Integracion via API',
              ]}
              href="/for-garages"
            />
          </div>
        </div>
      </section>

      {/* ================================================================
          NUMBERS SECTION
          ================================================================ */}
      <section className="py-20 sm:py-24 bg-brand-alt-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy leading-tight">
              Los numeros que nos respaldan
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <StatBlock value="500+" label="Empresas activas en la plataforma" />
            <StatBlock value="2M+" label="Consultas de vehiculos al mes" />
            <StatBlock value="35M" label="Vehiculos en nuestra base de datos" />
            <StatBlock value="<2s" label="Tiempo medio de respuesta" />
          </div>
        </div>
      </section>

      {/* ================================================================
          AI SECTION
          ================================================================ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-card bg-gradient-to-br from-brand-navy to-brand-indigo p-8 sm:p-12 lg:p-16">
            {/* Decorative */}
            <div
              className="absolute top-0 right-0 w-80 h-80 rounded-full bg-brand-teal/10 blur-3xl"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-brand-gold/10 blur-3xl"
              aria-hidden="true"
            />

            <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 bg-brand-teal/20 text-brand-teal px-3 py-1 rounded-full text-sm font-semibold">
                  <Sparkles size={14} />
                  Inteligencia artificial
                </div>

                <h2 className="mt-6 font-heading font-extrabold text-3xl sm:text-4xl text-white leading-tight">
                  VEHIQ AI — Tu asistente automotriz inteligente
                </h2>

                <p className="mt-5 text-white/70 leading-relaxed">
                  Pregunta en lenguaje natural sobre cualquier vehiculo, mercado o
                  tendencia. Nuestro asistente con IA analiza millones de datos para darte
                  respuestas precisas y accionables al instante.
                </p>

                <ul className="mt-8 space-y-3">
                  {[
                    'Valoraciones conversacionales: "Cual es el precio justo para este BMW 320d de 2019?"',
                    'Analisis de mercado: "Como ha evolucionado el precio del Seat Leon en los ultimos 6 meses?"',
                    'Deteccion inteligente: "Tiene este vehiculo algun indicador sospechoso?"',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm text-white/80"
                    >
                      <CheckCircle2
                        size={16}
                        className="flex-shrink-0 mt-0.5 text-brand-teal"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-10">
                  <Link
                    href="/solutions/ai"
                    className="inline-flex items-center justify-center gap-2 rounded-button bg-brand-teal px-6 py-3 text-base font-heading font-bold text-white transition-all duration-200 hover:bg-brand-teal/90"
                  >
                    Explorar VEHIQ AI
                  </Link>
                </div>
              </div>

              {/* AI chat mockup */}
              <div className="bg-white/10 backdrop-blur-sm rounded-card border border-white/10 p-5 space-y-4">
                {/* User message */}
                <div className="flex justify-end">
                  <div className="bg-brand-teal/20 text-white text-sm rounded-card rounded-br-sm px-4 py-2.5 max-w-[80%]">
                    Cual es el valor de mercado de un Volkswagen Golf 1.5 TSI de 2021 con
                    45.000 km?
                  </div>
                </div>

                {/* AI response */}
                <div className="flex justify-start">
                  <div className="bg-white/10 text-white text-sm rounded-card rounded-bl-sm px-4 py-3 max-w-[85%] space-y-2">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={14} className="text-brand-gold" />
                      <span className="font-heading font-bold text-xs text-brand-gold">
                        VEHIQ AI
                      </span>
                    </div>
                    <p>
                      Basandome en 1.247 anuncios activos y 382 ventas recientes, el{' '}
                      <strong>Volkswagen Golf 1.5 TSI (2021, 45.000 km)</strong> tiene un
                      valor estimado de:
                    </p>
                    <div className="bg-white/10 rounded-button p-3 text-center">
                      <p className="font-heading font-extrabold text-2xl text-brand-teal">
                        19.400 - 21.200 EUR
                      </p>
                      <p className="text-xs text-white/60 mt-1">
                        Precio medio: 20.150 EUR | Confianza: 94%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Typing indicator */}
                <div className="flex justify-start">
                  <div className="bg-white/10 rounded-card rounded-bl-sm px-4 py-3 flex gap-1">
                    <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse" />
                    <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse [animation-delay:0.2s]" />
                    <span className="w-2 h-2 rounded-full bg-white/40 animate-pulse [animation-delay:0.4s]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          TESTIMONIALS
          ================================================================ */}
      <section className="py-20 sm:py-28 bg-brand-alt-bg">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <p className="text-sm font-semibold tracking-widest uppercase text-brand-teal">
              Testimonios
            </p>
            <h2 className="mt-3 font-heading font-extrabold text-3xl sm:text-4xl text-brand-navy leading-tight">
              Lo que dicen nuestros clientes
            </h2>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestimonialCard
              quote="Desde que usamos VEHIQ hemos reducido un 40% los casos de vehiculos con kilometraje manipulado. La plataforma nos ha ahorrado miles de euros en compras fallidas."
              name="Carlos Mendez"
              role="Director de compras"
              company="AutoSur Concesionarios"
            />
            <TestimonialCard
              quote="La valoracion con IA es increiblemente precisa. Antes tardabamos horas en investigar precios de mercado, ahora tenemos una estimacion fiable en segundos."
              name="Laura Fernandez"
              role="Gerente de operaciones"
              company="Importauto Barcelona"
            />
            <TestimonialCard
              quote="La API de VEHIQ se integro con nuestro sistema de gestion en menos de una semana. El soporte tecnico es excelente y la documentacion muy completa."
              name="Miguel Angel Torres"
              role="CTO"
              company="FleetControl Espana"
            />
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA SECTION
          ================================================================ */}
      <CTASection
        heading="Transforma tu negocio automotriz"
        subheading="Unete a mas de 500 empresas que ya confian en VEHIQ para tomar decisiones mas inteligentes, mas rapidas y mas seguras."
        primaryLabel="Solicitar acceso"
        primaryHref="/pricing-request"
        secondaryLabel="Ver soluciones"
        secondaryHref="/solutions"
      />
    </>
  );
}
