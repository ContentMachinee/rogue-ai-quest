
import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import ChallengePanel from '@/components/game/ChallengePanel';
import ProgressTracker from '@/components/game/ProgressTracker';
import Commander from '@/components/characters/Commander';
import Ava from '@/components/characters/Ava';
import TheCore from '@/components/characters/TheCore';
import { infiltrationScenarios } from '@/data/scenarios/infiltrationScenarios';
import { GameChoice, ScenarioId } from '@/types/game';
import { toast } from 'sonner';
import { typography } from '@/lib/typography';
import { cn } from '@/lib/utils';

interface InfiltrationPhaseProps {
  scenarioId?: ScenarioId;
}

const InfiltrationPhase: React.FC<InfiltrationPhaseProps> = ({ scenarioId }) => {
  const { updateProgress, setGamePhase, completeScenario, gameData } = useGame();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [commanderMood, setCommanderMood] = useState<'neutral' | 'stern' | 'approving' | 'concerned'>('stern');
  const [avaMood, setAvaMood] = useState<'neutral' | 'curious' | 'helpful' | 'concerned'>('helpful');
  const [coreIntensity, setCoreIntensity] = useState<'dormant' | 'active' | 'threatening' | 'extreme'>('threatening');

  // Find the correct scenario to display based on the scenarioId prop
  useEffect(() => {
    if (scenarioId && scenarioId >= 1 && scenarioId <= 4) {
      const index = infiltrationScenarios.findIndex(s => s.scenario === scenarioId);
      if (index !== -1) {
        setCurrentScenarioIndex(index);
      }
    }
  }, [scenarioId]);

  const handleChallengeComplete = () => {
    // Get the current scenario
    const currentScenario = infiltrationScenarios[currentScenarioIndex];
    
    // Complete the current scenario in the game context
    if (currentScenario) {
      completeScenario(currentScenario.scenario as ScenarioId);
      toast.success(`Completed: ${gameData.scenarios.find(s => s.id === currentScenario.scenario)?.name || 'Scenario'}`);
    }
    
    // Determine if we need to move to the next scenario within this phase or to the next phase
    if (currentScenarioIndex < infiltrationScenarios.length - 1) {
      // Move to the next scenario within this phase
      setCurrentScenarioIndex(prev => prev + 1);
      updateProgress(Math.floor((currentScenarioIndex + 1) / infiltrationScenarios.length * 20));
      
      // Update character moods for variety
      setCommanderMood(['neutral', 'stern', 'approving', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setAvaMood(['neutral', 'curious', 'helpful', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setCoreIntensity(['active', 'threatening', 'threatening', 'extreme'][Math.floor(Math.random() * 4)] as any);
    } else {
      // We've completed all scenarios in this phase, move to systems phase
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
          <h1 className={cn(typography.h2, "mb-2")}>
            <span className="text-neon-blue">Phase 1:</span> System Infiltration
          </h1>
          <p className={typography.bodySmall}>
            Break through The Core's defenses and establish your presence in the system
          </p>
        </div>
        
        <div className="mb-8">
          <ProgressTracker />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="phase-1-badge">
            {gameData.scenarios.find(s => s.id === currentScenario.scenario)?.name || 'Infiltration Protocol'}
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

export default InfiltrationPhase;
