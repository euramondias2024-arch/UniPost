import React from 'react';
import { APP_NAME, LOGO_URL } from '../constants';
import { Twitter, Instagram, Linkedin, Facebook } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src={LOGO_URL} alt={APP_NAME} className="h-8 w-auto rounded-md" />
              <span className="font-bold text-xl text-gray-900">{APP_NAME}</span>
            </div>
            <p className="text-gray-500 text-sm leading-relaxed mb-6">
              A maneira mais fácil de gerenciar sua presença nas redes sociais. Agende, analise e cresça.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-brand transition-colors"><Twitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand transition-colors"><Instagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand transition-colors"><Linkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-brand transition-colors"><Facebook size={20} /></a>
            </div>
          </div>

          {/* Links Columns */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Produto</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand">Recursos</a></li>
              <li><a href="#" className="hover:text-brand">Integrações</a></li>
              <li><a href="#" className="hover:text-brand">Preços</a></li>
              <li><a href="#" className="hover:text-brand">Novidades</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Recursos</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand">Documentação</a></li>
              <li><a href="#" className="hover:text-brand">API</a></li>
              <li><a href="#" className="hover:text-brand">Comunidade</a></li>
              <li><a href="#" className="hover:text-brand">Blog</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Empresa</h4>
            <ul className="space-y-3 text-sm text-gray-500">
              <li><a href="#" className="hover:text-brand">Sobre Nós</a></li>
              <li><a href="#" className="hover:text-brand">Carreiras</a></li>
              <li><a href="#" className="hover:text-brand">Legal</a></li>
              <li><a href="#" className="hover:text-brand">Contato</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} {APP_NAME} Inc. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6 text-sm text-gray-400">
            <a href="#" className="hover:text-gray-900">Política de Privacidade</a>
            <a href="#" className="hover:text-gray-900">Termos de Serviço</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;