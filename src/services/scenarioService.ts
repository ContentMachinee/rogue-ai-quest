
import { customQuery, supabase } from "@/integrations/supabase/client";
import { DbScenario, DbScenarioQuestion, ScenarioInfo, ScenarioId, GameChoice, DecisionType, QuestionType } from "@/types/game";

/**
 * Fetches all scenarios from the database
 */
export const fetchAllScenarios = async (): Promise<ScenarioInfo[]> => {
  const { data, error } = await customQuery<DbScenario>('scenarios')
    .select('*')
    .order('id');
  
  if (error) {
    console.error('Error fetching scenarios:', error);
    throw new Error('Failed to fetch scenarios');
  }
  
  // Convert DbScenario to ScenarioInfo with safe type casting
  return (data as unknown as DbScenario[]).map(scenario => ({
    id: scenario.id as ScenarioId,
    name: scenario.name,
    phase: scenario.phase as any, // Convert string to GamePhase
    description: scenario.description,
    completed: false // Default to false, will be updated from local state
  }));
};

/**
 * Maps database question types to frontend decision types
 */
const mapQuestionTypeToDecisionType = (questionType: QuestionType): DecisionType => {
  const typeMap: Record<QuestionType, DecisionType> = {
    'coding_challenge': 'technical',
    'ai_ml_task': 'technical',
    'choice': 'analytical',
    'behavioral_metric': 'analytical',
    'ethical_choice': 'ethical',
    'hybrid': 'technical'
  };
  
  return typeMap[questionType] || 'technical';
};

/**
 * Formats options from the database into the GameChoice format
 */
const formatOptions = (options: any): { id: string; text: string; traits: Record<string, any> }[] => {
  // If options is null, return default options
  if (!options) {
    return [
      { id: 'default_opt_1', text: 'Continue', traits: {} },
      { id: 'default_opt_2', text: 'Skip', traits: {} }
    ];
  }
  
  // If options is an array, format each item
  if (Array.isArray(options)) {
    return options.map((opt: any, index: number) => ({
      id: opt.id || `option_${index}`,
      text: opt.text || String(opt),
      traits: opt.traits || {}
    }));
  }
  
  // If options is an object but not an array, convert it
  return Object.entries(options).map(([key, value]) => ({
    id: key,
    text: typeof value === 'string' ? value : String(value),
    traits: {}
  }));
};

/**
 * Fetches questions for a specific scenario and formats them as GameChoice objects
 */
export const fetchScenarioQuestions = async (scenarioId: number): Promise<GameChoice[]> => {
  const { data, error } = await customQuery<DbScenarioQuestion>('scenario_questions')
    .select('*')
    .eq('scenario_id', scenarioId)
    .order('question_type');
  
  if (error) {
    console.error(`Error fetching questions for scenario ${scenarioId}:`, error);
    throw new Error('Failed to fetch scenario questions');
  }
  
  if (!data || data.length === 0) {
    console.warn(`No questions found for scenario ${scenarioId}, returning empty array`);
    return [];
  }
  
  // Map the database questions to the GameChoice format with safe type casting
  const questions: GameChoice[] = (data as unknown as DbScenarioQuestion[]).map(question => {
    return {
      id: question.id,
      type: mapQuestionTypeToDecisionType(question.question_type),
      question: question.question_text,
      scenario: question.scenario_id,
      phase: 'infiltration', // Default phase, could be determined by scenario
      options: formatOptions(question.options),
      codeTemplate: question.code_template,
      expectedOutput: question.expected_output
    };
  });
  
  return questions;
};

/**
 * Fetches a single scenario by ID
 */
export const fetchScenarioById = async (scenarioId: number): Promise<DbScenario> => {
  const { data, error } = await customQuery<DbScenario>('scenarios')
    .select('*')
    .eq('id', scenarioId)
    .single();
  
  if (error) {
    console.error(`Error fetching scenario ${scenarioId}:`, error);
    throw new Error(`Failed to fetch scenario ${scenarioId}`);
  }
  
  return data as unknown as DbScenario;
};

/**
 * Inserts a batch of questions for a scenario
 */
export const insertScenarioQuestions = async (questions: Omit<DbScenarioQuestion, 'created_at' | 'id'>[]): Promise<void> => {
  const { error } = await customQuery<DbScenarioQuestion>('scenario_questions')
    .insert(questions as any);
  
  if (error) {
    console.error('Error inserting scenario questions:', error);
    throw new Error('Failed to insert scenario questions');
  }
};

/**
 * Updates the GameChoice type to include optional code-related fields
 * This function is used to check if a question has code challenge elements
 */
export const hasCodeChallenge = (question: GameChoice): boolean => {
  return (
    question.type === 'technical' && 
    (!!question.codeTemplate || !!question.expectedOutput)
  );
};
