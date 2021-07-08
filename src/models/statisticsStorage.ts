import type { Action, ActionOn, Computed } from 'easy-peasy';
import type { TrainingStatistics } from './trainingStatistics';

export interface StatisticsStoreState {
  totalSavedTrainingStatistics: TrainingStatistics;
  totalSavedCharacterChordStats: Computed<StatisticsStore, TrainingStatistics>;
  totalSavedChordStats: Computed<StatisticsStore, TrainingStatistics>;
  fastestRecordedWordsPerMinute: number;
}

export interface StatisticsStoreActions {
  setTotalSavedTrainingStatistics: Action<StatisticsStore, TrainingStatistics>;
  clearAllStorage: Action<StatisticsStore>;
  setFastestRecordedWordsPerMinute: Action<StatisticsStore, number>;
  onChangeFastestWPM: ActionOn<StatisticsStore>;
}

export type StatisticsStore = StatisticsStoreState & StatisticsStoreActions;
