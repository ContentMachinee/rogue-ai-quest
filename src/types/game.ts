
export type GamePhase = 'intro' | 'infiltration' | 'systems' | 'ethical' | 'counter' | 'final' | 'results';

export type DecisionType = 'technical' | 'analytical' | 'ethical' | 'creative' | 'empathetic' | 'behavioral';

export interface GameScore {
  points: number;
  badges: string[];
  timeBonus: number;
}

export interface UserMetrics {
  // Technical Skills
  codingProficiency: number;
  algorithmicThinking: number;
  debugging: number;
  optimization: number;
  aiMlKnowledge: number;
  dataProcessing: number;
  security: number;
  
  // Aptitudes
  problemSolving: number;
  analytical: number;
  creative: number;
  adaptability: number;
  learning: number;
  attentionToDetail: number;
  
  // Character Traits
  integrity: number;
  empathy: number;
  trustworthiness: number;
  determination: number;
  accountability: number;
  resilience: number;
  
  // Personality (Big Five)
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}

export interface GameChoice {
  id: string;
  type: DecisionType;
  question: string;
  scenario: number;
  phase: GamePhase;
  options: {
    id: string;
    text: string;
    traits: Partial<UserMetrics>;
  }[];
  userChoice?: string;
  timeSpent?: number;
}

export interface GameData {
  currentPhase: GamePhase;
  progress: number;
  choices: GameChoice[];
  metrics: UserMetrics;
  score: GameScore;
  startTime?: Date;
  endTime?: Date;
}
