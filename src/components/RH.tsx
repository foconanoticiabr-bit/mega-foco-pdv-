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
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex bg-white p-1 rounded-2xl border border-slate-200 shadow-sm">
          <button 
            onClick={() => setActiveTab('employees')}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'employees' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Funcionários
          </button>
          <button 
            onClick={() => setActiveTab('ponto')}
            className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'ponto' ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'text-slate-400 hover:text-slate-600'}`}
          >
            Relógio de Ponto
          </button>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-blue-200">
          <UserPlus className="w-5 h-5" />
          Novo Registro
        </button>
      </div>

      {activeTab === 'employees' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EMPLOYEES.map((employee) => (
            <div key={employee.id} className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm group hover:border-blue-300 transition-all">
              <div className="flex justify-between items-start mb-6">
                <div className="w-16 h-16 bg-slate-100 rounded-3xl flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-500 transition-colors">
                  <span className="text-xl font-black">{employee.name.charAt(0)}</span>
                </div>
                <div className="flex flex-col items-end">
                   <div className={`flex items-center gap-1.5 p-1 px-2 rounded-full border ${employee.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : employee.status === 'on_break' ? 'bg-amber-50 text-amber-600 border-amber-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${employee.status === 'active' ? 'bg-emerald-500' : employee.status === 'on_break' ? 'bg-amber-500' : 'bg-slate-300'}`}></div>
                      <span className="text-[8px] font-black uppercase tracking-widest">{employee.status.replace('_', ' ')}</span>
                   </div>
                   <button className="mt-4 p-1 text-slate-300 hover:text-slate-900 transition-colors"><MoreVertical className="w-4 h-4" /></button>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-black text-slate-900 tracking-tight">{employee.name}</h4>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">{employee.role}</p>
                
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">Entrada Hoje</p>
                    <p className="text-sm font-bold text-slate-900">{employee.lastClockIn}</p>
                  </div>
                  <div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">Ações</p>
                    <div className="flex gap-2">
                       <button className="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all"><Calendar className="w-3.5 h-3.5" /></button>
                       <button className="w-6 h-6 rounded-lg bg-slate-50 text-slate-400 flex items-center justify-center hover:bg-slate-900 hover:text-white transition-all"><Briefcase className="w-3.5 h-3.5" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm flex flex-col p-8 items-center justify-center min-h-[400px]">
           <div className="w-32 h-32 bg-blue-50 rounded-full flex items-center justify-center mb-8 relative">
              <Clock className="w-12 h-12 text-blue-600 animate-pulse" />
           </div>
           <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-2">Relógio Digital</h3>
           <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.4em] mb-12">Ponto Centralizado Loja #012</p>
           
           <div className="max-w-md w-full space-y-4">
              <input 
                type="password" 
                placeholder="Insira seu PIN de acesso" 
                className="w-full py-4 px-6 bg-slate-50 border border-slate-200 rounded-2xl text-center text-xl font-bold font-mono tracking-[1em] focus:ring-4 focus:ring-blue-100 outline-none"
              />
              <div className="grid grid-cols-2 gap-4">
                 <button className="py-4 bg-emerald-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-emerald-200 flex items-center justify-center gap-2">
                    <CheckCircle2 className="w-5 h-5" /> Entrar
                 </button>
                 <button className="py-4 bg-rose-600 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-rose-200 flex items-center justify-center gap-2">
                    <XCircle className="w-5 h-5" /> Sair
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
