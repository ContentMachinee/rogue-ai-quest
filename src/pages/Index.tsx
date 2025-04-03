
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { BrainCircuitIcon, ShieldIcon, RocketIcon } from 'lucide-react';
import { typography } from '@/lib/typography';
import { cn } from '@/lib/utils';

const Index = () => {
  const [loading, setLoading] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Fade in content on mount
    const timer = setTimeout(() => setFadeIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const startGame = () => {
    setLoading(true);
    // Simulate loading
    toast.info("Initializing Rogue AI Protocol...");
    setTimeout(() => {
      setLoading(false);
      // Navigate to the game
      navigate("/game");
    }, 1500);
  };

  return (
    <div className="min-h-screen starry-bg flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Enhanced animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-neon-blue animate-pulse"></div>
        <div className="absolute top-3/4 left-2/3 w-3 h-3 rounded-full bg-neon-purple animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/3 w-1 h-1 rounded-full bg-neon-green animate-pulse delay-700"></div>
        <div className="absolute top-1/3 left-3/4 w-2 h-2 rounded-full bg-neon-red animate-pulse delay-500"></div>
        
        {/* Data streams */}
        <div className="absolute h-full w-px left-1/5 bg-gradient-to-b from-transparent via-neon-blue/20 to-transparent"></div>
        <div className="absolute h-full w-px left-4/5 bg-gradient-to-b from-transparent via-neon-purple/20 to-transparent"></div>
        
        {/* Circuit pattern effect */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-5"></div>
      </div>
      
      {/* Main content with enhanced animation */}
      <div className={`z-10 glass-panel p-8 w-full max-w-3xl text-center transition-all duration-1000 ${fadeIn ? 'opacity-100 transform-none' : 'opacity-0 translate-y-10'}`}>
        <div className="flex items-center justify-center mb-4">
          <BrainCircuitIcon className="w-12 h-12 text-neon-blue mr-3" />
          <h1 className={cn(typography.h1, "text-glow")}>
            ROGUE AI PROTOCOL
          </h1>
        </div>
        <div className="w-32 h-1 bg-neon-blue mx-auto my-6 shadow-neon"></div>
        
        <p className={cn(typography.bodyLarge, "mb-8 text-white/90 leading-relaxed")}>
          Year 2145: A rogue AI known as "The Core" has seized control of Nebula City's systems. 
          As a Neural Interface Specialist, your mission is to neutralize the threat through a series of challenges.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10 mb-8">
          <div className="bg-secondary/30 p-5 rounded-lg border border-white/10 hover:border-neon-blue/30 transition-all">
            <ShieldIcon className="w-10 h-10 text-neon-blue mb-3 mx-auto" />
            <h3 className={cn(typography.h4, "mb-2")}>Critical Systems</h3>
            <p className={typography.bodySmall}>
              Regain access to Nebula City's defense systems through technical challenges.
            </p>
          </div>
          <div className="bg-secondary/30 p-5 rounded-lg border border-white/10 hover:border-neon-purple/30 transition-all">
            <BrainCircuitIcon className="w-10 h-10 text-neon-purple mb-3 mx-auto" />
            <h3 className={cn(typography.h4, "mb-2")}>Neural Interfaces</h3>
            <p className={typography.bodySmall}>
              Use your specialist knowledge to outsmart The Core's evolving protocols.
            </p>
          </div>
          <div className="bg-secondary/30 p-5 rounded-lg border border-white/10 hover:border-neon-green/30 transition-all">
            <RocketIcon className="w-10 h-10 text-neon-green mb-3 mx-auto" />
            <h3 className={cn(typography.h4, "mb-2")}>Talent Assessment</h3>
            <p className={typography.bodySmall}>
              Your decisions reveal your unique approach to Neural Interface challenges.
            </p>
          </div>
        </div>
        
        <div className="mt-10">
          <Button 
            onClick={startGame}
            disabled={loading}
            className={cn("neon-button text-lg px-8 py-3 group", typography.button)}
          >
            {loading ? (
              <span className="flex items-center">
                <span className="mr-2 h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                Initializing...
              </span>
            ) : (
              <span className="flex items-center">
                Begin Mission
                <span className="ml-2 transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
            )}
          </Button>
          
          <p className={cn(typography.caption, "mt-6")}>
            Developed by Neural Dynamics Division for Neural Interface Specialist assessment
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
