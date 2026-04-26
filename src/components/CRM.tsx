import React, { useState } from 'react';
import { MoreHorizontal, Plus, Search, MessageCircle, Instagram, Facebook } from 'lucide-react';
import { motion, Reorder } from 'motion/react';

interface Lead {
  id: string;
  name: string;
  source: 'whatsapp' | 'instagram' | 'facebook';
  value: number;
}

interface Column {
  id: string;
  title: string;
  leads: Lead[];
}

const INITIAL_DATA: Column[] = [
  { id: 'novo', title: 'Novo Lead', leads: [
    { id: 'l1', name: 'Marina Silva', source: 'whatsapp', value: 450 },
    { id: 'l2', name: 'João Paulo', source: 'instagram', value: 1200 },
  ]},
  { id: 'contato', title: 'Em Contato', leads: [
    { id: 'l3', name: 'Boutique XYZ', source: 'facebook', value: 3000 },
  ]},
  { id: 'proposta', title: 'Proposta', leads: [
    { id: 'l4', name: 'Arthur Lima', source: 'whatsapp', value: 890 },
  ]},
  { id: 'fechado', title: 'Fechado ✓', leads: [
    { id: 'l5', name: 'Espaço Beleza', source: 'instagram', value: 5600 },
  ]},
];

export default function CRM() {
  const [columns, setColumns] = useState(INITIAL_DATA);

  return (
    <div className="flex flex-col h-full gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1 max-w-md">
           <div className="relative flex-1">
             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
             <input 
               type="text" 
               placeholder="Filtrar por nome ou canal..."
               className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
             />
           </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-lg shadow-blue-200">
          <Plus className="w-4 h-4" />
          Novo Lead
        </button>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4 flex-1">
        {columns.map(column => (
          <div key={column.id} className="min-w-[280px] w-80 bg-slate-100/50 rounded-[2rem] p-4 flex flex-col gap-4 border border-slate-200/50">
             <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                   <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-600">{column.title}</h3>
                   <span className="w-5 h-5 bg-white border border-slate-200 rounded-full flex items-center justify-center text-[10px] font-black text-slate-400">{column.leads.length}</span>
                </div>
                <button className="p-1 hover:bg-white rounded-lg text-slate-400"><MoreHorizontal className="w-4 h-4" /></button>
             </div>

             <div className="flex-1 flex flex-col gap-3">
                {column.leads.map(lead => (
                  <motion.div 
                    key={lead.id}
                    whileHover={{ y: -2 }}
                    className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col gap-3 cursor-grab active:cursor-grabbing group transition-all hover:border-blue-300"
                  >
                     <div className="flex justify-between items-start">
                        <div className="flex items-center gap-2">
                           {lead.source === 'whatsapp' && <MessageCircle className="w-3.5 h-3.5 text-emerald-500" />}
                           {lead.source === 'instagram' && <Instagram className="w-3.5 h-3.5 text-pink-600" />}
                           {lead.source === 'facebook' && <Facebook className="w-3.5 h-3.5 text-blue-600" />}
                           <span className="text-[9px] font-black uppercase text-slate-400 tracking-tighter">{lead.source}</span>
                        </div>
                        <button className="p-1 opacity-0 group-hover:opacity-100 transition-opacity">
                           <MoreHorizontal className="w-4 h-4 text-slate-300" />
                        </button>
                     </div>
                     
                     <div>
                        <h4 className="text-sm font-bold text-slate-900">{lead.name}</h4>
                        <p className="text-[10px] font-black text-slate-400">R$ {lead.value.toFixed(2)}</p>
                     </div>

                     <div className="flex gap-2 mt-2">
                        <button className="flex-1 py-1.5 bg-slate-50 rounded-lg text-[9px] font-black uppercase tracking-widest text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all">Ver Detalhes</button>
                        <button className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg"><MessageCircle className="w-3.5 h-3.5" /></button>
                     </div>
                  </motion.div>
                ))}
                
                <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center gap-2 text-slate-300 hover:text-blue-600 hover:border-blue-200 hover:bg-blue-50/20 transition-all group">
                   <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em]">Adicionar</span>
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
