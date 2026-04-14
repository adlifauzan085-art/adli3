
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import IntroAnimation from './components/IntroAnimation';
import FlightCard from './components/FlightCard';
import FlightGame from './components/FlightGame';
import CustomerService from './components/CustomerService';
import LoginGateway from './components/LoginGateway';
import BookingConfirmation from './components/BookingConfirmation';
import { DESTINATIONS, PlaneIcon, TRENDING_FLIGHTS, Language, TRANSLATIONS } from './constants';
import { Flight, SearchParams } from './types';
import { getTravelSuggestions, searchFlightsAI } from './services/geminiService';

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('id');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const [searchParams, setSearchParams] = useState<SearchParams>({
    origin: 'Jakarta (CGK)',
    destination: '',
    date: new Date().toISOString().split('T')[0],
    passengers: 1,
    class: 'Economy'
  });
  const [flights, setFlights] = useState<Flight[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [aiMessage, setAiMessage] = useState<string>('');
  const [isTypingAI, setIsTypingAI] = useState(false);

  const t = TRANSLATIONS[language];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchParams.destination) return;
    
    setIsLoading(true);
    setHasSearched(true);
    
    const results = await searchFlightsAI(searchParams.origin, searchParams.destination, language);
    
    const mockResults: Flight[] = results.length > 0 ? results.map((r: any) => ({
      ...r,
      from: searchParams.origin.split(' ')[0],
      to: searchParams.destination.split(' ')[0],
    })) : [
      {
        id: '1',
        airline: 'SkyHigh Airways',
        logo: '✈️',
        departureTime: '08:00',
        arrivalTime: '11:30',
        duration: '3h 30m',
        from: searchParams.origin.split(' ')[0],
        to: searchParams.destination.split(' ')[0],
        price: 120,
        stops: 0,
        status: language === 'id' ? 'Tepat Waktu' : 'On Time'
      },
      {
        id: '2',
        airline: 'Azure Wings',
        logo: '☁️',
        departureTime: '13:45',
        arrivalTime: '18:15',
        duration: '4h 30m',
        from: searchParams.origin.split(' ')[0],
        to: searchParams.destination.split(' ')[0],
        price: 95,
        stops: 1,
        status: language === 'id' ? 'Terlambat' : 'Delayed'
      }
    ];

    setTimeout(() => {
      setFlights(mockResults);
      setIsLoading(false);
      handleAIGreeting();
    }, 2000);
  };

  const handleAIGreeting = async () => {
    setIsTypingAI(true);
    const msg = await getTravelSuggestions(`I just searched for a flight to ${searchParams.destination}. Tell me something nice about it.`, language);
    setAiMessage(msg || '');
    setIsTypingAI(false);
  };

  const handleBookingClick = (flight: Flight) => {
    setSelectedFlight(flight);
    setIsBookingOpen(true);
  };

  const handleConfirmBooking = () => {
    setIsBookingOpen(false);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      const successMsg = language === 'id' 
        ? `Berhasil! Tiket Anda ke ${selectedFlight?.to} sedang diproses. Silakan cek email Anda.`
        : `Success! Your ticket to ${selectedFlight?.to} is being processed. Please check your email.`;
      alert(successMsg);
      setSelectedFlight(null);
    }, 2000);
  };

  return (
    <div className="min-h-screen pb-10 selection:bg-blue-100 selection:text-blue-900 overflow-x-hidden">
      <IntroAnimation />
      <Navbar 
        onLoginClick={() => setIsLoginOpen(true)} 
        language={language} 
        onLanguageChange={setLanguage} 
      />
      
      {isLoading && (
        <LoadingScreen 
          message={isBookingOpen 
            ? (language === 'id' ? "Sedang memproses tiket Anda..." : "Processing your ticket...") 
            : (language === 'id' ? "Mempersiapkan penerbangan Anda..." : "Preparing your flight...")
          } 
        />
      )}
      
      <LoginGateway 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)} 
        language={language}
      />
      
      <BookingConfirmation 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        onConfirm={handleConfirmBooking}
        flight={selectedFlight}
        language={language}
      />

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[40rem] md:w-[60rem] h-[40rem] md:h-[60rem] bg-sky-200/40 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] animate-pulse"></div>
        <div className="absolute top-1/4 -left-40 w-[30rem] md:w-[45rem] h-[30rem] md:h-[45rem] bg-blue-100/30 rounded-full mix-blend-multiply filter blur-[80px] md:blur-[120px] animate-[pulse_8s_infinite]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[25rem] md:w-[35rem] h-[25rem] md:h-[35rem] bg-white rounded-full mix-blend-overlay filter blur-[70px] md:blur-[100px]"></div>
      </div>

      <main className="relative z-10 pt-32 md:pt-44">
        <div className="max-w-6xl mx-auto px-4 md:px-6 pb-12 md:pb-20">
          <div className="text-center mb-10 md:mb-16 space-y-4 md:space-y-6">
             <div className="inline-flex items-center px-4 py-1.5 bg-white/70 backdrop-blur-md rounded-full border border-blue-100 shadow-sm text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2 md:mb-4 animate-pulse-soft">
               {t.hero.tag}
             </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter leading-[1] md:leading-[0.9] mb-4 md:mb-8">
              {t.hero.title} <br/> 
              <span className="gradient-text">{t.hero.subtitle}</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed px-4 md:px-0">
              {t.hero.desc}
            </p>
          </div>

          <div className="p-1 md:p-1.5 bg-gradient-to-br from-white/90 via-sky-50/50 to-white/90 rounded-[2.5rem] md:rounded-[3.5rem] shadow-2xl border border-white mb-12 md:20">
            <div className="glass-effect rounded-[2.3rem] md:rounded-[3.3rem] p-6 md:p-12">
              <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-10">
                <div className="space-y-2 md:space-y-4">
                  <label className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 flex items-center">
                    <span className="w-1.5 h-1.5 bg-sky-400 rounded-full mr-2 md:mr-3 shadow-sm shadow-sky-200"></span> {t.search.from}
                  </label>
                  <div className="relative group">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl group-focus-within:scale-110 transition-transform">🏙️</span>
                    <input 
                      type="text" 
                      value={searchParams.origin}
                      onChange={(e) => setSearchParams({...searchParams, origin: e.target.value})}
                      placeholder={t.search.placeholderOrigin}
                      className="w-full pl-14 pr-6 py-4 md:py-5 bg-white/50 rounded-2xl md:rounded-3xl border border-blue-50 focus:bg-white focus:ring-4 focus:ring-sky-100/50 outline-none transition-all font-bold text-slate-700 text-sm md:text-base"
                    />
                  </div>
                </div>

                <div className="space-y-2 md:space-y-4">
                  <label className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-300 rounded-full mr-2 md:mr-3 shadow-sm shadow-blue-200"></span> {t.search.to}
                  </label>
                  <div className="relative group">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl group-focus-within:scale-110 transition-transform">🏖️</span>
                    <input 
                      type="text" 
                      value={searchParams.destination}
                      onChange={(e) => setSearchParams({...searchParams, destination: e.target.value})}
                      placeholder={t.search.placeholderDest}
                      className="w-full pl-14 pr-6 py-4 md:py-5 bg-white/50 rounded-2xl md:rounded-3xl border border-blue-50 focus:bg-white focus:ring-4 focus:ring-sky-100/50 outline-none transition-all font-bold text-slate-700 text-sm md:text-base"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2 md:space-y-4">
                  <label className="text-[10px] md:text-[11px] font-black text-slate-400 uppercase tracking-[0.3em] ml-2 flex items-center">
                    <span className="w-1.5 h-1.5 bg-sky-200 rounded-full mr-2 md:mr-3 shadow-sm shadow-sky-100"></span> {t.search.date}
                  </label>
                  <div className="relative">
                    <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">📅</span>
                    <input 
                      type="date" 
                      value={searchParams.date}
                      onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
                      className="w-full pl-14 pr-6 py-4 md:py-5 bg-white/50 rounded-2xl md:rounded-3xl border border-blue-50 focus:bg-white focus:ring-4 focus:ring-sky-100/50 outline-none transition-all font-bold text-slate-700 text-sm md:text-base"
                    />
                  </div>
                </div>

                <div className="flex items-end">
                  <button 
                    type="submit"
                    className="w-full colorful-btn text-white font-black py-4 md:py-5 rounded-2xl md:rounded-3xl shadow-xl flex items-center justify-center space-x-3 md:space-x-4 active:scale-95 text-base md:text-lg"
                  >
                    <PlaneIcon className="w-6 h-6 md:w-7 md:h-7 rotate-45" />
                    <span>{t.search.btn}</span>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {!hasSearched && (
            <div className="animate-[fadeIn_1s_ease-out]">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 px-2 md:px-4 space-y-2 md:space-y-0">
                <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight flex items-center">
                  <span className="w-1.5 h-6 md:h-8 bg-sky-500 rounded-full mr-3 md:mr-4 shadow-lg shadow-sky-200"></span>
                  {t.trending.title}
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.trending.live}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                {TRENDING_FLIGHTS.map((tf) => (
                  <div key={tf.id} className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-7 border border-blue-50 shadow-sm hover:shadow-2xl transition-all group overflow-hidden relative">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-full -mr-12 -mt-12 group-hover:scale-150 transition-transform"></div>
                    <div className="flex justify-between items-start mb-4 md:mb-6 relative">
                      <div className="px-2.5 py-1 bg-sky-50 text-sky-600 rounded-full text-[8px] md:text-[9px] font-black uppercase tracking-widest border border-sky-100">
                        {tf.status}
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">{tf.airline}</span>
                    </div>
                    <div className="flex items-center justify-between mb-6 md:mb-8 px-1 md:px-2 relative">
                      <div className="text-center">
                        <p className="text-[8px] font-black text-slate-300 mb-0.5 uppercase tracking-widest">{t.trending.from}</p>
                        <p className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter">{tf.from}</p>
                      </div>
                      <div className="flex-1 px-3 flex flex-col items-center">
                        <PlaneIcon className="w-3.5 h-3.5 text-sky-400 rotate-90" />
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent mt-1.5"></div>
                      </div>
                      <div className="text-center">
                        <p className="text-[8px] font-black text-slate-300 mb-0.5 uppercase tracking-widest">{t.trending.to}</p>
                        <p className="text-xl md:text-2xl font-black text-slate-800 tracking-tighter">{tf.to}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-blue-50 relative">
                      <div>
                        <p className="text-[9px] font-bold text-slate-400 uppercase">{t.trending.est}</p>
                        <p className="text-xl md:text-2xl font-black text-sky-600">${tf.price}</p>
                      </div>
                      <button className="px-4 py-2 bg-blue-50 text-blue-600 font-black rounded-lg md:rounded-xl text-[8px] md:text-[9px] uppercase tracking-widest hover:bg-sky-500 hover:text-white transition-all shadow-sm">
                        {t.trending.book}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="max-w-6xl mx-auto px-4 md:px-6 mt-8 md:mt-12">
          {!hasSearched ? (
            <div className="mb-20 md:mb-32">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 px-2 md:px-4 space-y-4 md:space-y-0">
                <div className="space-y-1 md:space-y-2">
                  <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight">{t.dest.title} <span className="text-sky-500">{t.dest.highlight}</span></h2>
                  <p className="text-sm md:text-base text-slate-400 font-medium">{t.dest.subtitle}</p>
                </div>
                <button className="text-blue-500 font-black hover:text-sky-600 uppercase tracking-[0.2em] text-[10px] md:text-[11px] px-5 py-3 md:px-6 md:py-3 bg-white rounded-xl md:rounded-2xl shadow-sm border border-blue-50 transition-all text-center">
                  {t.dest.catalog}
                </button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                {DESTINATIONS.map((dest) => (
                  <div key={dest.id} className="group relative h-[24rem] md:h-[30rem] rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl hover:shadow-[0_30px_60px_rgba(14,165,233,0.15)] transition-all duration-700 cursor-pointer border border-white">
                    <img 
                      src={dest.image} 
                      alt={dest.name} 
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                    <div className="absolute bottom-8 md:bottom-10 left-8 md:left-10 right-8 md:right-10 text-white transform group-hover:-translate-y-2 transition-transform duration-500">
                      <p className="text-[9px] md:text-[10px] font-black text-sky-300 mb-1.5 md:mb-2 uppercase tracking-[0.3em]">{dest.country}</p>
                      <h3 className="text-3xl md:text-4xl font-black mb-4 md:mb-6 leading-none tracking-tighter">{dest.name}</h3>
                      <div className="flex items-center justify-between pt-5 md:pt-6 border-t border-white/20">
                        <div>
                          <p className="text-[8px] font-bold text-white/50 uppercase tracking-widest mb-0.5 md:mb-1">{t.dest.startFrom}</p>
                          <p className="text-xl md:text-2xl font-black text-white">{dest.price}</p>
                        </div>
                        <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 backdrop-blur-md rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-white group-hover:text-sky-600 transition-all">
                          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 md:gap-12 pb-20 md:pb-32">
              <div className="flex-1 space-y-8 md:space-y-10">
                 <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-6 md:p-8 rounded-[2rem] md:rounded-[3rem] border border-blue-50 shadow-sm space-y-4 md:space-y-0">
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">{language === 'id' ? 'Opsi Penerbangan' : 'Flight Options'}</h3>
                    <p className="text-slate-400 font-medium text-xs md:text-sm">
                      {language === 'id' ? 'Menampilkan' : 'Showing'} <span className="text-sky-600 font-black">{flights.length}</span> {language === 'id' ? 'hasil terbaik' : 'best results'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-6 md:space-y-8 animate-[fadeIn_0.5s_ease-out]">
                  {flights.map((flight) => (
                    <FlightCard 
                      key={flight.id} 
                      flight={flight} 
                      onBookingClick={handleBookingClick}
                    />
                  ))}
                </div>
              </div>

              <div className="lg:w-[26rem]">
                <div className="sticky top-28 md:top-32 bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-8 md:p-10 shadow-2xl border border-blue-50 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full -mr-16 -mt-16 blur-3xl"></div>
                  <div className="flex items-center space-x-4 md:space-x-5 mb-6 md:mb-8 relative">
                    <div className="w-12 h-12 md:w-14 md:h-14 bg-gradient-to-tr from-sky-400 to-sky-600 rounded-2xl md:rounded-3xl flex items-center justify-center text-white text-xl md:text-2xl shadow-xl shadow-sky-100">
                      ✨
                    </div>
                    <div>
                      <h3 className="font-black text-slate-900 text-lg md:text-xl leading-none">{t.ai.title}</h3>
                      <p className="text-[9px] md:text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mt-1">{t.ai.tag}</p>
                    </div>
                  </div>
                  
                  <div className="text-xs md:text-sm text-slate-600 leading-relaxed bg-sky-50/50 p-6 md:p-8 rounded-[1.8rem] md:rounded-[2.5rem] mb-6 md:mb-8 relative border border-sky-100/50">
                    {isTypingAI ? (
                      <div className="flex space-x-2 py-4 justify-center">
                        <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                        <div className="w-2 h-2 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                      </div>
                    ) : (
                      <div className="prose prose-sm prose-sky font-medium">
                        {aiMessage || t.ai.placeholder}
                      </div>
                    )}
                  </div>
                  
                  <button className="w-full py-4 bg-white text-sky-600 font-black rounded-xl md:rounded-2xl border border-sky-100 hover:bg-sky-500 hover:text-white transition-all shadow-sm text-xs uppercase tracking-widest">
                    {t.ai.btn}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="bg-white border-t border-blue-50 text-slate-900 pt-20 md:pt-32 pb-12 md:pb-16 relative overflow-hidden mt-20 md:mt-32 px-4 md:px-0">
        <div className="max-w-6xl mx-auto relative z-10 text-center">
           <div className="flex items-center justify-center space-x-3 md:space-x-4 mb-8 md:mb-10 group cursor-pointer">
              <div className="w-12 h-12 md:w-14 md:h-14 bg-sky-500 rounded-2xl flex items-center justify-center text-white transition-transform group-hover:rotate-12">
                <PlaneIcon className="w-7 h-7 md:w-8 md:h-8" />
              </div>
              <span className="text-4xl md:text-5xl font-black tracking-tighter gradient-text">LeFlight</span>
            </div>
            <p className="text-slate-400 font-light text-base md:text-xl max-w-lg mx-auto mb-10 md:mb-16 leading-relaxed px-4 md:px-0">
              {language === 'id' 
                ? 'Kenyamanan langit biru dalam genggaman Anda. Kami mendefinisikan ulang kemewahan penerbangan modern.'
                : 'Blue sky comfort in your hands. We redefine the luxury of modern flight.'
              }
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-12 md:mb-16">
              {[t.nav.flights, t.nav.destinations, t.nav.hotels, language === 'id' ? 'Dukungan' : 'Support'].map(item => (
                <a key={item} href="#" className="text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400 hover:text-sky-500 transition-colors">{item}</a>
              ))}
            </div>
            <div className="border-t border-blue-50 pt-10 md:pt-16">
               <p className="text-slate-300 text-[9px] md:text-[10px] font-black tracking-[0.3em] md:tracking-[0.5em] uppercase">
                &copy; 2025 <span className="text-sky-500">LeFlight</span> • Sky Edition
              </p>
            </div>
        </div>
      </footer>
      
      <FlightGame language={language} />
      <CustomerService language={language} />
    </div>
  );
};

export default App;
