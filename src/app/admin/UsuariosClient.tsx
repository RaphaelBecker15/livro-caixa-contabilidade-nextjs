"use client";
import { useUsuarios } from "@/contexts/admin/ApiUsuariosContext";
import { UserActionButtons } from "@/components/admin/usuarios/UserActionButtons";
import { UserRound } from "lucide-react";
import { EditUserModal } from "@/components/admin/usuarios/EditUserModal";
import { ExcluirUserModal } from "@/components/admin/usuarios/ExcluirUserModal";
import { Usuario } from "@/lib/types";

export function UsuariosClient() {
    
    const { usuarios, busca, usuarioEmEdicao } = useUsuarios()

    const usuariosFiltrados = usuarios.filter(usr => {
        if (!busca) return true
        const termo = busca.toLowerCase()
        return (
            usr.name.toLowerCase().includes(termo) ||
            usr.email.toLowerCase().includes(termo) ||
            usr.role.toLowerCase().includes(termo)
        )
    })

    return (
        <>
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4 font-semibold text-slate-700">Nome</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Usuário</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Função</th>
                        <th className="px-6 py-4 font-semibold text-slate-700 text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {usuariosFiltrados.length > 0 ? (
                        usuariosFiltrados.map((user: Usuario) => (
                            <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                                            <UserRound size={20} />
                                        </div>
                                        <span className="font-medium text-sm">{user.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600 font-medium text-sm">{user.user_name}</td>
                                <td className="px-6 py-4 text-slate-600 font-medium text-sm">{user.email}</td>
                                <td className="px-6 py-4 text-slate-600 font-medium text-sm">{user.role}</td>
                                <td className="px-6 py-4 text-right">
                                    <UserActionButtons id={user.id}/>
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
            <EditUserModal key={`edit-${usuarioEmEdicao?.id ?? 'novo'}`}/>
            <ExcluirUserModal key={`exclude-${usuarioEmEdicao?.id ?? 'novo'}`}/>
        </>
    )
}