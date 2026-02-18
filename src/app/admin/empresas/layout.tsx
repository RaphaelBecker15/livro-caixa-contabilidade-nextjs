import { EmpresasProvider } from "@/contexts/admin/ApiEmpresasContext";
import { ReactNode } from "react";

export default function EmpresasLayout({ children }: { children: ReactNode }) {
    return (
        <EmpresasProvider>
            {children}
        </EmpresasProvider>
    )
}