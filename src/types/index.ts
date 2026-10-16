export type ActiveSection =
  | 'home'
  | 'curriculum'
  | 'companion'
  | 'projects'
  | 'progress'
  | 'preferences';

export type GuidanceLevel = 'guided' | 'flexible' | 'fast-track';

export type InstructionDepth = 'short' | 'detailed';

export type TextSize = 'standard' | 'large' | 'xl';

export interface UserPreferences {
  guidanceLevel: GuidanceLevel;
  instructionDepth: InstructionDepth;
  textSize: TextSize;
  highContrast: boolean;
  dyslexiaFriendly: boolean;
  reducedMotion: boolean;
  readAloudEnabled: boolean;
  speechRate: number;
  persistentStuckButton: boolean;
  workRole?: string;
  hasCompletedOnboarding?: boolean;
}

export interface ClarifyingQuestion {
  question: string;
  options: string[];
}

export interface CompanionStep {
  stepNumber: number;
  title: string;
  instruction: string;
  whatToClick?: string;
}

export interface CompanionResponse {
  summary: string;
  recommendedTool: string;
  clarifyingQuestion?: string | null;
  clarifyingOptions?: string[] | null;
  mainAction: string;
  steps: CompanionStep[];
  formulaCode?: string | null;
  formulaExplanation?: string | null;
  plainEnglishTip?: string;
}

export interface StuckModeOption {
  id: 'explain_differently' | 'show_what_to_click' | 'break_steps' | 'show_answer' | 'give_example';
  label: string;
  description: string;
}

export interface LearningModule {
  id: string;
  title: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Core Principle';
  estimatedMinutes: number;
  workplaceScenario: string;
  coreConcepts: string[];
  toolComparison?: {
    toolName: string;
    bestFor: string;
    learningCurve: string;
  }[];
  stepByStepGuide: {
    step: string;
    plainEnglish: string;
    exampleFormulaOrAction?: string;
  }[];
  quickCheckQuestion: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  };
  keyTakeaway: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  description: string;
  lastUpdated: string;
  status: 'In Progress' | 'Completed' | 'Draft';
  guidanceLevel: GuidanceLevel;
  datasetRowsCount?: number;
}
