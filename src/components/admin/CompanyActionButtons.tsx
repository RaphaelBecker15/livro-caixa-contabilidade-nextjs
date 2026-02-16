"use client";
import { ExternalLink, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface CompanyActionButtonsProps {
    companyId: string;
}

export function CompanyActionButtons({ companyId }: CompanyActionButtonsProps) {
    const router = useRouter();

    const handleView = () => {
        router.push(`/admin/empresas/livro-caixa?companyId=${companyId}`);
    };

    const handleEdit = () => {
        console.log('Editar empresa:', companyId);
    };

    const handleDelete = () => {
        console.log('Excluir empresa:', companyId);
    };

    return (
        <div className="flex items-center justify-end gap-2">
            <button onClick={handleView} className="cursor-pointer p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Ver Livro Caixa">
                <ExternalLink size={18} />
            </button>
            <button onClick={handleEdit} className="cursor-pointer p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                <Pencil size={18} />
            </button>
            <button onClick={handleDelete} className="cursor-pointer p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Excluir">
                <Trash2 size={18} />
            </button>
        </div>
    );
}