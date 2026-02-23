
import React from 'react';
import { Link2, Layout, CalendarCheck, TrendingUp } from 'lucide-react';

const steps = [
  {
    title: "Conecte suas Redes",
    description: "Vincule seus perfis do Instagram, TikTok, LinkedIn, Facebook e Twitter em poucos segundos com segurança.",
    icon: <Link2 className="text-brand" size={28} />,
  },
  {
    title: "Crie sua Postagem",
    description: "Escreva sua legenda e adicione mídia. Use nossa IA para otimizar textos e hashtags para cada plataforma.",
    icon: <Layout className="text-brand" size={28} />,
  },
  {
    title: "Agende ou Publique",
    description: "Visualize como o post ficará em cada rede e escolha postar agora ou agendar para o horário de maior pico.",
    icon: <CalendarCheck className="text-brand" size={28} />,
  },
  {
    title: "Analise os Resultados",
    description: "Acompanhe o engajamento e o crescimento de todas as suas contas em um painel unificado e simples.",
    icon: <TrendingUp className="text-brand" size={28} />,
  },
];

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-brand font-bold tracking-widest uppercase text-[10px] mb-4">Passo a Passo</h2>
          <h3 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 tracking-tight">
            Como Funciona o UniPost
          </h3>
          <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed px-4">
            Gerenciar sua presença digital nunca foi tão simples. Siga estes 4 passos e domine a internet.
          </p>
        </div>

        <div className="relative">
          {/* A linha conectora foi removida conforme solicitado */}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16 relative z-10">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center group">
                {/* Icon Container */}
                <div className="relative mb-8">
                  <div className="w-20 h-20 bg-white border border-gray-100 rounded-3xl flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-300">
                    {step.icon}
                  </div>
                  {/* Number Badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-brand text-white rounded-lg flex items-center justify-center font-bold text-xs shadow-lg ring-4 ring-white">
                    {index + 1}
                  </div>
                </div>

                {/* Content */}
                <div className="relative w-full">
                   {/* Decorative horizontal line behind title (optional, matching image look) */}
                   <div className="absolute top-1/2 left-0 w-full h-px bg-gray-50 -z-10"></div>
                   <h4 className="text-lg font-bold text-gray-900 mb-4 bg-white inline-px px-4">
                     {step.title}
                   </h4>
                </div>
                
                <p className="text-gray-400 text-sm leading-relaxed px-4 font-medium">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
