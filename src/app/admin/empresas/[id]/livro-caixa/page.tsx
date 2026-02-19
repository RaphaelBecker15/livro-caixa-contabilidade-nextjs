import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { transacoes, empresas } from "@/lib/mock-data";
import { LivroCaixaClient } from "@/app/admin/LivroCaixaClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function LivroCaixa({ params }: PageProps) {

    const { id } = await params

    const transactions = transacoes.filter(tx => tx.empresaId === id)

    const companies = empresas.find(c => c.id === id)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href={"/admin/empresas"}>
                        <div className="p-2 hover:bg-slate-200 rounded-full transition-colors cursor-pointer">
                            <ArrowLeft size={20} className="text-slate-600" />
                        </div>
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">{companies?.nome}</h1>
                        <p className="text-sm text-slate-500">CNPJ: {companies?.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")}</p>
                    </div>
                </div>
            </div>

            <LivroCaixaClient transactions={transactions}/>
            
        </div>
    )
}