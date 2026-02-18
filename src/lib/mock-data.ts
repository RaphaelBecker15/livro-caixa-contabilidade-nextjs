export type Usuario = {
    id: string
    nome: string
    email: string
    cargo: string
    workspaceId: string
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
    nome: string
    cnpj: string
    workspaceId: string
}

export const transacoes = [
    {
        id: '1',
        valor: 1500.00,
        tipo: 'entrada',
        descricao: 'Salário de 1500 reais',
        data: '2024-02-01',
        categoria: 'Salário',
        anexo: 'link do anexo',
        empresaId: '1'
    },
    {
        id: '2',
        valor: 400.00,
        tipo: 'saida',
        descricao: 'Aluguel de 400 reais',
        data: '2024-02-05',
        categoria: 'Aluguel',
        anexo: 'link do anexo',
        empresaId: '1'
    },
    {
        id: '3',
        valor: 357.00,
        tipo: 'saida',
        descricao: 'Aluguel de 350 reais',
        data: '2024-02-05',
        categoria: 'Aluguel',
        anexo: 'link do anexo',
        empresaId: '3'
    },
    {
        id: '4',
        valor: 120.50,
        tipo: 'saida',
        descricao: 'Compra de 120,50',
        data: '2024-02-10',
        categoria: 'Supermercado',
        anexo: 'link do anexo',
        empresaId: '1'
    },
    {
        id: '5',
        valor: 122.50,
        tipo: 'saida',
        descricao: 'Compra de 120,50',
        data: '2024-02-10',
        categoria: 'Supermercado',
        anexo: 'link do anexo',
        empresaId: '2'
    }
]

export const empresas: Empresa[] = [
    {
        id: '1',
        nome: 'Rezende Transportes',
        cnpj: '12993070000177',
        workspaceId: '1'
    },
    {
        id: '2',
        nome: 'Rezende Contabilidade',
        cnpj: '16756070000199',
        workspaceId: '1'
    },
    {
        id: '3',
        nome: 'Rezende Mecânica',
        cnpj: '14854070000166',
        workspaceId: '1'
    },
]

export const users: Usuario[] = [
    {
        id: '1',
        nome: 'Raphael',
        email: 'fiscal3@rezendetransportes.com.br',
        cargo: 'Fiscal',
        workspaceId: '1'
    },
    {
        id: '2',
        nome: 'Rodrigo',
        email: 'fiscal2@rezendetransportes.com.br',
        cargo: 'Fiscal',
        workspaceId: '1'
    },
    {
        id: '3',
        nome: 'Elio',
        email: 'fiscal@rezendetransportes.com.br',
        cargo: 'Diretor Fiscal',
        workspaceId: '1'
    },
]

export const category = [
  { id: 'cat-1', nome: 'Salário', cor: '#10b981', tipo: 'entrada' },
  { id: 'cat-2', nome: 'Moradia', cor: '#ef4444', tipo: 'saida' },
  { id: 'cat-3', nome: 'Alimentação', cor: '#f59e0b', tipo: 'saida' },
]