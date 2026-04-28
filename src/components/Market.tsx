import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, Globe, Activity, ArrowUpRight, ArrowDownRight, RefreshCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MarketData {
  symbol: string;
  name: string;
  price: string;
  change: number;
  type: 'currency' | 'stock' | 'crypto';
}

const INITIAL_DATA: MarketData[] = [
  { symbol: 'USD/BRL', name: 'Dólar Comercial', price: '5.12', change: 0.45, type: 'currency' },
  { symbol: 'EUR/BRL', name: 'Euro', price: '5.48', change: -0.12, type: 'currency' },
  { symbol: 'BTC/BRL', name: 'Bitcoin', price: '342.150', change: 2.34, type: 'crypto' },
  { symbol: 'IBOV', name: 'Ibovespa', price: '127.450', change: 1.15, type: 'stock' },
  { symbol: 'PETR4', name: 'Petrobras PN', price: '41.25', change: 0.85, type: 'stock' },
  { symbol: 'VALE3', name: 'Vale ON', price: '63.90', change: -1.45, type: 'stock' },
];

export default function Market() {
  const [data, setData] = useState<MarketData[]>(INITIAL_DATA);
  const [lastUpdate, setLastUpdate] = useState(new Date().toLocaleTimeString());

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setData(prev => prev.map(item => {
        const change = (Math.random() - 0.5) * 0.1;
        const newPrice = parseFloat(item.price.replace('.', '').replace(',', '.')) * (1 + change / 100);
        return {
          ...item,
          price: (item.type === 'stock' || item.type === 'crypto' 
            ? newPrice.toLocaleString('pt-BR', { minimumFractionDigits: 3 })
            : newPrice.toFixed(2).replace('.', ',')),
          change: item.change + change
        };
      }));
      setLastUpdate(new Date().toLocaleTimeString());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6">
        <div>
          <h2 className="text-[10px] font-black uppercase text-[#c5a059] tracking-[0.6em] mb-4 italic">Monitor Estratégico Global</h2>
          <h1 className="text-4xl sm:text-6xl font-serif italic font-black text-white uppercase tracking-tighter luxury-text-glow leading-none">
            Mercado & <span className="gold-text">Câmbio</span>
          </h1>
          <p className="text-white/40 text-[10px] font-black uppercase tracking-[0.4em] mt-6 flex items-center gap-3 italic">
            <Activity className="w-3 h-3 text-emerald-500 animate-pulse" />
            Terminal de Inteligência em Tempo Real
          </p>
        </div>
        
        <div className="flex items-center gap-4 bg-white/5 p-4 rounded-3xl border border-white/10 luxury-gradient">
          <RefreshCcw className="w-4 h-4 text-[#c5a059] animate-spin-slow" />
          <div className="text-right">
            <p className="text-[8px] font-black uppercase text-white/20 tracking-[0.2em]">Último Protocolo</p>
            <p className="text-xs font-mono text-white/60">{lastUpdate}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {data.map((item, idx) => (
          <motion.div
            key={item.symbol}
            layout
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="luxury-card p-10 border-white/5 luxury-gradient group hover:border-[#c5a059]/30 transition-all duration-700 relative overflow-hidden"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 rounded-full translate-x-12 -translate-y-12 opacity-5 pointer-events-none group-hover:scale-150 transition-transform duration-1000 ${item.change >= 0 ? 'bg-emerald-500' : 'bg-rose-500'}`}></div>
            
            <div className="flex justify-between items-start mb-8">
              <div>
                <p className="text-[10px] font-black uppercase text-white/30 tracking-[0.4em] italic mb-2">{item.symbol}</p>
                <h3 className="text-xl font-serif italic font-black text-white/90">{item.name}</h3>
              </div>
              <div className={`p-3 rounded-xl border ${item.change >= 0 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                {item.change >= 0 ? <TrendingUp className="w-5 h-5" /> : <TrendingDown className="w-5 h-5" />}
              </div>
            </div>

            <div className="flex items-end justify-between">
              <div>
                <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.3em] mb-2 font-serif italic">Valorização / Cotacão</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-[10px] font-black text-[#c5a059] uppercase">R$</span>
                  <span className="text-4xl font-serif italic font-black text-white luxury-text-glow">{item.price}</span>
                </div>
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-3 py-1 rounded-full border ${item.change >= 0 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                {item.change >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {Math.abs(item.change).toFixed(2)}%
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-white/5 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
               <button className="text-[9px] font-black uppercase tracking-[0.3em] text-[#c5a059] flex items-center gap-2 hover:gap-4 transition-all">
                  Ver Histórico <ArrowUpRight className="w-3 h-3" />
               </button>
               <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse shadow-[0_0_10px_rgba(197,160,89,0.5)]"></span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="luxury-card p-12 border-white/5 luxury-gradient text-center space-y-6">
        <Globe className="w-12 h-12 text-[#c5a059]/40 mx-auto" />
        <h3 className="text-xl font-serif italic font-black text-white uppercase tracking-widest">Alerta de Sazonalidade</h3>
        <p className="text-white/40 max-w-2xl mx-auto italic text-sm leading-relaxed">
          As oscilações do mercado global impactam diretamente sua margem operativa. Utilize estes dados para antecipar compras de insumos e proteger seu patrimônio através de estratégias de Hedge.
        </p>
        <button className="px-12 py-5 bg-[#c5a059]/10 border border-[#c5a059]/30 text-[#c5a059] rounded-full text-[10px] font-black uppercase tracking-[0.4em] hover:bg-[#c5a059]/20 transition-all italic">
          Exportar Relatório Global
        </button>
      </div>
    </div>
  );
}
