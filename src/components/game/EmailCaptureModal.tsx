
import React, { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { subscribeEmail } from '@/services/authService';
import { toast } from 'sonner';

interface EmailCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EmailCaptureModal: React.FC<EmailCaptureModalProps> = ({ isOpen, onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remainingSlots, setRemainingSlots] = useState(25);
  const [isGlitching, setIsGlitching] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Play synthetic beep sound
  const playBeep = () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  };

  // Handle countdown effect
  useEffect(() => {
    if (!isOpen) return;
    
    const countdownInterval = setInterval(() => {
      setRemainingSlots(prev => Math.max(1, prev - 1));
    }, 10000);
    
    return () => clearInterval(countdownInterval);
  }, [isOpen]);
  
  // Handle glitch effect
  useEffect(() => {
    if (!isOpen) return;
    
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 500);
    }, 5000);
    
    return () => clearInterval(glitchInterval);
  }, [isOpen]);
  
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

  // Handle email submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email) {
      toast.error('All fields are required for transmission clearance');
      return;
    }
    
    setIsSubmitting(true);
    
    const success = await subscribeEmail({ name, email });
    
    if (success) {
      playBeep();
      // Create particle burst effect
      createParticleBurst();
      setTimeout(() => {
        setName('');
        setEmail('');
        onClose();
      }, 2000);
    }
    
    setIsSubmitting(false);
  };
  
  // Create particle burst effect
  const createParticleBurst = () => {
    const button = document.getElementById('transmit-button');
    if (!button) return;
    
    const rect = button.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    for (let i = 0; i < 20; i++) {
      const particle = document.createElement('div');
      particle.className = 'absolute bg-yellow-400 rounded-full z-50';
      particle.style.width = '4px';
      particle.style.height = '4px';
      particle.style.left = `${centerX}px`;
      particle.style.top = `${centerY}px`;
      particle.style.transform = 'translate(-50%, -50%)';
      
      // Random direction
      const angle = Math.random() * Math.PI * 2;
      const speed = 1 + Math.random() * 5;
      const dx = Math.cos(angle) * speed;
      const dy = Math.sin(angle) * speed;
      
      document.body.appendChild(particle);
      
      let x = 0;
      let y = 0;
      let opacity = 1;
      
      const animate = () => {
        if (opacity <= 0) {
          particle.remove();
          return;
        }
        
        x += dx;
        y += dy;
        opacity -= 0.02;
        
        particle.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
        particle.style.opacity = opacity.toString();
        
        requestAnimationFrame(animate);
      };
      
      requestAnimationFrame(animate);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/70 backdrop-blur-sm">
      <div 
        ref={modalRef}
        className={cn(
          "relative w-[400px] h-[300px] bg-[#1a1a2e]/70 backdrop-blur-md rounded-md border overflow-hidden",
          "transition-all duration-500",
          "animate-appear"
        )}
        style={{
          boxShadow: `0 0 15px ${isGlitching ? '#ff0000' : '#fff'}`
        }}
      >
        {/* Flickering border effect */}
        <div className="absolute inset-0 border border-white/30 rounded-md animate-pulse-glow"></div>
        
        {/* Scanning line effect */}
        <div className="absolute left-0 top-0 w-full h-1 bg-neon-green animate-scanning"></div>
        
        <div className="p-6 text-white h-full flex flex-col">
          <h2 
            className={cn(
              typography.h3, 
              "text-center mb-2 font-orbitron tracking-wide",
              isGlitching ? "text-red-500" : "text-white"
            )}
          >
            Incoming Transmission: Join the Alliance!
          </h2>
          
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center space-x-2 bg-black/20 px-3 py-1 rounded-md">
              <span className="text-white font-mono">Grid Access Slots:</span>
              <span className="text-red-500 font-bold font-mono text-lg">
                {remainingSlots.toString().padStart(2, '0')}
              </span>
              <span className="text-red-500 font-bold animate-pulse">▮</span>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4 flex-grow">
            <div className="relative">
              <Input
                type="text"
                placeholder="Engineer Name"
                className="bg-gray-900/80 border-neon-green/50 text-white focus:border-neon-green focus:ring-1 focus:ring-neon-green"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <div className="absolute left-0 top-1/2 w-full h-px bg-neon-green/30 transform -translate-y-1/2 pointer-events-none opacity-0 transition-opacity group-focus-within:opacity-100"></div>
            </div>
            
            <div className="relative">
              <Input
                type="email"
                placeholder="Secure Transmission Channel (Email)"
                className="bg-gray-900/80 border-neon-green/50 text-white focus:border-neon-green focus:ring-1 focus:ring-neon-green"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <div className="absolute left-0 top-1/2 w-full h-px bg-neon-green/30 transform -translate-y-1/2 pointer-events-none opacity-0 transition-opacity group-focus-within:opacity-100"></div>
            </div>
            
            <div className="flex-grow"></div>
            
            <Button
              id="transmit-button"
              type="submit"
              disabled={isSubmitting}
              className={cn(
                "mt-4 w-full bg-neon-green/80 text-black hover:bg-neon-green",
                "font-orbitron tracking-wide font-bold",
                "border border-neon-green shadow-[0_0_10px_rgba(0,255,0,0.5)]",
                "transition-all duration-300 transform hover:scale-105",
                "animate-pulse-glow"
              )}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2 h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                  Transmitting...
                </span>
              ) : (
                "Transmit Clearance"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailCaptureModal;
