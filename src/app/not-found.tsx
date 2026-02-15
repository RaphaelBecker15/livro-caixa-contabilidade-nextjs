// src/app/not-found.tsx
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          {/* Ícone ou Ilustração */}
          <div className="mb-8 flex justify-center">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
              <FileQuestion size={64} className="text-blue-600" />
            </div>
          </div>

          {/* Título */}
          <h1 className="text-6xl font-bold text-slate-900 mb-4">
            404
          </h1>
          
          <h2 className="text-2xl font-semibold text-slate-800 mb-4">
            Oops! Página não encontrada
          </h2>
        </div>
      </div>
    </div>
  );
}