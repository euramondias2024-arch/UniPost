
import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { PRICING_PLANS } from '../constants';
import { NavigationProps } from '../types';

const Pricing: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  const handleSubscribe = (plan: any) => {
    const productId = isAnnual ? plan.stripeProductIdAnnual : plan.stripeProductIdMonthly;
    const paymentLink = isAnnual ? plan.stripeLinkAnnual : plan.stripeLinkMonthly;

    console.log(`Iniciando assinatura do produto: ${productId} (${plan.name} - ${isAnnual ? 'Anual' : 'Mensal'})`);
    
    // Armazena temporariamente no navegador qual plano o usuário tentou assinar para simulação no dashboard
    localStorage.setItem('unipost_pending_plan', plan.name);
    localStorage.setItem('unipost_pending_type', isAnnual ? 'Anual' : 'Mensal');
    localStorage.setItem('unipost_stripe_prod_id', productId);
    
    // Por padrão, redirecionamos para o Payment Link da Stripe. 
    if (paymentLink) {
        window.open(paymentLink, '_blank');
    } else {
        alert(`Integração com ID ${productId} configurada. Redirecionando para checkout...`);
    }
  };

  return (
    <section id="pricing" className="py-24 bg-[#f8fafc] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">
            Preços simples e transparentes
          </h2>
          <p className="text-lg text-gray-500 mb-8 font-medium">
            Escolha o plano ideal para suas necessidades. Sem taxas escondidas.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4">
            <span className={`text-sm font-bold ${!isAnnual ? 'text-gray-900' : 'text-gray-400'}`}>Mensal</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="relative w-12 h-6 bg-brand/10 rounded-full p-1 transition-all duration-300 focus:outline-none"
              aria-label="Alternar entre faturamento mensal e anual"
            >
              <div className={`w-4 h-4 bg-brand rounded-full shadow-sm transition-all duration-300 transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${isAnnual ? 'text-gray-900' : 'text-gray-400'}`}>Anual</span>
              <span className="bg-green-100 text-green-600 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">
                45% OFF
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch mt-16">
          {PRICING_PLANS.map((plan, index) => (
            <div 
                key={index} 
                className={`relative bg-white rounded-3xl p-8 flex flex-col transition-all duration-300 border ${
                    plan.popular 
                    ? 'border-brand shadow-2xl scale-105 z-10' 
                    : 'border-gray-100 shadow-sm'
                }`}
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-brand text-white text-[10px] font-bold px-4 py-1.5 rounded-full shadow-lg uppercase tracking-wider">
                  Mais Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-400 text-xs font-medium leading-relaxed mb-8 h-10">{plan.description}</p>
                
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="text-lg font-bold text-gray-900">R$</span>
                    <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
                        {isAnnual ? plan.annualPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-400 font-medium text-sm ml-1">/mês</span>
                  </div>
                  {isAnnual && (
                    <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-tighter">
                        ou R$ {plan.annualTotal}/ano
                    </p>
                  )}
                </div>
              </div>

              <ul className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <div className="bg-brand/10 p-1 rounded-full mr-3 shrink-0">
                        <Check className="text-brand" size={12} strokeWidth={3} />
                    </div>
                    <span className="text-gray-600 font-medium text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              <button 
                onClick={() => handleSubscribe(plan)}
                className={`w-full py-4 rounded-xl font-bold text-sm transition-all active:scale-[0.98] ${
                    plan.popular
                    ? 'bg-brand text-white hover:bg-brand-600 shadow-xl shadow-brand/20'
                    : 'bg-brand/10 text-brand hover:bg-brand/20'
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
