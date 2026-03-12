import React from 'react';
import { Home, Calendar as CalendarIcon, Users, Settings, Search, Bell, LogOut, BarChart3, PlusCircle, UserPlus, FileText, Star } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export default function ReceptionistDashboard() {
    const { getTodayAppointments, getPetById, updateAppointmentStatus } = useClinic();
    const todayAppointments = getTodayAppointments();
    const [activeTab, setActiveTab] = React.useState('inicio');

    return (
        <div className="flex h-screen bg-[#f0f4f2] text-slate-800 font-sans overflow-hidden">
            <aside className="w-[260px] bg-[#052e16] text-white flex flex-col shrink-0">
                <div className="p-6">
                    <div className="flex items-center gap-2 mb-8">
                        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center text-white">
                            <span className="material-symbols-outlined text-2xl">pets</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight">VetClinic <span className="text-emerald-400">MGR</span></span>
                    </div>

                    <nav className="space-y-2">
                        <div onClick={() => setActiveTab('inicio')} className={`sidebar-item cursor-pointer ${activeTab === 'inicio' ? 'active' : ''}`}>
                            <Home size={20} />
                            <span>Início</span>
                        </div>
                        <div onClick={() => setActiveTab('agendamentos')} className={`sidebar-item cursor-pointer ${activeTab === 'agendamentos' ? 'active' : ''}`}>
                            <CalendarIcon size={20} />
                            <span>Agendamentos</span>
                        </div>
                        <div onClick={() => setActiveTab('clientes')} className={`sidebar-item cursor-pointer ${activeTab === 'clientes' ? 'active' : ''}`}>
                            <Users size={20} />
                            <span>Clientes</span>
                        </div>
                        <div onClick={() => setActiveTab('animais')} className={`sidebar-item cursor-pointer ${activeTab === 'animais' ? 'active' : ''}`}>
                            <span className="material-symbols-outlined text-[20px]">pets</span>
                            <span>Animais</span>
                        </div>
                        <div onClick={() => setActiveTab('relatorios')} className={`sidebar-item cursor-pointer ${activeTab === 'relatorios' ? 'active' : ''}`}>
                            <BarChart3 size={20} />
                            <span>Relatórios</span>
                        </div>
                        <div onClick={() => setActiveTab('configuracoes')} className={`sidebar-item cursor-pointer ${activeTab === 'configuracoes' ? 'active' : ''}`}>
                            <Settings size={20} />
                            <span>Configurações</span>
                        </div>
                    </nav>
                </div>

                <div className="mt-auto p-6 border-t border-emerald-900">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-800 overflow-hidden">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAirwg74DbKXqCBuC9m-vudV7B9h_Y1TFFBMRwp-_WN5qYA3_CjG8YY1XjCTZ0eqh62LUFPXjFFdGnCRh0NisYyJD6EHXJbuZDdUyW5q35wZXxBJnxOTdwEsEd0GJfdvIUxuSp5JERuM2vgpv3jiRHb01w5iLFdtAZA2nbbo0QHusmsjOB0TngcbkJtZg-E9kasn_dVuqW_y4z3BEGTpNpwfQuHUEWtitEw36diVnJzcNjYBCyzaX4TtGp5f4QQJ0sTibTcGEyjef4" alt="Sarah Connor" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">Sarah Connor</p>
                            <p className="text-xs text-emerald-300/70">Recepcionista</p>
                        </div>
                        <button className="ml-auto text-emerald-400 hover:text-red-400">
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </aside>

            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
                    <div className="relative w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input type="text" placeholder="Buscar clientes, pets ou médicos..." className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-emerald-600 transition-all outline-none" />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-all">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
                        <div className="text-right">
                            <p className="text-sm font-medium text-slate-900">Segunda, 23 Out</p>
                            <p className="text-xs text-slate-400">09:42 AM</p>
                        </div>
                    </div>
                </header>

                <div className="flex-1 overflow-y-auto p-8">
                    {activeTab === 'inicio' && (
                        <div className="max-w-7xl mx-auto">
                            <section className="mb-10">
                                <h1 className="text-3xl font-bold text-slate-900">Bom dia, Sarah!</h1>
                                <p className="text-slate-500 mt-1">Você tem <span className="font-semibold text-emerald-700">{todayAppointments.length} agendamentos</span> para hoje.</p>
                            </section>

                            <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                                <div className="action-card group">
                                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-4 group-hover:bg-emerald-700 group-hover:text-white transition-all">
                                        <PlusCircle size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-1 text-slate-800">Novo Agendamento</h3>
                                    <p className="text-slate-500 text-sm">Agende uma consulta ou retorno para um paciente.</p>
                                </div>

                                <div className="action-card group">
                                    <div className="w-12 h-12 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center mb-4 group-hover:bg-emerald-700 group-hover:text-white transition-all">
                                        <UserPlus size={24} />
                                    </div>
                                    <h3 className="text-lg font-bold mb-1 text-slate-800">Cadastrar Cliente</h3>
                                    <p className="text-slate-500 text-sm">Adicione um novo proprietário ao sistema da clínica.</p>
                                </div>

                                <div className="action-card group">
                                    <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mb-4 group-hover:bg-emerald-700 group-hover:text-white transition-all">
                                        <span className="material-symbols-outlined text-[24px]">pets</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-1 text-slate-800">Adicionar Pet</h3>
                                    <p className="text-slate-500 text-sm">Crie um novo perfil animal para clientes existentes.</p>
                                </div>
                            </section>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                <section className="lg:col-span-2">
                                    <div className="flex items-center justify-between mb-6">
                                        <h2 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                                            <span className="material-symbols-outlined text-emerald-700">event_note</span> Agenda do Dia
                                        </h2>
                                        <button className="text-sm font-medium text-emerald-700 hover:text-emerald-800">Ver Agenda Completa</button>
                                    </div>

                                    <div className="space-y-3">
                                        {todayAppointments.map(apt => {
                                            const pet = getPetById(apt.petId);
                                            const isCheckedIn = apt.status === 'Checked In' || apt.status === 'In Progress';
                                            const isCompleted = apt.status === 'Completed';

                                            let statusColor = "border-l-amber-400";
                                            if (isCheckedIn) statusColor = "border-l-emerald-400";
                                            if (isCompleted) statusColor = "border-l-emerald-600";

                                            return (
                                                <div key={apt.id} className={`appointment-card border-l-4 ${statusColor}`}>
                                                    <div className="flex items-center gap-4 flex-1">
                                                        <div className="text-center min-w-[60px]">
                                                            <p className="text-sm font-bold text-slate-900">{apt.time}</p>
                                                            <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">{apt.period}</p>
                                                        </div>
                                                        <div className="w-10 h-10 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-700 overflow-hidden">
                                                            {pet?.img ? (
                                                                <img src={pet.img} alt={pet.name} className="w-full h-full object-cover" />
                                                            ) : (
                                                                <span className="material-symbols-outlined">pets</span>
                                                            )}
                                                        </div>
                                                        <div className="flex-1">
                                                            <p className="font-bold text-slate-900 flex items-center gap-1">{pet?.name} <span className="text-xs font-normal text-slate-400">({pet?.breed})</span></p>
                                                            <p className="text-sm text-slate-500">Dono: {pet?.owner}</p>
                                                        </div>
                                                        <div className="hidden sm:block px-4 border-x border-slate-100">
                                                            <p className="text-xs font-medium text-slate-400">{apt.room}</p>
                                                            <p className="text-sm font-semibold">{apt.doctor}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex gap-2 ml-4">
                                                        {!isCheckedIn && !isCompleted && (
                                                            <button
                                                                onClick={() => updateAppointmentStatus(apt.id, 'Checked In')}
                                                                className="px-3 py-1.5 text-xs font-bold text-white bg-emerald-700 rounded-lg hover:bg-emerald-800 transition-colors"
                                                            >
                                                                Check-in
                                                            </button>
                                                        )}
                                                        {isCheckedIn && (
                                                            <button className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg cursor-default">Aguardando Vet</button>
                                                        )}
                                                        {isCompleted && (
                                                            <button className="px-3 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 rounded-lg cursor-not-allowed">Realizado</button>
                                                        )}
                                                        <button className="p-1.5 text-slate-400 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all"><FileText size={18} /></button>
                                                    </div>
                                                </div>
                                            );
                                        })}

                                        {/* Break */}
                                        <div className="appointment-card border-l-4 border-l-slate-200 opacity-60">
                                            <div className="flex items-center gap-4 flex-1">
                                                <div className="text-center min-w-[60px]">
                                                    <p className="text-sm font-bold text-slate-900">12:00</p>
                                                    <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">PM</p>
                                                </div>
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                                                    <span className="material-symbols-outlined">restaurant</span>
                                                </div>
                                                <div className="flex-1">
                                                    <p className="font-bold text-slate-900">Horário de Almoço</p>
                                                    <p className="text-sm text-slate-500">Área de descanso</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>

                                <section className="space-y-6">
                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                        <h3 className="font-bold mb-4 text-slate-800">Agendamentos Semanais</h3>
                                        <div className="flex items-end justify-between h-32 gap-2 mb-4">
                                            <div className="w-full bg-slate-100 rounded-t-lg h-[40%] transition-all hover:bg-emerald-100"></div>
                                            <div className="w-full bg-slate-100 rounded-t-lg h-[65%] transition-all hover:bg-emerald-100"></div>
                                            <div className="w-full bg-slate-100 rounded-t-lg h-[90%] transition-all hover:bg-emerald-100"></div>
                                            <div className="w-full bg-slate-100 rounded-t-lg h-[55%] transition-all hover:bg-emerald-100"></div>
                                            <div className="w-full bg-emerald-700 rounded-t-lg h-[80%] transition-all"></div>
                                            <div className="w-full bg-slate-100 rounded-t-lg h-[30%] transition-all hover:bg-emerald-100"></div>
                                            <div className="w-full bg-slate-100 rounded-t-lg h-[20%] transition-all hover:bg-emerald-100"></div>
                                        </div>
                                        <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                                            <span>Seg</span><span>Ter</span><span>Qua</span><span>Qui</span><span>Sex</span><span>Sáb</span><span>Dom</span>
                                        </div>
                                        <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
                                            <span className="text-xs text-slate-500">Total esta semana</span>
                                            <span className="font-bold text-emerald-700">52</span>
                                        </div>
                                    </div>

                                    <div className="bg-emerald-900 p-6 rounded-2xl shadow-sm text-white">
                                        <h3 className="font-bold mb-4 opacity-90 text-emerald-100">Satisfação do Cliente</h3>
                                        <div className="flex items-center gap-4">
                                            <div className="relative w-20 h-20">
                                                <svg className="w-full h-full" viewBox="0 0 36 36">
                                                    <path className="text-emerald-800" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="100, 100" strokeLinecap="round" strokeWidth="3"></path>
                                                    <path className="text-emerald-400" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeDasharray="94, 100" strokeLinecap="round" strokeWidth="3"></path>
                                                </svg>
                                                <div className="absolute inset-0 flex items-center justify-center font-bold text-lg">94%</div>
                                            </div>
                                            <div>
                                                <p className="text-sm opacity-90 leading-tight">Aumento de <span className="font-bold">4.2%</span> desde o mês passado</p>
                                                <div className="flex gap-1 mt-2">
                                                    <Star size={14} className="text-emerald-400 fill-emerald-400" />
                                                    <Star size={14} className="text-emerald-400 fill-emerald-400" />
                                                    <Star size={14} className="text-emerald-400 fill-emerald-400" />
                                                    <Star size={14} className="text-emerald-400 fill-emerald-400" />
                                                    <Star size={14} className="text-emerald-700 fill-emerald-700" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                                        <h3 className="font-bold mb-4 text-slate-800">Notas Rápidas</h3>
                                        <ul className="space-y-3">
                                            <li className="flex items-start gap-3">
                                                <div className="w-2 h-2 mt-1.5 rounded-full bg-amber-400"></div>
                                                <p className="text-xs text-slate-600 leading-normal">Lote de vacinas chega hoje às 14:00.</p>
                                            </li>
                                            <li className="flex items-start gap-3">
                                                <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-500"></div>
                                                <p className="text-xs text-slate-600 leading-normal">Ligar para Sr. Henderson para retorno da Daisy.</p>
                                            </li>
                                        </ul>
                                    </div>

                                </section>
                            </div>
                        </div>
                    )}

                    {activeTab === 'agendamentos' && (
                        <div className="max-w-7xl mx-auto space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">Todos os Agendamentos</h2>
                                    <p className="text-slate-500">Visão completa da agenda da clínica.</p>
                                </div>
                                <button className="bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl hover:bg-emerald-800 transition-colors flex items-center gap-2 shadow-sm">
                                    <PlusCircle size={18} /> Cadastrar Horário
                                </button>
                            </div>

                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200 text-xs uppercase tracking-wider text-slate-500">
                                            <th className="p-4 font-bold">Data/Hora</th>
                                            <th className="p-4 font-bold">Paciente</th>
                                            <th className="p-4 font-bold">Tutor</th>
                                            <th className="p-4 font-bold">Veterinário</th>
                                            <th className="p-4 font-bold">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {todayAppointments.map(apt => {
                                            const pet = getPetById(apt.petId);
                                            return (
                                                <tr key={apt.id} className="hover:bg-slate-50">
                                                    <td className="p-4">
                                                        <div className="font-bold text-slate-800">Hoje, {apt.time}</div>
                                                        <div className="text-xs text-slate-500">{apt.period}</div>
                                                    </td>
                                                    <td className="p-4">
                                                        <div className="font-bold text-slate-800">{pet?.name}</div>
                                                        <div className="text-xs text-slate-500">{pet?.breed}</div>
                                                    </td>
                                                    <td className="p-4 text-sm font-medium text-slate-600">{pet?.owner}</td>
                                                    <td className="p-4 text-sm font-medium text-slate-600">{apt.doctor}</td>
                                                    <td className="p-4">
                                                        <span className={`px-2 py-1 rounded-md text-[10px] uppercase font-bold tracking-wider
                                                            ${apt.status === 'Completed' ? 'bg-slate-100 text-slate-600' :
                                                                apt.status === 'In Progress' ? 'bg-emerald-100 text-emerald-700' :
                                                                    apt.status === 'Checked In' ? 'bg-amber-100 text-amber-700' :
                                                                        'bg-blue-100 text-blue-700'}`}>
                                                            {apt.status}
                                                        </span>
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    {activeTab === 'clientes' && (
                        <div className="max-w-7xl mx-auto space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">Clientes (Tutores)</h2>
                                    <p className="text-slate-500">Gestão de proprietários detalhada.</p>
                                </div>
                                <button className="bg-emerald-700 text-white font-bold py-2.5 px-5 rounded-xl hover:bg-emerald-800 transition-colors flex items-center gap-2 shadow-sm">
                                    <UserPlus size={18} /> Novo Cliente
                                </button>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col items-center justify-center text-center">
                                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4 text-slate-400">
                                    <Users size={32} />
                                </div>
                                <h3 className="font-bold text-slate-800 mb-1">Lista de Clientes Pendente</h3>
                                <p className="text-sm text-slate-500 max-w-sm">Esta funcionalidade será ativada quando a API de usuários for conectada. Atualmente há 120 clientes registrados no sistema legado.</p>
                            </div>
                        </div>
                    )}
                    {activeTab === 'animais' && (
                        <div className="max-w-7xl mx-auto space-y-6">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">Animais Registrados</h2>
                                    <p className="text-slate-500">Gestão de registros veterinários da clínica.</p>
                                </div>
                                <div className="flex bg-slate-100 rounded-lg p-1">
                                    <button className="px-3 py-1 bg-white shadow-sm rounded-md text-sm font-bold text-emerald-700">Todos</button>
                                    <button className="px-3 py-1 text-sm font-medium text-slate-500 hover:text-slate-700">Cães</button>
                                    <button className="px-3 py-1 text-sm font-medium text-slate-500 hover:text-slate-700">Gatos</button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {todayAppointments.map((apt, i) => {
                                    const pet = getPetById(apt.petId);
                                    if (!pet || i > 3) return null; // Just show a few for mock
                                    return (
                                        <div key={`p-${i}`} className="bg-white rounded-2xl border border-slate-200 p-4 shadow-sm flex flex-col items-center text-center">
                                            <div className="w-16 h-16 rounded-full bg-slate-100 mb-3 overflow-hidden">
                                                {pet.img ? <img src={pet.img} className="w-full h-full object-cover" /> : <span className="material-symbols-outlined mt-4 text-slate-400">pets</span>}
                                            </div>
                                            <h3 className="font-bold text-slate-800">{pet.name}</h3>
                                            <p className="text-xs text-slate-500 mb-3">{pet.breed}</p>
                                            <span className="bg-slate-50 text-slate-600 border border-slate-200 text-[10px] font-bold uppercase px-2 py-0.5 rounded-md">Tutor: {pet.owner}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}
                    {activeTab === 'relatorios' && (
                        <div className="max-w-7xl mx-auto space-y-6">
                            <div className="mb-2">
                                <h2 className="text-2xl font-bold text-slate-800">Relatórios Financeiros</h2>
                                <p className="text-slate-500">Estatísticas de performance e faturamento.</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-t-emerald-500">
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Faturamento Mensal</p>
                                    <h3 className="text-3xl font-bold text-slate-800 mb-2">R$ 24.500</h3>
                                    <p className="text-sm text-emerald-600 font-medium">↑ +12.5% vs último mês</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-t-blue-500">
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Novos Pacientes</p>
                                    <h3 className="text-3xl font-bold text-slate-800 mb-2">48</h3>
                                    <p className="text-sm text-emerald-600 font-medium">↑ +5 registros nesta semana</p>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-t-4 border-t-rose-500">
                                    <p className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-1">Cancelamentos</p>
                                    <h3 className="text-3xl font-bold text-slate-800 mb-2">5</h3>
                                    <p className="text-sm text-slate-500 font-medium">Taxa de no-show: 2%</p>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === 'configuracoes' && (
                        <div className="max-w-3xl mx-auto space-y-6">
                            <div className="mb-2">
                                <h2 className="text-2xl font-bold text-slate-800">Configurações</h2>
                                <p className="text-slate-500">Ajustes de sistema e perfil da clínica.</p>
                            </div>
                            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-1">Nome da Clínica</label>
                                    <input type="text" defaultValue="VetClinic Manager Center" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-emerald-500" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Telefone de Contato</label>
                                        <input type="text" defaultValue="(11) 9999-9999" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-emerald-500" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-1">Horário de Funcionamento</label>
                                        <input type="text" defaultValue="08:00 - 18:00" className="w-full border border-slate-200 rounded-lg p-2.5 text-sm outline-none focus:border-emerald-500" />
                                    </div>
                                </div>
                                <div className="pt-4 flex justify-end">
                                    <button className="bg-emerald-700 text-white font-bold py-2 px-6 rounded-xl hover:bg-emerald-800 transition-colors">Salvar Alterações</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
