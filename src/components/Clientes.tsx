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
    <div className="space-y-12">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 sm:gap-8">
        <div className="flex items-center gap-4 sm:gap-6 flex-1 max-w-xl">
           <div className="relative flex-1 group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#c5a059] w-5 h-5 transition-colors" />
             <input 
               type="text" 
               placeholder="PESQUISAR REDE DE CONTATOS..."
               className="w-full pl-12 sm:pl-16 pr-6 py-4 sm:py-6 bg-white/5 border border-white/5 rounded-full shadow-2xl focus:border-[#c5a059]/30 outline-none font-bold text-[9px] sm:text-xs uppercase tracking-[0.2em] text-white placeholder:text-white/10 transition-all italic"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <button className="p-4 sm:p-5 bg-white/5 border border-white/5 rounded-2xl text-white/20 hover:text-[#c5a059] hover:border-[#c5a059]/30 transition-all luxury-gradient shrink-0">
             <Filter className="w-5 h-5 sm:w-6 sm:h-6" />
           </button>
        </div>
        <button className="w-full sm:w-auto px-8 sm:px-10 py-5 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 shadow-2xl shadow-[#c5a059]/20 hover:scale-[1.02] transition-all italic shrink-0">
          <Plus className="w-5 h-5" />
          Novo Ativo
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((customer) => (
          <div key={customer.id} className="luxury-card p-10 border-white/5 hover:border-[#c5a059]/30 transition-all duration-700 flex flex-col h-full relative overflow-hidden group luxury-gradient">
             {/* Category Badge */}
             <div className={`absolute top-0 right-0 px-8 py-3 rounded-bl-[2rem] text-[9px] font-black uppercase tracking-[0.3em] italic shadow-2xl border-l border-b border-white/5 ${customer.category === 'platinum' ? 'bg-[#c5a059] text-[#0a0e17]' : customer.category === 'gold' ? 'bg-amber-400/10 text-amber-400 border-amber-400/20' : 'bg-white/5 text-white/40'}`}>
                {customer.category} elite
             </div>

             <div className="flex items-center gap-6 mb-10">
                <div className="w-20 h-20 bg-white/5 rounded-[2rem] flex items-center justify-center text-white/10 font-serif italic font-black text-3xl border border-white/10 group-hover:bg-[#c5a059] group-hover:text-[#0a0e17] group-hover:border-[#c5a059] transition-all duration-700 shadow-inner">
                   {customer.name.charAt(0)}
                </div>
                <div>
                   <h4 className="text-2xl font-serif italic font-black text-white tracking-tighter group-hover:gold-text transition-all leading-none mb-2">{customer.name}</h4>
                   <p className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.3em] flex items-center gap-2 italic">
                      <Gift className="w-3.5 h-3.5" />
                      {customer.points} Lotes Fidelidade
                   </p>
                </div>
             </div>

             <div className="space-y-4 mb-10">
                <div className="flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-widest italic group-hover:text-white/60 transition-colors">
                   <Phone className="w-4 h-4 text-[#c5a059]" />
                   {customer.phone}
                </div>
                <div className="flex items-center gap-4 text-white/40 text-[10px] font-black uppercase tracking-widest italic group-hover:text-white/60 transition-colors">
                   <Mail className="w-4 h-4 text-[#c5a059]" />
                   <span className="truncate">{customer.email}</span>
                </div>
             </div>

             <div className="mt-auto grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
                <div>
                   <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-2 italic">Volume Alocado</p>
                   <p className="text-lg font-serif italic font-black gold-text tracking-tighter">R$ {customer.totalSpent.toFixed(2)}</p>
                </div>
                <div className="text-right">
                   <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-2 italic">Histórico Recente</p>
                   <p className="text-xs font-bold text-white/60 uppercase tracking-widest italic">{customer.lastVisit}</p>
                </div>
             </div>

             <div className="flex gap-3 mt-10">
                <button className="flex-1 py-4 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:bg-white/10 hover:text-white transition-all duration-500 flex items-center justify-center gap-3 italic">
                   <History className="w-4 h-4" /> Dossiê Completo
                </button>
                <button className="w-14 h-14 bg-[#c5a059]/10 text-[#c5a059] border border-[#c5a059]/20 rounded-2xl flex items-center justify-center hover:bg-[#c5a059] hover:text-[#0a0e17] transition-all duration-500 shadow-lg shadow-[#c5a059]/10">
                   <MoreHorizontal className="w-5 h-5" />
                </button>
             </div>
          </div>
        ))}

        <button className="h-full min-h-[350px] border-4 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center gap-6 text-white/10 hover:text-[#c5a059] hover:border-[#c5a059]/20 hover:bg-[#c5a059]/5 transition-all duration-700 group luxury-gradient">
           <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center group-hover:bg-[#c5a059]/10 transition-all duration-700 border border-white/5 group-hover:border-[#c5a059]/20">
              <Plus className="w-10 h-10 group-hover:rotate-90 transition-transform duration-700" />
           </div>
           <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">Captura Manual Ativos</span>
        </button>
      </div>
    </div>
  );
}
