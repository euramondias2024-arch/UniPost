
import React from 'react';
import { ShieldCheck, MousePointer2, Clock, BarChart4 } from 'lucide-react';

const reasons = [
  {
    title: "APIs Oficiais das Plataformas",
    description: "Conecte Instagram, Facebook e TikTok com total segurança usando apenas APIs oficiais.",
    icon: <ShieldCheck className="text-brand" size={20} />,
  },
  {
    title: "Fluxo Simples e Intuitivo",
    description: "Crie, agende e publique conteúdos em poucos cliques, sem curva de aprendizado.",
    icon: <MousePointer2 className="text-brand" size={20} />,
  },
  {
    title: "Foco em Produtividade",
    description: "Centralize todas as suas redes em um único painel e ganhe tempo todos os dias.",
    icon: <Clock className="text-brand" size={20} />,
  },
  {
    title: "Pronto para Crescer",
    description: "Ideal para criadores, negócios e agências que querem escalar sua presença digital.",
    icon: <BarChart4 className="text-brand" size={20} />,
  }
];

const WhyChooseUs: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header profissional e limpo */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
            Por que o UniPost é diferente?
          </h2>
          <p className="text-lg text-gray-500 font-medium leading-relaxed">
            Uma plataforma pensada para criadores, profissionais e equipes que buscam simplicidade, segurança e escala.
          </p>
        </div>

        {/* Grid minimalista de diferenciais */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {reasons.map((reason, index) => (
            <div key={index} className="flex flex-col items-start">
              <div className="w-10 h-10 bg-brand/5 rounded-lg flex items-center justify-center mb-5">
                {reason.icon}
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">
                {reason.title}
              </h4>
              <p className="text-gray-500 text-sm leading-relaxed font-medium">
                {reason.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
