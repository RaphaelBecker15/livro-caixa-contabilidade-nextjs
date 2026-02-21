import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { id } = await request.json()

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

        const { error: dbError } = await supabaseAdmin
            .from('User')
            .update({ deletedAt: new Date().toISOString() })
            .eq('id', id)

        if (dbError) throw dbError

        const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id)

        if (authError) throw authError

        return NextResponse.json({ success: true })
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro desconhecido'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}