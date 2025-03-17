
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { loginUser, signupUser } from '@/services/authService';
import { toast } from 'sonner';
import { 
  ShieldIcon, 
  RadarIcon, 
  SparklesIcon
} from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onAuthSuccess }) => {
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('signup');
  
  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupRole, setSignupRole] = useState('developer');
  const [isSigningUp, setIsSigningUp] = useState(false);
  
  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const modalRef = useRef<HTMLDivElement>(null);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  
  // Sound effects
  const playClick = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(220, audioContext.currentTime); // A3
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.05);
  };
  
  const playTyping = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(440 + Math.random() * 50, audioContext.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.02);
  };
  
  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  // Handle signup submission
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!signupName || !signupEmail || !signupPassword) {
      toast.error('All fields required for engineer deployment');
      return;
    }
    
    setIsSigningUp(true);
    playClick();
    
    // Shield animation effect
    createShieldEffect();
    
    const success = await signupUser({
      name: signupName,
      email: signupEmail,
      password: signupPassword,
      role: signupRole
    });
    
    if (success) {
      setTimeout(() => {
        onAuthSuccess();
      }, 1500);
    }
    
    setIsSigningUp(false);
  };
  
  // Handle login submission
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!loginEmail || !loginPassword) {
      toast.error('Terminal credentials required');
      return;
    }
    
    setIsLoggingIn(true);
    playClick();
    
    // Warp effect
    createWarpEffect();
    
    const success = await loginUser({
      email: loginEmail,
      password: loginPassword
    });
    
    if (success) {
      setTimeout(() => {
        onAuthSuccess();
      }, 1500);
    }
    
    setIsLoggingIn(false);
  };
  
  // Create shield animation effect
  const createShieldEffect = () => {
    const button = document.getElementById('signup-button');
    if (!button) return;
    
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const shield = document.createElement('div');
    shield.className = 'fixed rounded-full z-50 pointer-events-none';
    shield.style.left = `${centerX}px`;
    shield.style.top = `${centerY}px`;
    shield.style.transform = 'translate(-50%, -50%)';
    shield.style.border = '2px solid rgba(0, 255, 0, 0.8)';
    shield.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.5), inset 0 0 15px rgba(0, 255, 0, 0.5)';
    
    document.body.appendChild(shield);
    
    let size = 10;
    let opacity = 1;
    
    const animate = () => {
      if (size >= 150) {
        shield.remove();
        return;
      }
      
      size += 4;
      opacity = Math.max(0, opacity - 0.02);
      
      shield.style.width = `${size}px`;
      shield.style.height = `${size}px`;
      shield.style.opacity = opacity.toString();
      
      requestAnimationFrame(animate);
    };
    
    requestAnimationFrame(animate);
  };
  
  // Create warp effect animation
  const createWarpEffect = () => {
    const button = document.getElementById('login-button');
    if (!button) return;
    
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 10; i++) {
      const warp = document.createElement('div');
      warp.className = 'fixed rounded-full z-50 pointer-events-none';
      warp.style.left = `${centerX}px`;
      warp.style.top = `${centerY}px`;
      warp.style.transform = 'translate(-50%, -50%)';
      warp.style.border = '2px solid rgba(161, 0, 255, 0.8)';
      warp.style.boxShadow = '0 0 15px rgba(161, 0, 255, 0.5)';
      
      document.body.appendChild(warp);
      
      const delay = i * 50;
      const size = 20 + i * 5;
      
      setTimeout(() => {
        let currentSize = size;
        let opacity = 1;
        
        const animate = () => {
          if (opacity <= 0) {
            warp.remove();
            return;
          }
          
          currentSize += 3;
          opacity -= 0.02;
          
          warp.style.width = `${currentSize}px`;
          warp.style.height = `${currentSize}px`;
          warp.style.opacity = opacity.toString();
          
          requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
      }, delay);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className={cn(
          "relative w-[400px] h-[450px] bg-[#1a1a2e]/70 backdrop-blur-md rounded-md border overflow-hidden",
          "transition-all duration-500",
          "animate-appear"
        )}
        style={{
          boxShadow: `0 0 20px ${activeTab === 'signup' ? 'rgba(0, 255, 0, 0.5)' : 'rgba(161, 0, 255, 0.5)'}`
        }}
      >
        {/* Holographic border effect */}
        <div className="absolute inset-0 border border-white/30 rounded-md animate-pulse-glow"></div>
        
        {/* Tab navigation */}
        <div className="flex border-b border-white/20">
          <button
            className={cn(
              "flex-1 py-3 px-4 flex items-center justify-center gap-2 font-orbitron",
              "transition-all duration-300",
              activeTab === 'signup'
                ? "bg-neon-green/10 text-neon-green border-b-2 border-neon-green"
                : "text-white/70 hover:text-white hover:bg-white/5"
            )}
            onClick={() => {
              setActiveTab('signup');
              playClick();
            }}
          >
            <ShieldIcon className="h-4 w-4" />
            <span>Forge Grid Engineer ID</span>
            {activeTab === 'signup' && (
              <SparklesIcon className="h-4 w-4 text-yellow-400 animate-spin-slow" />
            )}
          </button>
          
          <button
            className={cn(
              "flex-1 py-3 px-4 flex items-center justify-center gap-2 font-orbitron",
              "transition-all duration-300",
              activeTab === 'login'
                ? "bg-[#a100ff]/10 text-[#a100ff] border-b-2 border-[#a100ff]"
                : "text-white/70 hover:text-white hover:bg-white/5"
            )}
            onClick={() => {
              setActiveTab('login');
              playClick();
            }}
          >
            <RadarIcon className="h-4 w-4" />
            <span>Unlock Grid Terminal</span>
            {activeTab === 'login' && (
              <div className="absolute w-8 h-8 rounded-full border border-[#a100ff] animate-ping opacity-30"></div>
            )}
          </button>
        </div>
        
        <div className="p-6 text-white h-[calc(100%-56px)] flex flex-col">
          {/* Signup form */}
          {activeTab === 'signup' && (
            <form onSubmit={handleSignup} className="flex flex-col space-y-4 h-full">
              {/* Green scan line effect */}
              <div className="absolute left-0 top-1/4 w-full h-px bg-neon-green/30 opacity-50 animate-scanning"></div>
              
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Engineer Name"
                  className="bg-gray-900/80 border-neon-green/50 text-white focus:border-neon-green focus:ring-1 focus:ring-neon-green"
                  value={signupName}
                  onChange={(e) => {
                    setSignupName(e.target.value);
                    if (e.target.value.length > signupName.length) playTyping();
                  }}
                />
              </div>
              
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Secure Transmission Channel (Email)"
                  className="bg-gray-900/80 border-neon-green/50 text-white focus:border-neon-green focus:ring-1 focus:ring-neon-green"
                  value={signupEmail}
                  onChange={(e) => {
                    setSignupEmail(e.target.value);
                    if (e.target.value.length > signupEmail.length) playTyping();
                  }}
                />
              </div>
              
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Access Code (Password)"
                  className="bg-gray-900/80 border-neon-green/50 text-white focus:border-neon-green focus:ring-1 focus:ring-neon-green"
                  value={signupPassword}
                  onChange={(e) => {
                    setSignupPassword(e.target.value);
                    if (e.target.value.length > signupPassword.length) playTyping();
                  }}
                />
              </div>
              
              <div className="relative">
                <button
                  type="button"
                  className="w-full flex items-center justify-between py-2 px-3 bg-gray-900/80 border border-neon-green/50 text-white rounded-md"
                  onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                >
                  <span>{
                    {
                      'developer': 'Neural Network Engineer',
                      'designer': 'Interface Architect',
                      'analyst': 'Data Extraction Specialist',
                      'manager': 'Grid Supervisor'
                    }[signupRole] || 'Select Role'
                  }</span>
                  <span className="text-neon-green">▼</span>
                </button>
                
                {roleDropdownOpen && (
                  <div className="absolute top-full left-0 w-full mt-1 bg-gray-900/95 border border-neon-green/40 rounded-md z-10 animate-fade">
                    {[
                      { id: 'developer', name: 'Neural Network Engineer' },
                      { id: 'designer', name: 'Interface Architect' },
                      { id: 'analyst', name: 'Data Extraction Specialist' },
                      { id: 'manager', name: 'Grid Supervisor' }
                    ].map((role) => (
                      <button
                        key={role.id}
                        type="button"
                        className="w-full text-left px-3 py-2 hover:bg-neon-green/20 transition-colors"
                        onClick={() => {
                          setSignupRole(role.id);
                          setRoleDropdownOpen(false);
                          playClick();
                        }}
                      >
                        {role.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex-grow"></div>
              
              <Button
                id="signup-button"
                type="submit"
                disabled={isSigningUp}
                className={cn(
                  "mt-4 w-full bg-neon-green/80 text-black hover:bg-neon-green",
                  "font-orbitron tracking-wide font-bold",
                  "border border-neon-green shadow-[0_0_10px_rgba(0,255,0,0.5)]",
                  "transition-all duration-300 transform hover:scale-105",
                  "animate-pulse-glow"
                )}
              >
                {isSigningUp ? (
                  <span className="flex items-center justify-center">
                    <span className="mr-2 h-4 w-4 rounded-full border-2 border-t-transparent border-black animate-spin"></span>
                    Deploying ID...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <ShieldIcon className="mr-2 h-4 w-4" />
                    Deploy Engineer ID
                  </span>
                )}
              </Button>
            </form>
          )}
          
          {/* Login form */}
          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="flex flex-col space-y-4 h-full">
              {/* Purple static distortion effect */}
              <div 
                className="absolute inset-0 pointer-events-none opacity-10"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="a"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23a)" opacity="0.5"/%3E%3C/svg%3E")',
                  backgroundSize: 'cover',
                  animation: 'pulse 2s ease-in-out infinite alternate'
                }}
              ></div>
              
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Grid Access ID (Email)"
                  className="bg-gray-900/80 border-[#a100ff]/50 text-white focus:border-[#a100ff] focus:ring-1 focus:ring-[#a100ff]"
                  value={loginEmail}
                  onChange={(e) => {
                    setLoginEmail(e.target.value);
                    if (e.target.value.length > loginEmail.length) playTyping();
                  }}
                />
              </div>
              
              <div className="relative">
                <Input
                  type="password"
                  placeholder="Terminal Key (Password)"
                  className="bg-gray-900/80 border-[#a100ff]/50 text-white focus:border-[#a100ff] focus:ring-1 focus:ring-[#a100ff]"
                  value={loginPassword}
                  onChange={(e) => {
                    setLoginPassword(e.target.value);
                    if (e.target.value.length > loginPassword.length) playTyping();
                  }}
                />
              </div>
              
              <div className="flex-grow"></div>
              
              <Button
                id="login-button"
                type="submit"
                disabled={isLoggingIn}
                className={cn(
                  "mt-4 w-full bg-[#a100ff]/80 text-white hover:bg-[#a100ff]",
                  "font-orbitron tracking-wide font-bold",
                  "border border-[#a100ff] shadow-[0_0_10px_rgba(161,0,255,0.5)]",
                  "transition-all duration-300 transform hover:scale-105",
                  "animate-pulse-glow"
                )}
              >
                {isLoggingIn ? (
                  <span className="flex items-center justify-center">
                    <span className="mr-2 h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                    Accessing...
                  </span>
                ) : (
                  <span className="flex items-center justify-center">
                    <RadarIcon className="mr-2 h-4 w-4" />
                    Access Terminal
                  </span>
                )}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
