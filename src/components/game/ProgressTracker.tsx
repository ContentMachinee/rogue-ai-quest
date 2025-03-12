
import React from 'react';
import { cn } from '@/lib/utils';
import { useGame } from '@/context/GameContext';
import { GamePhase, ScenarioId } from '@/types/game';
import { CheckCircle, Circle, CircleDot } from 'lucide-react';
import { typography } from '@/lib/typography';

const ProgressTracker: React.FC = () => {
  const { gameData, setScenario } = useGame();
  const { currentPhase, currentScenario, scenarios } = gameData;

  const phases: { id: GamePhase; name: string }[] = [
    { id: 'intro', name: 'Mission Briefing' },
    { id: 'phase1', name: 'Infiltration' },
    { id: 'phase2', name: 'Systems Recovery' },
    { id: 'phase3', name: 'Ethical Dilemmas' },
    { id: 'counter', name: 'Counteroffensive' },
    { id: 'final', name: 'Final Assault' },
    { id: 'results', name: 'Analysis Report' },
  ];

  const phaseToScenarioRange = {
    'intro': [],
    'phase1': [1, 2, 3, 4],
    'infiltration': [1, 2, 3, 4],
    'phase2': [5, 6, 7, 8],
    'systems': [5, 6, 7, 8],
    'phase3': [9, 10, 11, 12],
    'ethical': [9, 10, 11, 12],
    'counter': [13, 14, 15, 16],
    'final': [17, 18, 19, 20],
    'results': []
  };

  const getPhaseStatus = (phaseId: GamePhase) => {
    const phaseIndex = phases.findIndex(p => p.id === phaseId);
    const currentIndex = phases.findIndex(p => 
      p.id === currentPhase || 
      (currentPhase === 'infiltration' && p.id === 'phase1') ||
      (currentPhase === 'systems' && p.id === 'phase2') ||
      (currentPhase === 'ethical' && p.id === 'phase3')
    );
    
    if (phaseIndex < currentIndex) return 'completed';
    if (phaseIndex === currentIndex) return 'active';
    return 'pending';
  };

  const handleScenarioClick = (scenarioId: ScenarioId) => {
    // Only allow clicking on completed scenarios or the current scenario
    const scenario = scenarios.find(s => s.id === scenarioId);
    if (scenario?.completed || scenarioId === currentScenario) {
      setScenario(scenarioId);
    }
  };

  // Get current phase range for scenario dots
  const currentPhaseScenarios = phaseToScenarioRange[currentPhase] || [];

  return (
    <div className="w-full glass-panel p-4">
      <div className={cn(typography.h4, "mb-4")}>Mission Progress</div>
      
      <div className="relative">
        {/* Progress bar based on completed scenarios */}
        <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
          <div 
            className="h-full bg-neon-blue rounded-full transition-all duration-500 ease-out"
            style={{ width: `${gameData.progress}%` }}
          />
        </div>
        
        {/* Phase markers */}
        <div className="mt-4 grid grid-cols-7 gap-1">
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
                <div className="mt-1 text-center">
                  <span 
                    className={cn(
                      typography.badge,
                      "transition-colors",
                      {
                        'text-neon-blue': status === 'active',
                        'text-neon-green': status === 'completed',
                        'text-muted-foreground': status === 'pending',
                      }
                    )}
                  >
                    {phase.name}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Show scenario dots for current phase */}
        {currentPhaseScenarios.length > 0 && (
          <div className="mt-6">
            <div className={cn(typography.caption, "text-muted-foreground mb-2")}>Current Phase Scenarios:</div>
            <div className="flex space-x-4 justify-center">
              {currentPhaseScenarios.map(scenarioId => {
                const scenario = scenarios.find(s => s.id === scenarioId);
                const isActive = currentScenario === scenarioId;
                const isCompleted = scenario?.completed;
                
                return (
                  <div 
                    key={scenarioId}
                    className={cn(
                      "flex flex-col items-center cursor-pointer transition-all",
                      {
                        "opacity-100": isActive || isCompleted,
                        "opacity-70 hover:opacity-90": !isActive && !isCompleted,
                      }
                    )}
                    onClick={() => handleScenarioClick(scenarioId as ScenarioId)}
                  >
                    <div className="flex items-center justify-center">
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-neon-green" />
                      ) : isActive ? (
                        <CircleDot className="w-5 h-5 text-neon-blue animate-pulse" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </div>
                    <div className="mt-1 text-center max-w-[100px]">
                      <span className={cn(
                        typography.badge,
                        {
                          "text-neon-blue": isActive,
                          "text-neon-green": isCompleted,
                          "text-muted-foreground": !isActive && !isCompleted,
                        }
                      )}>
                        {scenario?.name || `Scenario ${scenarioId}`}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProgressTracker;
