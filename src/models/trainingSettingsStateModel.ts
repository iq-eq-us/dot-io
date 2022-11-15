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
  isTestDone: boolean;
  restartTestMode: boolean;
}

export const defaultTrainingSettings: TrainingSettingsState = {
  isHighlightingKeys: true,
  isUsingRecursion: true,
  autoOrCustom: 'CUSTOM',
  targetChords: 8,
  speedGoal: 40,
  recursionRate: 95,
  isErrorBurst: false,
  isDisplayingHUD: true,
  contrastPercentage: 100,
  isAutoWrite: true,
  isDisplayingSettingsModal: false,
  isDisplayingStatisticsModal: false,
  isTestDone: false,
  restartTestMode: false,
};

export const defaultTrigramsTestTraining: TrainingSettingsState = {
  isHighlightingKeys: true,
  isUsingRecursion: true,
  autoOrCustom: 'CUSTOM',
  targetChords: 8,
  speedGoal: 20,
  recursionRate: 100,
  isErrorBurst: false,
  isDisplayingHUD: true,
  contrastPercentage: 100,
  isAutoWrite: true,
  isDisplayingSettingsModal: false,
  isDisplayingStatisticsModal: false,
  isTestDone: false,
  restartTestMode: false,
};

export const defaultAlphabeticTestTraining: TrainingSettingsState = {
  isHighlightingKeys: true,
  isUsingRecursion: true,
  autoOrCustom: 'CUSTOM',
  targetChords: 6,
  speedGoal: 13,
  recursionRate: 100,
  isErrorBurst: false,
  isDisplayingHUD: true,
  contrastPercentage: 100,
  isAutoWrite: true,
  isDisplayingSettingsModal: false,
  isDisplayingStatisticsModal: false,
  isTestDone: false,
  restartTestMode: false,
};
