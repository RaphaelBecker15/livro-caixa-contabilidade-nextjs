"use client";
import { useTransacoes } from "@/contexts/empresa/ApiTransacoesContext"
import { RelatorioButton } from "@/components/RelatorioButton"

interface Props {
    nomeEmpresa: string
    categorias: { id: string, name: string }[]
}

export function RelatorioButtonWrapper({ nomeEmpresa, categorias }: Props) {
    const { transacoes, mesSelecionado } = useTransacoes()

    const transacoesFiltradas = transacoes.filter(tx =>
        tx.date.startsWith(mesSelecionado)
    )

    return (
        <RelatorioButton
            transacoes={transacoes}
            transacoesFiltradas={transacoesFiltradas}
            mesSelecionado={mesSelecionado}
            nomeEmpresa={nomeEmpresa}
            categorias={categorias}
        />
    )
}