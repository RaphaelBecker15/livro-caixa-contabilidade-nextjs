import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const rotasPermitidas: Record<string, string[]> = {
    '/admin/usuarios': ['super_admin'],
    '/admin/empresas': ['super_admin', 'admin'],
    '/empresa/dashboard': ['empresa'],
}

export function proxy(request: NextRequest) {
    const role = request.cookies.get('mock_role')?.value
    const pathname = request.nextUrl.pathname

    const rotaProtegida = Object.keys(rotasPermitidas).find(rota =>
        pathname.startsWith(rota)
    )

    if (rotaProtegida && (!role || !rotasPermitidas[rotaProtegida].includes(role))) {
        return NextResponse.redirect(new URL('/', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/admin/:path*', '/empresa/:path*']
}