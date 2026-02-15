"use client";
import type { ReactNode } from "react";
import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Modal from "@/components/Modal";

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <div className="flex">
                <Sidebar onLogoutClick={() => setOpenModal(true)}/>
                <main style={{ marginLeft: '256px', width: '100%', padding: '20px' }}>
                    {children}
                </main>
            </div>
            <Modal isOpen={openModal} setModalOpen={() => setOpenModal(!openModal)} setTittle={"Tem certeza que deseja sair?"}>
                <form className="p-4 flex justify-end">
                    <button type="button" onClick={() => setOpenModal(false)} className="cursor-pointer px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg font-medium transition-colors">Cancelar</button>
                    <button type='submit' className='cursor-pointer px-6 py-2 bg-red-900 text-white hover:bg-red-600 rounded-lg font-bold flex items-center gap-2 transition-all shadow-md'>Sim</button>
                </form>
            </Modal>
        </>
    );
}

export default Layout;