import { createClient } from "@/lib/supabase/server";
import { TransacoesProvider } from "@/contexts/empresa/ApiTransacoesContext";
import { AddTransactionButton } from "@/components/empresa/AddTransactionButton";
import { TransacoesClient } from "@/app/empresa/TransacoesClient";
import { StatsCards } from "@/components/empresa/StatsCards";
import { RelatorioButtonWrapper } from "@/components/empresa/RelatorioButtonWrapper";

export default async function Dashboard() {

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const companyId = user?.app_metadata?.companyId
    const workspaceId = user?.app_metadata?.workspaceId

    const { data: empresa } = await supabase
        .from('Company')
        .select('name')
        .eq('id', companyId)
        .single()

    const { data: transacoes } = await supabase
        .from('Transaction')
        .select('*')
        .eq('companyId', companyId)
        .is('deletedAt', null)
        .order('date', { ascending: false })

    return (
        <TransacoesProvider initialData={transacoes ?? []}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <h1 className="text-2xl font-bold text-slate-900">Meu Livro Caixa</h1>
                    <div className="flex flex-row-reverse justify-end md:justify-center items-center md:flex-row gap-3">
                        <RelatorioButtonWrapper nomeEmpresa={empresa?.name ?? ''} />
                        <AddTransactionButton companyId={companyId} workspaceId={workspaceId} userId={user!.id}/>
                    </div>
                </div>

                {/* Stats Cards (Specific to this company) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatsCards/>
                </div>

                {/* Transactions Table */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <TransacoesClient/>
                </div>
            </div>
        </TransacoesProvider>
    )
}