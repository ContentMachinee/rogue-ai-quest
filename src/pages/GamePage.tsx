
import React, { useEffect } from 'react';
import GameHub from '@/components/game/GameHub';
import { useGame } from '@/context/GameContext';
import { toast } from 'sonner';
import { RocketIcon, ShieldIcon, BrainIcon } from 'lucide-react';

const GamePage = () => {
  const { gameData, setGamePhase } = useGame();

  useEffect(() => {
    // Initialize the game if it's not already started
    if (gameData.currentPhase === 'intro') {
      toast.info("Beginning Nebula City security protocols...");
    }
  }, [gameData.currentPhase]);

  return (
    <div className="min-h-screen starry-bg flex items-center justify-center p-4 overflow-hidden relative">
      {/* Enhanced background animation elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[15%] left-[10%] opacity-30">
          <RocketIcon className="w-10 h-10 text-neon-blue animate-float" />
        </div>
        <div className="absolute top-[35%] right-[15%] opacity-20">
          <ShieldIcon className="w-12 h-12 text-neon-purple animate-pulse delay-300" />
        </div>
        <div className="absolute bottom-[20%] left-[20%] opacity-25">
          <BrainIcon className="w-10 h-10 text-neon-green animate-float delay-700" />
        </div>

        {/* Data streams effect */}
        <div className="data-stream left-1/4 h-full w-px bg-gradient-to-b from-transparent via-neon-blue/30 to-transparent"></div>
        <div className="data-stream left-2/3 h-full w-px bg-gradient-to-b from-transparent via-neon-purple/30 to-transparent"></div>
        
        {/* Circuit patterns */}
        <div className="absolute inset-0 bg-circuit-pattern opacity-10"></div>
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute top-0 left-0 w-full h-2/3 bg-gradient-to-b from-blue-900/10 to-transparent pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-purple-900/10 to-transparent pointer-events-none"></div>
      
      {/* Game content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto">
        <GameHub />
      </div>
    </div>
  );
};

export default GamePage;
