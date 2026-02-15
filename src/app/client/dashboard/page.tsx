"use client";
import { useState } from "react";
import { TrendingUp, TrendingDown, Pencil, Trash2, Wallet, Plus, UploadCloud, Save, type LucideIcon } from "lucide-react";
import ModalTransaction from "@/components/ModalTransaction";

interface StatCardProps {
    label: string,
    value: string,
    icon: LucideIcon,
    colorClass: string
}

const StatCard = ({ label, value, icon: Icon, colorClass }: StatCardProps) => (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
      <div>
        <p className="text-slate-500 text-xs font-semibold uppercase tracking-wide mb-1">{label}</p>
        <p className={`text-2xl font-bold ${colorClass.split(' ')[0]}`}>{value}</p>
      </div>
      <div className={`p-3 rounded-lg ${colorClass} bg-opacity-10`}>
        <Icon size={24} className={colorClass.replace('bg-', 'text-').split(' ')[0]} />
      </div>
    </div>
);

const Dashboard: React.FC = () => {

    const [openModal, setOpenModal] = useState(false);
    const data = new Date().toISOString().split('T')[0];
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Meu Livro Caixa</h1>
                    </div>
                </div>
                <button onClick={() => setOpenModal(true)} className="cursor-pointer bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition-colors flex items-center gap-2 shadow-sm shadow-emerald-200">
                    <Plus size={18} /> Nova Transação
                </button>
            </div>

            {/* Stats Cards (Specific to this company) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard label="Saldo Atual" value={'0,00'} icon={Wallet} colorClass="text-blue-600 bg-blue-50" />
                <StatCard label="Entradas" value={'0,00'} icon={TrendingUp} colorClass="text-emerald-600 bg-emerald-50" />
                <StatCard label="Saídas" value={'0,00'} icon={TrendingDown} colorClass="text-rose-600 bg-rose-50" />
            </div>

            <ModalTransaction isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} setTittle={"Nova Transação"}>
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

            {/* Transactions Table */}
            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/50 flex justify-between items-center">
                    <h3 className="font-semibold text-slate-800">Lançamentos</h3>
                    <span className="text-xs text-slate-500">Mostrando últimos lançamentos</span>
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
                        <tr className='hover:bg-slate-50/50 transition-colors group'>
                            <td className='px-6 py-4 font-medium text-sm'>12/02/2026</td>
                            <td className='px-6 py-4 font-medium text-sm'>Descrição...</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">Categoria...</span>
                            </td>
                            <td className='px-6 py-4 font-medium text-emerald-600'>Entrada</td>
                            <td className='px-6 py-4 text-right font-bold text-emerald-600'>
                                0,00
                            </td>
                            <td className="px-6 py-4 text-right">
                                <div className="flex items-center justify-end gap-2">
                                    <button className="cursor-pointer p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
                                        <Pencil size={16} />
                                    </button>
                                    <button className="cursor-pointer p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Delete">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                                Nenhum lançamento encontrado.
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;