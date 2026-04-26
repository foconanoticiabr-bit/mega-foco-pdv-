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
    <div className="flex flex-col lg:flex-row gap-8 h-full">
      {/* Calendar Navigation */}
      <div className="w-full lg:w-80 space-y-6">
        <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm">
           <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Abril 2026</h3>
              <div className="flex gap-2">
                 <button className="p-1 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronLeft className="w-4 h-4" /></button>
                 <button className="p-1 hover:bg-slate-50 rounded-lg text-slate-400"><ChevronRight className="w-4 h-4" /></button>
              </div>
           </div>
           
           <div className="grid grid-cols-7 gap-1 text-center mb-4">
              {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => (
                <span key={d} className="text-[10px] font-black text-slate-300 uppercase">{d}</span>
              ))}
           </div>
           
           <div className="grid grid-cols-7 gap-1 text-center font-bold text-xs">
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                const isSelected = day === 26;
                return (
                  <button 
                    key={i}
                    className={`h-9 w-9 rounded-xl flex items-center justify-center transition-all ${isSelected ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'hover:bg-slate-50 text-slate-600'}`}
                  >
                    {day}
                  </button>
                );
              })}
           </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2rem] text-white">
           <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-4">Métricas de Agenda</h4>
           <div className="space-y-4">
              <div>
                <p className="text-2xl font-black tracking-tight">85%</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Ocupação Hoje</p>
                <div className="w-full h-1.5 bg-slate-800 rounded-full mt-2 overflow-hidden">
                   <div className="w-[85%] h-full bg-blue-500"></div>
                </div>
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-slate-800">
                 <p className="text-[10px] font-bold text-slate-400">Total Previsto</p>
                 <p className="text-sm font-black italic">R$ 1.840,00</p>
              </div>
           </div>
        </div>
      </div>

      {/* Daily Schedule */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase italic underline decoration-blue-600 decoration-8 underline-offset-4">{selectedDate}</h2>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-2">{APPOINTMENTS.length} Agendamentos previstos</p>
           </div>
           <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-blue-200">
              <Plus className="w-5 h-5" />
              Novo Agendamento
           </button>
        </div>

        <div className="space-y-3">
           {APPOINTMENTS.map((app) => (
             <div key={app.id} className="bg-white p-5 rounded-[2rem] border border-slate-200 shadow-sm flex items-center gap-6 group hover:border-blue-300 transition-all cursor-pointer">
                <div className="w-20 text-center border-r border-slate-50 pr-6">
                   <p className="text-lg font-black text-slate-900 tracking-tighter">{app.time}</p>
                   <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Início</p>
                </div>
                
                <div className="flex-1 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                         <User className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-slate-900">{app.customer}</h4>
                         <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                            <Scissors className="w-3.5 h-3.5" />
                            {app.service}
                         </div>
                      </div>
                   </div>

                   <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                         <p className="text-sm font-black text-slate-900">R$ {app.price.toFixed(2)}</p>
                         <p className="text-[9px] font-black text-emerald-600 uppercase">Debitar PDV</p>
                      </div>
                      
                      <div className="flex gap-2">
                        {app.status === 'pending' ? (
                          <>
                            <button className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all"><Check className="w-4 h-4" /></button>
                            <button className="p-2.5 bg-rose-50 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-all"><X className="w-4 h-4" /></button>
                          </>
                        ) : (
                          <div className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest ${app.status === 'ready' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
                             {app.status === 'ready' ? 'Em Atendimento' : 'Confirmado'}
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
