import { UsuariosProvider } from "@/contexts/ApiUsuariosContext";
import { ReactNode } from "react";

export default function UsuariosLayout({ children }: { children: ReactNode }) {
    return (
        <UsuariosProvider>
            {children}
        </UsuariosProvider>
    )
}