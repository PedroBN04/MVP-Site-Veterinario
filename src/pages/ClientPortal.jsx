import React, { useState } from 'react';
import { Calendar, History, Bell, ChevronLeft, ChevronRight, CheckCircle2, Navigation, Clock, MapPin, Bone } from 'lucide-react';
import { useClinic } from '../context/ClinicContext';

export default function ClientPortal() {
    const { getMyPets, addAppointment } = useClinic();
    const myPets = getMyPets();

    // Default to the first pet if available
    const [selectedPet, setSelectedPet] = useState(myPets.length > 0 ? myPets[0] : null);
    const [selectedTime, setSelectedTime] = useState('09:00');
    const [selectedDate, setSelectedDate] = useState(3);
    const [periodOfDay, setPeriodOfDay] = useState('Manhã');
    const [successMessage, setSuccessMessage] = useState(false);

    // Tab Navigation State
    const [activeTab, setActiveTab] = useState('agendamento');

    const handleSchedule = () => {
        if (!selectedPet) return;

        let ampm = 'AM';
        const hour = parseInt(selectedTime.split(':')[0]);
        if (hour >= 12 && hour < 18) ampm = 'PM';
        else if (hour >= 18) ampm = 'PM';

        addAppointment({
            date: selectedDate,
            time: selectedTime,
            period: ampm,
            petId: selectedPet.id,
            reason: 'Consulta Geral'
        });

        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 3000);
    };

    return (
        <div className="min-h-screen bg-[#f9fbf9] font-sans text-slate-800">
            <nav className="bg-white border-b border-slate-100 sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                            <span className="material-symbols-outlined text-white">pets</span>
                        </div>
                        <span className="text-xl font-bold tracking-tight text-primary">VetClinic Manager</span>
                    </div>

                    <div className="hidden md:flex items-center gap-8">
                        <button onClick={() => setActiveTab('agendamento')} className={`${activeTab === 'agendamento' ? 'text-primary font-semibold' : 'text-slate-500 hover:text-primary'} transition-colors flex items-center gap-2`}>
                            <Calendar size={20} /> Agendamento
                        </button>
                        <button onClick={() => setActiveTab('pets')} className={`${activeTab === 'pets' ? 'text-primary font-semibold' : 'text-slate-500 hover:text-primary'} transition-colors flex items-center gap-2`}>
                            <span className="material-symbols-outlined text-[20px]">pets</span> Meus Pets
                        </button>
                        <button onClick={() => setActiveTab('historico')} className={`${activeTab === 'historico' ? 'text-primary font-semibold' : 'text-slate-500 hover:text-primary'} transition-colors flex items-center gap-2`}>
                            <History size={20} /> Histórico
                        </button>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:text-slate-600 transition-colors">
                            <Bell size={24} />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full"></span>
                        </button>
                        <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCN5K2m60KL2179oO7GAVPWwRIFxYxGFJG5icQpSK2xp2sWNNWv8eWSCeiRjy8u03orLboaexSlRCtJd9DKTQN-h8oJw3ffEWDeaABbpQ17oLRnyQT7SAhCkxiinjCJL-ssUstR-shipeiIigVttc-9VdeDNHn0CdkJU5fqnNiimDrNvH_EL0GD5e9CmJq1TrRPu9SXvAggPYSuf36as6bLJPIA5muG9zvU9yXh5_33xwwqeeo32YCnAm8xFaOekq4qEewYnUymhOo" alt="User Avatar" className="w-full h-full object-cover" />
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-10">
                {activeTab === 'agendamento' && (
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                        <div className="lg:col-span-8 space-y-8">

                            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex items-center justify-between px-2">
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">1</div>
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wider text-center">Selecionar Pet</span>
                                </div>
                                <div className="h-[2px] bg-sage-medium flex-1 mx-2 mb-6"></div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-10 h-10 rounded-full bg-sage-soft text-primary border-2 border-sage-medium flex items-center justify-center font-bold">2</div>
                                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider text-center">Serviço</span>
                                </div>
                                <div className="h-[2px] bg-slate-100 flex-1 mx-2 mb-6"></div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-10 h-10 rounded-full bg-sage-soft text-primary border-2 border-sage-medium flex items-center justify-center font-bold">3</div>
                                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider text-center">Escolher Vet</span>
                                </div>
                                <div className="h-[2px] bg-slate-100 flex-1 mx-2 mb-6"></div>
                                <div className="flex flex-col items-center gap-2 flex-1">
                                    <div className="w-10 h-10 rounded-full bg-sage-soft text-primary border-2 border-sage-medium flex items-center justify-center font-bold">4</div>
                                    <span className="text-xs font-medium text-slate-400 uppercase tracking-wider text-center">Data e Hora</span>
                                </div>
                            </div>

                            <section className="space-y-6">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-800">Qual pet fará a visita hoje?</h2>
                                    <p className="text-slate-500">Escolha um dos seus pets registrados para continuar o agendamento.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {myPets.map(pet => (
                                        <div
                                            key={pet.id}
                                            onClick={() => setSelectedPet(pet)}
                                            className={`group relative flex flex-col p-6 rounded-2xl bg-white border shadow-sm transition-all cursor-pointer ${selectedPet?.id === pet.id ? 'pet-card-selected' : 'border-slate-200 hover:shadow-md'}`}
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-inner bg-slate-100 flex items-center justify-center">
                                                    {pet.img ? (
                                                        <img src={pet.img} alt={pet.name} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <span className="material-symbols-outlined text-4xl text-slate-300">pets</span>
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-lg text-slate-800">{pet.name}</h3>
                                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                                        <span className="material-symbols-outlined text-[16px]">category</span> {pet.breed}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-slate-500">
                                                        <span className="material-symbols-outlined text-[16px]">event</span> {pet.age}
                                                    </div>
                                                </div>
                                                {selectedPet?.id === pet.id && (
                                                    <div className="text-primary pt-2">
                                                        <CheckCircle2 size={28} />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="flex flex-col p-6 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 items-center justify-center gap-2 hover:bg-sage-soft transition-colors cursor-pointer group">
                                        <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center group-hover:bg-sage-medium transition-colors">
                                            <span className="material-symbols-outlined text-slate-600 group-hover:text-primary">add</span>
                                        </div>
                                        <span className="text-sm font-bold text-slate-600">Adicionar Novo Pet</span>
                                    </div>
                                </div>
                            </section>

                            <section className="space-y-6 pt-6">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                    <div>
                                        <h2 className="text-2xl font-bold text-slate-800">Escolher Data e Hora</h2>
                                        <p className="text-slate-500">Verifique a disponibilidade para sua visita.</p>
                                    </div>
                                    <div className="flex bg-white border border-slate-200 rounded-xl p-1">
                                        {['Manhã', 'Tarde', 'Noite'].map(period => (
                                            <button
                                                key={period}
                                                onClick={() => setPeriodOfDay(period)}
                                                className={`px-4 py-2 text-sm font-bold rounded-lg ${periodOfDay === period ? 'bg-sage-soft text-primary' : 'font-medium text-slate-500 hover:bg-slate-50'}`}
                                            >
                                                {period}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                                        <div className="flex items-center justify-between mb-6">
                                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                                <ChevronLeft size={20} />
                                            </button>
                                            <h3 className="font-bold text-slate-800">Dezembro 2024</h3>
                                            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                                <ChevronRight size={20} />
                                            </button>
                                        </div>

                                        <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-slate-400 mb-4">
                                            <span>S</span><span>T</span><span>Q</span><span>Q</span><span>S</span><span>S</span><span>D</span>
                                        </div>
                                        <div className="grid grid-cols-7 gap-2 text-center">
                                            {[28, 29, 30].map(d => <button key={`p-${d}`} className="py-2 text-sm text-slate-300">{d}</button>)}
                                            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(d => (
                                                <button
                                                    key={`c-${d}`}
                                                    onClick={() => setSelectedDate(d)}
                                                    className={`py-2 text-sm font-medium rounded-lg ${selectedDate === d ? 'bg-primary text-white shadow-sm' : 'hover:bg-sage-soft hover:text-primary'} `}
                                                >
                                                    {d}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 h-max">
                                        {['09:00', '09:30', '10:00', '11:00', '11:30', '12:00', '12:30'].map(time => (
                                            <div
                                                key={time}
                                                onClick={() => setSelectedTime(time)}
                                                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                                            >
                                                {time}
                                            </div>
                                        ))}
                                        <div className="time-slot bg-slate-50 text-slate-300 cursor-not-allowed border-slate-100 hover:border-slate-100 hover:bg-slate-50">10:30</div>
                                    </div>
                                </div>
                            </section>
                        </div>

                        <div className="lg:col-span-4">
                            <div className="sticky top-28 space-y-6">
                                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-xl overflow-hidden relative">
                                    <div className="absolute top-0 left-0 right-0 h-2 bg-primary"></div>
                                    <h3 className="text-xl font-bold text-slate-800 mb-6">Resumo do Agendamento</h3>

                                    <div className="space-y-6">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-sage-soft flex items-center justify-center text-primary shrink-0">
                                                <span className="material-symbols-outlined">pets</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Detalhes do Pet</p>
                                                <p className="font-bold text-slate-800 capitalize">{selectedPet?.name || 'Selecione um Pet'} <span className="text-slate-500 font-medium">({selectedPet?.type})</span></p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-sage-soft flex items-center justify-center text-primary shrink-0">
                                                <span className="material-symbols-outlined">stethoscope</span>
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Serviço e Vet</p>
                                                <p className="font-bold text-slate-800">Consulta Geral</p>
                                                <p className="text-sm text-slate-500">Dra. Sarah Johnson</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-sage-soft flex items-center justify-center text-primary shrink-0">
                                                <Clock size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Horário</p>
                                                <p className="font-bold text-slate-800">Terça, {selectedDate} de Dezembro</p>
                                                <p className="text-sm text-slate-500">{selectedTime} (30 min)</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-sage-soft flex items-center justify-center text-primary shrink-0">
                                                <MapPin size={20} />
                                            </div>
                                            <div>
                                                <p className="text-xs font-bold text-slate-400 uppercase tracking-tighter">Localização</p>
                                                <p className="font-bold text-slate-800">Clínica Unidade Norte</p>
                                                <p className="text-sm text-slate-500">Piso 2, Sala 204</p>
                                            </div>
                                        </div>

                                        <hr className="border-slate-100" />
                                        <div className="flex items-center justify-between py-2">
                                            <span className="text-slate-500 font-medium">Total Estimado</span>
                                            <span className="text-2xl font-bold text-primary">R$ 150,00</span>
                                        </div>

                                        <button onClick={handleSchedule} disabled={!selectedPet || successMessage} className={`w-full ${successMessage ? 'bg-emerald-500' : 'bg-primary hover:bg-primary-hover'} text-white font-bold py-4 px-6 rounded-2xl shadow-lg shadow-green-100 transition-all active:scale-95 flex items-center justify-center gap-2`}>
                                            {successMessage ? 'Agendado com Sucesso!' : (
                                                <>Agendar Consulta <Navigation size={18} className="rotate-90" /></>
                                            )}
                                        </button>
                                        <p className="text-center text-xs text-slate-400">
                                            Ao clicar, você concorda com nossos <a href="#" className="underline">Termos de Serviço</a>
                                        </p>
                                    </div>
                                </div>

                                <div className="bg-primary rounded-3xl p-6 text-white relative overflow-hidden group">
                                    <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full group-hover:scale-125 transition-transform"></div>
                                    <div className="relative z-10 flex flex-col gap-3">
                                        <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                            <span className="material-symbols-outlined">support_agent</span>
                                        </div>
                                        <h4 className="font-bold text-lg leading-tight">Precisa de ajuda com o agendamento?</h4>
                                        <p className="text-white/80 text-sm">Nossa equipe está disponível para urgências veterinárias.</p>
                                        <a href="tel:0800-VET-CARE" className="text-white font-bold text-sm underline mt-2 hover:text-white/60 transition-colors">Ligar 0800 VET CARE</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'pets' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-8">
                            <div>
                                <h2 className="text-2xl font-bold text-slate-800">Meus Pets</h2>
                                <p className="text-slate-500">Gerencie os perfis dos seus animais e acesse informações básicas.</p>
                            </div>
                            <button className="bg-primary text-white font-bold py-2.5 px-5 rounded-xl hover:bg-primary-hover transition-colors flex items-center gap-2 shadow-sm">
                                <span className="material-symbols-outlined text-sm">add</span> Novo Pet
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {myPets.map(pet => (
                                <div key={pet.id} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative group overflow-hidden">
                                    <div className="absolute top-4 right-4 text-slate-300 hover:text-primary cursor-pointer transition-colors z-10">
                                        <span className="material-symbols-outlined">edit</span>
                                    </div>
                                    <div className="w-24 h-24 mx-auto bg-slate-100 rounded-full mb-4 overflow-hidden border-4 border-white shadow-md relative z-10">
                                        {pet.img ? (
                                            <img src={pet.img} alt={pet.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-slate-300">
                                                <span className="material-symbols-outlined text-4xl">pets</span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="text-center relative z-10">
                                        <h3 className="text-xl font-bold text-slate-800">{pet.name}</h3>
                                        <p className="text-primary font-medium text-sm mb-4">{pet.breed}</p>

                                        <div className="grid grid-cols-2 gap-3 mb-4">
                                            <div className="bg-slate-50 rounded-lg p-2 text-center">
                                                <span className="block text-[10px] font-bold text-slate-400 uppercase">Idade</span>
                                                <span className="text-sm font-semibold text-slate-700">{pet.age}</span>
                                            </div>
                                            <div className="bg-slate-50 rounded-lg p-2 text-center">
                                                <span className="block text-[10px] font-bold text-slate-400 uppercase">Peso</span>
                                                <span className="text-sm font-semibold text-slate-700">{pet.weight}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {activeTab === 'historico' && (
                    <div className="space-y-6">
                        <div className="mb-8">
                            <h2 className="text-2xl font-bold text-slate-800">Histórico Clínico</h2>
                            <p className="text-slate-500">Acompanhe as consultas realizadas, receitas médicas e próximos retornos.</p>
                        </div>

                        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                            <div className="border-b border-slate-100 p-4 bg-slate-50 flex items-center justify-between">
                                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                                    <History size={18} className="text-primary" /> Últimas Consultas
                                </h3>
                                <select className="text-sm border-slate-200 rounded-lg text-slate-600 bg-white px-3 py-1 outline-none border">
                                    <option>Todos os Pets</option>
                                    {myPets.map(p => <option key={p.id}>{p.name}</option>)}
                                </select>
                            </div>
                            <div className="p-0">
                                <div className="divide-y divide-slate-100">
                                    <div className="p-6 flex flex-col md:flex-row gap-6 md:items-center hover:bg-slate-50 transition-colors">
                                        <div className="w-16 h-16 shrink-0 bg-sage-soft rounded-2xl flex flex-col items-center justify-center text-primary">
                                            <span className="text-lg font-bold">15</span>
                                            <span className="text-[10px] uppercase font-bold">Out</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-md">Realizado</span>
                                                <span className="text-sm font-bold text-slate-800">Dr. Julian Vance</span>
                                            </div>
                                            <h4 className="text-lg font-bold text-slate-800 mb-1">Rotina Anual & Check-up</h4>
                                            <p className="text-sm text-slate-500">Paciente Cooper. Todos os exames dentro da normalidade.</p>
                                        </div>
                                        <button className="shrink-0 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors">
                                            Ver Prontuário
                                        </button>
                                    </div>

                                    <div className="p-6 flex flex-col md:flex-row gap-6 md:items-center hover:bg-slate-50 transition-colors">
                                        <div className="w-16 h-16 shrink-0 bg-sage-soft rounded-2xl flex flex-col items-center justify-center text-primary">
                                            <span className="text-lg font-bold">02</span>
                                            <span className="text-[10px] uppercase font-bold">Ago</span>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase rounded-md">Realizado</span>
                                                <span className="text-sm font-bold text-slate-800">Dra. Sarah Johnson</span>
                                            </div>
                                            <h4 className="text-lg font-bold text-slate-800 mb-1">Vacinação Antirrábica</h4>
                                            <p className="text-sm text-slate-500">Paciente Luna. Dose única aplicada sem reações.</p>
                                        </div>
                                        <button className="shrink-0 px-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors">
                                            Ver Prontuário
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            <footer className="max-w-6xl mx-auto px-6 py-12 text-center text-slate-400 text-sm">
                <p>© 2024 VetClinic Manager. Todos os direitos reservados.</p>
            </footer>
        </div>
    );
}
