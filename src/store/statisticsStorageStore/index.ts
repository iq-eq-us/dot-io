import type { StatisticsStore } from '../../models/statisticsStorage';
import statisticsStorageStoreActions from './actions';
import statisticsStoreState from './state';

const TrainingStorageStore: StatisticsStore = {
  ...statisticsStoreState,
  ...statisticsStorageStoreActions,
};

export { TrainingStorageStore };
