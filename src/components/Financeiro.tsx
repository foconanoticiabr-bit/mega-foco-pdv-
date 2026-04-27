import React, { useState } from 'react';
import { Landmark, TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, Calendar, Filter, Plus, FileText, X, DollarSign, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: 'income' | 'expense';
  category: string;
  date: string;
  status: 'paid' | 'pending';
}

const FINANCE_DATA: Transaction[] = [
  { id: '1', description: 'Venda PDV #1024', amount: 450.00, type: 'income', category: 'Vendas', date: '2026-04-26', status: 'paid' },
  { id: '2', description: 'Aluguel Salão', amount: 2500.00, type: 'expense', category: 'Custos Fixos', date: '2026-04-25', status: 'paid' },
  { id: '3', description: 'Fornecedor L’Oréal', amount: 1200.00, type: 'expense', category: 'Estoque', date: '2026-04-28', status: 'pending' },
  { id: '4', description: 'Serviço Coloração', amount: 350.00, type: 'income', category: 'Serviços', date: '2026-04-26', status: 'paid' },
  { id: '5', description: 'Energia Elétrica', amount: 450.00, type: 'expense', category: 'Utilidades', date: '2026-05-01', status: 'pending' },
];

export default function Financeiro() {
  const [filter, setFilter] = useState<'all' | 'income' | 'expense'>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'income' | 'expense' | 'close'>('income');

  const filtered = FINANCE_DATA.filter(t => filter === 'all' || t.type === filter);

  const openModal = (type: 'income' | 'expense' | 'close') => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-12">
      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <button 
          onClick={() => openModal('income')}
          className="flex-1 py-6 sm:py-8 bg-emerald-600/10 border border-emerald-500/20 text-emerald-500 rounded-[2rem] sm:rounded-[2.5rem] font-serif italic font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs flex items-center justify-center gap-4 hover:bg-emerald-600/20 transition-all duration-500 shadow-2xl shadow-emerald-900/10"
        >
          <TrendingUp className="w-5 h-5 shrink-0" /> Entrada de Capital
        </button>
        <button 
          onClick={() => openModal('expense')}
          className="flex-1 py-6 sm:py-8 bg-rose-600/10 border border-rose-500/20 text-rose-500 rounded-[2rem] sm:rounded-[2.5rem] font-serif italic font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs flex items-center justify-center gap-4 hover:bg-rose-600/20 transition-all duration-500 shadow-2xl shadow-rose-900/10"
        >
          <TrendingDown className="w-5 h-5 shrink-0" /> Saída de Ativos
        </button>
        <button 
          onClick={() => openModal('close')}
          className="flex-1 py-6 sm:py-8 bg-white/5 border border-white/10 text-white rounded-[2rem] sm:rounded-[2.5rem] font-serif italic font-black uppercase tracking-[0.2em] text-[10px] sm:text-xs flex items-center justify-center gap-4 hover:bg-white/10 transition-all duration-500 shadow-2xl shadow-black"
        >
          <CheckCircle2 className="w-5 h-5 shrink-0" /> Fechar Protocolo
        </button>
      </div>

      {/* Financial Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="luxury-card p-8 sm:p-10 border-white/5 luxury-gradient relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 border border-emerald-500/20">
              <TrendingUp className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <p className="text-[9px] sm:text-[10px] font-black uppercase text-white/30 tracking-[0.4em] mb-2 italic">Aportes Mensais</p>
            <h3 className="text-3xl sm:text-4xl font-serif italic font-black text-white tracking-tighter gold-text leading-none">R$ 18.450,20</h3>
            <p className="text-[9px] sm:text-[10px] font-bold text-emerald-500 mt-4 flex items-center gap-2 uppercase tracking-widest leading-none">
              <ArrowUpRight className="w-3 h-3 text-[10px]" /> Rendimento +15%
            </p>
          </div>
        </div>

        <div className="luxury-card p-8 sm:p-10 border-white/5 luxury-gradient relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-rose-500/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-rose-500/10 text-rose-500 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 border border-rose-500/20">
              <TrendingDown className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <p className="text-[9px] sm:text-[10px] font-black uppercase text-white/30 tracking-[0.4em] mb-2 italic">Despesas Operacionais</p>
            <h3 className="text-3xl sm:text-4xl font-serif italic font-black text-white tracking-tighter leading-none">R$ 9.120,00</h3>
            <p className="text-[9px] sm:text-[10px] font-bold text-rose-500 mt-4 flex items-center gap-2 uppercase tracking-widest leading-none">
              <ArrowDownRight className="w-3 h-3 text-[10px]" /> Fluxo Estável
            </p>
          </div>
        </div>

        <div className="luxury-card p-8 sm:p-10 border-[#c5a059]/20 bg-gradient-to-br from-[#111827] to-black relative overflow-hidden group sm:col-span-2 lg:col-span-1">
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#c5a059]/10 blur-[60px] rounded-full translate-x-16 translate-y-16 group-hover:bg-[#c5a059]/20 transition-all duration-700"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-[#c5a059]/10 text-[#c5a059] rounded-2xl flex items-center justify-center mb-6 sm:mb-8 border border-[#c5a059]/30">
              <Wallet className="w-6 h-6 sm:w-7 sm:h-7" />
            </div>
            <p className="text-[9px] sm:text-[10px] font-black uppercase text-white/40 tracking-[0.4em] mb-2 italic">Patrimônio em Caixa</p>
            <h3 className="text-3xl sm:text-4xl font-serif italic font-black gold-text tracking-tighter leading-none">R$ 9.330,20</h3>
            <div className="mt-6 sm:mt-8 flex gap-3">
              <button className="flex-1 py-3 bg-[#c5a059]/10 hover:bg-[#c5a059] hover:text-[#0a0e17] rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 text-[#c5a059] border border-[#c5a059]/30">Extrato</button>
              <button className="flex-1 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-[8px] sm:text-[9px] font-black uppercase tracking-[0.3em] transition-all duration-500 text-white/60 border border-white/10 italic">PDF</button>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="luxury-card border-white/5 overflow-hidden luxury-gradient">
        <div className="p-6 sm:p-10 border-b border-white/5 flex flex-col lg:flex-row lg:items-center justify-between gap-6 sm:gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-10">
             <div>
                <h3 className="text-xs sm:text-sm font-black uppercase tracking-[0.4em] text-white italic mb-1">Livro de Razão Elite</h3>
                <p className="text-[8px] sm:text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Auditoria em Tempo Real</p>
             </div>
             <div className="flex bg-black/40 p-1 rounded-full border border-white/5 overflow-x-auto no-scrollbar">
              {[
                { id: 'all', label: 'Tudo' },
                { id: 'income', label: 'Proventos' },
                { id: 'expense', label: 'Custos' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setFilter(opt.id as any)}
                  className={`px-4 sm:px-6 py-2 rounded-full text-[8px] sm:text-[9px] font-black uppercase tracking-widest transition-all italic duration-500 whitespace-nowrap ${filter === opt.id ? 'bg-[#c5a059] text-[#0a0e17] shadow-xl' : 'text-white/30 hover:text-white'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => openModal('income')}
            className="w-full lg:w-auto px-6 sm:px-8 py-4 bg-white/10 text-white rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-[#c5a059] hover:text-[#0a0e17] transition-all duration-500 italic shadow-2xl border border-white/10"
          >
            <Plus className="w-4 h-4" /> Registrar Movimentação
          </button>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left uppercase text-[9px] sm:text-[10px] tracking-widest font-bold min-w-[600px]">
            <thead>
              <tr className="bg-black/20 border-b border-white/5">
                <th className="px-6 sm:px-10 py-5 sm:py-6 text-white/30 font-black tracking-[0.3em] italic">Designação</th>
                <th className="px-6 sm:px-10 py-5 sm:py-6 text-white/30 font-black tracking-[0.3em] text-center italic">Data</th>
                <th className="px-6 sm:px-10 py-5 sm:py-6 text-white/30 font-black tracking-[0.3em] italic">Segmento</th>
                <th className="px-6 sm:px-10 py-5 sm:py-6 text-white/30 font-black tracking-[0.3em] text-center italic">Status</th>
                <th className="px-6 sm:px-10 py-5 sm:py-6 text-white/30 font-black tracking-[0.3em] text-right italic">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-white/5 transition-all duration-500 group">
                  <td className="px-6 sm:px-10 py-6 sm:py-8">
                    <div className="flex items-center gap-3 sm:gap-5">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center border transition-all duration-500 shrink-0 ${t.type === 'income' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 group-hover:bg-emerald-500' : 'bg-rose-500/10 text-rose-500 border-rose-500/20 group-hover:bg-rose-500'} group-hover:text-white`}>
                        {t.type === 'income' ? <ArrowUpRight className="w-4 h-4 sm:w-5 sm:h-5" /> : <ArrowDownRight className="w-4 h-4 sm:w-5 sm:h-5" />}
                      </div>
                      <span className="text-xs sm:text-sm font-serif italic font-bold text-white group-hover:text-[#c5a059] transition-colors truncate max-w-[150px] sm:max-w-none">{t.description}</span>
                    </div>
                  </td>
                  <td className="px-6 sm:px-10 py-6 sm:py-8 text-center text-white/30 whitespace-nowrap">
                    {t.date}
                  </td>
                  <td className="px-6 sm:px-10 py-6 sm:py-8">
                    <span className="bg-white/5 px-3 sm:px-4 py-1 rounded-full border border-white/10 text-white/40 whitespace-nowrap">{t.category}</span>
                  </td>
                  <td className="px-6 sm:px-10 py-6 sm:py-8 text-center">
                    <span className={`px-3 sm:px-4 py-1 rounded-full border shrink-0 text-[8px] sm:text-[9px] ${t.status === 'paid' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : 'bg-amber-500/10 text-amber-500 border-amber-500/20'}`}>
                      {t.status === 'paid' ? 'LIQUIDADO' : 'PENDENTE'}
                    </span>
                  </td>
                  <td className={`px-6 sm:px-10 py-6 sm:py-8 text-right font-serif italic text-base sm:text-lg tracking-tighter whitespace-nowrap ${t.type === 'income' ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {t.type === 'income' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setIsModalOpen(false)}
               className="absolute inset-0 bg-[#05080d]/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0e17] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl luxury-gradient"
            >
              <div className={`p-10 ${modalType === 'income' ? 'bg-emerald-600/20' : modalType === 'expense' ? 'bg-rose-600/20' : 'bg-white/5'} text-white border-b border-white/5`}>
                 <div className="flex justify-between items-start mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border ${modalType === 'income' ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30' : modalType === 'expense' ? 'bg-rose-500/20 text-rose-500 border-rose-500/30' : 'bg-[#c5a059]/20 text-[#c5a059] border-[#c5a059]/30'}`}>
                       {modalType === 'income' ? <TrendingUp className="w-7 h-7" /> : modalType === 'expense' ? <TrendingDown className="w-7 h-7" /> : <CheckCircle2 className="w-7 h-7" />}
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors"><X className="w-6 h-6" /></button>
                 </div>
                 <h3 className="text-3xl font-serif italic font-black uppercase tracking-tighter gold-text">
                   {modalType === 'income' ? 'Aporte de Capital' : modalType === 'expense' ? 'Débito Operacional' : 'Fechamento de Ciclo'}
                 </h3>
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mt-2 italic">Registro em Livro de Razão Semente</p>
              </div>

              <div className="p-10 space-y-8">
                {modalType !== 'close' ? (
                  <>
                    <div>
                      <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] mb-4 block italic">Designação da Transação</label>
                      <input type="text" placeholder="EX: AQUISIÇÃO DE INSUMOS" className="w-full p-5 bg-white/5 rounded-2xl border border-white/5 font-black text-white focus:border-[#c5a059]/30 outline-none transition-all text-xs tracking-widest placeholder:text-white/10 uppercase italic" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] mb-4 block italic">Quantitativo Monetário (R$)</label>
                      <input type="number" placeholder="0,00" className="w-full p-5 bg-white/5 rounded-2xl border border-white/5 font-serif italic font-black gold-text focus:border-[#c5a059]/30 outline-none transition-all text-3xl tracking-tighter" />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] mb-4 block italic">Classificação de Ativo</label>
                      <select className="w-full p-5 bg-white/5 rounded-2xl border border-white/5 font-black text-white/60 focus:border-[#c5a059]/30 outline-none transition-all text-xs tracking-widest uppercase italic appearance-none cursor-pointer">
                         <option className="bg-[#0a0e17]">Operacional / Vendas</option>
                         <option className="bg-[#0a0e17]">Patrimonial / Investimento</option>
                         <option className="bg-[#0a0e17]">Logística / Suprimentos</option>
                         <option className="bg-[#0a0e17]">Capital Humano</option>
                      </select>
                    </div>
                  </>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-white/40 font-bold mb-8 italic">Ao ratificar o fechamento, o protocolo diário será consolidado no banco de dados mestre.</p>
                    <div className="bg-black/40 p-8 rounded-[2rem] border border-white/5 text-left luxury-gradient">
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-[9px] font-black uppercase text-white/20 tracking-[0.3em]">Lastro Inicial</span>
                          <span className="text-xs font-black text-white">R$ 500,00</span>
                       </div>
                       <div className="flex justify-between items-center mb-4">
                          <span className="text-[9px] font-black uppercase text-emerald-500/60 tracking-[0.3em]">Proventos Totais</span>
                          <span className="text-xs font-black text-emerald-500">+ R$ 3.842,50</span>
                       </div>
                       <div className="flex justify-between items-center mb-6">
                          <span className="text-[9px] font-black uppercase text-rose-500/60 tracking-[0.3em]">Débitos Totais</span>
                          <span className="text-xs font-black text-rose-500">- R$ 120,00</span>
                       </div>
                       <div className="pt-6 border-t border-white/10 flex justify-between items-center">
                          <span className="text-[10px] font-black uppercase tracking-[0.4em] gold-text italic">Equilíbrio Final</span>
                          <span className="text-xl font-serif italic font-black text-white tracking-tighter">R$ 4.222,50</span>
                       </div>
                    </div>
                  </div>
                )}

                <button 
                  onClick={() => setIsModalOpen(false)}
                  className={`w-full py-6 rounded-full font-black uppercase tracking-[0.4em] text-[10px] text-[#0a0e17] transition-all shadow-2xl italic ${modalType === 'income' ? 'bg-gradient-to-r from-emerald-400 to-emerald-600' : modalType === 'expense' ? 'bg-gradient-to-r from-rose-400 to-rose-600' : 'bg-gradient-to-r from-[#f9d976] to-[#c5a059]'}`}
                >
                  RATIFICAR OPERAÇÃO
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
