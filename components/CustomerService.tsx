
import React, { useState, useRef, useEffect } from 'react';
import { getTravelSuggestions } from '../services/geminiService';
import { PlaneIcon, Language, TRANSLATIONS } from '../constants';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface CustomerServiceProps {
  language: Language;
}

const QUICK_TOPICS_ID = [
  { label: "👜 Bagasi Hilang", query: "Bagaimana cara melaporkan bagasi yang hilang atau tertinggal?" },
  { label: "⏳ Delay & Kompensasi", query: "Apa hak saya jika penerbangan mengalami delay lebih dari 3 jam?" },
  { label: "💳 Refund & Reschedule", query: "Bagaimana prosedur refund tiket atau merubah jadwal penerbangan?" },
];

const QUICK_TOPICS_EN = [
  { label: "👜 Lost Luggage", query: "How to report lost or left behind luggage?" },
  { label: "⏳ Delay & Comp", query: "What are my rights if my flight is delayed more than 3 hours?" },
  { label: "💳 Refund & Changes", query: "What is the procedure for a refund or rescheduling?" },
];

const CustomerService: React.FC<CustomerServiceProps> = ({ language }) => {
  const t = TRANSLATIONS[language].cs;
  const topics = language === 'id' ? QUICK_TOPICS_ID : QUICK_TOPICS_EN;

  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: t.greeting,
      sender: 'ai',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen, isTyping]);

  const processMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMsg: Message = {
      id: Date.now(),
      text: text,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await getTravelSuggestions(text, language);
      const aiMsg: Message = {
        id: Date.now() + 1,
        text: response || t.error,
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error("CS Error:", error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    e?.preventDefault();
    processMessage(inputValue);
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[2000] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] md:w-[380px] h-[500px] md:h-[550px] glass-effect rounded-[2rem] md:rounded-[2.5rem] border border-white shadow-2xl flex flex-col overflow-hidden animate-[fadeIn_0.3s_ease-out] origin-bottom-right">
          {/* Header */}
          <div className="p-5 md:p-6 bg-gradient-to-r from-sky-500 to-sky-600 text-white flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-md rounded-xl md:rounded-2xl flex items-center justify-center">
                <PlaneIcon className="w-5 h-5 md:w-6 md:h-6 rotate-45" />
              </div>
              <div>
                <h3 className="font-black text-xs md:text-sm tracking-tight">{t.title}</h3>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-[8px] md:text-[10px] font-bold opacity-80 uppercase tracking-widest">{t.assistant}</span>
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10">✕</button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-5 md:p-6 space-y-4 scrollbar-hide">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-[11px] font-medium leading-relaxed shadow-sm ${
                  msg.sender === 'user' ? 'bg-sky-500 text-white rounded-tr-none' : 'bg-white text-slate-700 border border-blue-50 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-sky-50 p-3 rounded-2xl rounded-tl-none flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-sky-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Chat */}
          <div className="px-4 pb-2">
            <div className="flex overflow-x-auto space-x-2 scrollbar-hide py-2">
              {topics.map((topic, index) => (
                <button
                  key={index}
                  onClick={() => processMessage(topic.query)}
                  className="whitespace-nowrap px-3 py-2 bg-white/70 hover:bg-sky-500 hover:text-white border border-sky-100 rounded-full text-[9px] font-black text-sky-600 transition-all shadow-sm"
                >
                  {topic.label}
                </button>
              ))}
            </div>
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white/50 border-t border-blue-50">
            <div className="relative">
              <input 
                type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
                placeholder={t.input}
                className="w-full pl-5 pr-12 py-3.5 bg-white rounded-xl border border-blue-50 focus:ring-4 focus:ring-sky-100 outline-none transition-all text-xs font-bold text-slate-700"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-sky-500 text-white rounded-lg flex items-center justify-center">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M12 19l9-7-9-7V19z" /></svg>
              </button>
            </div>
          </form>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-2xl transition-all ${isOpen ? 'bg-slate-800 text-white rotate-90' : 'bg-sky-500 text-white'}`}
      >
        {isOpen ? '✕' : '💬'}
      </button>
    </div>
  );
};

export default CustomerService;
