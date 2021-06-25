import type { Action, Computed } from 'easy-peasy';
import type { TrainingStatistics } from './trainingStatistics';

export interface StatisticsStoreState {
  totalSavedTrainingStatistics: TrainingStatistics;
  totalSavedCharacterChordStats: Computed<StatisticsStore, TrainingStatistics>;
  totalSavedChordStats: Computed<StatisticsStore, TrainingStatistics>;
}

export interface StatisticsStoreActions {
  setTotalSavedTrainingStatistics: Action<StatisticsStore, TrainingStatistics>;
  clearAllStorage: Action<StatisticsStore>;
}

export type StatisticsStore = StatisticsStoreState & StatisticsStoreActions;
