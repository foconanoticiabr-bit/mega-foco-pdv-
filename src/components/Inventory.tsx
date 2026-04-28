import React, { useState } from 'react';
import { Package, Search, Filter, Plus, Edit3, Trash2, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  price: number;
  barcode?: string;
}

const STOCK_DATA: Product[] = [
  { id: '1', name: 'Shampoo Pro Liso', category: 'Beleza', stock: 15, minStock: 5, price: 120.00, barcode: '7891234567890' },
  { id: '2', name: 'Condicionador Pro', category: 'Beleza', stock: 12, minStock: 5, price: 95.00, barcode: '7890123456789' },
  { id: '3', name: 'Mascara Hidratação', category: 'Beleza', stock: 3, minStock: 5, price: 150.00, barcode: '7892345678901' },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>(STOCK_DATA);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: '',
    stock: 0,
    minStock: 0,
    price: 0,
    barcode: ''
  });

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    
    const productToAdd: Product = {
      id: Math.random().toString(36).substr(2, 9),
      name: newProduct.name!,
      category: newProduct.category || 'Geral',
      stock: Number(newProduct.stock) || 0,
      minStock: Number(newProduct.minStock) || 0,
      price: Number(newProduct.price) || 0,
      barcode: newProduct.barcode || ''
    };

    setProducts(prev => [productToAdd, ...prev]);
    setShowAddModal(false);
    setNewProduct({ name: '', category: '', stock: 0, minStock: 0, price: 0, barcode: '' });
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.barcode && p.barcode.includes(searchTerm))
  );

  return (
    <div className="space-y-6 sm:space-y-10 h-full flex flex-col relative">
       {/* Modal Adicionar Produto */}
       {showAddModal && (
         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="w-full max-w-2xl bg-[#0a0e17] border border-white/10 sm:rounded-[3rem] rounded-[2rem] p-6 sm:p-10 luxury-gradient shadow-2xl my-8">
               <h3 className="text-xl sm:text-2xl font-serif font-black gold-text italic mb-6 sm:mb-8 uppercase tracking-tighter">Registrar Novo Ativo</h3>
               
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-10">
                  <div className="space-y-2">
                     <label className="text-[9px] sm:text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">Nome do Produto</label>
                     <input 
                       type="text" 
                       className="w-full bg-white/5 border border-white/5 p-4 rounded-xl sm:rounded-2xl text-white outline-none focus:border-[#c5a059]/30 text-xs"
                       value={newProduct.name}
                       onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] sm:text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">Código de Barras</label>
                     <input 
                       type="text" 
                       placeholder="EAN-13 / UPC"
                       className="w-full bg-white/5 border border-white/5 p-4 rounded-xl sm:rounded-2xl text-white outline-none focus:border-[#c5a059]/30 font-mono text-xs"
                       value={newProduct.barcode}
                       onChange={e => setNewProduct({...newProduct, barcode: e.target.value})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] sm:text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">Categoria</label>
                     <input 
                       type="text" 
                       className="w-full bg-white/5 border border-white/5 p-4 rounded-xl sm:rounded-2xl text-white outline-none focus:border-[#c5a059]/30 text-xs"
                       value={newProduct.category}
                       onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] sm:text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">Preço de Venda</label>
                     <input 
                       type="number" 
                       className="w-full bg-white/5 border border-white/5 p-4 rounded-xl sm:rounded-2xl text-white outline-none focus:border-[#c5a059]/30 text-xs"
                       value={newProduct.price}
                       onChange={e => setNewProduct({...newProduct, price: parseFloat(e.target.value)})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] sm:text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">Estoque Atual</label>
                     <input 
                       type="number" 
                       className="w-full bg-white/5 border border-white/5 p-4 rounded-xl sm:rounded-2xl text-white outline-none focus:border-[#c5a059]/30 text-xs"
                       value={newProduct.stock}
                       onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] sm:text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">Estoque Mínimo</label>
                     <input 
                       type="number" 
                       className="w-full bg-white/5 border border-white/5 p-4 rounded-xl sm:rounded-2xl text-white outline-none focus:border-[#c5a059]/30 text-xs"
                       value={newProduct.minStock}
                       onChange={e => setNewProduct({...newProduct, minStock: parseInt(e.target.value)})}
                     />
                  </div>
               </div>

               <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 py-4 border border-white/10 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:bg-white/5 transition-all"
                  >
                    Abortar
                  </button>
                  <button 
                    onClick={handleAddProduct}
                    className="flex-1 py-4 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-[#c5a059]/20 hover:scale-[1.02] transition-all"
                  >
                    Confirmar Ativo
                  </button>
               </div>
            </div>
         </div>
       )}

       <div className="flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-6 w-full sm:flex-1 sm:max-w-xl">
             <div className="relative flex-1 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#c5a059] w-4 h-4 transition-colors" />
                <input 
                   type="text" 
                   placeholder="PESQUISAR..." 
                   className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] italic text-white focus:border-[#c5a059]/30 outline-none transition-all placeholder:text-white/10"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
          </div>
          <button 
            onClick={() => setShowAddModal(true)}
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:scale-[1.05] transition-all shadow-2xl shadow-[#c5a059]/20 italic"
          >
             <Plus className="w-5 h-5" />
             Novo Ativo
          </button>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 shrink-0">
          {[
            { label: 'Curadoria Total', value: '842', sub: 'Em 18 Segmentos Elite', color: '#c5a059' },
            { label: 'Valor de Coleção', value: 'R$ 42.150', sub: 'Lastro Operacional', color: '#94a3b8' },
            { label: 'Reposição Urgente', value: '4', sub: 'Protocolo de Escassez', color: '#f43f5e' },
          ].map((stat, i) => (
             <div key={i} className="luxury-card p-6 sm:p-10 border-white/5 luxury-gradient relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
                <p className="text-[9px] font-black uppercase text-white/30 tracking-[0.4em] mb-2 sm:mb-3 italic">{stat.label}</p>
                <h4 className={`text-2xl sm:text-3xl font-serif italic font-black tracking-tighter ${stat.label === 'Reposição Urgente' ? 'text-rose-500' : 'gold-text'}`}>{stat.value}</h4>
                <p className="text-[8px] font-bold text-white/10 uppercase tracking-widest mt-1 sm:mt-2 italic">{stat.sub}</p>
             </div>
          ))}
       </div>

       <div className="luxury-card border-white/5 overflow-hidden flex flex-col flex-1 luxury-gradient">
          <div className="overflow-x-auto no-scrollbar">
             <table className="w-full text-left uppercase text-[9px] tracking-[0.2em] font-black min-w-[1000px]">
                <thead>
                   <tr className="bg-black/20 border-b border-white/5">
                      <th className="px-6 sm:px-10 py-5 sm:py-6 text-white/30 italic">Designação do Ativo</th>
                      <th className="px-6 sm:px-10 py-5 sm:py-6 text-white/30 italic">Cód. Barras</th>
                      <th className="px-6 sm:px-10 py-5 sm:py-6 text-white/30 italic">Segmento</th>
                      <th className="px-6 sm:px-10 py-5 sm:py-6 text-white/30 italic text-center">Status</th>
                      <th className="px-6 sm:px-10 py-5 sm:py-6 text-white/30 italic text-center">Estoque</th>
                      <th className="px-6 sm:px-10 py-5 sm:py-6 text-white/30 italic text-right">Valor Unitário</th>
                      <th className="px-6 sm:px-10 py-5 sm:py-6 text-white/30 italic text-center">Ações</th>
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
                              <span className="text-[10px] font-mono text-white/20 group-hover:text-[#c5a059]/50 transition-colors">{p.barcode || '---'}</span>
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
