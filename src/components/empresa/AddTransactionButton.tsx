"use client";
import { useState } from "react";
import { Plus, Save, UploadCloud } from "lucide-react";
import ModalTransaction from "@/components/ModalTransaction";
import { createClient } from "@/lib/supabase/client";
import { useTransacoes } from "@/contexts/empresa/ApiTransacoesContext";
import { Categoria } from "@/lib/types";
import { toast } from "react-toastify";

interface AddTransactionButtonProps {
    companyId: string
    workspaceId: string
    userId: string
    categorias: Categoria[]
}

export function AddTransactionButton({ companyId, workspaceId, userId, categorias }: AddTransactionButtonProps) {
    const supabase = createClient()
    const { adicionarTransacao } = useTransacoes()

    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(false)
    const hoje = new Date()
    const dataHoje = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}-${String(hoje.getDate()).padStart(2, '0')}`

    const [form, setForm] = useState({
        date: dataHoje,
        description: '',
        amount: '',
        type: 'income',
        categoryId: categorias[0]?.id ?? ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const { data: transacao, error } = await supabase
                .from('Transaction')
                .insert({
                    date: form.date,
                    description: form.description,
                    amount: parseFloat(form.amount),
                    type: form.type,
                    categoryId: form.categoryId,
                    companyId,
                    workspaceId,
                    userId
                })
                .select()
                .single()

            if (error) throw error

            adicionarTransacao(transacao)
            toast.success('Transação criada com sucesso!')
            setOpenModal(false)
            setForm({ date: dataHoje, description: '', amount: '', type: 'income', categoryId: categorias[0]?.id ?? '' })
        } catch {
            toast.error('Erro ao criar transação. Tente novamente.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <button onClick={() => setOpenModal(true)} className="cursor-pointer bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm shadow-emerald-200">
                <Plus size={18} /> Nova Transação
            </button>

            <ModalTransaction isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} setTittle="Nova Transação">
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
                        <input required type="number" step="0.01" value={form.amount} onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-black-500 outline-none"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
                        <select value={form.type} onChange={e => setForm(prev => ({ ...prev, type: e.target.value }))} className="cursor-pointer w-full px-3 py-2 border border-slate-300 rounded-md outline-none">
                            <option value="income">Entrada</option>
                            <option value="expense">Saída</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
                        <select value={form.categoryId} onChange={e => setForm(prev => ({ ...prev, categoryId: e.target.value }))} className="cursor-pointer w-full px-3 py-2 border border-slate-300 rounded-md outline-none">
                            {categorias.length > 0 ? (
                                categorias.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))
                            ) : (
                                <option disabled>Nenhuma categoria cadastrada</option>
                            )}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Recibo/Nota (Opcional)</label>
                        <div className="border-2 border-dashed border-slate-300 rounded-md p-2 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors">
                            <UploadCloud size={20} className="mr-2"/>
                            <span className="text-sm">Clique para upload</span>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                        <button type="button" onClick={() => setOpenModal(false)} className="cursor-pointer px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancelar</button>
                        <button type="submit" disabled={loading} className="cursor-pointer px-6 py-2 bg-slate-900 text-white hover:bg-emerald-600 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md">
                            <Save size={18}/> {loading ? 'Salvando...' : 'Salvar'}
                        </button>
                    </div>
                </form>
            </ModalTransaction>
        </>
    );
}