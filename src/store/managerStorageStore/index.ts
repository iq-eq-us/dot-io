import type { ManagerStore } from '../../../src/models/managerStorage';
import managerStoreState from './state';
import managerStorageStoreActions from './actions';

/**
 * This is the storage training store, split up by state and actions.
 * It not only contains the statistics and WPM count for the user, but also gets its data from local storage.
 */
const ManagerStorageStore: ManagerStore = {
  ...managerStorageStoreActions,
  ...managerStoreState,
};

export { ManagerStorageStore };
