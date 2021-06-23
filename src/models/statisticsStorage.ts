import type { Action, Computed } from 'easy-peasy';
import type { TrainingStatistics } from './trainingStatistics';

export interface StatisticsStore {
  totalSavedTrainingStatistics: TrainingStatistics;
  totalSavedCharacterChordStats: Computed<StatisticsStore, TrainingStatistics>;
  totalSavedChordStats: Computed<StatisticsStore, TrainingStatistics>;
  setTotalSavedTrainingStatistics: Action<StatisticsStore, TrainingStatistics>;
  clearAllStorage: Action<StatisticsStore>;
}
