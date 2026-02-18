import { AddTransactionButton } from "@/components/usuario/AddTransactionButton";
import { TransacoesClient } from "@/app/usuario/TransacoesClient";
import { StatsCards } from "@/components/usuario/StatsCards";

const empresaLogada = '1'

export default function Dashboard() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Meu Livro Caixa</h1>
                    </div>
                </div>
                <AddTransactionButton EmpresaLogada={empresaLogada}/>
            </div>

            {/* Stats Cards (Specific to this company) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatsCards EmpresaLogada={empresaLogada}/>
            </div>

            {/* Transactions Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <TransacoesClient EmpresaLogada={empresaLogada}/>
            </div>
        </div>
    )
}