"use client";
import { useState } from "react";
import { Building2, Pencil, Trash2, ExternalLink, Plus, Search, Save } from "lucide-react";
import Modal from "@/components/Modal";

const Empresas: React.FC = () => {

    const [openModal, setOpenModal] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Gerenciar Empresas</h1>
                </div>
                <button onClick={() => setOpenModal(true)} className="cursor-pointer bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm">
                    <Plus size={18} /> Nova Empresa
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input type="text" placeholder="Buscar por nome ou CNPJ..." className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-black-500 outline-none"/>
                </div>
                <div className="text-sm text-slate-500 whitespace-nowrap">
                    Total: <span className="font-bold text-slate-900">1</span> empresa(s)
                </div>
            </div>

            {/*Tabela*/}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-700">Empresa</th>
                                <th className="px-6 py-4 font-semibold text-slate-700">CNPJ</th>
                                <th className="px-6 py-4 font-semibold text-slate-700 text-right">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            <tr className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-slate-100 rounded-lg text-slate-500">
                                            <Building2 size={20} />
                                        </div>
                                        <span className="font-medium text-sm">Empresa Tal</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-slate-600 font-medium text-sm">12993079-000190</td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        <button className="cursor-pointer p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver Livro Caixa">
                                            <ExternalLink size={18} />
                                        </button>
                                        <button className="cursor-pointer p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                                            <Pencil size={18} />
                                        </button>
                                        <button className="cursor-pointer p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Excluir">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                                    Nenhuma empresa encontrada com esses critérios.
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} setTittle={"Nova Empresa"}>
                <form className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Nome da Empresa</label>
                        <input required type="text" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-black-500 outline-none transition-all"/>
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">CNPJ</label>
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
        </div>
    )
}

export default Empresas;