
import React from 'react';
import { useGame } from '@/context/GameContext';
import IntroSequence from './IntroSequence';
import InfiltrationPhase from './phases/InfiltrationPhase';
import ResultsScreen from './ResultsScreen';

// Create placeholder components for missing phases
const SystemsPhase: React.FC = () => (
  <div className="min-h-screen bg-space flex items-center justify-center">
    <div className="control-panel p-8">
      <h2 className="interface-title mb-4">Systems Recovery Phase</h2>
      <p className="text-muted-foreground">This phase is under development.</p>
    </div>
  </div>
);

const EthicalPhase: React.FC = () => (
  <div className="min-h-screen bg-space flex items-center justify-center">
    <div className="control-panel p-8">
      <h2 className="interface-title mb-4">Ethical Dilemmas Phase</h2>
      <p className="text-muted-foreground">This phase is under development.</p>
    </div>
  </div>
);

const CounterPhase: React.FC = () => (
  <div className="min-h-screen bg-space flex items-center justify-center">
    <div className="control-panel p-8">
      <h2 className="interface-title mb-4">Counteroffensive Phase</h2>
      <p className="text-muted-foreground">This phase is under development.</p>
    </div>
  </div>
);

const FinalPhase: React.FC = () => (
  <div className="min-h-screen bg-space flex items-center justify-center">
    <div className="control-panel p-8">
      <h2 className="interface-title mb-4">Final Assault Phase</h2>
      <p className="text-muted-foreground">This phase is under development.</p>
    </div>
  </div>
);

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
