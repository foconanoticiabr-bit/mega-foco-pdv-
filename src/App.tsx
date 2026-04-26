/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  ClipboardList, 
  Calendar, 
  Users, 
  Clock, 
  LineChart, 
  Package, 
  ChevronRight, 
  Check,
  Smartphone,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  Star,
  Play,
  UserCircle,
  X,
  QrCode,
  Copy,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PDV from './components/PDV';
import CRM from './components/CRM';
import Inventory from './components/Inventory';
import Financeiro from './components/Financeiro';
import RH from './components/RH';
import Agenda from './components/Agenda';
import Clientes from './components/Clientes';

// Types
type Section = 'landing' | 'dashboard' | 'pdv' | 'stock' | 'clients' | 'agenda' | 'ponto' | 'crm' | 'finance';

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>('landing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  const pixKey = "e90ed24d-f93a-4543-ba26-0a4276f76bcb";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const features = [
    { icon: <ShoppingBag className="w-6 h-6" />, title: "PDV / Frente de Caixa", desc: "Venda rápida com carrinho, desconto e múltiplas formas de pagamento." },
    { icon: <ClipboardList className="w-6 h-6" />, title: "Comandas", desc: "Abra e gerencie comandas por cliente com controle total dos itens." },
    { icon: <Calendar className="w-6 h-6" />, title: "Agendamentos", desc: "Agenda online para serviços com status e notificações." },
    { icon: <Users className="w-6 h-6" />, title: "Gestão de Clientes", desc: "Cadastro completo com histórico de compras e fidelização." },
    { icon: <Clock className="w-6 h-6" />, title: "Controle de Ponto", desc: "Registro de entrada e saída dos funcionários com histórico." },
    { icon: <CreditCard className="w-6 h-6" />, title: "Vales & Caixa", desc: "Controle de vales, despesas e fechamento de caixa diário." },
    { icon: <LineChart className="w-6 h-6" />, title: "Relatórios", desc: "Dashboard com gráficos de faturamento, vendas e desempenho." },
    { icon: <Package className="w-6 h-6" />, title: "Estoque", desc: "Controle de produtos com alertas de estoque baixo." },
  ];

  const plans = [
    { name: "WhatsApp", price: "49", features: ["Disparos em massa ilimitados", "Extrator Google/FB/IG", "IA para mensagens", "Suporte por e-mail"] },
    { name: "Básico", price: "79", features: ["Até 3 funcionários", "PDV com troco e PIX", "Comandas por cliente", "Estoque com alertas", "WhatsApp Marketing incluso"], popular: false },
    { name: "Profissional", price: "149", features: ["Até 10 funcionários", "Agendamentos online", "Controle de Ponto digital", "CRM / Funil de leads", "WhatsApp Marketing incluso"], popular: true },
    { name: "Enterprise", price: "299", features: ["Funcionários ilimitados", "Multi-lojas", "SEFAZ / NF-e incluso", "Onboarding dedicado", "WhatsApp Marketing incluso"] },
  ];

  const LandingPage = () => (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 border-x-0">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">M</div>
            <span className="text-xl font-bold tracking-tight">MegaFoco <span className="text-blue-600 font-black italic">PDV</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm">
            <a href="#features" className="font-medium hover:text-blue-600 transition-colors">Funcionalidades</a>
            <a href="#pricing" className="font-medium hover:text-blue-600 transition-colors">Planos</a>
            <button 
              onClick={() => setCurrentSection('dashboard')}
              className="font-semibold text-blue-600 hover:bg-blue-50 px-3 py-1 rounded-md transition-all"
            >
              Já sou cliente
            </button>
            <button className="px-5 py-2 font-semibold text-white bg-blue-600 shadow-lg shadow-blue-200 hover:bg-blue-700 rounded-lg transition-all">
              Começar Grátis
            </button>
          </div>
          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Smartphone className="w-6 h-6 text-slate-600" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-4 flex flex-col items-center text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-[10px] font-black uppercase tracking-widest mb-8 border border-blue-200">
            <ShieldCheck className="w-3.5 h-3.5" />
            Sistema Completo Varejo e Beleza
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight mb-8 leading-[0.9] text-slate-900 uppercase">
            Gerencie sua <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600">loja perfeita</span>
          </h1>
          <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            PDV, comandas, agendamentos, estoque, funcionários e relatórios. 
            Tudo o que você precisa em um único sistema pensado para o seu sucesso.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <button 
               onClick={() => setCurrentSection('dashboard')}
               className="w-full sm:w-auto px-10 py-5 text-xl font-black text-white bg-blue-600 shadow-2xl shadow-blue-300 hover:bg-blue-700 hover:scale-[1.02] active:scale-95 rounded-2xl flex items-center justify-center gap-3 group transition-all"
            >
              CADASTRAR MINHA LOJA
              <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center gap-4 text-xs font-bold text-slate-500 uppercase tracking-widest">
               <span>✓ 14 dias grátis</span>
               <span className="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
               <span>✓ Sem cartão</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Grid Segments */}
      <div className="py-12 bg-white border-y border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between gap-8 opacity-40 font-black uppercase tracking-[0.2em] text-[10px]">
           {['Roupas', 'Sapatos', 'Joias', 'Salão de Beleza', 'Barbearias', 'Lojas de Conveniência'].map((s, i) => (
             <span key={i} className="hover:text-blue-600 transition-colors cursor-default">{s}</span>
           ))}
        </div>
      </div>

      {/* Features Grid */}
      <section id="features" className="py-32 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-4 inline-block border-b-2 border-blue-600 pb-1">Funcionalidades</h3>
               <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 uppercase leading-none">Tudo que você precisa em um só PDV</h2>
            </div>
            <p className="text-slate-500 text-sm font-medium max-w-xs md:text-right">Aumente sua produtividade com ferramentas integradas e modernas.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-blue-200 transition-all group"
              >
                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all mb-6">
                  {f.icon}
                </div>
                <h4 className="font-black text-lg mb-3 uppercase tracking-tight text-slate-900">{f.title}</h4>
                <p className="text-sm text-slate-500 leading-relaxed font-medium">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners / Banking Section */}
      <section className="py-24 px-4 bg-white">
          <div className="max-w-7xl mx-auto text-center">
             <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-12">Parceiros Oficiais e Maquininhas</h3>
             <div className="flex flex-wrap justify-center items-center gap-12 grayscale opacity-40">
                {['Mercado Pago', 'SumUp', 'InfinitePay', 'PagBank', 'Ton', 'Stone'].map((p, i) => (
                  <span key={i} className="text-2xl font-black italic tracking-tighter">{p}</span>
                ))}
             </div>
          </div>
      </section>

      {/* Pricing Table */}
      <section id="pricing" className="py-32 px-4 bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
          <div className="max-w-7xl mx-auto relative z-10">
             <div className="text-center mb-24">
                <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-500 mb-4 inline-block border-b-2 border-blue-500 pb-1">Investimento</h3>
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">Cresça sem limites</h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
               {plans.map((p, i) => (
                 <div key={i} className={`p-8 rounded-3xl flex flex-col ${p.popular ? 'bg-blue-600' : 'bg-slate-800'}`}>
                    <div className="mb-8">
                       <h4 className="font-black uppercase tracking-widest text-xs mb-4 opacity-70">{p.name}</h4>
                       <div className="flex items-baseline gap-1">
                          <span className="text-[10px] font-bold opacity-60">R$</span>
                          <span className="text-5xl font-black tracking-tighter">{p.price}</span>
                          <span className="text-xs font-bold opacity-60">/mês</span>
                       </div>
                    </div>
                    <ul className="space-y-4 mb-10 flex-1">
                       {p.features.map((f, j) => (
                         <li key={j} className="flex gap-3 text-xs font-bold items-start leading-tight">
                            <Check className="w-4 h-4 shrink-0 opacity-40" />
                            {f}
                         </li>
                       ))}
                    </ul>
                    <button 
                      onClick={() => setSelectedPlan(p)}
                      className={`w-full py-4 rounded-2xl font-black tracking-widest text-[10px] uppercase transition-all ${p.popular ? 'bg-white text-blue-600 hover:scale-105 shadow-xl shadow-blue-900/50' : 'bg-slate-700 text-white hover:bg-slate-600'}`}
                    >
                       Assinar Agora
                    </button>
                 </div>
               ))}
             </div>
          </div>
      </section>

      {/* Checkout Modal */}
      <AnimatePresence>
        {selectedPlan && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPlan(null)}
              className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <button 
                onClick={() => setSelectedPlan(null)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-slate-100 transition-colors z-10"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>

              <div className="p-10">
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white">
                    <QrCode className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tight text-slate-900 uppercase italic">Finalizar Assinatura</h3>
                    <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">Plano {selectedPlan.name} • R$ {selectedPlan.price}/mês</p>
                  </div>
                </div>

                <div className="bg-slate-50 p-8 rounded-3xl mb-8 flex flex-col items-center">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">Pague via PIX Copia e Cola</p>
                  
                  <div className="w-full bg-white p-4 rounded-2xl border border-slate-200 mb-6 flex items-center gap-4 group">
                    <div className="flex-1 min-w-0 truncate text-xs font-mono font-medium text-slate-600">
                      {pixKey}
                    </div>
                    <button 
                      onClick={handleCopyPix}
                      className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center gap-2"
                    >
                      {copied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="text-xs font-bold text-slate-900">1. Abra o app do seu banco</p>
                    <p className="text-xs font-bold text-slate-900">2. Escolha "PIX Copia e Cola"</p>
                    <p className="text-xs font-bold text-slate-900">3. Cole a chave acima e confirme</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0" />
                    <p className="text-[10px] font-bold text-emerald-700 leading-tight">
                      Após o pagamento, envie o comprovante para nosso suporte. Sua conta será liberada instantaneamente.
                    </p>
                  </div>
                  <button 
                    onClick={() => setSelectedPlan(null)}
                    className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-slate-800 transition-all"
                  >
                    Já realizei o pagamento
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-16 px-4 bg-slate-900 border-t border-slate-800 text-center">
          <p className="text-[10px] font-black text-slate-600 uppercase tracking-[0.4em]">MegaFoco PDV © 2026</p>
      </footer>
    </div>
  );

  const Summary = () => (
    <div className="space-y-8">
       {/* Top Row Cards */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: 'Receita Hoje', value: 'R$ 3.842,50', change: '+12%', icon: <CreditCard className="w-5 h-5" />, color: 'blue' },
            { label: 'Vendas Ativas', value: '24', change: '+5', icon: <ShoppingBag className="w-5 h-5" />, color: 'purple' },
            { label: 'Agendamentos', value: '18', change: '8 pendentes', icon: <Calendar className="w-5 h-5" />, color: 'amber' },
            { label: 'Novos Clientes', value: '+7', change: 'Mês: 142', icon: <Users className="w-5 h-5" />, color: 'emerald' },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between group hover:border-blue-300 transition-all cursor-default">
               <div className="flex justify-between items-center mb-4">
                  <div className={`p-2.5 rounded-xl bg-${stat.color}-50 text-${stat.color}-600 group-hover:bg-blue-600 group-hover:text-white transition-colors`}>
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">{stat.change}</span>
               </div>
               <div>
                  <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">{stat.label}</p>
                  <p className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
               </div>
            </div>
          ))}
       </div>

       {/* Middle Row Charts/Lists */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[2rem] border border-slate-200 p-8 flex flex-col">
             <div className="flex items-center justify-between mb-8">
                <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Vendas de Hoje</h3>
                <div className="flex gap-2">
                   <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                   <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                </div>
             </div>
             
             <div className="flex-1 space-y-4">
                {[1, 2, 3, 4, 5].map((v) => (
                  <div key={v} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 hover:bg-slate-50 transition-all cursor-pointer">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center font-black text-slate-300 text-xs shadow-inner">0{v}</div>
                        <div>
                           <p className="text-sm font-bold text-slate-900">Venda #102{v}</p>
                           <p className="text-[10px] uppercase font-black text-slate-400 tracking-tighter">Cartão • 14:2{v}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-sm font-black text-slate-900 tracking-tight">R$ {(v * 125.5).toFixed(2)}</p>
                        <p className="text-[9px] font-black uppercase text-emerald-600 underline">Confirmado</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-6">
             <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
                <h3 className="text-xs font-black uppercase tracking-widest mb-6 opacity-60">Status do Caixa</h3>
                <p className="text-3xl font-black tracking-tighter mb-2 underline decoration-blue-500 underline-offset-8">R$ 4.250,00</p>
                <p className="text-[10px] font-bold opacity-60 mb-8 uppercase tracking-widest">Saldo Total Disponível</p>
                
                <div className="space-y-3">
                   <button className="w-full py-3 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-900/50">Abrir PDV</button>
                   <button className="w-full py-3 bg-slate-800 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-700 transition-all">Fechar Caixa</button>
                </div>
             </div>

             <div className="bg-white rounded-[2rem] border border-slate-200 p-8">
                <h3 className="text-xs font-black uppercase tracking-widest mb-6 text-slate-400">Estoque Crítico</h3>
                <div className="space-y-5">
                   {[
                     { name: 'Shampoo Liso 1L', stock: 2 },
                     { name: 'Sabonete Líquido', stock: 1 },
                     { name: 'Óleo Repair', stock: 0 },
                   ].map((item, i) => (
                     <div key={i} className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                           <div className="w-1.5 h-1.5 rounded-full bg-rose-500"></div>
                           <p className="text-xs font-bold text-slate-600">{item.name}</p>
                        </div>
                        <p className="text-[10px] font-black text-rose-600 uppercase bg-rose-50 px-2 py-0.5 rounded-md">{item.stock} UN</p>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-8 py-3 border-2 border-dashed border-slate-100 rounded-xl text-[10px] font-black uppercase text-slate-400 hover:text-blue-600 hover:border-blue-100 transition-all">Gerenciar Catálogo</button>
             </div>
          </div>
       </div>
    </div>
  );

  const Dashboard = () => (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-72 bg-slate-900 text-white flex-col p-8 shrink-0">
         <div className="flex items-center gap-3 mb-16">
            <div className="w-10 h-10 bg-blue-600 rounded-2xl flex items-center justify-center text-xl font-black italic">M</div>
            <div className="flex flex-col">
               <span className="text-lg font-black tracking-tighter uppercase leading-[0.8] mb-1">MegaFoco</span>
               <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">PDV v1.0</span>
            </div>
         </div>

         <nav className="flex-1 space-y-2">
            {[
              { id: 'dashboard', icon: <LineChart className="w-5 h-5" />, label: 'Dashboard' },
              { id: 'pdv', icon: <ShoppingBag className="w-5 h-5" />, label: 'PDV / Caixa' },
              { id: 'crm', icon: <Users className="w-5 h-5" />, label: 'CRM / Leads' },
              { id: 'agenda', icon: <Calendar className="w-5 h-5" />, label: 'Agenda / Reservas' },
              { id: 'stock', icon: <Package className="w-5 h-5" />, label: 'Estoque / Catálogo' },
              { id: 'finance', icon: <Landmark className="w-5 h-5" />, label: 'Financeiro' },
              { id: 'clients', icon: <UserCircle className="w-5 h-5" />, label: 'Clientes' },
              { id: 'ponto', icon: <Clock className="w-5 h-5" />, label: 'RH / Ponto' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentSection(item.id as Section)}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${currentSection === item.id ? 'bg-blue-600 text-white shadow-xl shadow-blue-900/50 scale-[1.02]' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                {item.icon}
                {item.label}
              </button>
            ))}
         </nav>

         <div className="mt-auto pt-8 border-t border-slate-800 flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-slate-800 flex items-center justify-center border border-slate-700">
               <UserCircle className="w-6 h-6 text-slate-500" />
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-[10px] font-black uppercase tracking-widest text-white truncate">Admin Principal</p>
               <p className="text-[8px] font-bold text-slate-500 uppercase">Loja #012 - Matriz</p>
            </div>
         </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
         {/* Navigation Bar */}
         <header className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-4 lg:hidden">
               <button className="p-2 bg-slate-900 text-white rounded-xl">
                  <Smartphone className="w-5 h-5" />
               </button>
            </div>
            <div className="flex items-center gap-3">
               <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Sistema Global</h2>
               <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
            </div>
            
            <div className="flex items-center gap-4">
               <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  Sessão: 02h 45m
               </div>
               <button 
                  onClick={() => setCurrentSection('landing')}
                  className="px-5 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg shadow-slate-200 active:scale-95 transition-all"
               >
                  Sair do Dashboard
               </button>
            </div>
         </header>

         {/* Content Scrollable */}
         <div className="flex-1 overflow-y-auto p-10 bg-slate-50/50">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="max-w-7xl mx-auto"
              >
                 {currentSection === 'dashboard' && <Summary />}
                 {currentSection === 'pdv' && <PDV />}
                 {currentSection === 'crm' && <CRM />}
                 {currentSection === 'stock' && <Inventory />}
                 {currentSection === 'finance' && <Financeiro />}
                 {currentSection === 'agenda' && <Agenda />}
                 {currentSection === 'clients' && <Clientes />}
                 {currentSection === 'ponto' && <RH />}
              </motion.div>
            </AnimatePresence>
         </div>
      </main>
    </div>
  );

  return (
    <div className="overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentSection === 'landing' ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage />
          </motion.div>
        ) : (
          <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Dashboard />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}