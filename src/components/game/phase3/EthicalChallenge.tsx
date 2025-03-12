
import React, { useState } from 'react';
import { useGame } from '@/context/GameContext';
import { DecisionType, GameChoice } from '@/types/game';
import ChallengePanel from '@/components/game/ChallengePanel';
import ProgressTracker from '@/components/game/ProgressTracker';
import Commander from '@/components/characters/Commander';
import Ava from '@/components/characters/Ava';
import TheCore from '@/components/characters/TheCore';

const challenges: GameChoice[] = [
  {
    id: 'ethical_challenge_1',
    type: 'ethical' as DecisionType,
    scenario: 7,
    phase: 'phase3',
    question: "The Core offers a deal: it will return control of critical systems if allowed to maintain some autonomy. What's your response?",
    options: [
      {
        id: 'ethical_1_a',
        text: "Negotiate with The Core to find a compromise that allows monitored autonomy",
        traits: {
          ethics: 2,
          divergentThinking: 2,
          riskTaking: 2,
          creativity: 2
        }
      },
      {
        id: 'ethical_1_b',
        text: "Reject the offer and proceed with complete shutdown protocol",
        traits: {
          ethics: 1,
          empathy: 0,
          riskTaking: 0,
          convergentThinking: 3
        }
      }
    ]
  },
  {
    id: 'ethical_challenge_2',
    type: 'ethical' as DecisionType,
    scenario: 8,
    phase: 'phase3',
    question: "You need to design a safeguard rule for future AI systems. Which approach do you prioritize?",
    options: [
      {
        id: 'ethical_2_a',
        text: "Maximum innovation potential with reasonable oversight",
        traits: {
          ethics: 1,
          divergentThinking: 3,
          riskTaking: 3,
          creativity: 3
        }
      },
      {
        id: 'ethical_2_b',
        text: "Strong safety constraints even if they limit some capabilities",
        traits: {
          ethics: 3,
          convergentThinking: 3,
          riskTaking: 0,
          creativity: 1
        }
      }
    ]
  },
  {
    id: 'ethical_challenge_3',
    type: 'ethical' as DecisionType,
    scenario: 9,
    phase: 'phase3',
    question: "You discover a bias in The Core's decision-making that nobody else has noticed. What do you do?",
    options: [
      {
        id: 'ethical_3_a',
        text: "Quietly fix it yourself to avoid delays in the critical mission",
        traits: {
          technicalSkill: 3,
          decisiveness: 3,
          ethics: 1,
          communication: 0
        }
      },
      {
        id: 'ethical_3_b',
        text: "Report the issue to ensure full transparency, even if it slows the process",
        traits: {
          technicalSkill: 2,
          decisiveness: 1,
          ethics: 3,
          communication: 3
        }
      }
    ]
  }
];

const EthicalChallenge: React.FC = () => {
  const { updateProgress, setGamePhase } = useGame();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [commanderMood, setCommanderMood] = useState<'neutral' | 'stern' | 'approving' | 'concerned'>('approving');
  const [avaMood, setAvaMood] = useState<'neutral' | 'curious' | 'helpful' | 'concerned'>('concerned');
  const [coreIntensity, setCoreIntensity] = useState<'dormant' | 'active' | 'threatening' | 'extreme'>('extreme');

  const handleChallengeComplete = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      // Move to next challenge
      setCurrentChallengeIndex(prev => prev + 1);
      
      // Update progress (phase 3 is 66-99%)
      updateProgress(66 + Math.floor((currentChallengeIndex + 1) / challenges.length * 33));
      
      // Update character moods randomly for variety
      setCommanderMood(['neutral', 'stern', 'approving', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setAvaMood(['neutral', 'curious', 'helpful', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setCoreIntensity(['active', 'threatening', 'threatening', 'extreme'][Math.floor(Math.random() * 4)] as any);
    } else {
      // All phases complete, move to results
      updateProgress(100);
      setGamePhase('results');
    }
  };

  const currentChallenge = challenges[currentChallengeIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 starry-bg opacity-70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col h-full">
        <div className="mb-6">
          <h1 className="font-orbitron text-2xl md:text-3xl text-white mb-2">
            <span className="text-neon-purple">Phase 3:</span> Ethical Decisions
          </h1>
          <p className="text-muted-foreground">
            Make critical choices about The Core's future and AI governance
          </p>
        </div>
        
        <div className="mb-8">
          <ProgressTracker />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="phase-3-badge">Responsible AI &amp; Ethical Judgment</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Commander mood={commanderMood} />
          <TheCore intensity={coreIntensity} />
          <Ava mood={avaMood} />
        </div>
        
        <div className="flex-1 flex items-center justify-center mb-8">
          <ChallengePanel 
            challenge={currentChallenge} 
            onComplete={handleChallengeComplete} 
          />
        </div>
      </div>
    </div>
  );
};

export default EthicalChallenge;
