"use client";
import { LayoutDashboard, Building2, LogOut, CircleUserRound, UsersRound, type LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
    onLogoutClick: () => void
}

const isActive = (path: string, location: string) => {
    return location === path ? "bg-slate-800 text-white" : "text-slate-400 hover:bg-slate-800 hover:text-white";
};

const NavItem = ({ to, icon: Icon, label, currentPath }: { to: string; icon: LucideIcon; label: string, currentPath: string }) => (
    <Link href={to} className={`cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(to, currentPath)}`}>
        <Icon size={20}/>
        <span className='font-medium'>{label}</span>
    </Link>
);

const Sidebar: React.FC<SidebarProps> = ({ onLogoutClick }) => {

    const pathname = usePathname();

    return (
        <div className='w-64 bg-slate-900 h-screen flex flex-col text-slate-300 fixed left-0 top-0'>
            <div className="p-6 border-b border-slate-800 flex gap-3 items-center">
                <Image src="/logo.png" alt="Rezende" width={48} height={48} />
                <div className="flex-col text-left">
                    <h1 className="text-xl font-bold text-white tracking-tight">Grupo Rezende</h1>
                    <span className="text-xs">Contabilidade</span>
                </div>
            </div>

            <nav className='flex-1 p-4 space-y-2'>
                <NavItem to="/client/dashboard" icon={LayoutDashboard} label="Dashboard" currentPath={pathname}></NavItem>
                <NavItem to="/admin/empresas" icon={Building2} label="Empresas" currentPath={pathname}></NavItem>
                <NavItem to="/admin/usuarios" icon={UsersRound} label="Usuários" currentPath={pathname}></NavItem>
            </nav>

            <div className="p-4 border-t border-slate-800">
                <div className="flex items-center gap-3 px-4 py-3 mb-2">
                    <div className="w-8 h-8 rounded-full flex items-center justify-center text-white">
                        <CircleUserRound size={250}/>
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-medium text-white truncate">Raphael</p>
                        <p className="text-xs text-slate-500 truncate">rraffaelbeckerr@gmail.com</p>
                    </div>
                </div>
                <button onClick={onLogoutClick} className="cursor-pointer w-full flex items-center gap-3 px-4 py-2 text-rose-400 hover:bg-rose-950/30 rounded-lg transition-colors text-sm">
                    <LogOut size={18} />
                    Sair
                </button>
            </div>
        </div>
    );
};

export default Sidebar;