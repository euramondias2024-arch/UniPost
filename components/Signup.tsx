
import React, { useState } from 'react';
import { APP_NAME, LOGO_URL } from '../constants';
import { ArrowLeft, Mail, Lock, User, ChevronRight, Eye, EyeOff } from 'lucide-react';
import { NavigationProps } from '../types';

const Signup: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulação de criação de conta
    setTimeout(() => {
      // Salva a sessão do usuário
      localStorage.setItem('unipost_user_session', JSON.stringify({
        name: formData.name,
        email: formData.email
      }));

      // VERIFICAÇÃO DE PAGAMENTO PENDENTE
      const paymentStatus = localStorage.getItem('unipost_payment_status');
      const pendingPlan = localStorage.getItem('unipost_pending_plan');

      if (paymentStatus === 'completed' && pendingPlan) {
        // Ativa o plano comprado na Stripe
        localStorage.setItem('unipost_active_plan', pendingPlan);
        // Limpa o status de pagamento pendente
        localStorage.removeItem('unipost_payment_status');
      }

      onNavigate('dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-8 md:py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto w-full max-w-[440px]">
        <div className="flex justify-center mb-8 md:mb-12">
          <button 
            onClick={() => onNavigate('landing')}
            className="flex items-center text-[10px] font-black text-gray-300 hover:text-gray-500 transition-all group uppercase tracking-[0.2em]"
          >
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Voltar para o site
          </button>
        </div>
        
        <div className="flex justify-center items-center gap-3 mb-6 md:mb-8">
          <img src={LOGO_URL} alt={APP_NAME} className="h-10 w-10 md:h-11 md:w-11 rounded-xl shadow-sm object-cover" />
          <span className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tighter">UniPost</span>
        </div>
      </div>

      <div className="mt-4 md:mt-6 mx-auto w-full max-w-[440px]">
        <div className="bg-white py-8 md:py-10 px-6 md:px-10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] rounded-[40px] border border-gray-100/60">
          
          <div className="text-center mb-8">
             <h2 className="text-xl font-black text-gray-900 mb-2">Crie sua conta</h2>
             <p className="text-xs text-slate-400 font-medium">Cadastre-se para ativar seu plano e começar a postar.</p>
          </div>

          <div className="grid grid-cols-2 gap-3 mb-8">
            <button className="flex items-center justify-center gap-3 px-4 py-3.5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-gray-700 shadow-sm active:scale-95">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-3 px-4 py-3.5 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-all font-bold text-sm text-gray-700 shadow-sm active:scale-95">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C4.1 16.5 4.3 11 7.43 10.74c1.23-.05 2.15.65 2.92.65.75 0 1.95-.8 3.44-.73 1.25.07 2.25.5 2.87 1.4-2.58 1.55-2.15 4.9.45 5.95-.53 1.34-1.2 2.67-2.06 3.27zM12.03 9.42c-.08-2.13 1.76-3.95 3.8-4.1.25 2.45-2.13 4.43-3.8 4.1z"/>
              </svg>
              Apple
            </button>
          </div>

          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] uppercase">
              <span className="bg-white px-4 text-gray-400 font-bold tracking-widest">ou use seu e-mail</span>
            </div>
          </div>

          <form className="space-y-5" onSubmit={handleSignup}>
            <div>
              <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Nome Completo</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-brand">
                  <User size={18} />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-brand/5 focus:border-brand transition-all text-sm md:text-base bg-gray-50/20 hover:bg-white font-medium"
                  placeholder="Seu nome"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">E-mail</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-brand">
                  <Mail size={18} />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="block w-full pl-12 pr-4 py-4 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-brand/5 focus:border-brand transition-all text-sm md:text-base bg-gray-50/20 hover:bg-white font-medium"
                  placeholder="voce@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">Crie uma Senha</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-300 group-focus-within:text-brand">
                  <Lock size={18} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                  className="block w-full pl-12 pr-12 py-4 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-brand/5 focus:border-brand transition-all text-sm md:text-base bg-gray-50/20 hover:bg-white font-medium"
                  placeholder="Mínimo 8 caracteres"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-300 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`group w-full bg-brand text-white py-4 md:py-5 rounded-[20px] md:rounded-[28px] font-extrabold text-[12px] uppercase tracking-[0.15em] hover:bg-brand-600 transition-all active:scale-[0.97] shadow-2xl shadow-brand/30 mt-2 ${isLoading ? 'opacity-80' : ''}`}
              >
                {isLoading ? (
                   <div className="flex items-center justify-center gap-2">
                   <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
                   Configurando...
                 </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    Criar Minha Conta <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </button>
            </div>
          </form>

          <div className="mt-8 text-center pt-6 border-t border-gray-50">
            <p className="text-sm text-gray-500 font-medium">
              Já tem conta?{' '}
              <button 
                onClick={() => onNavigate('login')} 
                className="font-bold text-brand hover:text-brand-700 transition-colors"
              >
                Entrar
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
