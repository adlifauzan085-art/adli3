
import React from 'react';
import { PlaneIcon, Language, TRANSLATIONS } from '../constants';

interface NavbarProps {
  onLoginClick: () => void;
  language: Language;
  onLanguageChange: (lang: Language) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick, language, onLanguageChange }) => {
  const t = TRANSLATIONS[language].nav;

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300 px-3 md:px-4">
      <div className="max-w-7xl mx-auto pt-4 md:pt-6">
        <div className="glass-effect rounded-[1.8rem] md:rounded-[2.5rem] border border-white shadow-2xl px-5 md:px-10 flex justify-between items-center h-20 md:h-24">
          <div className="flex items-center space-x-2 md:space-x-4 group cursor-pointer">
            <div className="w-10 h-10 md:w-14 md:h-14 bg-gradient-to-tr from-sky-400 to-sky-600 rounded-xl md:rounded-[1.4rem] flex items-center justify-center text-white transition-transform duration-500 group-hover:rotate-12 shadow-xl shadow-sky-100">
              <PlaneIcon className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <span className="text-2xl md:text-3xl font-black tracking-tighter gradient-text">LeFlight</span>
          </div>
          
          <div className="hidden lg:flex space-x-12">
            {[t.flights, t.destinations, t.hotels, t.activities].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-slate-400 hover:text-sky-600 transition-all font-black text-[11px] uppercase tracking-[0.3em] relative group"
              >
                {item}
                <span className="absolute -bottom-2 left-0 w-0 h-1 bg-sky-400 rounded-full transition-all duration-300 group-hover:w-full"></span>
              </a>
            ))}
          </div>
          
          <div className="flex items-center space-x-2 md:space-x-4">
            {/* Language Switcher */}
            <div className="flex items-center bg-sky-50 p-1 rounded-xl mr-2 md:mr-4 border border-sky-100 shadow-inner">
              <button 
                onClick={() => onLanguageChange('id')}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all ${language === 'id' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-400 hover:text-sky-400'}`}
              >
                ID
              </button>
              <button 
                onClick={() => onLanguageChange('en')}
                className={`px-3 py-1.5 rounded-lg text-[9px] font-black transition-all ${language === 'en' ? 'bg-white text-sky-600 shadow-sm' : 'text-slate-400 hover:text-sky-400'}`}
              >
                EN
              </button>
            </div>

            <button 
              onClick={onLoginClick}
              className="text-slate-400 hover:text-sky-600 font-black px-2 md:px-4 py-2 transition-colors text-[10px] md:text-sm uppercase tracking-widest hidden sm:block"
            >
              {t.login}
            </button>
            <button 
              onClick={onLoginClick}
              className="colorful-btn text-white font-black px-5 md:px-10 py-2.5 md:py-3.5 rounded-xl md:rounded-[1.5rem] transition-all shadow-xl text-[9px] md:text-xs uppercase tracking-widest"
            >
              {t.start}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
