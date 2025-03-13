
import React from 'react';
import { cn } from '@/lib/utils';
import { typography } from '@/lib/typography';
import { 
  TrophyIcon, 
  StarIcon, 
  AwardIcon, 
  ScrollTextIcon,
  FileTextIcon,
  TerminalIcon,
  BrainCircuitIcon,
  SplitIcon 
} from 'lucide-react';

const PreviewPanel = ({ 
  selectedComponent,
  canvasItems
}: { 
  selectedComponent: any;
  canvasItems: any[];
}) => {
  // If no component is selected, show a message
  if (!selectedComponent) {
    return (
      <div className="flex items-center justify-center h-full text-center p-6">
        <div>
          <p className={cn(typography.bodyLarge, "text-white/50 mb-2")}>
            Select a component to preview
          </p>
          <p className={cn(typography.bodySmall, "text-white/30")}>
            The preview shows how components will appear in the game
          </p>
        </div>
      </div>
    );
  }

  // Render different previews based on component type
  const renderPreview = () => {
    if (selectedComponent.type === 'scenario') {
      return (
        <div className="bg-gray-900 border border-white/10 rounded-lg p-4">
          <div className="flex items-center">
            <FileTextIcon className="h-5 w-5 text-neon-blue mr-2" />
            <h3 className={cn(typography.h3, "text-white")}>{selectedComponent.template?.name || 'Scenario'}</h3>
          </div>
          <p className={cn(typography.bodySmall, "text-white/80 mt-2")}>
            {selectedComponent.template?.description || 'No description'}
          </p>
          <div className="mt-4 px-3 py-2 bg-gray-800/60 border border-white/10 rounded text-center">
            <p className={cn(typography.bodySmall, "text-white/60")}>Phase: {selectedComponent.template?.phase || 'infiltration'}</p>
          </div>
          <div className="mt-4 text-center">
            <p className={cn(typography.caption, "text-white/50")}>
              {selectedComponent.template?.questions?.length || 0} questions configured
            </p>
          </div>
        </div>
      );
    }
    
    if (selectedComponent.type === 'question') {
      if (selectedComponent.template?.question_type === 'coding_challenge') {
        return (
          <div className="bg-gray-900 border border-white/10 rounded-lg p-4">
            <div className="flex items-center">
              <TerminalIcon className="h-5 w-5 text-neon-green mr-2" />
              <h3 className={cn(typography.h4, "text-white")}>Coding Challenge</h3>
            </div>
            <p className={cn(typography.bodySmall, "text-white/80 mt-2")}>
              {selectedComponent.template?.question_text || 'Write a function...'}
            </p>
            <div className="mt-3 bg-black/50 border border-gray-700/50 rounded p-2">
              <pre className="text-xs text-neon-green font-mono">
                {selectedComponent.template?.code_template || '# No code template'}
              </pre>
            </div>
            <div className="mt-2 bg-gray-800/60 border border-white/10 rounded p-2">
              <p className={cn(typography.caption, "text-white/70")}>
                Expected: {selectedComponent.template?.expected_output || 'No expected output'}
              </p>
            </div>
          </div>
        );
      }
      
      if (selectedComponent.template?.question_type === 'ai_ml_task') {
        return (
          <div className="bg-gray-900 border border-white/10 rounded-lg p-4">
            <div className="flex items-center">
              <BrainCircuitIcon className="h-5 w-5 text-neon-purple mr-2" />
              <h3 className={cn(typography.h4, "text-white")}>AI/ML Task</h3>
            </div>
            <p className={cn(typography.bodySmall, "text-white/80 mt-2")}>
              {selectedComponent.template?.question_text || 'Choose and implement an AI model...'}
            </p>
            <div className="mt-3 space-y-2">
              {selectedComponent.template?.options?.map((option: any, index: number) => (
                <div key={option.id} className="flex items-center bg-gray-800/30 hover:bg-gray-800/60 border border-white/10 rounded p-2 cursor-pointer">
                  <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center mr-2">
                    {index + 1}
                  </div>
                  <p className={cn(typography.bodySmall, "text-white/90")}>{option.text}</p>
                </div>
              ))}
            </div>
          </div>
        );
      }
      
      // Generic multiple choice question
      return (
        <div className="bg-gray-900 border border-white/10 rounded-lg p-4">
          <div className="flex items-center">
            <SplitIcon className="h-5 w-5 text-neon-blue mr-2" />
            <h3 className={cn(typography.h4, "text-white")}>Choice Question</h3>
          </div>
          <p className={cn(typography.bodySmall, "text-white/80 mt-2")}>
            {selectedComponent.template?.question_text || 'What would you do in this situation?'}
          </p>
          <div className="mt-3 space-y-2">
            {selectedComponent.template?.options?.map((option: any, index: number) => (
              <div key={option.id} className="flex items-center bg-gray-800/30 hover:bg-gray-800/60 border border-white/10 rounded p-2 cursor-pointer">
                <div className="w-6 h-6 rounded-full border border-white/20 flex items-center justify-center mr-2">
                  {String.fromCharCode(65 + index)}
                </div>
                <p className={cn(typography.bodySmall, "text-white/90")}>{option.text}</p>
              </div>
            ))}
          </div>
        </div>
      );
    }
    
    if (selectedComponent.type === 'ui') {
      if (selectedComponent.template?.type === 'radar-chart') {
        return (
          <div className="bg-gray-900 border border-white/10 rounded-lg p-4">
            <h3 className={cn(typography.h4, "text-white mb-3")}>{selectedComponent.template?.title || 'Skills Chart'}</h3>
            <div className="aspect-square max-w-[200px] mx-auto bg-gray-800/40 rounded-lg border border-gray-700/50 flex items-center justify-center">
              <div className="text-center">
                <p className={cn(typography.caption, "text-white/50")}>Radar Chart Preview</p>
                <p className={cn(typography.caption, "text-white/30 mt-1")}>
                  {selectedComponent.template?.dataPoints?.join(', ') || 'No data points defined'}
                </p>
              </div>
            </div>
          </div>
        );
      }
      
      if (selectedComponent.template?.type === 'badge') {
        const getBadgeIcon = () => {
          switch (selectedComponent.template?.icon) {
            case 'trophy': return <TrophyIcon className="h-8 w-8 text-yellow-400" />;
            case 'star': return <StarIcon className="h-8 w-8 text-yellow-400" />;
            case 'medal': return <AwardIcon className="h-8 w-8 text-yellow-400" />;
            case 'certificate': return <ScrollTextIcon className="h-8 w-8 text-yellow-400" />;
            default: return <TrophyIcon className="h-8 w-8 text-yellow-400" />;
          }
        };
        
        return (
          <div className="bg-gray-900 border border-white/10 rounded-lg p-4">
            <div className="bg-gradient-to-b from-gray-800 to-gray-900 border border-white/10 rounded-lg p-6 flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-gray-800 border-2 border-yellow-500 flex items-center justify-center mb-3">
                {getBadgeIcon()}
              </div>
              <h3 className={cn(typography.h4, "text-white text-center")}>{selectedComponent.template?.title || 'Achievement'}</h3>
              <p className={cn(typography.caption, "text-white/70 text-center mt-1")}>
                {selectedComponent.template?.description || 'No description'}
              </p>
            </div>
          </div>
        );
      }
    }
    
    return (
      <div className="bg-gray-900 border border-white/10 rounded-lg p-4 text-center">
        <p className={cn(typography.bodySmall, "text-white/50")}>
          No preview available for this component type
        </p>
      </div>
    );
  };

  return (
    <div>
      {renderPreview()}
    </div>
  );
};

export default PreviewPanel;
