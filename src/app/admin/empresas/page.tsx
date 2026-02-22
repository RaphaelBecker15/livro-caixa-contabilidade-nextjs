import { createClient } from "@/lib/supabase/server"
import { EmpresasProvider } from "@/contexts/admin/ApiEmpresasContext";
import { AddCompanyButton } from "@/components/admin/empresas/AddCompanyButton";
import { EmpresasClient } from "@/app/admin/EmpresasClient";
import { EmpresaFilter } from "@/components/admin/empresas/EmpresaFilter";

export default async function Empresas() {

    const supabase = await createClient()

    const { data: empresas } = await supabase
        .from('Company')
        .select('*')
        .is('deletedAt', null)
        .order('createdAt', { ascending: false })
    
    return (
        <EmpresasProvider initialData={empresas ?? []}>
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
        </EmpresasProvider>
    )
}