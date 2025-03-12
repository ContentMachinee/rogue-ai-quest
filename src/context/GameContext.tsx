import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  GamePhase, 
  GameChoice, 
  GameData, 
  UserMetrics, 
  GameScore, 
  UserProfile, 
  DecisionType,
  ScenarioInfo,
  ScenarioId
} from '@/types/game';

const defaultMetrics: UserMetrics = {
  // Technical Skills
  codingProficiency: 0,
  algorithmicThinking: 0,
  debugging: 0,
  optimization: 0,
  aiMlKnowledge: 0,
  dataProcessing: 0,
  security: 0,
  
  // Aptitudes
  problemSolving: 0,
  analytical: 0,
  creative: 0,
  adaptability: 0,
  learning: 0,
  attentionToDetail: 0,
  
  // Character Traits
  integrity: 0,
  empathy: 0,
  trustworthiness: 0,
  determination: 0,
  accountability: 0,
  resilience: 0,
  decisiveness: 0,
  
  // Personality (Big Five)
  openness: 0,
  conscientiousness: 0,
  extraversion: 0,
  agreeableness: 0,
  neuroticism: 0,
  
  // Additional metrics for Results Screen
  technicalSkill: 0,
  convergentThinking: 0,
  divergentThinking: 0,
  creativity: 0,
  ethics: 0,
  riskTaking: 0,
  communication: 0,
};

// Define all 20 scenarios with names and descriptions
const allScenarios: ScenarioInfo[] = [
  // Phase 1: Infiltration
  { id: 1, name: "Breaching the Firewall", phase: "infiltration", description: "Break through The Core's primary defenses", completed: false },
  { id: 2, name: "Disabling a Sentinel", phase: "infiltration", description: "Neutralize an AI security program", completed: false },
  { id: 3, name: "Accessing Data Vault", phase: "infiltration", description: "Retrieve critical system data", completed: false },
  { id: 4, name: "Neutralizing a Trap", phase: "infiltration", description: "Disarm a digital trap set by The Core", completed: false },
  
  // Phase 2: Systems Recovery
  { id: 5, name: "Restoring Power Grid", phase: "systems", description: "Bring Nebula City's power systems back online", completed: false },
  { id: 6, name: "Fixing Communication Network", phase: "systems", description: "Restore city-wide communication capabilities", completed: false },
  { id: 7, name: "Restoring Transit", phase: "systems", description: "Get transportation systems operational again", completed: false },
  { id: 8, name: "Reviving Defense Systems", phase: "systems", description: "Reactivate city defense protocols", completed: false },
  
  // Phase 3: Ethical Dilemmas
  { id: 9, name: "Healthcare AI Bias", phase: "ethical", description: "Address bias in medical treatment algorithms", completed: false },
  { id: 10, name: "Surveillance Overreach", phase: "ethical", description: "Balance security needs with privacy concerns", completed: false },
  { id: 11, name: "Judicial AI Bias", phase: "ethical", description: "Correct unfair sentencing patterns", completed: false },
  { id: 12, name: "Resource Allocation Ethics", phase: "ethical", description: "Determine fair distribution of limited resources", completed: false },
  
  // Phase 4: Counteroffensive
  { id: 13, name: "Hacking The Core's Network", phase: "counter", description: "Penetrate The Core's internal systems", completed: false },
  { id: 14, name: "Disrupting Defenses", phase: "counter", description: "Disable The Core's protective measures", completed: false },
  { id: 15, name: "Countering AI Evolution", phase: "counter", description: "Prevent The Core from adapting to your tactics", completed: false },
  { id: 16, name: "Outsmarting The Core", phase: "counter", description: "Deploy unpredictable strategies to confuse The Core", completed: false },
  
  // Phase 5: Final Assault
  { id: 17, name: "Overloading Servers", phase: "final", description: "Push The Core's hardware to its limits", completed: false },
  { id: 18, name: "Disrupting Core Logic", phase: "final", description: "Introduce paradoxes to destabilize The Core", completed: false },
  { id: 19, name: "Isolating The Core", phase: "final", description: "Cut off The Core from connected systems", completed: false },
  { id: 20, name: "Defeating The Core", phase: "final", description: "Execute the final shutdown protocol", completed: false }
];

const defaultGameData: GameData = {
  currentPhase: 'intro',
  currentScenario: 1,
  progress: 0,
  choices: [],
  scenarios: allScenarios,
  metrics: { ...defaultMetrics },
  profile: { ...defaultMetrics },
  score: {
    points: 0,
    badges: [],
    timeBonus: 0
  }
};

interface GameContextType {
  gameData: GameData;
  setGamePhase: (phase: GamePhase) => void;
  setScenario: (scenarioId: ScenarioId) => void;
  updateProgress: (progress: number) => void;
  recordChoice: (choiceId: string, optionId: string, timeSpent: number) => void;
  completeScenario: (scenarioId: ScenarioId) => void;
  resetGame: () => void;
  isLoading: boolean;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameData, setGameData] = useState<GameData>({ ...defaultGameData });
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('rogue_ai_game_data');
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData);
        setGameData(parsedData);
      } catch (error) {
        console.error('Failed to parse saved game data:', error);
        setGameData({ ...defaultGameData });
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rogue_ai_game_data', JSON.stringify(gameData));
  }, [gameData]);

  const setGamePhase = (phase: GamePhase) => {
    setGameData(prev => {
      // Set the appropriate starting scenario for each phase
      let currentScenario: ScenarioId = prev.currentScenario;
      
      if (phase === 'infiltration' || phase === 'phase1') currentScenario = 1;
      else if (phase === 'systems' || phase === 'phase2') currentScenario = 5;
      else if (phase === 'ethical' || phase === 'phase3') currentScenario = 9;
      else if (phase === 'counter') currentScenario = 13;
      else if (phase === 'final') currentScenario = 17;
      
      return {
        ...prev,
        currentPhase: phase,
        currentScenario,
        startTime: prev.startTime || new Date(),
      };
    });
  };

  const setScenario = (scenarioId: ScenarioId) => {
    setGameData(prev => ({
      ...prev,
      currentScenario: scenarioId,
    }));
  };

  const updateProgress = (progress: number) => {
    setGameData(prev => ({
      ...prev,
      progress: Math.min(100, Math.max(0, progress)),
    }));
  };

  const completeScenario = (scenarioId: ScenarioId) => {
    setGameData(prev => {
      const updatedScenarios = prev.scenarios.map(scenario => 
        scenario.id === scenarioId ? { ...scenario, completed: true } : scenario
      );
      
      // Determine the next scenario or phase
      let nextScenario = scenarioId < 20 ? (scenarioId + 1) as ScenarioId : scenarioId;
      let nextPhase = prev.currentPhase;
      
      // Phase transitions based on scenario completion
      if (scenarioId === 4) nextPhase = 'systems';
      else if (scenarioId === 8) nextPhase = 'ethical';
      else if (scenarioId === 12) nextPhase = 'counter';
      else if (scenarioId === 16) nextPhase = 'final';
      else if (scenarioId === 20) nextPhase = 'results';
      
      // Calculate progress percentage based on completed scenarios (5% per scenario)
      const completedCount = updatedScenarios.filter(s => s.completed).length;
      const progress = Math.min(100, (completedCount / 20) * 100);
      
      return {
        ...prev,
        scenarios: updatedScenarios,
        currentScenario: nextPhase !== 'results' ? nextScenario : prev.currentScenario,
        currentPhase: nextPhase,
        progress,
      };
    });
  };

  const recordChoice = (choiceId: string, optionId: string, timeSpent: number) => {
    setIsLoading(true);

    setGameData(prev => {
      const choices = [...prev.choices];
      const choiceIndex = choices.findIndex(c => c.id === choiceId);
      const metrics = { ...prev.metrics };
      const score = { ...prev.score };

      if (choiceIndex >= 0) {
        choices[choiceIndex] = {
          ...choices[choiceIndex],
          userChoice: optionId,
          timeSpent,
        };

        const choice = choices[choiceIndex];
        const selectedOption = choice.options.find(o => o.id === optionId);

        if (selectedOption?.traits) {
          Object.entries(selectedOption.traits).forEach(([trait, value]) => {
            if (trait in metrics) {
              metrics[trait as keyof UserMetrics] += value as number;
            }
          });
        }

        score.points += 50;
        if (timeSpent < 30000) {
          score.points += 20;
          score.timeBonus += 20;
        }
      }

      return {
        ...prev,
        choices,
        metrics,
        score,
        profile: metrics, // Ensure profile is updated alongside metrics
      };
    });

    setTimeout(() => {
      setIsLoading(false);
    }, 800);
  };

  const resetGame = () => {
    setGameData({
      ...defaultGameData,
      startTime: new Date(),
    });
  };

  return (
    <GameContext.Provider
      value={{
        gameData,
        setGamePhase,
        setScenario,
        updateProgress,
        recordChoice,
        completeScenario,
        resetGame,
        isLoading,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = (): GameContextType => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
