
import React, { useState } from 'react';
import { useGame, DecisionType } from '@/context/GameContext';
import ChallengePanel from '@/components/game/ChallengePanel';
import ProgressTracker from '@/components/game/ProgressTracker';
import Commander from '@/components/characters/Commander';
import Ava from '@/components/characters/Ava';
import TheCore from '@/components/characters/TheCore';

const challenges = [
  {
    id: 'tech_challenge_1',
    type: 'technical' as DecisionType,
    question: "The Core has encrypted Nebula City's power grid control system. How will you approach breaking through?",
    options: [
      {
        id: 'tech_1_a',
        text: "Fast, aggressive decryption that might trigger alarms but works quickly",
        traits: {
          technicalSkill: 2,
          convergentThinking: 1,
          riskTaking: 3,
          decisiveness: 3
        }
      },
      {
        id: 'tech_1_b',
        text: "Methodical, careful approach that's safer but takes more time",
        traits: {
          technicalSkill: 3,
          convergentThinking: 3,
          riskTaking: -1,
          decisiveness: 1
        }
      }
    ]
  },
  {
    id: 'tech_challenge_2',
    type: 'analytical' as DecisionType,
    question: "You've detected a vulnerability in The Core's defense. How do you analyze it?",
    options: [
      {
        id: 'tech_2_a',
        text: "Quick scan to identify the most obvious exploit path",
        traits: {
          convergentThinking: 2,
          decisiveness: 3,
          technicalSkill: 1,
          riskTaking: 2
        }
      },
      {
        id: 'tech_2_b',
        text: "Detailed analysis to understand the full scope of the vulnerability",
        traits: {
          convergentThinking: 3,
          decisiveness: 0,
          technicalSkill: 3,
          riskTaking: 0
        }
      }
    ]
  },
  {
    id: 'tech_challenge_3',
    type: 'empathetic' as DecisionType,
    question: "A fellow Neural Interface Specialist is panicking about the escalating situation. How do you respond?",
    options: [
      {
        id: 'tech_3_a',
        text: "\"Focus on the task. We need your expertise right now.\"",
        traits: {
          empathy: 0,
          decisiveness: 3,
          communication: 1,
          resilience: 2
        }
      },
      {
        id: 'tech_3_b',
        text: "\"I understand this is stressful. Let's work through it together.\"",
        traits: {
          empathy: 3,
          decisiveness: 1,
          communication: 3,
          resilience: 1
        }
      }
    ]
  }
];

const TechnicalChallenge: React.FC = () => {
  const { updateProgress, setGamePhase } = useGame();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [commanderMood, setCommanderMood] = useState<'neutral' | 'stern' | 'approving' | 'concerned'>('stern');
  const [avaMood, setAvaMood] = useState<'neutral' | 'curious' | 'helpful' | 'concerned'>('helpful');
  const [coreIntensity, setCoreIntensity] = useState<'dormant' | 'active' | 'threatening' | 'extreme'>('active');

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
            <span className="text-neon-blue">Phase 1:</span> Nebula City Systems
          </h1>
          <p className="text-muted-foreground">
            Break through The Core's defenses to regain control of critical infrastructure
          </p>
        </div>
        
        <div className="mb-8">
          <ProgressTracker />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="phase-1-badge">Neural Interface Expertise</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="relative h-72 flex justify-center">
            <Commander mood={commanderMood} />
          </div>
          <div className="relative h-72 flex justify-center">
            <TheCore intensity={coreIntensity} />
          </div>
          <div className="relative h-72 flex justify-center">
            <Ava mood={avaMood} />
          </div>
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
