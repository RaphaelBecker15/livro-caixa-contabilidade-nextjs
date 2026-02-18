import { Search } from "lucide-react";
import { AddUserButton } from "@/components/admin/usuarios/AddUserButton";
import { UsuariosClient } from "@/app/admin/UsuariosClient";

export default function Usuarios() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Gerenciar Usuários</h1>
                </div>
                <AddUserButton/>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Buscar por nome, email ou cargo..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-black-500 outline-none"/>
                </div>
                <div className="text-sm text-slate-500 whitespace-nowrap">
                    Total: <span className="font-bold text-slate-900">1</span> usuário(s)
                </div>
            </div>

            {/*Tabela*/}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <UsuariosClient/>
                </div>
            </div>
        </div>
    )
}