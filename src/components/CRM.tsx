import React, { useState, useEffect } from 'react';
import { MoreHorizontal, Plus, Search, MessageCircle, Instagram, Facebook, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { supabase } from '../lib/supabase';

interface Lead {
  id: string;
  name: string;
  source: 'whatsapp' | 'instagram' | 'facebook';
  status: string;
  value: number;
}

interface Column {
  id: string;
  title: string;
  leads: Lead[];
}

const INITIAL_DATA: Column[] = [
  { id: 'novo', title: 'Novo Lead', leads: [
    { id: 'l1', name: 'Marina Silva', source: 'whatsapp', status: 'novo', value: 450 },
    { id: 'l2', name: 'João Paulo', source: 'instagram', status: 'novo', value: 1200 },
  ]},
  { id: 'contato', title: 'Em Contato', leads: [
    { id: 'l3', name: 'Boutique XYZ', source: 'facebook', status: 'contato', value: 3000 },
  ]},
  { id: 'proposta', title: 'Proposta', leads: [
    { id: 'l4', name: 'Arthur Lima', source: 'whatsapp', status: 'proposta', value: 890 },
  ]},
  { id: 'fechado', title: 'Fechado ✓', leads: [
    { id: 'l5', name: 'Espaço Beleza', source: 'instagram', status: 'fechado', value: 5600 },
  ]},
];

export default function CRM() {
  const [columns, setColumns] = useState(INITIAL_DATA);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('leads')
        .select('*');
      
      if (error) {
        if (error.code === 'PGRST116' || error.message.includes('relation "leads" does not exist')) {
          console.log('Supabase table "leads" not found. Using mock data.');
          setLoading(false);
          return;
        }
        throw error;
      }

      if (data && data.length > 0) {
        const sortedColumns = INITIAL_DATA.map(col => ({
          ...col,
          leads: data.filter((l: any) => l.status === col.id)
        }));
        setColumns(sortedColumns);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full gap-8">
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-6 shrink-0">
        <div className="flex items-center gap-4 sm:gap-6 flex-1 max-w-xl">
           <div className="relative flex-1 group">
             <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#c5a059] w-4 h-4 transition-colors" />
             <input 
               type="text" 
               placeholder="PESQUISAR CONEXÕES..."
               className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] italic text-white outline-none focus:border-[#c5a059]/30 transition-all placeholder:text-white/10"
             />
           </div>
           {loading && <Loader2 className="w-5 h-5 text-[#c5a059] animate-spin" />}
        </div>
        <button className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-[1.05] transition-all shadow-2xl shadow-[#c5a059]/20 italic shrink-0">
          <Plus className="w-5 h-5" />
          Capturar Lead
        </button>
      </div>

      <div className="flex gap-6 sm:gap-8 overflow-x-auto pb-6 flex-1 custom-scrollbar no-scrollbar">
        {columns.map(column => (
          <div key={column.id} className="min-w-[280px] sm:min-w-[320px] w-80 sm:w-96 bg-white/5 rounded-[2.5rem] sm:rounded-[3rem] p-6 flex flex-col gap-6 border border-white/5 luxury-gradient">
             <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-4">
                   <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">{column.title}</h3>
                   <span className="w-6 h-6 bg-[#c5a059]/10 border border-[#c5a059]/20 rounded-full flex items-center justify-center text-[10px] font-black text-[#c5a059] italic">{column.leads.length}</span>
                </div>
                <button className="p-2 hover:bg-white/5 rounded-xl text-white/20 hover:text-white transition-all"><MoreHorizontal className="w-5 h-5" /></button>
             </div>

             <div className="flex-1 flex flex-col gap-4">
                {column.leads.map(lead => (
                  <motion.div 
                    key={lead.id}
                    whileHover={{ y: -5 }}
                    className="luxury-card p-6 border-white/5 flex flex-col gap-5 cursor-grab active:cursor-grabbing group transition-all hover:border-[#c5a059]/30 luxury-gradient"
                  >
                     <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                           <div className="w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                              {lead.source === 'whatsapp' && <MessageCircle className="w-4 h-4 text-emerald-500" />}
                              {lead.source === 'instagram' && <Instagram className="w-4 h-4 text-[#c5a059]" />}
                              {lead.source === 'facebook' && <Facebook className="w-4 h-4 text-[#c5a059]" />}
                           </div>
                           <span className="text-[9px] font-black uppercase text-white/20 tracking-[0.2em] italic">{lead.source} stream</span>
                        </div>
                     </div>
                     
                     <div>
                        <h4 className="text-lg font-serif italic font-bold text-white tracking-tight leading-none mb-2">{lead.name}</h4>
                        <p className="text-[10px] font-black gold-text tracking-[0.3em] uppercase italic">Poder de Compra: R$ {lead.value.toFixed(2)}</p>
                     </div>

                     <div className="flex gap-3">
                        <button className="flex-1 py-3 bg-white/5 rounded-xl text-[9px] font-black uppercase tracking-[0.3em] text-white/40 hover:bg-white/10 hover:text-white transition-all duration-500 italic border border-white/5">Dossiê</button>
                        <button className="w-12 h-10 bg-[#c5a059]/10 text-[#c5a059] rounded-xl flex items-center justify-center border border-[#c5a059]/20 hover:bg-[#c5a059] hover:text-[#0a0e17] transition-all duration-500"><MessageCircle className="w-5 h-5 shadow-inner" /></button>
                     </div>
                  </motion.div>
                ))}
                
                <button className="w-full py-6 border-2 border-dashed border-white/5 rounded-[2rem] flex items-center justify-center gap-3 text-white/10 hover:text-[#c5a059] hover:border-[#c5a059]/20 hover:bg-[#c5a059]/5 transition-all group duration-500">
                   <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] italic">Vincular Ativo</span>
                </button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
