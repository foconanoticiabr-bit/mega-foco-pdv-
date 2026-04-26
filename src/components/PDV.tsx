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
    <div className="flex gap-8 h-full">
      {/* Products Selection */}
      <div className="flex-1 flex flex-col gap-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Buscar produtos ou categorias..."
            className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none font-bold text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {filteredProducts.map(p => (
            <motion.button
              key={p.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => addToCart(p)}
              className="bg-white p-5 rounded-2xl border border-slate-200 text-left hover:border-blue-500 transition-all flex flex-col justify-between h-40 shadow-sm"
            >
              <div>
                <span className="text-[10px] font-black uppercase text-blue-500 tracking-widest">{p.category}</span>
                <h4 className="font-bold text-slate-900 mt-1">{p.name}</h4>
              </div>
              <div className="flex justify-between items-end">
                <p className="text-lg font-black text-slate-900">R$ {p.price.toFixed(2)}</p>
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                  <Plus className="w-4 h-4" />
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Cart / Summary */}
      <div className="w-96 bg-white border border-slate-200 rounded-3xl shadow-xl flex flex-col overflow-hidden">
        <div className="p-6 bg-slate-900 text-white flex items-center justify-between">
           <div className="flex items-center gap-2">
             <ShoppingCart className="w-5 h-5" />
             <h3 className="font-black uppercase tracking-widest text-sm">Carrinho</h3>
           </div>
           <span className="bg-blue-600 px-2 py-1 rounded text-[10px] font-black">{cart.length} ITENS</span>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <AnimatePresence initial={false}>
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-400 opacity-50 text-center py-20">
                 <ShoppingCart className="w-12 h-12 mb-4" />
                 <p className="text-xs font-bold uppercase tracking-widest">Carrinho Vazio</p>
              </div>
            ) : (
              cart.map(item => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-slate-900 truncate">{item.name}</p>
                    <p className="text-[10px] font-black text-slate-400">R$ {item.price.toFixed(2)} / un</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center bg-white rounded-lg border border-slate-200 p-1">
                      <button onClick={() => updateQuantity(item.id, -1)} className="p-1 hover:bg-slate-50 rounded"><Minus className="w-3 h-3" /></button>
                      <span className="w-6 text-center text-xs font-black">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, 1)} className="p-1 hover:bg-slate-50 rounded"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => removeFromCart(item.id)} className="text-rose-500 p-1"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </motion.div>
              ))
            )}
          </AnimatePresence>
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-200">
           <div className="flex justify-between items-center mb-6">
              <span className="text-xs font-black uppercase text-slate-400 tracking-widest">Total Geral</span>
              <span className="text-3xl font-black text-slate-900 tracking-tighter">R$ {total.toFixed(2)}</span>
           </div>

           <div className="grid grid-cols-3 gap-2 mb-6">
              {[
                { id: 'card', icon: <CreditCard className="w-4 h-4" />, label: 'Cartão' },
                { id: 'cash', icon: <Banknote className="w-4 h-4" />, label: 'Dinheiro' },
                { id: 'pix', icon: <QrCode className="w-4 h-4" />, label: 'PIX' },
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setPaymentMethod(method.id as any)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${paymentMethod === method.id ? 'border-blue-600 bg-blue-50 text-blue-600 font-black' : 'border-slate-100 bg-white text-slate-400 font-bold hover:border-slate-200'}`}
                >
                  {method.icon}
                  <span className="text-[9px] uppercase tracking-widest">{method.label}</span>
                </button>
              ))}
           </div>

           <button 
             disabled={cart.length === 0 || !paymentMethod}
             onClick={handleCheckout}
             className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl shadow-blue-200 disabled:bg-slate-300 disabled:shadow-none hover:bg-blue-700 transition-all active:scale-95 text-xs"
           >
              Finalizar Venda
           </button>
        </div>
      </div>
    </div>
  );
}
