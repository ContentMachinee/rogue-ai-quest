
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface GameTransitionProps {
  show: boolean;
  onComplete: () => void;
}

const GameTransition: React.FC<GameTransitionProps> = ({ show, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    if (!show) {
      setProgress(0);
      setMessage('');
      return;
    }

    const messages = [
      'Initializing grid connection...',
      'Bypassing Core firewalls...',
      'Calibrating neural interface...',
      'Loading mission parameters...',
      'Engineer, reclaim the Talent Grid—Level 1 engaged!'
    ];
    
    // Update progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (1 + Math.random() * 2);
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 50);
    
    // Show messages
    let messageIndex = 0;
    const messageInterval = setInterval(() => {
      setMessage(messages[messageIndex]);
      messageIndex = (messageIndex + 1) % messages.length;
    }, 1200);
    
    return () => {
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [show]);
  
  // Handle completion
  useEffect(() => {
    if (progress >= 100) {
      const timeout = setTimeout(() => {
        onComplete();
      }, 1000);
      
      return () => clearTimeout(timeout);
    }
  }, [progress, onComplete]);
  
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 bg-black flex flex-col items-center justify-center">
      {/* Portal effect */}
      <div 
        className="w-64 h-64 rounded-full bg-neon-green/20 mb-8"
        style={{
          boxShadow: '0 0 100px rgba(0, 255, 0, 0.8)',
          animation: 'portal-pulse 2s ease-in-out infinite'
        }}
      >
        <div 
          className="w-full h-full rounded-full bg-neon-green/30"
          style={{
            transform: 'scale(0.8)',
            animation: 'portal-rotate 8s linear infinite'
          }}
        ></div>
        <div 
          className="absolute inset-0 rounded-full bg-neon-green/10"
          style={{
            transform: 'scale(1.2)',
            animation: 'portal-rotate-reverse 12s linear infinite'
          }}
        ></div>
      </div>
      
      {/* Message */}
      <div 
        className="text-neon-green font-orbitron text-2xl mb-8 min-h-[2rem] text-center max-w-md"
        style={{
          textShadow: '0 0 10px rgba(0, 255, 0, 0.8)',
          animation: 'text-flicker 3s infinite'
        }}
      >
        {message}
      </div>
      
      {/* Progress bar */}
      <div className="w-80 h-4 bg-gray-800 rounded-full overflow-hidden relative">
        <div 
          className="h-full bg-neon-green transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
        
        {/* Scanning line */}
        <div 
          className="absolute top-0 bottom-0 w-2 bg-white/30"
          style={{ 
            left: `${progress}%`,
            animation: 'scanning-line 1s ease-in-out infinite alternate' 
          }}
        ></div>
        
        {/* Glitch effect */}
        {[...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute top-0 h-full bg-white/30"
            style={{ 
              left: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 3}px`,
              opacity: Math.random() * 0.5,
              animation: `glitch-bar ${0.5 + Math.random()}s ease-in-out infinite alternate` 
            }}
          ></div>
        ))}
      </div>
      
      {/* Progress text */}
      <div className="text-white/70 font-mono text-sm mt-2">
        Grid Sync: {Math.floor(progress)}%
      </div>
    </div>
  );
};

export default GameTransition;
