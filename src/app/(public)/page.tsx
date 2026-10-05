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
  CheckCircle2,
  ArrowRight,
  Car,
  Truck,
  Warehouse,
  Wrench,
  ShieldCheck,
  Building2,
  Users,
  TrendingUp,
  Clock,
  Star,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'VehiqCentral — Alles-in-één platform voor automotive professionals',
  description:
    'Het digitale automotive platform voor dealers, importeurs, leasebedrijven en garages in Nederland. Voertuigdata, taxaties, fraudedetectie en marktanalyse in één tool.',
};

/* ------------------------------------------------------------------ */
/*  FOR WHO cards data                                                 */
/* ------------------------------------------------------------------ */

const audiences = [
  {
    icon: Car,
    title: 'Starters',
    description: 'Begin slim met betrouwbare voertuigdata en betaalbare tarieven die meegroeien met uw bedrijf.',
    href: '/for-startups',
    color: 'bg-blue-50 text-[#0057B8]',
  },
  {
    icon: Building2,
    title: 'Dealers',
    description: 'Verifieer elk voertuig met betrouwbare data vóór aankoop of verkoop. Minder risico, meer winst.',
    href: '/for-dealers',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    icon: Truck,
    title: 'Importeurs & exporteurs',
    description: 'Controleer voertuighistorie uit heel Europa en detecteer grensoverschrijdende fraude direct.',
    href: '/for-importers',
    color: 'bg-green-50 text-green-600',
  },
  {
    icon: Warehouse,
    title: 'Lease & fleet',
    description: 'Restwaarden, aanschafverificatie en depreciatie-analyses voor uw volledige wagenparkbeheer.',
    href: '/for-fleet',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    icon: Wrench,
    title: 'Garages & taxateurs',
    description: 'Technische gegevens, APK-historie en kilometerstandverificatie voor ieder voertuig.',
    href: '/for-garages',
    color: 'bg-red-50 text-red-600',
  },
  {
    icon: ShieldCheck,
    title: 'Verzekeraars',
    description: 'Fraudedetectie en nauwkeurige taxaties voor schadeverwerkingen en acceptatie.',
    href: '/for-insurers',
    color: 'bg-teal-50 text-teal-600',
  },
  {
    icon: Users,
    title: 'Dealer holdings',
    description: 'Schaalbare oplossingen voor grotere organisaties met meerdere vestigingen en merken.',
    href: '/for-dealers',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    icon: Code,
    title: 'Developers & API',
    description: 'Integreer voertuigdata naadloos via onze REST API in uw eigen systemen en apps.',
    href: '/solutions/api',
    color: 'bg-gray-100 text-gray-600',
  },
];

/* ------------------------------------------------------------------ */
/*  Solutions data                                                     */
/* ------------------------------------------------------------------ */

const solutions = [
  {
    icon: Database,
    title: 'Voertuigdata',
    description: 'Direct toegang tot RDW-, APK- en NAP-data. Kenteken, VIN, eigenaren, lasten en meer in seconden.',
    href: '/solutions/vehicle-data',
  },
  {
    icon: Brain,
    title: 'AI-taxatie',
    description: 'Nauwkeurige marktwaarden op basis van AI, realtime marktdata en duizenden vergelijkbare voertuigen.',
    href: '/solutions/valuation',
  },
  {
    icon: Shield,
    title: 'Fraudedetectie',
    description: 'Detecteer gemanipuleerde kilometerstanden, gestolen voertuigen, verborgen schades en valse documenten.',
    href: '/solutions/fraud',
  },
  {
    icon: FileSearch,
    title: 'Voertuigrapporten',
    description: 'Professionele historierapporten met APK, schadehistorie, kilometerstanden en eigenaarstransities.',
    href: '/solutions/reports',
  },
  {
    icon: LineChart,
    title: 'Marktanalyse',
    description: 'Dagelijks bijgewerkte prijsdata, vraagontwikkeling en depreciatie per merk, model en segment.',
    href: '/solutions/market',
  },
  {
    icon: Code,
    title: 'API & Integraties',
    description: 'Verbind VehiqCentral met uw DMS, website of app via onze REST API met volledige documentatie.',
    href: '/solutions/api',
  },
];

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default function HomePage() {
  return (
    <>
      {/* ================================================================
          HERO SECTION — VWE style: blue, clean, professional
          ================================================================ */}
      <section className="bg-[#0057B8] relative overflow-hidden">
        {/* Subtle diagonal pattern */}
        <div className="absolute inset-0 opacity-[0.06]" aria-hidden="true">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="diag" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M0 40L40 0M-5 5L5 -5M35 45L45 35" stroke="white" strokeWidth="1" fill="none" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#diag)" />
          </svg>
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/15 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6 border border-white/20">
              <Star size={12} className="text-yellow-300" />
              Het #1 automotive dataplatform van Nederland
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-extrabold text-white leading-[1.08] tracking-tight">
              Alles-in-één platform{' '}
              <span className="text-yellow-300">voor autobedrijven</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
              VehiqCentral geeft dealers, importeurs, leasebedrijven en garages toegang tot
              betrouwbare voertuigdata, AI-taxaties, fraudedetectie en marktanalyse — in één
              overzichtelijk platform.
            </p>

            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link
                href="/pricing-request"
                className="inline-flex items-center justify-center gap-2 bg-white text-[#0057B8] font-bold text-base px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
              >
                Gratis demo aanvragen
                <ArrowRight size={18} />
              </Link>
              <Link
                href="/solutions"
                className="inline-flex items-center justify-center gap-2 border-2 border-white/60 text-white font-bold text-base px-8 py-4 rounded-lg hover:border-white hover:bg-white/10 transition-colors"
              >
                Bekijk alle oplossingen
              </Link>
            </div>
          </div>

          {/* Trust stats */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-white/15 pt-12">
            {[
              { value: '500+', label: 'Actieve bedrijven' },
              { value: '2M+', label: 'Voertuigen per maand' },
              { value: '35M', label: 'Voertuigen in database' },
              { value: '99.9%', label: 'Platform beschikbaarheid' },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl sm:text-4xl font-extrabold text-yellow-300">{stat.value}</p>
                <p className="mt-1 text-sm text-white/65">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          FOR WHO SECTION — VWE style card grid
          ================================================================ */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-bold tracking-widest uppercase text-[#0057B8] mb-3">
              Voor wie
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] leading-tight">
              Speciaal ontwikkeld voor iedere automotive professional
            </h2>
            <p className="mt-4 text-gray-500 leading-relaxed">
              Of u nu dealer bent, importeur, leasemaatschappij of garage — VehiqCentral heeft
              de tools en data die uw dagelijkse werk sneller en slimmer maken.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {audiences.map((audience) => {
              const Icon = audience.icon;
              return (
                <Link
                  key={audience.href + audience.title}
                  href={audience.href}
                  className="group bg-white rounded-xl border border-gray-200 p-6 hover:border-[#0057B8] hover:shadow-md transition-all duration-200"
                >
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center mb-4 ${audience.color}`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] text-base mb-2 group-hover:text-[#0057B8] transition-colors">
                    {audience.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{audience.description}</p>
                  <div className="mt-4 flex items-center gap-1 text-[#0057B8] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Meer informatie <ArrowRight size={14} />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          SOLUTIONS GRID
          ================================================================ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-[#0057B8] mb-3">
                Oplossingen
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] leading-tight">
                Alles wat u nodig heeft om met vertrouwen te werken
              </h2>
            </div>
            <div>
              <p className="text-gray-500 leading-relaxed">
                Van kentekeninformatie tot AI-gestuurde taxaties — VehiqCentral dekt elke stap
                van uw automotive proces, van inkoop tot aflevering.
              </p>
              <Link
                href="/solutions"
                className="mt-6 inline-flex items-center gap-2 text-[#0057B8] font-semibold text-sm hover:underline"
              >
                Alle oplossingen bekijken <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution) => {
              const Icon = solution.icon;
              return (
                <Link
                  key={solution.href}
                  href={solution.href}
                  className="group border border-gray-200 rounded-xl p-6 hover:border-[#0057B8] hover:shadow-md transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#0057B8] flex items-center justify-center mb-4 group-hover:bg-[#0057B8] group-hover:text-white transition-colors">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] mb-2 group-hover:text-[#0057B8] transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{solution.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          PLATFORM PREVIEW SECTION
          ================================================================ */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-[#0057B8] mb-3">
                Platform
              </p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] leading-tight">
                Één platform, alle antwoorden
              </h2>
              <p className="mt-4 text-gray-500 leading-relaxed">
                Centraliseer alle automotive data die u nodig heeft in één overzichtelijk
                dashboard. Geen losse tools meer, geen verspreide data.
              </p>

              <ul className="mt-8 space-y-5">
                {[
                  {
                    icon: Zap,
                    title: 'Direct resultaat',
                    desc: 'Kentekens en VIN-nummers worden binnen 2 seconden verwerkt en weergegeven.',
                  },
                  {
                    icon: BarChart3,
                    title: 'Realtime marktdata',
                    desc: 'Dagelijks bijgewerkte prijsdata, trends en vraagontwikkeling per segment.',
                  },
                  {
                    icon: Lock,
                    title: 'AVG-conform & veilig',
                    desc: 'End-to-end versleuteld, volledig AVG-compliant en ISO 27001 gecertificeerd.',
                  },
                  {
                    icon: TrendingUp,
                    title: 'Europese dekking',
                    desc: 'Gekoppeld aan databronnen uit 15+ Europese landen voor importvoertuigen.',
                  },
                ].map((feature) => (
                  <li key={feature.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-blue-100 text-[#0057B8] flex items-center justify-center">
                      <feature.icon size={20} />
                    </div>
                    <div>
                      <p className="font-bold text-[#1A1A2E]">{feature.title}</p>
                      <p className="mt-1 text-sm text-gray-500 leading-relaxed">{feature.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Link
                  href="/pricing-request"
                  className="inline-flex items-center gap-2 bg-[#0057B8] hover:bg-[#0047A0] text-white font-bold px-6 py-3.5 rounded-lg transition-colors"
                >
                  Demo aanvragen <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Dashboard mockup */}
            <div className="relative">
              <div className="rounded-2xl border border-gray-200 bg-white shadow-2xl overflow-hidden">
                {/* Browser bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 border-b border-gray-200">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 ml-2 h-6 rounded-md bg-white border border-gray-200 flex items-center px-3">
                    <span className="text-xs text-gray-400">app.vehiqcentral.nl/dashboard</span>
                  </div>
                </div>

                <div className="p-5 space-y-4">
                  {/* Search */}
                  <div className="h-11 rounded-lg bg-gray-50 border border-gray-200 flex items-center px-4 gap-3">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2" className="flex-shrink-0">
                      <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    <span className="text-sm text-gray-400">Zoek op kenteken, VIN of referentie...</span>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Zoekopdrachten vandaag', val: '247', color: 'text-[#0057B8]' },
                      { label: 'Actieve meldingen', val: '12', color: 'text-orange-500' },
                      { label: 'Voertuigen in beheer', val: '1.834', color: 'text-green-600' },
                    ].map((s) => (
                      <div key={s.label} className="bg-gray-50 rounded-lg p-3 text-center">
                        <p className={`font-extrabold text-xl ${s.color}`}>{s.val}</p>
                        <p className="text-[10px] text-gray-400 mt-0.5 leading-tight">{s.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Table */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between px-3 py-1.5 text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                      <span>Kenteken</span>
                      <span>Model</span>
                      <span>Status</span>
                    </div>
                    {[
                      { plate: '45-BKT-3', model: 'BMW 3-serie 320d', status: 'Geverifieerd', color: 'text-green-700 bg-green-50 border-green-200' },
                      { plate: '78-GHJ-1', model: 'Audi A4 2.0 TDI', status: 'In behandeling', color: 'text-orange-700 bg-orange-50 border-orange-200' },
                      { plate: '12-MNP-6', model: 'Mercedes C-klasse', status: 'Melding', color: 'text-red-700 bg-red-50 border-red-200' },
                    ].map((row) => (
                      <div key={row.plate} className="flex items-center justify-between py-2.5 px-3 rounded-lg bg-white border border-gray-100 text-sm">
                        <span className="font-mono font-bold text-[#1A1A2E] text-xs">{row.plate}</span>
                        <span className="text-gray-500 text-xs hidden sm:inline">{row.model}</span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${row.color}`}>
                          {row.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#0057B8] text-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
                <Clock size={16} className="text-yellow-300" />
                <span className="text-sm font-bold">Realtime data-updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          WHY VEHIQCENTRAL
          ================================================================ */}
      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-bold tracking-widest uppercase text-[#0057B8] mb-3">
              Waarom VehiqCentral
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] leading-tight">
              De feiten die voor ons spreken
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Betrouwbare databronnen',
                description:
                  'Wij koppelen direct aan de RDW, NAP, BOVAG en Europese registraties. Geen tussenpersonen, altijd actueel.',
                icon: Shield,
              },
              {
                title: 'Nauwkeurige AI-taxaties',
                description:
                  'Onze taxatie-engine analyseert meer dan 2 miljoen advertenties per maand voor de meest nauwkeurige marktwaarde.',
                icon: Brain,
              },
              {
                title: 'Persoonlijke ondersteuning',
                description:
                  'Ons Nederlandse supportteam staat klaar via telefoon, chat en e-mail. Gemiddeld antwoord binnen 4 minuten.',
                icon: Users,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="text-center px-4">
                  <div className="w-14 h-14 rounded-2xl bg-blue-100 text-[#0057B8] flex items-center justify-center mx-auto mb-5">
                    <Icon size={26} />
                  </div>
                  <h3 className="font-bold text-[#1A1A2E] text-lg mb-3">{item.title}</h3>
                  <p className="text-gray-500 leading-relaxed text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          TESTIMONIALS — Dutch customers
          ================================================================ */}
      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-bold tracking-widest uppercase text-[#0057B8] mb-3">
              Ervaringen
            </p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1A2E] leading-tight">
              Wat onze klanten zeggen
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                quote: 'Dankzij VehiqCentral hebben we ons inkoopproces compleet getransformeerd. Fraudedetectie werkt razendsnel en heeft ons al duizenden euro\'s bespaard.',
                name: 'Mark de Vries',
                role: 'Inkoopmanager',
                company: 'AutoGroup Rotterdam',
              },
              {
                quote: 'De AI-taxatie is indrukwekkend accuraat. We hoeven niet meer uren te zoeken naar vergelijkbare voertuigen — VehiqCentral geeft ons in 10 seconden een betrouwbare marktwaarde.',
                name: 'Sandra Janssen',
                role: 'Directeur',
                company: 'Janssen Import B.V.',
              },
              {
                quote: 'Als vlootbeheerder vertrouwen we volledig op de restwaarde-analyses van VehiqCentral. De API-integratie met ons DMS werkt perfect en bespaart dagelijks veel handwerk.',
                name: 'Tom van der Berg',
                role: 'Fleet Manager',
                company: 'NL Lease Solutions',
              },
            ].map((testimonial) => (
              <div key={testimonial.name} className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <div className="w-9 h-9 rounded-full bg-[#0057B8] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-[#1A1A2E] text-sm">{testimonial.name}</p>
                    <p className="text-xs text-gray-400">{testimonial.role} · {testimonial.company}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          CTA SECTION
          ================================================================ */}
      <section className="py-20 sm:py-24 bg-[#0057B8]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight max-w-2xl mx-auto">
            Klaar om uw automotive bedrijf te transformeren?
          </h2>
          <p className="mt-4 text-lg text-white/75 max-w-xl mx-auto">
            Sluit u aan bij meer dan 500 bedrijven die dagelijks vertrouwen op VehiqCentral
            voor snellere, slimmere en betrouwbaardere beslissingen.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing-request"
              className="inline-flex items-center justify-center gap-2 bg-white text-[#0057B8] font-bold text-base px-8 py-4 rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
            >
              Gratis demo aanvragen
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border-2 border-white/50 text-white font-bold text-base px-8 py-4 rounded-lg hover:border-white hover:bg-white/10 transition-colors"
            >
              Neem contact op
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-white/60 text-sm">
            {[
              { icon: CheckCircle2, text: 'Geen verplichtingen' },
              { icon: CheckCircle2, text: 'Persoonlijke demo' },
              { icon: CheckCircle2, text: 'Direct aan de slag' },
            ].map((item) => (
              <div key={item.text} className="flex items-center gap-2">
                <item.icon size={16} className="text-yellow-300" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
