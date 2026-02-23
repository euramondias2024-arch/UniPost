
import React, { useState, useEffect } from 'react';
import { X, Check } from 'lucide-react';
import { LOGO_URL, APP_NAME } from '../constants';

const SalesPopup: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    const hasSeenPopup = localStorage.getItem('unipost_popup_seen');
    
    // Se já foi enviado com sucesso antes, não mostra de novo
    const hasSubscribed = localStorage.getItem('unipost_subscribed');
    
    if (!hasSeenPopup && !hasSubscribed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Só marcamos como visto se ele fechar ou terminar o fluxo
    localStorage.setItem('unipost_popup_seen', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("E-mail capturado:", email);
    setIsSubmitted(true);
    localStorage.setItem('unipost_subscribed', 'true');
    localStorage.setItem('unipost_popup_seen', 'true');
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-500">
      {/* Container responsivo: arredondamento e padding menores no mobile */}
      <div className={`relative bg-white w-full max-w-[420px] rounded-[32px] md:rounded-[52px] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.14)] overflow-hidden animate-in zoom-in-95 duration-300 transition-all ${isSubmitted ? 'p-8 md:p-16' : 'p-8 md:p-14'}`}>
        
        {/* Botão de fechar com posicionamento ajustado */}
        <button 
          onClick={handleClose}
          className="absolute top-6 right-6 md:top-8 md:right-8 text-slate-300 hover:text-slate-600 transition-colors z-20"
        >
          <X size={24} strokeWidth={2.5} />
        </button>

        <div className="flex flex-col items-center text-center relative z-10 font-sans">
          {!isSubmitted ? (
            <>
              {/* Logo e Nome - Identidade Visual */}
              <div className="flex items-center gap-2 mb-6 md:mb-8">
                <img src={LOGO_URL} alt={APP_NAME} className="h-8 md:h-10 w-auto rounded-lg shadow-sm" />
                <span className="font-bold text-xl md:text-2xl tracking-tight text-gray-900">{APP_NAME}</span>
              </div>

              {/* Imagem de Destaque - Responsiva */}
              <div className="relative mb-8 md:mb-10 w-full flex justify-center">
                <div className="absolute inset-0 bg-brand/10 blur-[40px] md:blur-[60px] rounded-full scale-110"></div>
                <div className="relative w-44 md:w-56 transform transition-transform duration-700 hover:scale-105">
                    <img 
                    src="https://i.imgur.com/ZSPV35N.png" 
                    alt="UniPost App Mockup" 
                    className="w-full h-auto drop-shadow-[0_25px_40px_rgba(0,106,255,0.25)]"
                    />
                </div>
              </div>

              {/* Headline - Tamanho de fonte ajustado para mobile */}
              <h3 className="text-xl md:text-[26px] font-[800] text-gray-900 tracking-[-0.04em] leading-[1.1] mb-6 md:mb-8 uppercase">
                EXPERIMENTE O UNIPOST <br /> 
                <span className="text-brand">POR 7 DIAS GRÁTIS</span>
              </h3>

              <form onSubmit={handleSubmit} className="w-full space-y-4 md:space-y-6">
                <div className="relative group">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Digite seu e-mail"
                    className="w-full bg-[#fcfcfd] border border-slate-100 rounded-2xl py-4 md:py-5 px-6 md:px-8 text-sm font-medium text-gray-900 focus:outline-none focus:bg-white focus:ring-4 focus:ring-brand/5 focus:border-brand transition-all shadow-sm placeholder:text-slate-300"
                  />
                </div>

                {/* Texto com fonte menor (9px) e sem 'uppercase' conforme pedido */}
                <p className="text-[9px] text-slate-400 font-medium leading-relaxed max-w-[340px] mx-auto opacity-80">
                  Ao se cadastrar, você concorda com nossos Termos de Serviço e Política de Privacidade. Sem compromisso. Cancele quando quiser.
                </p>

                <button
                  type="submit"
                  className="w-full bg-brand text-white py-4 md:py-5 rounded-[20px] md:rounded-[28px] font-extrabold text-[12px] uppercase tracking-[0.15em] hover:bg-brand-600 transition-all active:scale-[0.97] shadow-2xl shadow-brand/30 mt-2"
                >
                  QUERO TESTAR AGORA
                </button>
              </form>
            </>
          ) : (
            /* Tela de Sucesso Responsiva */
            <div className="animate-in fade-in zoom-in-95 duration-500 py-4 w-full">
              <div className="w-16 h-16 md:w-20 md:h-20 bg-[#f0fdf4] text-[#22c55e] rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8 border border-[#dcfce7] shadow-sm">
                <Check size={32} className="md:w-10 md:h-10" strokeWidth={3} />
              </div>
              
              <h3 className="text-xl md:text-3xl font-[800] text-gray-900 tracking-tight mb-3">
                Sucesso!
              </h3>
              
              <p className="text-sm md:text-base text-slate-500 font-medium leading-relaxed max-w-[260px] mx-auto mb-8 md:mb-10">
                Seu teste gratuito foi solicitado.
              </p>

              <button
                onClick={handleClose}
                className="w-full bg-brand text-white py-4 rounded-[20px] md:rounded-[24px] font-bold text-sm hover:bg-brand-600 transition-all active:scale-[0.95] shadow-lg shadow-brand/20"
              >
                Continuar Navegando
              </button>
            </div>
          )}
        </div>

        {!isSubmitted && (
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-brand/5 rounded-full blur-3xl -z-0 pointer-events-none"></div>
        )}
      </div>
    </div>
  );
};

export default SalesPopup;
