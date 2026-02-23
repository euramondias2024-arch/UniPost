
import React, { useState } from 'react';
import { APP_NAME, LOGO_URL } from '../constants';
import { ArrowLeft, Mail, ChevronRight, CheckCircle2, ExternalLink } from 'lucide-react';
import { NavigationProps } from '../types';

const ForgotPassword: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="mx-auto w-full max-w-[440px]">
        <div className="flex justify-center mb-8 md:mb-12">
          <button 
            onClick={() => onNavigate('login')}
            className="flex items-center text-[10px] font-black text-gray-300 hover:text-gray-500 transition-all group uppercase tracking-[0.2em]"
          >
            <ArrowLeft size={14} className="mr-2 group-hover:-translate-x-1 transition-transform" /> 
            Voltar para o login
          </button>
        </div>
        
        <div className="flex justify-center items-center gap-3 mb-10">
          <img src={LOGO_URL} alt={APP_NAME} className="h-10 w-10 md:h-11 md:w-11 rounded-xl shadow-sm object-cover" />
          <span className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tighter">UniPost</span>
        </div>
        
        {!isSubmitted && (
          <h2 className="text-center text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight px-4 mb-2">
            Recuperar senha
          </h2>
        )}
      </div>

      <div className="mt-4 md:mt-6 mx-auto w-full max-w-[440px]">
        <div className="bg-white py-10 px-6 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.08)] rounded-[40px] border border-gray-100/60 md:px-10">
          {!isSubmitted ? (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-[10px] font-black text-gray-400 mb-2 uppercase tracking-widest">
                  E-mail cadastrado
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none transition-colors group-focus-within:text-brand">
                    <Mail className="h-5 w-5 text-gray-300" />
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full pl-12 pr-4 py-4 border border-gray-100 rounded-2xl text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-brand/5 focus:border-brand transition-all text-sm md:text-base bg-gray-50/20 hover:bg-white font-medium"
                    placeholder="seu@email.com"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`group w-full flex justify-center items-center py-4 px-4 border border-transparent rounded-2xl shadow-xl shadow-brand/20 text-base font-bold text-white bg-brand hover:bg-brand-600 focus:outline-none transition-all active:scale-[0.98] ${isLoading ? 'opacity-80 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Enviando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      Enviar instruções <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </button>
              </div>
            </form>
          ) : (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-brand/5 text-brand rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-brand/10">
                <CheckCircle2 size={32} />
              </div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-2 tracking-tight">E-mail enviado!</h3>
              <p className="text-gray-500 text-sm mb-8 leading-relaxed font-medium">
                Verifique sua caixa de entrada em <br /><strong>{email}</strong>.
              </p>
              
              <div className="space-y-4">
                <button 
                  onClick={() => onNavigate('reset-password')}
                  className="w-full flex items-center justify-center gap-2 bg-brand/5 text-brand py-4 rounded-2xl font-bold hover:bg-brand/10 transition-all border border-brand/10 active:scale-95"
                >
                  <ExternalLink size={18} /> Simular clique no e-mail
                </button>
                
                <button 
                  onClick={() => onNavigate('login')}
                  className="text-gray-400 text-[10px] font-bold hover:text-brand transition-colors uppercase tracking-widest"
                >
                  Tentar login novamente
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
