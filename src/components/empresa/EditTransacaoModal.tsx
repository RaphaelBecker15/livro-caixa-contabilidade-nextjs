"use client";
import { Save } from "lucide-react";
import ModalTransaction from "@/components/ModalTransaction";
import { useTransacoes } from "@/contexts/empresa/ApiTransacoesContext";
import { useState } from "react";
import { Transacao } from "@/lib/types";

interface EditTransacaoModalProps {
    categorias: { id: string, name: string }[]
}

export function EditTransacaoModal({ categorias }: EditTransacaoModalProps) {

    const { transacaoEmEdicao, modalEditarAberto, fecharModais, salvarEdicao } = useTransacoes()

    const [loading, setLoading] = useState(false)
    const [form, setForm] = useState({
        date: transacaoEmEdicao?.date ?? "",
        description: transacaoEmEdicao?.description ?? "",
        amount: transacaoEmEdicao?.amount ?? 0,
        type: transacaoEmEdicao?.type ?? "income",
        categoryId: transacaoEmEdicao?.categoryId ?? ""
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!transacaoEmEdicao) return

        setLoading(true)
        await salvarEdicao({
            ...transacaoEmEdicao,
            ...form,
            amount: parseFloat(String(form.amount))
        })
        setLoading(false)
    }

    if (!transacaoEmEdicao) return null

    return (
        <ModalTransaction isOpen={modalEditarAberto} setModalOpen={fecharModais} setTittle="Editar Transação">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Data</label>
                    <input required type="date" value={form.date} onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))} className="cursor-pointer w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-black-500 outline-none"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                    <input required type="text" value={form.description} onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-black-500 outline-none"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Valor (R$)</label>
                    <input required type="number" value={form.amount} onChange={e => setForm(prev => ({ ...prev, amount: parseFloat(e.target.value) }))} step="0.01" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-black-500 outline-none"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
                    <select value={form.type} onChange={e => setForm(prev => ({ ...prev, type: e.target.value as Transacao['type'] }))} className="cursor-pointer w-full px-3 py-2 border border-slate-300 rounded-md outline-none">
                        <option value="income">Entrada</option>
                        <option value="expense">Saída</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
                    <select value={form.categoryId} onChange={e => setForm(prev => ({ ...prev, categoryId: e.target.value }))} className="cursor-pointer w-full px-3 py-2 border border-slate-300 rounded-md outline-none">
                        {categorias.map(cat => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                </div>
                <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                    <button type="button" onClick={fecharModais} className="cursor-pointer px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancelar</button>
                    <button type="submit" disabled={loading} className="cursor-pointer px-6 py-2 bg-slate-900 text-white hover:bg-emerald-600 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md">
                        <Save size={18}/> {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                </div>
            </form>
        </ModalTransaction>
    )
}