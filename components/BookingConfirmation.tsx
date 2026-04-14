
import React from 'react';
import { Flight } from '../types';
import { PlaneIcon, Language, TRANSLATIONS } from '../constants';

interface BookingConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  flight: Flight | null;
  language: Language;
}

const BookingConfirmation: React.FC<BookingConfirmationProps> = ({ isOpen, onClose, onConfirm, flight, language }) => {
  const t = TRANSLATIONS[language].confirm;

  if (!isOpen || !flight) return null;

  return (
    <div className="fixed inset-0 z-[4000] flex items-center justify-center p-4 md:p-6">
      <div className="absolute inset-0 bg-sky-900/30 backdrop-blur-xl animate-[fadeIn_0.3s_ease-out]" onClick={onClose}></div>

      <div className="relative w-full max-w-[500px] bg-white/95 backdrop-blur-2xl rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border border-white overflow-hidden animate-[scaleIn_0.4s_cubic-bezier(0.34,1.56,0.64,1)]">
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-sky-400 via-blue-500 to-sky-600"></div>

        <div className="p-8 md:p-12">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-sky-50 rounded-[2rem] flex items-center justify-center text-sky-500 mb-6 shadow-inner">
              <PlaneIcon className="w-10 h-10 rotate-45" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter text-center">{t.title}</h2>
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mt-2">{t.sub}</p>
          </div>

          <div className="bg-sky-50/50 rounded-3xl p-6 border border-sky-100 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-black text-sky-600 uppercase tracking-widest">{flight.airline}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{flight.status}</span>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <div className="text-left">
                <p className="text-2xl font-black text-slate-800 tracking-tighter">{flight.departureTime}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{flight.from}</p>
              </div>
              <div className="flex-1 flex flex-col items-center px-4">
                <PlaneIcon className="w-4 h-4 text-sky-400 rotate-90" />
                <div className="w-full h-px bg-sky-200 mt-2"></div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-black text-slate-800 tracking-tighter">{flight.arrivalTime}</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase">{flight.to}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-sky-100 flex justify-between items-center">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.pay}</p>
              <p className="text-2xl font-black text-sky-600">${flight.price}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={onClose} className="py-4 bg-slate-50 text-slate-400 font-black rounded-2xl hover:bg-slate-100 transition-all text-[11px] uppercase tracking-widest">
              {t.cancel}
            </button>
            <button onClick={onConfirm} className="py-4 bg-gradient-to-r from-sky-500 to-sky-600 text-white font-black rounded-2xl shadow-xl hover:scale-[1.02] active:scale-95 transition-all text-[11px] uppercase tracking-widest">
              {t.yes}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
