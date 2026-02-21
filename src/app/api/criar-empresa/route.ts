import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, user_name, email, cnpj, password, workspaceId } = body

        const supabaseClient = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        
        const { data: { user } } = await supabaseClient.auth.getUser()

        if (!user || user.user_metadata?.role !== 'super_admin') {
            return NextResponse.json({ error: 'Sem permissão.' }, { status: 403 })
        }

        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        )

        const { data: empresa, error: empresaError } = await supabaseAdmin
            .from('Company')
            .insert({ name, user_name, email, cnpj, workspaceId })
            .select()
            .single()

        if (empresaError) {
            if (empresaError.code === '23505') {
                if (empresaError.message.includes('email')) {
                    return NextResponse.json({ error: 'Este email já está em uso.' }, { status: 400 })
                }
                if (empresaError.message.includes('user_name')) {
                    return NextResponse.json({ error: 'Este nome de usuário já está em uso.' }, { status: 400 })
                }
                if (empresaError.message.includes('cnpj')) {
                    return NextResponse.json({ error: 'Este CNPJ já está cadastrado.' }, { status: 400 })
                }
            }
            throw empresaError
        }

        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            user_metadata: {
                role: 'empresa',
                workspaceId,
                companyId: empresa.id
            },
            email_confirm: true
        })

        if (authError) throw authError

        const { error: userError } = await supabaseAdmin.from('User').insert({
            id: authData.user.id,
            name,
            user_name,
            email,
            role: 'empresa',
            workspaceId,
            companyId: empresa.id
        })

        if (userError) throw userError

        return NextResponse.json({ success: true, empresa: empresa })
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro desconhecido'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}