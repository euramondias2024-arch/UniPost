
import React from 'react';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Ricardo M.",
    role: "Crossfit Athlete",
    text: "Eu odiava ter que postar manualmente em cada rede. Com o UniPost é só subir o vídeo uma vez e pronto, ele vai para Reels, TikTok e Shorts simultaneamente.",
    avatar: "https://i.pravatar.cc/150?u=ricardo"
  },
  {
    name: "Ana Souza",
    role: "Social Media",
    text: "Recomendo para todos os meus clientes. A barreira de entrada para manter a consistência em várias redes desapareceu com essa ferramenta. O design é muito intuitivo.",
    avatar: "https://i.pravatar.cc/150?u=ana"
  },
  {
    name: "Pedro H.",
    role: "Criador de Conteúdo",
    text: "A precisão no agendamento é fundamental para minha estratégia. O UniPost identifica até os melhores horários para cada rede individualmente. Essencial para quem quer escala.",
    avatar: "https://i.pravatar.cc/150?u=pedro"
  },
  {
    name: "Juliana Costa",
    role: "Influenciadora Fitness",
    text: "A simplicidade do aplicativo é o que me conquistou. Sem menus complicados, apenas um upload e o resultado em todas as plataformas. Me ajuda a manter o foco no que importa.",
    avatar: "https://i.pravatar.cc/150?u=juliana"
  },
  {
    name: "Marcos Silva",
    role: "Empreendedor Digital",
    text: "Para quem escala múltiplos canais, o UniPost é crucial. Ele facilitou muito meu planejamento de lançamentos sem o estresse de postagens manuais e erros de rede.",
    avatar: "https://i.pravatar.cc/150?u=marcos"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Veja o que nossos usuários estão dizendo
          </h2>
        </div>
        
        <div className="flex flex-col gap-8">
          {/* Linha Superior: 3 Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {testimonials.slice(0, 3).map((t, i) => (
              /* Fix: Passing props correctly to TestimonialCard which now uses React.FC */
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
          
          {/* Linha Inferior: 2 Cards Centralizados */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto w-full">
            {testimonials.slice(3, 5).map((t, i) => (
              /* Fix: Passing props correctly to TestimonialCard which now uses React.FC */
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* Fix: Define an interface for TestimonialCard props */
interface TestimonialCardProps {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

/* Fix: Use React.FC to properly handle React internal props like 'key' */
const TestimonialCard: React.FC<TestimonialCardProps> = ({ name, role, text, avatar }) => (
  <div className="bg-white p-8 md:p-10 rounded-[40px] border border-gray-100/60 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col h-full group">
    <div className="flex gap-1 mb-6">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star key={star} size={16} className="fill-yellow-400 text-yellow-400" />
      ))}
    </div>
    <p className="text-gray-600 text-[15px] md:text-base leading-relaxed mb-10 flex-1 font-medium italic">
      "{text}"
    </p>
    <div className="flex items-center gap-4 pt-6 border-t border-gray-50 mt-auto">
      <div className="relative">
        <div className="absolute -inset-1 bg-gradient-to-r from-brand/20 to-blue-200 rounded-full blur-sm opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <img src={avatar} className="relative w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" alt={name} />
      </div>
      <div>
        <p className="font-bold text-gray-900 text-sm tracking-tight">{name}</p>
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">{role}</p>
      </div>
    </div>
  </div>
);

export default Testimonials;
