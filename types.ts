export enum View {
  MainMenu,
  Entertainment,
  Learning,
  Calculator,
  MathPractice,
  RockPaperScissors,
  Settings,
  BatteryInfo,
  Calendar,
  Camera,
}

export enum MathGame {
  Comparison,
  Calculation
}

export type Theme = 'light' | 'dark';
export type FontFamily = 'modern' | 'formal' | 'stylish' | 'pixel' | 'script' | 'futuristic' | 'mono' | 'handwritten';
export type FontSize = 'text-sm' | 'text-base' | 'text-lg';

export type MenuTheme = 
  | 'rainbow' 
  | 'matrix' 
  | 'cute' 
  | 'neon' 
  | 'classic' 
  | 'ocean' 
  | 'sunset' 
  | 'jungle' 
  | 'royal' 
  | 'minimalist'
  | 'ios'
  | 'space'
  | 'vintage'
  | 'pastel';