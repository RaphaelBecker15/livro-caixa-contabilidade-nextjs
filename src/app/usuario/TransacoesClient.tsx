"use client";
import { useTransacoes } from "@/contexts/usuario/ApiTransacoesContext";
import { TransactionActionButtons } from "@/components/usuario/TransactionActionButtons";
import { EditTransacaoModal } from "@/components/usuario/EditTransacaoModal";
import { ExcluirTransacaoModal } from "@/components/usuario/ExcluirTransacaoModal";

export function TransacoesClient() {
    const { transacoes, transacaoEmEdicao } = useTransacoes()

    return (
        <>
            <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                <h3 className="font-semibold text-slate-800">Lançamentos</h3>
                <input className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all" type="month" value="2026-02"></input>
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
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {transacoes.length > 0 ? (
                            transacoes.map((tx: any) => (
                                <tr key={tx.id} className='hover:bg-slate-50/50 transition-colors group'>
                                    <td className='px-6 py-4 font-medium text-sm'>{new Date(tx.date).toLocaleDateString('pt-BR')}</td>
                                    <td className='px-6 py-4 font-medium text-sm'>{tx.description}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">{tx.category?.name || 'Sem categoria'}</span>
                                    </td>
                                    <td className={`px-6 py-4 font-medium ${tx.type === 'entrada' ? 'text-emerald-600' : 'text-rose-600'}`}>{tx.type}</td>
                                    <td className={`px-6 py-4 text-right font-bold ${tx.type === 'entrada' ? 'text-emerald-600' : 'text-rose-600'}`}>
                                        {parseFloat(tx.amount).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <TransactionActionButtons transactionId={tx.id} />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                                    Nenhum lançamento encontrado.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
            <EditTransacaoModal key={`edit-${transacaoEmEdicao?.id ?? 'novo'}`}/>
            <ExcluirTransacaoModal key={`exclude-${transacaoEmEdicao?.id ?? 'novo'}`}/>
        </>
    )
}