
import React from 'react';
import { useGame } from '@/context/GameContext';
import IntroSequence from './IntroSequence';
import InfiltrationPhase from './phases/InfiltrationPhase';
import SystemsPhase from './phases/SystemsPhase';
import EthicalPhase from './phases/EthicalPhase';
import CounterPhase from './phases/CounterPhase';
import FinalPhase from './phases/FinalPhase';
import ResultsScreen from './ResultsScreen';

const GameHub: React.FC = () => {
  const { gameData } = useGame();
  const { currentPhase } = gameData;

  return (
    <div className="min-h-screen bg-space">
      {currentPhase === 'intro' && <IntroSequence />}
      {(currentPhase === 'infiltration' || currentPhase === 'phase1') && <InfiltrationPhase />}
      {(currentPhase === 'systems' || currentPhase === 'phase2') && <SystemsPhase />}
      {(currentPhase === 'ethical' || currentPhase === 'phase3') && <EthicalPhase />}
      {currentPhase === 'counter' && <CounterPhase />}
      {currentPhase === 'final' && <FinalPhase />}
      {currentPhase === 'results' && <ResultsScreen />}
    </div>
  );
};

export default GameHub;
