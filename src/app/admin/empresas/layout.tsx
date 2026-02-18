import { EmpresasProvider } from "@/contexts/ApiEmpresasContext";
import { ReactNode } from "react";

export default function EmpresasLayout({ children }: { children: ReactNode }) {
    return (
        <EmpresasProvider>
            {children}
        </EmpresasProvider>
    )
}