
import React, { useState } from 'react';
import { PlaneIcon, Language, TRANSLATIONS } from '../constants';

interface LoginGatewayProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const LoginGateway: React.FC<LoginGatewayProps> = ({ isOpen, onClose, language }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const t = TRANSLATIONS[language].login;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const actionMsg = isLogin 
      ? (language === 'id' ? "Mencoba masuk..." : "Trying to login...") 
      : (language === 'id' ? "Mendaftarkan..." : "Registering...");
    alert(actionMsg);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[3000] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-sky-900/20 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out]" onClick={onClose}></div>

      <div className="relative w-full max-w-[450px] bg-white/90 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border border-white overflow-hidden animate-[scaleIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600"></div>

        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-gradient-to-tr from-sky-500 to-sky-600 rounded-[1.4rem] flex items-center justify-center text-white shadow-xl mb-6">
              <PlaneIcon className="w-8 h-8" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">
              {isLogin ? t.welcome : t.join}
            </h2>
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] text-center">
              {isLogin ? t.subLogin : t.subJoin}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.email}</label>
              <input 
                type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@email.com"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none transition-all font-bold text-slate-700 text-sm" required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.pass}</label>
                {isLogin && <a href="#" className="text-[10px] font-black text-sky-500">{t.forgot}</a>}
              </div>
              <input 
                type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••"
                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl outline-none transition-all font-bold text-slate-700 text-sm" required
              />
            </div>

            <button type="submit" className="w-full py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-black rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-xs uppercase tracking-widest">
              {isLogin ? t.btnIn : t.btnUp}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-slate-400 text-xs font-medium">
              {isLogin ? t.noAccount : t.haveAccount}{" "}
              <button onClick={() => setIsLogin(!isLogin)} className="text-sky-600 font-black hover:underline underline-offset-4">
                {isLogin ? t.reg : t.log}
              </button>
            </p>
          </div>
        </div>
        <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400">✕</button>
      </div>
    </div>
  );
};

export default LoginGateway;
