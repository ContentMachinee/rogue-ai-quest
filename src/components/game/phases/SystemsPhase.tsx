
import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import ChallengePanel from '@/components/game/ChallengePanel';
import ProgressTracker from '@/components/game/ProgressTracker';
import Commander from '@/components/characters/Commander';
import Ava from '@/components/characters/Ava';
import TheCore from '@/components/characters/TheCore';
import { GameChoice, ScenarioId } from '@/types/game';

const systemsScenarios: GameChoice[] = [
  {
    id: 'sys_1_1',
    type: 'technical',
    scenario: 2,
    phase: 'systems',
    question: "The Core has corrupted Nebula City's power grid. What approach will you take to restore it?",
    options: [
      {
        id: 'sys_1_1a',
        text: "Implement a parallel processing system to rapidly recalculate load balancing",
        traits: {
          codingProficiency: 3,
          optimization: 3,
          problemSolving: 2,
          technicalSkill: 3
        }
      },
      {
        id: 'sys_1_1b',
        text: "Create a neural network to predict and adapt to power fluctuations",
        traits: {
          aiMlKnowledge: 3,
          adaptability: 2,
          creative: 2,
          divergentThinking: 2
        }
      }
    ]
  }
];

interface SystemsPhaseProps {
  scenarioId?: ScenarioId;
}

const SystemsPhase: React.FC<SystemsPhaseProps> = ({ scenarioId }) => {
  const { updateProgress, setGamePhase } = useGame();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [commanderMood, setCommanderMood] = useState<'neutral' | 'stern' | 'approving' | 'concerned'>('approving');
  const [avaMood, setAvaMood] = useState<'neutral' | 'curious' | 'helpful' | 'concerned'>('curious');
  const [coreIntensity, setCoreIntensity] = useState<'dormant' | 'active' | 'threatening' | 'extreme'>('threatening');

  const handleChallengeComplete = () => {
    if (currentScenarioIndex < systemsScenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      updateProgress(20 + Math.floor((currentScenarioIndex + 1) / systemsScenarios.length * 20));
      
      // Update character moods for variety
      setCommanderMood(['neutral', 'stern', 'approving', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setAvaMood(['neutral', 'curious', 'helpful', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setCoreIntensity(['active', 'threatening', 'threatening', 'extreme'][Math.floor(Math.random() * 4)] as any);
    } else {
      updateProgress(40);
      setGamePhase('ethical');
    }
  };

  const currentScenario = systemsScenarios[currentScenarioIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 starry-bg opacity-70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col h-full">
        <div className="mb-6">
          <h1 className="font-orbitron text-2xl md:text-3xl text-white mb-2">
            <span className="text-neon-green">Phase 2:</span> Systems Recovery
          </h1>
          <p className="text-muted-foreground">
            Restore critical systems across Nebula City that have been corrupted by The Core
          </p>
        </div>
        
        <div className="mb-8">
          <ProgressTracker />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="phase-2-badge">Systems Restoration Protocol</div>
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

export default SystemsPhase;
