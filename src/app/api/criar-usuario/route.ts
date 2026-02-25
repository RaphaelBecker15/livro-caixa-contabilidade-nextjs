import { createServerClient } from "@supabase/ssr";
import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()
        const { name, user_name, email, password, role, workspaceId } = body

        const cookieStore = await cookies()
        const supabaseClient = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll()
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        )
                    }
                }
            }
        )

        const { data: { user } } = await supabaseClient.auth.getUser()
        
        if (!user || user.app_metadata?.role !== 'super_admin') {
            return NextResponse.json({ error: 'Sem permissão.' }, { status: 403 })
        }

        if (role === 'super_admin') {
            return NextResponse.json({ error: 'Não é permitido criar super_admin.' }, { status: 403 })
        }

        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.SUPABASE_SERVICE_ROLE_KEY!
        )

        const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
            email,
            password,
            app_metadata: {
                role,
                workspaceId
            },
            email_confirm: true
        })

        if (authError) throw authError

        const { error: userError } = await supabaseAdmin.from('User').insert({
            id: authData.user.id,
            name,
            user_name,
            email,
            role,
            workspaceId
        })

        if (userError) {
            if (userError.code === '23505') {
                if (userError.message.includes('email')) {
                    return NextResponse.json({ error: 'Este email já está em uso.' }, { status: 400 })
                }
                if (userError.message.includes('user_name')) {
                    return NextResponse.json({ error: 'Este nome de usuário já está em uso.' }, { status: 400 })
                }
            }
            throw userError
        }

        return NextResponse.json({ success: true, usuario: {
            id: authData.user.id,
            name,
            user_name,
            email,
            role,
            workspaceId,
            active: true,
            companyId: null
        }})
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Erro desconhecido'
        return NextResponse.json({ error: message }, { status: 500 })
    }
}