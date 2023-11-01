import { createStore, createTypedHooks } from 'easy-peasy';
import type { CompleteStoreModel } from '../models/storeModel';
import { TrainingStorageStore } from './statisticsStorageStore';
import { TrainingStore } from './trainingStore';
import { GlobalStorageStore } from './globalPersistentStore';
import { ManagerStorageStore } from './managerStorageStore';
import { sessionStatsAnalyticalStore } from './sessionStatsAnalytics';
import { testHistoryAnalyticalStore } from './testHistory';
import { FlashCardStore } from './flashCardStore';
/**
 * This is the main application store.
 * It contains all global state for the entire application.
 * There are subsections: the training storage store, and the training store
 * The storage store contains the data that is persisted between application runs, such as the WPM count and statistics
 */
export const defaultStoreState: CompleteStoreModel = {
  isDebug: false,
  ...TrainingStorageStore,
  ...TrainingStore,
  ...GlobalStorageStore,
  ...ManagerStorageStore,
  ...sessionStatsAnalyticalStore,
  ...testHistoryAnalyticalStore,
  ...FlashCardStore,
};

const store = createStore<CompleteStoreModel>(defaultStoreState);

const typedHooks = createTypedHooks<CompleteStoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
export default store;
