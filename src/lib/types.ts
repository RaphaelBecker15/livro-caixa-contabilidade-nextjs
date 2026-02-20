export type Usuario = {
    id: string
    name: string
    user_name: string
    email: string
    role: 'super_admin' | 'admin' | 'empresa'
    active: boolean
    workspaceId: string
    companyId: string | null
}

export type Transacao = {
    id: string
    valor: number
    tipo: string
    descricao: string
    data: string
    categoria: string
    anexo: string
    empresaId: string
}

export type Empresa = {
    id: string
    name: string
    user_name: string
    email: string
    cnpj: string
    active: boolean
    workspaceId: string
}

export const transacoes = [
    {
        id: '1',
        valor: 1500.00,
        tipo: 'entrada',
        descricao: 'Salário de 1500 reais',
        data: '2026-02-01',
        categoria: 'Salário',
        anexo: 'link do anexo',
        empresaId: '1'
    },
    {
        id: '2',
        valor: 400.00,
        tipo: 'saida',
        descricao: 'Aluguel de 400 reais',
        data: '2026-02-05',
        categoria: 'Aluguel',
        anexo: 'link do anexo',
        empresaId: '1'
    },
    {
        id: '3',
        valor: 357.00,
        tipo: 'saida',
        descricao: 'Aluguel de 350 reais',
        data: '2026-02-05',
        categoria: 'Aluguel',
        anexo: 'link do anexo',
        empresaId: '3'
    },
    {
        id: '4',
        valor: 120.50,
        tipo: 'saida',
        descricao: 'Compra de 120,50',
        data: '2026-02-10',
        categoria: 'Supermercado',
        anexo: 'link do anexo',
        empresaId: '1'
    },
    {
        id: '5',
        valor: 122.50,
        tipo: 'saida',
        descricao: 'Compra de 120,50',
        data: '2026-02-10',
        categoria: 'Supermercado',
        anexo: 'link do anexo',
        empresaId: '2'
    },
    {
        id: '6',
        valor: 500.00,
        tipo: 'entrada',
        descricao: 'Compra de 120,50',
        data: '2026-01-10',
        categoria: 'Supermercado',
        anexo: 'link do anexo',
        empresaId: '1'
    }
]