
import { customQuery } from '@/integrations/supabase/client';
import { DbScenario, DbScenarioQuestion } from '@/types/game';

/**
 * Fetches all scenarios
 */
export async function fetchAllScenarios() {
  try {
    const { data, error } = await customQuery('scenarios').select('*');
    
    if (error) {
      throw error;
    }
    
    // Type assertion for working with dynamic tables
    return (data as any[]) as DbScenario[];
  } catch (error) {
    console.error("Error fetching scenarios:", error);
    return [];
  }
}

/**
 * Fetches scenarios by phase
 */
export async function fetchScenariosByPhase(phase: string) {
  try {
    const { data, error } = await customQuery('scenarios')
      .select('*')
      .eq('phase', phase);
    
    if (error) {
      throw error;
    }
    
    return (data as any[]) as DbScenario[];
  } catch (error) {
    console.error(`Error fetching scenarios for phase ${phase}:`, error);
    return [];
  }
}

/**
 * Fetches questions for a scenario
 */
export async function fetchQuestionsForScenario(scenarioId: string) {
  try {
    const { data, error } = await customQuery('scenario_questions')
      .select('*')
      .eq('scenario_id', scenarioId)
      .order('order', { ascending: true });
    
    if (error) {
      throw error;
    }
    
    return (data as any[]) as DbScenarioQuestion[];
  } catch (error) {
    console.error(`Error fetching questions for scenario ${scenarioId}:`, error);
    return [];
  }
}

/**
 * Fetches a scenario by ID
 */
export async function fetchScenarioById(id: string) {
  try {
    const { data, error } = await customQuery('scenarios')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) {
      throw error;
    }
    
    return (data as any) as DbScenario;
  } catch (error) {
    console.error(`Error fetching scenario ${id}:`, error);
    return null;
  }
}

/**
 * Creates a new scenario with questions
 */
export async function createScenario(scenario: Omit<DbScenario, 'id' | 'created_at'>, questions: Omit<DbScenarioQuestion, 'id' | 'created_at'>[]) {
  try {
    // Insert scenario
    const { data: scenarioData, error: scenarioError } = await customQuery('scenarios')
      .insert([scenario])
      .select()
      .single();
    
    if (scenarioError) {
      throw scenarioError;
    }
    
    const scenarioId = (scenarioData as any).id;
    
    // Add scenario_id to each question
    const questionsWithScenarioId = questions.map(question => ({
      ...question,
      scenario_id: scenarioId
    }));
    
    // Insert questions
    const { error: questionsError } = await customQuery('scenario_questions')
      .insert(questionsWithScenarioId);
    
    if (questionsError) {
      throw questionsError;
    }
    
    return { success: true, scenarioId };
  } catch (error) {
    console.error("Error creating scenario:", error);
    return { success: false, error };
  }
}
