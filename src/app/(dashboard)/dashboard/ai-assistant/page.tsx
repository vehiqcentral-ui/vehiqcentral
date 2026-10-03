'use client';

import { useState } from 'react';
import { Bot, Send, Sparkles, Car, TrendingUp, ShieldAlert, LineChart } from 'lucide-react';

const exampleQueries = [
  { icon: Car, text: 'Cual es el historial completo del vehiculo con matricula 1234 ABC?', category: 'Historial' },
  { icon: TrendingUp, text: 'Cual es el precio justo de mercado para un BMW X3 2021 con 45.000 km?', category: 'Valoracion' },
  { icon: ShieldAlert, text: 'Hay indicios de fraude en este vehiculo importado de Alemania?', category: 'Fraude' },
  { icon: LineChart, text: 'Como ha evolucionado el precio medio de los coches electricos este trimestre?', category: 'Mercado' },
];

const chatHistory = [
  { role: 'user', text: 'Cual es el valor de mercado actual de un Seat Leon FR 2022 diesel con 35.000 km?' },
  { role: 'assistant', text: 'Basandome en el analisis de **847 anuncios activos** en portales espanoles, el valor de mercado estimado para un **Seat Leon FR 2022 Diesel** con 35.000 km es:\n\n- **Precio medio:** 22.450 EUR\n- **Rango de mercado:** 20.800 - 24.100 EUR\n- **Percentil 25:** 21.200 EUR\n- **Percentil 75:** 23.600 EUR\n\nLa tendencia de precio para este modelo ha bajado un **3,2%** en los ultimos 90 dias. Los vehiculos con acabado FR mantienen un premium del 8% sobre el modelo base.' },
  { role: 'user', text: 'Y si tiene paquete de navegacion y techo panoramico?' },
  { role: 'assistant', text: 'Con los extras **paquete de navegacion** y **techo panoramico**, el valor ajustado sube:\n\n- **Precio medio ajustado:** 23.650 EUR (+1.200 EUR)\n- **Rango ajustado:** 22.000 - 25.300 EUR\n\nDesglose del impacto de los extras:\n- Paquete de navegacion: **+650 EUR** (retencion del 42% sobre precio original)\n- Techo panoramico: **+550 EUR** (retencion del 35%)\n\nEstos extras tienen buena demanda en el mercado espanol y ayudan a una venta mas rapida.' },
];

export default function AIAssistantPage() {
  const [input, setInput] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold">IA Asistente</h1>
        <p className="text-brand-muted mt-1">Inteligencia artificial para consultas de historial, valoracion, fraude y mercado</p>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        {exampleQueries.map((q, i) => (
          <button key={i} onClick={() => setInput(q.text)} className="card text-left hover:border-brand-teal transition-colors group">
            <q.icon size={18} className="text-brand-teal mb-2 group-hover:scale-110 transition-transform" />
            <p className="text-xs text-brand-muted mb-1">{q.category}</p>
            <p className="text-sm font-semibold text-brand-indigo">{q.text}</p>
          </button>
        ))}
      </div>

      {/* Chat */}
      <div className="card flex flex-col" style={{ height: '480px' }}>
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {chatHistory.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === 'user' ? 'bg-brand-indigo text-white' : 'bg-pastel-mint/50 border border-brand-teal/20'}`}>
                {msg.role === 'assistant' && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <Bot size={14} className="text-brand-teal" />
                    <span className="text-xs font-semibold text-brand-teal">VEHIQ IA</span>
                  </div>
                )}
                <div className="text-sm whitespace-pre-line">{msg.text}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex gap-3 border-t border-brand-border pt-4">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Pregunta sobre historial vehicular, valoraciones, fraude o mercado..."
            className="input flex-1 text-sm"
            onKeyDown={e => e.key === 'Enter' && e.preventDefault()}
          />
          <button className="btn-primary flex items-center gap-2">
            <Send size={16} /> Enviar
          </button>
        </div>

        <p className="text-[10px] text-brand-muted mt-2 text-center">
          La integracion con IA se activara en una version futura. Las respuestas mostradas son ejemplos demostrativos.
        </p>
      </div>
    </div>
  );
}
