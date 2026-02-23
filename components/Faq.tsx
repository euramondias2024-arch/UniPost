
import React, { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Como o UniPost gerencia as postagens em múltiplas redes?",
    answer: "Utilizamos as APIs oficiais de cada plataforma. Ao fazer o upload, você pode pré-visualizar como o post ficará em cada rede. Nosso sistema adapta legendas e formatos automaticamente para garantir o melhor engajamento possível."
  },
  {
    question: "O aplicativo é gratuito ou possui período de teste?",
    answer: "Sim! Oferecemos 14 dias de teste gratuito com acesso total ao plano Pro. Após o período, você pode escolher o plano que melhor se adapta ao seu volume de conteúdo, começando pelo plano Iniciante."
  },
  {
    question: "Posso adicionar várias contas de uma mesma rede social?",
    answer: "Com certeza. No plano Pro e Agência, você pode gerenciar múltiplas contas do Instagram, TikTok ou qualquer outra rede, facilitando a vida de quem gerencia diversos clientes ou nichos."
  },
  {
    question: "Funciona para Reels, TikTok e YouTube Shorts simultaneamente?",
    answer: "Sim, essa é a nossa especialidade. Você sobe um vídeo curto uma única vez e o UniPost o distribui como Reels no Instagram/Facebook, vídeo no TikTok e Shorts no YouTube de forma nativa."
  },
  {
    question: "O agendamento é seguro e confiável?",
    answer: "Totalmente. Como parceiros oficiais das redes, o agendamento ocorre diretamente nos servidores das plataformas, garantindo que seu post entre no ar exatamente no horário escolhido, sem atrasos."
  }
];

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-white border-t border-gray-100">
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Perguntas Frequentes
          </h2>
          <p className="text-gray-500 font-medium">
            Tire suas dúvidas sobre o UniPost e comece a economizar tempo hoje mesmo.
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border rounded-2xl transition-all duration-300 ${
                openIndex === index 
                ? 'border-brand/30 bg-brand/[0.02] shadow-sm' 
                : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              <button
                className="w-full px-8 py-6 text-left flex justify-between items-center focus:outline-none group"
                onClick={() => toggleFaq(index)}
              >
                <span className={`font-bold text-[15px] md:text-base transition-colors duration-300 ${
                  openIndex === index ? 'text-brand' : 'text-gray-700 group-hover:text-gray-900'
                }`}>
                  {faq.question}
                </span>
                <div className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180 text-brand' : 'text-gray-400'}`}>
                   {openIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              
              <div 
                className={`px-8 transition-all duration-300 ease-in-out overflow-hidden ${
                  openIndex === index ? 'max-h-[500px] opacity-100 pb-8' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="pt-2 border-t border-gray-100/50 mt-1">
                  <p className="text-gray-500 text-sm md:text-[15px] leading-relaxed pt-5 font-medium">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
