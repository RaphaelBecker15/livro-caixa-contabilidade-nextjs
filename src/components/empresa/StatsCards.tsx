"use client";
import { useTransacoes } from "@/contexts/empresa/ApiTransacoesContext";
import { TrendingUp, TrendingDown, Wallet, type LucideIcon } from "lucide-react";

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

export function StatsCards() {

    const { transacoes, mesSelecionado } = useTransacoes()

    const filtro = transacoes.filter(tx => tx.date.startsWith(mesSelecionado))

    const totalEntradas = filtro
        .filter(tx => tx.type === 'income')
        .reduce((acc, tx) => acc + Number(tx.amount), 0)

    const totalSaidas = filtro
        .filter(tx => tx.type === 'expense')
        .reduce((acc, tx) => acc + Number(tx.amount), 0)

    const balance = totalEntradas - totalSaidas

    return (
        <>
            <StatCard label="Saldo Atual" value={balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={Wallet} colorClass="text-blue-600 bg-blue-50" />
            <StatCard label="Entradas" value={totalEntradas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={TrendingUp} colorClass="text-emerald-600 bg-emerald-50" />
            <StatCard label="Saídas" value={totalSaidas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={TrendingDown} colorClass="text-rose-600 bg-rose-50" />
        </>
    )
}