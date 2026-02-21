"use client";
import { useEmpresas } from "@/contexts/admin/ApiEmpresasContext";
import { CompanyActionButtons } from "@/components/admin/empresas/CompanyActionButtons";
import { Building2 } from "lucide-react";
import { EditEmpresaModal } from "@/components/admin/empresas/EditEmpresaModal";
import { ExcluirEmpresaModal } from "@/components/admin/empresas/ExcluirEmpresaModal";
import { Empresa } from "@/lib/types";

export function EmpresasClient() {
    
    const { empresas, empresaEmEdicao } = useEmpresas()

    return (
        <>
            <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                        <th className="px-6 py-4 font-semibold text-slate-700">Empresa</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">CNPJ</th>
                        <th className="px-6 py-4 font-semibold text-slate-700">Email</th>
                        <th className="px-6 py-4 font-semibold text-slate-700 text-right">Ações</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {empresas.length > 0 ? (
                        empresas.map((empresa: Empresa) => (
                            <tr key={empresa.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                                            <Building2 size={20} />
                                        </div>
                                        <span className="font-medium text-sm">{empresa.name}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600 font-medium text-sm">{empresa.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")}</td>
                                <td className="px-6 py-4 text-slate-600 font-medium text-sm">{empresa.email}</td>
                                <td className="px-6 py-4 text-right">
                                    <CompanyActionButtons id={empresa.id}/>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={3} className="px-6 py-12 text-center text-slate-400">
                                Nenhuma empresa encontrada com esses critérios.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            <EditEmpresaModal key={`edit-${empresaEmEdicao?.id ?? 'novo'}`}/>
            <ExcluirEmpresaModal key={`exclude-${empresaEmEdicao?.id ?? 'novo'}`}/>
        </>
    )
}