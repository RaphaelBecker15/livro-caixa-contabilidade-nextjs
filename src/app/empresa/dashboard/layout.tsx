import { TransacoesProvider } from "@/contexts/empresa/ApiTransacoesContext";
import { ReactNode } from "react";

export default function TransacoesLayout({ children }: { children: ReactNode }) {
    return (
        <TransacoesProvider>
            {children}
        </TransacoesProvider>
    )
}