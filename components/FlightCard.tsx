
import React from 'react';
import { Flight } from '../types';
import { AIRLINES, PlaneIcon } from '../constants';

interface FlightCardProps {
  flight: Flight;
  onBookingClick: (flight: Flight) => void;
}

const FlightCard: React.FC<FlightCardProps> = ({ flight, onBookingClick }) => {
  const airlineInfo = AIRLINES.find(a => a.name === flight.airline) || AIRLINES[0];
  
  // Define status colors
  const getStatusStyles = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'delayed':
        return 'bg-amber-50 text-amber-600 border-amber-100';
      case 'cancelled':
        return 'bg-red-50 text-red-600 border-red-100';
      default:
        return 'bg-sky-50 text-sky-600 border-sky-100';
    }
  };

  const getStatusDot = (status?: string) => {
    switch (status?.toLowerCase()) {
      case 'delayed':
        return 'bg-amber-500';
      case 'cancelled':
        return 'bg-red-500';
      default:
        return 'bg-sky-500';
    }
  };

  return (
    <div className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-blue-50 group overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 relative z-10">
        {/* Airline & Brand */}
        <div className="flex items-center space-x-4 md:space-x-5 w-full md:w-1/4">
          <div className="w-14 h-14 md:w-16 md:h-16 bg-sky-50 rounded-2xl md:rounded-3xl flex items-center justify-center text-2xl md:text-3xl shadow-inner group-hover:scale-110 transition-transform border border-blue-50">
            {airlineInfo.logo}
          </div>
          <div>
            <div className="flex flex-col">
              {flight.status && (
                <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-[7px] md:text-[8px] font-black uppercase tracking-widest border mb-1 w-fit ${getStatusStyles(flight.status)}`}>
                  <span className={`w-1 h-1 rounded-full mr-1.5 ${getStatusDot(flight.status)} ${flight.status.toLowerCase() === 'on time' ? 'animate-pulse' : ''}`}></span>
                  {flight.status}
                </div>
              )}
              <h3 className="font-black text-slate-800 text-base md:text-lg tracking-tight leading-none">{flight.airline}</h3>
            </div>
            <div className="flex items-center space-x-1.5 mt-2">
              <span className="text-[8px] md:text-[9px] font-black text-sky-600 uppercase tracking-widest bg-sky-50 px-2 py-0.5 rounded-lg border border-sky-100">Eco</span>
              <span className="text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-2 py-0.5 rounded-lg">Flex</span>
            </div>
          </div>
        </div>

        {/* Journey Details */}
        <div className="flex items-center justify-between w-full md:w-2/4 py-6 md:py-0 border-y md:border-y-0 md:border-x border-blue-50 px-2 md:px-8">
          <div className="text-center group/time">
            <p className="text-2xl md:text-3xl font-black text-slate-800 group-hover/time:text-sky-500 transition-colors tracking-tighter">{flight.departureTime}</p>
            <p className="text-[9px] md:text-[10px] text-slate-300 font-black uppercase tracking-widest mt-1">{flight.from}</p>
          </div>
          
          <div className="flex-1 flex flex-col items-center px-4 md:px-10 relative">
            <span className="text-[8px] md:text-[9px] font-black text-slate-300 mb-2 md:mb-3 uppercase tracking-[0.2em]">{flight.duration}</span>
            <div className="relative w-full h-px bg-sky-100">
              <div className="absolute inset-y-0 left-0 bg-sky-400 transition-all group-hover:w-full w-1/4"></div>
              <div className="absolute -top-2.5 md:-top-3 left-1/2 -translate-x-1/2 bg-white p-1 rounded-full border border-sky-100 shadow-sm group-hover:rotate-12 transition-transform">
                <PlaneIcon className="w-4 h-4 md:w-5 md:h-5 text-sky-400 rotate-45" />
              </div>
            </div>
            <span className="text-[8px] md:text-[9px] font-black text-sky-500 mt-3 md:mt-4 uppercase tracking-[0.2em] bg-sky-50 px-3 md:px-4 py-1 rounded-full border border-sky-100">
              {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop`}
            </span>
          </div>

          <div className="text-center group/time">
            <p className="text-2xl md:text-3xl font-black text-slate-800 group-hover/time:text-sky-500 transition-colors tracking-tighter">{flight.arrivalTime}</p>
            <p className="text-[9px] md:text-[10px] text-slate-300 font-black uppercase tracking-widest mt-1">{flight.to}</p>
          </div>
        </div>

        {/* Pricing & CTA */}
        <div className="w-full md:w-1/4 flex flex-row md:flex-col items-center justify-between md:justify-center md:items-end gap-4">
          <div className="md:mb-6 text-left md:text-right">
            <p className="text-[8px] md:text-[10px] font-black text-slate-300 uppercase tracking-widest mb-0.5">Mulai Dari</p>
            <div className="flex items-baseline space-x-1">
              <span className="text-sky-500 font-black text-3xl md:text-4xl tracking-tighter">${flight.price}</span>
              <span className="text-slate-200 text-[10px] md:text-xs font-bold">/pax</span>
            </div>
          </div>
          <button 
            onClick={() => onBookingClick(flight)}
            className="flex-1 md:w-full py-3 md:py-4 bg-sky-500 hover:bg-sky-600 text-white font-black rounded-xl md:rounded-2xl transition-all shadow-lg shadow-sky-100 active:scale-95 uppercase text-[9px] md:text-[10px] tracking-widest"
          >
            Amankan Kursi
          </button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
