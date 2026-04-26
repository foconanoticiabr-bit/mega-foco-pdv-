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
    <div className="space-y-8 h-full flex flex-col">
       <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 flex-1 max-w-md">
             <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input 
                   type="text" 
                   placeholder="Buscar produtos..." 
                   className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-bold focus:ring-2 focus:ring-blue-500 outline-none"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button className="p-3 bg-white border border-slate-200 rounded-2xl text-slate-400 hover:text-blue-600 transition-all">
                <Filter className="w-5 h-5" />
             </button>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-blue-200">
             <Plus className="w-5 h-5" />
             Novo Produto
          </button>
       </div>

       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
          {[
            { label: 'Total Itens', value: '842', sub: 'Em 18 categorias', color: 'blue' },
            { label: 'Valor em Estoque', value: 'R$ 42.150', sub: 'Preço de Custo', color: 'slate' },
            { label: 'Reposição Urgente', value: '4', sub: 'Abaixo do mínimo', color: 'rose' },
          ].map((stat, i) => (
             <div key={i} className={`bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden relative`}>
                <div className={`absolute top-0 left-0 w-1 pt-full bg-${stat.color}-500/20`}></div>
                <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{stat.label}</p>
                <h4 className={`text-2xl font-black tracking-tighter ${stat.color === 'rose' ? 'text-rose-600' : 'text-slate-900'}`}>{stat.value}</h4>
                <p className="text-[10px] font-bold text-slate-400 opacity-60 uppercase">{stat.sub}</p>
             </div>
          ))}
       </div>

       <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm overflow-hidden flex flex-col flex-1">
          <div className="overflow-x-auto">
             <table className="w-full text-left border-collapse">
                <thead>
                   <tr className="bg-slate-50/50 border-b border-slate-100">
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Produto</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Categoria</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Quantidade</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Preço</th>
                      <th className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Ações</th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                   {filtered.map(p => {
                      const isLow = p.stock <= p.minStock && p.stock > 0;
                      const isOut = p.stock === 0;
                      return (
                        <tr key={p.id} className="hover:bg-slate-50/50 transition-all group">
                           <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-300">
                                    <Package className="w-5 h-5" />
                                 </div>
                                 <span className="text-sm font-bold text-slate-900">{p.name}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4">
                              <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter bg-slate-100 px-2 py-1 rounded-md">{p.category}</span>
                           </td>
                           <td className="px-6 py-4">
                              {isOut ? (
                                <div className="flex items-center gap-1.5 text-rose-600">
                                   <AlertCircle className="w-4 h-4" />
                                   <span className="text-[10px] font-black uppercase tracking-tighter">Esgotado</span>
                                </div>
                              ) : isLow ? (
                                <div className="flex items-center gap-1.5 text-amber-600">
                                   <AlertCircle className="w-4 h-4" />
                                   <span className="text-[10px] font-black uppercase tracking-tighter">Estoque Baixo</span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5 text-emerald-600">
                                   <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                   <span className="text-[10px] font-black uppercase tracking-tighter">Ativo</span>
                                </div>
                              )}
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex flex-col items-center">
                                 <span className={`text-sm font-black ${isOut ? 'text-rose-600' : isLow ? 'text-amber-600' : 'text-slate-900'}`}>{p.stock} un.</span>
                                 <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">Min: {p.minStock}</span>
                              </div>
                           </td>
                           <td className="px-6 py-4 text-right">
                              <span className="text-sm font-black text-slate-900">R$ {p.price.toFixed(2)}</span>
                           </td>
                           <td className="px-6 py-4 text-center">
                              <div className="flex items-center justify-center gap-2">
                                 <button className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-xl transition-all"><Edit3 className="w-4 h-4" /></button>
                                 <button className="p-2 hover:bg-rose-50 hover:text-rose-600 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
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
