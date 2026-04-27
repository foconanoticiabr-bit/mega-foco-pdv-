import React, { useState, useMemo } from 'react';
import { ShoppingCart, Search, Trash2, Plus, Minus, CreditCard, Banknote, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  barcode?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Shampoo Pro Liso', price: 120.00, stock: 15, category: 'Beleza', barcode: '7891234567890' },
  { id: '2', name: 'Condicionador Pro', price: 95.00, stock: 10, category: 'Beleza', barcode: '7890123456789' },
  { id: '3', name: 'Mascara Hidratação', price: 150.00, stock: 5, category: 'Beleza', barcode: '7892345678901' },
];

export default function PDV() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash' | 'pix' | null>(null);
  const [barcodeBuffer, setBarcodeBuffer] = useState('');

  // Global barcode listener
  React.useEffect(() => {
    let buffer = '';
    let lastTime = Date.now();

    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      
      // Reset buffer if typing is too slow (human typing vs scanner)
      if (now - lastTime > 100) {
        buffer = '';
      }
      lastTime = now;

      if (e.key === 'Enter') {
        if (buffer.length > 3) {
          handleBarcodeScan(buffer);
          buffer = '';
        }
      } else if (e.key.length === 1) {
        buffer += e.key;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBarcodeScan = (code: string) => {
    const product = MOCK_PRODUCTS.find(p => p.barcode === code);
    if (product) {
      addToCart(product);
      // Optional: Play a "beep" sound or show a success toast
    } else {
      console.log("Produto não encontrado:", code);
    }
  };

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter(p => 
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.barcode && p.barcode.includes(searchTerm))
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
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 h-full overflow-hidden">
      {/* Products Selection */}
      <div className="flex-1 flex flex-col gap-6 lg:gap-8 min-h-0 overflow-y-auto lg:overflow-visible pr-1 custom-scrollbar">
        <div className="flex flex-col sm:flex-row gap-4">
           <div className="relative group flex-1">
             <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#c5a059] w-5 h-5 transition-colors" />
             <input 
               type="text" 
               placeholder="PESQUISAR..."
               className="w-full pl-16 pr-6 py-5 sm:py-6 bg-white/5 border border-white/5 rounded-full shadow-2xl focus:border-[#c5a059]/30 outline-none font-bold text-xs uppercase tracking-[0.2em] text-white placeholder:text-white/10 transition-all italic"
               value={searchTerm}
               onChange={(e) => setSearchTerm(e.target.value)}
             />
           </div>
           <div className="relative group w-full sm:w-64">
             <QrCode className="absolute left-5 top-1/2 -translate-y-1/2 text-[#c5a059] w-5 h-5" />
             <input 
               type="text" 
               placeholder="SCAN BARCODE..."
               className="w-full pl-14 pr-6 py-5 sm:py-6 bg-[#c5a059]/5 border border-[#c5a059]/20 rounded-full shadow-2xl focus:border-[#c5a059]/50 outline-none font-black text-[10px] uppercase tracking-[0.2em] text-[#c5a059] placeholder:text-[#c5a059]/20 transition-all italic"
               onKeyDown={(e) => {
                 if (e.key === 'Enter') {
                    handleBarcodeScan((e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                 }
               }}
             />
           </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 pb-20 lg:pb-0">
          {filteredProducts.map(p => (
            <motion.button
              key={p.id}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addToCart(p)}
              className="luxury-card bg-white/5 p-6 sm:p-8 border-white/5 text-left hover:border-[#c5a059]/30 transition-all flex flex-col justify-between h-40 sm:h-48 group luxury-gradient"
            >
              <div>
                <span className="text-[8px] sm:text-[9px] font-black uppercase text-[#c5a059] tracking-[0.4em] italic mb-1 sm:mb-2 block">{p.category}</span>
                <h4 className="font-serif italic font-bold text-lg sm:text-xl text-white tracking-tight leading-none truncate">{p.name}</h4>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-xl sm:text-2xl font-serif font-black gold-text italic tracking-tighter">R$ {p.price.toFixed(2)}</p>
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20 group-hover:bg-[#c5a059] group-hover:text-[#0a0e17] group-hover:border-[#c5a059] transition-all duration-500">
                  <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cart / Summary */}
      <div className="w-full lg:w-[420px] bg-[#0a0e17] border border-white/5 lg:rounded-[3rem] rounded-t-[2.5rem] shadow-2xl flex flex-col overflow-hidden luxury-gradient h-full lg:h-[calc(100vh-12rem)] fixed lg:relative bottom-0 left-0 lg:bottom-auto lg:left-auto transform translate-y-full lg:translate-y-0 transition-transform duration-500 z-40" id="cart-panel">
         <div className="lg:hidden h-2 bg-white/10 w-16 mx-auto rounded-full mt-4 mb-2 cursor-pointer" onClick={() => {
           const panel = document.getElementById('cart-panel');
           if (panel) panel.classList.add('translate-y-full');
         }}></div>
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
             className="w-full py-5 sm:py-6 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full font-black uppercase tracking-[0.4em] shadow-2xl shadow-[#c5a059]/20 disabled:grayscale disabled:opacity-20 disabled:shadow-none hover:scale-[1.02] transition-all text-xs italic"
           >
              FINALIZAR PROTOCOLO
           </button>
        </div>
      </div>

      {/* Mobile Cart Toggle */}
      <button 
        onClick={() => {
          const panel = document.getElementById('cart-panel');
          if (panel) panel.classList.remove('translate-y-full');
        }}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 px-8 py-5 bg-[#c5a059] text-[#0a0e17] rounded-full font-black uppercase text-[10px] tracking-[0.3em] flex items-center gap-3 lg:hidden shadow-2xl shadow-[#c5a059]/40 z-30 italic"
      >
        <ShoppingCart className="w-5 h-5" />
        Carrinho ({cart.length})
      </button>
    </div>
  );
}
