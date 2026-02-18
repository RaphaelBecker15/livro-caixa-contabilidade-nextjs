import { UserFilter } from "@/components/admin/usuarios/UserFilter";
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
                <UserFilter/>
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