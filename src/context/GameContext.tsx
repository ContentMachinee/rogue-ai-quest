
import React, { createContext, useContext, useState, useEffect } from 'react';

// Define the types for our game data
export type GamePhase = 'intro' | 'phase1' | 'phase2' | 'phase3' | 'results';
export type DecisionType = 'technical' | 'analytical' | 'ethical' | 'creative' | 'empathetic';

export interface GameChoice {
  id: string;
  type: DecisionType;
  question: string;
  options: {
    id: string;
    text: string;
    traits: {
      [key: string]: number; // Maps traits to values
    };
  }[];
  userChoice?: string; // ID of the selected option
  timeSpent?: number; // Time spent on this choice in ms
}

export interface UserProfile {
  technicalSkill: number;
  convergentThinking: number;
  divergentThinking: number;
  ethics: number;
  empathy: number;
  resilience: number;
  creativity: number;
  riskTaking: number;
  decisiveness: number;
  communication: number;
}

export interface GameData {
  currentPhase: GamePhase;
  progress: number; // 0-100
  choices: GameChoice[];
  profile: UserProfile;
  startTime?: Date;
  endTime?: Date;
}

interface GameContextType {
  gameData: GameData;
  setGamePhase: (phase: GamePhase) => void;
  updateProgress: (progress: number) => void;
  recordChoice: (choiceId: string, optionId: string, timeSpent: number) => void;
  resetGame: () => void;
  isLoading: boolean;
}

const defaultProfile: UserProfile = {
  technicalSkill: 0,
  convergentThinking: 0,
  divergentThinking: 0,
  ethics: 0,
  empathy: 0,
  resilience: 0,
  creativity: 0,
  riskTaking: 0,
  decisiveness: 0,
  communication: 0,
};

const defaultGameData: GameData = {
  currentPhase: 'intro',
  progress: 0,
  choices: [],
  profile: { ...defaultProfile },
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [gameData, setGameData] = useState<GameData>({ ...defaultGameData });
  const [isLoading, setIsLoading] = useState(false);

  // Initialize game data or load from storage if available
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

  // Save game data to localStorage whenever it changes
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
      progress: Math.min(100, Math.max(0, progress)), // Clamp between 0-100
    }));
  };

  const recordChoice = (choiceId: string, optionId: string, timeSpent: number) => {
    setIsLoading(true);

    setGameData(prev => {
      // Find the choice in our game data
      const choices = [...prev.choices];
      const choiceIndex = choices.findIndex(c => c.id === choiceId);

      if (choiceIndex >= 0) {
        // Update existing choice
        choices[choiceIndex] = {
          ...choices[choiceIndex],
          userChoice: optionId,
          timeSpent,
        };
      }

      // Find the selected option to update user profile
      const choice = choices.find(c => c.id === choiceId);
      const selectedOption = choice?.options.find(o => o.id === optionId);
      const profile = { ...prev.profile };

      // Update profile based on the choice traits
      if (selectedOption?.traits) {
        Object.entries(selectedOption.traits).forEach(([trait, value]) => {
          if (trait in profile) {
            profile[trait as keyof UserProfile] += value;
          }
        });
      }

      return {
        ...prev,
        choices,
        profile,
      };
    });

    // Simulate processing time for analysis
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
