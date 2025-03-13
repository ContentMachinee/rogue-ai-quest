
import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import ChallengePanel from '@/components/game/ChallengePanel';
import ProgressTracker from '@/components/game/ProgressTracker';
import Commander from '@/components/characters/Commander';
import Ava from '@/components/characters/Ava';
import TheCore from '@/components/characters/TheCore';
import { infiltrationScenarios } from '@/data/scenarios/infiltrationScenarios';
import { GameChoice, ScenarioId, DecisionType } from '@/types/game';
import { toast } from 'sonner';
import { typography } from '@/lib/typography';
import { cn } from '@/lib/utils';
import { supabase } from "@/integrations/supabase/client";

interface InfiltrationPhaseProps {
  scenarioId?: ScenarioId;
}

const InfiltrationPhase: React.FC<InfiltrationPhaseProps> = ({ scenarioId }) => {
  const { updateProgress, setGamePhase, completeScenario, gameData } = useGame();
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [commanderMood, setCommanderMood] = useState<'neutral' | 'stern' | 'approving' | 'concerned'>('stern');
  const [avaMood, setAvaMood] = useState<'neutral' | 'curious' | 'helpful' | 'concerned'>('helpful');
  const [coreIntensity, setCoreIntensity] = useState<'dormant' | 'active' | 'threatening' | 'extreme'>('threatening');
  const [loading, setLoading] = useState(true);
  const [scenarioQuestions, setScenarioQuestions] = useState<GameChoice[]>([]);

  // Fetch questions for the current scenario from Supabase
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        const currentId = scenarioId || infiltrationScenarios[currentScenarioIndex].scenario;
        
        // Attempt to fetch from Supabase
        const { data, error } = await supabase
          .from('scenario_questions')
          .select('*')
          .eq('scenario_id', currentId);
        
        if (error || !data || data.length === 0) {
          console.log('Using fallback questions for scenario', currentId);
          // Use fallback hardcoded questions
          setScenarioQuestions(infiltrationScenarios.filter(s => s.scenario === currentId));
        } else {
          console.log('Using database questions for scenario', currentId);
          // Format Supabase data to match GameChoice structure
          const formattedQuestions: GameChoice[] = data.map(q => {
            // Convert the question_type to DecisionType
            const questionTypeMap: Record<string, DecisionType> = {
              'coding_challenge': 'technical',
              'ai_ml_task': 'technical',
              'choice': 'analytical',
              'behavioral_metric': 'analytical',
              'ethical_choice': 'ethical',
              'hybrid': 'technical'
            };
            
            // Ensure options is properly formatted as an array of {id, text, traits}
            let formattedOptions = [];
            
            if (q.options && typeof q.options === 'object') {
              // If it's an array, map it properly
              if (Array.isArray(q.options)) {
                formattedOptions = q.options.map((opt: any, index: number) => ({
                  id: opt.id || `option_${index}`,
                  text: opt.text || String(opt),
                  traits: opt.traits || {}
                }));
              } else {
                // If it's an object but not an array, convert it
                formattedOptions = Object.entries(q.options).map(([key, value]) => ({
                  id: key,
                  text: typeof value === 'string' ? value : String(value),
                  traits: {}
                }));
              }
            } else if (q.options === null) {
              // Default options if none provided
              formattedOptions = [
                { id: 'default_opt_1', text: 'Continue', traits: {} },
                { id: 'default_opt_2', text: 'Skip', traits: {} }
              ];
            }
            
            return {
              id: q.id,
              type: questionTypeMap[q.question_type] || 'technical',
              question: q.question_text,
              scenario: q.scenario_id,
              phase: 'infiltration',
              options: formattedOptions
            };
          });
          
          setScenarioQuestions(formattedQuestions);
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
        // Fallback to hardcoded questions
        const currentId = scenarioId || infiltrationScenarios[currentScenarioIndex].scenario;
        setScenarioQuestions(infiltrationScenarios.filter(s => s.scenario === currentId));
      } finally {
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, [scenarioId, currentScenarioIndex]);

  // Find the correct scenario to display based on the scenarioId prop
  useEffect(() => {
    if (scenarioId && scenarioId >= 1 && scenarioId <= 4) {
      const index = infiltrationScenarios.findIndex(s => s.scenario === scenarioId);
      if (index !== -1) {
        setCurrentScenarioIndex(index);
      }
    }
  }, [scenarioId]);

  const handleChallengeComplete = () => {
    // Get the current scenario
    const currentScenario = scenarioQuestions.length > 0 ? 
      scenarioQuestions[0] : infiltrationScenarios[currentScenarioIndex];
    
    // Complete the current scenario in the game context
    if (currentScenario) {
      completeScenario(currentScenario.scenario as ScenarioId);
      toast.success(`Completed: ${gameData.scenarios.find(s => s.id === currentScenario.scenario)?.name || 'Scenario'}`);
    }
    
    // Determine if we need to move to the next scenario within this phase or to the next phase
    if (currentScenarioIndex < infiltrationScenarios.length - 1) {
      // Move to the next scenario within this phase
      setCurrentScenarioIndex(prev => prev + 1);
      updateProgress(Math.floor((currentScenarioIndex + 1) / infiltrationScenarios.length * 20));
      
      // Update character moods for variety
      setCommanderMood(['neutral', 'stern', 'approving', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setAvaMood(['neutral', 'curious', 'helpful', 'concerned'][Math.floor(Math.random() * 4)] as any);
      setCoreIntensity(['active', 'threatening', 'threatening', 'extreme'][Math.floor(Math.random() * 4)] as any);
    } else {
      // We've completed all scenarios in this phase, move to systems phase
      updateProgress(20);
      setGamePhase('systems');
    }
  };

  // Use database questions if available, otherwise fallback to hardcoded
  const currentScenario = scenarioQuestions.length > 0 ? 
    scenarioQuestions[0] : infiltrationScenarios[currentScenarioIndex];

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neon-blue border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className={typography.h4}>Loading scenario...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="absolute inset-0 starry-bg opacity-70"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-8 flex flex-col h-full">
        <div className="mb-6">
          <h1 className={cn(typography.h2, "mb-2")}>
            <span className="text-neon-blue">Phase 1:</span> System Infiltration
          </h1>
          <p className={typography.bodySmall}>
            Break through The Core's defenses and establish your presence in the system
          </p>
        </div>
        
        <div className="mb-8">
          <ProgressTracker />
        </div>
        
        <div className="flex justify-center mb-8">
          <div className="phase-1-badge">
            {gameData.scenarios.find(s => s.id === currentScenario.scenario)?.name || 'Infiltration Protocol'}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Commander mood={commanderMood} />
          <TheCore intensity={coreIntensity} />
          <Ava mood={avaMood} />
        </div>
        
        <div className="flex-1 flex items-center justify-center mb-8">
          <ChallengePanel 
            challenge={currentScenario} 
            onComplete={handleChallengeComplete}
          />
        </div>
      </div>
    </div>
  );
};

export default InfiltrationPhase;
