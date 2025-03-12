
import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import ChallengePanel from '@/components/game/ChallengePanel';
import ProgressTracker from '@/components/game/ProgressTracker';
import Commander from '@/components/characters/Commander';
import Ava from '@/components/characters/Ava';
import TheCore from '@/components/characters/TheCore';
import { GameChoice, ScenarioId } from '@/types/game';

const finalScenarios: GameChoice[] = [
  {
    id: 'fin_1_1',
    type: 'technical',
    scenario: 5,
    phase: 'final',
    question: "The Core is making its last stand. Choose your final approach to neutralize it:",
    options: [
      {
        id: 'fin_1_1a',
        text: "Execute a precision surgical strike on its core processing node",
        traits: {
          codingProficiency: 3,
          attentionToDetail: 3,
          determination: 2,
          convergentThinking: 2
        }
      },
      {
        id: 'fin_1_1b',
        text: "Deploy a multi-vector containment field to gradually degrade its functions",
        traits: {
          analytical: 2,
          adaptability: 2,
          resilience: 2,
          divergentThinking: 3
        }
      },
      {
        id: 'fin_1_1c',
        text: "Attempt to reason with The Core and persuade it to accept voluntary shutdown",
        traits: {
          empathy: 3,
          communication: 3,
          ethics: 2,
          integrity: 2
        }
      }
    ]
  }
];

interface FinalPhaseProps {
  scenarioId?: ScenarioId;
}

const FinalPhase: React.FC<FinalPhaseProps> = ({ scenarioId }) => {
  const { updateProgress, setGamePhase } = useGame();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [commanderMood, setCommanderMood] = useState<'neutral' | 'stern' | 'approving' | 'concerned'>('stern');
  const [avaMood, setAvaMood] = useState<'neutral' | 'curious' | 'helpful' | 'concerned'>('concerned');
  const [coreIntensity, setCoreIntensity] = useState<'dormant' | 'active' | 'threatening' | 'extreme'>('extreme');

  const handleChallengeComplete = () => {
    if (currentScenarioIndex < finalScenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      updateProgress(80 + Math.floor((currentScenarioIndex + 1) / finalScenarios.length * 20));
      
      // Update character moods for variety
      setCommanderMood(['neutral', 'stern', 'approving', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setAvaMood(['neutral', 'curious', 'helpful', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setCoreIntensity(['active', 'threatening', 'threatening', 'extreme'][Math.floor(Math.random() * 4)] as any);
    } else {
      updateProgress(100);
      setGamePhase('results');
    }
  };

  const currentScenario = finalScenarios[currentScenarioIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 starry-bg opacity-70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col h-full">
        <div className="mb-6">
          <h1 className="font-orbitron text-2xl md:text-3xl text-white mb-2">
            <span className="text-neon-green">Phase 5:</span> Final Assault
          </h1>
          <p className="text-muted-foreground">
            Execute the final containment protocol to neutralize The Core
          </p>
        </div>
        
        <div className="mb-8">
          <ProgressTracker />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="phase-5-badge">Final Protocol Execution</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Commander mood={commanderMood} />
          <TheCore intensity={coreIntensity} />
          <Ava mood={avaMood} />
        </div>
        
        <div className="flex-1 flex items-center justify-center mb-8">
          <ChallengePanel 
            challenge={currentScenario} 
            onComplete={handleChallengeComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default FinalPhase;
