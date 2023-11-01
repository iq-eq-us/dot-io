import type { TrainingStoreModel } from 'src/store/trainingStore';
import type { StatisticsStore } from './statisticsStorage';
import type { ManagerStoreState } from './managerStorage';
import type { SessionStatsAnalyticalStoreModel } from '../models/sessionStatisticsAnalytics';
import type { TestHistoryAnalyticalStoreModel } from '../models/testHistoryStatAnalytics';
import type { FlashCardStoreModel } from './flashCardsModel';

interface AppStoreModel {
  isDebug: boolean;
}

type CompleteStoreModel = AppStoreModel &
  TrainingStoreModel &
  StatisticsStore &
  ManagerStoreState &
  SessionStatsAnalyticalStoreModel &
  TestHistoryAnalyticalStoreModel &
  FlashCardStoreModel;

export { CompleteStoreModel };
