
import { supabase } from "@/integrations/supabase/client";
import { DbScenario, DbScenarioQuestion, ScenarioInfo, ScenarioId } from "@/types/game";

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
 * Fetches questions for a specific scenario
 */
export const fetchScenarioQuestions = async (scenarioId: number): Promise<DbScenarioQuestion[]> => {
  const { data, error } = await supabase
    .from('scenario_questions')
    .select('*')
    .eq('scenario_id', scenarioId)
    .order('question_type');
  
  if (error) {
    console.error(`Error fetching questions for scenario ${scenarioId}:`, error);
    throw new Error('Failed to fetch scenario questions');
  }
  
  return data as DbScenarioQuestion[];
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
