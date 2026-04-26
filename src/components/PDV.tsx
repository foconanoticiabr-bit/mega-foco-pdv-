import React, { useState, useMemo } from 'react';
import { ShoppingCart, Search, Trash2, Plus, Minus, CreditCard, Banknote, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
}

interface CartItem extends Product {
  quantity: number;
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Shampoo Pro Liso', price: 120.00, stock: 15, category: 'Beleza' },
  { id: '2', name: 'Condicionador Pro', price: 95.00, stock: 10, category: 'Beleza' },
  { id: '3', name: 'Mascara Hidratação', price: 150.00, stock: 5, category: 'Beleza' },
  { id: '4', name: 'Calça Jeans Skinny', price: 180.00, stock: 8, category: 'Moda' },
  { id: '5', name: 'Camiseta Algodão', price: 45.00, stock: 25, category: 'Moda' },
  { id: '6', name: 'Tênis Running', price: 320.00, stock: 4, category: 'Calçados' },
];

export default function PDV() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'pix' | null>(null);

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const total = useMemo(() => cart.reduce((acc, item) => acc + (item.price * item.quantity), 0), [cart]);

  const handleCheckout = () => {
    if (!paymentMethod) return;
    alert(`Venda finalizada! Total: R$ ${total.toFixed(2)} via ${paymentMethod.toUpperCase()}`);
    setCart([]);
    setPaymentMethod(null);
  };

  return (
    <div className="flex gap-10 h-full">
      {/* Products Selection */}
      <div className="flex-1 flex flex-col gap-8">
        <div className="relative group">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#c5a059] w-5 h-5 transition-colors" />
          <input 
            type="text" 
            placeholder="MAPPING ELITE: Pesquisar coleções..."
            className="w-full pl-16 pr-6 py-6 bg-white/5 border border-white/5 rounded-full shadow-2xl focus:border-[#c5a059]/30 outline-none font-bold text-xs uppercase tracking-[0.2em] text-white placeholder:text-white/10 transition-all italic"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(p => (
            <motion.button
              key={p.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addToCart(p)}
              className="luxury-card bg-white/5 p-8 border-white/5 text-left hover:border-[#c5a059]/30 transition-all flex flex-col justify-between h-48 group luxury-gradient"
            >
              <div>
                <span className="text-[9px] font-black uppercase text-[#c5a059] tracking-[0.4em] italic mb-2 block">{p.category}</span>
                <h4 className="font-serif italic font-bold text-xl text-white tracking-tight leading-none">{p.name}</h4>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-2xl font-serif font-black gold-text italic tracking-tighter">R$ {p.price.toFixed(2)}</p>
                <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:bg-[#c5a059] group-hover:text-[#0a0e17] group-hover:border-[#c5a059] transition-all duration-500">
                  <Plus className="w-5 h-5" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cart / Summary */}
      <div className="w-[420px] bg-[#0a0e17] border border-white/5 rounded-[3rem] shadow-2xl flex flex-col overflow-hidden luxury-gradient h-[calc(100vh-12rem)]">
        <div className="p-8 bg-gradient-to-br from-[#111827] to-black border-b border-white/5 flex items-center justify-between shrink-0">
           <div className="flex items-center gap-4">
             <div className="w-10 h-10 bg-[#c5a059]/10 rounded-xl flex items-center justify-center text-[#c5a059]">
                <ShoppingCart className="w-5 h-5" />
             </div>
             <div>
                <h3 className="font-serif italic font-black uppercase tracking-[0.2em] text-sm text-white">Carrinho Elite</h3>
                <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Protocolo de Venda</p>
             </div>
           </div>
           <span className="bg-[#c5a059] text-[#0a0e17] px-4 py-1 rounded-full text-[9px] font-black tracking-widest">{cart.length} ITENS</span>
        </div>

        <div className="flex-1 overflow-y-auto p-8 space-y-5 custom-scrollbar">
          <AnimatePresence initial={false}>
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-white/10 text-center py-20">
                 <ShoppingCart className="w-16 h-16 mb-6 opacity-20" />
                 <p className="text-[10px] font-bold uppercase tracking-[0.5em] italic">Aguardando Seleção</p>
              </div>
            ) : (
              cart.map(item => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex items-center justify-between p-5 rounded-3xl bg-white/5 border border-white/5 group hover:border-[#c5a059]/20 transition-all duration-500"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <p className="text-sm font-bold text-white tracking-wide uppercase italic mb-1 truncate">{item.name}</p>
                    <p className="text-[10px] font-black text-white/20 tracking-[0.2em]">R$ {item.price.toFixed(2)} / PLATINUM UN</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center bg-black/40 rounded-full border border-white/5 p-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1.5 hover:text-[#c5a059] text-white/20 transition-colors"><Minus className="w-4 h-4" /></button>
                      <span className="w-8 text-center text-xs font-black text-white">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1.5 hover:text-[#c5a059] text-white/20 transition-colors"><Plus className="w-4 h-4" /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-rose-500/40 hover:text-rose-500 transition-colors p-1"><Trash2 className="w-5 h-5" /></button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="p-8 bg-black/40 border-t border-white/5">
           <div className="flex justify-between items-end mb-10">
              <div>
                 <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.5em] mb-2 italic">Volume Consolidado</p>
                 <p className="text-5xl font-serif font-black text-white tracking-tighter gold-text leading-none italic">R$ {total.toFixed(2)}</p>
              </div>
           </div>

           <div className="grid grid-cols-3 gap-3 mb-8">
              {[
                { id: 'card', icon: <CreditCard className="w-4 h-4" />, label: 'Card' },
                { id: 'cash', icon: <Banknote className="w-4 h-4" />, label: 'Cash' },
                { id: 'pix', icon: <QrCode className="w-4 h-4" />, label: 'PIX' },
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`flex flex-col items-center gap-3 p-4 rounded-3xl border transition-all duration-500 ${paymentMethod === method.id ? 'border-[#c5a059] bg-[#c5a059]/10 text-[#c5a059] shadow-lg shadow-[#c5a059]/10' : 'border-white/5 bg-white/5 text-white/20 hover:border-white/10'}`}
                >
                  <div className={`transition-colors duration-500 ${paymentMethod === method.id ? 'text-[#c5a059]' : 'text-inherit'}`}>
                    {method.icon}
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] italic">{method.label}</span>
                </button>
              ))}
           </div>

           <button 
             disabled={cart.length === 0 || !paymentMethod}
             onClick={handleCheckout}
             className="w-full py-6 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full font-black uppercase tracking-[0.4em] shadow-2xl shadow-[#c5a059]/20 disabled:grayscale disabled:opacity-20 disabled:shadow-none hover:scale-[1.02] transition-all text-xs italic"
           >
              FINALIZAR PROTOCOLO
           </button>
        </div>
      </div>
    </div>
  );
}
