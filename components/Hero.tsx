
import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { NavigationProps } from '../types';

const Hero: React.FC<NavigationProps> = ({ onNavigate }) => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        
        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-8 leading-[1.1]">
          Um Post. <br className="hidden md:block" />
          <span className="text-brand">Em Todo Lugar.</span>
        </h1>

        {/* Subheadline */}
        <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500 mb-10 leading-relaxed">
          Pare de alternar entre aplicativos. Crie, agende e publique conteúdo no Instagram, TikTok, LinkedIn, Twitter e Facebook simultaneamente.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
          <button 
            onClick={() => onNavigate('signup')}
            className="flex items-center justify-center gap-2 bg-brand text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-brand-600 transition-all shadow-xl shadow-brand/25 transform hover:-translate-y-1"
          >
            Teste Grátis <ArrowRight size={20} />
          </button>
          <button className="flex items-center justify-center gap-2 bg-white text-gray-700 border border-gray-200 px-8 py-4 rounded-full text-lg font-medium hover:bg-gray-50 hover:border-gray-300 transition-all">
            Ver Demonstração
          </button>
        </div>

        {/* Trust Indicators */}
        <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-gray-500 font-medium">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-brand" /> 7 dias grátis
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-brand" /> Cancele quando quiser
          </div>
        </div>

        {/* Abstract UI Representation */}
        <div className="mt-20 relative mx-auto max-w-5xl">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand to-blue-300 rounded-2xl blur opacity-20"></div>
            
            <div className="relative bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden aspect-[16/9] flex flex-col">
                <div className="h-12 border-b border-gray-100 bg-gray-50 flex items-center px-4 gap-2">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-400"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400"></div>
                    </div>
                    <div className="ml-4 h-6 w-64 bg-gray-200 rounded-md"></div>
                </div>
                <div className="flex-1 flex">
                    <div className="w-16 md:w-64 border-r border-gray-100 p-4 hidden md:flex flex-col gap-4">
                         <div className="h-10 w-full bg-brand-50 rounded-lg flex items-center px-3 gap-3">
                            <div className="w-5 h-5 bg-brand rounded"></div>
                            <div className="w-20 h-3 bg-brand-200 rounded"></div>
                         </div>
                         <div className="h-10 w-full hover:bg-gray-50 rounded-lg flex items-center px-3 gap-3">
                            <div className="w-5 h-5 bg-gray-300 rounded"></div>
                            <div className="w-24 h-3 bg-gray-200 rounded"></div>
                         </div>
                    </div>
                    <div className="flex-1 p-6 md:p-10 bg-gray-50/50 flex flex-col items-center justify-center">
                        <div className="w-full max-w-2xl bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                            <div className="flex gap-4 mb-4">
                                <div className="w-12 h-12 bg-gray-200 rounded-full shrink-0"></div>
                                <div className="space-y-2 w-full">
                                    <div className="w-1/3 h-4 bg-gray-200 rounded"></div>
                                    <div className="w-1/4 h-3 bg-gray-100 rounded"></div>
                                </div>
                            </div>
                            <div className="w-full h-64 bg-gray-100 rounded-lg mb-6 flex items-center justify-center text-gray-300 font-medium">
                                Prévia do Post
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-100 pt-4">
                                <div className="flex -space-x-2">
                                     <div className="w-8 h-8 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-[10px] text-white">f</div>
                                     <div className="w-8 h-8 rounded-full bg-pink-600 border-2 border-white flex items-center justify-center text-[10px] text-white">Ig</div>
                                     <div className="w-8 h-8 rounded-full bg-sky-500 border-2 border-white flex items-center justify-center text-[10px] text-white">X</div>
                                </div>
                                <button className="bg-brand text-white px-6 py-2 rounded-lg text-sm font-medium">Postar Agora</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
