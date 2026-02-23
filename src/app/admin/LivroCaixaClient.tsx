"use client";
import { TrendingUp, TrendingDown, Wallet, type LucideIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { Transacao } from "@/lib/types";
import { Paperclip } from "lucide-react";
import { AttachmentsModal } from "@/components/empresa/AttachmentsModal";
import { RelatorioButton } from "@/components/RelatorioButton";

interface StatCardProps {
    label: string
    value: string
    icon: LucideIcon
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

export function LivroCaixaClient({ transactions, nomeEmpresa }: { transactions: Transacao[], nomeEmpresa: string }) {

    const [mesSelecionado, setMesSelecionado] = useState(() => {
        const hoje = new Date()
        return `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`
    })

    const [pagina, setPagina] = useState(1)
    const itensPorPagina = 10

    const [tipoFiltro, setTipoFiltro] = useState<'all' | 'income' | 'expense'>('all')
    const [anexoAberto, setAnexoAberto] = useState<{ attachments: string[], descricao: string } | null>(null)

    const transacoesFiltradas = transactions.filter(tx => {
        const pertenceMes = tx.date.startsWith(mesSelecionado)
        const pertenceTipo = tipoFiltro === 'all' || tx.type === tipoFiltro
        return pertenceMes && pertenceTipo
    })

    const saldoAcumulado = transactions.filter(tx => {
        const mesTx = tx.date.substring(0, 7)
        return mesTx <= mesSelecionado
    })

    const totalEntradasAcumulado = saldoAcumulado
        .filter(tx => tx.type === 'income')
        .reduce((acc, tx) => acc + Number(tx.amount), 0)

    const totalSaidasAcumulado = saldoAcumulado
        .filter(tx => tx.type === 'expense')
        .reduce((acc, tx) => acc + Number(tx.amount), 0)

    const balance = totalEntradasAcumulado - totalSaidasAcumulado

    const totalEntradas = transacoesFiltradas
        .filter(tx => tx.type === 'income')
        .reduce((acc, tx) => acc + Number(tx.amount), 0)

    const totalSaidas = transacoesFiltradas
        .filter(tx => tx.type === 'expense')
        .reduce((acc, tx) => acc + Number(tx.amount), 0)
    

    const totalPaginas = Math.ceil(transacoesFiltradas.length / itensPorPagina)
    const transacoesPaginadas = transacoesFiltradas.slice(
        (pagina - 1) * itensPorPagina,
        pagina * itensPorPagina
    )

    useEffect(() => {
        setPagina(1)
    }, [mesSelecionado, tipoFiltro])

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
                    <div className="flex items-center gap-4">
                        <h3 className="font-semibold text-slate-800">Lançamentos</h3>
                        <RelatorioButton
                            transacoes={transactions}
                            transacoesFiltradas={transacoesFiltradas}
                            mesSelecionado={mesSelecionado}
                            nomeEmpresa={nomeEmpresa}
                        />
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex rounded-lg border border-gray-200 overflow-hidden text-sm font-semibold">
                            <button onClick={() => setTipoFiltro('all')} className={`cursor-pointer px-3 py-2 transition-colors ${tipoFiltro === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>
                                Todos
                            </button>
                            <button onClick={() => setTipoFiltro('income')} className={`cursor-pointer px-3 py-2 transition-colors ${tipoFiltro === 'income' ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>
                                Entradas
                            </button>
                            <button onClick={() => setTipoFiltro('expense')} className={`cursor-pointer px-3 py-2 transition-colors ${tipoFiltro === 'expense' ? 'bg-rose-600 text-white' : 'bg-white text-slate-600 hover:bg-slate-50'}`}>
                                Saídas
                            </button>
                        </div>
                        <input type="month" value={mesSelecionado} onChange={e => setMesSelecionado(e.target.value)} className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm outline-none transition-all" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Data</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Descrição</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Tipo</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {transacoesPaginadas.length > 0 ? (
                                transacoesPaginadas.map(tx => (
                                    <tr key={tx.id} className='hover:bg-slate-50/50 transition-colors group'>
                                        <td className='px-6 py-4 font-medium text-sm'>{new Date(tx.date + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                                        <td className='px-6 py-4 font-medium text-sm flex items-center gap-2'>
                                            {tx.attachments?.length > 0 && (
                                                <button
                                                    onClick={() => setAnexoAberto({ attachments: tx.attachments, descricao: tx.description })}
                                                    className="cursor-pointer text-slate-400 hover:text-blue-600 transition-colors"
                                                    title="Ver anexos"
                                                >
                                                    <Paperclip size={14} />
                                                </button>
                                            )}
                                            <span>{tx.description}</span>
                                        </td>
                                        <td className={`px-6 py-4 font-medium ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {tx.type === 'income' ? 'Entrada' : 'Saída'}
                                        </td>
                                        <td className={`px-6 py-4 font-bold ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                            {Number(tx.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                                        Nenhum lançamento encontrado.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                {totalPaginas > 1 && (
                    <div className="px-6 py-4 border-t border-slate-200 flex items-center justify-between text-sm">
                        <span className="text-slate-500">
                            Mostrando {((pagina - 1) * itensPorPagina) + 1} a {Math.min(pagina * itensPorPagina, transacoesFiltradas.length)} de {transacoesFiltradas.length} lançamentos
                        </span>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setPagina(prev => Math.max(prev - 1, 1))}
                                disabled={pagina === 1}
                                className="cursor-pointer px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Anterior
                            </button>
                            <span className="font-medium text-slate-700">{pagina} / {totalPaginas}</span>
                            <button
                                onClick={() => setPagina(prev => Math.min(prev + 1, totalPaginas))}
                                disabled={pagina === totalPaginas}
                                className="cursor-pointer px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                            >
                                Próxima
                            </button>
                        </div>
                    </div>
                )}
            </div>
            {anexoAberto && (
                <AttachmentsModal
                    isOpen={!!anexoAberto}
                    onClose={() => setAnexoAberto(null)}
                    attachments={anexoAberto.attachments}
                    descricao={anexoAberto.descricao}
                />
            )}
        </>
    )
}