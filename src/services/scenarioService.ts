
import { supabase } from "@/integrations/supabase/client";
import { DbScenario, DbScenarioQuestion, ScenarioInfo, ScenarioId, GameChoice, DecisionType } from "@/types/game";

/**
 * Fetches all scenarios from the database
 */
export const fetchAllScenarios = async (): Promise<ScenarioInfo[]> => {
  const { data, error } = await supabase
    .from('scenarios')
    .select('*')
    .order('id');
  
  if (error) {
    console.error('Error fetching scenarios:', error);
    throw new Error('Failed to fetch scenarios');
  }
  
  // Convert DbScenario to ScenarioInfo
  return (data as DbScenario[]).map(scenario => ({
    id: scenario.id as ScenarioId,
    name: scenario.name,
    phase: scenario.phase as any, // Convert string to GamePhase
    description: scenario.description,
    completed: false // Default to false, will be updated from local state
  }));
};

/**
 * Fetches questions for a specific scenario and formats them as GameChoice objects
 */
export const fetchScenarioQuestions = async (scenarioId: number): Promise<GameChoice[]> => {
  const { data, error } = await supabase
    .from('scenario_questions')
    .select('*')
    .eq('scenario_id', scenarioId)
    .order('question_type');
  
  if (error) {
    console.error(`Error fetching questions for scenario ${scenarioId}:`, error);
    throw new Error('Failed to fetch scenario questions');
  }
  
  // Map the database questions to the GameChoice format
  const questions: GameChoice[] = (data as DbScenarioQuestion[]).map(question => {
    // Map question_type to DecisionType
    const typeMap: Record<string, DecisionType> = {
      'coding_challenge': 'technical',
      'ai_ml_task': 'technical',
      'choice': 'analytical',
      'behavioral_metric': 'analytical',
      'ethical_choice': 'ethical',
      'hybrid': 'technical'
    };
    
    // Ensure options is properly formatted
    let formattedOptions = [];
    if (question.options && typeof question.options === 'object') {
      if (Array.isArray(question.options)) {
        formattedOptions = question.options.map((opt: any, index: number) => ({
          id: opt.id || `option_${index}`,
          text: opt.text || String(opt),
          traits: opt.traits || {}
        }));
      } else {
        formattedOptions = Object.entries(question.options).map(([key, value]) => ({
          id: key,
          text: typeof value === 'string' ? value : String(value),
          traits: {}
        }));
      }
    } else {
      // Default options if none provided
      formattedOptions = [
        { id: 'default_opt_1', text: 'Continue', traits: {} },
        { id: 'default_opt_2', text: 'Skip', traits: {} }
      ];
    }
    
    return {
      id: question.id,
      type: typeMap[question.question_type] || 'technical',
      question: question.question_text,
      scenario: question.scenario_id,
      phase: 'infiltration',
      options: formattedOptions
    };
  });
  
  return questions;
};

/**
 * Fetches a single scenario by ID
 */
export const fetchScenarioById = async (scenarioId: number): Promise<DbScenario> => {
  const { data, error } = await supabase
    .from('scenarios')
    .select('*')
    .eq('id', scenarioId)
    .single();
  
  if (error) {
    console.error(`Error fetching scenario ${scenarioId}:`, error);
    throw new Error(`Failed to fetch scenario ${scenarioId}`);
  }
  
  return data as DbScenario;
};
