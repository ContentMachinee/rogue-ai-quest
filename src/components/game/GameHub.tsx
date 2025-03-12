
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
  const { currentPhase, currentScenario } = gameData;

  // Get the current phase component based on current phase and scenario
  const getCurrentPhaseComponent = () => {
    switch (currentPhase) {
      case 'intro':
        return <IntroSequence />;
      case 'infiltration':
      case 'phase1':
        return <InfiltrationPhase scenarioId={currentScenario} />;
      case 'systems':
      case 'phase2':
        return <SystemsPhase />;
      case 'ethical':
      case 'phase3':
        return <EthicalPhase />;
      case 'counter':
        return <CounterPhase />;
      case 'final':
        return <FinalPhase />;
      case 'results':
        return <ResultsScreen />;
      default:
        return <IntroSequence />;
    }
  };

  return (
    <div className="min-h-screen bg-space">
      {getCurrentPhaseComponent()}
    </div>
  );
};

export default GameHub;
