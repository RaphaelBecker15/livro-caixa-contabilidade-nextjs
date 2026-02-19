"use client";
import Modal from "@/components/Modal";
import { useTransacoes } from "@/contexts/empresa/ApiTransacoesContext";

export function ExcluirTransacaoModal() {

    const { transacaoEmEdicao, modalExcluirAberto, fecharModais, excluirTransacao } = useTransacoes()

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if(!transacaoEmEdicao) return

        excluirTransacao(transacaoEmEdicao.id)
    }

    if(!transacaoEmEdicao) return null

    return (
        <Modal isOpen={modalExcluirAberto} setModalOpen={fecharModais} setTittle="Excluir Transação" >
            <form onSubmit={handleSubmit} className="p-6 space-y-4 text-left">
                <h1 className="text-base text-slate-800">Tem certeza que quer excluir essa transação?</h1>
                <div className="pt-4 flex justify-end gap-3">
                    <button type="button" onClick={fecharModais} className="cursor-pointer px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancelar</button>
                    <button type='submit' className='cursor-pointer px-6 py-2 bg-red-600 text-white hover:bg-red-500 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md'>Sim</button>
                </div>
            </form>
        </Modal>
    )
}