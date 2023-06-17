export interface CPMStats {
  ALPHABET: number;
  TRIGRAMS: number;
  LEXICAL: number;
}

export interface CHMStats {
  ALLCHM: number;
}

export interface ProgressState {
  CPM: CPMStats;
  CHM: CHMStats;
}

export const defaultProgressBarValues: ProgressState = {
  CPM: {
    ALPHABET: 20,
    TRIGRAMS: 40,
    LEXICAL: 60,
  },
  CHM: {
    ALLCHM: 150,
  },
};

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
  isProgressBarDynamic: boolean;
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
  isProgressBarDynamic: true,
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
  isProgressBarDynamic: true,
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
  isProgressBarDynamic: true,
};

export const defaultTrainingSettingsState: TrainingSettingsState = {
  isHighlightingKeys: true,
  isUsingRecursion: true,
  autoOrCustom: 'CUSTOM',
  targetChords: 6,
  speedGoal: 100,
  recursionRate: 100,
  isErrorBurst: false,
  isDisplayingHUD: true,
  contrastPercentage: 100,
  isAutoWrite: true,
  isDisplayingSettingsModal: false,
  isDisplayingStatisticsModal: false,
  isTestDone: false,
  restartTestMode: false,
  isProgressBarDynamic: true,
};
