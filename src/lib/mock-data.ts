export const transactions = [
    {
        id: '1',
        valor: 1500.00,
        tipo: 'entrada',
        descricao: 'Salário',
        data: '2024-02-01',
        categoriaId: 'cat-1',
        userId: 'user-1'
    },
    {
        id: '2',
        valor: 350.00,
        tipo: 'saida',
        descricao: 'Aluguel',
        data: '2024-02-05',
        categoriaId: 'cat-2',
        userId: 'user-1'
    },
    {
        id: '3',
        valor: 120.50,
        tipo: 'saida',
        descricao: 'Supermercado',
        data: '2024-02-10',
        categoriaId: 'cat-3',
        userId: 'user-1'
    }
]

export const companies = [
    {
        id: 'company-1',
        nome: 'Rezende Transportes',
        cnpj: '12993070000177',
    },
    {
        id: 'company-2',
        nome: 'Rezende Contabilidade',
        cnpj: '16756070000199',
    },
    {
        id: 'company-3',
        nome: 'Rezende Mecânica',
        cnpj: '14854070000166',
    },
]

export const users = [
    {
        id: 'user-1',
        nome: 'Raphael',
        email: 'fiscal3@rezendetransportes.com.br',
        cargo: 'Fiscal',
    },
    {
        id: 'user-2',
        nome: 'Rodrigo',
        email: 'fiscal2@rezendetransportes.com.br',
        cargo: 'Fiscal',
    },
    {
        id: 'user-3',
        nome: 'Elio',
        email: 'fiscal@rezendetransportes.com.br',
        cargo: 'Diretor Fiscal',
    },
]

export const category = [
  { id: 'cat-1', nome: 'Salário', cor: '#10b981', tipo: 'entrada' },
  { id: 'cat-2', nome: 'Moradia', cor: '#ef4444', tipo: 'saida' },
  { id: 'cat-3', nome: 'Alimentação', cor: '#f59e0b', tipo: 'saida' },
]