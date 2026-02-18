"use client";
import { Save } from "lucide-react";
import Modal from "@/components/Modal";
import { useUsuarios } from "@/contexts/admin/ApiUsuariosContext";
import { useState } from "react";

export function EditUserModal() {

    const { usuarioEmEdicao, modalEditarAberto, fecharModais, salvarEdicao } = useUsuarios();

    const [form, setForm] = useState({
        nome: usuarioEmEdicao?.nome ?? "",
        email: usuarioEmEdicao?.email ?? "",
        cargo: usuarioEmEdicao?.cargo ?? ""
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if(!usuarioEmEdicao) return

        salvarEdicao({
            ...usuarioEmEdicao,
            ...form
        })
    }

    if(!usuarioEmEdicao) return null

    return (
        <Modal isOpen={modalEditarAberto} setModalOpen={fecharModais} setTittle="Editar Usuário" >
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Nome</label>
                    <input required type="text" value={form.nome} onChange={e => setForm(prev => ({ ...prev, nome: e.target.value }))} className="text-slate-600 font-medium w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black-500 outline-none transition-all"/>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                    <input required type="text" value={form.email} onChange={e => setForm(prev => ({ ...prev, email: e.target.value }))} className="text-slate-600 font-medium w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black-500 outline-none transition-all"/>
                </div>
                <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-1">Função/Cargo</label>
                    <input required type="text" value={form.cargo} onChange={e => setForm(prev => ({ ...prev, cargo: e.target.value }))} className="text-slate-600 font-medium w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black-500 outline-none transition-all"/>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={fecharModais} className="cursor-pointer px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancelar</button>
                    <button type="submit" className="cursor-pointer px-6 py-2 bg-slate-900 text-white hover:bg-emerald-600 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md">
                        <Save size={18}/> Salvar
                    </button>
                </div>
            </form>
        </Modal>
    )
}