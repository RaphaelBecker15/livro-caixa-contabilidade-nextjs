import { createClient } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
    try {
        const { id } = await request.json()

        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        )

        const { data: usuario, error: userFetchError } = await supabaseAdmin
            .from('User')
            .select('id')
            .eq('companyId', id)
            .single()

        if (userFetchError) throw userFetchError

        const { error: empresaError } = await supabaseAdmin
            .from('Company')
            .update({ deletedAt: new Date().toISOString() })
            .eq('id', id)

        if (empresaError) throw empresaError

        const { error: userError } = await supabaseAdmin
            .from('User')
            .update({ deletedAt: new Date().toISOString() })
            .eq('companyId', id)

        if (userError) throw userError

        const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(usuario.id)

        if (authError) throw authError

        return NextResponse.json({ success: true })
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro desconhecido'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}