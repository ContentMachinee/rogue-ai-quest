
import React from 'react';
import { useGame } from '@/context/GameContext';
import IntroSequence from './IntroSequence';
import TechnicalChallenge from './phase1/TechnicalChallenge';
import CreativeChallenge from './phase2/CreativeChallenge';
import EthicalChallenge from './phase3/EthicalChallenge';
import ResultsScreen from './ResultsScreen';

const GameHub: React.FC = () => {
  const { gameData } = useGame();
  const { currentPhase } = gameData;

  return (
    <div className="min-h-screen bg-space">
      {currentPhase === 'intro' && <IntroSequence />}
      {currentPhase === 'phase1' && <TechnicalChallenge />}
      {currentPhase === 'phase2' && <CreativeChallenge />}
      {currentPhase === 'phase3' && <EthicalChallenge />}
      {currentPhase === 'results' && <ResultsScreen />}
    </div>
  );
};

export default GameHub;
