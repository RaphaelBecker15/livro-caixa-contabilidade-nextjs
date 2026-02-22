export type AuthUser = {
    id: string
    name: string
    email: string
    role: 'super_admin' | 'admin' | 'empresa'
}

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
    date: string
    description: string
    amount: number
    type: 'income' | 'expense'
    categoryId: string
    companyId: string
    workspaceId: string
    userId: string
    attachments: string[]
    deletedAt?: string | null
}

export type Categoria = {
    id: string
    name: string
    type: 'income' | 'expense'
    active: boolean
    workspaceId: string
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