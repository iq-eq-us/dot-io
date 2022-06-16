import type { TrainingStoreModel } from 'src/store/trainingStore';
import type { StatisticsStore } from './statisticsStorage';

interface AppStoreModel {
  isDebug: boolean;
}

type CompleteStoreModel = AppStoreModel & TrainingStoreModel & StatisticsStore;

export { CompleteStoreModel };
