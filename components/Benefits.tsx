
import React from 'react';
import { Clock, Zap, TrendingUp, ShieldCheck } from 'lucide-react';

const benefits = [
  {
    title: "Economia de tempo real",
    description: "Centralize sua produção e ganhe até 10h semanais para focar na estratégia e criação de conteúdo de alto impacto.",
    icon: <Clock className="text-brand" size={20} />,
  },
  {
    title: "Consistência Estratégica",
    description: "Mantenha sua presença ativa 24/7. Nosso agendamento inteligente garante que seu público nunca seja esquecido.",
    icon: <Zap className="text-brand" size={20} />,
  },
  {
    title: "Escala de Audiência",
    description: "Multiplique seu alcance orgânico postando em múltiplos canais simultaneamente com adaptação automática.",
    icon: <TrendingUp className="text-brand" size={20} />,
  },
  {
    title: "Segurança Certificada",
    description: "Integração via APIs oficiais que garantem a proteção total dos seus dados e a integridade das suas contas.",
    icon: <ShieldCheck className="text-brand" size={20} />,
  }
];

const Benefits: React.FC = () => {
  return (
    <section className="py-24 bg-[#f8fafc] border-y border-gray-100/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
          
          {/* Lado Esquerdo: Identidade e Métricas */}
          <div className="lg:w-2/5 flex flex-col items-start">
            <div className="inline-block px-3 py-1 rounded-full bg-brand/5 border border-brand/10 mb-6">
              <span className="text-[10px] font-bold text-brand uppercase tracking-[0.2em]">Diferenciais de Produto</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8 tracking-tight leading-[1.1]">
              O que o UniPost <br /> faz por você?
            </h2>
            
            <p className="text-lg text-gray-500 font-medium mb-12 leading-relaxed max-w-md">
              Não somos apenas uma ferramenta de agendamento. Somos o seu parceiro estratégico para dominar o algoritmo e escalar sua presença digital sem atritos técnicos.
            </p>
            
            {/* Divisor e Métricas conforme imagem original */}
            <div className="w-full pt-10 border-t border-gray-200/60 flex items-center gap-12">
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-gray-900 tracking-tight">98%</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Satisfação</span>
              </div>
              <div className="flex flex-col">
                <span className="text-3xl font-extrabold text-gray-900 tracking-tight">+5M</span>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">Posts Enviados</span>
              </div>
            </div>
          </div>
          
          {/* Lado Direito: Grade de Benefícios Minimalista */}
          <div className="lg:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-16">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex flex-col items-start group">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 group-hover:border-brand/20 transition-all">
                  {benefit.icon}
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3 tracking-tight">
                  {benefit.title}
                </h4>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Benefits;
