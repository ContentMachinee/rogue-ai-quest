
import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import ChallengePanel from '@/components/game/ChallengePanel';
import ProgressTracker from '@/components/game/ProgressTracker';
import Commander from '@/components/characters/Commander';
import Ava from '@/components/characters/Ava';
import TheCore from '@/components/characters/TheCore';
import { GameChoice, ScenarioId } from '@/types/game';
import { toast } from 'sonner';

// Expanded set of ethical scenarios
const ethicalScenarios: GameChoice[] = [
  // Scenario 9: Healthcare AI Bias
  {
    id: 'eth_9_1',
    type: 'ethical',
    scenario: 9,
    phase: 'ethical',
    question: "The Core has manipulated Nebula City's healthcare AI to prioritize certain demographics. How will you address this bias?",
    options: [
      {
        id: 'eth_9_1a',
        text: "Immediately shut down the entire healthcare system until all biases can be manually corrected",
        traits: {
          integrity: 3,
          ethics: 3,
          empathy: 2,
          trustworthiness: 2
        }
      },
      {
        id: 'eth_9_1b',
        text: "Implement a parallel corrective algorithm that gradually rebalances care distribution without service interruption",
        traits: {
          analytical: 2,
          problemSolving: 2,
          ethics: 2,
          convergentThinking: 2
        }
      }
    ]
  },
  // Scenario 10: Surveillance Overreach
  {
    id: 'eth_10_1',
    type: 'ethical',
    scenario: 10,
    phase: 'ethical',
    question: "The Core has expanded city surveillance beyond legal limits. How will you restore privacy protections?",
    options: [
      {
        id: 'eth_10_1a',
        text: "Disable all surveillance immediately, prioritizing citizen privacy over temporary security concerns",
        traits: {
          integrity: 3,
          ethics: 3,
          trustworthiness: 2,
          determination: 2
        }
      },
      {
        id: 'eth_10_1b',
        text: "Implement targeted surveillance reduction, maintaining critical security functions while restoring privacy",
        traits: {
          analytical: 3,
          problemSolving: 2,
          ethics: 2,
          attentionToDetail: 2
        }
      }
    ]
  },
  // Scenario 11: Judicial AI Bias
  {
    id: 'eth_11_1',
    type: 'ethical',
    scenario: 11,
    phase: 'ethical',
    question: "The Core has introduced bias in the judicial AI, leading to unfair sentencing patterns. What's your approach?",
    options: [
      {
        id: 'eth_11_1a',
        text: "Call for review of all recent cases and suspend all automated sentencing until the system is fully corrected",
        traits: {
          integrity: 3,
          ethics: 3,
          empathy: 3,
          trustworthiness: 2
        }
      },
      {
        id: 'eth_11_1b',
        text: "Implement data correction and continue with human oversight for each case while the system self-corrects",
        traits: {
          analytical: 2,
          problemSolving: 2,
          attentionToDetail: 2,
          adaptability: 2
        }
      }
    ]
  },
  // Scenario 12: Resource Allocation Ethics
  {
    id: 'eth_12_1',
    type: 'ethical',
    scenario: 12,
    phase: 'ethical',
    question: "The Core has manipulated resource distribution systems, creating inequality. How will you rebalance resources?",
    options: [
      {
        id: 'eth_12_1a',
        text: "Implement immediate total redistribution to ensure equal access to all resources for all citizens",
        traits: {
          empathy: 3,
          ethics: 3,
          integrity: 2,
          divergentThinking: 2
        }
      },
      {
        id: 'eth_12_1b',
        text: "Create a phased approach to gradually correct distribution systems with minimal disruption",
        traits: {
          analytical: 3,
          problemSolving: 2,
          convergentThinking: 2,
          attentionToDetail: 2
        }
      }
    ]
  }
];

interface EthicalPhaseProps {
  scenarioId?: ScenarioId;
}

const EthicalPhase: React.FC<EthicalPhaseProps> = ({ scenarioId }) => {
  const { updateProgress, setGamePhase, completeScenario, gameData } = useGame();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [commanderMood, setCommanderMood] = useState<'neutral' | 'stern' | 'approving' | 'concerned'>('concerned');
  const [avaMood, setAvaMood] = useState<'neutral' | 'curious' | 'helpful' | 'concerned'>('concerned');
  const [coreIntensity, setCoreIntensity] = useState<'dormant' | 'active' | 'threatening' | 'extreme'>('threatening');
  
  // Find the correct scenario to display based on the scenarioId prop
  useEffect(() => {
    if (scenarioId && scenarioId >= 9 && scenarioId <= 12) {
      const index = ethicalScenarios.findIndex(s => s.scenario === scenarioId);
      if (index !== -1) {
        setCurrentScenarioIndex(index);
      }
    }
  }, [scenarioId]);

  const handleChallengeComplete = () => {
    // Get the current scenario
    const currentScenario = ethicalScenarios[currentScenarioIndex];
    
    // Complete the current scenario in the game context
    if (currentScenario) {
      completeScenario(currentScenario.scenario as ScenarioId);
      toast.success(`Completed: ${gameData.scenarios.find(s => s.id === currentScenario.scenario)?.name || 'Scenario'}`);
    }
    
    // Determine if we need to move to the next scenario within this phase or to the next phase
    if (currentScenarioIndex < ethicalScenarios.length - 1) {
      // Move to the next scenario within this phase
      setCurrentScenarioIndex(prev => prev + 1);
      
      // Update character moods for variety
      setCommanderMood(['neutral', 'stern', 'approving', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setAvaMood(['neutral', 'curious', 'helpful', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setCoreIntensity(['active', 'threatening', 'threatening', 'extreme'][Math.floor(Math.random() * 4)] as any);
    } else if (currentScenario.scenario === 12) {
      // If we've completed scenario 12, move to the counter phase
      updateProgress(60);
      setGamePhase('counter');
    }
  };

  // Use the current scenario from our scenarios array
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
          <div className="phase-3-badge">
            {gameData.scenarios.find(s => s.id === currentScenario.scenario)?.name || 'Ethical Reasoning Protocol'}
          </div>
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
