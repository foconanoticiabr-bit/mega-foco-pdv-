import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, User, Scissors, Check, X, AlertOctagon, ChevronLeft, ChevronRight, Plus } from 'lucide-react';

interface Appointment {
  id: string;
  time: string;
  customer: string;
  service: string;
  status: 'pending' | 'confirmed' | 'ready' | 'cancelled';
  price: number;
}

const APPOINTMENTS: Appointment[] = [
  { id: '1', time: '09:00', customer: 'Marina Silva', service: 'Corte + Coloração', status: 'ready', price: 250.00 },
  { id: '2', time: '10:30', customer: 'João Paulo', service: 'Barba + Sobrancelha', status: 'confirmed', price: 85.00 },
  { id: '3', time: '11:45', customer: 'Arthur Lima', service: 'Lavagem Especial', status: 'pending', price: 45.00 },
  { id: '4', time: '14:00', customer: 'Espaço Beleza', service: 'Treinamento Equipe', status: 'confirmed', price: 0.00 },
  { id: '5', time: '15:30', customer: 'Juliana Melo', service: 'Manicure + Pedicure', status: 'pending', price: 120.00 },
];

export default function Agenda() {
  const [selectedDate, setSelectedDate] = useState('Hoje, 26 de Abril');

  return (
    <div className="flex flex-col lg:flex-row gap-10 h-full">
      {/* Calendar Navigation */}
      <div className="w-full lg:w-96 space-y-8">
        <div className="luxury-card p-8 border-white/5 luxury-gradient">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-white italic">Abril 2026</h3>
              <div className="flex gap-3">
                 <button className="p-2 bg-white/5 hover:bg-[#c5a059] hover:text-[#0a0e17] rounded-xl text-white/20 transition-all duration-500"><ChevronLeft className="w-4 h-4" /></button>
                 <button className="p-2 bg-white/5 hover:bg-[#c5a059] hover:text-[#0a0e17] rounded-xl text-white/20 transition-all duration-500"><ChevronRight className="w-4 h-4" /></button>
              </div>
           </div>
           
           <div className="grid grid-cols-7 gap-2 text-center mb-6">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => (
                <span key={d} className="text-[9px] font-black text-white/10 uppercase tracking-widest italic">{d}</span>
              ))}
           </div>
           
           <div className="grid grid-cols-7 gap-2 text-center font-bold text-xs">
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                const isSelected = day === 26;
                return (
                  <button 
                    key={i}
                    className={`h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-500 uppercase italic ${isSelected ? 'bg-[#c5a059] text-[#0a0e17] shadow-xl shadow-[#c5a059]/20 font-black' : 'hover:bg-white/5 text-white/30 hover:text-white'}`}
                  >
                    {day}
                  </button>
                );
              })}
           </div>
        </div>

        <div className="luxury-card p-10 bg-gradient-to-br from-[#111827] to-black border-[#c5a059]/20 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/5 blur-3xl rounded-full translate-x-16 -translate-y-16"></div>
           <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#c5a059] mb-6 italic">Performance do Dia</h4>
           <div className="space-y-6">
              <div>
                 <div className="flex justify-between items-end mb-2">
                    <p className="text-3xl font-serif italic font-black gold-text">85%</p>
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.2em] italic">Ocupação</p>
                 </div>
                 <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                    <div className="w-[85%] h-full bg-gradient-to-r from-[#f9d976] to-[#c5a059]"></div>
                 </div>
              </div>
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                 <p className="text-[10px] font-black text-white/30 uppercase tracking-widest italic">Ticket Médio</p>
                 <p className="text-lg font-serif italic font-black gold-text tracking-tighter">R$ 1.840,00</p>
              </div>
           </div>
        </div>
      </div>

      {/* Daily Schedule */}
      <div className="flex-1 space-y-8">
        <div className="flex items-center justify-between">
           <div>
              <h2 className="text-3xl font-serif italic font-black text-white tracking-tighter uppercase gold-text">{selectedDate}</h2>
              <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mt-3 italic">{APPOINTMENTS.length} PROTOCOLOS AGENDADOS</p>
           </div>
           <button className="px-10 py-5 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 shadow-2xl shadow-[#c5a059]/20 italic group hover:scale-[1.02] transition-all">
              <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-500" />
              Novo Atendimento
           </button>
        </div>

        <div className="space-y-4">
           {APPOINTMENTS.map((app) => (
             <div key={app.id} className="luxury-card p-8 border-white/5 luxury-gradient flex items-center gap-10 group hover:border-[#c5a059]/30 transition-all duration-500 cursor-pointer">
                <div className="w-24 text-center border-r border-white/5 pr-10">
                   <p className="text-2xl font-serif italic font-black text-white tracking-tighter mb-1">{app.time}</p>
                   <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] italic leading-none">Início</p>
                </div>
                
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                   <div className="flex items-center gap-6">
                      <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/10 group-hover:bg-[#c5a059] group-hover:text-[#0a0e17] group-hover:border-[#c5a059] transition-all duration-700">
                         <User className="w-7 h-7" />
                      </div>
                      <div>
                         <h4 className="text-lg font-serif italic font-black text-white tracking-tight uppercase group-hover:gold-text transition-all mb-1">{app.customer}</h4>
                         <div className="flex items-center gap-3 text-[10px] font-black text-white/20 uppercase tracking-widest italic">
                            <Scissors className="w-3.5 h-3.5 text-[#c5a059]" />
                            {app.service}
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-10">
                      <div className="text-right hidden sm:block">
                         <p className="text-xl font-serif italic font-black gold-text tracking-tighter">R$ {app.price.toFixed(2)}</p>
                         <p className="text-[8px] font-black text-emerald-500 uppercase tracking-widest italic">Liquidar Protocolo</p>
                      </div>
                      
                      <div className="flex gap-3">
                        {app.status === 'pending' ? (
                          <>
                            <button className="p-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-2xl hover:bg-emerald-500 hover:text-white transition-all duration-500 shadow-lg shadow-emerald-500/10"><Check className="w-5 h-5" /></button>
                            <button className="p-3 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-2xl hover:bg-rose-500 hover:text-white transition-all duration-500 shadow-lg shadow-rose-500/10"><X className="w-5 h-5" /></button>
                          </>
                        ) : (
                          <div className={`flex items-center gap-3 px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] italic border shrink-0 ${app.status === 'ready' ? 'bg-[#c5a059] text-[#0a0e17] border-[#c5a059] shadow-xl shadow-[#c5a059]/10' : 'bg-white/5 text-white/30 border-white/10'}`}>
                             {app.status === 'ready' ? 'Protocolo em Curso' : 'Confirmado'}
                          </div>
                        )}
                      </div>
                   </div>
                </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
