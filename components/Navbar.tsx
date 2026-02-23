
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { LOGO_URL, NAV_LINKS, APP_NAME } from '../constants';
import { NavigationProps } from '../types';

const Navbar: React.FC<NavigationProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    if(element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
            <img className="h-10 w-auto rounded-lg" src={LOGO_URL} alt={APP_NAME} />
            <span className="font-bold text-2xl tracking-tight text-gray-900">{APP_NAME}</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="text-gray-600 hover:text-brand font-medium transition-colors"
              >
                {link.name}
              </button>
            ))}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => onNavigate('login')}
                className="text-gray-900 font-medium hover:text-brand transition-colors"
              >
                Login
              </button>
              <button 
                onClick={() => onNavigate('signup')}
                className="bg-brand text-white px-6 py-2.5 rounded-full font-medium hover:bg-brand-600 transition-all shadow-lg shadow-brand/20"
              >
                Teste Grátis
              </button>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-500 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-2">
            {NAV_LINKS.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.href)}
                className="block w-full text-left px-3 py-3 text-base font-medium text-gray-700 hover:text-brand hover:bg-gray-50 rounded-md"
              >
                {link.name}
              </button>
            ))}
            <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
              <button 
                onClick={() => { setIsOpen(false); onNavigate('login'); }}
                className="w-full text-center py-3 font-medium text-gray-700 hover:text-brand"
              >
                Login
              </button>
              <button 
                onClick={() => { setIsOpen(false); onNavigate('signup'); }}
                className="w-full bg-brand text-white py-3 rounded-lg font-medium shadow-md"
              >
                Teste Grátis
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
