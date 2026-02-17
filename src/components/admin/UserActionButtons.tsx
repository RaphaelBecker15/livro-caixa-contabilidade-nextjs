"use client";
import { useState } from "react";
import { Pencil, Trash2, Save } from "lucide-react";
import Modal from "@/components/Modal";

interface UserActionButtonsProps {
    userId: string;
}

export function UserActionButtons({ userId }: UserActionButtonsProps) {

    const [openModalEdit, setOpenModalEdit] = useState(false);

    const [openModalExc, setOpenModalExc] = useState(false);

    return (
        <>
            <div className="flex items-center justify-end gap-2">
                <button onClick={() => setOpenModalEdit(true)} className="cursor-pointer p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                    <Pencil size={18} />
                </button>
                <button onClick={() => setOpenModalExc(true)} className="cursor-pointer p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Excluir">
                    <Trash2 size={18} />
                </button>
            </div>
            <Modal isOpen={openModalEdit} setModalOpen={() => setOpenModalEdit(!openModalEdit)} setTittle="Editar Usuário" >
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
                        <button type="button" onClick={() => setOpenModalEdit(false)} className="cursor-pointer px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancelar</button>
                        <button type="submit" className="cursor-pointer px-6 py-2 bg-slate-900 text-white hover:bg-emerald-600 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md">
                            <Save size={18}/> Salvar
                        </button>
                    </div>
                </form>
            </Modal>

            <Modal isOpen={openModalExc} setModalOpen={() => setOpenModalExc(!openModalExc)} setTittle="Excluir Usuário" >
                <form className="p-6 space-y-4 text-left">
                    <h1 className="text-base text-slate-800">Tem certeza que quer excluir o usuario tal?</h1>
                    <div className="pt-4 flex justify-end gap-3">
                        <button type="button" onClick={() => setOpenModalExc(false)} className="cursor-pointer px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancelar</button>
                        <button type='submit' className='cursor-pointer px-6 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md'>Sim</button>
                    </div>
                </form>
            </Modal>
        </>
    );
}