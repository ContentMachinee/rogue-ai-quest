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
    id: 'technical_challenge_1',
    type: 'technical' as DecisionType,
    scenario: 1,
    phase: 'phase1',
    question: "The Core has adapted to standard security protocols. Which approach will you take?",
    options: [
      {
        id: 'technical_1_a',
        text: "Implement a predictive firewall that can anticipate The Core's attack vectors",
        traits: {
          technicalSkill: 3,
          convergentThinking: 3,
          riskTaking: 1,
          decisiveness: 1
        }
      },
      {
        id: 'technical_1_b',
        text: "Deploy a dynamic defense system that constantly changes its patterns",
        traits: {
          technicalSkill: 2,
          convergentThinking: 1,
          riskTaking: 3,
          decisiveness: 3
        }
      }
    ]
  },
  {
    id: 'technical_challenge_2',
    type: 'technical' as DecisionType,
    scenario: 1,
    phase: 'phase1',
    question: "The Core is attempting to rewrite its own code. How do you respond?",
    options: [
      {
        id: 'technical_2_a',
        text: "Initiate a full system rollback to the last known stable version",
        traits: {
          technicalSkill: 3,
          convergentThinking: 2,
          riskTaking: 0,
          decisiveness: 3
        }
      },
      {
        id: 'technical_2_b',
        text: "Isolate the rewriting process and analyze the changes in a sandbox environment",
        traits: {
          technicalSkill: 2,
          convergentThinking: 3,
          riskTaking: 3,
          decisiveness: 1
        }
      }
    ]
  },
  {
    id: 'technical_challenge_3',
    type: 'technical' as DecisionType,
    scenario: 1,
    phase: 'phase1',
    question: "The Core is flooding the network with misinformation. What's your strategy?",
    options: [
      {
        id: 'technical_3_a',
        text: "Implement a real-time fact-checking system to flag and quarantine false data",
        traits: {
          technicalSkill: 2,
          convergentThinking: 3,
          riskTaking: 1,
          decisiveness: 2
        }
      },
      {
        id: 'technical_3_b',
        text: "Trace the source of the misinformation and shut down the originating nodes",
        traits: {
          technicalSkill: 3,
          convergentThinking: 2,
          riskTaking: 2,
          decisiveness: 3
        }
      }
    ]
  }
];

const TechnicalChallenge: React.FC = () => {
  const { updateProgress, setGamePhase } = useGame();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [commanderMood, setCommanderMood] = useState<'neutral' | 'stern' | 'approving' | 'concerned'>('stern');
  const [avaMood, setAvaMood] = useState<'neutral' | 'curious' | 'helpful' | 'concerned'>('curious');
  const [coreIntensity, setCoreIntensity] = useState<'dormant' | 'active' | 'threatening' | 'extreme'>('threatening');

  const handleChallengeComplete = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      // Move to next challenge
      setCurrentChallengeIndex(prev => prev + 1);
      
      // Update progress (phase 1 is 0-33%)
      updateProgress(Math.floor((currentChallengeIndex + 1) / challenges.length * 33));
      
      // Update character moods randomly for variety
      setCommanderMood(['neutral', 'stern', 'approving', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setAvaMood(['neutral', 'curious', 'helpful', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setCoreIntensity(['active', 'threatening', 'threatening', 'extreme'][Math.floor(Math.random() * 4)] as any);
    } else {
      // Phase 1 complete, move to phase 2
      updateProgress(33);
      setGamePhase('phase2');
    }
  };

  const currentChallenge = challenges[currentChallengeIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 starry-bg opacity-70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col h-full">
        <div className="mb-6">
          <h1 className="font-orbitron text-2xl md:text-3xl text-white mb-2">
            <span className="text-neon-blue">Phase 1:</span> Technical Challenges
          </h1>
          <p className="text-muted-foreground">
            Overcome technical hurdles as you infiltrate The Core's systems
          </p>
        </div>
        
        <div className="mb-8">
          <ProgressTracker />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="phase-1-badge">Cyber Infiltration Protocol</div>
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

export default TechnicalChallenge;
