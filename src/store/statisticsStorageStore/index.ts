import type { StatisticsStore } from '../../models/statisticsStorage';
import statisticsStorageStoreActions from './actions';
import statisticsStoreState from './state';

/**
 * This is the storage training store, split up by state and actions.
 * It not only contains the statistics and WPM count for the user, but also gets its data from local storage.
 */
const TrainingStorageStore: StatisticsStore = {
  ...statisticsStoreState,
  ...statisticsStorageStoreActions,
};

export { TrainingStorageStore };
