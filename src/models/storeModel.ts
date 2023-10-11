import type { TrainingStoreModel } from 'src/store/trainingStore';
import type { StatisticsStore } from './statisticsStorage';
import type { ManagerStoreState } from './managerStorage';
import type { FlashCardStoreModel } from './flashCardsModel';

interface AppStoreModel {
  isDebug: boolean;
}

type CompleteStoreModel = AppStoreModel &
  TrainingStoreModel &
  StatisticsStore &
  ManagerStoreState &
  FlashCardStoreModel;

export { CompleteStoreModel };
