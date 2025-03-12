
import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import ChallengePanel from '@/components/game/ChallengePanel';
import ProgressTracker from '@/components/game/ProgressTracker';
import Commander from '@/components/characters/Commander';
import Ava from '@/components/characters/Ava';
import TheCore from '@/components/characters/TheCore';
import { GameChoice, ScenarioId } from '@/types/game';

const counterScenarios: GameChoice[] = [
  {
    id: 'count_1_1',
    type: 'technical',
    scenario: 4,
    phase: 'counter',
    question: "The Core is adapting to your containment strategies. How will you counter its learning capabilities?",
    options: [
      {
        id: 'count_1_1a',
        text: "Implement a randomized attack vector that changes unpredictably",
        traits: {
          creative: 3,
          adaptability: 3,
          divergentThinking: 2,
          riskTaking: 2
        }
      },
      {
        id: 'count_1_1b',
        text: "Deploy a precisely calculated multi-layered defense with predictive countermeasures",
        traits: {
          analytical: 3,
          codingProficiency: 2,
          convergentThinking: 2,
          security: 2
        }
      }
    ]
  }
];

interface CounterPhaseProps {
  scenarioId?: ScenarioId;
}

const CounterPhase: React.FC<CounterPhaseProps> = ({ scenarioId }) => {
  const { updateProgress, setGamePhase } = useGame();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [commanderMood, setCommanderMood] = useState<'neutral' | 'stern' | 'approving' | 'concerned'>('stern');
  const [avaMood, setAvaMood] = useState<'neutral' | 'curious' | 'helpful' | 'concerned'>('helpful');
  const [coreIntensity, setCoreIntensity] = useState<'dormant' | 'active' | 'threatening' | 'extreme'>('extreme');

  const handleChallengeComplete = () => {
    if (currentScenarioIndex < counterScenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      updateProgress(60 + Math.floor((currentScenarioIndex + 1) / counterScenarios.length * 20));
      
      // Update character moods for variety
      setCommanderMood(['neutral', 'stern', 'approving', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setAvaMood(['neutral', 'curious', 'helpful', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setCoreIntensity(['active', 'threatening', 'threatening', 'extreme'][Math.floor(Math.random() * 4)] as any);
    } else {
      updateProgress(80);
      setGamePhase('final');
    }
  };

  const currentScenario = counterScenarios[currentScenarioIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 starry-bg opacity-70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col h-full">
        <div className="mb-6">
          <h1 className="font-orbitron text-2xl md:text-3xl text-white mb-2">
            <span className="text-neon-blue">Phase 4:</span> Counteroffensive
          </h1>
          <p className="text-muted-foreground">
            Launch sophisticated counter-attacks to weaken The Core's control matrix
          </p>
        </div>
        
        <div className="mb-8">
          <ProgressTracker />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="phase-4-badge">Counter-Strike Protocol</div>
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

export default CounterPhase;
