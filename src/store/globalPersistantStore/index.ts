import type { GlobalStore } from '../../../src/models/globalStorage';
import globalStoreState from './state';
import globalStorageStoreActions from './actions';

/**
 * This is the storage training store, split up by state and actions.
 * It not only contains the statistics and WPM count for the user, but also gets its data from local storage.
 */
const GlobalStorageStore: GlobalStore = {
  ...globalStorageStoreActions,
  ...globalStoreState,
};

export { GlobalStorageStore };
