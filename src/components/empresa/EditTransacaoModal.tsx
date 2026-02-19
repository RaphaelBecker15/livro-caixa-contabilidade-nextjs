"use client";
import { Save, UploadCloud } from "lucide-react";
import ModalTransaction from "@/components/ModalTransaction";
import { useTransacoes } from "@/contexts/empresa/ApiTransacoesContext";
import { useState } from "react";

export function EditTransacaoModal() {

    const { transacaoEmEdicao, modalEditarAberto, fecharModais, salvarEdicao } = useTransacoes();

    const [form, setForm] = useState({
        data: transacaoEmEdicao?.data ?? "",
        descricao: transacaoEmEdicao?.descricao ?? "",
        valor: transacaoEmEdicao?.valor ?? 0,
        tipo: transacaoEmEdicao?.tipo ?? "",
        categoria: transacaoEmEdicao?.categoria ?? "",
        anexo: transacaoEmEdicao?.anexo ?? ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if(!transacaoEmEdicao) return

        salvarEdicao({
            ...transacaoEmEdicao,
            ...form
        })
    }

    if(!transacaoEmEdicao) return null

    return (
        <ModalTransaction isOpen={modalEditarAberto} setModalOpen={fecharModais} setTittle="Editar Transação">
            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Data</label>
                    <input required type="date" value={form.data} onChange={e => setForm(prev => ({ ...prev, data: e.target.value }))} className="cursor-pointer w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-black-500 outline-none"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                    <input required type="text" value={form.descricao} onChange={e => setForm(prev => ({ ...prev, descricao: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-black-500 outline-none"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Valor (R$)</label>
                    <input required type="number" value={form.valor} onChange={e => setForm(prev => ({ ...prev, valor: parseFloat(e.target.value) }))} step="0.01" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-black-500 outline-none"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
                    <select className="cursor-pointer w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-black-500 outline-none">
                        <option value="entrada">Entrada</option>
                        <option value="saida">Saída</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Categoria</label>
                    <input required type="text" value={form.categoria} onChange={e => setForm(prev => ({ ...prev, categoria: e.target.value }))} className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-black-500 outline-none"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Recibo/Nota (Opcional)</label>
                    <div className="border-2 border-dashed border-slate-300 rounded-md p-2 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors">
                        <UploadCloud size={20} className="mr-2"/>
                        <span className="text-sm">Click to upload</span>
                    </div>
                </div>
                <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                    <button type="button" onClick={fecharModais} className="cursor-pointer px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancelar</button>
                    <button type="submit" className="cursor-pointer px-6 py-2 bg-slate-900 text-white hover:bg-emerald-600 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md">
                        <Save size={18}/> Salvar
                    </button>
                </div>
            </form>
        </ModalTransaction>
    )
}