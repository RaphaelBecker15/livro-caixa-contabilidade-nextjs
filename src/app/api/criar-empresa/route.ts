import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, user_name, email, cnpj, password, workspaceId } = body

        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        )

        const { data: empresa, error: empresaError } = await supabaseAdmin
            .from('Company')
            .insert({ name, user_name, email, cnpj, workspaceId })
            .select()
            .single()

        if (empresaError) throw empresaError

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