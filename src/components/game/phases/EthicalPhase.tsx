
import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import ChallengePanel from '@/components/game/ChallengePanel';
import ProgressTracker from '@/components/game/ProgressTracker';
import Commander from '@/components/characters/Commander';
import Ava from '@/components/characters/Ava';
import TheCore from '@/components/characters/TheCore';
import { GameChoice, ScenarioId } from '@/types/game';

const ethicalScenarios: GameChoice[] = [
  {
    id: 'eth_1_1',
    type: 'ethical',
    scenario: 3,
    phase: 'ethical',
    question: "The Core is using citizens' personal data. How will you handle this ethical dilemma?",
    options: [
      {
        id: 'eth_1_1a',
        text: "Prioritize immediate system shutdown to protect all data, risking city services",
        traits: {
          integrity: 3,
          ethics: 3,
          empathy: 2,
          trustworthiness: 2
        }
      },
      {
        id: 'eth_1_1b',
        text: "Implement selective containment to balance privacy and city functionality",
        traits: {
          analytical: 2,
          problemSolving: 2,
          ethics: 2,
          convergentThinking: 2
        }
      }
    ]
  }
];

interface EthicalPhaseProps {
  scenarioId?: ScenarioId;
}

const EthicalPhase: React.FC<EthicalPhaseProps> = ({ scenarioId }) => {
  const { updateProgress, setGamePhase } = useGame();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [commanderMood, setCommanderMood] = useState<'neutral' | 'stern' | 'approving' | 'concerned'>('concerned');
  const [avaMood, setAvaMood] = useState<'neutral' | 'curious' | 'helpful' | 'concerned'>('concerned');
  const [coreIntensity, setCoreIntensity] = useState<'dormant' | 'active' | 'threatening' | 'extreme'>('threatening');

  const handleChallengeComplete = () => {
    if (currentScenarioIndex < ethicalScenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      updateProgress(40 + Math.floor((currentScenarioIndex + 1) / ethicalScenarios.length * 20));
      
      // Update character moods for variety
      setCommanderMood(['neutral', 'stern', 'approving', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setAvaMood(['neutral', 'curious', 'helpful', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setCoreIntensity(['active', 'threatening', 'threatening', 'extreme'][Math.floor(Math.random() * 4)] as any);
    } else {
      updateProgress(60);
      setGamePhase('counter');
    }
  };

  const currentScenario = ethicalScenarios[currentScenarioIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 starry-bg opacity-70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col h-full">
        <div className="mb-6">
          <h1 className="font-orbitron text-2xl md:text-3xl text-white mb-2">
            <span className="text-neon-purple">Phase 3:</span> Ethical Dilemmas
          </h1>
          <p className="text-muted-foreground">
            Navigate complex moral and ethical challenges as you contain The Core
          </p>
        </div>
        
        <div className="mb-8">
          <ProgressTracker />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="phase-3-badge">Ethical Reasoning Protocol</div>
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

export default EthicalPhase;
