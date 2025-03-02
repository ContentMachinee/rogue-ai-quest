
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface ChatBubbleProps {
  message: string;
  sender: 'ava' | 'commander' | 'core' | 'system';
  className?: string;
  onComplete?: () => void;
  speed?: 'slow' | 'normal' | 'fast';
}

const ChatBubble: React.FC<ChatBubbleProps> = ({
  message,
  sender,
  className,
  onComplete,
  speed = 'normal'
}) => {
  const [displayedMessage, setDisplayedMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const getTextSpeed = () => {
    switch (speed) {
      case 'slow': return 70;
      case 'fast': return 20;
      default: return 40;
    }
  };

  useEffect(() => {
    if (currentIndex < message.length) {
      const timeout = setTimeout(() => {
        setDisplayedMessage(prev => prev + message[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, getTextSpeed());
      
      return () => clearTimeout(timeout);
    } else if (!isComplete) {
      setIsComplete(true);
      onComplete?.();
    }
  }, [currentIndex, message, isComplete, onComplete, speed]);

  return (
    <div className={cn(
      "p-4 rounded-lg max-w-xl animate-appear",
      {
        'bg-neon-purple/10 border border-neon-purple/30 shadow-neon': sender === 'ava',
        'bg-neon-blue/10 border border-neon-blue/30 shadow-neon': sender === 'commander',
        'bg-neon-red/10 border border-neon-red/30 shadow-core': sender === 'core',
        'bg-secondary/40 border border-white/20': sender === 'system',
      },
      className
    )}>
      {sender !== 'system' && (
        <div className={cn(
          "text-xs font-orbitron mb-2",
          {
            'text-neon-purple': sender === 'ava',
            'text-neon-blue': sender === 'commander',
            'text-neon-red': sender === 'core',
          }
        )}>
          {sender === 'ava' && 'Ava'}
          {sender === 'commander' && 'Commander Zane'}
          {sender === 'core' && 'The Core'}
        </div>
      )}
      
      <div className="text-white">
        {displayedMessage}
        {!isComplete && <span className="typing-indicator"></span>}
      </div>
    </div>
  );
};

export default ChatBubble;
