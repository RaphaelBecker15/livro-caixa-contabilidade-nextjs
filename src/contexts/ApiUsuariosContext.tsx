"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { Usuario, users as mockData } from "@/lib/mock-data";
import { toast } from "react-toastify";

type UsuariosContextType = {
    usuarios: Usuario[]
    usuarioEmEdicao: Usuario | null

    modalEditarAberto: boolean
    modalExcluirAberto: boolean

    abrirModalEditar: (usuario: Usuario) => void
    abrirModalExcluir: (usuario: Usuario) => void
    fecharModais: () => void
    salvarEdicao: (dadosAtualizados: Usuario) => void
    excluirUsuario: (id: string) => void
}


const ApiUsuariosContext = createContext<UsuariosContextType | undefined>(undefined)

const messages = {
    sucesso: "Ação realizada com sucesso",
    erro: "Ocorreu um erro na operação. Tente novamente mais tarde!"
}

export function UsuariosProvider({children}: {children: ReactNode}) {
    const [usuarios, setUsuarios] = useState<Usuario[]>(mockData)
    const [usuarioEmEdicao, setUsuarioEmEdicao] = useState<Usuario | null>(null)
    const [modalEditarAberto, setModalEditarAberto] = useState(false)
    const [modalExcluirAberto, setModalExcluirAberto] = useState(false)

    const abrirModalEditar = (usuario: Usuario) => {
        setUsuarioEmEdicao(usuario)
        setModalEditarAberto(true)
    }

    const abrirModalExcluir = (usuario: Usuario) => {
        setUsuarioEmEdicao(usuario)
        setModalExcluirAberto(true)
    }

    const fecharModais = () => {
        setModalEditarAberto(false)
        setModalExcluirAberto(false)
        setUsuarioEmEdicao(null)
    }

    const salvarEdicao = (dadosAtualizados: Usuario) => {
        setUsuarios(prev =>
            prev.map(u =>
                u.id === dadosAtualizados.id
                    ? dadosAtualizados
                    : u
            )
        )
        toast.success(messages.sucesso)
        fecharModais()
    }

    const excluirUsuario = (id: string) => {
        setUsuarios(prev => prev.filter(u => u.id !== id))
        toast.success(messages.sucesso)
        fecharModais()
    }

    return (
        <ApiUsuariosContext.Provider value={{
            usuarios,
            usuarioEmEdicao,
            modalEditarAberto,
            modalExcluirAberto,
            abrirModalEditar,
            abrirModalExcluir,
            fecharModais,
            salvarEdicao,
            excluirUsuario
        }}>
            {children}
        </ApiUsuariosContext.Provider>
    )
}

export function useUsuarios() {
    const context = useContext(ApiUsuariosContext)

    if(!context) {
        throw new Error("useUsuarios precisa estar dentro de UsuariosProvider")
    }

    return context
}