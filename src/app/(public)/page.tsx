import Link from 'next/link';
import Image from 'next/image';
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
  ChevronRight,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'VehiqCentral — Alles-in-één platform voor automotive professionals',
  description:
    'Het digitale automotive platform voor dealers, importeurs, leasebedrijven en garages in Nederland. Voertuigdata, taxaties, fraudedetectie en marktanalyse in één tool.',
};

const audiences = [
  { icon: Car, title: 'Startende autobedrijven', description: 'Begin professioneel met betrouwbare voertuigdata en betaalbare tarieven die meegroeien met uw bedrijf.', href: '/for-startups', gradient: 'from-purple-100/80 to-blue-100/60', iconColor: 'text-purple-600' },
  { icon: Building2, title: 'Universeel autobedrijf', description: 'Beheer merken, voorraad en klantdata eenvoudig en verkoop sneller met slimme advertentietools.', href: '/for-dealers', gradient: 'from-amber-100/80 to-orange-100/60', iconColor: 'text-amber-600' },
  { icon: Users, title: 'Dealer (holdings)', description: 'Stuur centraal aan met uniforme processen en inzicht in al je vestigingen.', href: '/for-dealers', gradient: 'from-sky-100/80 to-teal-100/60', iconColor: 'text-sky-600' },
  { icon: Truck, title: 'Importeurs & exporteurs', description: 'Controleer voertuighistorie uit heel Europa en detecteer grensoverschrijdende fraude direct.', href: '/for-importers', gradient: 'from-teal-100/80 to-green-100/60', iconColor: 'text-teal-600' },
  { icon: Warehouse, title: 'Lease & vlootbedrijven', description: 'Grip op vloot, contracten en schadeafhandeling dankzij digitale processen.', href: '/for-fleet', gradient: 'from-blue-100/80 to-indigo-100/60', iconColor: 'text-blue-600' },
  { icon: ShieldCheck, title: 'Verzekeraars', description: 'Fraudedetectie en nauwkeurige taxaties voor schadeverwerkingen en acceptatie.', href: '/for-insurers', gradient: 'from-rose-100/80 to-pink-100/60', iconColor: 'text-rose-600' },
];

const solutions = [
  { icon: Database, title: 'Voertuigdata', description: 'Direct toegang tot RDW-, APK- en NAP-data. Kenteken, VIN, eigenaren, lasten en meer in seconden.', href: '/solutions/vehicle-data' },
  { icon: Brain, title: 'AI-taxatie', description: 'Nauwkeurige marktwaarden op basis van AI, realtime marktdata en duizenden vergelijkbare voertuigen.', href: '/solutions/valuation' },
  { icon: Shield, title: 'Fraudedetectie', description: 'Detecteer gemanipuleerde kilometerstanden, gestolen voertuigen, verborgen schades en valse documenten.', href: '/solutions/fraud' },
  { icon: FileSearch, title: 'Voertuigrapporten', description: 'Professionele historierapporten met APK, schadehistorie, kilometerstanden en eigenaarstransities.', href: '/solutions/reports' },
  { icon: LineChart, title: 'Marktanalyse', description: 'Dagelijks bijgewerkte prijsdata, vraagontwikkeling en depreciatie per merk, model en segment.', href: '/solutions/market' },
  { icon: Code, title: 'API & Integraties', description: 'Verbind VehiqCentral met uw DMS, website of app via onze REST API met volledige documentatie.', href: '/solutions/api' },
];

export default function HomePage() {
  return (
    <>
      <section className="bg-white relative overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full pointer-events-none select-none hidden lg:block" aria-hidden="true">
          <div className="absolute right-0 top-0 w-full h-full" style={{ background: 'linear-gradient(135deg, #e8f8f6 0%, #d0f0eb 40%, #b8e8e0 100%)', clipPath: 'polygon(20% 0%, 100% 0%, 100% 100%, 0% 100%)' }} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-[#0057B8]/10 text-[#0057B8] text-xs font-bold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">We speak automotive</div>
              <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-extrabold text-[#1a1f5e] leading-[1.1] tracking-tight">
                Alles-in-één platform{' '}<span className="text-[#FFCC00]">voor autobedrijven</span>
              </h1>
              <p className="mt-6 text-lg text-gray-500 leading-relaxed max-w-lg">VehiqCentral geeft dealers, importeurs, leasebedrijven en garages toegang tot betrouwbare voertuigdata, AI-taxaties, fraudedetectie en marktanalyse — in één overzichtelijk platform.</p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4">
                <Link href="/pricing-request" className="inline-flex items-center justify-center gap-2 bg-[#FFCC00] text-[#1a1f5e] font-bold text-base px-8 py-4 rounded-md hover:bg-yellow-300 transition-colors shadow-sm">Demo aanvragen</Link>
                <Link href="/solutions" className="inline-flex items-center justify-center gap-2 border-2 border-[#1a1f5e] text-[#1a1f5e] font-bold text-base px-8 py-4 rounded-md hover:bg-[#1a1f5e]/5 transition-colors">Onze oplossingen<ChevronRight size={18} /></Link>
              </div>
            </div>
            <div className="relative lg:h-[480px] h-72 rounded-2xl overflow-hidden shadow-xl">
              {/* Moderne autoshowroom met meerdere auto's in rijen — past perfect bij dealers/importeurs */}
              <img src="https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=900&auto=format&fit=crop&q=80" alt="Moderne autoshowroom met meerdere voertuigen" className="w-full h-full object-cover" />
              <div className="absolute bottom-5 left-5 bg-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#0057B8] flex items-center justify-center flex-shrink-0"><TrendingUp size={20} className="text-white" /></div>
                <div><p className="text-xs text-gray-400">Voertuigen geanalyseerd</p><p className="font-extrabold text-[#1a1f5e] text-lg leading-tight">2M+ / maand</p></div>
              </div>
            </div>
          </div>
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-gray-100 pt-12">
            {[{value:'500+',label:'Actieve bedrijven'},{value:'2M+',label:'Voertuigen per maand'},{value:'35M',label:'Voertuigen in database'},{value:'99.9%',label:'Platform beschikbaarheid'}].map((stat)=>(
              <div key={stat.label}><p className="text-3xl sm:text-4xl font-extrabold text-[#1a1f5e]">{stat.value}</p><p className="mt-1 text-sm text-gray-400">{stat.label}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center mb-14">
            <div className="relative rounded-2xl overflow-hidden h-72 lg:h-96 shadow-lg order-2 lg:order-1">
              {/* Dealer en klant bij auto in showroom — past bij "voor wie" sectie over verschillende doelgroepen */}
              <img src="https://images.unsplash.com/photo-1560250097-0dc05edf6851?w=800&auto=format&fit=crop&q=80" alt="Automotive professional bespreekt voertuig met klant" className="w-full h-full object-cover" />
            </div>
            <div className="order-1 lg:order-2">
              <p className="text-sm font-bold tracking-widest uppercase text-[#0CB8A0] mb-3">Voor wie</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1f5e] leading-tight">Wat doe jij in de automotive?</h2>
              <p className="mt-4 text-gray-500 leading-relaxed">Van starter met een verse RDW-erkenning tot schadebedrijf of leasemaatschappij: elk type bedrijf heeft zijn eigen uitdagingen. Klik op jouw type bedrijf en ontdek wat VehiqCentral voor jou doet.</p>
              <Link href="/solutions" className="mt-6 inline-flex items-center gap-1 text-[#0CB8A0] font-semibold text-sm hover:underline">Alle oplossingen <ChevronRight size={16} /></Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {audiences.map((audience)=>{const Icon=audience.icon;return(
              <Link key={audience.href+audience.title} href={audience.href} className={`group bg-gradient-to-br ${audience.gradient} rounded-2xl p-6 hover:shadow-md transition-all duration-200 border border-white/60`}>
                <Icon size={28} className={`mb-4 ${audience.iconColor}`} />
                <h3 className="font-bold text-[#1a1f5e] text-base mb-2">{audience.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{audience.description}</p>
                <div className="mt-4 flex items-center gap-1 text-[#0CB8A0] text-sm font-semibold">Meer informatie <ArrowRight size={14} /></div>
              </Link>
            );})}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start mb-16">
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-[#0CB8A0] mb-3">Oplossingen</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1f5e] leading-tight">Alles wat u nodig heeft om met vertrouwen te werken</h2>
            </div>
            <div className="lg:pt-16">
              <p className="text-gray-500 leading-relaxed">Van kentekeninformatie tot AI-gestuurde taxaties — VehiqCentral dekt elke stap van uw automotive proces, van inkoop tot aflevering.</p>
              <Link href="/solutions" className="mt-6 inline-flex items-center gap-1 text-[#0CB8A0] font-semibold text-sm hover:underline">Alle oplossingen bekijken <ChevronRight size={16} /></Link>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((solution)=>{const Icon=solution.icon;return(
              <Link key={solution.href} href={solution.href} className="group border border-gray-200 rounded-2xl p-6 hover:border-[#0CB8A0] hover:shadow-md transition-all duration-200 bg-white">
                <div className="w-10 h-10 rounded-lg bg-teal-50 text-[#0CB8A0] flex items-center justify-center mb-4 group-hover:bg-[#0CB8A0] group-hover:text-white transition-colors"><Icon size={20} /></div>
                <h3 className="font-bold text-[#1a1f5e] mb-2 group-hover:text-[#0CB8A0] transition-colors">{solution.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{solution.description}</p>
                <div className="mt-4 flex items-center gap-1 text-[#0CB8A0] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">Lees meer <ChevronRight size={14} /></div>
              </Link>
            );})}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-bold tracking-widest uppercase text-[#0CB8A0] mb-3">Platform</p>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1f5e] leading-tight">Één platform, alle antwoorden</h2>
              <p className="mt-4 text-gray-500 leading-relaxed">Centraliseer alle automotive data die u nodig heeft in één overzichtelijk dashboard. Geen losse tools meer, geen verspreide data.</p>
              <ul className="mt-8 space-y-5">
                {[{icon:Zap,title:'Direct resultaat',desc:'Kentekens en VIN-nummers worden binnen 2 seconden verwerkt en weergegeven.'},{icon:BarChart3,title:'Realtime marktdata',desc:'Dagelijks bijgewerkte prijsdata, trends en vraagontwikkeling per segment.'},{icon:Lock,title:'AVG-conform & veilig',desc:'End-to-end versleuteld, volledig AVG-compliant en ISO 27001 gecertificeerd.'},{icon:TrendingUp,title:'Europese dekking',desc:'Gekoppeld aan databronnen uit 15+ Europese landen voor importvoertuigen.'}].map((feature)=>(
                  <li key={feature.title} className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-teal-50 text-[#0CB8A0] flex items-center justify-center"><feature.icon size={20} /></div>
                    <div><p className="font-bold text-[#1a1f5e]">{feature.title}</p><p className="mt-1 text-sm text-gray-500 leading-relaxed">{feature.desc}</p></div>
                  </li>
                ))}
              </ul>
              <div className="mt-10">
                <Link href="/pricing-request" className="inline-flex items-center gap-2 bg-[#FFCC00] text-[#1a1f5e] font-bold px-6 py-3.5 rounded-md hover:bg-yellow-300 transition-colors">Demo aanvragen <ChevronRight size={18} /></Link>
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden h-80 lg:h-[520px] shadow-xl">
              {/* Medewerker in autobedrijf werkt op tablet terwijl hij kenteken scant / voertuig inspecteert */}
              <img src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&auto=format&fit=crop&q=80" alt="Automotive professional werkt met digitale voertuigdata op tablet" className="w-full h-full object-cover" />
              <div className="absolute bottom-5 right-5 bg-[#1a1f5e] text-white rounded-xl shadow-lg px-4 py-3 flex items-center gap-2">
                <Clock size={16} className="text-[#FFCC00]" /><span className="text-sm font-bold">Realtime data-updates</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-bold tracking-widest uppercase text-[#0CB8A0] mb-3">Waarom VehiqCentral</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1f5e] leading-tight">De feiten die voor ons spreken</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[{title:'Betrouwbare databronnen',description:'Wij koppelen direct aan de RDW, NAP, BOVAG en Europese registraties. Geen tussenpersonen, altijd actueel.',icon:Shield},{title:'Nauwkeurige AI-taxaties',description:'Onze taxatie-engine analyseert meer dan 2 miljoen advertenties per maand voor de meest nauwkeurige marktwaarde.',icon:Brain},{title:'Persoonlijke ondersteuning',description:'Ons Nederlandse supportteam staat klaar via telefoon, chat en e-mail. Gemiddeld antwoord binnen 4 minuten.',icon:Users}].map((item)=>{const Icon=item.icon;return(
              <div key={item.title} className="text-center px-4">
                <div className="w-14 h-14 rounded-2xl bg-teal-50 text-[#0CB8A0] flex items-center justify-center mx-auto mb-5"><Icon size={26} /></div>
                <h3 className="font-bold text-[#1a1f5e] text-lg mb-3">{item.title}</h3>
                <p className="text-gray-500 leading-relaxed text-sm">{item.description}</p>
              </div>
            );})}
          </div>
        </div>
      </section>

      <section className="relative h-64 sm:h-80 overflow-hidden">
        {/* Rij auto's op een parkeerplaats van een dealer / importeur — past bij 500+ bedrijven */}
        <img src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1600&auto=format&fit=crop&q=80" alt="Grote voorraad voertuigen bij automotive bedrijf" className="w-full h-full object-cover object-center" />
        <div className="absolute inset-0 bg-[#1a1f5e]/55 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <p className="text-2xl sm:text-3xl font-extrabold mb-2">500+ bedrijven vertrouwen op VehiqCentral</p>
            <p className="text-white/80 text-lg">Van startende dealer tot nationale dealerholding</p>
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-28 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <p className="text-sm font-bold tracking-widest uppercase text-[#0CB8A0] mb-3">Ervaringen</p>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a1f5e] leading-tight">Wat onze klanten zeggen</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{quote:"Dankzij VehiqCentral hebben we ons inkoopproces compleet getransformeerd. Fraudedetectie werkt razendsnel en heeft ons al duizenden euro's bespaard.",name:'Mark de Vries',role:'Inkoopmanager',company:'AutoGroup Rotterdam',photo:'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&auto=format&fit=crop&q=80'},{quote:'De AI-taxatie is indrukwekkend accuraat. We hoeven niet meer uren te zoeken — VehiqCentral geeft ons in 10 seconden een betrouwbare marktwaarde.',name:'Sandra Janssen',role:'Directeur',company:'Janssen Import B.V.',photo:'https://images.unsplash.com/photo-1494790108755-2616b612b347?w=80&auto=format&fit=crop&q=80'},{quote:'Als vlootbeheerder vertrouwen we volledig op de restwaarde-analyses van VehiqCentral. De API-integratie met ons DMS werkt perfect.',name:'Tom van der Berg',role:'Fleet Manager',company:'NL Lease Solutions',photo:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80'}].map((testimonial)=>(
              <div key={testimonial.name} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
                <div className="flex gap-1 mb-4">{[...Array(5)].map((_,i)=>(<Star key={i} size={14} className="text-[#FFCC00] fill-[#FFCC00]" />))}</div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">&ldquo;{testimonial.quote}&rdquo;</p>
                <div className="flex items-center gap-3 border-t border-gray-100 pt-4">
                  <img src={testimonial.photo} alt={testimonial.name} className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                  <div><p className="font-bold text-[#1a1f5e] text-sm">{testimonial.name}</p><p className="text-xs text-gray-400">{testimonial.role} · {testimonial.company}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 sm:py-24 bg-[#1a1f5e] relative overflow-hidden">
        <div className="absolute right-0 bottom-0 w-72 h-72 pointer-events-none opacity-20" style={{background:'radial-gradient(circle, #0CB8A0 0%, transparent 70%)'}} aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight max-w-2xl mx-auto">Klaar om uw automotive bedrijf te transformeren?</h2>
          <p className="mt-4 text-lg text-white/70 max-w-xl mx-auto">Sluit u aan bij meer dan 500 bedrijven die dagelijks vertrouwen op VehiqCentral voor snellere, slimmere en betrouwbaardere beslissingen.</p>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pricing-request" className="inline-flex items-center justify-center gap-2 bg-[#FFCC00] text-[#1a1f5e] font-bold text-base px-8 py-4 rounded-md hover:bg-yellow-300 transition-colors">Gratis demo aanvragen</Link>
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold text-base px-8 py-4 rounded-md hover:border-white hover:bg-white/10 transition-colors">Neem contact op</Link>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-8 text-white/50 text-sm">
            {[{icon:CheckCircle2,text:'Geen verplichtingen'},{icon:CheckCircle2,text:'Persoonlijke demo'},{icon:CheckCircle2,text:'Direct aan de slag'}].map((item)=>(
              <div key={item.text} className="flex items-center gap-2"><item.icon size={16} className="text-[#0CB8A0]" /><span>{item.text}</span></div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
