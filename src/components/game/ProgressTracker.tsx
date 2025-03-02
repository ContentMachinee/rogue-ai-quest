
import React from 'react';
import { cn } from '@/lib/utils';
import { useGame, GamePhase } from '@/context/GameContext';

const ProgressTracker: React.FC = () => {
  const { gameData } = useGame();
  const { currentPhase, progress } = gameData;

  const phases: { id: GamePhase; name: string }[] = [
    { id: 'intro', name: 'Mission Briefing' },
    { id: 'phase1', name: 'Technical Systems' },
    { id: 'phase2', name: 'Creative Solutions' },
    { id: 'phase3', name: 'Ethical Decisions' },
    { id: 'results', name: 'Analysis Report' },
  ];

  const getPhaseStatus = (phaseId: GamePhase) => {
    const phaseIndex = phases.findIndex(p => p.id === phaseId);
    const currentIndex = phases.findIndex(p => p.id === currentPhase);
    
    if (phaseIndex < currentIndex) return 'completed';
    if (phaseIndex === currentIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="w-full glass-panel p-4">
      <div className="interface-title mb-4">Mission Progress</div>
      
      <div className="relative">
        {/* Progress bar */}
        <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-neon-blue rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Phase markers */}
        <div className="mt-4 grid grid-cols-5 gap-1">
          {phases.map((phase, index) => {
            const status = getPhaseStatus(phase.id);
            return (
              <div key={phase.id} className="flex flex-col items-center">
                <div 
                  className={cn(
                    "w-4 h-4 rounded-full transition-colors",
                    {
                      'bg-neon-blue animate-pulse-glow': status === 'active',
                      'bg-neon-green': status === 'completed',
                      'bg-secondary': status === 'pending',
                    }
                  )}
                />
                <div className="mt-1 text-xs font-orbitron text-center">
                  <span 
                    className={cn(
                      "transition-colors",
                      {
                        'text-neon-blue': status === 'active',
                        'text-neon-green': status === 'completed',
                        'text-muted-foreground': status === 'pending',
                      }
                    )}
                  >
                    {index + 1}. {phase.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressTracker;
