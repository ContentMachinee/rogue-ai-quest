import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  GamePhase, 
  GameChoice, 
  GameData, 
  UserMetrics, 
  GameScore, 
  UserProfile, 
  DecisionType 
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

const defaultGameData: GameData = {
  currentPhase: 'intro',
  progress: 0,
  choices: [],
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
  updateProgress: (progress: number) => void;
  recordChoice: (choiceId: string, optionId: string, timeSpent: number) => void;
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
    setGameData(prev => ({
      ...prev,
      currentPhase: phase,
      startTime: prev.startTime || new Date(),
    }));
  };

  const updateProgress = (progress: number) => {
    setGameData(prev => ({
      ...prev,
      progress: Math.min(100, Math.max(0, progress)),
    }));
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
        updateProgress,
        recordChoice,
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
