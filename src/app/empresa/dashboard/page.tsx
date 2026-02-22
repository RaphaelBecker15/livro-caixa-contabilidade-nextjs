import { createClient } from "@/lib/supabase/server";
import { TransacoesProvider } from "@/contexts/empresa/ApiTransacoesContext";
import { AddTransactionButton } from "@/components/empresa/AddTransactionButton";
import { TransacoesClient } from "@/app/empresa/TransacoesClient";
import { StatsCards } from "@/components/empresa/StatsCards";

export default async function Dashboard() {

    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    const companyId = user?.user_metadata?.companyId
    const workspaceId = user?.user_metadata?.workspaceId

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

    const { data: categorias } = await supabase
        .from('Category')
        .select('*')
        .eq('workspaceId', workspaceId)
        .eq('active', true)

    return (
        <TransacoesProvider initialData={transacoes ?? []}>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">Meu Livro Caixa</h1>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <AddTransactionButton companyId={companyId} workspaceId={workspaceId} userId={user!.id} categorias={categorias ?? []}/>
                    </div>
                </div>

                {/* Stats Cards (Specific to this company) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <StatsCards/>
                </div>

                {/* Transactions Table */}
                <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                    <TransacoesClient categorias={categorias ?? []} nomeEmpresa={empresa?.name ?? ''}/>
                </div>
            </div>
        </TransacoesProvider>
    )
}