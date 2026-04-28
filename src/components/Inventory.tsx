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
  supplier?: string;
}

interface Movement {
  id: string;
  productId: string;
  productName: string;
  type: 'IN' | 'OUT';
  quantity: number;
  date: string;
  reason: string;
}

interface Supplier {
  id: string;
  name: string;
  cnpj: string;
  contact: string;
  category: string;
}

const STOCK_DATA: Product[] = [
  { id: '1', name: 'Shampoo Pro Liso', category: 'Beleza', stock: 15, minStock: 5, price: 120.00, barcode: '7891234567890', supplier: 'Loreal Expert' },
  { id: '2', name: 'Condicionador Pro', category: 'Beleza', stock: 12, minStock: 5, price: 95.00, barcode: '7890123456789', supplier: 'Loreal Expert' },
  { id: '3', name: 'Mascara Hidratação', category: 'Beleza', stock: 3, minStock: 5, price: 150.00, barcode: '7892345678901', supplier: 'Wella' },
];

const INITIAL_MOVEMENTS: Movement[] = [
  { id: 'm1', productId: '1', productName: 'Shampoo Pro Liso', type: 'IN', quantity: 10, date: '2024-04-25 14:30', reason: 'Compra Reposição' },
  { id: 'm2', productId: '2', productName: 'Condicionador Pro', type: 'OUT', quantity: 2, date: '2024-04-26 10:15', reason: 'Uso em Bancada' },
];

const INITIAL_SUPPLIERS: Supplier[] = [
  { id: 's1', name: 'Loreal Expert', cnpj: '12.345.678/0001-90', contact: '(11) 98888-7777', category: 'Beleza' },
  { id: 's2', name: 'Wella Professional', cnpj: '98.765.432/0001-10', contact: '(21) 97777-6666', category: 'Beleza' },
];

export default function Inventory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>(STOCK_DATA);
  const [movements, setMovements] = useState<Movement[]>(INITIAL_MOVEMENTS);
  const [suppliers, setSuppliers] = useState<Supplier[]>(INITIAL_SUPPLIERS);
  const [activeTab, setActiveTab] = useState<'inventory' | 'movements' | 'suppliers'>('inventory');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showSupplierModal, setShowSupplierModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showMovementModal, setShowMovementModal] = useState<{ type: 'IN' | 'OUT', product: Product } | null>(null);
  
  const [newProduct, setNewProduct] = useState<Partial<Product>>({
    name: '',
    category: '',
    stock: 0,
    minStock: 0,
    price: 0,
    barcode: '',
    supplier: ''
  });

  const [newSupplier, setNewSupplier] = useState<Partial<Supplier>>({
    name: '',
    cnpj: '',
    contact: '',
    category: ''
  });

  const [movementQty, setMovementQty] = useState(0);
  const [movementReason, setMovementReason] = useState('');

  const handleAddProduct = () => {
    if (!newProduct.name || !newProduct.price) return;
    
    if (editingProduct) {
      setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...editingProduct, ...newProduct } as Product : p));
      setEditingProduct(null);
    } else {
      const productToAdd: Product = {
        id: Math.random().toString(36).substr(2, 9),
        name: newProduct.name!,
        category: newProduct.category || 'Geral',
        stock: Number(newProduct.stock) || 0,
        minStock: Number(newProduct.minStock) || 0,
        price: Number(newProduct.price) || 0,
        barcode: newProduct.barcode || '',
        supplier: newProduct.supplier || ''
      };
      setProducts(prev => [productToAdd, ...prev]);
    }

    setShowAddModal(false);
    setNewProduct({ name: '', category: '', stock: 0, minStock: 0, price: 0, barcode: '', supplier: '' });
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setNewProduct(product);
    setShowAddModal(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja realmente remover este ativo do ecossistema?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  const handleMovement = () => {
    if (!showMovementModal || movementQty <= 0) return;

    const { type, product } = showMovementModal;
    const newStock = type === 'IN' ? product.stock + movementQty : product.stock - movementQty;

    if (newStock < 0) {
      alert('Estoque insuficiente para esta operação.');
      return;
    }

    // Update product stock
    setProducts(prev => prev.map(p => p.id === product.id ? { ...p, stock: newStock } : p));

    // Register movement
    const newMovement: Movement = {
      id: Math.random().toString(36).substr(2, 9),
      productId: product.id,
      productName: product.name,
      type,
      quantity: movementQty,
      date: new Date().toLocaleString(),
      reason: movementReason || (type === 'IN' ? 'Entrada Manual' : 'Saída Manual')
    };

    setMovements(prev => [newMovement, ...prev]);
    setShowMovementModal(null);
    setMovementQty(0);
    setMovementReason('');
  };

  const handleAddSupplier = () => {
    if (!newSupplier.name) return;
    const supplierToAdd: Supplier = {
      id: Math.random().toString(36).substr(2, 9),
      name: newSupplier.name,
      cnpj: newSupplier.cnpj || '',
      contact: newSupplier.contact || '',
      category: newSupplier.category || ''
    };
    setSuppliers(prev => [supplierToAdd, ...prev]);
    setShowSupplierModal(false);
    setNewSupplier({ name: '', cnpj: '', contact: '', category: '' });
  };

  const filtered = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (p.barcode && p.barcode.includes(searchTerm))
  );

  const lowStockCount = products.filter(p => p.stock <= p.minStock).length;
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.stock), 0);

  return (
    <div className="space-y-6 sm:space-y-10 h-full flex flex-col relative">
       {/* Modal Adicionar Produto */}
       {showAddModal && (
         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <div className="w-full max-w-2xl bg-[#0a0e17] border border-white/10 sm:rounded-[3rem] rounded-[2rem] p-6 sm:p-10 luxury-gradient shadow-2xl my-8">
               <h3 className="text-xl sm:text-2xl font-serif font-black gold-text italic mb-6 sm:mb-8 uppercase tracking-tighter">{editingProduct ? 'Editar Ativo Elite' : 'Registrar Novo Ativo'}</h3>
               
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
                     <label className="text-[9px] sm:text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">Categoria / Segmento</label>
                     <input 
                       type="text" 
                       className="w-full bg-white/5 border border-white/5 p-4 rounded-xl sm:rounded-2xl text-white outline-none focus:border-[#c5a059]/30 text-xs"
                       value={newProduct.category}
                       onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] sm:text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">Fornecedor Preferencial</label>
                     <input 
                       type="text" 
                       className="w-full bg-white/5 border border-white/5 p-4 rounded-xl sm:rounded-2xl text-white outline-none focus:border-[#c5a059]/30 text-xs"
                       value={newProduct.supplier}
                       onChange={e => setNewProduct({...newProduct, supplier: e.target.value})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] sm:text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">Preço de Venda (Elite)</label>
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
                       disabled={!!editingProduct}
                       className="w-full bg-white/5 border border-white/5 p-4 rounded-xl sm:rounded-2xl text-white outline-none focus:border-[#c5a059]/30 text-xs disabled:opacity-50"
                       value={newProduct.stock}
                       onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[9px] sm:text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">Alerta de Escassez (Mín)</label>
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
                    onClick={() => { setShowAddModal(false); setEditingProduct(null); }}
                    className="flex-1 py-4 border border-white/10 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] text-white/40 hover:bg-white/5 transition-all"
                  >
                    Abortar
                  </button>
                  <button 
                    onClick={handleAddProduct}
                    className="flex-1 py-4 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] shadow-xl shadow-[#c5a059]/20 hover:scale-[1.02] transition-all"
                  >
                    {editingProduct ? 'Salvar Alterações' : 'Confirmar Ativo'}
                  </button>
               </div>
            </div>
         </div>
       )}

       {/* Modal Movimentação */}
       {showMovementModal && (
         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="w-full max-w-lg bg-[#0a0e17] border border-white/10 sm:rounded-[3rem] rounded-[2rem] p-8 sm:p-12 luxury-gradient shadow-2xl">
               <div className="flex items-center gap-4 mb-8">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${showMovementModal.type === 'IN' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                    {showMovementModal.type === 'IN' ? <ArrowDownRight className="w-8 h-8" /> : <ArrowUpRight className="w-8 h-8" />}
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-black gold-text italic uppercase tracking-tighter">{showMovementModal.type === 'IN' ? 'Entrada de Ativo' : 'Saída de Ativo'}</h3>
                    <p className="text-[10px] font-bold text-white/30 uppercase tracking-widest leading-none mt-1">{showMovementModal.product.name}</p>
                  </div>
               </div>

               <div className="space-y-6 mb-10">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">Quantidade</label>
                     <input 
                       type="number" 
                       placeholder="QUANTIDADE"
                       className="w-full bg-white/5 border border-white/5 p-5 rounded-2xl text-white outline-none focus:border-[#c5a059]/30 text-lg font-serif italic"
                       value={movementQty}
                       onChange={e => setMovementQty(parseInt(e.target.value))}
                     />
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">Justificativa / Protocolo</label>
                     <input 
                       type="text" 
                       placeholder="EX: COMPRA SEMANAL / CLIENTE ESPECIAL"
                       className="w-full bg-white/5 border border-white/5 p-5 rounded-2xl text-white outline-none focus:border-[#c5a059]/30 text-xs uppercase tracking-widest font-bold"
                       value={movementReason}
                       onChange={e => setMovementReason(e.target.value)}
                     />
                  </div>
               </div>

               <div className="flex gap-4">
                  <button 
                    onClick={() => setShowMovementModal(null)}
                    className="flex-1 py-5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:bg-white/5 transition-all"
                  >
                    CANCELAR
                  </button>
                  <button 
                    onClick={handleMovement}
                    className={`flex-1 py-5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl transition-all ${showMovementModal.type === 'IN' ? 'bg-emerald-500 text-black shadow-emerald-500/20' : 'bg-rose-500 text-white shadow-rose-500/20'}`}
                  >
                    EXECUTAR
                  </button>
               </div>
            </div>
         </div>
       )}

       {/* Modal Fornecedor */}
       {showSupplierModal && (
         <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[110] flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-[#0a0e17] border border-white/10 sm:rounded-[3rem] rounded-[2rem] p-8 sm:p-12 luxury-gradient shadow-2xl">
               <h3 className="text-xl sm:text-2xl font-serif font-black gold-text italic mb-8 uppercase tracking-tighter text-center">Cadastrar Fornecedor Elite</h3>
               
               <div className="space-y-5">
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">Razão Social / Nome</label>
                     <input 
                       type="text" 
                       className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-[#c5a059]/30 text-xs uppercase"
                       value={newSupplier.name}
                       onChange={e => setNewSupplier({...newSupplier, name: e.target.value})}
                     />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">CNPJ</label>
                       <input 
                         type="text" 
                         className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-[#c5a059]/30 text-xs font-mono"
                         placeholder="00.000.000/0001-00"
                         value={newSupplier.cnpj}
                         onChange={e => setNewSupplier({...newSupplier, cnpj: e.target.value})}
                       />
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">Segmento</label>
                       <input 
                         type="text" 
                         className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-[#c5a059]/30 text-xs uppercase"
                         value={newSupplier.category}
                         onChange={e => setNewSupplier({...newSupplier, category: e.target.value})}
                       />
                    </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em] ml-4 italic">Contato / WhatsApp</label>
                     <input 
                       type="text" 
                       className="w-full bg-white/5 border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-[#c5a059]/30 text-xs"
                       value={newSupplier.contact}
                       onChange={e => setNewSupplier({...newSupplier, contact: e.target.value})}
                     />
                  </div>
               </div>

               <div className="flex gap-4 mt-10">
                  <button 
                    onClick={() => setShowSupplierModal(false)}
                    className="flex-1 py-5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:bg-white/5 transition-all"
                  >
                    Abortar
                  </button>
                  <button 
                    onClick={handleAddSupplier}
                    className="flex-1 py-5 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-xl shadow-[#c5a059]/20 hover:scale-[1.02] transition-all italic"
                  >
                    Ativar Parceria
                  </button>
               </div>
            </div>
         </div>
       )}

       <div className="flex flex-col sm:flex-row items-center justify-between gap-6 shrink-0">
          <div className="flex items-center gap-2 p-1 bg-white/5 rounded-full border border-white/5 overflow-x-auto no-scrollbar">
             <button 
               onClick={() => setActiveTab('inventory')}
               className={`px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap ${activeTab === 'inventory' ? 'bg-[#c5a059] text-[#0a0e17] shadow-lg shadow-[#c5a059]/20' : 'text-white/40 hover:text-white'}`}
             >
               Patrimônio
             </button>
             <button 
               onClick={() => setActiveTab('movements')}
               className={`px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap ${activeTab === 'movements' ? 'bg-[#c5a059] text-[#0a0e17] shadow-lg shadow-[#c5a059]/20' : 'text-white/40 hover:text-white'}`}
             >
               Movimentação
             </button>
             <button 
               onClick={() => setActiveTab('suppliers')}
               className={`px-8 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em] transition-all duration-500 whitespace-nowrap ${activeTab === 'suppliers' ? 'bg-[#c5a059] text-[#0a0e17] shadow-lg shadow-[#c5a059]/20' : 'text-white/40 hover:text-white'}`}
             >
               Fornecedores
             </button>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
             <div className="relative flex-1 sm:w-64 group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#c5a059] w-4 h-4 transition-colors" />
                <input 
                   type="text" 
                   placeholder={activeTab === 'suppliers' ? "BUSCAR PARCEIRO..." : "BUSCAR ATIVO..."}
                   className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] italic text-white focus:border-[#c5a059]/30 outline-none transition-all placeholder:text-white/10"
                   value={searchTerm}
                   onChange={(e) => setSearchTerm(e.target.value)}
                />
             </div>
             <button 
               onClick={() => { 
                 if (activeTab === 'suppliers') {
                   setShowSupplierModal(true);
                 } else {
                   setEditingProduct(null); 
                   setNewProduct({ name: '', category: '', stock: 0, minStock: 0, price: 0, barcode: '', supplier: '' }); 
                   setShowAddModal(true);
                 }
               }}
               className="px-8 py-4 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full text-[9px] font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:scale-[1.05] transition-all shadow-2xl shadow-[#c5a059]/20 italic"
             >
                <Plus className="w-5 h-5" />
                {activeTab === 'suppliers' ? 'Novo Parceiro' : 'Novo Ativo'}
             </button>
          </div>
       </div>

       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8 shrink-0">
          {[
            { label: 'Curadoria Total', value: products.length.toString(), sub: 'Itens em Portfólio', color: '#c5a059' },
            { label: 'Valor de Coleção', value: `R$ ${totalValue.toLocaleString()}`, sub: 'Lastro Operacional', color: '#94a3b8' },
            { label: 'Reposição Urgente', value: lowStockCount.toString(), sub: 'Abaixo do Mínimo Especial', color: '#f43f5e' },
          ].map((stat, i) => (
             <div key={i} className="luxury-card p-6 sm:p-10 border-white/5 luxury-gradient relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
                <p className="text-[9px] font-black uppercase text-white/30 tracking-[0.4em] mb-2 sm:mb-3 italic">{stat.label}</p>
                <h4 className={`text-2xl sm:text-3xl font-serif italic font-black tracking-tighter ${stat.label === 'Reposição Urgente' && lowStockCount > 0 ? 'text-rose-500 animate-pulse' : 'gold-text'}`}>{stat.value}</h4>
                <p className="text-[8px] font-bold text-white/10 uppercase tracking-widest mt-1 sm:mt-2 italic">{stat.sub}</p>
             </div>
          ))}
       </div>

       <div className="luxury-card border-white/5 overflow-hidden flex flex-col flex-1 luxury-gradient">
          <div className="overflow-x-auto no-scrollbar">
             {activeTab === 'inventory' ? (
                <table className="w-full text-left uppercase text-[9px] tracking-[0.2em] font-black min-w-[1000px]">
                   <thead>
                      <tr className="bg-black/20 border-b border-white/5">
                         <th className="px-10 py-6 text-white/30 italic">Designação do Ativo</th>
                         <th className="px-6 py-6 text-white/30 italic">Fornecedor / Cód.</th>
                         <th className="px-6 py-6 text-white/30 italic">Segmento</th>
                         <th className="px-6 py-6 text-white/30 italic text-center">Status</th>
                         <th className="px-6 py-6 text-white/30 italic text-center">Estoque</th>
                         <th className="px-6 py-6 text-white/30 italic text-right">Valor Unitário</th>
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
                              <td className="px-6 py-8">
                                 <div className="flex flex-col">
                                   <span className="text-white/40 mb-1">{p.supplier || 'NÃO DEFINIDO'}</span>
                                   <span className="text-[10px] font-mono text-white/10 group-hover:text-[#c5a059]/50 transition-colors">{p.barcode || '---'}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-8">
                                 <span className="text-[9px] font-black text-white/30 border border-white/10 px-3 py-1 rounded-full">{p.category}</span>
                              </td>
                              <td className="px-6 py-8 text-center">
                                 {isOut ? (
                                   <div className="inline-flex items-center gap-2 text-rose-500 px-3 py-1 bg-rose-500/10 border border-rose-500/20 rounded-full">
                                      <AlertCircle className="w-4 h-4" />
                                      <span className="text-[8px] font-black uppercase tracking-widest">Esgotado</span>
                                   </div>
                                 ) : isLow ? (
                                   <div className="inline-flex items-center gap-2 text-amber-500 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                                      <AlertCircle className="w-4 h-4" />
                                      <span className="text-[8px] font-black uppercase tracking-widest">Abaixo Mínimo</span>
                                   </div>
                                 ) : (
                                   <div className="inline-flex items-center gap-2 text-emerald-500 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                                      <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                      <span className="text-[8px] font-black uppercase tracking-widest">Ativo Elite</span>
                                   </div>
                                 )}
                              </td>
                              <td className="px-6 py-8">
                                 <div className="flex flex-col items-center">
                                    <span className={`text-sm font-serif font-black ${isOut ? 'text-rose-500' : isLow ? 'text-amber-500' : 'text-white'}`}>{p.stock} UN.</span>
                                    <span className="text-[8px] font-bold text-white/20 uppercase tracking-widest leading-none mt-1">Min: {p.minStock}</span>
                                 </div>
                              </td>
                              <td className="px-6 py-8 text-right font-serif font-black text-lg gold-text tracking-tighter">
                                 R$ {p.price.toFixed(2)}
                              </td>
                              <td className="px-10 py-8 text-center">
                                 <div className="flex items-center justify-center gap-3">
                                    <button 
                                      onClick={() => setShowMovementModal({ type: 'IN', product: p })}
                                      className="p-3 bg-emerald-500/5 text-emerald-500 hover:bg-emerald-500 hover:text-black border border-emerald-500/20 rounded-xl transition-all duration-500"
                                      title="Entrada"
                                    ><Plus className="w-4 h-4" /></button>
                                    <button 
                                      onClick={() => setShowMovementModal({ type: 'OUT', product: p })}
                                      className="p-3 bg-rose-500/5 text-rose-500 hover:bg-rose-500 hover:text-white border border-rose-500/20 rounded-xl transition-all duration-500"
                                      title="Saída"
                                    ><ArrowUpRight className="w-4 h-4" /></button>
                                    <button 
                                      onClick={() => handleEdit(p)}
                                      className="p-3 bg-white/5 hover:text-[#c5a059] border border-white/5 hover:border-[#c5a059]/20 rounded-xl transition-all duration-500"
                                    ><Edit3 className="w-4 h-4" /></button>
                                    <button 
                                      onClick={() => handleDelete(p.id)}
                                      className="p-3 bg-white/5 hover:text-rose-500 border border-white/5 hover:border-rose-500/20 rounded-xl transition-all duration-500"
                                    ><Trash2 className="w-4 h-4" /></button>
                                 </div>
                              </td>
                           </tr>
                         );
                      })}
                   </tbody>
                </table>
             ) : activeTab === 'movements' ? (
                <table className="w-full text-left uppercase text-[9px] tracking-[0.2em] font-black min-w-[800px]">
                   <thead>
                      <tr className="bg-black/20 border-b border-white/5">
                         <th className="px-10 py-6 text-white/30 italic">Data / Hora</th>
                         <th className="px-10 py-6 text-white/30 italic">Ativo</th>
                         <th className="px-10 py-6 text-white/30 italic text-center">Tipo</th>
                         <th className="px-10 py-6 text-white/30 italic text-center">Qtd</th>
                         <th className="px-10 py-6 text-white/30 italic">Motivo / Observação</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5 font-bold italic">
                      {movements.map(m => (
                        <tr key={m.id} className="hover:bg-white/5 transition-all duration-500">
                           <td className="px-10 py-6 text-white/40">{m.date}</td>
                           <td className="px-10 py-6 text-white font-serif">{m.productName}</td>
                           <td className="px-10 py-6 text-center">
                              <span className={`px-3 py-1 rounded-full text-[8px] font-black ${m.type === 'IN' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-rose-500/10 text-rose-500 border border-rose-500/20'}`}>
                                 {m.type === 'IN' ? 'ENTRADA' : 'SAÍDA'}
                              </span>
                           </td>
                           <td className={`px-10 py-6 text-center text-sm font-black ${m.type === 'IN' ? 'text-emerald-500' : 'text-rose-500'}`}>
                              {m.type === 'IN' ? '+' : '-'}{m.quantity}
                           </td>
                           <td className="px-10 py-6 text-white/30 font-light truncate max-w-xs">{m.reason}</td>
                        </tr>
                      ))}
                      {movements.length === 0 && (
                        <tr>
                           <td colSpan={5} className="px-10 py-20 text-center text-white/10 uppercase tracking-[0.5em] italic">Nenhuma movimentação registrada</td>
                        </tr>
                      )}
                   </tbody>
                </table>
             ) : (
                <table className="w-full text-left uppercase text-[9px] tracking-[0.2em] font-black min-w-[800px]">
                   <thead>
                      <tr className="bg-black/20 border-b border-white/5">
                         <th className="px-10 py-6 text-white/30 italic">Parceiro Estratégico</th>
                         <th className="px-10 py-6 text-white/30 italic">CNPJ / Identidade</th>
                         <th className="px-10 py-6 text-white/30 italic">Segmento</th>
                         <th className="px-10 py-6 text-white/30 italic text-right">Contato</th>
                         <th className="px-10 py-6 text-white/30 italic text-center">Ações</th>
                      </tr>
                   </thead>
                   <tbody className="divide-y divide-white/5 font-bold italic">
                      {suppliers.filter(s => s.name.toLowerCase().includes(searchTerm.toLowerCase())).map(s => (
                        <tr key={s.id} className="hover:bg-white/5 transition-all duration-500">
                           <td className="px-10 py-8 text-white font-serif font-black">{s.name}</td>
                           <td className="px-10 py-8 text-white/40 font-mono italic">{s.cnpj}</td>
                           <td className="px-10 py-8">
                             <span className="text-[8px] font-black text-[#c5a059] border border-[#c5a059]/20 px-3 py-1 rounded-full">{s.category}</span>
                           </td>
                           <td className="px-10 py-8 text-right text-white/60">{s.contact}</td>
                           <td className="px-10 py-8 text-center">
                              <div className="flex justify-center gap-3">
                                 <button className="p-3 bg-white/5 hover:text-[#c5a059] border border-white/5 hover:border-[#c5a059]/20 rounded-xl transition-all"><Edit3 className="w-4 h-4" /></button>
                                 <button 
                                   onClick={() => setSuppliers(prev => prev.filter(item => item.id !== s.id))}
                                   className="p-3 bg-white/5 hover:text-rose-500 border border-white/5 hover:border-rose-500/20 rounded-xl transition-all"
                                 ><Trash2 className="w-4 h-4" /></button>
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             )}
          </div>
       </div>
    </div>
  );
}
