import { TrendingUp, TrendingDown, Wallet, type LucideIcon } from "lucide-react";
import { AddTransactionButton } from "@/components/usuario/AddTransactionButton";
import { TransacoesClient } from "@/app/usuario/TransacoesClient";

interface StatCardProps {
    label: string,
    value: string,
    icon: LucideIcon,
    colorClass: string
}

const StatCard = ({ label, value, icon: Icon, colorClass }: StatCardProps) => (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-1">{label}</p>
        <p className={`text-2xl font-bold ${colorClass.split(' ')[0]}`}>{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
        <Icon size={24} className={colorClass.replace('bg-', 'text-').split(' ')[0]} />
      </div>
    </div>
);

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
                <AddTransactionButton/>
            </div>

            {/* Stats Cards (Specific to this company) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard label="Saldo Atual" value={'0,00'} icon={Wallet} colorClass="text-blue-600 bg-blue-50" />
                <StatCard label="Entradas" value={'0,00'} icon={TrendingUp} colorClass="text-emerald-600 bg-emerald-50" />
                <StatCard label="Saídas" value={'0,00'} icon={TrendingDown} colorClass="text-rose-600 bg-rose-50" />
            </div>

            {/* Transactions Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <TransacoesClient/>
            </div>
        </div>
    )
}