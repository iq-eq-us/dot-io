import type { Action } from 'easy-peasy';
import type { TrainingStatistics } from './trainingStatistics';

export interface StatisticsStore {
  totalSavedTrainingStatistics: TrainingStatistics;
  setTotalSavedTrainingStatistics: Action<StatisticsStore, TrainingStatistics>;
}
