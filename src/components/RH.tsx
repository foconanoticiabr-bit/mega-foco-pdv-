import React, { useState } from 'react';
import { Users, Clock, UserPlus, Briefcase, Calendar, CheckCircle2, XCircle, Search, MoreVertical, DollarSign, Plus, FileText, Trash2, CheckCircle, TrendingUp } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Employee {
  id: string;
  name: string;
  role: string;
  status: 'active' | 'on_break' | 'offline';
  lastClockIn: string;
}

interface Voucher {
  id: string;
  employeeId: string;
  employeeName: string;
  amount: number;
  date: string;
  status: 'approved' | 'pending' | 'rejected';
  reason: string;
}

const EMPLOYEES: Employee[] = [
  { id: '1', name: 'Ana Oliveira', role: 'Gerente', status: 'active', lastClockIn: '08:00' },
  { id: '2', name: 'Carlos Santos', role: 'Vendedor', status: 'active', lastClockIn: '08:15' },
  { id: '3', name: 'Juliana Lima', role: 'Esteticista', status: 'on_break', lastClockIn: '09:00' },
  { id: '4', name: 'Ricardo Melo', role: 'Cabelereiro', status: 'offline', lastClockIn: '-' },
  { id: '5', name: 'Beatriz Costa', role: 'Recepcionista', status: 'active', lastClockIn: '08:30' },
];

const INITIAL_VALES: Voucher[] = [
  { id: 'v1', employeeId: '2', employeeName: 'Carlos Santos', amount: 200.00, date: '2026-04-27 15:30', status: 'approved', reason: 'Adiantamento Semanal' },
  { id: 'v2', employeeId: '3', employeeName: 'Juliana Lima', amount: 150.00, date: '2026-04-28 10:00', status: 'pending', reason: 'Emergência Veterinária' },
];

export default function RH() {
  const [activeTab, setActiveTab] = useState<'employees' | 'ponto' | 'vales' | 'vendedores'>('employees');
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
  const [vales, setVales] = useState<Voucher[]>(INITIAL_VALES);
  const [showVoucherModal, setShowVoucherModal] = useState<Employee | null>(null);
  const [showEmployeeModal, setShowEmployeeModal] = useState(false);
  const [modalRole, setModalRole] = useState('');
  
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    role: ''
  });

  const [newVoucher, setNewVoucher] = useState({
    amount: '',
    reason: ''
  });

  const handleAddEmployee = () => {
    if (!newEmployee.name) return;
    const employee: Employee = {
      id: Math.random().toString(36).substr(2, 9),
      name: newEmployee.name,
      role: newEmployee.role || modalRole || 'Colaborador',
      status: 'offline',
      lastClockIn: '-'
    };
    setEmployees(prev => [employee, ...prev]);
    setShowEmployeeModal(false);
    setNewEmployee({ name: '', role: '' });
  };

  const handleCreateVoucher = () => {
    if (!showVoucherModal || !newVoucher.amount) return;

    const voucher: Voucher = {
      id: Math.random().toString(36).substr(2, 9),
      employeeId: showVoucherModal.id,
      employeeName: showVoucherModal.name,
      amount: parseFloat(newVoucher.amount),
      date: new Date().toLocaleString(),
      status: 'pending',
      reason: newVoucher.reason || 'Adiantamento Antecipado'
    };

    setVales(prev => [voucher, ...prev]);
    setShowVoucherModal(null);
    setNewVoucher({ amount: '', reason: '' });
  };

  const handleUpdateStatus = (id: string, status: 'approved' | 'rejected') => {
    setVales(prev => prev.map(v => v.id === id ? { ...v, status } : v));
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        <div className="flex bg-white/5 p-1 rounded-2xl sm:rounded-full border border-white/5 luxury-gradient flex-col sm:flex-row">
          {[
            { id: 'employees', label: 'Quadro Cooperativo' },
            { id: 'vendedores', label: 'Gestão Vendedores' },
            { id: 'ponto', label: 'Terminal Transacional' },
            { id: 'vales', label: 'Gestão de Vales' },
          ].map(tab => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-3 rounded-xl sm:rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.3em] italic transition-all duration-500 ${activeTab === tab.id ? 'bg-[#c5a059] text-[#0a0e17] shadow-2xl shadow-[#c5a059]/20' : 'text-white/20 hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="flex gap-4">
          {activeTab === 'vendedores' && (
            <button 
              onClick={() => { setModalRole('Vendedor'); setShowEmployeeModal(true); }}
              className="px-8 sm:px-10 py-5 bg-white/5 text-[#c5a059] border border-[#c5a059]/20 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 shadow-2xl hover:bg-[#c5a059]/10 transition-all italic hover:scale-[1.02]"
            >
              <TrendingUp className="w-5 h-5 shrink-0" />
              Recrutar Vendedor
            </button>
          )}
          <button 
            onClick={() => { setModalRole(''); setShowEmployeeModal(true); }}
            className="px-8 sm:px-10 py-5 bg-gradient-to-r from-[#f9d976] to-[#c5a059] text-[#0a0e17] rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-[0.4em] flex items-center justify-center gap-3 shadow-2xl shadow-[#c5a059]/20 italic group hover:scale-[1.02] transition-all"
          >
            <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform shrink-0" />
            Vincular Cooperado
          </button>
        </div>
      </div>

      {activeTab === 'employees' || activeTab === 'vendedores' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {employees
            .filter(e => activeTab === 'vendedores' ? e.role === 'Vendedor' : true)
            .map((employee) => (
            <div key={employee.id} className="luxury-card p-8 border-white/5 luxury-gradient relative overflow-hidden group hover:border-[#c5a059]/30 transition-all duration-700">
               <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full translate-x-12 -translate-y-12 group-hover:scale-150 transition-transform duration-1000"></div>
               
               <div className="flex justify-between items-start mb-8 relative z-10">
                <div className="w-16 h-16 bg-white/5 rounded-[1.5rem] flex items-center justify-center text-white/10 group-hover:bg-[#c5a059] group-hover:text-[#0a0e17] border border-white/10 group-hover:border-[#c5a059] transition-all duration-700 font-serif italic text-2xl font-black shadow-inner">
                   {employee.name.charAt(0)}
                </div>
                <div className="flex flex-col items-end">
                   <div className={`flex items-center gap-2 p-1.5 px-3 rounded-full border italic ${employee.status === 'active' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : employee.status === 'on_break' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-white/5 text-white/20 border-white/10'}`}>
                      <div className={`w-1.5 h-1.5 rounded-full ${employee.status === 'active' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : employee.status === 'on_break' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-white/20'}`}></div>
                      <span className="text-[8px] font-black uppercase tracking-[0.2em]">{employee.status.replace('_', ' ')}</span>
                   </div>
                   <button className="mt-6 p-2 text-white/10 hover:text-[#c5a059] transition-all duration-500 border border-white/5 hover:border-[#c5a059]/20 rounded-xl bg-white/5">
                      <MoreVertical className="w-4 h-4" />
                   </button>
                </div>
              </div>

              <div className="relative z-10">
                <h4 className="text-xl font-serif italic font-black text-white tracking-tight leading-none mb-2 group-hover:gold-text transition-all">{employee.name}</h4>
                <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] mb-8 italic">{employee.role} elite</p>
                
                <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/5">
                   <div>
                      <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 italic">Atividade Inicial</p>
                      <p className="text-sm font-black gold-text italic tracking-tighter">{employee.lastClockIn}</p>
                   </div>
                   <div>
                      <p className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 italic">Ações Rápidas</p>
                      <div className="flex gap-3">
                         <button 
                           onClick={() => setShowVoucherModal(employee)}
                           className="w-8 h-8 rounded-xl bg-[#c5a059]/10 text-[#c5a059] flex items-center justify-center hover:bg-[#c5a059] hover:text-[#0a0e17] transition-all duration-500 border border-[#c5a059]/20"
                           title="Criar Vale"
                         >
                            <DollarSign className="w-3.5 h-3.5" />
                         </button>
                         <button className="w-8 h-8 rounded-xl bg-white/5 text-white/20 flex items-center justify-center hover:bg-[#c5a059] hover:text-[#0a0e17] transition-all duration-500 border border-white/5"><Calendar className="w-3.5 h-3.5" /></button>
                         <button className="w-8 h-8 rounded-xl bg-white/5 text-white/20 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-500 border border-white/5"><Briefcase className="w-3.5 h-3.5" /></button>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : activeTab === 'vales' ? (
        <div className="luxury-card border-white/5 overflow-hidden flex flex-col luxury-gradient">
           <div className="p-10 border-b border-white/5 flex items-center justify-between">
              <div>
                 <h3 className="text-sm font-black uppercase tracking-[0.4em] text-white italic mb-1">Registro Master de Vales</h3>
                 <p className="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em]">Fluxo de Adiantamentos Ativos</p>
              </div>
              <div className="flex gap-4">
                 <div className="p-4 bg-white/5 rounded-2xl border border-white/5 text-center px-8">
                    <p className="text-[9px] font-black text-white/20 uppercase tracking-[0.3em] mb-1 italic">Total Pendente</p>
                    <p className="text-xl font-serif italic font-black gold-text tracking-tighter">
                       R$ {vales.filter(v => v.status === 'pending').reduce((acc, v) => acc + v.amount, 0).toFixed(2)}
                    </p>
                 </div>
              </div>
           </div>
           
           <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left uppercase text-[10px] tracking-widest font-bold min-w-[800px]">
                 <thead>
                    <tr className="bg-black/20 border-b border-white/5">
                       <th className="px-10 py-6 text-white/30 italic">Beneficiário</th>
                       <th className="px-10 py-6 text-white/30 italic">Data / Hora</th>
                       <th className="px-10 py-6 text-white/30 italic">Motivo</th>
                       <th className="px-10 py-6 text-white/30 italic text-center">Status</th>
                       <th className="px-10 py-6 text-white/30 italic text-right">Valor</th>
                       <th className="px-10 py-6 text-white/30 italic text-center">Ações</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-white/5 italic">
                    {vales.map(v => (
                       <tr key={v.id} className="hover:bg-white/5 transition-all duration-500 group">
                          <td className="px-10 py-8">
                             <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/20 border border-white/5 group-hover:bg-[#c5a059] group-hover:text-black transition-all">
                                   {v.employeeName.charAt(0)}
                                </div>
                                <span className="text-white font-serif font-black text-sm">{v.employeeName}</span>
                             </div>
                          </td>
                          <td className="px-10 py-8 text-white/20">{v.date}</td>
                          <td className="px-10 py-8 text-white/40 truncate max-w-[200px]">{v.reason}</td>
                          <td className="px-10 py-8 text-center">
                             <span className={`px-4 py-1.5 rounded-full border text-[8px] font-black ${v.status === 'approved' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' : v.status === 'pending' ? 'bg-amber-500/10 text-amber-500 border-amber-500/20' : 'bg-rose-500/10 text-rose-500 border-rose-500/20'}`}>
                                {v.status === 'approved' ? 'RATIFICADO' : v.status === 'pending' ? 'AGUARDANDO' : 'INVALIDADO'}
                             </span>
                          </td>
                          <td className="px-10 py-8 text-right font-serif font-black text-lg gold-text tracking-tighter">R$ {v.amount.toFixed(2)}</td>
                          <td className="px-10 py-8 text-center">
                             <div className="flex justify-center gap-3">
                                {v.status === 'pending' && (
                                   <>
                                      <button 
                                        onClick={() => handleUpdateStatus(v.id, 'approved')}
                                        className="p-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl hover:bg-emerald-500 hover:text-white transition-all"
                                      ><CheckCircle className="w-4 h-4" /></button>
                                      <button 
                                        onClick={() => handleUpdateStatus(v.id, 'rejected')}
                                        className="p-3 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-xl hover:bg-rose-500 hover:text-white transition-all"
                                      ><XCircle className="w-4 h-4" /></button>
                                   </>
                                )}
                                <button 
                                  onClick={() => setVales(prev => prev.filter(item => item.id !== v.id))}
                                  className="p-3 bg-white/5 text-white/20 border border-white/5 rounded-xl hover:bg-rose-600 hover:text-white transition-all"
                                ><Trash2 className="w-4 h-4" /></button>
                             </div>
                          </td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </div>
      ) : (
        <div className="luxury-card border-white/5 luxury-gradient flex flex-col p-16 items-center justify-center min-h-[500px] relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#c5a059]/50 to-transparent"></div>
           
           <div className="w-40 h-40 bg-white/5 rounded-full flex items-center justify-center mb-10 relative border border-white/5 shadow-2xl">
              <div className="absolute inset-0 bg-[#c5a059]/5 rounded-full animate-ping opacity-20"></div>
              <Clock className="w-16 h-16 gold-text animate-pulse" />
           </div>
           <h3 className="text-3xl font-serif italic font-black text-white tracking-tighter uppercase mb-3 gold-text">Validador Transacional</h3>
           <p className="text-white/20 text-[10px] font-black uppercase tracking-[0.5em] mb-16 italic">Unidade de Controle Central #012</p>
           
           <div className="max-w-md w-full space-y-6">
              <input 
                type="password" 
                placeholder="TOKEN DE ACESSO" 
                className="w-full py-6 px-10 bg-white/5 border border-white/10 rounded-[2rem] text-center text-2xl font-serif italic font-black tracking-[1em] gold-text focus:border-[#c5a059]/30 outline-none transition-all placeholder:tracking-widest placeholder:text-white/5 placeholder:font-sans placeholder:font-black placeholder:text-xs shadow-inner"
              />
              <div className="grid grid-cols-2 gap-6">
                 <button className="py-5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full font-black text-[10px] uppercase tracking-[0.4em] italic shadow-2xl hover:bg-emerald-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-3">
                    <CheckCircle2 className="w-5 h-5 shadow-inner" /> Iniciar
                 </button>
                 <button className="py-5 bg-rose-500/10 text-rose-500 border border-rose-500/20 rounded-full font-black text-[10px] uppercase tracking-[0.4em] italic shadow-2xl hover:bg-rose-500 hover:text-white transition-all duration-500 flex items-center justify-center gap-3">
                    <XCircle className="w-5 h-5 shadow-inner" /> Finalizar
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Modal Criar Vale */}
      <AnimatePresence>
        {showVoucherModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setShowVoucherModal(null)}
               className="absolute inset-0 bg-[#05080d]/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0e17] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl luxury-gradient"
            >
              <div className="p-10 bg-[#c5a059]/10 text-white border-b border-white/5">
                 <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center border bg-[#c5a059]/20 text-[#c5a059] border-[#c5a059]/30">
                       <DollarSign className="w-7 h-7" />
                    </div>
                    <button onClick={() => setShowVoucherModal(null)} className="p-3 hover:bg-white/10 rounded-full transition-colors"><XCircle className="w-6 h-6 text-white/20" /></button>
                 </div>
                 <h3 className="text-3xl font-serif italic font-black uppercase tracking-tighter gold-text">Emissão de Vale Elite</h3>
                 <p className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40 mt-2 italic">Beneficiário: {showVoucherModal.name}</p>
              </div>

              <div className="p-10 space-y-8">
                <div>
                  <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] mb-4 block italic">Motivação / Protocolo</label>
                  <input 
                    type="text" 
                    placeholder="EX: ADIANTAMENTO QUINZENAL" 
                    className="w-full p-5 bg-white/5 rounded-2xl border border-white/5 font-black text-white focus:border-[#c5a059]/30 outline-none transition-all text-xs tracking-widest placeholder:text-white/10 uppercase italic" 
                    value={newVoucher.reason}
                    onChange={e => setNewVoucher({...newVoucher, reason: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] mb-4 block italic">Quantitativo Monetário (R$)</label>
                  <input 
                    type="number" 
                    placeholder="0,00" 
                    className="w-full p-5 bg-white/5 rounded-2xl border border-white/5 font-serif italic font-black gold-text focus:border-[#c5a059]/30 outline-none transition-all text-3xl tracking-tighter" 
                    value={newVoucher.amount}
                    onChange={e => setNewVoucher({...newVoucher, amount: e.target.value})}
                  />
                </div>

                <button 
                  onClick={handleCreateVoucher}
                  className="w-full py-6 rounded-full font-black uppercase tracking-[0.4em] text-[10px] text-[#0a0e17] transition-all shadow-2xl italic bg-gradient-to-r from-[#f9d976] to-[#c5a059]"
                >
                  RATIFICAR BENEFÍCIO
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      {/* Modal Cadastro de Cooperado */}
      <AnimatePresence>
        {showEmployeeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
               initial={{ opacity: 0 }} 
               animate={{ opacity: 1 }} 
               exit={{ opacity: 0 }}
               onClick={() => setShowEmployeeModal(false)}
               className="absolute inset-0 bg-[#05080d]/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-[#0a0e17] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl luxury-gradient"
            >
              <div className="p-10 bg-[#c5a059]/10 text-white border-b border-white/5">
                 <div className="flex justify-between items-start mb-8">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center border bg-[#c5a059]/20 text-[#c5a059] border-[#c5a059]/30">
                       <UserPlus className="w-7 h-7" />
                    </div>
                    <button onClick={() => setShowEmployeeModal(false)} className="p-3 hover:bg-white/10 rounded-full transition-colors"><XCircle className="w-6 h-6 text-white/20" /></button>
                 </div>
                 <h3 className="text-3xl font-serif italic font-black uppercase tracking-tighter gold-text">
                   {modalRole === 'Vendedor' ? 'Recrutar Vendedor Elite' : 'Vincular Novo Cooperado'}
                 </h3>
              </div>

              <div className="p-10 space-y-8">
                <div>
                  <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] mb-4 block italic">Nome Completo do Talento</label>
                  <input 
                    type="text" 
                    placeholder="EX: GABRIEL MEDEIROS" 
                    className="w-full p-5 bg-white/5 rounded-2xl border border-white/5 font-black text-white focus:border-[#c5a059]/30 outline-none transition-all text-xs tracking-widest placeholder:text-white/10 uppercase italic" 
                    value={newEmployee.name}
                    onChange={e => setNewEmployee({...newEmployee, name: e.target.value})}
                  />
                </div>
                {!modalRole && (
                  <div>
                    <label className="text-[10px] font-black uppercase text-white/20 tracking-[0.4em] mb-4 block italic">Função Estratégica</label>
                    <select 
                      className="w-full p-5 bg-white/5 rounded-2xl border border-white/5 font-black text-white/60 focus:border-[#c5a059]/30 outline-none transition-all text-xs tracking-widest uppercase italic appearance-none cursor-pointer"
                      value={newEmployee.role}
                      onChange={e => setNewEmployee({...newEmployee, role: e.target.value})}
                    >
                       <option value="" className="bg-[#0a0e17]">Selecionar Função...</option>
                       <option value="Vendedor" className="bg-[#0a0e17]">Vendedor Elite</option>
                       <option value="Esteticista" className="bg-[#0a0e17]">Esteticista</option>
                       <option value="Gerente" className="bg-[#0a0e17]">Gestão Master</option>
                       <option value="Recepcionista" className="bg-[#0a0e17]">Recepcionista</option>
                    </select>
                  </div>
                )}

                <button 
                  onClick={handleAddEmployee}
                  className="w-full py-6 rounded-full font-black uppercase tracking-[0.4em] text-[10px] text-[#0a0e17] transition-all shadow-2xl italic bg-gradient-to-r from-[#f9d976] to-[#c5a059]"
                >
                  RATIFICAR VÍNCULO
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
