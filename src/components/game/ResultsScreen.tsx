
import React, { useState, useEffect } from 'react';
import { useGame, UserProfile } from '@/context/GameContext';
import { cn } from '@/lib/utils';

const ResultsScreen: React.FC = () => {
  const { gameData, resetGame } = useGame();
  const { profile, startTime, choices } = gameData;
  const [isRevealing, setIsRevealing] = useState(true);
  const [revealStep, setRevealStep] = useState(0);

  useEffect(() => {
    // Animate the results reveal
    if (isRevealing) {
      const timer = setTimeout(() => {
        if (revealStep < 5) {
          setRevealStep(prev => prev + 1);
        } else {
          setIsRevealing(false);
        }
      }, 800);
      
      return () => clearTimeout(timer);
    }
  }, [revealStep, isRevealing]);

  const getProfileStrength = (attribute: keyof UserProfile) => {
    const value = profile[attribute];
    if (value >= 7) return 'Exceptional';
    if (value >= 5) return 'Strong';
    if (value >= 3) return 'Proficient';
    if (value >= 1) return 'Developing';
    return 'Novice';
  };

  const getProfileBarWidth = (attribute: keyof UserProfile) => {
    const value = profile[attribute];
    const maxPossible = 9; // Maximum possible score
    return `${Math.min(100, (value / maxPossible) * 100)}%`;
  };
  
  const getDominantThinkingStyle = () => {
    return profile.convergentThinking > profile.divergentThinking 
      ? 'Convergent' 
      : 'Divergent';
  };
  
  const getArchetype = () => {
    // Determine archetype based on strongest traits
    if (profile.technicalSkill > 5 && profile.convergentThinking > 5) {
      return 'The Analyst';
    } else if (profile.creativity > 5 && profile.divergentThinking > 5) {
      return 'The Innovator';
    } else if (profile.ethics > 5 && profile.empathy > 5) {
      return 'The Guardian';
    } else if (profile.decisiveness > 5 && profile.riskTaking > 5) {
      return 'The Commander';
    } else if (profile.resilience > 5 && profile.communication > 5) {
      return 'The Diplomat';
    }
    return 'The Balanced Expert';
  };
  
  const getTotalTime = () => {
    if (!startTime) return 'N/A';
    
    const endTime = new Date();
    const diffMs = endTime.getTime() - startTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffSecs = Math.floor((diffMs % 60000) / 1000);
    
    return `${diffMins}m ${diffSecs}s`;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 starry-bg opacity-70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col h-full">
        <div className="mb-8 text-center">
          <h1 className="font-orbitron text-3xl md:text-4xl text-white mb-4 animate-text-glow">
            Mission Complete
          </h1>
          <p className="text-xl text-muted-foreground">
            Psychometric Assessment Results
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Technical Skills */}
          <div className={cn(
            "control-panel",
            { "animate-appear": revealStep >= 1 },
            { "opacity-0": revealStep < 1 }
          )}>
            <h2 className="interface-title mb-4">Technical Capabilities</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-orbitron text-white">Technical Skill</span>
                  <span className="text-sm text-neon-blue">{getProfileStrength('technicalSkill')}</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-blue rounded-full transition-all duration-1000 ease-out"
                    style={{ width: getProfileBarWidth('technicalSkill') }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-orbitron text-white">Problem-Solving</span>
                  <span className="text-sm text-neon-blue">{getProfileStrength('convergentThinking')}</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-blue rounded-full transition-all duration-1000 ease-out"
                    style={{ width: getProfileBarWidth('convergentThinking') }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-orbitron text-white">Creativity</span>
                  <span className="text-sm text-neon-green">{getProfileStrength('creativity')}</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-green rounded-full transition-all duration-1000 ease-out"
                    style={{ width: getProfileBarWidth('creativity') }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-orbitron text-white">Innovation</span>
                  <span className="text-sm text-neon-green">{getProfileStrength('divergentThinking')}</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-green rounded-full transition-all duration-1000 ease-out"
                    style={{ width: getProfileBarWidth('divergentThinking') }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Personal Traits */}
          <div className={cn(
            "control-panel",
            { "animate-appear": revealStep >= 2 },
            { "opacity-0": revealStep < 2 }
          )}>
            <h2 className="interface-title mb-4">Personality Profile</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-orbitron text-white">Decisiveness</span>
                  <span className="text-sm text-neon-purple">{getProfileStrength('decisiveness')}</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-purple rounded-full transition-all duration-1000 ease-out"
                    style={{ width: getProfileBarWidth('decisiveness') }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-orbitron text-white">Empathy</span>
                  <span className="text-sm text-neon-purple">{getProfileStrength('empathy')}</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-purple rounded-full transition-all duration-1000 ease-out"
                    style={{ width: getProfileBarWidth('empathy') }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-orbitron text-white">Resilience</span>
                  <span className="text-sm text-neon-purple">{getProfileStrength('resilience')}</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-purple rounded-full transition-all duration-1000 ease-out"
                    style={{ width: getProfileBarWidth('resilience') }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-orbitron text-white">Communication</span>
                  <span className="text-sm text-neon-purple">{getProfileStrength('communication')}</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-purple rounded-full transition-all duration-1000 ease-out"
                    style={{ width: getProfileBarWidth('communication') }}
                  />
                </div>
              </div>
            </div>
          </div>
          
          {/* Decision-Making */}
          <div className={cn(
            "control-panel",
            { "animate-appear": revealStep >= 3 },
            { "opacity-0": revealStep < 3 }
          )}>
            <h2 className="interface-title mb-4">Decision-Making Profile</h2>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-orbitron text-white">Risk Tolerance</span>
                  <span className="text-sm text-neon-blue">{getProfileStrength('riskTaking')}</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-blue rounded-full transition-all duration-1000 ease-out"
                    style={{ width: getProfileBarWidth('riskTaking') }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-orbitron text-white">Ethical Framework</span>
                  <span className="text-sm text-neon-green">{getProfileStrength('ethics')}</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-neon-green rounded-full transition-all duration-1000 ease-out"
                    style={{ width: getProfileBarWidth('ethics') }}
                  />
                </div>
              </div>
              
              <div className="p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg mt-6">
                <div className="font-orbitron text-white mb-2">Cognitive Style:</div>
                <div className="text-xl text-neon-blue font-semibold">
                  {getDominantThinkingStyle()} Thinker
                </div>
                <div className="text-sm text-muted-foreground mt-2">
                  {getDominantThinkingStyle() === 'Convergent' 
                    ? 'You excel at analytical problem-solving and logical approaches.'
                    : 'You excel at creative solutions and exploring multiple possibilities.'}
                </div>
              </div>
            </div>
          </div>
          
          {/* Career Archetype */}
          <div className={cn(
            "control-panel",
            { "animate-appear": revealStep >= 4 },
            { "opacity-0": revealStep < 4 }
          )}>
            <h2 className="interface-title mb-4">AI/ML Career Archetype</h2>
            
            <div className="p-6 bg-neon-purple/10 border border-neon-purple/30 rounded-lg mb-4">
              <div className="font-orbitron text-2xl text-neon-purple mb-2">
                {getArchetype()}
              </div>
              <div className="text-white">
                {getArchetype() === 'The Analyst' && 'You excel at logical problem-solving and systematic approaches to complex challenges. Your methodical thinking and technical precision are your greatest strengths.'}
                {getArchetype() === 'The Innovator' && 'You thrive on creative solutions and thinking outside conventional boundaries. Your ability to see new possibilities and approaches sets you apart.'}
                {getArchetype() === 'The Guardian' && 'You prioritize ethical considerations and responsible AI development. Your commitment to safety and beneficial outcomes guides your technical work.'}
                {getArchetype() === 'The Commander' && 'You make decisive choices even under pressure and are willing to take calculated risks. Your leadership qualities shine in crisis situations.'}
                {getArchetype() === 'The Diplomat' && 'You excel at communication and team collaboration. Your ability to understand different perspectives and build consensus is remarkable.'}
                {getArchetype() === 'The Balanced Expert' && 'You demonstrate a well-rounded skill set with no single dominant trait. This versatility allows you to adapt to various roles and challenges.'}
              </div>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-secondary/70 rounded-lg">
              <div>
                <div className="text-sm text-muted-foreground">Time to Complete</div>
                <div className="text-white font-mono">{getTotalTime()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Decisions Made</div>
                <div className="text-white font-mono">{choices.length}/9</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Summary and Actions */}
        <div className={cn(
          "control-panel text-center",
          { "animate-appear": revealStep >= 5 },
          { "opacity-0": revealStep < 5 }
        )}>
          <h2 className="text-xl font-orbitron text-white mb-4">Mission Success</h2>
          <p className="text-muted-foreground mb-6">
            The Core has been contained. Your approach has been analyzed and your results are complete.
            This comprehensive assessment reveals your unique strengths and decision-making styles.
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button 
              onClick={resetGame}
              className="neon-button"
            >
              Start New Assessment
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsScreen;
