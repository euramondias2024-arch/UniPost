
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import WhyChooseUs from './components/WhyChooseUs';
import Pricing from './components/Pricing';
import Faq from './components/Faq';
import Footer from './components/Footer';
import Testimonials from './components/Testimonials';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import SalesPopup from './components/SalesPopup';
import { ViewState } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  // Lógica para detectar retorno da Stripe
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const isSuccess = urlParams.get('success') === 'true';

    if (isSuccess) {
      // Marcamos que o pagamento foi concluído
      localStorage.setItem('unipost_payment_status', 'completed');
      
      const userSession = localStorage.getItem('unipost_user_session');
      
      if (userSession) {
        // Se já tem conta e está logado, vai direto pro Dashboard
        // E ativa o plano que estava pendente
        const pendingPlan = localStorage.getItem('unipost_pending_plan');
        if (pendingPlan) {
          localStorage.setItem('unipost_active_plan', pendingPlan);
        }
        setCurrentView('dashboard');
      } else {
        // Se não tem conta ou não está logado, vai para Cadastre-se
        setCurrentView('signup');
      }
      
      // Limpa a URL para não ficar processando o sucesso toda vez que der refresh
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  const renderView = () => {
    switch (currentView) {
        case 'login':
            return <Login onNavigate={setCurrentView} />;
        case 'signup':
            return <Signup onNavigate={setCurrentView} />;
        case 'dashboard':
            return <Dashboard onNavigate={setCurrentView} />;
        case 'forgot-password':
            return <ForgotPassword onNavigate={setCurrentView} />;
        case 'reset-password':
            return <ResetPassword onNavigate={setCurrentView} />;
        case 'landing':
        default:
            return (
                <div className="min-h-screen bg-white text-gray-900">
                    <Navbar onNavigate={setCurrentView} />
                    <SalesPopup />
                    <main>
                        <Hero onNavigate={setCurrentView} />
                        <Features />
                        <HowItWorks />
                        <Benefits />
                        <WhyChooseUs />
                        <Pricing onNavigate={setCurrentView} />
                        <Testimonials />
                        <Faq />
                    </main>
                    <Footer />
                </div>
            );
    }
  };

  return (
    <>
        {renderView()}
    </>
  );
};

export default App;
