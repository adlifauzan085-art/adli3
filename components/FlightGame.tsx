
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { PlaneIcon, Language, TRANSLATIONS } from '../constants';

const GRAVITY = 0.45; 
const JUMP_STRENGTH = -7.2;
const OBSTACLE_SPEED = 3.3;
const BIRD_SIZE = 42; 
const CANVAS_WIDTH = 300;
const CANVAS_HEIGHT = 450;
const PIPE_WIDTH = 65; 
const PIPE_GAP = 155; 

interface Obstacle {
  x: number;
  gapTop: number;
  passed: boolean;
  type: 'office' | 'residential' | 'tower';
}

interface FlightGameProps {
  language: Language;
}

const FlightGame: React.FC<FlightGameProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [birdY, setBirdY] = useState(CANVAS_HEIGHT / 2);
  const [velocity, setVelocity] = useState(0);
  const [obstacles, setObstacles] = useState<Obstacle[]>([]);
  const [gameOver, setGameOver] = useState(false);
  
  const t = TRANSLATIONS[language].game;
  const requestRef = useRef<number>(null);
  const lastTimeRef = useRef<number>(0);

  const jump = useCallback(() => {
    if (!isPlaying && !gameOver) {
      setIsPlaying(true);
      return;
    }
    if (gameOver) {
      resetGame();
      return;
    }
    setVelocity(JUMP_STRENGTH);
  }, [isPlaying, gameOver]);

  const resetGame = () => {
    setBirdY(CANVAS_HEIGHT / 2);
    setVelocity(0);
    setObstacles([]);
    setScore(0);
    setGameOver(false);
    setIsPlaying(true);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        jump();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [jump]);

  const update = (time: number) => {
    if (!lastTimeRef.current) lastTimeRef.current = time;

    if (isPlaying && !gameOver) {
      setBirdY((prevY) => {
        const nextY = prevY + velocity;
        if (nextY < 0 || nextY > CANVAS_HEIGHT - BIRD_SIZE) {
          setGameOver(true);
          return prevY;
        }
        return nextY;
      });
      setVelocity((v) => v + GRAVITY);

      setObstacles((prev) => {
        let next = prev.map((obs) => ({ ...obs, x: obs.x - OBSTACLE_SPEED }));
        next = next.filter((obs) => obs.x > -PIPE_WIDTH);

        if (next.length === 0 || next[next.length - 1].x < CANVAS_WIDTH - 180) {
          const types: ('office' | 'residential' | 'tower')[] = ['office', 'residential', 'tower'];
          next.push({
            x: CANVAS_WIDTH,
            gapTop: Math.random() * (CANVAS_HEIGHT - PIPE_GAP - 130) + 65,
            passed: false,
            type: types[Math.floor(Math.random() * types.length)]
          });
        }

        next.forEach((obs) => {
          const birdLeft = 50;
          const birdRight = 50 + BIRD_SIZE;
          const birdTop = birdY + 14; 
          const birdBottom = birdY + BIRD_SIZE - 14;

          const pipeLeft = obs.x;
          const pipeRight = obs.x + PIPE_WIDTH;

          if (
            birdRight > pipeLeft &&
            birdLeft < pipeRight &&
            (birdTop < obs.gapTop || birdBottom > obs.gapTop + PIPE_GAP)
          ) {
            setGameOver(true);
          }

          if (!obs.passed && pipeRight < birdLeft) {
            obs.passed = true;
            setScore((s) => s + 1);
          }
        });

        return next;
      });
    }

    lastTimeRef.current = time;
    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    requestRef.current = requestAnimationFrame(update);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isPlaying, gameOver, velocity, birdY]);

  useEffect(() => {
    if (score > highScore) setHighScore(score);
  }, [score]);

  return (
    <div className="fixed bottom-4 left-4 md:bottom-6 md:left-6 z-[2000] flex flex-col items-start">
      {isOpen && (
        <div className="mb-4 w-[calc(100vw-2rem)] md:w-[320px] h-[500px] md:h-[550px] glass-effect rounded-[2rem] md:rounded-[2.5rem] border border-white shadow-2xl overflow-hidden relative animate-[fadeIn_0.3s_ease-out] origin-bottom-left flex flex-col">
          {/* Header */}
          <div className="p-5 md:p-6 bg-gradient-to-r from-sky-500 to-sky-600 text-white flex items-center justify-between z-50">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-md rounded-xl md:rounded-2xl flex items-center justify-center">
                <span className="text-sm md:text-base">🎮</span>
              </div>
              <div>
                <h3 className="font-black text-xs md:text-sm tracking-tight">{t.title}</h3>
                <div className="flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                  <span className="text-[8px] md:text-[10px] font-bold opacity-80 uppercase tracking-widest">{t.status}</span>
                </div>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors"
            >
              ✕
            </button>
          </div>

          <div 
            className="flex-1 relative w-full cursor-pointer overflow-hidden touch-none"
            onClick={jump}
          >
            <div className="absolute inset-0 bg-sky-50/30 -z-10"></div>
            
            {/* Score Display */}
            <div className="absolute top-4 left-0 right-0 text-center z-20 pointer-events-none">
              <span className="text-5xl font-black text-sky-500/40 tracking-tighter">{score}</span>
            </div>

            {/* Obstacles */}
            {obstacles.map((obs, i) => (
              <React.Fragment key={i}>
                <div 
                  className="absolute bg-white/80 backdrop-blur-sm border-x border-b border-sky-100 shadow-sm flex flex-col overflow-hidden"
                  style={{ left: obs.x, top: 0, width: PIPE_WIDTH, height: obs.gapTop }}
                />
                <div 
                  className="absolute bg-white/80 backdrop-blur-sm border-x border-t border-sky-100 shadow-sm flex flex-col overflow-hidden"
                  style={{ left: obs.x, top: obs.gapTop + PIPE_GAP, width: PIPE_WIDTH, height: CANVAS_HEIGHT - (obs.gapTop + PIPE_GAP) }}
                />
              </React.Fragment>
            ))}

            {/* Plane Player */}
            <div 
              className="absolute transition-transform duration-75"
              style={{ 
                left: 50, 
                top: birdY, 
                transform: `rotate(${velocity * 2.5}deg)`
              }}
            >
              <PlaneIcon className="w-10 h-10 md:w-12 md:h-12 text-sky-500 drop-shadow-[0_4px_10px_rgba(14,165,233,0.3)]" />
            </div>

            {/* Start Screen */}
            {!isPlaying && !gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/40 backdrop-blur-[2px] z-30">
                <div className="w-14 h-14 md:w-16 md:h-16 bg-white rounded-2xl flex items-center justify-center mb-6 animate-bounce border border-sky-50 shadow-xl">
                  <PlaneIcon className="w-7 h-7 md:w-9 md:h-9 text-sky-500" />
                </div>
                <h3 className="text-xl font-black text-slate-800 mb-1">{t.title}</h3>
                <p className="text-[9px] font-black text-sky-600 uppercase tracking-widest bg-white px-5 py-2.5 rounded-full shadow-lg border border-sky-50">{t.tap}</p>
              </div>
            )}

            {/* Game Over Screen */}
            {gameOver && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-xl z-40 p-8 animate-[fadeIn_0.3s_ease-out]">
                <div className="w-16 h-16 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center text-3xl mb-6 shadow-inner border border-red-100">💥</div>
                <h2 className="text-2xl font-black text-slate-900 mb-1 tracking-tighter">{t.emergency}</h2>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-6">{t.cancelled}</p>
                
                <div className="flex justify-between w-full mb-8 bg-sky-50/50 p-5 rounded-2xl border border-sky-100/50">
                  <div className="text-center">
                    <p className="text-[8px] font-black text-sky-400 uppercase tracking-widest mb-1">{t.current}</p>
                    <p className="text-2xl font-black text-sky-600">{score}</p>
                  </div>
                  <div className="w-px bg-sky-100 mx-3"></div>
                  <div className="text-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.best}</p>
                    <p className="text-2xl font-black text-slate-800">{highScore}</p>
                  </div>
                </div>
                
                <button 
                  onClick={(e) => { e.stopPropagation(); resetGame(); }}
                  className="w-full py-4 bg-sky-500 text-white font-black rounded-2xl shadow-xl hover:bg-sky-600 active:scale-95 transition-all text-xs uppercase tracking-widest"
                >
                  {t.restart}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl md:rounded-[1.8rem] flex items-center justify-center transition-all duration-500 shadow-2xl ${
          isOpen 
            ? 'bg-slate-800 text-white rotate-90 scale-90' 
            : 'bg-white text-sky-500 hover:scale-110 active:scale-90 border border-sky-100'
        }`}
      >
        <span className="text-2xl md:text-3xl">{isOpen ? '✕' : '🎮'}</span>
      </button>
    </div>
  );
};

export default FlightGame;
