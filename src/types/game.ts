
export type GamePhase = 'intro' | 'infiltration' | 'systems' | 'ethical' | 'counter' | 'final' | 'results' | 'phase1' | 'phase2' | 'phase3';

export type ScenarioId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20;

export type DecisionType = 'technical' | 'analytical' | 'ethical' | 'creative' | 'empathetic' | 'behavioral';

export type QuestionType = 'coding_challenge' | 'ai_ml_task' | 'choice' | 'behavioral_metric' | 'ethical_choice' | 'hybrid';

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
  decisiveness: number;
  
  // Personality (Big Five)
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
  
  // Additional metrics for Results Screen
  technicalSkill: number;
  convergentThinking: number;
  divergentThinking: number;
  creativity: number;
  ethics: number;
  riskTaking: number;
  communication: number;
}

// Alias for UserMetrics to support existing code
export type UserProfile = UserMetrics;

export interface ScenarioInfo {
  id: ScenarioId;
  name: string;
  phase: string;
  description: string;
  completed: boolean;
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
  codeTemplate?: string;
  expectedOutput?: string;
  userChoice?: string;
  timeSpent?: number;
}

export interface GameData {
  currentPhase: GamePhase;
  currentScenario: ScenarioId;
  progress: number;
  choices: Record<string, string>;
  scenarios: ScenarioInfo[];
  metrics: UserMetrics;
  score: GameScore;
  startTime?: Date;
  endTime?: Date;
  profile?: UserProfile;
}

// Database types for Supabase
export interface DbScenario {
  id: number;
  name: string;
  phase: string;
  description: string;
}

export interface DbScenarioQuestion {
  id: string;
  scenario_id: number;
  question_type: QuestionType;
  question_text: string;
  options: any;
  code_template?: string;
  expected_output?: string;
  metrics: Partial<UserMetrics>;
  created_at: string;
}
