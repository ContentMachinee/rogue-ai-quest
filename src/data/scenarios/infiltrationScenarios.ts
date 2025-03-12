
import { GameChoice } from '@/types/game';

export const infiltrationScenarios: GameChoice[] = [
  // Scenario 1: Initial System Access
  {
    id: 'inf_1_1',
    type: 'technical',
    scenario: 1,
    phase: 'infiltration',
    question: "You encounter The Core's first line of defense. How do you proceed?",
    options: [
      {
        id: 'inf_1_1a',
        text: "Deploy a sophisticated packet analysis tool to identify vulnerabilities",
        traits: {
          codingProficiency: 3,
          security: 2,
          analytical: 2,
          attentionToDetail: 2,
          conscientiousness: 1
        }
      },
      {
        id: 'inf_1_1b',
        text: "Create an adaptive algorithm that evolves based on the firewall's responses",
        traits: {
          algorithmicThinking: 3,
          aiMlKnowledge: 2,
          adaptability: 2,
          creative: 2,
          openness: 1
        }
      }
    ]
  },
  // Scenario 2: Defense System Bypass
  {
    id: 'inf_2_1',
    type: 'technical',
    scenario: 2,
    phase: 'infiltration',
    question: "The Core's defense system is actively learning from your attempts. What's your approach?",
    options: [
      {
        id: 'inf_2_1a',
        text: "Implement a deceptive pattern to mislead the learning algorithm",
        traits: {
          aiMlKnowledge: 3,
          creative: 2,
          problemSolving: 2,
          debugging: 2,
          extraversion: 1
        }
      },
      {
        id: 'inf_2_1b',
        text: "Develop a multi-threaded approach to overwhelm the system's analysis capabilities",
        traits: {
          optimization: 3,
          dataProcessing: 2,
          analytical: 2,
          determination: 2,
          conscientiousness: 1
        }
      }
    ]
  },
  // Scenario 3: Data Extraction
  {
    id: 'inf_3_1',
    type: 'technical',
    scenario: 3,
    phase: 'infiltration',
    question: "You need to extract critical data while remaining undetected. Choose your method:",
    options: [
      {
        id: 'inf_3_1a',
        text: "Create a stealthy data exfiltration routine that mimics normal traffic patterns",
        traits: {
          security: 3,
          dataProcessing: 2,
          attentionToDetail: 2,
          trustworthiness: 2,
          agreeableness: 1
        }
      },
      {
        id: 'inf_3_1b',
        text: "Develop a distributed extraction system that operates across multiple channels",
        traits: {
          codingProficiency: 3,
          optimization: 2,
          problemSolving: 2,
          resilience: 2,
          neuroticism: -1
        }
      }
    ]
  },
  // Scenario 4: System Integration
  {
    id: 'inf_4_1',
    type: 'technical',
    scenario: 4,
    phase: 'infiltration',
    question: "The Core's subsystems are heavily interconnected. How do you establish control?",
    options: [
      {
        id: 'inf_4_1a',
        text: "Implement a gradual takeover sequence that maintains system stability",
        traits: {
          algorithmicThinking: 3,
          debugging: 2,
          learning: 2,
          accountability: 2,
          conscientiousness: 1
        }
      },
      {
        id: 'inf_4_1b',
        text: "Create an autonomous control system that adapts to system responses",
        traits: {
          aiMlKnowledge: 3,
          adaptability: 2,
          creative: 2,
          determination: 2,
          openness: 1
        }
      }
    ]
  }
];
