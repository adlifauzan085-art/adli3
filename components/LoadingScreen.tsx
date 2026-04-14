
import React from 'react';
import { PlaneIcon } from '../constants';

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ message = "Mempersiapkan penerbangan Anda..." }) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-blue-50/95 backdrop-blur-md">
      <div className="relative w-64 h-32 flex items-center justify-center overflow-hidden">
        <div className="absolute top-1/4 left-10 w-8 h-4 bg-white rounded-full opacity-50 blur-sm"></div>
        <div className="absolute top-1/2 left-40 w-12 h-6 bg-white rounded-full opacity-30 blur-md"></div>
        <div className="absolute top-3/4 left-20 w-10 h-5 bg-white rounded-full opacity-40 blur-sm"></div>
        
        <div className="animate-[float_2s_infinite_ease-in-out]">
          <PlaneIcon className="w-16 h-16 text-blue-500" />
        </div>
      </div>
      
      <p className="mt-8 text-blue-600 font-black text-sm uppercase tracking-widest animate-pulse">
        {message}
      </p>
      
      <div className="mt-6 w-56 h-1.5 bg-blue-100 rounded-full overflow-hidden border border-blue-50">
        <div className="h-full bg-sky-400 animate-[loading_2s_infinite_ease-in-out] shadow-sm"></div>
      </div>
      
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0); }
          50% { transform: translateY(-10px) rotate(2deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
