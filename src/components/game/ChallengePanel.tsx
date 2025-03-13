
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { useGame } from '@/context/GameContext';
import { GameChoice } from '@/types/game';
import { typography } from '@/lib/typography';
import { hasCodeChallenge } from '@/services/scenarioService';

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
  const [codeInput, setCodeInput] = useState(challenge.codeTemplate || '');
  const [codeOutput, setCodeOutput] = useState('');
  const isCodeChallenge = hasCodeChallenge(challenge);

  useEffect(() => {
    // Reset state when challenge changes
    setSelectedOption(null);
    setCodeInput(challenge.codeTemplate || '');
    setCodeOutput('');
    setShowFeedback(false);
    
    // Update time spent every second
    const timer = setInterval(() => {
      setTimeSpent(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);

    return () => clearInterval(timer);
  }, [challenge, startTime]);

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
  };

  const handleCodeInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCodeInput(e.target.value);
  };

  const handleSubmit = () => {
    if (isSubmitting) return;
    
    // For code challenges, check if code is provided
    if (isCodeChallenge && !codeInput.trim()) {
      setFeedbackMessage("Please enter your code solution.");
      setShowFeedback(true);
      return;
    }
    
    // For multiple choice, check if an option is selected
    if (!isCodeChallenge && !selectedOption) {
      setFeedbackMessage("Please select an option.");
      setShowFeedback(true);
      return;
    }
    
    setIsSubmitting(true);
    
    // Calculate total time spent in milliseconds
    const totalTimeMs = Date.now() - startTime;
    
    // Record the choice
    const choiceId = isCodeChallenge ? 'code_solution' : selectedOption!;
    recordChoice(challenge.id, choiceId, totalTimeMs);
    
    // Handle code challenge simulation
    if (isCodeChallenge) {
      setFeedbackMessage("Evaluating your code solution...");
      
      // Simulate code execution/evaluation
      setTimeout(() => {
        // Simple simulation of code output
        const simulatedOutput = "Function executed successfully";
        setCodeOutput(simulatedOutput);
        
        setFeedbackMessage("Code evaluation complete!");
        
        // Delay completion to give user time to see the result
        setTimeout(() => {
          setIsSubmitting(false);
          onComplete();
        }, 1500);
      }, 1000);
    } else {
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
    }
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
          {challenge.type === 'technical' && isCodeChallenge && 'CODING CHALLENGE'}
          {challenge.type === 'technical' && !isCodeChallenge && 'TECHNICAL CHALLENGE'}
          {challenge.type === 'analytical' && 'ANALYTICAL CHALLENGE'}
          {challenge.type === 'ethical' && 'ETHICAL DILEMMA'}
          {challenge.type === 'creative' && 'CREATIVE PROBLEM'}
          {challenge.type === 'empathetic' && 'TEAM COMMUNICATION'}
        </div>
        
        <h3 className={cn(typography.h3, "mb-4")}>{challenge.question}</h3>
        
        <div className={cn(typography.bodySmall, "mb-6")}>
          {isCodeChallenge 
            ? "Enter your code solution below. Your approach will be evaluated."
            : "Select your approach carefully. Your choice reveals your decision-making style."}
        </div>
      </div>
      
      {isCodeChallenge ? (
        <div className="space-y-4 mb-6">
          <div className="bg-black/80 rounded-lg border border-gray-700 p-4">
            <textarea
              value={codeInput}
              onChange={handleCodeInputChange}
              className="w-full h-48 bg-black/60 text-neon-green font-mono text-sm p-2 border border-gray-800 rounded focus:border-neon-blue focus:outline-none"
              placeholder="Enter your code solution here..."
              disabled={isSubmitting}
            />
          </div>
          
          {codeOutput && (
            <div className="bg-black/60 rounded-lg border border-gray-700 p-4">
              <div className={cn(typography.subtitle, "text-neon-blue mb-2")}>Output:</div>
              <pre className="text-white font-mono text-sm whitespace-pre-wrap">{codeOutput}</pre>
            </div>
          )}
        </div>
      ) : (
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
      )}
      
      <div className="flex justify-between items-center">
        <div className={cn(typography.caption, "text-muted-foreground")}>
          Time: {Math.floor(timeSpent / 60)}:{(timeSpent % 60).toString().padStart(2, '0')}
        </div>
        
        <button
          onClick={handleSubmit}
          disabled={(isCodeChallenge ? !codeInput.trim() : !selectedOption) || isSubmitting}
          className={cn(
            "neon-button",
            typography.button,
            {
              "opacity-50 cursor-not-allowed": (isCodeChallenge ? !codeInput.trim() : !selectedOption) || isSubmitting,
              "animate-pulse": (isCodeChallenge ? codeInput.trim() : selectedOption) && !isSubmitting,
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
