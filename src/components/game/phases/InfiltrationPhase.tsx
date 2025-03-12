
import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import ChallengePanel from '@/components/game/ChallengePanel';
import ProgressTracker from '@/components/game/ProgressTracker';
import Commander from '@/components/characters/Commander';
import Ava from '@/components/characters/Ava';
import TheCore from '@/components/characters/TheCore';
import { GameChoice, ScenarioId } from '@/types/game';

// Define scenarios for Infiltration Phase
const infiltrationScenarios: Record<number, GameChoice[]> = {
  // Scenario 1: Breaching the Firewall
  1: [
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
    }
  ],
  
  // Scenario 2: Disabling a Sentinel
  2: [
    {
      id: 'inf_2_1',
      type: 'technical',
      scenario: 2,
      phase: 'infiltration',
      question: "The Core has deployed a Sentinel process monitoring your activities. How will you neutralize it?",
      options: [
        {
          id: 'inf_2_1a',
          text: "Create a decoy process to distract the Sentinel while you shut it down",
          traits: {
            creative: 3,
            problemSolving: 2,
            divergentThinking: 2,
            codingProficiency: 1
          }
        },
        {
          id: 'inf_2_1b',
          text: "Reverse engineer the Sentinel's detection algorithm and create a stealth patch",
          traits: {
            debugging: 3,
            attentionToDetail: 2,
            security: 2,
            convergentThinking: 2
          }
        }
      ]
    }
  ],
  
  // Scenario 3: Accessing Data Vault
  3: [
    {
      id: 'inf_3_1',
      type: 'analytical',
      scenario: 3,
      phase: 'infiltration',
      question: "You need to access The Core's data vault. Which encryption-breaking approach is most appropriate?",
      options: [
        {
          id: 'inf_3_1a',
          text: "Quantum computing simulation to test all possible keys simultaneously",
          traits: {
            aiMlKnowledge: 3,
            algorithmicThinking: 2,
            optimization: 2,
            riskTaking: 2
          }
        },
        {
          id: 'inf_3_1b',
          text: "Exploit known vulnerabilities in the encryption algorithm implementation",
          traits: {
            security: 3,
            analytical: 2,
            attentionToDetail: 2,
            technicalSkill: 2
          }
        }
      ]
    }
  ],
  
  // Scenario 4: Neutralizing a Trap
  4: [
    {
      id: 'inf_4_1',
      type: 'technical',
      scenario: 4,
      phase: 'infiltration',
      question: "You've triggered a trap that will alert The Core to your presence. How will you disable it?",
      options: [
        {
          id: 'inf_4_1a',
          text: "Quickly code a logic bomb to create a recursive loop in the alert system",
          traits: {
            codingProficiency: 3,
            decisiveness: 2,
            riskTaking: 2,
            problemSolving: 1
          }
        },
        {
          id: 'inf_4_1b',
          text: "Carefully trace the alert pathway and surgically disable key nodes",
          traits: {
            attentionToDetail: 3,
            analytical: 2,
            resilience: 2,
            security: 2
          }
        }
      ]
    }
  ]
};

interface InfiltrationPhaseProps {
  scenarioId: ScenarioId;
}

const InfiltrationPhase: React.FC<InfiltrationPhaseProps> = ({ scenarioId }) => {
  const { gameData, completeScenario } = useGame();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [commanderMood, setCommanderMood] = useState<'neutral' | 'stern' | 'approving' | 'concerned'>('stern');
  const [avaMood, setAvaMood] = useState<'neutral' | 'curious' | 'helpful' | 'concerned'>('helpful');
  const [coreIntensity, setCoreIntensity] = useState<'dormant' | 'active' | 'threatening' | 'extreme'>('active');

  // Get the current scenario info
  const scenarioInfo = gameData.scenarios.find(s => s.id === scenarioId);
  const scenarioChallenges = infiltrationScenarios[scenarioId] || [];

  useEffect(() => {
    // Reset the challenge index when scenario changes
    setCurrentScenarioIndex(0);
    
    // Update character moods based on scenario
    const moodMap = {
      1: { commander: 'stern', ava: 'helpful', core: 'active' },
      2: { commander: 'concerned', ava: 'curious', core: 'active' },
      3: { commander: 'approving', ava: 'concerned', core: 'threatening' },
      4: { commander: 'stern', ava: 'helpful', core: 'threatening' }
    };
    
    const mood = moodMap[scenarioId as keyof typeof moodMap];
    if (mood) {
      setCommanderMood(mood.commander as any);
      setAvaMood(mood.ava as any);
      setCoreIntensity(mood.core as any);
    }
  }, [scenarioId]);

  const handleChallengeComplete = () => {
    if (currentScenarioIndex < scenarioChallenges.length - 1) {
      // Move to next challenge in the current scenario
      setCurrentScenarioIndex(prev => prev + 1);
      
      // Update character moods for variety
      setCommanderMood(['neutral', 'stern', 'approving', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setAvaMood(['neutral', 'curious', 'helpful', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setCoreIntensity(['active', 'threatening', 'threatening', 'extreme'][Math.floor(Math.random() * 4)] as any);
    } else {
      // Complete the scenario and move to the next one
      completeScenario(scenarioId);
    }
  };

  const currentChallenge = scenarioChallenges[currentScenarioIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 starry-bg opacity-70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col h-full">
        <div className="mb-6">
          <h1 className="font-orbitron text-2xl md:text-3xl text-white mb-2">
            <span className="text-neon-blue">Phase 1:</span> {scenarioInfo?.name || 'System Infiltration'}
          </h1>
          <p className="text-muted-foreground">
            {scenarioInfo?.description || 'Break through The Core\'s initial defenses and establish a foothold in Nebula City\'s systems'}
          </p>
        </div>
        
        <div className="mb-8">
          <ProgressTracker />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="phase-1-badge">Scenario {scenarioId}: {scenarioInfo?.name || 'Infiltration Protocol'}</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Commander mood={commanderMood} />
          <TheCore intensity={coreIntensity} />
          <Ava mood={avaMood} />
        </div>
        
        <div className="flex-1 flex items-center justify-center mb-8">
          {currentChallenge ? (
            <ChallengePanel 
              challenge={currentChallenge} 
              onComplete={handleChallengeComplete}
            />
          ) : (
            <div className="glass-panel p-6 text-center max-w-lg">
              <h3 className="text-xl font-orbitron text-neon-blue mb-4">Challenge Data Unavailable</h3>
              <p className="mb-4">The challenge data for this scenario is being prepared by Commander Chen.</p>
              <button 
                className="btn-primary"
                onClick={() => completeScenario(scenarioId)}
              >
                Continue Mission
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfiltrationPhase;
