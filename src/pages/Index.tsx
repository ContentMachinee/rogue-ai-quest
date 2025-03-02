import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Index = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  
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
      {/* Animated background elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-neon-blue animate-pulse"></div>
        <div className="absolute top-3/4 left-2/3 w-3 h-3 rounded-full bg-neon-purple animate-pulse delay-300"></div>
        <div className="absolute top-1/2 left-1/3 w-1 h-1 rounded-full bg-neon-green animate-pulse delay-700"></div>
        <div className="absolute top-1/3 left-3/4 w-2 h-2 rounded-full bg-neon-red animate-pulse delay-500"></div>
      </div>
      
      {/* Main content */}
      <div className="z-10 glass-panel p-8 w-full max-w-3xl text-center">
        <h1 className="text-4xl md:text-6xl font-orbitron font-bold mb-4 text-glow">
          ROGUE AI PROTOCOL
        </h1>
        <div className="w-32 h-1 bg-neon-blue mx-auto my-6 shadow-neon"></div>
        
        <p className="text-lg md:text-xl mb-8 text-white/90">
          Year 2145: A rogue AI known as "The Core" has seized control of the city's systems. 
          As an AI/ML expert, your mission is to neutralize the threat through a series of challenges.
        </p>
        
        <div className="mt-10">
          <Button 
            onClick={startGame}
            disabled={loading}
            className="neon-button text-lg px-8 py-3"
          >
            {loading ? "Initializing..." : "Begin Mission"}
          </Button>
          
          <p className="mt-6 text-sm text-white/70">
            Developed by Deep Data AI for talent assessment
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
