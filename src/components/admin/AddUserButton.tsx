"use client";
import { useState } from "react";
import { Plus, Save } from "lucide-react";
import Modal from "@/components/Modal";

export function AddUserButton() {
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <button onClick={() => setOpenModal(true)} className="cursor-pointer bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm">
                <Plus size={18} /> Novo Usuário
            </button>

            <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} setTittle={"Novo Usuário"}>
                <form className="p-6 space-y-4 text-left">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Nome</label>
                        <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black-500 outline-none transition-all"/>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Email</label>
                        <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black-500 outline-none transition-all font-mono"/>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Função/Cargo</label>
                        <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black-500 outline-none transition-all font-mono"/>
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setOpenModal(false)} className="cursor-pointer px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancelar</button>
                        <button type="submit" className="cursor-pointer px-6 py-2 bg-slate-900 text-white hover:bg-emerald-600 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md">
                            <Save size={18}/> Salvar
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
}