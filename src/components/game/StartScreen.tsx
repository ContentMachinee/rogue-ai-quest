
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { Button } from '@/components/ui/button';
import EmailCaptureModal from './EmailCaptureModal';
import AuthModal from './AuthModal';
import GameTransition from './GameTransition';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '@/services/authService';

const StartScreen: React.FC = () => {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showTransition, setShowTransition] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [typedText, setTypedText] = useState('');
  const [currentUser, setCurrentUser] = useState<any>(null);
  const navigate = useNavigate();
  
  const fullText = 'The Core has locked the Talent Grid—Engineer, we need you!';
  
  // Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      const user = await getCurrentUser();
      setIsAuthenticated(!!user);
      setCurrentUser(user);
    };
    
    checkAuth();
  }, []);
  
  // Typing effect
  useEffect(() => {
    if (typedText.length >= fullText.length) return;
    
    const timeout = setTimeout(() => {
      setTypedText(fullText.substring(0, typedText.length + 1));
    }, 100);
    
    return () => clearTimeout(timeout);
  }, [typedText, fullText]);
  
  // Handle auth success
  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowTransition(true);
  };
  
  // Handle transition complete
  const handleTransitionComplete = () => {
    navigate('/game');
  };
  
  return (
    <>
      <div className="min-h-screen relative overflow-hidden flex flex-col items-center justify-center bg-[#1a1a2e]">
        {/* Starry background with particles */}
        <div className="absolute inset-0 starry-bg">
          {Array.from({ length: 100 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                width: `${1 + Math.random() * 2}px`,
                height: `${1 + Math.random() * 2}px`,
                backgroundColor: ['#00f', '#0f0', '#f00'][Math.floor(Math.random() * 3)],
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: 0.3 + Math.random() * 0.7,
                animation: `float ${10 + Math.random() * 20}s linear infinite`
              }}
            ></div>
          ))}
        </div>
        
        <div className="relative z-10 flex flex-col items-center justify-center max-w-3xl px-4 py-8">
          {/* The Core hologram */}
          <div 
            className="w-24 h-24 rounded-full bg-red-600 mb-8 relative"
            style={{
              boxShadow: '0 0 30px rgba(255, 0, 0, 0.8)',
              animation: 'core-pulse 2s ease-in-out infinite'
            }}
          >
            {/* Glitch effect */}
            <div 
              className="absolute inset-0 bg-red-500 rounded-full opacity-50"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 100% 20%, 0 20%)',
                animation: 'flicker 3s ease-in-out infinite'
              }}
            ></div>
          </div>
          
          {/* Main title */}
          <h1 
            className={cn(
              "text-white font-orbitron text-2xl md:text-4xl font-bold text-center mb-4",
              "animate-text-glow"
            )}
            style={{
              textShadow: '0 0 10px #fff',
              animation: 'pulse-glow 2s ease-in-out infinite'
            }}
          >
            The Core Crisis: Reclaim the Talent Grid
          </h1>
          
          {/* Typing subtext */}
          <p className="text-white font-mono text-base md:text-lg text-center mb-12 h-6">
            {typedText.split('').map((char, i) => (
              <span 
                key={i} 
                className={cn(
                  "inline-block",
                  char === 'C' && i >= 4 && i <= 8 ? "text-red-500 font-bold" : ""
                )}
                style={{
                  animation: `fade 0.1s forwards`,
                  animationDelay: `${i * 0.1}s`,
                  opacity: 0
                }}
              >
                {char}
              </span>
            ))}
            <span className="typing-indicator"></span>
          </p>
          
          {/* Action buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 mt-8">
            <Button
              onClick={() => setShowEmailModal(true)}
              className={cn(
                "px-6 py-3 bg-blue-600/70 hover:bg-blue-600 text-white",
                "border border-blue-400 shadow-[0_0_15px_rgba(0,0,255,0.5)]",
                "font-orbitron tracking-wide",
                "relative overflow-hidden",
                "animate-pulse-glow"
              )}
            >
              {/* Static interference effect */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="a"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23a)" opacity="0.5"/%3E%3C/svg%3E")',
                  backgroundSize: 'cover',
                }}
              ></div>
              
              <span className="relative z-10">Alliance Transmission</span>
            </Button>
            
            <Button
              onClick={() => setShowAuthModal(true)}
              className={cn(
                "px-6 py-3 bg-purple-600/70 hover:bg-purple-600 text-white",
                "border border-purple-400 shadow-[0_0_15px_rgba(161,0,255,0.5)]",
                "font-orbitron tracking-wide",
                "relative overflow-hidden",
                "animate-pulse-glow"
              )}
            >
              {/* Rotating data node */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div 
                  className="w-5 h-5 rounded-full border-2 border-yellow-400 opacity-30"
                  style={{ animation: 'rotate-slow 10s linear infinite' }}
                ></div>
              </div>
              
              <span className="relative z-10">
                {isAuthenticated ? 'Continue Mission' : 'Access Grid Terminal'}
              </span>
            </Button>
          </div>
          
          {/* Status indicator */}
          {isAuthenticated && currentUser && (
            <div className="mt-6 flex items-center justify-center text-white/80 text-sm">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse mr-2"></div>
              <span>
                Engineer <span className="text-neon-green font-mono">{currentUser.email?.split('@')[0]}</span> connected
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Modals */}
      <EmailCaptureModal 
        isOpen={showEmailModal} 
        onClose={() => setShowEmailModal(false)} 
      />
      
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
      
      {/* Transition effect */}
      <GameTransition 
        show={showTransition}
        onComplete={handleTransitionComplete}
      />
    </>
  );
};

export default StartScreen;
