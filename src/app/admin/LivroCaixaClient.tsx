"use client";
import { TrendingUp, TrendingDown, Wallet, type LucideIcon } from "lucide-react";
import { useState } from "react";

interface StatCardProps {
    label: string,
    value: string,
    icon: LucideIcon,
    colorClass: string
}

interface TransacoesProps {
    id: string
    valor: number
    tipo: string
    descricao: string
    data: string
    categoria: string
    anexo: string
    empresaId: string
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

export function LivroCaixaClient({ transactions }: { transactions: TransacoesProps[] }) {

    const [mesSelecionado, setMesSelecionado] = useState(() => {
        const hoje = new Date()
        return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`
    })

    const transacoesFiltradas = transactions.filter(tx => tx.data.startsWith(mesSelecionado))

    const totalEntradas = transacoesFiltradas
        .filter(tx => tx.tipo === 'entrada')
        .reduce((acc, tx) => acc + tx.valor, 0)

    const totalSaidas = transacoesFiltradas
        .filter(tx => tx.tipo === 'saida')
        .reduce((acc, tx) => acc + tx.valor, 0)

    const balance = totalEntradas - totalSaidas

    return (
        <>
            {/* Stats Cards (Specific to this company) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard label="Saldo Atual" value={balance.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={Wallet} colorClass="text-blue-600 bg-blue-50" />
                <StatCard label="Entradas" value={totalEntradas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={TrendingUp} colorClass="text-emerald-600 bg-emerald-50" />
                <StatCard label="Saídas" value={totalSaidas.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })} icon={TrendingDown} colorClass="text-rose-600 bg-rose-50" />
            </div>

            {/* Transactions Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-800">Lançamentos</h3>
                    <input type="month" value={mesSelecionado} onChange={e => setMesSelecionado(e.target.value)} className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"></input>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Data</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Descrição</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Categoria</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Tipo</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {transacoesFiltradas.length > 0 ? (
                                transacoesFiltradas.map((tx: TransacoesProps) => (
                                    <tr key={tx.id} className='hover:bg-slate-50/50 transition-colors group'>
                                        <td className='px-6 py-4 font-medium text-sm'>{new Date(tx.data + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                                        <td className='px-6 py-4 font-medium text-sm'>{tx.descricao}</td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">{tx.categoria || 'Sem categoria'}</span>
                                        </td>
                                        <td className={`px-6 py-4 font-medium ${tx.tipo === 'entrada' ? 'text-emerald-600' : 'text-rose-600'}`}>{tx.tipo === 'entrada' ? 'Entrada' : 'Saída'}</td>
                                        <td className={`px-6 py-4 text-right font-bold ${tx.tipo === 'entrada' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {tx.valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                                        Nenhum lançamento encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}