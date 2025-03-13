
import React from 'react';
import { useDrag } from 'react-dnd';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { 
  Code2Icon, 
  BrainCircuitIcon, 
  SplitIcon, 
  ActivityIcon,
  FileTextIcon,
  LightbulbIcon,
  BadgeIcon,
  BarChart4Icon,
  TerminalIcon,
  FunctionSquareIcon,
  ZapIcon,
  TrendingUpIcon,
  FlagIcon,
  UsersIcon
} from 'lucide-react';

// Draggable component item
const DraggableItem = ({ item }: { item: any }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'component',
    item: { ...item },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag}
      className={cn(
        "flex items-center p-3 mb-2 rounded-md border border-white/10 cursor-grab",
        "hover:border-purple-500/50 hover:bg-purple-950/20 transition-colors",
        isDragging && "opacity-50 bg-purple-950/30 border-purple-500/50"
      )}
    >
      {item.icon}
      <div className="ml-3">
        <p className={cn(typography.bodySmall, "font-medium")}>{item.name}</p>
        <p className={cn(typography.caption, "text-white/60")}>{item.description}</p>
      </div>
    </div>
  );
};

// Component category with draggable items
const ComponentCategory = ({ name, items }: { name: string; items: any[] }) => {
  return (
    <div className="mb-6">
      <h3 className={cn(typography.h4, "text-white/90 mb-3")}>{name}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <DraggableItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

// Function category with draggable items
const FunctionCategory = ({ name, items }: { name: string; items: any[] }) => {
  return (
    <div className="mb-6">
      <h3 className={cn(typography.h4, "text-white/90 mb-3")}>{name}</h3>
      <div className="space-y-2">
        {items.map((item) => (
          <div 
            key={item.id}
            className="p-3 rounded-md border border-white/10 hover:border-blue-500/50 hover:bg-blue-950/20 transition-colors"
          >
            <div className="flex items-center">
              <FunctionSquareIcon className="h-4 w-4 text-blue-400" />
              <p className={cn(typography.bodySmall, "font-medium ml-2")}>{item.name}</p>
            </div>
            <p className={cn(typography.caption, "text-white/60 mt-1")}>{item.description}</p>
            <div className="mt-2 bg-gray-900/50 p-2 rounded-sm border-l-2 border-blue-400">
              <code className="text-xs text-white/80 font-mono">{item.syntax}</code>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component library
const ComponentLibrary = ({ activeTab }: { activeTab: 'components' | 'functions' }) => {
  // Component items
  const scenarioItems = [
    {
      id: 'scenario-template',
      type: 'scenario',
      name: 'Scenario Template',
      description: 'Full scenario with 6 question types',
      icon: <FileTextIcon className="h-4 w-4 text-purple-400" />,
      template: {
        name: 'New Scenario',
        description: 'Description of the scenario',
        phase: 'infiltration',
        questions: []
      }
    },
    {
      id: 'coding-challenge',
      type: 'question',
      name: 'Coding Challenge',
      description: 'Python coding task with time limit',
      icon: <TerminalIcon className="h-4 w-4 text-purple-400" />,
      template: {
        question_type: 'coding_challenge',
        question_text: 'Write a function that...',
        code_template: '# Your code here\n\ndef solution():\n    pass',
        expected_output: 'Expected result'
      }
    },
    {
      id: 'ai-ml-task',
      type: 'question',
      name: 'AI/ML Task',
      description: 'AI model selection and implementation',
      icon: <BrainCircuitIcon className="h-4 w-4 text-purple-400" />,
      template: {
        question_type: 'ai_ml_task',
        question_text: 'Choose and implement an AI model...',
        options: [
          { id: 'model1', text: 'Decision Tree', traits: { aiMlKnowledge: 2 } },
          { id: 'model2', text: 'Neural Network', traits: { aiMlKnowledge: 3 } }
        ]
      }
    },
    {
      id: 'choice-question',
      type: 'question',
      name: 'Choice Question',
      description: 'Multiple choice with trait mapping',
      icon: <SplitIcon className="h-4 w-4 text-purple-400" />,
      template: {
        question_type: 'choice',
        question_text: 'What would you do in this situation?',
        options: [
          { id: 'choice1', text: 'Option 1', traits: { analytical: 2 } },
          { id: 'choice2', text: 'Option 2', traits: { creative: 2 } }
        ]
      }
    }
  ];

  const uiItems = [
    {
      id: 'chart-component',
      type: 'ui',
      name: 'Radar Chart',
      description: 'Visualize multiple metrics',
      icon: <BarChart4Icon className="h-4 w-4 text-purple-400" />,
      template: {
        type: 'radar-chart',
        title: 'Skills Chart',
        dataPoints: ['technical', 'analytical', 'creative']
      }
    },
    {
      id: 'badge-component',
      type: 'ui',
      name: 'Achievement Badge',
      description: 'Award for completion',
      icon: <BadgeIcon className="h-4 w-4 text-purple-400" />,
      template: {
        type: 'badge',
        title: 'New Badge',
        description: 'Awarded for...',
        icon: 'trophy'
      }
    }
  ];

  // Function items
  const scoringFunctions = [
    {
      id: 'score-coding',
      name: 'ScoreCodingProficiency',
      description: 'Calculate coding skill based on time and accuracy',
      syntax: 'ScoreCodingProficiency(time, accuracy)'
    },
    {
      id: 'increase-difficulty',
      name: 'IncreaseDifficulty',
      description: 'Adjust challenge difficulty based on user performance',
      syntax: 'IncreaseDifficulty(scoreThreshold, currentLevel)'
    }
  ];

  const analyticsFunctions = [
    {
      id: 'flag-low-resilience',
      name: 'FlagLowResilience',
      description: 'Flag users with low resilience scores for retention strategies',
      syntax: 'FlagLowResilience(score < 40)'
    },
    {
      id: 'map-choice-integrity',
      name: 'MapChoiceToIntegrity',
      description: 'Map user choices to integrity metrics',
      syntax: 'MapChoiceToIntegrity(option)'
    }
  ];

  const featureFunctions = [
    {
      id: 'add-multiplayer',
      name: 'AddMultiplayerMode',
      description: 'Implement collaborative challenges',
      syntax: 'AddMultiplayerMode()'
    },
    {
      id: 'custom-metric',
      name: 'AddCustomMetric',
      description: 'Create and track a new metric',
      syntax: 'AddCustomMetric(name, weight, category)'
    }
  ];

  return (
    <div>
      {activeTab === 'components' ? (
        <>
          <ComponentCategory name="Scenarios & Questions" items={scenarioItems} />
          <ComponentCategory name="UI Components" items={uiItems} />
        </>
      ) : (
        <>
          <FunctionCategory name="Scoring Functions" items={scoringFunctions} />
          <FunctionCategory name="Analytics Functions" items={analyticsFunctions} />
          <FunctionCategory name="Feature Functions" items={featureFunctions} />
        </>
      )}
    </div>
  );
};

export default ComponentLibrary;
