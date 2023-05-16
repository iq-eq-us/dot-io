import type { TrainingStoreModel } from 'src/store/trainingStore';
import type { StatisticsStore } from './statisticsStorage';
import type { ManagerStoreState } from './managerStorage';

interface AppStoreModel {
  isDebug: boolean;
}

type CompleteStoreModel = AppStoreModel &
  TrainingStoreModel &
  StatisticsStore &
  ManagerStoreState;

export { CompleteStoreModel };
