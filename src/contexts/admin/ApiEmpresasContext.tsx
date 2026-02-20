"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { createClient } from "@/lib/supabase/client";
import { Empresa } from "@/lib/types";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

type EmpresasContextType = {
    empresas: Empresa[]
    empresaEmEdicao: Empresa | null

    modalEditarAberto: boolean
    modalExcluirAberto: boolean

    abrirModalEditar: (empresa: Empresa) => void
    abrirModalExcluir: (empresa: Empresa) => void
    fecharModais: () => void
    adicionarEmpresa: (empresa: Empresa) => void
    salvarEdicao: (dadosAtualizados: Empresa) => Promise<void>
    excluirEmpresa: (id: string) => Promise<void>
}

const ApiEmpresasContext = createContext<EmpresasContextType | undefined>(undefined)

const messages = {
    sucesso: "Ação realizada com sucesso",
    erro: "Ocorreu um erro na operação. Tente novamente mais tarde!"
}

export function EmpresasProvider({ children, initialData }: {children: ReactNode, initialData: Empresa[]}) {

    const supabase = createClient()
    const router = useRouter()

    const [empresas, setEmpresas] = useState<Empresa[]>(initialData)
    const [empresaEmEdicao, setEmpresaEmEdicao] = useState<Empresa | null>(null)
    const [modalEditarAberto, setModalEditarAberto] = useState(false)
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false)

    const adicionarEmpresa = (empresa: Empresa) => {
        setEmpresas(prev => [empresa, ...prev])
    }

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

    const salvarEdicao = async (dadosAtualizados: Empresa) => {
        try {
            const { error } = await supabase
                .from('Company')
                .update({
                    name: dadosAtualizados.name,
                    user_name: dadosAtualizados.user_name,
                    email: dadosAtualizados.email,
                    cnpj: dadosAtualizados.cnpj,
                })
                .eq('id', dadosAtualizados.id)

            if (error) throw error

            setEmpresas(prev =>
                prev.map(e => e.id === dadosAtualizados.id ? dadosAtualizados : e)
            )
            toast.success(messages.sucesso)
            fecharModais()
            router.refresh()
        } catch {
            toast.error(messages.erro)
        }
    }

    const excluirEmpresa = async (id: string) => {
        try {
            const { error } = await supabase
                .from('Company')
                .update({ deletedAt: new Date().toISOString() })
                .eq('id', id)

            if (error) throw error

            setEmpresas(prev => prev.filter(e => e.id !== id))
            toast.success(messages.sucesso)
            fecharModais()
            router.refresh()
        } catch {
            toast.error(messages.erro)
        }
    }

    return (
        <ApiEmpresasContext.Provider value={{
            empresas,
            empresaEmEdicao,
            modalEditarAberto,
            modalExcluirAberto,
            adicionarEmpresa,
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