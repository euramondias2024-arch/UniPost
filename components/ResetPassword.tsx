import React, { useState } from 'react';
import { APP_NAME, LOGO_URL } from '../constants';
import { Lock, Eye, EyeOff, ChevronRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { NavigationProps } from '../types';

const ResetPassword: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }
    setIsLoading(true);
    // Simulação profissional de atualização de senha
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <div className="flex justify-center mb-6">
          <img src={LOGO_URL} alt={APP_NAME} className="h-14 w-auto drop-shadow-sm" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 tracking-tight">
          Criar nova senha
        </h2>
        <p className="mt-2 text-sm text-gray-600 px-4">
          Escolha uma senha forte para proteger sua conta e seus dados.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-10 px-6 shadow-[0_20px_50px_rgba(0,0,0,0.05)] sm:rounded-3xl border border-gray-100 sm:px-10">
          {!isSuccess ? (
            <form className="space-y-6" onSubmit={handleReset}>
              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Nova Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all sm:text-sm bg-white hover:border-brand/30"
                    placeholder="No mínimo 8 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div>
                <label htmlFor="confirm-password" className="block text-sm font-semibold text-gray-700 mb-2">
                  Confirmar Nova Senha
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="confirm-password"
                    name="confirm-password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="block w-full pl-11 pr-12 py-3.5 border border-gray-200 rounded-2xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent transition-all sm:text-sm bg-white hover:border-brand/30"
                    placeholder="Repita a nova senha"
                  />
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-4 flex gap-3 border border-gray-100">
                <ShieldCheck size={20} className="text-brand shrink-0" />
                <p className="text-xs text-gray-600 leading-relaxed">
                  Dica: Use uma combinação de letras maiúsculas, minúsculas, números e símbolos para uma segurança máxima.
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl shadow-xl shadow-brand/20 text-base font-bold text-white bg-brand hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-all active:scale-[0.98] ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Atualizando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    Redefinir minha senha <ChevronRight size={20} />
                  </div>
                )}
              </button>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Senha alterada com sucesso!</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Sua conta está protegida com a nova senha. Agora você já pode entrar na plataforma normalmente.
              </p>
              <button 
                onClick={() => onNavigate('login')}
                className="w-full flex items-center justify-center py-4 px-4 bg-brand text-white rounded-2xl font-bold hover:bg-brand-600 shadow-xl shadow-brand/20 transition-all active:scale-95"
              >
                Acessar minha conta
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;