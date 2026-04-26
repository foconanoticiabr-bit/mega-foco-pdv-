import React, { useState } from 'react';
import { Package, Search, Filter, Plus, Edit3, Trash2, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
}

const STOCK_DATA: Product[] = [
  { id: '1', name: 'Shampoo Pro Liso', category: 'Beleza', stock: 15, minStock: 5, price: 120.00 },
  { id: '2', name: 'Condicionador Pro', category: 'Beleza', stock: 12, minStock: 5, price: 95.00 },
  { id: '3', name: 'Mascara Hidratação', category: 'Beleza', stock: 3, minStock: 5, price: 150.00 },
  { id: '4', name: 'Calça Jeans Skinny', category: 'Moda', stock: 8, minStock: 2, price: 180.00 },
  { id: '5', name: 'Camiseta Algodão', category: 'Moda', stock: 25, minStock: 10, price: 45.00 },
  { id: '6', name: 'Tênis Running', category: 'Calçados', stock: 2, minStock: 5, price: 320.00 },
  { id: '7', name: 'Óleo Repair 60ml', category: 'Beleza', stock: 0, minStock: 5, price: 85.00 },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = STOCK_DATA.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 h-full flex flex-col">
       <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-6 flex-1 max-w-xl">
             <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#c5a059] w-4 h-4 transition-colors" />
                <input 
                   type="text" 
                   placeholder="MAPPING ELITE: Pesquisar coleções..." 
                   className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] italic text-white focus:border-[#c5a059]/30 outline-none transition-all placeholder:text-white/10"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button className="p-4 bg-white/5 border border-white/5 rounded-2xl text-white/20 hover:text-[#c5a059] hover:border-[#c5a059]/30 transition-all luxury-gradient">
                <Filter className="w-5 h-5" />
             </button>
          </div>
          <button className="px-8 py-4 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-3 hover:scale-[1.05] transition-all shadow-2xl shadow-[#c5a059]/20 italic">
             <Plus className="w-5 h-5" />
             Novo Artefato
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 shrink-0">
          {[
            { label: 'Curadoria Total', value: '842', sub: 'Em 18 Segmentos Elite', color: '#c5a059' },
            { label: 'Valor de Coleção', value: 'R$ 42.150', sub: 'Lastro Operacional', color: '#3b82f6' },
            { label: 'Reposição Urgente', value: '4', sub: 'Protocolo de Escassez', color: '#f43f5e' },
          ].map((stat, i) => (
             <div key={i} className="luxury-card p-10 border-white/5 luxury-gradient relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
                <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em] mb-3 italic">{stat.label}</p>
                <h4 className={`text-3xl font-serif italic font-black tracking-tighter ${stat.label === 'Reposição Urgente' ? 'text-rose-500' : 'gold-text'}`}>{stat.value}</h4>
                <p className="text-[9px] font-bold text-white/10 uppercase tracking-widest mt-2 italic">{stat.sub}</p>
             </div>
          ))}
       </div>

       <div className="luxury-card border-white/5 overflow-hidden flex flex-col flex-1 luxury-gradient">
          <div className="overflow-x-auto">
             <table className="w-full text-left uppercase text-[9px] tracking-[0.2em] font-black">
                <thead>
                   <tr className="bg-black/20 border-b border-white/5">
                      <th className="px-10 py-6 text-white/30 italic">Designação do Ativo</th>
                      <th className="px-10 py-6 text-white/30 italic">Segmento</th>
                      <th className="px-10 py-6 text-white/30 italic text-center">Status</th>
                      <th className="px-10 py-6 text-white/30 italic text-center">Disponibilidade</th>
                      <th className="px-10 py-6 text-white/30 italic text-right">Valor Unitário</th>
                      <th className="px-10 py-6 text-white/30 italic text-center">Ações</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-bold italic">
                   {filtered.map(p => {
                      const isLow = p.stock <= p.minStock && p.stock > 0;
                      const isOut = p.stock === 0;
                      return (
                        <tr key={p.id} className="hover:bg-white/5 transition-all duration-500 group">
                           <td className="px-10 py-8">
                              <div className="flex items-center gap-5">
                                 <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-white/10 group-hover:text-[#c5a059] group-hover:border-[#c5a059]/20 transition-all duration-500">
                                    <Package className="w-6 h-6" />
                                 </div>
                                 <span className="text-sm font-serif font-black text-white group-hover:text-[#c5a059] transition-colors">{p.name}</span>
                              </div>
                           </td>
                           <td className="px-10 py-8">
                              <span className="text-[9px] font-black text-white/30 border border-white/10 px-3 py-1 rounded-full">{p.category}</span>
                           </td>
                           <td className="px-10 py-8 text-center">
                              {isOut ? (
                                <div className="inline-flex items-center gap-2 text-rose-500 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full">
                                   <AlertCircle className="w-4 h-4" />
                                   <span className="text-[8px] font-black uppercase tracking-widest">Esgotado</span>
                                </div>
                              ) : isLow ? (
                                <div className="inline-flex items-center gap-2 text-amber-500 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                                   <AlertCircle className="w-4 h-4" />
                                   <span className="text-[8px] font-black uppercase tracking-widest">Protocolo Baixo</span>
                                </div>
                              ) : (
                                <div className="inline-flex items-center gap-2 text-emerald-500 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                   <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                   <span className="text-[8px] font-black uppercase tracking-widest">Ativo Elite</span>
                                </div>
                              )}
                           </td>
                           <td className="px-10 py-8">
                              <div className="flex flex-col items-center">
                                 <span className={`text-sm font-serif font-black ${isOut ? 'text-rose-500' : isLow ? 'text-amber-500' : 'text-white'}`}>{p.stock} UN.</span>
                                 <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest leading-none mt-1">Min: {p.minStock}</span>
                              </div>
                           </td>
                           <td className="px-10 py-8 text-right font-serif font-black text-lg gold-text tracking-tighter">
                              R$ {p.price.toFixed(2)}
                           </td>
                           <td className="px-10 py-8 text-center">
                              <div className="flex items-center justify-center gap-4">
                                 <button className="p-3 bg-white/5 hover:text-[#c5a059] border border-white/5 hover:border-[#c5a059]/20 rounded-xl transition-all duration-500"><Edit3 className="w-4 h-4" /></button>
                                 <button className="p-3 bg-white/5 hover:text-rose-500 border border-white/5 hover:border-rose-500/20 rounded-xl transition-all duration-500"><Trash2 className="w-4 h-4" /></button>
                              </div>
                           </td>
                        </tr>
                      );
                   })}
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
}
