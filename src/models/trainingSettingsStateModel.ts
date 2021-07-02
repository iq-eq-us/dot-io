type AutoOrCustom = 'AUTO' | 'CUSTOM';

export interface TrainingSettingsState {
  isHighlightingKeys: boolean;
  isUsingRecursion: boolean;
  autoOrCustom: AutoOrCustom;
  targetChords: number;
  speedGoal: number;
  recursionRate: number;
  isErrorBurst: boolean;
  isDisplayingHUD: boolean;
  contrastPercentage: number;
  isAutoWrite: boolean;
  isDisplayingSettingsModal: boolean;
  isDisplayingStatisticsModal: boolean;
}

export const defaultTrainingSettings: TrainingSettingsState = {
  isHighlightingKeys: true,
  isUsingRecursion: true,
  autoOrCustom: 'AUTO',
  targetChords: 0,
  speedGoal: 200,
  recursionRate: 0,
  isErrorBurst: false,
  isDisplayingHUD: true,
  contrastPercentage: 100,
  isAutoWrite: true,
  isDisplayingSettingsModal: false,
  isDisplayingStatisticsModal: false,
};
