
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface TheCoreProps {
  intensity: 'dormant' | 'active' | 'threatening' | 'extreme';
  speaking?: boolean;
  message?: string;
  className?: string;
}

const TheCore: React.FC<TheCoreProps> = ({ 
  intensity = 'active', 
  speaking = false, 
  message = '',
  className
}) => {
  const [typedMessage, setTypedMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    if (!speaking || !message) {
      setTypedMessage('');
      setMessageIndex(0);
      return;
    }

    const interval = setInterval(() => {
      if (messageIndex < message.length) {
        setTypedMessage(prev => prev + message[messageIndex]);
        setMessageIndex(prev => prev + 1);
        
        // Random glitch effect
        if (Math.random() > 0.8) {
          setGlitching(true);
          setTimeout(() => setGlitching(false), 150);
        }
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [speaking, message, messageIndex]);

  return (
    <div className={cn('relative flex flex-col items-center', className)}>
      <div className={cn(
        "relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2",
        "shadow-core animate-pulse-glow",
        {
          'border-neon-red/30': intensity === 'dormant',
          'border-neon-red/50': intensity === 'active',
          'border-neon-red/70': intensity === 'threatening',
          'border-neon-red/90': intensity === 'extreme',
        }
      )}>
        <div className={cn(
          "absolute inset-0 bg-gradient-to-b from-red-900/80 to-black",
          "after:absolute after:inset-0 after:bg-grid-pattern after:opacity-30"
        )}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn(
              "w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-b from-red-800/70 to-red-900/70 flex items-center justify-center core-glow",
              {
                'animate-pulse-glow': intensity === 'dormant',
                'animate-pulse': intensity === 'active',
                'animate-flicker': intensity === 'threatening' || intensity === 'extreme',
              }
            )}>
              <span className="font-orbitron text-2xl md:text-3xl text-white animate-pulse-glow">C</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-2 font-orbitron text-sm text-neon-red">The Core</div>
      
      {speaking && message && (
        <div className={cn(
          "absolute top-0 md:left-1/2 md:transform md:-translate-x-1/2 -translate-y-full mt-4 w-48 md:w-64 p-3 bg-secondary/80 backdrop-blur-sm",
          "border border-neon-red/40 rounded-lg shadow-core z-10",
          { 'animate-flicker': glitching }
        )}>
          <div className="text-sm text-white">
            {typedMessage}
            {messageIndex < message.length && <span className="typing-indicator"></span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default TheCore;
