
import React, { useEffect } from 'react';
import GameHub from '@/components/game/GameHub';
import { useGame } from '@/context/GameContext';
import { toast } from 'sonner';

const GamePage = () => {
  const { gameData, setGamePhase } = useGame();

  useEffect(() => {
    // Initialize the game if it's not already started
    if (gameData.currentPhase === 'intro') {
      toast.info("Beginning Nebula City security protocols...");
    }
  }, [gameData.currentPhase]);

  return (
    <div className="min-h-screen starry-bg flex items-center justify-center p-4 overflow-hidden">
      <GameHub />
    </div>
  );
};

export default GamePage;
