import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  GamePhase, 
  ScenarioId, 
  GameChoice, 
  GameScore, 
  UserMetrics,
  ScenarioInfo
} from '@/types/game';
import { fetchAllScenarios } from '@/services/scenarioService';

// Define the shape of our game context
interface GameContextType {
  gamePhase: GamePhase;
  setGamePhase: (phase: GamePhase) => void;
  progress: number;
  updateProgress: (value: number) => void;
  gameData: {
    scenarios: ScenarioInfo[];
    choices: Record<string, string>;
    metrics: UserMetrics;
    score: GameScore;
  };
  recordChoice: (questionId: string, choiceId: string, timeMs: number) => void;
  completeScenario: (scenarioId: ScenarioId) => void;
  isLoading: boolean;
}

// Create the context with a default value
const GameContext = createContext<GameContextType | undefined>(undefined);

// Custom hook to use the game context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};

// This part needs to be modified to fix the TypeScript errors
// In the completeScenario and loadScenariosFromDatabase functions

// Here's the implementation with type fixes
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('intro');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [gameData, setGameData] = useState<GameContextType['gameData']>({
    scenarios: [],
    choices: {},
    metrics: {
      technical: 0,
      analytical: 0,
      ethical: 0,
      creative: 0,
      empathetic: 0,
    },
    score: {
      total: 0,
      breakdown: {
        technical: 0,
        analytical: 0,
        ethical: 0,
        creative: 0,
        empathetic: 0,
      }
    }
  });

  // Load scenarios from database on mount
  useEffect(() => {
    loadScenariosFromDatabase();
  }, []);

  const updateProgress = (value: number) => {
    setProgress(value);
  };

  const recordChoice = (questionId: string, choiceId: string, timeMs: number) => {
    // Record the user's choice
    setGameData((prev) => ({
      ...prev,
      choices: {
        ...prev.choices,
        [questionId]: choiceId
      }
    }));

    // In a real game, we would also:
    // 1. Update metrics based on the choice
    // 2. Calculate score changes
    // 3. Possibly send analytics
    console.log(`Choice recorded: ${questionId} -> ${choiceId} (${timeMs}ms)`);
  };

  const completeScenario = (scenarioId: ScenarioId) => {
    setGameData((prev) => {
      const updatedScenarios = prev.scenarios.map((s: any) => {
        if (s.id === scenarioId) {
          return { ...s, completed: true };
        }
        return s;
      }) as ScenarioInfo[];
      
      return {
        ...prev,
        scenarios: updatedScenarios
      };
    });
  };

  const loadScenariosFromDatabase = async () => {
    try {
      const dbScenarios = await fetchAllScenarios();
      
      if (dbScenarios && dbScenarios.length > 0) {
        // Convert DbScenario[] to ScenarioInfo[]
        const scenariosWithCompleted = dbScenarios.map(s => ({
          ...s,
          completed: false
        })) as ScenarioInfo[];
        
        setGameData(prev => ({
          ...prev,
          scenarios: scenariosWithCompleted
        }));
      }
    } catch (error) {
      console.error('Failed to fetch scenarios from Supabase:', error);
    }
  };

  // Create the value object that will be provided to consumers
  const gameContextValue: GameContextType = {
    gamePhase,
    setGamePhase,
    progress,
    updateProgress,
    gameData,
    recordChoice,
    completeScenario,
    isLoading
  };

  return (
    <GameContext.Provider value={gameContextValue}>
      {children}
    </GameContext.Provider>
  );
};
