import Image from "next/image";

const Cadastro: React.FC = () => {
    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
                <div className="text-center mb-8">
                    <div className='flex gap-3 items-center justify-center'>
                        <Image src="/logo.png" alt="Rezende" width={80} height={80} />
                        <div className="flex flex-col text-left">
                            <h1 className="text-3xl font-bold tracking-tight" style={{color: '#394071'}}>Grupo Rezende</h1>
                            <span className="text-lg" style={{color: '#394071'}}>Contabilidade</span>
                        </div>
                    </div>
                    <h1 className="font-bold text-2xl pt-4" style={{color: '#394071'}}>Criar conta</h1>
                </div>
                <form className="space-y-4">
                    <input type="text" placeholder="Nome" className="w-full px-4 py-2 border rounded-md bg-white text-neutral-900 text-sm font-light"/>

                    <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-md bg-white text-neutral-900 text-sm font-light"/>
                    
                    <input type="password" placeholder="Senha" className="w-full px-4 py-2 border rounded-md bg-white text-neutral-900 text-sm font-light"/>
                    
                    <button className="w-full mb-3 bg-slate-900 hover:bg-slate-800 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-between group">
                        <div className="text-left">
                            <span className="block">Criar conta</span>
                        </div>
                        <span className="text-slate-400 group-hover:text-white transition-colors">→</span>
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Cadastro;