"use client";
import { Pencil, Trash2 } from "lucide-react";

interface UserActionButtonsProps {
    userId: string;
}

export function UserActionButtons({ userId }: UserActionButtonsProps) {

    const handleEdit = () => {
        console.log('Editar usuário:', userId);
    };

    const handleDelete = () => {
        console.log('Excluir usuário:', userId);
    };

    return (
        <div className="flex items-center justify-end gap-2">
            <button onClick={handleEdit} className="cursor-pointer p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Editar">
                <Pencil size={18} />
            </button>
            <button onClick={handleDelete} className="cursor-pointer p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors" title="Excluir">
                <Trash2 size={18} />
            </button>
        </div>
    );
}