import { Search, UserRound } from "lucide-react";
import { AddUserButton } from "@/components/admin/AddUserButton";
import { UserActionButtons } from "@/components/admin/UserActionButtons";
import { users } from "@/lib/mock-data";

/*async function getUsers() {
    return [];
}*/

export default async function Usuarios() {

    /*const users = await getUsers();*/

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
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Nome</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Função/Cargo</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {users.length > 0 ? (
                                users.map((user: any) => (
                                    <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                                                    <UserRound size={20} />
                                                </div>
                                                <span className="font-medium text-sm">{user.nome}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 font-medium text-sm">{user.email}</td>
                                        <td className="px-6 py-4 text-slate-600 font-medium text-sm">{user.cargo}</td>
                                        <td className="px-6 py-4 text-right">
                                            <UserActionButtons userId={user.id}/>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                                        Nenhuma usuário encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}