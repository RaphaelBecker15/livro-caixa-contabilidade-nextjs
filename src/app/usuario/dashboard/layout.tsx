import { TransacoesProvider } from "@/contexts/usuario/ApiTransacoesContext";
import { ReactNode } from "react";

export default function TransacoesLayout({ children }: { children: ReactNode }) {
    return (
        <TransacoesProvider>
            {children}
        </TransacoesProvider>
    )
}