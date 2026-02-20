"use client";
import { useTransacoes } from "@/contexts/empresa/ApiTransacoesContext";
import { TransactionActionButtons } from "@/components/empresa/TransactionActionButtons";
import { EditTransacaoModal } from "@/components/empresa/EditTransacaoModal";
import { ExcluirTransacaoModal } from "@/components/empresa/ExcluirTransacaoModal";
import { Transacao } from "@/lib/types";

export function TransacoesClient({ categorias }: { categorias: { id: string, name: string }[] }) {

    const { transacoes, transacaoEmEdicao, mesSelecionado, setMesSelecionado } = useTransacoes()

    const transacoesFiltradas = transacoes.filter(tx =>
        tx.date.startsWith(mesSelecionado)
    )

    return (
        <>
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
                            <th className="px-6 py-4 font-semibold text-slate-700">Tipo</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Valor</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {transacoesFiltradas.length > 0 ? (
                            transacoesFiltradas.map((tx: Transacao) => (
                                <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-sm">{new Date(tx.date + 'T00:00:00').toLocaleDateString('pt-BR')}</td>
                                    <td className="px-6 py-4 font-medium text-sm">{tx.description}</td>
                                    <td className={`px-6 py-4 font-medium ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {tx.type === 'income' ? 'Entrada' : 'Saída'}
                                    </td>
                                    <td className={`px-6 py-4 text-right font-bold ${tx.type === 'income' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {Number(tx.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <TransactionActionButtons id={tx.id} />
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
            <EditTransacaoModal key={`edit-${transacaoEmEdicao?.id ?? 'novo'}`} categorias={categorias}/>
            <ExcluirTransacaoModal key={`exclude-${transacaoEmEdicao?.id ?? 'novo'}`}/>
        </>
    )
}