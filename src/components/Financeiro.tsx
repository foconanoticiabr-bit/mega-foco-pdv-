import React, { useState } from 'react';
import { Landmark, TrendingUp, TrendingDown, Wallet, ArrowUpRight, ArrowDownRight, Calendar, Filter, Plus, FileText } from 'lucide-react';
import { motion } from 'motion/react';

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

  const filtered = FINANCE_DATA.filter(t => filter === 'all' || t.type === filter);

  return (
    <div className="space-y-8">
      {/* Financial Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6">
              <TrendingUp className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Entradas (Mês)</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">R$ 18.450,20</h3>
            <p className="text-[10px] font-bold text-emerald-600 mt-2 flex items-center gap-1">
              <ArrowUpRight className="w-3 h-3" /> +15% vs mês anterior
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-[2.5rem] border border-slate-200 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-700"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6">
              <TrendingDown className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Saídas (Mês)</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter">R$ 9.120,00</h3>
            <p className="text-[10px] font-bold text-rose-600 mt-2 flex items-center gap-1">
              <ArrowDownRight className="w-3 h-3" /> +5% vs mês anterior
            </p>
          </div>
        </div>

        <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white relative overflow-hidden group">
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-blue-600/20 blur-3xl rounded-full translate-x-10 translate-y-10 group-hover:bg-blue-600/30 transition-all duration-700"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 bg-blue-600/20 text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-600/30">
              <Wallet className="w-6 h-6" />
            </div>
            <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest mb-1">Saldo em Caixa</p>
            <h3 className="text-3xl font-black text-white tracking-tighter">R$ 9.330,20</h3>
            <div className="mt-4 flex gap-2">
              <button className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Ver Contas</button>
              <button className="flex-1 py-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all">Extrair PDF</button>
            </div>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-100 flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Fluxo de Caixa</h3>
            <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-100">
              {[
                { id: 'all', label: 'Tudo' },
                { id: 'income', label: 'Receitas' },
                { id: 'expense', label: 'Despesas' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setFilter(opt.id as any)}
                  className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${filter === opt.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2">
              <Plus className="w-4 h-4" /> Nova Transação
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Descrição</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Data</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Categoria</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Valor</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filtered.map(t => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-all group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${t.type === 'income' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                        {t.type === 'income' ? <ArrowUpRight className="w-5 h-5" /> : <ArrowDownRight className="w-5 h-5" />}
                      </div>
                      <span className="text-sm font-bold text-slate-900">{t.description}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
                    {t.date}
                  </td>
                  <td className="px-8 py-6">
                    <span className="text-[10px] font-black uppercase text-slate-400 tracking-tighter bg-slate-100 px-2 py-1 rounded-md">{t.category}</span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <span className={`text-[9px] font-black uppercase px-2 py-1 rounded-full ${t.status === 'paid' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                      {t.status === 'paid' ? 'Liquidado' : 'Pendente'}
                    </span>
                  </td>
                  <td className={`px-8 py-6 text-right font-black tracking-tight ${t.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {t.type === 'income' ? '+' : '-'} R$ {t.amount.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
