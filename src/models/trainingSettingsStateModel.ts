type AutoOrCustom = 'AUTO' | 'CUSTOM';

export interface TrainingSettingsState {
  isHighlightingKeys: boolean;
  isUsingRecursion: boolean;
  autoOrCustom: AutoOrCustom;
  targetChords: number;
  speedGoal: number;
  ratePercentage: number;
  isErrorBurst: boolean;
  isDisplayingHUD: boolean;
  contrastPercentage: number;
  isAutoWrite: boolean;
}

export const defaultTrainingSettings: TrainingSettingsState = {
  isHighlightingKeys: true,
  isUsingRecursion: false,
  autoOrCustom: 'AUTO',
  targetChords: 0,
  speedGoal: 200,
  ratePercentage: 0,
  isErrorBurst: false,
  isDisplayingHUD: true,
  contrastPercentage: 100,
  isAutoWrite: true,
};
