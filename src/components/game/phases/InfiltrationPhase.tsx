
import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import ChallengePanel from '@/components/game/ChallengePanel';
import ProgressTracker from '@/components/game/ProgressTracker';
import Commander from '@/components/characters/Commander';
import Ava from '@/components/characters/Ava';
import TheCore from '@/components/characters/TheCore';
import { GameChoice } from '@/types/game';

const infiltrationScenarios: GameChoice[] = [
  {
    id: 'inf_1_1',
    type: 'technical',
    scenario: 1,
    phase: 'infiltration',
    question: "The Core's first line of defense is a 6-digit PIN system. How will you approach cracking it?",
    options: [
      {
        id: 'inf_1_1a',
        text: "Deploy an optimized brute-force algorithm with parallel processing",
        traits: {
          codingProficiency: 3,
          algorithmicThinking: 2,
          optimization: 2,
          security: 1,
          technicalSkill: 3
        }
      },
      {
        id: 'inf_1_1b',
        text: "Analyze system patterns and use predictive modeling to narrow possibilities",
        traits: {
          aiMlKnowledge: 3,
          analytical: 2,
          problemSolving: 2,
          attentionToDetail: 1,
          convergentThinking: 3
        }
      },
      {
        id: 'inf_1_1c',
        text: "Implement a hybrid approach combining pattern analysis with targeted testing",
        traits: {
          adaptability: 2,
          creative: 2,
          optimization: 2,
          problemSolving: 2,
          technicalSkill: 1,
          divergentThinking: 2
        }
      }
    ]
  },
  {
    id: 'inf_1_2',
    type: 'analytical',
    scenario: 1,
    phase: 'infiltration',
    question: "You've detected anomalies in The Core's defense patterns. Which AI model would be most effective for analysis?",
    options: [
      {
        id: 'inf_1_2a',
        text: "Deploy a Decision Tree model for fast, interpretable results",
        traits: {
          aiMlKnowledge: 2,
          analytical: 3,
          determination: 2,
          attentionToDetail: 1,
          convergentThinking: 2
        }
      },
      {
        id: 'inf_1_2b',
        text: "Implement an LSTM network for temporal pattern recognition",
        traits: {
          aiMlKnowledge: 3,
          optimization: 2,
          creative: 2,
          problemSolving: 1,
          technicalSkill: 2,
          divergentThinking: 1
        }
      }
    ]
  }
];

const InfiltrationPhase: React.FC = () => {
  const { updateProgress, setGamePhase } = useGame();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [commanderMood, setCommanderMood] = useState<'neutral' | 'stern' | 'approving' | 'concerned'>('stern');
  const [avaMood, setAvaMood] = useState<'neutral' | 'curious' | 'helpful' | 'concerned'>('helpful');
  const [coreIntensity, setCoreIntensity] = useState<'dormant' | 'active' | 'threatening' | 'extreme'>('active');

  const handleChallengeComplete = () => {
    if (currentScenarioIndex < infiltrationScenarios.length - 1) {
      setCurrentScenarioIndex(prev => prev + 1);
      updateProgress(Math.floor((currentScenarioIndex + 1) / infiltrationScenarios.length * 20));
      
      // Update character moods for variety
      setCommanderMood(['neutral', 'stern', 'approving', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setAvaMood(['neutral', 'curious', 'helpful', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setCoreIntensity(['active', 'threatening', 'threatening', 'extreme'][Math.floor(Math.random() * 4)] as any);
    } else {
      updateProgress(20);
      setGamePhase('systems');
    }
  };

  const currentScenario = infiltrationScenarios[currentScenarioIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 starry-bg opacity-70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col h-full">
        <div className="mb-6">
          <h1 className="font-orbitron text-2xl md:text-3xl text-white mb-2">
            <span className="text-neon-blue">Phase 1:</span> System Infiltration
          </h1>
          <p className="text-muted-foreground">
            Break through The Core's initial defenses and establish a foothold in Nebula City's systems
          </p>
        </div>
        
        <div className="mb-8">
          <ProgressTracker />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="phase-1-badge">Neural Interface Infiltration Protocol</div>
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

export default InfiltrationPhase;
