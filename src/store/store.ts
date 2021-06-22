import { createStore, createTypedHooks } from 'easy-peasy';
import type { CompleteStoreModel } from '../models/storeModel';
import { TrainingStore } from './trainingStore';

export const defaultStoreState: CompleteStoreModel = {
  isDebug: false,
  ...TrainingStore,
};

const store = createStore<CompleteStoreModel>(defaultStoreState);

const typedHooks = createTypedHooks<CompleteStoreModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
export default store;
