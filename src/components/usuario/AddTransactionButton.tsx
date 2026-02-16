"use client";
import { useState } from "react";
import { Plus, Save, UploadCloud } from "lucide-react";
import ModalTransaction from "@/components/ModalTransaction";

export function AddTransactionButton() {
    const [openModal, setOpenModal] = useState(false);
    const data = new Date().toISOString().split('T')[0];

    return (
        <>
            <button onClick={() => setOpenModal(true)} className="cursor-pointer bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm shadow-emerald-200">
                <Plus size={18} /> Nova Transação
            </button>

            <ModalTransaction isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} setTittle="Nova Transação">
                <form className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Data</label>
                        <input required type="date" defaultValue={data} className="cursor-pointer w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-black-500 outline-none"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Descrição</label>
                        <input required type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-black-500 outline-none"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Valor (R$)</label>
                        <input required type="number" step="0.01" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-black-500 outline-none"/>
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
                        <input required placeholder="" type="text" className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-black-500 outline-none"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Recibo/Nota (Opcional)</label>
                        <div className="border-2 border-dashed border-slate-300 rounded-md p-2 flex items-center justify-center text-slate-400 cursor-pointer hover:bg-slate-50 transition-colors">
                            <UploadCloud size={20} className="mr-2"/>
                            <span className="text-sm">Click to upload</span>
                        </div>
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-2 mt-2">
                        <button type="button" onClick={() => setOpenModal(false)} className="cursor-pointer px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancelar</button>
                        <button type="submit" className="cursor-pointer px-6 py-2 bg-slate-900 text-white hover:bg-emerald-600 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md">
                            <Save size={18}/> Salvar
                        </button>
                    </div>
                </form>
            </ModalTransaction>
        </>
    );
}