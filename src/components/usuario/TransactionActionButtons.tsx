"use client";
import { Pencil, Trash2 } from "lucide-react";

interface TransactionActionButtonsProps {
    transactionId: string;
}

export function TransactionActionButtons({ transactionId }: TransactionActionButtonsProps) {
    const handleEdit = () => {
        console.log('Editar transação:', transactionId);
    };

    const handleDelete = () => {
        console.log('Excluir transação:', transactionId);
    };

    return (
        <div className="flex items-center justify-end gap-2">
            <button onClick={handleEdit} className="cursor-pointer p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors" title="Edit">
                <Pencil size={16} />
            </button>
            <button onClick={handleDelete} className="cursor-pointer p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors" title="Delete">
                <Trash2 size={16} />
            </button>
        </div>
    );
}