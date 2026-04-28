/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  ShoppingBag, 
  ClipboardList, 
  Calendar, 
  Users, 
  Clock, 
  LineChart, 
  BarChart3,
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
  Facebook,
  MessageCircle,
  Phone,
  Send,
  Activity,
  FileCheck,
  Cloud
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
  | 'signup'
  | 'login';

export default function App() {
  const [currentSection, setCurrentSection] = useState<Section>('landing');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const [isGeneratingPayment, setIsGeneratingPayment] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mpPixData, setMpPixData] = useState<{ qr_code: string, qr_code_base64: string } | null>(null);
  const [isSefazEnabled, setIsSefazEnabled] = useState(false);

  const pixKeys = {
    primary: "62995108558",
    secondary: "74981188134",
    extra: "56f0ad86-8002-44e3-a6f0-50cc29cdbe31"
  };

  const [currentPixKey, setCurrentPixKey] = useState(pixKeys.primary);
  const [showSupport, setShowSupport] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const contactNumbers = [
    { label: "Suporte & Vendas 1", value: "62995108558", display: "(62) 99510-8558" },
    { label: "Suporte & Vendas 2", value: "74981188134", display: "(74) 98118-8134" }
  ];

  const handleCopyPix = (text?: string) => {
    const toCopy = text || (mpPixData?.qr_code) || currentPixKey;
    navigator.clipboard.writeText(toCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMercadoPagoCheckout = async () => {
    if (!selectedPlan) return;
    setIsGeneratingPayment(true);
    setMpPixData(null);
    
    try {
      // 1. First try creating a Preference (Checkout Pro)
      const response = await fetch('/api/create-preference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          planName: selectedPlan.name,
          price: selectedPlan.price,
          userEmail: 'foconanoticiabr@gmail.com'
        }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ details: 'System offline or 404' }));
        throw new Error(errorData.details || errorData.error || 'Falha na resposta do servidor');
      }

      const data = await response.json();
      
      // 2. Also try creating a direct PIX as a backup/alternative
      try {
        const pixResp = await fetch('/api/create-pix', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            planName: selectedPlan.name,
            price: selectedPlan.price,
            userEmail: 'foconanoticiabr@gmail.com'
          }),
        });
        if (pixResp.ok) {
          const pixData = await pixResp.json();
          if (pixData.qr_code) {
            setMpPixData(pixData);
          }
        }
      } catch (pixErr) {
        console.warn('Silent PIX gen failure:', pixErr);
      }

      if (data.init_point) {
        window.location.href = data.init_point;
      } else {
        throw new Error('Ponto de início não retornado pela API');
      }
    } catch (error) {
      console.error('Error generating payment:', error);
      alert(`Erro ao gerar pagamento: ${error instanceof Error ? error.message : 'Verifique sua conexão e tente novamente.'}`);
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
      <nav className="fixed top-4 sm:top-8 left-1/2 -translate-x-1/2 w-[95%] sm:w-[90%] max-w-7xl z-50 bg-[#0a0e17]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <div className="px-6 sm:px-10 h-16 sm:h-20 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-8 h-8 sm:w-12 sm:h-12 bg-gradient-to-br from-[#f9d976] to-[#c5a059] rounded-full flex items-center justify-center text-[#0a0e17] text-sm sm:text-base font-black italic shadow-lg">M</div>
            <span className="text-lg sm:text-2xl font-black tracking-tighter uppercase italic gold-text">MegaFoco <span className="text-white opacity-80 hidden xs:inline">PDV</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => setCurrentSection('login')}
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
            {isMenuOpen ? <X className="w-6 h-6" /> : <Smartphone className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Content */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, scaleY: 0, originY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              exit={{ opacity: 0, scaleY: 0 }}
              className="absolute top-full left-0 w-full bg-[#0a0e17]/95 backdrop-blur-3xl border border-white/10 rounded-[2rem] mt-4 p-8 space-y-6 md:hidden overflow-hidden"
            >
              <button 
                onClick={() => { setCurrentSection('login'); setIsMenuOpen(false); }}
                className="w-full flex items-center gap-4 text-xl font-black text-white/60 hover:text-white transition-all uppercase italic"
              >
                <UserCircle className="w-6 h-6 text-[#c5a059]" />
                Já sou cliente
              </button>
              <button 
                onClick={() => { setCurrentSection('signup'); setIsMenuOpen(false); }}
                className="w-full py-6 font-black text-[#0a0e17] bg-gradient-to-r from-[#f9d976] to-[#c5a059] rounded-2xl transition-all uppercase italic shadow-lg shadow-[#c5a059]/20"
              >
                Começar Grátis
              </button>
              <div className="pt-6 border-t border-white/5 space-y-4">
                 {['Recursos', 'Preços', 'Parceiros'].map((item) => (
                   <button 
                    key={item}
                    className="w-full text-left text-[10px] font-bold text-white/30 uppercase tracking-[0.4em] hover:text-[#c5a059] transition-all"
                   >
                     {item}
                   </button>
                 ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="pt-40 md:pt-60 pb-20 md:pb-40 px-4 flex flex-col items-center text-center relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] bg-[#c5a059]/5 blur-[80px] md:blur-[150px] rounded-full pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl relative z-10"
        >
          <div className="inline-flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 rounded-full bg-white/5 border border-white/10 text-[#c5a059] text-[9px] md:text-xs font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] mb-8 md:mb-12 italic">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            A Excelência em Gestão para Negócios de Elite
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-[10rem] font-serif font-black tracking-tighter mb-8 md:mb-10 leading-[0.9] md:leading-[0.85] text-white uppercase italic">
            DOMINE O SEU <br/>
            <span className="gold-text">DESTINO</span>
          </h1>
          <p className="text-lg md:text-3xl text-white/60 mb-12 md:mb-16 max-w-4xl mx-auto font-light leading-relaxed tracking-wide px-4">
            A sofisticação da tecnologia ao serviço da sua gestão. PDV, Financeiro e Marketing integrados em uma experiência transcendental.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10">
            <button 
               onClick={() => setCurrentSection('signup')}
               className="w-full md:w-auto px-10 md:px-16 py-6 md:py-8 text-xl md:text-3xl font-black text-[#0a0e17] bg-gradient-to-b from-[#f9d976] to-[#c5a059] rounded-full hover:scale-105 active:scale-95 transition-all uppercase italic shadow-[0_20px_50px_rgba(197,160,89,0.3)]"
            >
              ELEVAR MEU NEGÓCIO
              <ChevronRight className="w-6 h-6 md:w-10 md:h-10 inline-block ml-2 md:ml-4" />
            </button>
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-[9px] md:text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] md:tracking-[0.4em]">
               <span>✓ Free Full Access</span>
               <span className="hidden md:inline-block w-2 h-2 rounded-full bg-[#c5a059]"></span>
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
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-serif font-black tracking-tighter text-white uppercase leading-[0.85] mb-10 italic">
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
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-serif font-black tracking-tighter text-white uppercase leading-none italic">Alianças de <br/><span className="gold-text">Valor</span></h2>
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
               <h2 className="text-3xl sm:text-4xl md:text-7xl font-serif font-black tracking-tighter text-white uppercase leading-none">O Ecossistema <br/><span className="gold-text">Perfeito</span></h2>
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#c5a059]/5 blur-[200px] rounded-full pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
             <div className="text-center mb-32">
                <h3 className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#c5a059] mb-6 inline-block italic border-b border-[#c5a059] pb-2">Assinaturas</h3>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-serif font-black tracking-tighter text-white uppercase leading-none mb-16 italic">Escolha sua <br/> <span className="gold-text">Liderança</span></h2>
                
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
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-10 py-3 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] text-xs font-black rounded-full uppercase tracking-widest shadow-2xl italic">
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
              className="relative w-full max-w-lg bg-[#0a0e17] sm:rounded-[3rem] rounded-t-[2.5rem] overflow-hidden shadow-2xl border border-white/10 luxury-gradient max-h-[90vh] overflow-y-auto"
            >
              <button 
                onClick={() => setSelectedPlan(null)}
                className="absolute top-4 right-4 sm:top-8 sm:right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors z-10 border border-white/10"
              >
                <X className="w-5 h-5 text-white/50" />
              </button>

              <div className="p-6 sm:p-12">
                <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12 mt-4 sm:mt-0">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-[#f9d976] to-[#c5a059] rounded-2xl flex items-center justify-center text-[#0a0e17]">
                    <QrCode className="w-6 h-6 sm:w-8 sm:h-8" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-serif font-black tracking-tight text-white uppercase italic leading-tight">Protocolo de Adesão</h3>
                    <p className="text-[9px] sm:text-[10px] font-black text-[#c5a059] uppercase tracking-[0.2em] sm:tracking-[0.3em]">Módulo {selectedPlan.name} • R$ {selectedPlan.price}/mês</p>
                  </div>
                </div>

                <div className="space-y-4 sm:space-y-6">
                  <button 
                    onClick={handleMercadoPagoCheckout}
                    disabled={isGeneratingPayment}
                    className="w-full py-5 sm:py-6 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full font-bold uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs hover:scale-[1.02] active:scale-95 transition-all shadow-xl shadow-[#c5a059]/20 flex items-center justify-center gap-3 disabled:opacity-50"
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

                  <div className="flex items-center gap-4 py-2 sm:py-4">
                    <div className="flex-1 h-px bg-white/5"></div>
                    <span className="text-[9px] sm:text-[10px] font-black text-white/20 uppercase tracking-[0.3em] sm:tracking-[0.4em]">OU TRANSFERÊNCIA PIX</span>
                    <div className="flex-1 h-px bg-white/5"></div>
                  </div>

                  <div className="luxury-card bg-white/5 p-6 sm:p-8 rounded-[2rem] sm:rounded-3xl flex flex-col items-center">
                    <p className="text-[9px] font-black text-white/30 uppercase tracking-[0.3em] mb-4 sm:mb-6">
                      {mpPixData ? 'CÓDIGO PIX DINÂMICO (CONFIRMAÇÃO AUTOMÁTICA)' : 'CÓDIGO QR PARA PAGAMENTO'}
                    </p>
                    
                    {/* Simulated or Real QR Code Display */}
                    <div className="w-40 h-40 sm:w-48 sm:h-48 bg-white p-3 rounded-2xl mb-6 shadow-inner flex items-center justify-center relative group">
                       <img 
                        src={mpPixData ? `data:image/png;base64,${mpPixData.qr_code_base64}` : `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=00020126580014br.gov.bcb.pix0114${currentPixKey}5204000053039865408${selectedPlan.price}.005802BR5913MEGAFOCO%20PDV6009SAO%20PAULO62070503***6304`} 
                        alt="PIX QR Code" 
                        className="w-full h-full"
                        referrerPolicy="no-referrer"
                       />
                       <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-2xl">
                          <p className="text-white text-[10px] font-black uppercase tracking-widest">{mpPixData ? 'Válido por 30min' : 'Escaneie agora'}</p>
                       </div>
                    </div>

                    <div className="w-full space-y-3 mb-6 font-sans">
                      {!mpPixData && (
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[9px] font-black text-white/20 uppercase tracking-widest">Selecione a Chave Estática:</span>
                          <div className="flex gap-2">
                             {Object.values(pixKeys).map((key, idx) => (
                               <button
                                 key={idx}
                                 onClick={() => setCurrentPixKey(key)}
                                 className={`w-4 h-4 rounded-full border-2 transition-all ${currentPixKey === key ? 'bg-[#c5a059] border-[#c5a059]' : 'bg-transparent border-white/20'}`}
                               />
                             ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="w-full bg-[#05080d] p-4 sm:p-5 rounded-2xl border border-white/5 flex items-center gap-4 group">
                        <div className="flex-1 min-w-0 truncate text-[10px] sm:text-xs font-mono font-bold text-white/60 tracking-wider">
                          {mpPixData ? mpPixData.qr_code : currentPixKey}
                        </div>
                        <button 
                          onClick={() => handleCopyPix(mpPixData?.qr_code)}
                          className="p-2 sm:p-3 bg-[#c5a059]/10 text-[#c5a059] rounded-xl hover:bg-[#c5a059] hover:text-[#0a0e17] transition-all"
                        >
                          {copied ? <CheckCircle2 className="w-4.5 h-4.5" /> : <Copy className="w-4.5 h-4.5" />}
                        </button>
                      </div>
                    </div>

                    <p className="text-[9px] sm:text-[10px] font-medium text-white/30 italic text-center leading-relaxed">
                      {mpPixData ? 'QR Code gerado via Mercado Pago. A liberação no sistema é automática após o pagamento.' : 'Liberação Elite manual após o envio do comprovante para o suporte.'}
                    </p>
                  </div>


                  <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 bg-[#10b981]/5 rounded-2xl border border-[#10b981]/10 mb-4">
                    <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-[#10b981] shrink-0" />
                    <p className="text-[10px] sm:text-[11px] font-medium text-[#10b981]/80 leading-relaxed italic">
                      Transação Protegida. O acesso Elite será liberado imediatamente após a confirmação do protocolo.
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
                <button 
                  onClick={() => setCurrentSection('stock')}
                  className="w-full mt-10 py-5 border border-dashed border-white/10 rounded-3xl text-[10px] font-black uppercase text-white/20 tracking-[0.3em] hover:text-[#c5a059] hover:border-[#c5a059]/30 transition-all italic"
               >
                  REPOSIÇÃO IMEDIATA
               </button>
             </div>
          </div>
       </div>
    </div>
  );

  const Dashboard = () => {
    const SidebarContent = () => (
      <>
         <div className="flex items-center gap-4 mb-16 px-4 lg:px-0">
            <div className="w-14 h-14 bg-gradient-to-br from-[#f9d976] to-[#c5a059] rounded-2xl flex items-center justify-center text-[#0a0e17] text-2xl font-black italic shadow-lg">M</div>
            <div className="flex flex-col">
               <span className="text-2xl font-serif font-black tracking-tighter uppercase leading-[0.8] mb-1 italic gold-text">MegaFoco</span>
               <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em]">ELITE PDV v1.2</span>
            </div>
         </div>

         <div className="space-y-10 flex-1 px-4 lg:px-0">
            {/* Principal */}
            <div>
              <p className="text-[10px] font-bold uppercase text-white/20 tracking-[0.4em] mb-6 ml-2 italic">Principal</p>
              <nav className="space-y-3">
                {[
                  { id: 'dashboard', icon: <LineChart className="w-5 h-5" />, label: 'Panorama Elite' },
                  { id: 'pdv', icon: <ShoppingBag className="w-5 h-5" />, label: 'Executivo (PDV)' },
                  { id: 'comandas', icon: <ClipboardList className="w-5 h-5" />, label: 'Comandas' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentSection(item.id as Section);
                      setIsSidebarOpen(false);
                    }}
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
                    onClick={() => {
                      setCurrentSection(item.id as Section);
                      setIsSidebarOpen(false);
                    }}
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
                  { id: 'ponto', icon: <Clock className="w-5 h-5" />, label: 'Relojoeiro / RH' },
                  { id: 'vales', icon: <CreditCard className="w-5 h-5" />, label: 'Protocolos' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentSection(item.id as Section);
                      setIsSidebarOpen(false);
                    }}
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
                  { id: 'stock', icon: <Package className="w-5 h-5" />, label: 'Estoque / Ativos' },
                  { id: 'config', icon: <Settings className="w-5 h-5" />, label: 'Arquitetura' },
                  { id: 'solutions', icon: <QrCode className="w-5 h-5" />, label: 'PIX / Elite' },
                  { id: 'reports', icon: <LineChart className="w-5 h-5" />, label: 'Relatórios' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentSection(item.id as Section);
                      setIsSidebarOpen(false);
                    }}
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
                  { id: 'crm', icon: <Users className="w-5 h-5" />, label: 'Dossiê Elite' },
                  { id: 'whatsapp', icon: <MessageSquare className="w-5 h-5" />, label: 'Whats App' },
                  { id: 'nfe', icon: <FileText className="w-5 h-5" />, label: 'Protocolo NF-e' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setCurrentSection(item.id as Section);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${currentSection === item.id ? 'bg-[#c5a059] text-[#0a0e17] border-[#c5a059] shadow-xl shadow-[#c5a059]/10' : 'text-white/40 border-transparent hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* SEFAZ */}
            {isSefazEnabled && (
              <div>
                <p className="text-[10px] font-bold uppercase text-white/20 tracking-[0.4em] mb-6 ml-2 italic">Fiscal</p>
                <nav className="space-y-3">
                  {[
                    { id: 'nfe', icon: <FileText className="w-5 h-5" />, label: 'SEFAZ / NF-e' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => {
                        setCurrentSection(item.id as Section);
                        setIsSidebarOpen(false);
                      }}
                      className={`w-full flex items-center gap-4 px-6 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${currentSection === item.id ? 'bg-[#c5a059] text-[#0a0e17] border-[#c5a059] shadow-xl shadow-[#c5a059]/10' : 'text-white/40 border-transparent hover:bg-white/5 hover:text-white'}`}
                    >
                      {item.icon}
                      {item.label}
                    </button>
                  ))}
                </nav>
              </div>
            )}

            {/* Administrador */}
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
                    onClick={() => {
                      setCurrentSection(item.id as Section);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 px-6 py-4 rounded-full text-xs font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${currentSection === item.id ? 'bg-[#c5a059] text-[#0a0e17] border-[#c5a059] shadow-xl shadow-[#c5a059]/10' : 'text-white/40 border-transparent hover:bg-white/5 hover:text-white'}`}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
         </div>

         <div className="mt-10 pt-6 border-t border-white/5 space-y-6 px-4 lg:px-0">
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
      </>
    );

    return (
      <div className="flex h-screen bg-[#05080d] font-display relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c5a059]/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
        
        {/* Sidebar Desktop */}
        <aside className="hidden lg:flex w-80 bg-[#05080d] text-white flex-col p-8 shrink-0 overflow-y-auto custom-scrollbar border-r border-white/5 shadow-2xl">
           <SidebarContent />
        </aside>

        {/* Mobile Sidebar (Drawer) */}
        <AnimatePresence mode="wait">
           {isSidebarOpen && (
             <React.Fragment key="mobile-sidebar">
               <motion.div
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 onClick={() => setIsSidebarOpen(false)}
                 className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60] lg:hidden"
               />
               <motion.aside
                 initial={{ x: '-100%' }}
                 animate={{ x: 0 }}
                 exit={{ x: '-100%' }}
                 transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                 className="fixed inset-y-0 left-0 w-80 bg-[#05080d] z-[70] p-8 flex flex-col overflow-y-auto lg:hidden border-r border-white/10 shadow-2xl"
               >
                  <button 
                    onClick={() => setIsSidebarOpen(false)}
                    className="absolute top-6 right-6 p-2 text-white/40 hover:text-white"
                  >
                    <X className="w-6 h-6" />
                  </button>
                  <SidebarContent />
               </motion.aside>
             </React.Fragment>
           )}
        </AnimatePresence>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0">
           {/* Navigation Bar */}
           <header className="h-20 sm:h-24 bg-[#0a0e17] border-b border-white/5 px-4 sm:px-12 flex items-center justify-between shrink-0 relative z-50">
              <div className="flex items-center gap-4 sm:gap-5">
                 <button 
                   onClick={() => setIsSidebarOpen(true)}
                   className="p-2 -ml-2 text-white/60 hover:text-white lg:hidden"
                 >
                   <Smartphone className="w-6 h-6" />
                 </button>
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-[#10b981] animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.4)]"></div>
                    <h2 className="text-[9px] sm:text-[11px] font-bold uppercase tracking-[0.2em] sm:tracking-[0.5em] text-white/30 italic">Infraestrutura</h2>
                 </div>
              </div>
              
              <div className="flex items-center gap-3 sm:gap-6">
                 <div className="hidden sm:flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 italic">
                    <Clock className="w-4 h-4 text-[#c5a059]" />
                    99.9%
                 </div>
                 <button 
                    onClick={() => setCurrentSection('landing')}
                    className="px-4 py-2 bg-white/5 border border-white/20 text-white hover:bg-white/10 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all italic whitespace-nowrap"
                 >
                    SAIR
                 </button>
              </div>
           </header>

           {/* Content Scrollable */}
           <div className="flex-1 overflow-y-auto p-4 sm:p-12 bg-[#05080d] custom-scrollbar">
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
                    <div className="luxury-card p-16 border-white/5 flex flex-col items-center justify-center text-center luxury-gradient">
                       <div className="w-24 h-24 bg-white/5 text-[#c5a059] rounded-[2.5rem] border border-white/10 flex items-center justify-center mb-8">
                         <CreditCard className="w-10 h-10" />
                       </div>
                       <h3 className="text-4xl font-serif font-black uppercase italic tracking-tighter gold-text">Gestão de Vales Elite</h3>
                       <p className="text-white/30 font-bold max-w-xs mt-4 uppercase text-[10px] tracking-[0.3em] italic">Engenharia de fluxo transacional para capital humano</p>
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
                        <div className="p-8 sm:p-10 bg-white/5 rounded-[2.5rem] border border-white/5">
                             <p className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] mb-6 italic">Protocolos de Impressão</p>
                             <div className="space-y-6">
                               <label className="flex items-center gap-4 cursor-pointer group">
                                  <div className="w-6 h-6 rounded-lg border-2 border-white/10 group-hover:border-[#c5a059]/50 transition-all flex items-center justify-center">
                                     <div className="w-3 h-3 bg-[#c5a059] rounded-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                  </div>
                                  <span className="text-[10px] sm:text-[11px] font-black text-white/40 uppercase tracking-widest italic group-hover:text-white transition-colors">Emissão de Comprovante Automático</span>
                               </label>
                               
                               <div className="pt-6 border-t border-white/5">
                                 <p className="text-[10px] font-black uppercase text-[#c5a059] tracking-[0.4em] mb-6 italic">Integrações Adicionais</p>
                                 <label 
                                   className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl cursor-pointer hover:bg-white/10 transition-all group"
                                   onClick={() => setIsSefazEnabled(!isSefazEnabled)}
                                 >
                                    <div className="flex items-center gap-4">
                                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center border transition-all ${isSefazEnabled ? 'bg-[#c5a059] text-[#0a0e17] border-[#c5a059]' : 'bg-white/5 text-white/20 border-white/10'}`}>
                                          <FileText className="w-5 h-5" />
                                       </div>
                                       <div>
                                          <p className="text-[10px] font-black uppercase tracking-widest text-white leading-none mb-1">Módulo SEFAZ / NF-e</p>
                                          <p className="text-[8px] font-bold text-white/30 uppercase italic tracking-widest">Habilitar emissão fiscal</p>
                                       </div>
                                    </div>
                                    <div className={`w-12 h-6 rounded-full relative transition-all duration-500 ${isSefazEnabled ? 'bg-[#c5a059]' : 'bg-white/10'}`}>
                                       <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all duration-500 ${isSefazEnabled ? 'left-7' : 'left-1'}`}></div>
                                    </div>
                                 </label>
                               </div>
                             </div>
                          </div>
                      </div>
                   </div>
                 )}
                 {currentSection === 'reports' && (
                    <div className="flex flex-col items-center justify-center py-56 text-center luxury-card luxury-gradient border-white/5 px-20">
                      <div className="w-24 h-24 bg-white/5 text-[#c5a059] rounded-[2.5rem] border border-white/10 flex items-center justify-center mb-10">
                        <BarChart3 className="w-12 h-12" />
                      </div>
                      <h2 className="text-4xl font-serif italic font-black uppercase tracking-tighter gold-text mb-4">Governança & Business Intelligence</h2>
                      <p className="text-white/30 font-bold max-w-sm uppercase text-[10px] tracking-[0.5em] italic">Processamento de métricas e analytics de alto desempenho em tempo real</p>
                      <div className="mt-12 flex gap-4">
                        {[1,2,3].map(i => <div key={i} className="w-32 h-1 bg-white/5 rounded-full overflow-hidden"><div key={i} className="w-1/3 h-full bg-[#c5a059] animate-pulse"></div></div>)}
                      </div>
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
                       <div className="absolute inset-0 bg-[#c5a059]/5 blur-[120px] rounded-full translate-y-1/2"></div>
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
  };

  const SignupPage = () => {
    const [formData, setFormData] = useState({ name: '', email: '', business: '' });
    
    return (
      <div className="min-h-screen bg-[#05080d] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Background Decorative Elemets */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c5a059]/5 blur-[150px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c5a059]/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="w-full max-w-lg bg-[#0a0e17] p-8 sm:p-16 sm:rounded-[4rem] rounded-[2.5rem] border border-white/5 shadow-2xl relative z-10 luxury-gradient"
        >
          <div className="text-center mb-10 sm:mb-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-[#f9d976] to-[#c5a059] rounded-2xl sm:rounded-[2rem] flex items-center justify-center text-[#0a0e17] text-3xl sm:text-4xl font-black italic mx-auto mb-6 sm:mb-8 shadow-2xl shadow-[#c5a059]/20">M</div>
            <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tighter text-white uppercase italic leading-none mb-4">Protocolo de Adesão</h2>
            <p className="text-[9px] sm:text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] italic leading-relaxed">Inicie sua jornada Elite no PDV</p>
          </div>
          
          <div className="space-y-4 sm:space-y-6">
            <div className="group">
              <p className="text-[9px] sm:text-[10px] font-bold uppercase text-[#c5a059] tracking-[0.4em] mb-2 sm:mb-3 ml-4 italic">Designação do Proprietário</p>
              <input 
                type="text" 
                placeholder="NOME COMPLETO DO TITULAR" 
                className="w-full sm:p-6 p-5 bg-white/5 border border-white/5 rounded-2xl sm:rounded-3xl font-bold text-white placeholder:text-white/10 focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all uppercase tracking-widest text-[10px] sm:text-xs"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            <div className="group">
              <p className="text-[9px] sm:text-[10px] font-bold uppercase text-[#c5a059] tracking-[0.4em] mb-2 sm:mb-3 ml-4 italic">Canal de Comunicação Elite</p>
              <input 
                type="email" 
                placeholder="SEU@EMAIL.PREMIUM" 
                className="w-full sm:p-6 p-5 bg-white/5 border border-white/5 rounded-2xl sm:rounded-3xl font-bold text-white placeholder:text-white/10 focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all uppercase tracking-widest text-[10px] sm:text-xs"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            <div className="group">
              <p className="text-[9px] sm:text-[10px] font-bold uppercase text-[#c5a059] tracking-[0.4em] mb-2 sm:mb-3 ml-4 italic">Identidade Corporativa</p>
              <input 
                type="text" 
                placeholder="EX: ATELIER DE LUXO MATRIZ" 
                className="w-full sm:p-6 p-5 bg-white/5 border border-white/5 rounded-2xl sm:rounded-3xl font-bold text-white placeholder:text-white/10 focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all uppercase tracking-widest text-[10px] sm:text-xs"
                value={formData.business}
                onChange={(e) => setFormData({...formData, business: e.target.value})}
              />
            </div>
            
            <button 
              onClick={() => setCurrentSection('dashboard')}
              className="w-full sm:py-7 py-6 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs hover:scale-[1.02] transition-all shadow-2xl shadow-[#c5a059]/30 mt-6 sm:mt-10"
            >
              CRIAR ACESSO IMEDIATO
            </button>
            
            <p className="text-[8px] sm:text-[9px] text-center font-bold text-white/20 uppercase tracking-[0.2em] mt-6 sm:mt-8 italic px-4 leading-relaxed">
              Ao confirmar, você ratifica nossos <span className="text-[#c5a059] underline underline-offset-4 decoration-1">Protocolos de Uso & Ética Platinum</span>
            </p>
          </div>
        </motion.div>
      </div>
    );
  };

  const LoginPage = () => {
    const [loginData, setLoginData] = useState({ email: '', password: '' });
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    const handleLogin = async () => {
      setIsLoggingIn(true);
      // Simulate login delay
      setTimeout(() => {
        setIsLoggingIn(false);
        // For now, allow any non-empty login to transition to dashboard
        // Real validation would happen with Firebase
        if (loginData.email && loginData.password) {
           setCurrentSection('dashboard');
        } else {
           alert("Por favor, insira suas credenciais Elite.");
        }
      }, 1500);
    };

    return (
      <div className="min-h-screen bg-[#05080d] flex items-center justify-center p-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#2563eb 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#c5a059]/5 blur-[150px] rounded-full pointer-events-none"></div>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-lg bg-[#0a0e17] sm:rounded-[3.5rem] rounded-[2rem] p-8 sm:p-16 border border-white/10 shadow-2xl luxury-gradient relative z-10"
        >
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-16 h-16 bg-gradient-to-br from-[#f9d976] to-[#c5a059] rounded-2xl flex items-center justify-center text-[#0a0e17] shadow-xl mb-8">
              <Lock className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-serif font-black text-white uppercase tracking-tight italic mb-4">Acesso Exclusivo</h2>
            <p className="text-[10px] font-black text-[#c5a059] uppercase tracking-[0.4em] italic leading-relaxed">
              Painel Restrito para Membros Elite<br/>
              Acesse sua infraestrutura de gestão
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="group">
              <p className="text-[9px] sm:text-[10px] font-bold uppercase text-[#c5a059] tracking-[0.4em] mb-2 sm:mb-3 ml-4 italic">Credencial (Email)</p>
              <input 
                type="email" 
                placeholder="SEU@EMAIL.ELITE" 
                className="w-full sm:p-6 p-5 bg-white/5 border border-white/5 rounded-2xl sm:rounded-3xl font-bold text-white placeholder:text-white/10 focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all uppercase tracking-widest text-[10px] sm:text-xs"
                value={loginData.email}
                onChange={(e) => setLoginData({...loginData, email: e.target.value})}
              />
            </div>
            <div className="group">
              <p className="text-[9px] sm:text-[10px] font-bold uppercase text-[#c5a059] tracking-[0.4em] mb-2 sm:mb-3 ml-4 italic">Código de Acesso</p>
              <input 
                type="password" 
                placeholder="••••••••" 
                className="w-full sm:p-6 p-5 bg-white/5 border border-white/5 rounded-2xl sm:rounded-3xl font-bold text-white placeholder:text-white/10 focus:ring-2 focus:ring-[#c5a059]/20 outline-none transition-all uppercase tracking-widest text-[10px] sm:text-xs"
                value={loginData.password}
                onChange={(e) => setLoginData({...loginData, password: e.target.value})}
              />
            </div>
            
            <button 
              onClick={handleLogin}
              disabled={isLoggingIn}
              className="w-full sm:py-7 py-6 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full font-black uppercase tracking-[0.4em] text-[10px] sm:text-xs hover:scale-[1.02] transition-all shadow-2xl shadow-[#c5a059]/30 mt-6 sm:mt-10 flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {isLoggingIn ? <span className="animate-pulse">AUTENTICANDO...</span> : "ENTRAR NO SISTEMA"}
            </button>
            
            <button 
              onClick={() => setCurrentSection('landing')}
              className="w-full text-[9px] sm:text-[10px] font-black text-white/20 uppercase tracking-[0.3em] hover:text-[#c5a059] transition-all mt-4 italic"
            >
              Voltar para vitrine
            </button>
          </div>
        </motion.div>
      </div>
    );
  };

  return (
    <div className="overflow-x-hidden relative">
      {/* Floating Support Button */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-4">
        <AnimatePresence>
          {showSupport && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-[#0a0e17] border border-white/10 rounded-2xl p-4 shadow-2xl mb-2 w-72 backdrop-blur-xl"
            >
              <h4 className="text-[10px] font-black text-[#c5a059] uppercase tracking-widest mb-4">Canais de Atendimento</h4>
              <div className="space-y-3">
                {contactNumbers.map((contact, idx) => (
                  <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/5">
                    <p className="text-[9px] font-bold text-white/40 mb-2 uppercase">{contact.label}</p>
                    <div className="flex items-center justify-between gap-2">
                       <div className="flex gap-2">
                          <a href={`https://wa.me/55${contact.value}`} target="_blank" rel="noreferrer" className="p-2 bg-green-500/20 text-green-400 rounded-lg hover:bg-green-500 hover:text-white transition-all">
                             <MessageCircle className="w-4 h-4" />
                          </a>
                          <a href={`tel:+55${contact.value}`} className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition-all">
                             <Phone className="w-4 h-4" />
                          </a>
                          <a href={`https://t.me/+55${contact.value}`} target="_blank" rel="noreferrer" className="p-2 bg-sky-500/20 text-sky-400 rounded-lg hover:bg-sky-500 hover:text-white transition-all">
                             <Send className="w-4 h-4" />
                          </a>
                       </div>
                       <span className="text-[10px] font-mono text-white/60">{contact.display}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setShowSupport(!showSupport)}
          className="w-14 h-14 bg-gradient-to-br from-[#f9d976] to-[#c5a059] rounded-full flex items-center justify-center text-[#0a0e17] shadow-xl shadow-[#c5a059]/20 hover:scale-110 active:scale-95 transition-all"
        >
          <motion.div animate={{ rotate: showSupport ? 90 : 0 }}>
            {showSupport ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          </motion.div>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {currentSection === 'landing' ? (
          <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LandingPage />
          </motion.div>
        ) : currentSection === 'signup' ? (
          <motion.div key="signup" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SignupPage />
          </motion.div>
        ) : currentSection === 'login' ? (
          <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LoginPage />
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