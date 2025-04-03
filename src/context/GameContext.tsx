
import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  GamePhase, 
  ScenarioId, 
  GameChoice, 
  GameScore, 
  UserMetrics,
  ScenarioInfo,
  DbScenario,
  GameData
} from '@/types/game';
import { fetchAllScenarios } from '@/services/scenarioService';

// Define the shape of our game context
interface GameContextType {
  gamePhase: GamePhase;
  setGamePhase: (phase: GamePhase) => void;
  progress: number;
  updateProgress: (value: number) => void;
  gameData: GameData;
  recordChoice: (questionId: string, choiceId: string, timeMs: number) => void;
  completeScenario: (scenarioId: ScenarioId) => void;
  isLoading: boolean;
  setScenario?: (scenarioId: ScenarioId) => void;
  resetGame?: () => void;
  fetchingScenarios?: boolean;
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

// Implementation of the game provider
export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gamePhase, setGamePhase] = useState<GamePhase>('intro');
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [fetchingScenarios, setFetchingScenarios] = useState(false);
  const [gameData, setGameData] = useState<GameData>({
    currentPhase: 'intro' as GamePhase,
    currentScenario: 1 as ScenarioId,
    progress: 0,
    scenarios: [],
    choices: {},
    metrics: {
      codingProficiency: 0,
      algorithmicThinking: 0,
      debugging: 0,
      optimization: 0,
      aiMlKnowledge: 0,
      dataProcessing: 0,
      security: 0,
      problemSolving: 0,
      analytical: 0,
      creative: 0,
      adaptability: 0,
      learning: 0,
      attentionToDetail: 0,
      integrity: 0,
      empathy: 0,
      trustworthiness: 0,
      determination: 0,
      accountability: 0,
      resilience: 0,
      decisiveness: 0,
      openness: 0,
      conscientiousness: 0,
      extraversion: 0,
      agreeableness: 0,
      neuroticism: 0,
      technicalSkill: 0,
      convergentThinking: 0,
      divergentThinking: 0,
      creativity: 0,
      ethics: 0,
      riskTaking: 0,
      communication: 0
    },
    score: {
      points: 0,
      badges: [],
      timeBonus: 0
    },
    startTime: new Date()
  });

  // Load scenarios from database on mount
  useEffect(() => {
    loadScenariosFromDatabase();
  }, []);

  const updateProgress = (value: number) => {
    setProgress(value);
    setGameData(prev => ({ ...prev, progress: value }));
  };

  const setScenario = (scenarioId: ScenarioId) => {
    setGameData(prev => ({ ...prev, currentScenario: scenarioId }));
  };

  const resetGame = () => {
    setGamePhase('intro');
    setProgress(0);
    setGameData({
      currentPhase: 'intro' as GamePhase,
      currentScenario: 1 as ScenarioId,
      progress: 0,
      scenarios: gameData.scenarios,
      choices: {},
      metrics: {
        codingProficiency: 0,
        algorithmicThinking: 0,
        debugging: 0,
        optimization: 0,
        aiMlKnowledge: 0,
        dataProcessing: 0,
        security: 0,
        problemSolving: 0,
        analytical: 0,
        creative: 0,
        adaptability: 0,
        learning: 0,
        attentionToDetail: 0,
        integrity: 0,
        empathy: 0,
        trustworthiness: 0,
        determination: 0,
        accountability: 0,
        resilience: 0,
        decisiveness: 0,
        openness: 0,
        conscientiousness: 0,
        extraversion: 0,
        agreeableness: 0,
        neuroticism: 0,
        technicalSkill: 0,
        convergentThinking: 0,
        divergentThinking: 0,
        creativity: 0,
        ethics: 0,
        riskTaking: 0,
        communication: 0
      },
      score: {
        points: 0,
        badges: [],
        timeBonus: 0
      },
      startTime: new Date()
    });
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
      const updatedScenarios = prev.scenarios.map((s) => {
        if (s.id === scenarioId) {
          return { ...s, completed: true };
        }
        return s;
      });
      
      return {
        ...prev,
        scenarios: updatedScenarios
      };
    });
  };

  const loadScenariosFromDatabase = async () => {
    setFetchingScenarios(true);
    try {
      const dbScenarios = await fetchAllScenarios();
      
      if (dbScenarios && dbScenarios.length > 0) {
        // Convert DbScenario[] to ScenarioInfo[]
        const scenariosWithCompleted = dbScenarios.map(s => ({
          ...s,
          id: s.id as ScenarioId, // Ensure the id is treated as ScenarioId
          completed: false
        }));
        
        setGameData(prev => ({
          ...prev,
          scenarios: scenariosWithCompleted
        }));
      }
    } catch (error) {
      console.error('Failed to fetch scenarios from Supabase:', error);
    } finally {
      setFetchingScenarios(false);
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
    isLoading,
    setScenario,
    resetGame,
    fetchingScenarios
  };

  return (
    <GameContext.Provider value={gameContextValue}>
      {children}
    </GameContext.Provider>
  );
};
