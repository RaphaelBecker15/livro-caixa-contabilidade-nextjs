import { TrendingUp, TrendingDown, Wallet, ArrowLeft } from "lucide-react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const StatCard = ({ label, value, icon: Icon, colorClass }: any) => (
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

const LivroCaixa: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="p-2 hover:bg-slate-200 rounded-full transition-colors cursor-pointer">
                        <ArrowLeft size={20} className="text-slate-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Tech Solutions Ltda</h1>
                        <p className="text-sm text-slate-500">CNPJ: 12.345.678/0001-90</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards (Specific to this company) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard label="Saldo Atual" value={'0,00'} icon={Wallet} colorClass="text-blue-600 bg-blue-50" />
                <StatCard label="Entradas" value={'0,00'} icon={TrendingUp} colorClass="text-emerald-600 bg-emerald-50" />
                <StatCard label="Saídas" value={'0,00'} icon={TrendingDown} colorClass="text-rose-600 bg-rose-50" />
            </div>

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
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        <tr className='hover:bg-slate-50/50 transition-colors group'>
                            <td className='px-6 py-4 whitespace-nowrap text-slate-600'>12/02/2026</td>
                            <td className='px-6 py-4 font-medium text-slate-900'>Descrição...</td>
                            <td className="px-6 py-4">
                                <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">Categoria...</span>
                            </td>
                            <td className='px-6 py-4 font-medium text-emerald-600'>Entrada</td>
                            <td className='px-6 py-4 text-right font-bold text-emerald-600'>
                                0,00
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

export default LivroCaixa;