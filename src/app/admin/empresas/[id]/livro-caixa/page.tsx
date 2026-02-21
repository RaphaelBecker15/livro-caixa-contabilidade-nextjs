import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { LivroCaixaClient } from "@/app/admin/LivroCaixaClient";

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function LivroCaixa({ params }: PageProps) {

    const { id } = await params
    const supabase = await createClient()

    const { data: empresa } = await supabase
        .from('Company')
        .select('*')
        .eq('id', id)
        .single()

    const { data: transacoes } = await supabase
        .from('Transaction')
        .select(`
            *,
            category:categoryId (name)
        `)
        .eq('companyId', id)
        .is('deletedAt', null)
        .order('date', { ascending: false })

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
                        <h1 className="text-2xl font-bold text-slate-900">{empresa?.name}</h1>
                        <p className="text-sm text-slate-500">CNPJ: {empresa?.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, "$1.$2.$3/$4-$5")}</p>
                    </div>
                </div>
            </div>

            <LivroCaixaClient transactions={transacoes ?? []}/>
            
        </div>
    )
}