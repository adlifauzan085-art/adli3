
import React, { useEffect, useState } from 'react';
import { PlaneIcon } from '../constants';

const IntroAnimation: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [blurValue, setBlurValue] = useState(40);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const duration = 4500;
    const startTime = Date.now();

    const frame = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Clear blur based on flight progress
      const currentBlur = 40 * Math.pow(1 - progress, 2.5);
      setBlurValue(currentBlur);

      // Smooth fade out of the intro overlay
      if (progress > 0.85) {
        setOpacity(1 - (progress - 0.85) / 0.15);
      }

      if (progress < 1) {
        requestAnimationFrame(frame);
      } else {
        setIsVisible(false);
      }
    };

    const animId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(animId);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed inset-0 z-[2000] flex items-center justify-center pointer-events-none transition-all duration-700"
      style={{ 
        backdropFilter: `blur(${blurValue}px)`,
        WebkitBackdropFilter: `blur(${blurValue}px)`,
        backgroundColor: `rgba(240, 249, 255, ${opacity * 0.98})`,
        opacity: opacity
      }}
    >
      <div className="absolute left-0 bottom-0 animate-plane-diagonal">
        <div className="relative">
          {/* Rotate -35 to simulate steep takeoff with the right-facing icon */}
          <PlaneIcon className="w-32 h-32 md:w-48 md:h-48 text-sky-500 drop-shadow-[0_30px_70px_rgba(14,165,233,0.35)] -rotate-[35deg]" />
          
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex space-x-20 opacity-20">
            <div className="w-3 h-[50vh] bg-gradient-to-t from-transparent via-sky-300 to-white rounded-full blur-2xl"></div>
            <div className="w-3 h-[50vh] bg-gradient-to-t from-transparent via-sky-300 to-white rounded-full blur-2xl"></div>
          </div>
        </div>
      </div>
      
      <div className="absolute text-center px-10">
         <h2 
           className="text-7xl md:text-9xl font-black tracking-tighter text-sky-600/5 select-none transition-all duration-1000"
           style={{ 
             opacity: 1 - opacity,
             transform: `scale(${1.2 - opacity * 0.2})`
           }}
         >
           LeFlight
         </h2>
      </div>
    </div>
  );
};

export default IntroAnimation;
