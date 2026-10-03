'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const faqs = [
  { q: 'Que es VEHIQ?', a: 'VEHIQ es una plataforma de inteligencia automotriz disenada para profesionales del sector del motor en Espana. Centraliza la gestion de inventario, tramites, publicidad, valoraciones, importaciones, exportaciones y mas en una sola herramienta.' },
  { q: 'A quien va dirigido VEHIQ?', a: 'VEHIQ esta disenado para concesionarios, compraventas, importadores, exportadores, empresas de alquiler, gestores de flotas, talleres, aseguradoras y cualquier profesional del sector automotriz espanol.' },
  { q: 'Que datos de vehiculos puedo consultar?', a: 'Puedes consultar datos de la DGT, historial tecnico, ITV, recalls, datos de homologacion, historial de propietarios y valoraciones de mercado de cualquier vehiculo matriculado en Espana.' },
  { q: 'Como funciona la publicacion en portales?', a: 'VEHIQ se integra con los principales portales de venta en Espana (Coches.net, Milanuncios, AutoScout24 y mas). Puedes publicar y sincronizar anuncios en todos los portales desde un solo clic.' },
  { q: 'VEHIQ tiene API para integraciones?', a: 'Si, ofrecemos una API RESTful completa y documentada. Permite integrar datos vehiculares, valoraciones e inventario en tus propios sistemas, DMS o aplicaciones.' },
  { q: 'Que planes y precios hay disponibles?', a: 'Ofrecemos planes adaptados a cada tipo de negocio, desde profesionales individuales hasta grandes concesionarios. Contacta con nuestro equipo comercial para recibir una propuesta personalizada.' },
  { q: 'Puedo importar mi inventario actual?', a: 'Si, puedes importar tu inventario desde hojas de calculo (Excel/CSV) o conectar directamente con tu DMS actual. Nuestro equipo te ayuda en el proceso de migracion.' },
  { q: 'Que soporte ofreceis?', a: 'Ofrecemos soporte por email, telefono y chat en horario laboral (L-V, 9:00-18:00 CET). Los planes profesionales incluyen soporte prioritario y un gestor de cuenta dedicado.' },
  { q: 'Es seguro VEHIQ? Cumple con la RGPD?', a: 'VEHIQ cumple integramente con el RGPD y la LOPDGDD. Todos los datos se almacenan en servidores dentro de la Union Europea con cifrado en transito y en reposo.' },
  { q: 'Puedo gestionar varias sedes o empresas?', a: 'Si, VEHIQ soporta gestion multi-sede y multi-empresa. Puedes configurar diferentes ubicaciones, equipos y permisos desde un unico panel de administracion.' },
  { q: 'Como calcula VEHIQ las valoraciones de vehiculos?', a: 'Las valoraciones se basan en datos reales de mercado del sector espanol, incluyendo transacciones recientes, precios de portal, kilometraje, estado y equipamiento. Se actualizan diariamente.' },
  { q: 'Puedo probar VEHIQ antes de contratar?', a: 'Si, ofrecemos demos personalizadas sin compromiso. Contacta con nuestro equipo y te mostramos la plataforma adaptada a tu tipo de negocio.' },
];

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-border">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="font-heading font-bold text-brand-navy group-hover:text-brand-teal transition-colors pr-4">{q}</span>
        <ChevronDown className={cn('w-5 h-5 text-brand-muted flex-shrink-0 transition-transform duration-200', open && 'rotate-180')} />
      </button>
      <div className={cn('overflow-hidden transition-all duration-200', open ? 'max-h-96 pb-5' : 'max-h-0')}>
        <p className="text-brand-muted leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FaqPage() {
  return (
    <>
      <section className="bg-brand-alt-bg py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="font-heading font-extrabold text-4xl sm:text-5xl text-brand-navy leading-tight">
              Preguntas Frecuentes
            </h1>
            <p className="mt-4 text-xl text-brand-muted leading-relaxed">
              Respuestas a las preguntas mas habituales sobre VEHIQ y nuestros servicios.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>
    </>
  );
}
