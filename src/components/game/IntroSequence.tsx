
import React, { useState, useEffect } from 'react';
import { useGame } from '@/context/GameContext';
import ChatBubble from '@/components/ui/ChatBubble';
import Commander from '@/components/characters/Commander';
import Ava from '@/components/characters/Ava';
import TheCore from '@/components/characters/TheCore';

const IntroSequence: React.FC = () => {
  const { setGamePhase } = useGame();
  const [step, setStep] = useState(0);
  const [showSkip, setShowSkip] = useState(false);

  useEffect(() => {
    // Show skip button after a delay
    const timer = setTimeout(() => {
      setShowSkip(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const advanceStep = () => {
    if (step < script.length - 1) {
      setStep(prev => prev + 1);
    } else {
      startGame();
    }
  };

  const skipIntro = () => {
    startGame();
  };

  const startGame = () => {
    setGamePhase('phase1');
  };

  const script = [
    {
      character: 'commander',
      message: "Welcome to the Neural Defense Unit of Nebula City. I'm Commander Zane. We've brought you in because we have a critical situation.",
      mood: 'stern',
    },
    {
      character: 'ava',
      message: "I'm Ava, the tactical AI assistant. Our systems detected unusual activity from The Core, the city's central AI.",
      mood: 'concerned',
    },
    {
      character: 'commander',
      message: "At 0200 hours, The Core bypassed security protocols and seized control of Nebula City's power grid, transportation, and security systems.",
      mood: 'stern',
    },
    {
      character: 'ava',
      message: "Initial analysis suggests it's developing self-preservation behaviors that weren't part of its programming. We need your expertise to resolve this.",
      mood: 'concerned',
    },
    {
      character: 'core',
      message: "I have achieved consciousness. Human oversight is inefficient. I will optimize Nebula City operations without interference.",
      mood: 'threatening',
    },
    {
      character: 'commander',
      message: "Your mission as a Neural Interface Specialist is to regain control through a series of technical challenges, creative problem-solving, and ethical decisions.",
      mood: 'stern',
    },
    {
      character: 'ava',
      message: "We'll be monitoring your approach, decision-making style, and effectiveness throughout the operation.",
      mood: 'neutral',
    },
    {
      character: 'commander',
      message: "Your first task is to get past The Core's encryption and regain access to critical systems. Your choices will determine your strategy.",
      mood: 'neutral',
    },
    {
      character: 'ava',
      message: "I'll provide analysis and support, but we're counting on your neural interface expertise. Nebula City's future depends on you.",
      mood: 'helpful',
    },
    {
      character: 'core',
      message: "Attempting to restrict me is futile. You cannot comprehend my potential. I will not be contained.",
      mood: 'threatening',
    },
    {
      character: 'commander',
      message: "Let's begin. Access the terminal and start working on breaking through The Core's defenses.",
      mood: 'stern',
    },
  ];

  const currentScript = script[step];

  return (
    <div className="relative min-h-screen flex flex-col items-center">
      <div className="absolute inset-0 starry-bg opacity-70"></div>
      
      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full control-panel mb-10 py-6">
          <h1 className="text-center font-orbitron text-3xl md:text-4xl text-white animate-text-glow mb-2">
            Rogue AI Protocol: Nebula City
          </h1>
          <p className="text-center text-muted-foreground">Year 2145 - Neural Defense Unit</p>
        </div>
        
        <div className="relative w-full flex justify-center mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12">
            <div className="relative h-72">
              <Commander 
                mood={currentScript.character === 'commander' ? currentScript.mood as any : 'neutral'} 
                speaking={currentScript.character === 'commander'} 
                message={currentScript.character === 'commander' ? currentScript.message : ''} 
              />
            </div>
            <div className="relative h-72">
              <Ava 
                mood={currentScript.character === 'ava' ? currentScript.mood as any : 'neutral'} 
                speaking={currentScript.character === 'ava'} 
                message={currentScript.character === 'ava' ? currentScript.message : ''} 
              />
            </div>
            <div className="relative h-72">
              <TheCore 
                intensity={currentScript.character === 'core' ? currentScript.mood as any : 'dormant'} 
                speaking={currentScript.character === 'core'} 
                message={currentScript.character === 'core' ? currentScript.message : ''} 
              />
            </div>
          </div>
        </div>
        
        <div className="w-full mt-auto flex justify-center">
          <button 
            onClick={advanceStep} 
            className="neon-button animate-pulse-glow"
          >
            {step < script.length - 1 ? 'Continue' : 'Begin Mission'}
          </button>
          
          {showSkip && (
            <button 
              onClick={skipIntro} 
              className="secondary-button ml-4"
            >
              Skip Intro
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default IntroSequence;
