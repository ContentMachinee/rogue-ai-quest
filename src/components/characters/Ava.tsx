
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AvaProps {
  mood: 'neutral' | 'curious' | 'helpful' | 'concerned';
  speaking?: boolean;
  message?: string;
  className?: string;
}

const Ava: React.FC<AvaProps> = ({ 
  mood = 'neutral', 
  speaking = false, 
  message = '',
  className
}) => {
  const [typedMessage, setTypedMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);

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
      } else {
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [speaking, message, messageIndex]);

  return (
    <div className={cn('relative flex flex-col items-center', className)}>
      <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-2 border-neon-purple/50 shadow-neon animate-float">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-b from-purple-900/80 to-black",
          "after:absolute after:inset-0 after:bg-grid-pattern after:opacity-30"
        )}>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={cn(
              "w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-b from-purple-800/70 to-purple-900/70 flex items-center justify-center",
              {
                'border-2 border-neon-purple/60': mood === 'neutral',
                'border-2 border-neon-blue/70': mood === 'curious',
                'border-2 border-neon-green/70': mood === 'helpful',
                'border-2 border-yellow-500/70': mood === 'concerned',
              }
            )}>
              <span className="font-orbitron text-2xl md:text-3xl text-white">
                {mood === 'neutral' && 'A'}
                {mood === 'curious' && '?'}
                {mood === 'helpful' && '✓'}
                {mood === 'concerned' && '!'}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-2 font-orbitron text-sm text-neon-purple">Ava</div>
      
      {speaking && message && (
        <div className="absolute top-0 left-full ml-4 w-48 md:w-64 p-3 bg-secondary/80 backdrop-blur-sm border border-neon-purple/40 rounded-lg shadow-neon">
          <div className="text-sm text-white">
            {typedMessage}
            {messageIndex < message.length && <span className="typing-indicator"></span>}
          </div>
        </div>
      )}
    </div>
  );
};

export default Ava;
