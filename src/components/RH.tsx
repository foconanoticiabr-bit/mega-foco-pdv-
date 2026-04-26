import React, { useState } from 'react';
import { Users, Clock, UserPlus, Briefcase, Calendar, CheckCircle2, XCircle, Search, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';

interface Employee {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'on_break' | 'offline';
  lastClockIn: string;
}

const EMPLOYEES: Employee[] = [
  { id: '1', name: 'Ana Oliveira', role: 'Gerente', status: 'active', lastClockIn: '08:00' },
  { id: '2', name: 'Carlos Santos', role: 'Vendedor', status: 'active', lastClockIn: '08:15' },
  { id: '3', name: 'Juliana Lima', role: 'Esteticista', status: 'on_break', lastClockIn: '09:00' },
  { id: '4', name: 'Ricardo Melo', role: 'Cabelereiro', status: 'offline', lastClockIn: '-' },
  { id: '5', name: 'Beatriz Costa', role: 'Recepcionista', status: 'active', lastClockIn: '08:30' },
];

export default function RH() {
  const [activeTab, setActiveTab] = useState<'employees' | 'ponto'>('employees');

  return (
    <div className="space-y-12">
      <div className="flex items-center justify-between">
        <div className="flex bg-white/5 p-1 rounded-full border border-white/5 luxury-gradient">
          <button 
            onClick={() => setActiveTab('employees')}
            className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] italic transition-all duration-500 ${activeTab === 'employees' ? 'bg-[#c5a059] text-[#0a0e17] shadow-2xl shadow-[#c5a059]/20' : 'text-white/20 hover:text-white'}`}
          >
            Quadro Cooperativo
          </button>
          <button 
            onClick={() => setActiveTab('ponto')}
            className={`px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.3em] italic transition-all duration-500 ${activeTab === 'ponto' ? 'bg-[#c5a059] text-[#0a0e17] shadow-2xl shadow-[#c5a059]/20' : 'text-white/20 hover:text-white'}`}
          >
            Terminal Transacional
          </button>
        </div>
        <button className="px-10 py-5 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full text-[10px] font-black uppercase tracking-[0.4em] flex items-center gap-3 shadow-2xl shadow-[#c5a059]/20 italic group hover:scale-[1.02] transition-all">
          <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
          Vincular Cooperado
        </button>
      </div>

      {activeTab === 'employees' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {EMPLOYEES.map((employee) => (
            <div key={employee.id} className="luxury-card p-8 border-white/5 luxury-gradient relative overflow-hidden group hover:border-[#c5a059]/30 transition-all duration-700">
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-1000"></div>
               
               <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center text-white/10 group-hover:bg-[#c5a059] group-hover:text-[#0a0e17] border border-white/10 group-hover:border-[#c5a059] transition-all duration-700 font-serif italic text-2xl font-black shadow-inner">
                   {employee.name.charAt(0)}
                </div>
                <div className="flex flex-col items-end">
                   <div className={`flex items-center gap-2 p-1.5 px-3 rounded-full border italic ${employee.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : employee.status === 'on_break' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-white/5 text-white/20 border-white/10'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${employee.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : employee.status === 'on_break' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-white/20'}`}></div>
                      <span className="text-[8px] font-black uppercase tracking-[0.2em]">{employee.status.replace('_', ' ')}</span>
                   </div>
                   <button className="mt-6 p-2 text-white/10 hover:text-[#c5a059] transition-all duration-500 border border-white/5 hover:border-[#c5a059]/20 rounded-xl bg-white/5">
                      <MoreVertical className="w-4 h-4" />
                   </button>
                </div>
              </div>

              <div className="relative z-10">
                <h4 className="text-xl font-serif italic font-black text-white tracking-tight leading-none mb-2 group-hover:gold-text transition-all">{employee.name}</h4>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-8 italic">{employee.role} elite</p>
                
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                   <div>
                      <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 italic">Atividade Inicial</p>
                      <p className="text-sm font-black gold-text italic tracking-tighter">{employee.lastClockIn}</p>
                   </div>
                   <div>
                      <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 italic">Ações Rápidas</p>
                      <div className="flex gap-3">
                         <button className="w-8 h-8 rounded-xl bg-white/5 text-white/20 flex items-center justify-center hover:bg-[#c5a059] hover:text-[#0a0e17] transition-all duration-500 border border-white/5"><Calendar className="w-3.5 h-3.5" /></button>
                         <button className="w-8 h-8 rounded-xl bg-white/5 text-white/20 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-500 border border-white/5"><Briefcase className="w-3.5 h-3.5" /></button>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="luxury-card border-white/5 luxury-gradient flex flex-col p-16 items-center justify-center min-h-[500px] relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent"></div>
           
           <div className="w-40 h-40 bg-white/5 rounded-full flex items-center justify-center mb-10 relative border border-white/5 shadow-2xl">
              <div className="absolute inset-0 bg-[#c5a059]/5 rounded-full animate-ping opacity-20"></div>
              <Clock className="w-16 h-16 gold-text animate-pulse" />
           </div>
           <h3 className="text-3xl font-serif italic font-black text-white tracking-tighter uppercase mb-3 gold-text">Validador Transacional</h3>
           <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] mb-16 italic">Unidade de Controle Central #012</p>
           
           <div className="max-w-md w-full space-y-6">
              <input 
                type="password" 
                placeholder="TOKEN DE ACESSO" 
                className="w-full py-6 px-10 bg-white/5 border border-white/10 rounded-[2rem] text-center text-2xl font-serif italic font-black tracking-[1em] gold-text focus:border-[#c5a059]/30 outline-none transition-all placeholder:tracking-widest placeholder:text-white/5 placeholder:font-sans placeholder:font-black placeholder:text-xs shadow-inner"
              />
              <div className="grid grid-cols-2 gap-6">
                 <button className="py-5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full font-black text-[10px] uppercase tracking-[0.4em] italic shadow-2xl hover:bg-emerald-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shadow-inner" /> Iniciar
                 </button>
                 <button className="py-5 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-full font-black text-[10px] uppercase tracking-[0.4em] italic shadow-2xl hover:bg-rose-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-3">
                    <XCircle className="w-5 h-5 shadow-inner" /> Finalizar
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
