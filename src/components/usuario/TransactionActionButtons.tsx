"use client";
import { Pencil, Trash2 } from "lucide-react";
import { useTransacoes } from "@/contexts/usuario/ApiTransacoesContext";

interface TransactionActionButtonsProps {
    id: string;
}

export function TransactionActionButtons({ id }: TransactionActionButtonsProps) {
    
    const { transacoes, abrirModalEditar, abrirModalExcluir } = useTransacoes()

    const transacao = transacoes.find(u => u.id === id)

    if(!transacao) return null

    return (
        <div className="flex items-center justify-end gap-2">
            <button onClick={() => abrirModalEditar(transacao)} className="cursor-pointer p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
                <Pencil size={16} />
            </button>
            <button onClick={() => abrirModalExcluir(transacao)} className="cursor-pointer p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Delete">
                <Trash2 size={16} />
            </button>
        </div>
    );
}