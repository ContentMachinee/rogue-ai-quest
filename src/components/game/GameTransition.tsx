
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GameTransitionProps {
  show: boolean;
  onComplete?: () => void;
  message?: string;
}

const GameTransition: React.FC<GameTransitionProps> = ({ 
  show, 
  onComplete,
  message = "Engineer, reclaim the Talent Grid—Level 1 engaged!"
}) => {
  const [progress, setProgress] = useState(0);
  const [showMessage, setShowMessage] = useState(false);
  
  useEffect(() => {
    if (!show) {
      setProgress(0);
      setShowMessage(false);
      return;
    }
    
    // Show message after a delay
    const messageTimer = setTimeout(() => {
      setShowMessage(true);
    }, 500);
    
    // Simulate loading
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 2;
      setProgress(Math.min(currentProgress, 100));
      
      if (currentProgress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 1000);
      }
    }, 50);
    
    return () => {
      clearInterval(interval);
      clearTimeout(messageTimer);
    };
  }, [show, onComplete]);
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden">
      {/* Background with zoom effect */}
      <div 
        className="absolute inset-0 bg-black"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 255, 0, 0.3) 0%, rgba(0, 0, 0, 1) 70%)',
          transform: `scale(${1 + progress * 0.01})`,
          transition: 'transform 0.5s ease-out'
        }}
      ></div>
      
      {/* Particle trail effect */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-neon-green rounded-full"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.7,
              transform: `translateZ(${Math.random() * 100}px)`,
              animation: `float ${3 + Math.random() * 5}s linear infinite`
            }}
          ></div>
        ))}
      </div>
      
      {/* Central portal */}
      <div 
        className="relative flex flex-col items-center justify-center"
        style={{
          opacity: progress / 100
        }}
      >
        {/* Glowing portal */}
        <div 
          className="w-32 h-32 rounded-full bg-black border-4 border-neon-green mb-8"
          style={{
            boxShadow: `0 0 30px rgba(0, 255, 0, 0.8), inset 0 0 20px rgba(0, 255, 0, 0.8)`,
            transform: `scale(${0.8 + progress * 0.01})`,
            transition: 'transform 0.5s ease-out'
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-neon-green animate-pulse opacity-50"></div>
          </div>
          <div className="absolute inset-0 animate-spin-slow" style={{ transformOrigin: 'center' }}>
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-8 bg-neon-green/80"
                style={{
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'bottom center',
                  transform: `translate(-50%, -100%) rotate(${i * 45}deg)`
                }}
              ></div>
            ))}
          </div>
        </div>
        
        {/* Loading text */}
        {showMessage && (
          <div 
            className="text-white font-orbitron text-xl tracking-wide text-center max-w-md animate-fade"
            style={{
              textShadow: '0 0 10px rgba(255, 255, 255, 0.8)'
            }}
          >
            {message}
          </div>
        )}
        
        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-800 rounded-full mt-8 overflow-hidden">
          <div 
            className="h-full bg-neon-green animate-pulse-glow"
            style={{ 
              width: `${progress}%`,
              boxShadow: '0 0 10px rgba(0, 255, 0, 0.8)'
            }}
          ></div>
        </div>
        
        <div className="text-neon-green font-mono text-sm mt-2 animate-pulse">
          Grid Sync: {progress}%
        </div>
      </div>
    </div>
  );
};

export default GameTransition;
