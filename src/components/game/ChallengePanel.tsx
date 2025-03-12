
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useGame } from '@/context/GameContext';
import { GameChoice } from '@/types/game';
import { typography } from '@/lib/typography';

interface ChallengePanelProps {
  challenge: GameChoice;
  onComplete: () => void;
  className?: string;
}

const ChallengePanel: React.FC<ChallengePanelProps> = ({
  challenge,
  onComplete,
  className,
}) => {
  const { recordChoice, isLoading } = useGame();
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [startTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  useEffect(() => {
    // Update time spent every second
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [startTime]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitting) return;
    
    setIsSubmitting(true);
    
    // Calculate total time spent in milliseconds
    const totalTimeMs = Date.now() - startTime;
    
    // Record the choice
    recordChoice(challenge.id, selectedOption, totalTimeMs);
    
    // Generate feedback based on choice type
    const selectedOptionObj = challenge.options.find(opt => opt.id === selectedOption);
    
    switch (challenge.type) {
      case 'technical':
        setFeedbackMessage(`System analyzing your ${selectedOptionObj?.text.toLowerCase()} approach...`);
        break;
      case 'analytical':
        setFeedbackMessage(`Evaluating your analytical process...`);
        break;
      case 'ethical':
        setFeedbackMessage(`Recording your ethical framework...`);
        break;
      case 'creative':
        setFeedbackMessage(`Measuring innovative potential...`);
        break;
      case 'empathetic':
        setFeedbackMessage(`Assessing communication style...`);
        break;
      default:
        setFeedbackMessage(`Processing your choice...`);
    }
    
    setShowFeedback(true);
    
    // Delay to show processing and feedback
    setTimeout(() => {
      setIsSubmitting(false);
      onComplete();
    }, 2000);
  };

  return (
    <div className={cn("control-panel w-full max-w-3xl mx-auto", className)}>
      <div className="mb-6">
        <div className={cn(
          typography.badge,
          "mb-1",
          {
            'text-neon-blue': challenge.type === 'technical' || challenge.type === 'analytical',
            'text-neon-green': challenge.type === 'creative',
            'text-neon-purple': challenge.type === 'ethical' || challenge.type === 'empathetic',
          }
        )}>
          {challenge.type === 'technical' && 'TECHNICAL CHALLENGE'}
          {challenge.type === 'analytical' && 'ANALYTICAL CHALLENGE'}
          {challenge.type === 'ethical' && 'ETHICAL DILEMMA'}
          {challenge.type === 'creative' && 'CREATIVE PROBLEM'}
          {challenge.type === 'empathetic' && 'TEAM COMMUNICATION'}
        </div>
        
        <h3 className={cn(typography.h3, "mb-4")}>{challenge.question}</h3>
        
        <div className={cn(typography.bodySmall, "mb-6")}>
          Select your approach carefully. Your choice reveals your decision-making style.
        </div>
      </div>
      
      <div className="space-y-4 mb-8">
        {challenge.options.map((option) => (
          <button
            key={option.id}
            onClick={() => handleOptionSelect(option.id)}
            disabled={isSubmitting}
            className={cn(
              "w-full p-4 rounded-lg border text-left transition-all",
              {
                "border-white/20 bg-secondary/40 hover:bg-secondary/60 hover:border-neon-blue/50": 
                  selectedOption !== option.id,
                "border-neon-blue bg-neon-blue/20 shadow-neon": 
                  selectedOption === option.id,
                "opacity-50 cursor-not-allowed": isSubmitting,
              }
            )}
          >
            <div className={cn(typography.body, "font-medium text-white")}>{option.text}</div>
          </button>
        ))}
      </div>
      
      <div className="flex justify-between items-center">
        <div className={cn(typography.caption, "text-muted-foreground")}>
          Time: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={!selectedOption || isSubmitting}
          className={cn(
            "neon-button",
            typography.button,
            {
              "opacity-50 cursor-not-allowed": !selectedOption || isSubmitting,
              "animate-pulse": selectedOption && !isSubmitting,
            }
          )}
        >
          {isSubmitting ? 'Processing...' : 'Submit Decision'}
        </button>
      </div>
      
      {showFeedback && (
        <div className="mt-6 p-4 bg-neon-blue/10 border border-neon-blue/30 rounded-lg animate-appear">
          <div className="flex items-center">
            <div className="w-4 h-4 rounded-full bg-neon-blue animate-pulse mr-3"></div>
            <p className={typography.body}>{feedbackMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChallengePanel;
