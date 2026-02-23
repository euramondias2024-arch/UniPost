import React from 'react';
import { Share2, BarChart3, Clock, Zap, Smartphone, Users } from 'lucide-react';
import { Feature } from '../types';

const features: Feature[] = [
  {
    title: "Postagem Multiplataforma",
    description: "Escreva uma vez, personalize para cada rede e publique. Nós cuidamos da formatação automaticamente.",
    icon: <Share2 className="text-white" size={24} />,
  },
  {
    title: "Agendamento Inteligente",
    description: "Nossa IA analisa quando seu público está mais ativo e sugere o horário perfeito para postar.",
    icon: <Clock className="text-white" size={24} />,
  },
  {
    title: "Análises Unificadas",
    description: "Veja o desempenho de todo o seu conteúdo em todos os canais em um único painel intuitivo.",
    icon: <BarChart3 className="text-white" size={24} />,
  },
  {
    title: "Assistente de Conteúdo IA",
    description: "Travou na legenda? Deixe nossa IA integrada gerar textos envolventes e hashtags relevantes instantaneamente.",
    icon: <Zap className="text-white" size={24} />,
  },
  {
    title: "App Mobile",
    description: "Gerencie suas redes sociais de qualquer lugar. Funcionalidade completa disponível para iOS e Android.",
    icon: <Smartphone className="text-white" size={24} />,
  },
  {
    title: "Colaboração em Equipe",
    description: "Convide membros da equipe, atribua cargos e aprove rascunhos antes que eles entrem no ar.",
    icon: <Users className="text-white" size={24} />,
  },
];

const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-brand font-semibold tracking-wide uppercase text-sm mb-3">Recursos</h2>
          <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Tudo o que você precisa para crescer online.
          </h3>
          <p className="text-lg text-gray-500">
            O UniPost oferece um conjunto completo de ferramentas para criadores, profissionais de marketing e empresas dominarem as redes sociais.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300 group">
              <div className="w-12 h-12 bg-brand rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-md shadow-brand/20">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h4>
              <p className="text-gray-500 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;