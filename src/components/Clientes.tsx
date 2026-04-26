import React, { useState } from 'react';
import { Users, Search, Filter, Plus, Star, Phone, Mail, MapPin, MoreHorizontal, History, Gift } from 'lucide-react';

interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: number;
  lastVisit: string;
  points: number;
  category: 'platinum' | 'gold' | 'silver';
}

const CUSTOMERS: Customer[] = [
  { id: '1', name: 'Marina Silva', email: 'marina@email.com', phone: '(11) 98765-4321', totalSpent: 4500.00, lastVisit: 'Há 2 dias', points: 150, category: 'platinum' },
  { id: '2', name: 'João Paulo', email: 'joao@email.com', phone: '(11) 91234-5678', totalSpent: 1200.00, lastVisit: 'Há 1 semana', points: 45, category: 'silver' },
  { id: '3', name: 'Arthur Lima', email: 'arthur@email.com', phone: '(11) 97777-6666', totalSpent: 890.00, lastVisit: 'Hoje', points: 20, category: 'silver' },
  { id: '4', name: 'Juliana Melo', email: 'juliana@email.com', phone: '(11) 95555-4444', totalSpent: 2800.00, lastVisit: 'Há 3 dias', points: 80, category: 'gold' },
  { id: '5', name: 'Ricardo Santos', email: 'ricardo@email.com', phone: '(11) 94444-3333', totalSpent: 150.00, lastVisit: 'Há 1 mês', points: 5, category: 'silver' },
];

export default function Clientes() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex items-center gap-4 flex-1 max-w-md">
           <div className="relative flex-1">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
             <input 
               type="text" 
               placeholder="Buscar cliente por nome, e-mail ou telefone..."
               className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-[1.5rem] shadow-sm outline-none focus:ring-2 focus:ring-blue-500 font-bold text-sm"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <button className="p-4 bg-white border border-slate-200 rounded-[1.5rem] text-slate-400 hover:text-blue-600 transition-all">
             <Filter className="w-5 h-5" />
           </button>
        </div>
        <button className="px-8 py-4 bg-blue-600 text-white rounded-[1.5rem] text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-blue-200 hover:scale-105 active:scale-95 transition-all">
          <Plus className="w-5 h-5" />
          Novo Cliente
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((customer) => (
          <div key={customer.id} className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm group hover:border-blue-500 transition-all flex flex-col h-full relative overflow-hidden">
             {/* Category Badge */}
             <div className={`absolute top-0 right-0 px-6 py-2 rounded-bl-[1.5rem] text-[9px] font-black uppercase tracking-[0.2em] shadow-sm ${customer.category === 'platinum' ? 'bg-slate-900 text-slate-200' : customer.category === 'gold' ? 'bg-amber-400 text-amber-900' : 'bg-slate-100 text-slate-400'}`}>
                {customer.category}
             </div>

             <div className="flex items-center gap-5 mb-8">
                <div className="w-16 h-16 bg-slate-50 rounded-[1.5rem] flex items-center justify-center text-slate-200 font-black text-2xl border border-slate-100 group-hover:bg-blue-50 group-hover:text-blue-500 group-hover:border-blue-100 transition-all">
                   {customer.name.charAt(0)}
                </div>
                <div>
                   <h4 className="text-xl font-black text-slate-900 tracking-tighter">{customer.name}</h4>
                   <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest flex items-center gap-1.5 mt-1">
                      <Gift className="w-3.5 h-3.5" />
                      {customer.points} Pontos Fidelidade
                   </p>
                </div>
             </div>

             <div className="space-y-3 mb-8">
                <div className="flex items-center gap-3 text-slate-500 text-xs font-medium">
                   <Phone className="w-4 h-4 text-slate-300" />
                   {customer.phone}
                </div>
                <div className="flex items-center gap-3 text-slate-500 text-xs font-medium">
                   <Mail className="w-4 h-4 text-slate-300" />
                   <span className="truncate">{customer.email}</span>
                </div>
             </div>

             <div className="mt-auto grid grid-cols-2 gap-4 pt-6 border-t border-slate-100">
                <div>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Gasto</p>
                  <p className="text-sm font-black text-slate-900">R$ {customer.totalSpent.toFixed(2)}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Última Visita</p>
                  <p className="text-sm font-bold text-slate-600">{customer.lastVisit}</p>
                </div>
             </div>

             <div className="flex gap-2 mt-6">
                <button className="flex-1 py-3 bg-slate-50 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-500 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center gap-2">
                   <History className="w-3.5 h-3.5" /> Histórico
                </button>
                <button className="p-3 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all">
                   <MoreHorizontal className="w-4 h-4" />
                </button>
             </div>
          </div>
        ))}

        <button className="h-full min-h-[300px] border-4 border-dashed border-slate-100 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-slate-200 hover:text-blue-200 hover:border-blue-50 transition-all group">
           <div className="p-6 bg-slate-50 rounded-full group-hover:bg-blue-50 transition-colors">
              <Plus className="w-10 h-10" />
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.4em]">Adicionar Manual</span>
        </button>
      </div>
    </div>
  );
}
