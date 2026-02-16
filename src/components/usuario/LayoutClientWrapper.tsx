"use client";
import { LogoutProvider } from "@/contexts/LogoutContext";
import { Sidebar } from "@/components/Sidebar";
import { LogoutModal } from "@/components/LogoutModal";
import type { ReactNode } from "react";

interface LayoutClientWrapperProps {
    children: ReactNode;
}

export function LayoutClientWrapper({ children }: LayoutClientWrapperProps) {
    return (
        <LogoutProvider>
            <div className="flex">
                <Sidebar />
                <main style={{ marginLeft: '256px', width: '100%', padding: '20px' }}>
                    {children}
                </main>
            </div>
            <LogoutModal />
        </LogoutProvider>
    );
}