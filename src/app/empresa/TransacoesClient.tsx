"use client";
import { useTransacoes } from "@/contexts/empresa/ApiTransacoesContext";
import { TransactionActionButtons } from "@/components/empresa/TransactionActionButtons";
import { EditTransacaoModal } from "@/components/empresa/EditTransacaoModal";
import { ExcluirTransacaoModal } from "@/components/empresa/ExcluirTransacaoModal";

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

export function TransacoesClient({ EmpresaLogada }: { EmpresaLogada: string }) {

    const { transacoes, transacaoEmEdicao, mesSelecionado, setMesSelecionado } = useTransacoes()

    const transacoesFiltradas = transacoes.filter((e) => {
        const pertenceEmpresa =  e.empresaId == EmpresaLogada
        const pertenceMes = e.data.startsWith(mesSelecionado)
        return pertenceEmpresa && pertenceMes
    })

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
                            <th className="px-6 py-4 font-semibold text-slate-700">Categoria</th>
                            <th className="px-6 py-4 font-semibold text-slate-700">Tipo</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Valor</th>
                            <th className="px-6 py-4 font-semibold text-slate-700 text-right">Ação</th>
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
                                    <td className="px-6 py-4 text-right">
                                        <TransactionActionButtons id={tx.id} />
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