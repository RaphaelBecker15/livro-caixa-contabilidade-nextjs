"use client";
import { createContext, ReactNode, useContext } from "react";

type Role = 'super_admin' | 'admin' | 'empresa'

type AuthContextType = {
    role: Role
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children, role }: { children: ReactNode, role: string }) {    
    return (
        <AuthContext.Provider value={{ role: role as Role }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if(!context) {
        throw new Error()
    }

    return context
}