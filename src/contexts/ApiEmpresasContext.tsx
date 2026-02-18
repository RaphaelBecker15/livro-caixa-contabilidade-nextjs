"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Empresa, empresas as mockData } from "@/lib/mock-data";
import { toast } from "react-toastify";

type EmpresasContextType = {
    empresas: Empresa[]
    empresaEmEdicao: Empresa | null

    modalEditarAberto: boolean
    modalExcluirAberto: boolean

    abrirModalEditar: (usuario: Empresa) => void
    abrirModalExcluir: (usuario: Empresa) => void
    fecharModais: () => void
    salvarEdicao: (dadosAtualizados: Empresa) => void
    excluirEmpresa: (id: string) => void
}

const ApiEmpresasContext = createContext<EmpresasContextType | undefined>(undefined)

const messages = {
    sucesso: "Ação realizada com sucesso",
    erro: "Ocorreu um erro na operação. Tente novamente mais tarde!"
}

export function EmpresasProvider({children}: {children: ReactNode}) {
    const [empresas, setEmpresas] = useState<Empresa[]>(mockData)
    const [empresaEmEdicao, setEmpresaEmEdicao] = useState<Empresa | null>(null)
    const [modalEditarAberto, setModalEditarAberto] = useState(false)
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false)

    const abrirModalEditar = (empresa: Empresa) => {
        setEmpresaEmEdicao(empresa)
        setModalEditarAberto(true)
    }

    const abrirModalExcluir = (empresa: Empresa) => {
        setEmpresaEmEdicao(empresa)
        setModalExcluirAberto(true)
    }

    const fecharModais = () => {
        setModalEditarAberto(false)
        setModalExcluirAberto(false)
        setEmpresaEmEdicao(null)
    }

    const salvarEdicao = (dadosAtualizados: Empresa) => {
        setEmpresas(prev =>
            prev.map(u =>
                u.id === dadosAtualizados.id
                    ? dadosAtualizados
                    : u
            )
        )
        toast.success(messages.sucesso)
        fecharModais()
    }

    const excluirEmpresa = (id: string) => {
        setEmpresas(prev => prev.filter(u => u.id !== id))
        toast.success(messages.sucesso)
        fecharModais()
    }

    return (
        <ApiEmpresasContext.Provider value={{
            empresas,
            empresaEmEdicao,
            modalEditarAberto,
            modalExcluirAberto,
            abrirModalEditar,
            abrirModalExcluir,
            fecharModais,
            salvarEdicao,
            excluirEmpresa
        }}>
            {children}
        </ApiEmpresasContext.Provider>
    )
}

export function useEmpresas() {
    const context = useContext(ApiEmpresasContext)

    if(!context) {
        throw new Error("useEmpresas precisa estar dentro de EmpresasProvider")
    }

    return context
}