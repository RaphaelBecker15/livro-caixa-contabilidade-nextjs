"use client";
import { LogoutProvider } from "@/contexts/LogoutContext";
import { Sidebar } from "@/components/Sidebar";
import { LogoutModal } from "@/components/LogoutModal";
import { AuthProvider } from "@/contexts/AuthContext";
import type { ReactNode } from "react";
import { ToastContainer, Bounce } from "react-toastify";

interface LayoutClientWrapperProps {
    children: ReactNode
    role: string
}

export function LayoutClientWrapper({ children, role }: LayoutClientWrapperProps) {
    return (
        <AuthProvider role={role}>
            <LogoutProvider>
                <div className="flex">
                    <Sidebar />
                    <main style={{ marginLeft: '256px', width: '100%', padding: '20px' }}>
                        {children}
                    </main>
                </div>
                <LogoutModal />
                <ToastContainer 
                    position="top-right"
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnFocusLoss={false}
                    draggable={false}
                    pauseOnHover={false}
                    theme="light"
                    transition={Bounce}
                />
            </LogoutProvider>
        </AuthProvider>
    );
}