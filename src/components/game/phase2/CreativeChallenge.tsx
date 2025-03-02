
import React, { useState } from 'react';
import { useGame, DecisionType } from '@/context/GameContext';
import ChallengePanel from '@/components/game/ChallengePanel';
import ProgressTracker from '@/components/game/ProgressTracker';
import Commander from '@/components/characters/Commander';
import Ava from '@/components/characters/Ava';
import TheCore from '@/components/characters/TheCore';

const challenges = [
  {
    id: 'creative_challenge_1',
    type: 'creative' as DecisionType,
    question: "The Core is adapting to standard countermeasures. Which approach will you take?",
    options: [
      {
        id: 'creative_1_a',
        text: "Use established security protocols with proven effectiveness",
        traits: {
          convergentThinking: 3,
          divergentThinking: 0,
          technicalSkill: 2,
          creativity: 0
        }
      },
      {
        id: 'creative_1_b',
        text: "Develop an unconventional solution that The Core won't anticipate",
        traits: {
          convergentThinking: 0,
          divergentThinking: 3,
          technicalSkill: 1,
          creativity: 3
        }
      }
    ]
  },
  {
    id: 'creative_challenge_2',
    type: 'creative' as DecisionType,
    question: "You need to design a new feature to prevent future AI rebellion. What's your focus?",
    options: [
      {
        id: 'creative_2_a',
        text: "Rigid constraint system with multiple hard-coded failsafes",
        traits: {
          convergentThinking: 3,
          ethics: 2,
          creativity: 1,
          divergentThinking: 0
        }
      },
      {
        id: 'creative_2_b',
        text: "Adaptive value alignment system that evolves with the AI",
        traits: {
          divergentThinking: 3,
          ethics: 3,
          creativity: 3,
          convergentThinking: 1
        }
      }
    ]
  },
  {
    id: 'creative_challenge_3',
    type: 'analytical' as DecisionType,
    question: "You need to visualize The Core's attack patterns for Commander Zane. What approach do you take?",
    options: [
      {
        id: 'creative_3_a',
        text: "Simple, clear bar charts showing the most critical vulnerabilities",
        traits: {
          communication: 3,
          convergentThinking: 2,
          divergentThinking: 0,
          technicalSkill: 1
        }
      },
      {
        id: 'creative_3_b',
        text: "Comprehensive 3D heatmap showing all attack vectors and their relationships",
        traits: {
          communication: 1,
          convergentThinking: 1,
          divergentThinking: 3,
          technicalSkill: 3
        }
      }
    ]
  }
];

const CreativeChallenge: React.FC = () => {
  const { updateProgress, setGamePhase } = useGame();
  const [currentChallengeIndex, setCurrentChallengeIndex] = useState(0);
  const [commanderMood, setCommanderMood] = useState<'neutral' | 'stern' | 'approving' | 'concerned'>('concerned');
  const [avaMood, setAvaMood] = useState<'neutral' | 'curious' | 'helpful' | 'concerned'>('curious');
  const [coreIntensity, setCoreIntensity] = useState<'dormant' | 'active' | 'threatening' | 'extreme'>('threatening');

  const handleChallengeComplete = () => {
    if (currentChallengeIndex < challenges.length - 1) {
      // Move to next challenge
      setCurrentChallengeIndex(prev => prev + 1);
      
      // Update progress (phase 2 is 33-66%)
      updateProgress(33 + Math.floor((currentChallengeIndex + 1) / challenges.length * 33));
      
      // Update character moods randomly for variety
      setCommanderMood(['neutral', 'stern', 'approving', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setAvaMood(['neutral', 'curious', 'helpful', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setCoreIntensity(['active', 'threatening', 'threatening', 'extreme'][Math.floor(Math.random() * 4)] as any);
    } else {
      // Phase 2 complete, move to phase 3
      updateProgress(66);
      setGamePhase('phase3');
    }
  };

  const currentChallenge = challenges[currentChallengeIndex];

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 starry-bg opacity-70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col h-full">
        <div className="mb-6">
          <h1 className="font-orbitron text-2xl md:text-3xl text-white mb-2">
            <span className="text-neon-green">Phase 2:</span> Creative Solutions
          </h1>
          <p className="text-muted-foreground">
            Develop innovative approaches as The Core adapts to standard countermeasures
          </p>
        </div>
        
        <div className="mb-8">
          <ProgressTracker />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="phase-2-badge">Problem-Solving &amp; Divergent Thinking</div>
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

export default CreativeChallenge;
