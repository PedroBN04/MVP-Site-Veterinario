import React from 'react';
import { Link } from 'react-router-dom';
import { User, Shield, Stethoscope } from 'lucide-react';

export default function Home() {
    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6">
            <div className="text-center mb-12">
                <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-white text-3xl">pets</span>
                </div>
                <h1 className="text-4xl font-bold text-slate-900 mb-4">VetClinic Manager</h1>
                <p className="text-slate-600 max-w-lg mx-auto">
                    Sistema integrado de gestão veterinária. Escolha o seu perfil de acesso abaixo para visualizar o respectivo painel.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                <Link to="/client" className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-primary/30 transition-all flex flex-col items-center text-center cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl bg-sage-soft text-primary flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <User size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Portal do Cliente</h2>
                    <p className="text-slate-500 text-sm">Agendamentos, controle de vacinas e gestão dos pets.</p>
                </Link>

                <Link to="/receptionist" className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-emerald-600/30 transition-all flex flex-col items-center text-center cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Shield size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Painel de Recepção</h2>
                    <p className="text-slate-500 text-sm">Gestão de agenda clínica, cadastro de clientes e pets.</p>
                </Link>

                <Link to="/vet" className="group bg-white p-8 rounded-3xl shadow-sm border border-slate-200 hover:shadow-xl hover:border-teal-600/30 transition-all flex flex-col items-center text-center cursor-pointer">
                    <div className="w-16 h-16 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                        <Stethoscope size={32} />
                    </div>
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Espaço do Veterinário</h2>
                    <p className="text-slate-500 text-sm">Prontuários eletrônicos e gestão de consultas diárias.</p>
                </Link>
            </div>
        </div>
    );
}
