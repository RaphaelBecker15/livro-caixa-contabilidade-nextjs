import { EmpresaFilter } from "@/components/admin/empresas/EmpresaFilter";
import { AddCompanyButton } from "@/components/admin/empresas/AddCompanyButton";
import { EmpresasClient } from "@/app/admin/EmpresasClient";

export default async function Empresas() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Gerenciar Empresas</h1>
                </div>
                <AddCompanyButton/>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <EmpresaFilter/>
            </div>

            {/*Tabela*/}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <EmpresasClient/>
                </div>
            </div>
        </div>
    )
}