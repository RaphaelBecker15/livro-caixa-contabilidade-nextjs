"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Transacao, transacoes as mockData } from "@/lib/mock-data";
import { toast } from "react-toastify";

type TransacoesContextType = {
    transacoes: Transacao[]
    transacaoEmEdicao: Transacao | null

    modalEditarAberto: boolean
    modalExcluirAberto: boolean

    mesSelecionado: string
    setMesSelecionado: (mes: string) => void

    abrirModalEditar: (transacao: Transacao) => void
    abrirModalExcluir: (transacao: Transacao) => void
    fecharModais: () => void
    salvarEdicao: (dadosAtualizados: Transacao) => void
    excluirTransacao: (id: string) => void
}

const ApiTransacoesContext = createContext<TransacoesContextType | undefined>(undefined)

const messages = {
    sucesso: "Ação realizada com sucesso",
    erro: "Ocorreu um erro na operação. Tente novamente mais tarde!"
}

const hoje = new Date()
const mesAtual = `${hoje.getFullYear()}-${String(hoje.getMonth() + 1).padStart(2, '0')}`

export function TransacoesProvider({children}: {children: ReactNode}) {
    const [transacoes, setTransacoes] = useState<Transacao[]>(mockData)
    const [transacaoEmEdicao, setTransacaoEmEdicao] = useState<Transacao | null>(null)
    const [modalEditarAberto, setModalEditarAberto] = useState(false)
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false)
    const [mesSelecionado, setMesSelecionado] = useState(mesAtual)

    const abrirModalEditar = (transacao: Transacao) => {
        setTransacaoEmEdicao(transacao)
        setModalEditarAberto(true)
    }

    const abrirModalExcluir = (transacao: Transacao) => {
        setTransacaoEmEdicao(transacao)
        setModalExcluirAberto(true)
    }

    const fecharModais = () => {
        setModalEditarAberto(false)
        setModalExcluirAberto(false)
        setTransacaoEmEdicao(null)
    }

    const salvarEdicao = (dadosAtualizados: Transacao) => {
        setTransacoes(prev =>
            prev.map(u =>
                u.id === dadosAtualizados.id
                    ? dadosAtualizados
                    : u
            )
        )
        toast.success(messages.sucesso)
        fecharModais()
    }

    const excluirTransacao = (id: string) => {
        setTransacoes(prev => prev.filter(u => u.id !== id))
        toast.success(messages.sucesso)
        fecharModais()
    }

    return (
        <ApiTransacoesContext.Provider value={{
            transacoes,
            transacaoEmEdicao,
            modalEditarAberto,
            modalExcluirAberto,
            mesSelecionado,
            setMesSelecionado,
            abrirModalEditar,
            abrirModalExcluir,
            fecharModais,
            salvarEdicao,
            excluirTransacao
        }}>
            {children}
        </ApiTransacoesContext.Provider>
    )
}

export function useTransacoes() {
    const context = useContext(ApiTransacoesContext)

    if(!context) {
        throw new Error("useTransacoes precisa estar dentro de TransacoesProvider")
    }

    return context
}