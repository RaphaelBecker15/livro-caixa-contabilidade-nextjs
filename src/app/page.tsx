"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Image from "next/image";
import { LogIn, Eye, EyeOff } from "lucide-react";


export default function Login() {

    const router = useRouter()
    const supabase = createClient()

    const [identifier, setIdentifier] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [erro, setErro] = useState('')

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)
        setErro('')

        try {
            const isEmail = identifier.includes('@')
            let email = identifier

            if (!isEmail) {
                const { data: user, error } = await supabase
                    .from('User')
                    .select('email')
                    .eq('user_name', identifier)
                    .single()

                if (error || !user) {
                    setErro('Usuário não encontrado.')
                    return
                }

                email = user.email
            }

            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            })

            if (error) {
                setErro('Email, usuário ou senha incorretos.')
                return
            }

            const role = data.user?.user_metadata?.role

            switch (role) {
                case 'super_admin': router.push('/admin/empresas'); break;
                case 'admin': router.push('/admin/empresas'); break;
                case 'empresa': router.push('/empresa/dashboard'); break;
                default: setErro('Usuário sem permissão de acesso.')
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
                
                {/* Header */}
                <div className="px-8 py-8 flex flex-col items-center">
                    <Image src="/logo-grupo-rezende.png" alt="Rezende" width={300} height={300} />
                    <div className="text-center">
                        <h1 className="text-xl font-bold text-white">Grupo Rezende</h1>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="p-8 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Email/usuário
                        </label>
                        <input
                            required
                            type="text"
                            value={identifier}
                            onChange={e => setIdentifier(e.target.value)}
                            placeholder="Email/usuário"
                            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition-all"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">
                            Senha
                        </label>
                        <div className="relative">
                            <input
                                required
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-slate-500 outline-none transition-all pr-10"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                    </div>

                    {erro && (
                        <p className="text-rose-500 text-sm font-medium">{erro}</p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="cursor-pointer w-full py-2.5 bg-slate-900 text-white rounded-lg font-bold flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <LogIn size={18} />
                        {loading ? 'Entrando...' : 'Entrar'}
                    </button>
                </form>
            </div>
        </div>
    )
}
