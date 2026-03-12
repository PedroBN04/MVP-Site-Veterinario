import React, { useState } from 'react';
import { Home, Calendar as CalendarIcon, Users, FileText, Settings, Bell, LogOut, Check } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export default function VetDashboard() {
    const { getVetAppointments, getCurrentPatient, saveSession, getPetById } = useClinic();

    const todayAppointments = getVetAppointments();
    const currentData = getCurrentPatient();
    const [notes, setNotes] = useState('');
    const [prescriptions, setPrescriptions] = useState('');
    const [activeTab, setActiveTab] = useState('inicio');

    const handleSaveSession = () => {
        if (!currentData) return;
        saveSession(currentData.appointment.id, notes, prescriptions);
        setNotes('');
        setPrescriptions('');
    };

    return (
        <div className="h-screen overflow-hidden flex font-sans bg-[#f1f5f9] text-slate-800">
            <aside className="w-64 bg-[#022c22] text-white flex flex-col shrink-0">
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-emerald-400 text-3xl">pets</span>
                        <span className="font-bold text-xl tracking-tight">VetClinic</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    <button onClick={() => setActiveTab('inicio')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'inicio' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/20' : 'text-emerald-100 hover:bg-white/10'}`}>
                        <Home size={20} />
                        <span className="font-medium">Início</span>
                    </button>
                    <button onClick={() => setActiveTab('minha-agenda')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'minha-agenda' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/20' : 'text-emerald-100 hover:bg-white/10'}`}>
                        <CalendarIcon size={20} />
                        <span className="font-medium">Minha Agenda</span>
                    </button>
                    <button onClick={() => setActiveTab('pacientes')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'pacientes' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/20' : 'text-emerald-100 hover:bg-white/10'}`}>
                        <Users size={20} />
                        <span className="font-medium">Pacientes</span>
                    </button>
                    <button onClick={() => setActiveTab('prontuarios')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'prontuarios' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/20' : 'text-emerald-100 hover:bg-white/10'}`}>
                        <FileText size={20} />
                        <span className="font-medium">Prontuários</span>
                    </button>

                    <div className="pt-8 pb-4">
                        <p className="px-4 text-xs font-semibold uppercase tracking-wider text-emerald-400/50">Administração</p>
                    </div>
                    <button onClick={() => setActiveTab('configuracoes')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === 'configuracoes' ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/20' : 'text-emerald-100 hover:bg-white/10'}`}>
                        <Settings size={20} />
                        <span className="font-medium">Configurações</span>
                    </button>
                </nav>

                <div className="p-4 mt-auto">
                    <div className="bg-emerald-900/50 rounded-2xl p-4 mb-4 flex items-center gap-3">
                        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAyk-ON0IH7LD8a4dD2NEk7mPq7BvdFXDDhfHmx3UxAv7CXI5bN4U5Unmyg0qqHWxpQ0P1r2lFmYo3GTaw516gsBiToX004OkGMui_9VVrJWT88yc6MKKD_SZbpy3nV5_bgnVL3OHd9Mrc_p_vh7Q8XpyFx6xbHui9Dcg-CYWYDI2eq-FPIhvCuLSCwOV0oyGd4813iPMwUxbQidYcz8r5PRCumAK4BJgDLBAAt6TRUOHjCvQR3EA8eL0pAMgQ6oqFcHFj9Mw5UKzk" alt="Dr. Julian" className="w-10 h-10 rounded-full border-2 border-emerald-500/50" />
                        <div>
                            <p className="text-sm font-semibold">Dr. Julian Vance</p>
                            <p className="text-[10px] text-emerald-300">Veterinário Sênior</p>
                        </div>
                    </div>
                    <button className="flex items-center justify-center gap-3 px-4 py-3 text-red-300 hover:bg-red-950/30 w-full rounded-xl transition-all">
                        <LogOut size={20} />
                        <span className="font-medium">Sair</span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col h-full bg-[#f1f5f9] overflow-hidden">
                <header className="h-16 bg-[#022c22] border-b border-emerald-800 flex items-center justify-between px-8 shrink-0">
                    <h1 className="text-lg font-semibold text-white">Espaço do Veterinário</h1>
                    <div className="flex items-center gap-4">
                        <button className="p-2 text-emerald-200 hover:text-emerald-400 transition-colors">
                            <Bell size={20} />
                        </button>
                        <div className="h-8 w-[1px] bg-emerald-800"></div>
                        <div className="text-right">
                            <p className="text-xs font-medium text-emerald-300">Segunda-feira, 23 Out</p>
                            <p className="text-sm font-bold text-white">09:42 AM</p>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                    {activeTab === 'inicio' && (
                        <div className="grid grid-cols-12 gap-6">
                            <div className="col-span-8 space-y-6">
                                {/* Paciente Atual */}
                                {currentData ? (
                                    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex h-64">
                                        <div className="w-1/3 relative bg-slate-100 h-full">
                                            {currentData.pet?.img ? (
                                                <img src={currentData.pet.img} alt={currentData.pet.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                    <span className="material-symbols-outlined text-6xl">pets</span>
                                                </div>
                                            )}
                                            <div className="absolute top-4 left-4 bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wide shadow-sm">
                                                Em Atendimento
                                            </div>
                                        </div>
                                        <div className="w-2/3 p-6 flex flex-col justify-between">
                                            <div>
                                                <div className="flex justify-between items-start mb-4">
                                                    <div>
                                                        <h2 className="text-2xl font-bold text-slate-800">{currentData.pet?.name}</h2>
                                                        <p className="text-emerald-600 font-medium">{currentData.pet?.breed} • {currentData.pet?.age}</p>
                                                    </div>
                                                    <button className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-100 transition-colors flex items-center gap-2">
                                                        <span className="material-symbols-outlined text-sm">history</span> Ver Histórico
                                                    </button>
                                                </div>

                                                <div className="grid grid-cols-2 gap-4">
                                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Proprietário</p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-sm text-slate-500">person</span>
                                                            <span className="text-sm font-medium text-slate-700">{currentData.pet?.owner}</span>
                                                        </div>
                                                    </div>
                                                    <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                                        <p className="text-[10px] uppercase font-bold text-slate-400 mb-1">Motivo</p>
                                                        <div className="flex items-center gap-2">
                                                            <span className="material-symbols-outlined text-sm text-slate-500">medical_services</span>
                                                            <span className="text-sm font-medium text-slate-700">{currentData.appointment.reason}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </section>
                                ) : (
                                    <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex h-64 items-center justify-center flex-col text-slate-400">
                                        <span className="material-symbols-outlined text-4xl mb-2">event_available</span>
                                        <p>Nenhum paciente aguardando atendimento no momento.</p>
                                    </section>
                                )}

                                {/* Sessão de Atendimento */}
                                <section className={`bg-white rounded-2xl border border-slate-200 shadow-sm p-6 ${!currentData ? 'opacity-50 pointer-events-none' : ''}`}>
                                    <div className="flex items-center justify-between mb-6">
                                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-emerald-600">edit_note</span> Sessão de Atendimento
                                        </h3>
                                        <div className="flex gap-2">
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400"><span className="material-symbols-outlined text-xl">format_bold</span></button>
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400"><span className="material-symbols-outlined text-xl">format_italic</span></button>
                                            <button className="p-1.5 hover:bg-slate-100 rounded text-slate-400"><span className="material-symbols-outlined text-xl">format_list_bulleted</span></button>
                                        </div>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Observações Clínicas</label>
                                            <textarea
                                                value={notes}
                                                onChange={(e) => setNotes(e.target.value)}
                                                className="w-full border border-slate-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 p-3 outline-none text-sm resize-none"
                                                placeholder="Descreva sintomas, comportamento e achados do exame físico..." rows="4"></textarea>
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Prescrições & Procedimentos</label>
                                            <textarea
                                                value={prescriptions}
                                                onChange={(e) => setPrescriptions(e.target.value)}
                                                className="w-full border border-slate-200 rounded-xl focus:ring-emerald-500 focus:border-emerald-500 p-3 outline-none text-sm resize-none"
                                                placeholder="Insira nomes de medicamentos, dosagens ou detalhes cirúrgicos..." rows="3"></textarea>
                                        </div>
                                        <div className="flex justify-end gap-3 pt-2">
                                            <button className="px-6 py-2 border border-slate-200 rounded-xl text-slate-600 font-semibold text-sm hover:bg-slate-50 transition-colors">Rascunho</button>
                                            <button onClick={handleSaveSession} className="px-6 py-2 bg-emerald-700 text-white rounded-xl font-semibold text-sm hover:bg-emerald-800 transition-colors shadow-lg shadow-emerald-200">Finalizar Sessão</button>
                                        </div>
                                    </div>
                                </section>

                                {/* Visitas */}
                                <section className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                    <div className="flex border-b border-slate-100">
                                        <button className="px-6 py-4 text-sm font-bold text-emerald-700 border-b-2 border-emerald-700 bg-white">Visitas Anteriores</button>
                                        <button className="px-6 py-4 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors bg-white">Vacinas</button>
                                        <button className="px-6 py-4 text-sm font-medium text-slate-400 hover:text-slate-600 transition-colors bg-white">Resultados de Laboratório</button>
                                    </div>
                                    <div className="p-6">
                                        <div className="space-y-4">
                                            <div className="flex gap-4 items-start p-4 bg-slate-50 rounded-xl">
                                                <div className="w-20 shrink-0 text-center">
                                                    <p className="text-sm font-bold text-slate-800">12 Set</p>
                                                    <p className="text-[10px] text-slate-400">2023</p>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-bold text-slate-700">Vacinação Anual</h4>
                                                    <p className="text-xs text-slate-500 mt-1 italic">"Paciente saudável, sem reações adversas às vacinas. Peso estável."</p>
                                                </div>
                                                <button className="text-emerald-700 font-bold text-xs">Detalhes</button>
                                            </div>
                                            <div className="flex gap-4 items-start p-4 border border-slate-100 rounded-xl">
                                                <div className="w-20 shrink-0 text-center">
                                                    <p className="text-sm font-bold text-slate-800">05 Jun</p>
                                                    <p className="text-[10px] text-slate-400">2023</p>
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="text-sm font-bold text-slate-700">Pequena Lesão na Pata</h4>
                                                    <p className="text-xs text-slate-500 mt-1 italic">"Limpeza de pequena laceração na pata dianteira direita. Prescrito antisséptico tópico."</p>
                                                </div>
                                                <button className="text-emerald-700 font-bold text-xs">Detalhes</button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>

                            <div className="col-span-4 h-[calc(100vh-120px)]">
                                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 h-full flex flex-col">
                                    <div className="flex items-center justify-between mb-8">
                                        <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                            <span className="material-symbols-outlined text-emerald-600">schedule</span> Agenda de Hoje
                                        </h3>
                                        <button className="text-xs font-bold text-emerald-700 hover:underline">Ver Tudo</button>
                                    </div>

                                    <div className="flex-1 relative ml-4 space-y-8 overflow-y-auto pr-2 custom-scrollbar">
                                        {todayAppointments.map(apt => {
                                            const pet = getPetById(apt.petId);
                                            const isInProgress = apt.status === 'In Progress';

                                            return (
                                                <div key={apt.id} className="relative timeline-slot pl-6">
                                                    <div className={`timeline-dot ${isInProgress ? 'border-emerald-500' : 'border-slate-300'}`}></div>
                                                    <div className="text-[11px] font-bold text-slate-400 uppercase mb-1">{apt.time} {apt.period}</div>
                                                    <div className={`${isInProgress ? 'bg-emerald-50 border-l-4 border-emerald-500' : 'bg-slate-50 border-l-4 border-slate-300'} p-3 rounded-r-xl`}>
                                                        <div className="flex justify-between items-start">
                                                            <div>
                                                                <p className={`text-sm font-bold ${isInProgress ? 'text-emerald-900' : 'text-slate-800'}`}>{pet?.name} <span className="text-xs font-normal">({pet?.breed})</span></p>
                                                                <p className={`text-xs ${isInProgress ? 'text-emerald-700' : 'text-slate-500'}`}>{apt.reason}</p>
                                                            </div>
                                                            <span className="bg-emerald-600/10 text-emerald-600 px-1.5 py-0.5 rounded text-[10px] font-bold">{apt.status}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>

                                    <div className="mt-8 pt-6 border-t border-slate-100 text-center shrink-0">
                                        <button className="w-full py-3 bg-emerald-900 text-white rounded-xl font-semibold text-sm hover:bg-emerald-950 transition-colors">
                                            Adicionar Urgência
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'minha-agenda' && (
                        <div className="max-w-5xl mx-auto space-y-6">
                            <h2 className="text-2xl font-bold text-slate-800 border-b border-emerald-200 pb-4 mb-6">Minha Agenda Completa</h2>
                            <div className="space-y-4">
                                {todayAppointments.map(apt => {
                                    const pet = getPetById(apt.petId);
                                    return (
                                        <div key={apt.id} className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex items-center justify-between hover:border-emerald-500 transition-colors">
                                            <div className="flex items-center gap-4">
                                                <div className="bg-emerald-50 rounded-lg p-3 text-center min-w-[80px]">
                                                    <div className="font-bold text-emerald-800">{apt.time}</div>
                                                    <div className="text-[10px] uppercase font-bold text-emerald-600">{apt.period}</div>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-slate-800">{pet?.name} <span className="text-xs font-normal text-slate-500">({pet?.breed})</span></h3>
                                                    <p className="text-sm text-slate-600 flex items-center gap-1">
                                                        <span className="material-symbols-outlined text-[14px]">medical_services</span> {apt.reason}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="flex gap-2">
                                                <span className={`px-3 py-1 text-xs font-bold rounded-full ${apt.status === 'Completed' ? 'bg-slate-100 text-slate-500' : 'bg-amber-100 text-amber-700'}`}>{apt.status}</span>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                    {activeTab === 'pacientes' && (
                        <div className="max-w-5xl mx-auto space-y-6">
                            <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
                                <h2 className="text-xl font-bold text-slate-800">Meus Pacientes</h2>
                                <div className="relative w-72">
                                    <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400">search</span>
                                    <input type="text" placeholder="Buscar por nome ou tutor..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 outline-none" />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="bg-white flex items-center gap-4 p-4 rounded-xl border border-slate-200 shadow-sm">
                                        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-300">
                                            <span className="material-symbols-outlined text-3xl">pets</span>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800">Paciente #{i}04{i}</h3>
                                            <p className="text-sm text-slate-500 mb-1">Cão • Golden Retriever</p>
                                            <button className="text-xs font-bold text-emerald-600 hover:text-emerald-800">Abrir Ficha</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    {activeTab === 'prontuarios' && (
                        <div className="max-w-5xl mx-auto space-y-6">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Prontuários Eletrônicos Recentes</h2>
                            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                                <table className="w-full text-left">
                                    <thead className="bg-slate-50 border-b border-slate-200">
                                        <tr className="text-xs uppercase font-bold text-slate-500">
                                            <th className="p-4">Data</th>
                                            <th className="p-4">Paciente</th>
                                            <th className="p-4">Procedimento</th>
                                            <th className="p-4">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        <tr className="hover:bg-slate-50">
                                            <td className="p-4 font-medium text-slate-700">Ontem</td>
                                            <td className="p-4 font-bold text-slate-800">Oliver</td>
                                            <td className="p-4 text-slate-600">Alta Cirúrgica</td>
                                            <td className="p-4"><button className="text-emerald-600 font-bold text-sm">Visualizar</button></td>
                                        </tr>
                                        <tr className="hover:bg-slate-50">
                                            <td className="p-4 font-medium text-slate-700">14 Out</td>
                                            <td className="p-4 font-bold text-slate-800">Max</td>
                                            <td className="p-4 text-slate-600">Consulta Retorno</td>
                                            <td className="p-4"><button className="text-emerald-600 font-bold text-sm">Visualizar</button></td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {activeTab === 'configuracoes' && (
                        <div className="max-w-3xl mx-auto space-y-6">
                            <h2 className="text-2xl font-bold text-slate-800 mb-4">Perfil do Profissional</h2>
                            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Nome Completo</label>
                                        <input type="text" defaultValue="Dr. Julian Vance" className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none" />
                                    </div>
                                    <div className="flex-1">
                                        <label className="block text-xs font-bold text-slate-500 uppercase mb-1">CRMV</label>
                                        <input type="text" defaultValue="CRMV-SP 12345" className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none" />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Especialidade</label>
                                    <input type="text" defaultValue="Cirurgia Geral Veterinária" className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:border-emerald-500 outline-none" />
                                </div>
                                <div className="pt-4 flex justify-end">
                                    <button className="bg-emerald-600 text-white font-bold px-6 py-2 rounded-lg hover:bg-emerald-700 shadow-sm">Salvar Perfil</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
