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
  CheckCircle2,
  ArrowUpRight,
  Landmark,
  Scissors,
  DollarSign,
  FileText,
  Settings,
  Image,
  Globe,
  Calculator,
  Lock,
  Share2,
  LogOut,
  ChevronDown,
  Target,
  TrendingUp,
  Instagram,
  Facebook
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
type Section = 
  | 'landing' 
  | 'dashboard' 
  | 'pdv' 
  | 'comandas'
  | 'stock' 
  | 'services'
  | 'clients' 
  | 'agenda' 
  | 'finance' 
  | 'solutions' 
  | 'ponto' 
  | 'crm' 
  | 'vales'
  | 'config'
  | 'reports'
  | 'whatsapp'
  | 'social'
  | 'google'
  | 'nfe'
  | 'calc'
  | 'admin_panel'
  | 'indication'
  | 'privacy'
  | 'signup';

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>('landing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isGeneratingPayment, setIsGeneratingPayment] = useState(false);
  const [copied, setCopied] = useState(false);

  const pixKey = "e90ed24d-f93a-4543-ba26-0a4276f76bcb";

  const handleCopyPix = () => {
    navigator.clipboard.writeText(pixKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMercadoPagoCheckout = async () => {
    if (!selectedPlan) return;
    setIsGeneratingPayment(true);
    try {
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: selectedPlan.name,
          price: selectedPlan.price,
          userEmail: 'foconanoticiabr@gmail.com' // Using user email from context
        }),
      });
      const data = await response.json();
      if (data.init_point) {
        window.open(data.init_point, '_blank');
      }
    } catch (error) {
      console.error('Error generating payment:', error);
      alert('Erro ao gerar pagamento. Tente novamente.');
    } finally {
      setIsGeneratingPayment(false);
    }
  };

  const financialPartners = [
    { 
      name: 'Mercado Pago', 
      link: 'https://mpago.li/2FuQUyd', 
      desc: 'A solução completa do ecossistema Mercado Livre. Receba seu dinheiro na hora, use a conta digital gratuita para pagar contas, investir e gerenciar seu negócio.',
      color: 'blue'
    },
    { 
      name: 'PagSeguro', 
      link: 'https://pagbank.vc/indica-maquininhas-05c5a7de9', 
      desc: 'A pioneira do mercado. Oferece maquininhas sem aluguel, conta PagBank integrada, cartão de crédito sem anuidade e uma das maiores redes de aceitação.',
      color: 'amber'
    },
    { 
      name: 'SumUp', 
      link: 'https://join.sumup.com/lCkmNHQ_?share_id=tbc2laClckmnhq_', 
      desc: 'Referência em transparência. Perfeita para quem vende muito no débito e crédito à vista, com as menores taxas fixas do mercado e suporte de excelência.',
      color: 'blue'
    },
    { 
      name: 'Ton', 
      link: 'https://ton.com.br/catalogo/?referrer=A3B0F947-EED1-4ADD-BB10-D5B8DEFA7DAB&userAnticipation=0&utm_medium=invite_share&utm_source=revendedor', 
      desc: 'O melhor custo-benefício para pequenos negócios. Planos ultra competitivos com a segurança da Stone e suporte via WhatsApp.',
      color: 'emerald'
    },
    { 
      name: 'InfinitePay', 
      link: 'http://buy.infinitepay.io/smart?rid=tuliowanderson', 
      desc: 'A revolução nas taxas. Sistema de recebimento antecipado automático e as taxas mais agressivas para quem quer maximizar o lucro em cada venda.',
      color: 'indigo'
    }
  ];

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

  const [activePlanTab, setActivePlanTab] = useState<'pdv' | 'crm_pdv' | 'crm_solo' | 'marketing' | 'ads' | 'google'>('pdv');

  const planCategories = [
    { id: 'pdv', label: '🏪 Sistema PDV', icon: <ShoppingBag className="w-4 h-4" /> },
    { id: 'crm_pdv', label: 'CRM + PDV', icon: <Users className="w-4 h-4" /> },
    { id: 'crm_solo', label: '🎯 Só CRM', icon: <Target className="w-4 h-4" /> },
    { id: 'marketing', label: '🎓 Curso', icon: <Play className="w-4 h-4" /> },
    { id: 'ads', label: '🚀 Anúncios', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'google', label: '🗺️ Google', icon: <Globe className="w-4 h-4" /> },
  ];

  const allPlans: Record<string, any[]> = {
    pdv: [
      { name: "Básico", price: "79", features: ["Até 3 funcionários", "🛒 PDV com troco e PIX QR Code", "🧾 Pedidos por cliente", "📦 Estoque com alertas", "👥 Cadastro de clientes", "✅ WhatsApp Marketing incluído"], optional: ["🏛️ SEFAZ / NF-e (+R$39/mês)", "🎓 Bônus: Curso Marketing (+R$50 único)"] },
      { name: "Profissional", price: "149", features: ["Até 10 funcionários", "Tudo do Básico", "📅 Agendamentos online", "⏱️ Controle de Ponto digital", "💰 Vales + Fechamento de Caixa", "📊 Relatórios e painel", "🎯 CRM / Funil de leads", "✅ WhatsApp Marketing incluído"], popular: true, optional: ["🏛️ SEFAZ / NF-e (+R$39/mês)", "🎓 Bônus: Curso Marketing (+R$50 único)"] },
      { name: "Empresa", price: "299", features: ["Funcionários ilimitados", "Tudo do Profissional", "🏪 Multilojas", "🏛️ SEFAZ / NF-e incluso", "👤 Gerente exclusivo", "🚀 Integração dedicada", "✅ WhatsApp Marketing incluído"] },
    ],
    crm_pdv: [
      { name: "CRM Starter", price: "59", features: ["200 leads", "Funil de vendas Kanban", "Histórico de interações", "Links WhatsApp", "Etiquetas e prioridade", "PDV básico incluso"], optional: ["🏛️ SEFAZ / NF-e (+R$39/mês)", "🎓 Bônus: Curso Marketing (+R$50 único)"] },
      { name: "CRM Pro", price: "99", features: ["Leads ilimitados", "Funil de vendas Kanban", "Histórico completo", "Integração Instagram e Facebook", "Links WhatsApp", "Métricas e CRM", "PDV + Estoque + Comandos", "✅ WhatsApp Marketing incluído"], popular: true, optional: ["🏛️ SEFAZ / NF-e (+R$39/mês)", "🎓 Bônus: Curso Marketing (+R$50 único)"] },
      { name: "CRM para Negócios", price: "179", features: ["Até 5 usuários", "Tudo do CRM Pro", "Automações de follow-up", "Relatórios avançados", "PDV completo + Caixa + Ponto", "Integração dedicada"], optional: ["🏛️ SEFAZ / NF-e (+R$39/mês)", "🎓 Bônus: Curso Marketing (+R$50 único)"] },
    ],
    crm_solo: [
      { name: "CRM Solo", price: "39", features: ["Até 100 leads", "Funil de vendas Kanban", "Histórico de interações", "Links WhatsApp", "Etiquetas e prioridade", "Acesso via navegador"], optional: ["🏛️ SEFAZ / NF-e (+R$39/mês)", "🎓 Bônus: Curso Marketing (+R$50 único)"] },
      { name: "CRM Solo Pro", price: "69", features: ["Leads ilimitados", "Funil de vendas Kanban", "Histórico de interações", "Integração Instagram e Facebook", "Links WhatsApp", "Métricas e temperatura", "✅ WhatsApp Marketing incluído"], popular: true, optional: ["🏛️ SEFAZ / NF-e (+R$39/mês)", "🎓 Bônus: Curso Marketing (+R$50 único)"] },
      { name: "CRM Solo Max", price: "119", features: ["Até 3 usuários", "Tudo do CRM Solo Pro", "Automações de follow-up", "Relatórios avançados", "Integração dedicada"], optional: ["🏛️ SEFAZ / NF-e (+R$39/mês)", "🎓 Bônus: Curso Marketing (+R$50 único)"] },
    ],
    marketing: [
      { name: "Curso de Marketing", price: "97", features: ["📣 Marketing Digital completo", "📢 Publicidade e Propaganda", "📱 Vendas Redes Sociais", "🏪 Técnicas de Vendas Físicas", "💻 Técnicas de Vendas Digitais", "📄 Materiais em PDF", "🔄 Acesso vitalício"], badge: "🎓 CURSO COMPLETO" },
    ],
    ads: [
      { name: "Título Pago", price: "297", features: ["✓ Criação de 1 campanha", "✓ Anúncios FB ou Google", "✓ Segmentação de público", "✓ 2 criativos (imagem/vídeo)", "✓ Monitoramento básico", "✓ Relatório mensal"], optional: ["🏛️ SEFAZ / NF-e (+R$39/mês)", "🎓 Bônus: Curso Marketing (+R$50 único)"] },
      { name: "Título Pago Pro", price: "597", features: ["✓ FB + IG + Google Ads", "✓ Estratégia avançada", "✓ 5 criativos premium", "✓ Testes A/B", "✓ Otimização semanal", "✓ Relatório quinzenal"], popular: true, optional: ["🏛️ SEFAZ / NF-e (+R$39/mês)", "🎓 Bônus: Curso Marketing (+R$50 único)"] },
      { name: "Pagamento Premium", price: "997", features: ["✓ Gestão completa 360º", "✓ Estratégia personalizada", "✓ 10 criativos profissionais", "✓ Funil de vendas completo", "✓ Remarketing avançado", "✓ Otimização diária"], optional: ["🏛️ SEFAZ / NF-e (+R$39/mês)", "🎓 Bônus: Curso Marketing (+R$50 único)"] },
    ],
    google: [
      { name: "Google Meu torcedor", price: "197", features: ["✓ Criação e configuração", "✓ Inserção de fotos e infos", "✓ Otimização inicial", "✓ Cadastro em mapas"], badge: "AGORA DE ASSINAR", optional: ["🏛️ SEFAZ / NF-e (+R$39/mês)", "🎓 Bônus: Curso Marketing (+R$50 único)"] },
      { name: "Google Meu Pro", price: "397", features: ["✓ Postagens semanais", "✓ Atualização de fotos", "✓ Resposta às avaliações", "✓ SEO local básico"], optional: ["🏛️ SEFAZ / NF-e (+R$39/mês)", "🎓 Bônus: Curso Marketing (+R$50 único)"] },
      { name: "Google Meu Premium", price: "697", features: ["✓ Topo do Google", "✓ Gestão de avaliações", "✓ Postagens 3x semana", "✓ Palavras-chave locais", "✓ Relatórios mensais"], popular: true, optional: ["🏛️ SEFAZ / NF-e (+R$39/mês)", "🎓 Bônus: Curso Marketing (+R$50 único)"] },
    ]
  };

  const LandingPage = () => (
    <div className="min-h-screen bg-[#05080d] font-sans text-white border-x-0 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2563eb 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
      {/* Navigation */}
      <nav className="fixed top-8 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 bg-[#0a0e17]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="px-10 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-[#f9d976] to-[#c5a059] rounded-full flex items-center justify-center text-[#0a0e17] font-black italic shadow-lg">M</div>
            <span className="text-2xl font-black tracking-tighter uppercase italic gold-text">MegaFoco <span className="text-white opacity-80">PDV</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setCurrentSection('dashboard')}
              className="text-sm font-bold text-white/60 hover:text-white transition-all uppercase tracking-widest"
            >
              Já sou cliente
            </button>
            <button 
              onClick={() => setCurrentSection('signup')}
              className="px-8 py-3 font-bold text-[#0a0e17] bg-gradient-to-b from-[#f9d976] to-[#c5a059] rounded-full hover:scale-105 active:scale-95 transition-all uppercase tracking-tighter shadow-lg shadow-[#c5a059]/20"
            >
              Começar Grátis
            </button>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <Smartphone className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-60 pb-40 px-4 flex flex-col items-center text-center relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/20 blur-[150px] rounded-full pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl relative z-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[#c5a059] text-xs font-bold uppercase tracking-[0.3em] mb-12 italic">
            <ShieldCheck className="w-4 h-4" />
            A Excelência em Gestão para Negócios de Elite
          </div>
          <h1 className="text-7xl md:text-[10rem] font-serif font-black tracking-tighter mb-10 leading-[0.85] text-white uppercase italic">
            DOMINE O SEU <br/>
            <span className="gold-text">DESTINO</span>
          </h1>
          <p className="text-2xl md:text-3xl text-white/60 mb-16 max-w-4xl mx-auto font-light leading-relaxed tracking-wide">
            A sofisticação da tecnologia ao serviço da sua gestão. PDV, Financeiro e Marketing integrados em uma experiência transcendental.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-10">
            <button 
               onClick={() => setCurrentSection('signup')}
               className="w-full sm:w-auto px-16 py-8 text-3xl font-black text-[#0a0e17] bg-gradient-to-b from-[#f9d976] to-[#c5a059] rounded-full hover:scale-105 active:scale-95 transition-all uppercase italic shadow-[0_20px_50px_rgba(197,160,89,0.3)]"
            >
              ELEVAR MEU NEGÓCIO
              <ChevronRight className="w-10 h-10 inline-block ml-4" />
            </button>
            <div className="flex items-center gap-8 text-[11px] font-bold text-white/40 uppercase tracking-[0.4em]">
               <span>✓ Free Full Access</span>
               <span className="w-2 h-2 rounded-full bg-[#c5a059]"></span>
               <span>✓ No Credit Card</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Grid Segments */}
      <div className="py-20 bg-black/40 border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-between gap-8 opacity-40 font-black uppercase tracking-[0.3em] text-[10px] italic">
           {['Coleções Elite', 'Alta Relojoaria', 'Salfaiataria', 'Ateliers de Luxo', 'Barbearias Signature', 'Concept Stores'].map((s, i) => (
             <span key={i} className="hover:text-[#c5a059] transition-colors cursor-default tracking-[0.5em]">{s}</span>
           ))}
        </div>
      </div>

      {/* CRM Teaser Section */}
      <section className="py-40 px-4 bg-[#0a0e17] border-y border-white/5 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c5a059] text-[#0a0e17] text-[10px] font-black uppercase tracking-widest mb-10 italic">
                NOVO — CRM ELITE
              </div>
              <h2 className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-white uppercase leading-[0.85] mb-10 italic">
                Fidelização em <br/>
                <span className="gold-text">Estado Criativo</span>
              </h2>
              <p className="text-xl text-white/50 font-light leading-relaxed mb-12 tracking-wide italic">
                Controle cada interação com a precisão de um relojoeiro. Funil de vendas cinematográfico integrado às maiores redes do mundo.
              </p>
              
              <div className="flex flex-wrap gap-10 mb-16">
                 {[
                   { label: 'Funil Kanban', icon: <ClipboardList className="w-6 h-6" /> },
                   { label: 'Instagram', icon: <Instagram className="w-6 h-6" /> },
                   { label: 'Facebook', icon: <Facebook className="w-6 h-6" /> },
                   { label: 'WhatsApp', icon: <MessageSquare className="w-6 h-6" /> },
                 ].map((item, i) => (
                   <div key={i} className="flex flex-col items-center gap-4 group">
                      <div className="w-14 h-14 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center text-white/40 group-hover:text-[#c5a059] group-hover:border-[#c5a059] transition-all duration-500 luxury-gradient">
                        {item.icon}
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30">{item.label}</span>
                   </div>
                 ))}
              </div>
              
              <div className="flex items-center gap-12">
                 <div className="luxury-card p-6 border-[#c5a059]/20">
                    <p className="text-4xl font-black gold-text italic">100%</p>
                    <p className="text-[9px] font-black uppercase text-white/40 tracking-[0.3em]">Scalability</p>
                 </div>
                 <button 
                  onClick={() => {
                    const el = document.getElementById('pricing');
                    el?.scrollIntoView({ behavior: 'smooth' });
                    setActivePlanTab('crm_pdv');
                  }}
                  className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-bold uppercase text-[10px] tracking-[0.3em] hover:bg-white/10 transition-all italic"
                 >
                   Conhecer o Funil
                 </button>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="luxury-card p-12 rotate-3 border-white/20">
                 <div className="flex gap-4 mb-12">
                    {[
                      { title: 'Novo Lead', count: 8, color: '#c5a059' },
                      { title: 'Contato', count: 5, color: '#3b82f6' },
                      { title: 'Proposta', count: 3, color: '#a855f7' },
                      { title: 'Fechado', count: 12, color: '#10b981' },
                    ].map((col, i) => (
                      <div key={i} className="flex-1">
                        <div className="p-4 rounded-2xl bg-white/5 text-center mb-4 border border-white/10">
                           <p className="text-lg font-black text-white">{col.count}</p>
                        </div>
                        <p className="text-[9px] font-black uppercase text-white/30 text-center tracking-tighter leading-none">{col.title}</p>
                      </div>
                    ))}
                 </div>
                 <div className="space-y-4">
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all">
                       <span className="text-sm font-bold text-white">Constança de Bragança</span>
                       <Instagram className="w-5 h-5 text-[#c5a059]" />
                    </div>
                    <div className="p-6 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-between group hover:bg-white/10 transition-all">
                       <span className="text-sm font-bold text-white">Vogue Boutique</span>
                       <MessageSquare className="w-5 h-5 text-emerald-500" />
                    </div>
                 </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Partners / Banking Section */}
      <section className="py-40 px-4 bg-[#0a0e17]">
          <div className="max-w-7xl mx-auto">
             <div className="text-center mb-32">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c5a059] mb-6 inline-block italic border-b border-[#c5a059] pb-2">Ecossistema</h3>
                <h2 className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-white uppercase leading-none italic">Alianças de <br/><span className="gold-text">Valor</span></h2>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {financialPartners.map((p, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="luxury-card p-12 luxury-gradient group transition-all duration-700"
                  >
                     <h4 className="text-2xl font-serif font-bold text-white mb-4 uppercase tracking-tighter italic">{p.name}</h4>
                     <p className="text-sm text-white/40 font-light mb-10 leading-relaxed tracking-wide italic">{p.desc}</p>
                     <a 
                       href={p.link} 
                       target="_blank" 
                       rel="noopener noreferrer"
                       className="inline-flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.3em] text-[#c5a059] group-hover:underline underline-offset-8"
                     >
                       RESERVAR MAQUINA
                       <ArrowUpRight className="w-4 h-4" />
                     </a>
                  </motion.div>
                ))}
             </div>
          </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-40 px-4 bg-[#0a0e17] relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/carbon-fibre.png")' }}></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row items-end justify-between mb-24 gap-8">
            <div className="max-w-xl">
               <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c5a059] mb-6 inline-block italic border-b border-[#c5a059] pb-2">Exclusividade</h3>
               <h2 className="text-5xl md:text-7xl font-serif font-black tracking-tighter text-white uppercase leading-none">O Ecossistema <br/><span className="gold-text">Perfeito</span></h2>
            </div>
            <p className="text-white/40 text-lg font-light max-w-sm md:text-right tracking-wide italic">Arquitetura de ponta para empresários que não aceitam menos que o topo.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="luxury-card p-10 group hover:bg-white/10 transition-all duration-500"
              >
                <div className="w-16 h-16 bg-[#c5a059]/10 rounded-full flex items-center justify-center text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-[#0a0e17] transition-all duration-500 mb-8 border border-[#c5a059]/20 shadow-lg">
                  {f.icon}
                </div>
                <h4 className="font-serif font-bold text-2xl mb-4 text-white italic">{f.title}</h4>
                <p className="text-sm text-white/50 leading-relaxed font-light tracking-wide">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section id="pricing" className="py-40 px-4 bg-[#05080d] overflow-hidden relative border-y border-white/5">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-900/10 blur-[200px] rounded-full pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
             <div className="text-center mb-32">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c5a059] mb-6 inline-block italic border-b border-[#c5a059] pb-2">Assinaturas</h3>
                <h2 className="text-5xl md:text-8xl font-serif font-black tracking-tighter text-white uppercase leading-none mb-16 italic">Escolha sua <br/> <span className="gold-text">Liderança</span></h2>
                
                {/* Plan Categories Tabs */}
                <div className="flex flex-wrap justify-center gap-4 mb-20">
                  {planCategories.map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => setActivePlanTab(cat.id as any)}
                      className={`px-10 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all border ${activePlanTab === cat.id ? 'bg-[#c5a059] border-[#c5a059] text-[#0a0e17] shadow-xl' : 'bg-white/5 border-white/10 text-white/40 hover:text-white'}`}
                    >
                      {cat.label}
                    </button>
                  ))}
                </div>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
               {(allPlans[activePlanTab] || []).map((p, i) => (
                 <div key={i} className={`luxury-card luxury-gradient p-12 flex flex-col relative group transition-all duration-700 hover:-translate-y-4 ${p.popular ? 'border-[#c5a059]/40 bg-[#c5a059]/5' : ''}`}>
                    {p.popular && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-10 py-3 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] text-xs font-black rounded-full uppercase tracking-widest shadow-2xl italic">
                        LUXURY CHOICE
                      </div>
                    )}
                    {p.badge && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-10 py-3 bg-white text-[#0a0e17] text-xs font-black rounded-full uppercase tracking-widest shadow-2xl italic">
                        {p.badge}
                      </div>
                    )}
                    <div className="mb-14 text-center">
                       <h4 className="font-bold uppercase tracking-[0.3em] text-sm mb-8 text-white/50 italic">{p.name}</h4>
                       <div className="flex items-baseline justify-center gap-3">
                          <span className="text-2xl font-serif italic text-[#c5a059] opacity-60">R$</span>
                          <span className="text-8xl font-serif font-black tracking-tighter gold-text">{p.price}</span>
                          <span className="text-sm font-bold text-white/30 uppercase tracking-[0.2em]">{p.name.includes("Curso") ? "Único" : "/mês"}</span>
                       </div>
                    </div>
                    <ul className="space-y-6 mb-16 flex-1">
                       {p.features.map((f, j) => (
                         <li key={j} className="flex gap-4 text-sm font-medium items-start leading-tight text-white/70">
                            <CheckCircle2 className={`w-6 h-6 shrink-0 ${p.popular ? 'text-[#c5a059]' : 'text-white/20'}`} />
                            {f}
                         </li>
                       ))}
                    </ul>
                    <button 
                      onClick={() => setSelectedPlan(p)}
                      className={`w-full py-8 rounded-full font-black tracking-[0.2em] text-xs uppercase transition-all duration-500 ${p.popular ? 'bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] hover:scale-105 shadow-[0_15px_40px_rgba(197,160,89,0.3)]' : 'bg-white/5 border border-white/20 text-white hover:bg-white/10'}`}
                    >
                       RESERVAR ACESSO
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
              className="absolute inset-0 bg-[#05080d]/95 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-[#0a0e17] rounded-[3rem] overflow-hidden shadow-2xl border border-white/10 luxury-gradient"
            >
              <button 
                onClick={() => setSelectedPlan(null)}
                className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10 border border-white/10"
              >
                <X className="w-5 h-5 text-white/50" />
              </button>

              <div className="p-12">
                <div className="flex items-center gap-6 mb-12">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#f9d976] to-[#c5a059] rounded-2xl flex items-center justify-center text-[#0a0e17]">
                    <QrCode className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-serif font-black tracking-tight text-white uppercase italic">Protocolo de Adesão</h3>
                    <p className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.3em]">Módulo {selectedPlan.name} • Investimento Mensal</p>
                  </div>
                </div>

                <div className="space-y-6">
                  <button 
                    onClick={handleMercadoPagoCheckout}
                    disabled={isGeneratingPayment}
                    className="w-full py-6 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full font-bold uppercase tracking-[0.3em] text-xs hover:scale-[1.02] transition-all shadow-xl shadow-[#c5a059]/20 flex items-center justify-center gap-3 disabled:opacity-50"
                  >
                    {isGeneratingPayment ? (
                      <span className="animate-pulse">PROCESSANDO...</span>
                    ) : (
                      <>
                        <CreditCard className="w-5 h-5" />
                        PAGAR COM MERCADO PAGO
                      </>
                    )}
                  </button>

                  <div className="flex items-center gap-4 py-4">
                    <div className="flex-1 h-px bg-white/5"></div>
                    <span className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em]">OU TRANSFERÊNCIA PIX</span>
                    <div className="flex-1 h-px bg-white/5"></div>
                  </div>

                  <div className="luxury-card bg-white/5 p-8 rounded-3xl mb-6 flex flex-col items-center">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-6">CHAVE DE TRANSAÇÃO INSTANTÂNEA</p>
                    
                    <div className="w-full bg-[#05080d] p-5 rounded-2xl border border-white/5 mb-4 flex items-center gap-4 group">
                      <div className="flex-1 min-w-0 truncate text-[10px] font-mono font-bold text-white/40 tracking-wider">
                        {pixKey}
                      </div>
                      <button 
                        onClick={handleCopyPix}
                        className="p-3 bg-[#c5a059]/10 text-[#c5a059] rounded-xl hover:bg-[#c5a059] hover:text-[#0a0e17] transition-all"
                      >
                        {copied ? <CheckCircle2 className="w-4.5 h-4.5" /> : <Copy className="w-4.5 h-4.5" />}
                      </button>
                    </div>
                    <p className="text-[10px] font-medium text-white/20 italic">Liberação automática via inteligência de rede</p>
                  </div>

                  <div className="flex items-start gap-4 p-5 bg-[#10b981]/5 rounded-2xl border border-[#10b981]/10">
                    <ShieldCheck className="w-6 h-6 text-[#10b981] shrink-0" />
                    <p className="text-[11px] font-medium text-[#10b981]/80 leading-relaxed italic">
                      Transação Segura. O acesso Elite será liberado instantaneamente após a confirmação do protocolo.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <footer className="py-24 px-4 bg-[#05080d] border-t border-white/5 text-center relative overflow-hidden">
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#c5a059]/20 to-transparent"></div>
        <p className="text-[10px] font-black gold-text uppercase tracking-[0.5em] italic">MegaFoco PDV ELITE © 2026</p>
      </footer>
    </div>
  );

  const Summary = () => (
    <div className="space-y-8">
       {/* System Notification */}
       <motion.div 
         initial={{ opacity: 0, y: -20 }}
         animate={{ opacity: 1, y: 0 }}
         className="bg-[#c5a059]/10 border border-[#c5a059]/20 p-6 rounded-[2.5rem] flex items-center justify-between luxury-gradient"
       >
         <div className="flex items-center gap-6">
           <div className="w-12 h-12 bg-gradient-to-br from-[#f9d976] to-[#c5a059] rounded-2xl flex items-center justify-center text-[#0a0e17] shadow-lg shadow-[#c5a059]/20">
             <Calendar className="w-6 h-6" />
           </div>
           <div>
             <p className="text-[10px] font-black uppercase text-[#c5a059] tracking-[0.4em] mb-1 italic">Convocação do Board</p>
             <h4 className="text-xl font-serif font-black text-white tracking-tight uppercase italic">Reunião VIP de Estratégia — Sexta 18h</h4>
           </div>
         </div>
         <button className="px-8 py-3 bg-white/5 border border-white/10 text-white rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-[#c5a059] hover:text-[#0a0e17] transition-all duration-500">Confirmar Presença</button>
       </motion.div>

       {/* Top Row Cards */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'Receita Hoje', value: 'R$ 3.842,50', change: '+12%', icon: <CreditCard className="w-5 h-5" />, color: '#f9d976' },
            { label: 'Vendas Ativas', value: '24', change: '+5', icon: <ShoppingBag className="w-5 h-5" />, color: '#c5a059' },
            { label: 'Agendamentos', value: '18', change: '8 pendentes', icon: <Calendar className="w-5 h-5" />, color: '#fff' },
            { label: 'Novos Clientes', value: '+7', change: '142 este mês', icon: <Users className="w-5 h-5" />, color: '#f9d976' },
          ].map((stat, i) => (
            <div key={i} className="luxury-card bg-white/5 p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between group hover:border-[#c5a059]/30 transition-all duration-700 cursor-default">
               <div className="flex justify-between items-center mb-8">
                  <div className="p-3 rounded-2xl bg-white/5 text-[#c5a059] group-hover:bg-[#c5a059] group-hover:text-[#0a0e17] transition-all duration-500 shadow-inner">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-bold text-[#10b981] bg-[#10b981]/10 px-3 py-1 rounded-full border border-[#10b981]/20 italic">{stat.change}</span>
               </div>
               <div>
                  <p className="text-[10px] font-bold uppercase text-white/30 tracking-[0.4em] mb-2 italic">{stat.label}</p>
                  <p className="text-3xl font-serif font-black text-white tracking-tighter gold-text">{stat.value}</p>
               </div>
            </div>
          ))}
       </div>

       {/* Middle Row Charts/Lists */}
       <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 bg-[#0a0e17] rounded-[3rem] border border-white/5 p-10 flex flex-col luxury-gradient shadow-2xl">
             <div className="flex items-center justify-between mb-10">
                <div className="flex flex-col">
                   <h3 className="text-xs font-bold uppercase tracking-[0.5em] text-white/30 mb-2 italic">Movimentação Financeira</h3>
                   <h2 className="text-2xl font-serif font-black text-white italic tracking-tight">Transações de Hoje</h2>
                </div>
                <div className="flex gap-3">
                   <div className="w-2.5 h-2.5 rounded-full bg-white/10"></div>
                   <div className="w-2.5 h-2.5 rounded-full bg-[#f9d976]"></div>
                </div>
             </div>
             
             <div className="flex-1 space-y-5">
                {[1, 2, 3, 4, 5].map((v) => (
                  <div key={v} className="flex items-center justify-between p-6 rounded-3xl border border-white/5 hover:bg-white/5 transition-all duration-500 cursor-pointer group">
                     <div className="flex items-center gap-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center font-serif italic font-black text-white/20 text-sm border border-white/5 shadow-inner group-hover:text-[#c5a059] transition-colors">0{v}</div>
                        <div>
                           <p className="text-sm font-bold text-white tracking-[0.1em] uppercase mb-1">Venda Direta #{1020 + v}</p>
                           <p className="text-[9px] uppercase font-black text-white/20 tracking-[0.2em] italic">Platinum Card • 14:2{v}</p>
                        </div>
                     </div>
                     <div className="text-right">
                        <p className="text-lg font-serif font-black text-white tracking-tight italic gold-text">R$ {(v * 125.5).toFixed(2)}</p>
                        <p className="text-[9px] font-black uppercase text-[#10b981] tracking-[0.1em]">LIQUIDADO</p>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="space-y-8">
             <div className="bg-gradient-to-br from-[#111827] to-[#010101] rounded-[3rem] p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c5a059]/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
                
                <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] mb-10 text-white/30 italic">Tesouraria</h3>
                <p className="text-5xl font-serif font-black tracking-tighter mb-4 text-white italic gold-text">R$ 4.250,50</p>
                <p className="text-[10px] font-bold text-white/20 mb-12 uppercase tracking-[0.4em] italic">Saldo Consolidado Elite</p>
                
                <div className="space-y-4">
                   <button className="w-full py-5 bg-gradient-to-r from-[#f9d976] to-[#c5a059] rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-[#0a0e17] hover:scale-[1.03] transition-all shadow-xl shadow-[#c5a059]/20">REQUISITAR PDV</button>
                   <button className="w-full py-5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-white/60 hover:bg-white/10 hover:text-white transition-all italic">ENCERRAMENTO FISCAL</button>
                </div>
             </div>

             <div className="bg-[#0a0e17] rounded-[3rem] border border-white/5 p-10 luxury-gradient">
                <h3 className="text-[10px] font-bold uppercase tracking-[0.5em] mb-8 text-white/30 italic">Gestão de Insumos</h3>
                <div className="space-y-6">
                   {[
                     { name: 'Shampoo Liso Elite', stock: 2 },
                     { name: 'Sabonete Hidratação', stock: 1 },
                     { name: 'Óleo Repair Platinum', stock: 0 },
                   ].map((item, i) => (
                     <div key={i} className="flex justify-between items-center group">
                        <div className="flex items-center gap-4">
                           <div className={`w-2 h-2 rounded-full ${item.stock === 0 ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)] animate-pulse' : 'bg-[#c5a059]'}`}></div>
                           <p className="text-xs font-bold text-white/60 group-hover:text-white transition-colors italic tracking-wide">{item.name}</p>
                        </div>
                        <p className={`text-[10px] font-black uppercase ${item.stock === 0 ? 'text-rose-500' : 'text-[#c5a059]'} bg-white/5 px-4 py-1.5 rounded-full border border-white/5`}>{item.stock} UN</p>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-10 py-5 border border-dashed border-white/10 rounded-3xl text-[10px] font-black uppercase text-white/20 tracking-[0.3em] hover:text-[#c5a059] hover:border-[#c5a059]/30 transition-all italic">REPOUSIÇÃO IMEDIATA</button>
             </div>
          </div>
       </div>
    </div>
  );

  const Dashboard = () => (
    <div className="flex h-screen bg-[#05080d] font-display relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-900/10 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
      
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-80 bg-[#05080d] text-white flex-col p-8 shrink-0 overflow-y-auto custom-scrollbar border-r border-white/5 shadow-2xl">
         <div className="flex items-center gap-4 mb-16">
            <div className="w-14 h-14 bg-gradient-to-br from-[#f9d976] to-[#c5a059] rounded-2xl flex items-center justify-center text-[#0a0e17] text-2xl font-black italic shadow-lg">M</div>
            <div className="flex flex-col">
               <span className="text-2xl font-serif font-black tracking-tighter uppercase leading-[0.8] mb-1 italic gold-text">MegaFoco</span>
               <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">ELITE PDV v1.2</span>
            </div>
         </div>

         <div className="space-y-10 flex-1">
            {/* Principal */}
            <div>
              <p className="text-[10px] font-bold uppercase text-white/20 tracking-[0.4em] mb-6 ml-2 italic">Principal</p>
              <nav className="space-y-3">
                {[
                  { id: 'dashboard', icon: <LineChart className="w-5 h-5" />, label: 'Dashboard' },
                  { id: 'pdv', icon: <ShoppingBag className="w-5 h-5" />, label: 'Executivo (PDV)' },
                  { id: 'comandas', icon: <ClipboardList className="w-5 h-5" />, label: 'Comandas' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentSection(item.id as Section)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${currentSection === item.id ? 'bg-[#c5a059] text-[#0a0e17] border-[#c5a059] shadow-xl shadow-[#c5a059]/10' : 'text-white/40 border-transparent hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Cadastros */}
            <div>
              <p className="text-[10px] font-bold uppercase text-white/20 tracking-[0.4em] mb-6 ml-2 italic">Patrimônio</p>
              <nav className="space-y-3">
                {[
                  { id: 'stock', icon: <Package className="w-5 h-5" />, label: 'Coleções' },
                  { id: 'services', icon: <Scissors className="w-5 h-5" />, label: 'Serviços' },
                  { id: 'clients', icon: <UserCircle className="w-5 h-5" />, label: 'Membros' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentSection(item.id as Section)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${currentSection === item.id ? 'bg-[#c5a059] text-[#0a0e17] border-[#c5a059] shadow-xl shadow-[#c5a059]/10' : 'text-white/40 border-transparent hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Operações */}
            <div>
              <p className="text-[10px] font-bold uppercase text-white/20 tracking-[0.4em] mb-6 ml-2 italic">Ação & Movimento</p>
              <nav className="space-y-3">
                {[
                  { id: 'agenda', icon: <Calendar className="w-5 h-5" />, label: 'Reservas' },
                  { id: 'finance', icon: <DollarSign className="w-5 h-5" />, label: 'Capital' },
                  { id: 'ponto', icon: <Clock className="w-5 h-5" />, label: 'Ponto RH' },
                  { id: 'vales', icon: <CreditCard className="w-5 h-5" />, label: 'Protocolos' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentSection(item.id as Section)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${currentSection === item.id ? 'bg-[#c5a059] text-[#0a0e17] border-[#c5a059] shadow-xl shadow-[#c5a059]/10' : 'text-white/40 border-transparent hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Gestão */}
            <div>
              <p className="text-[10px] font-bold uppercase text-white/20 tracking-[0.4em] mb-6 ml-2 italic">Inteligência Luxo</p>
              <nav className="space-y-3">
                {[
                  { id: 'config', icon: <Settings className="w-5 h-5" />, label: 'Setup Loja' },
                  { id: 'solutions', icon: <QrCode className="w-5 h-5" />, label: 'PIX / Elite' },
                  { id: 'reports', icon: <LineChart className="w-5 h-5" />, label: 'Relatórios' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentSection(item.id as Section)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${currentSection === item.id ? 'bg-[#c5a059] text-[#0a0e17] border-[#c5a059] shadow-xl shadow-[#c5a059]/10' : 'text-white/40 border-transparent hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Marketing */}
            <div>
              <p className="text-[10px] font-bold uppercase text-white/20 tracking-[0.4em] mb-6 ml-2 italic">Influência</p>
              <nav className="space-y-3">
                {[
                  { id: 'crm', icon: <Users className="w-5 h-5" />, label: 'CRM / Leads' },
                  { id: 'whatsapp', icon: <MessageSquare className="w-5 h-5" />, label: 'Whats App' },
                  { id: 'nfe', icon: <FileText className="w-5 h-5" />, label: 'Protocolo NF-e' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentSection(item.id as Section)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${currentSection === item.id ? 'bg-[#c5a059] text-[#0a0e17] border-[#c5a059] shadow-xl shadow-[#c5a059]/10' : 'text-white/40 border-transparent hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* SEFAZ */}
            <div>
              <p className="text-[10px] font-bold uppercase text-white/20 tracking-[0.4em] mb-6 ml-2 italic">Fiscal</p>
              <nav className="space-y-3">
                {[
                  { id: 'nfe', icon: <FileText className="w-5 h-5" />, label: 'SEFAZ / NF-e' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentSection(item.id as Section)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${currentSection === item.id ? 'bg-[#c5a059] text-[#0a0e17] border-[#c5a059] shadow-xl shadow-[#c5a059]/10' : 'text-white/40 border-transparent hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Ferramentas */}
            <div>
              <p className="text-[10px] font-bold uppercase text-white/20 tracking-[0.4em] mb-6 ml-2 italic">Ferramentas</p>
              <nav className="space-y-3">
                {[
                  { id: 'calc', icon: <Calculator className="w-5 h-5" />, label: 'Calculadora' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentSection(item.id as Section)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${currentSection === item.id ? 'bg-[#c5a059] text-[#0a0e17] border-[#c5a059] shadow-xl shadow-[#c5a059]/10' : 'text-white/40 border-transparent hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Admin */}
            <div>
              <p className="text-[10px] font-bold uppercase text-white/20 tracking-[0.4em] mb-6 ml-2 italic">Administração</p>
              <nav className="space-y-3">
                {[
                  { id: 'admin_panel', icon: <ShieldCheck className="w-5 h-5" />, label: 'Painel Admin' },
                  { id: 'indication', icon: <Share2 className="w-5 h-5" />, label: 'Indicação' },
                  { id: 'privacy', icon: <Lock className="w-5 h-5" />, label: 'Privacidade & Ética' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentSection(item.id as Section)}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${currentSection === item.id ? 'bg-[#c5a059] text-[#0a0e17] border-[#c5a059] shadow-xl shadow-[#c5a059]/10' : 'text-white/40 border-transparent hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
         </div>

         <div className="mt-10 pt-6 border-t border-white/5 space-y-6">
            <div className="flex items-center gap-4 px-2">
               <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-lg luxury-gradient">
                  <UserCircle className="w-6 h-6 text-[#c5a059]" />
               </div>
               <div className="flex-1 min-w-0">
                  <p className="text-[11px] font-black uppercase tracking-[0.2em] text-white truncate">Diretor Executivo</p>
                  <p className="text-[9px] font-bold text-white/30 uppercase italic tracking-widest">Unidade Master #001</p>
               </div>
            </div>
            <button 
               onClick={() => setCurrentSection('landing')}
               className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-rose-500/80 hover:bg-rose-500 hover:text-white transition-all duration-500 border border-rose-500/20"
            >
               <LogOut className="w-4 h-4" />
               Derrubar Conexão
            </button>
         </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0">
         {/* Navigation Bar */}
         <header className="h-24 bg-[#0a0e17] border-b border-white/5 px-12 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-5">
               <div className="w-3 h-3 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.4)]"></div>
               <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-white/30 italic">Infraestrutura em Tempo Real</h2>
            </div>
            
            <div className="flex items-center gap-6">
               <div className="hidden sm:flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 italic">
                  <Clock className="w-4 h-4 text-[#c5a059]" />
                  Uptime: 99.9%
               </div>
               <button 
                  onClick={() => setCurrentSection('landing')}
                  className="px-8 py-3 bg-white/5 border border-white/20 text-white hover:bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.3em] transition-all italic"
               >
                  VISTA PÚBLICA
               </button>
            </div>
         </header>

         {/* Content Scrollable */}
         <div className="flex-1 overflow-y-auto p-12 bg-[#05080d] custom-scrollbar">
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
                 {currentSection === 'comandas' && (
                   <div className="flex flex-col items-center justify-center py-56 text-center luxury-card luxury-gradient border-white/5">
                     <div className="w-24 h-24 bg-white/5 text-[#c5a059] rounded-[2.5rem] border border-white/10 flex items-center justify-center mb-10">
                       <ClipboardList className="w-12 h-12" />
                     </div>
                     <h2 className="text-4xl font-serif font-black uppercase tracking-tighter gold-text italic mb-4">Gestão de Comandas Elite</h2>
                     <p className="text-white/30 font-bold max-w-xs uppercase text-[10px] tracking-[0.5em] italic">Controle transacional em tempo real com precisão absoluta</p>
                   </div>
                 )}
                 {currentSection === 'crm' && <CRM />}
                 {currentSection === 'stock' && <Inventory />}
                 {currentSection === 'services' && (
                    <div className="flex flex-col items-center justify-center py-56 text-center luxury-card luxury-gradient border-white/5">
                      <div className="w-24 h-24 bg-white/5 text-[#c5a059] rounded-[2.5rem] border border-white/10 flex items-center justify-center mb-10">
                        <Scissors className="w-12 h-12" />
                      </div>
                      <h2 className="text-4xl font-serif font-black uppercase tracking-tighter gold-text italic mb-4">Portfólio de Serviços</h2>
                      <p className="text-white/30 font-bold max-w-xs uppercase text-[10px] tracking-[0.5em] italic">Arquitetura de expertises e procedimentos premium</p>
                    </div>
                 )}
                 {currentSection === 'finance' && <Financeiro />}
                 {currentSection === 'solutions' && (
                   <div className="space-y-12">
                     <div className="flex flex-col">
                       <h2 className="text-4xl font-serif italic font-black text-white tracking-tighter uppercase mb-4 gold-text">Alianças de Valor</h2>
                       <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.5em] italic">Ecossistema bancário para operações de alto nível</p>
                     </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {financialPartners.map((p, i) => (
                          <div key={i} className="luxury-card p-12 border-white/5 relative overflow-hidden group luxury-gradient">
                             <div className={`absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700`}></div>
                             <div className="relative z-10">
                               <h3 className="text-2xl font-serif italic font-black text-white mb-4 uppercase tracking-tighter">{p.name}</h3>
                               <p className="text-sm text-white/40 font-light leading-relaxed mb-10 italic tracking-wide">{p.desc}</p>
                               <a 
                                 href={p.link} 
                                 target="_blank" 
                                 rel="noopener noreferrer"
                                 className="w-full py-5 bg-white/5 border border-white/10 text-[#c5a059] rounded-full font-black uppercase tracking-[0.3em] text-[10px] flex items-center justify-center gap-3 hover:bg-[#c5a059] hover:text-[#0a0e17] transition-all duration-500 shadow-2xl italic"
                               >
                                 SOLICITAR CRÉDITO <ArrowUpRight className="w-4 h-4" />
                               </a>
                             </div>
                          </div>
                        ))}
                     </div>
                   </div>
                 )}
                 {currentSection === 'agenda' && <Agenda />}
                 {currentSection === 'clients' && <Clientes />}
                 {currentSection === 'ponto' && <RH />}
                 {currentSection === 'vales' && (
                   <div className="bg-white/5 p-16 rounded-[3rem] border border-white/10 flex flex-col items-center justify-center text-center luxury-gradient">
                      <CreditCard className="w-16 h-16 text-[#c5a059]/40 mb-8" />
                      <h3 className="text-3xl font-serif font-black uppercase italic tracking-tighter gold-text">Gestão de Vales</h3>
                      <p className="text-white/30 font-bold max-w-xs mt-4 uppercase text-[10px] tracking-[0.3em]">Controle o fluxo de caixa pessoal da equipe com exclusividade</p>
                   </div>
                 )}
                 {currentSection === 'config' && (
                   <div className="luxury-card p-12 border-white/5 luxury-gradient">
                      <div className="flex items-center gap-4 mb-10">
                        <div className="w-16 h-16 bg-[#c5a059]/10 rounded-2xl flex items-center justify-center gold-text border border-[#c5a059]/20 shadow-inner"><Settings className="w-8 h-8" /></div>
                        <h3 className="text-3xl font-serif italic font-black uppercase gold-text">Configurações da Loja</h3>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/5">
                             <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] mb-6 italic">Perfil Corporativo</p>
                             <input type="text" placeholder="Designação Fantasia" className="w-full p-6 bg-white/5 border border-white/5 rounded-3xl font-bold text-white placeholder:text-white/10 focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all uppercase tracking-widest text-xs mb-4" />
                             <input type="text" placeholder="Protocolo Fiscal (CNPJ)" className="w-full p-6 bg-white/5 border border-white/5 rounded-3xl font-bold text-white placeholder:text-white/10 focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all uppercase tracking-widest text-xs" />
                          </div>
                        <div className="p-10 bg-white/5 rounded-[2.5rem] border border-white/5">
                             <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] mb-6 italic">Protocolos de Impressão</p>
                             <label className="flex items-center gap-4 cursor-pointer group">
                                <div className="w-6 h-6 rounded-lg border-2 border-white/10 group-hover:border-[#c5a059]/50 transition-all flex items-center justify-center">
                                   <div className="w-3 h-3 bg-[#c5a059] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                </div>
                                <span className="text-[11px] font-black text-white/40 uppercase tracking-widest italic group-hover:text-white transition-colors">Emissão de Comprovante Digital Automático</span>
                             </label>
                          </div>
                      </div>
                   </div>
                 )}
                 {currentSection === 'reports' && (
                    <div className="flex flex-col items-center justify-center py-40 text-center opacity-30">
                      <FileText className="w-16 h-16 mb-4" />
                      <h2 className="text-2xl font-black uppercase tracking-tighter">Relatórios Avançados</h2>
                      <p className="text-sm font-bold">Gerando BI e Inteligência de Negócio...</p>
                    </div>
                 )}
                 {['whatsapp', 'social', 'google'].includes(currentSection) && (
                    <div className="flex flex-col items-center justify-center py-56 text-center luxury-card luxury-gradient border-white/5">
                       <div className="p-10 bg-[#c5a059]/10 text-[#c5a059] rounded-[2.5rem] mb-10 border border-[#c5a059]/20 shadow-2xl">
                          {currentSection === 'whatsapp' && <MessageSquare className="w-16 h-16" />}
                          {currentSection === 'social' && <Image className="w-16 h-16" />}
                          {currentSection === 'google' && <Globe className="w-16 h-16" />}
                       </div>
                       <h2 className="text-4xl font-serif italic font-black uppercase tracking-tighter gold-text mb-4">Arquitetura de Presença</h2>
                       <p className="text-white/30 font-bold max-w-sm uppercase text-[10px] tracking-[0.5em] italic">Engenharia de autoridade e influência digital automatizada</p>
                    </div>
                 )}
                 {currentSection === 'nfe' && (
                    <div className="luxury-card p-20 rounded-[3rem] text-center overflow-hidden relative luxury-gradient border-white/10">
                       <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent"></div>
                       <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full translate-y-1/2"></div>
                       <FileText className="w-20 h-20 mx-auto mb-10 text-[#c5a059] opacity-40" />
                       <h2 className="text-5xl font-serif italic font-black tracking-tighter uppercase gold-text mb-8">Módulo Fiscal SEFAZ-PRO</h2>
                       <p className="text-white/40 max-w-lg mx-auto font-bold uppercase text-[11px] tracking-[0.3em] leading-relaxed mb-12 italic">Chancelamento automático de ativos e protocolos de conformidade SEFAZ com certificação Platinum.</p>
                       <button className="px-16 py-6 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full font-black uppercase tracking-widest hover:scale-105 transition-all shadow-2xl shadow-[#c5a059]/20">Validar Certificado A1</button>
                    </div>
                 )}
                 {currentSection === 'calc' && (
                    <div className="max-w-md mx-auto bg-black/40 p-12 rounded-[3.5rem] border border-white/5 luxury-gradient shadow-[0_50px_100px_rgba(0,0,0,0.5)]">
                       <div className="bg-white/5 p-10 rounded-3xl text-right mb-8 border border-white/5 shadow-inner">
                          <p className="text-[#c5a059] text-[9px] font-black uppercase tracking-[0.5em] italic mb-3">Simulação Monetária</p>
                          <p className="text-5xl font-serif italic font-black gold-text tracking-tighter">0.00</p>
                       </div>
                       <div className="grid grid-cols-4 gap-4">
                          {[7,8,9,'/', 4,5,6,'*', 1,2,3,'-', 0,'.','=','+'].map(key => (
                            <button key={key} className={`h-16 rounded-2xl font-serif italic font-black text-lg transition-all duration-300 flex items-center justify-center ${typeof key === 'number' ? 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white' : 'bg-[#c5a059]/10 text-[#c5a059] hover:bg-[#c5a059] hover:text-[#0a0e17] shadow-lg shadow-[#c5a059]/10'}`}>{key}</button>
                          ))}
                       </div>
                                    </div>
                     )}
                  </motion.div>
               </AnimatePresence>
            </div>
         </main>
      </div>
    );

  const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', business: '' });
    
    return (
      <div className="min-h-screen bg-[#05080d] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Decorative Elemets */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c5a059]/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-lg bg-[#0a0e17] p-16 rounded-[4rem] border border-white/5 shadow-2xl relative z-10 luxury-gradient"
        >
          <div className="text-center mb-12">
            <div className="w-20 h-20 bg-gradient-to-br from-[#f9d976] to-[#c5a059] rounded-[2rem] flex items-center justify-center text-[#0a0e17] text-4xl font-black italic mx-auto mb-8 shadow-2xl shadow-[#c5a059]/20">M</div>
            <h2 className="text-4xl font-serif font-black tracking-tighter text-white uppercase italic leading-none mb-4">Protocolo de Adesão</h2>
            <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] italic">Inicie sua jornada Elite no PDV</p>
          </div>
          
          <div className="space-y-6">
            <div className="group">
              <p className="text-[10px] font-bold uppercase text-[#c5a059] tracking-[0.4em] mb-3 ml-4 italic">Designação do Proprietário</p>
              <input 
                type="text" 
                placeholder="NOME COMPLETO DO TITULAR" 
                className="w-full p-6 bg-white/5 border border-white/5 rounded-3xl font-bold text-white placeholder:text-white/10 focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all uppercase tracking-widest text-xs"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="group">
              <p className="text-[10px] font-bold uppercase text-[#c5a059] tracking-[0.4em] mb-3 ml-4 italic">Canal de Comunicação Elite</p>
              <input 
                type="email" 
                placeholder="SEU@EMAIL.PREMIUM" 
                className="w-full p-6 bg-white/5 border border-white/5 rounded-3xl font-bold text-white placeholder:text-white/10 focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all uppercase tracking-widest text-xs"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="group">
              <p className="text-[10px] font-bold uppercase text-[#c5a059] tracking-[0.4em] mb-3 ml-4 italic">Identidade Corporativa</p>
              <input 
                type="text" 
                placeholder="EX: ATELIER DE LUXO MATRIZ" 
                className="w-full p-6 bg-white/5 border border-white/5 rounded-3xl font-bold text-white placeholder:text-white/10 focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all uppercase tracking-widest text-xs"
                value={formData.business}
                onChange={(e) => setFormData({...formData, business: e.target.value})}
              />
            </div>
            
            <button 
              onClick={() => setCurrentSection('dashboard')}
              className="w-full py-7 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full font-black uppercase tracking-[0.4em] text-xs hover:scale-[1.02] transition-all shadow-2xl shadow-[#c5a059]/30 mt-10"
            >
              CRIAR ACESSO IMEDIATO
            </button>
            
            <p className="text-[9px] text-center font-bold text-white/20 uppercase tracking-[0.2em] mt-8 italic px-4">
              Ao confirmar, você ratifica nossos <span className="text-[#c5a059] underline underline-offset-4 decoration-1">Protocolos de Uso & Ética Platinum</span>
            </p>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentSection === 'landing' ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage />
          </motion.div>
        ) : currentSection === 'signup' ? (
          <motion.div key="signup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SignupPage />
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