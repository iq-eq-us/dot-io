import type { TrainingStoreModel } from '../../models/trainingStore';
import trainingStoreActions from './actions';
import trainingStoreState from './state';

/**
 * This is the main training store, split up by state and actions.
 * It contains most of the application logic for the training pages.
 */
const TrainingStore: TrainingStoreModel = {
  ...trainingStoreState,
  ...trainingStoreActions,
};

export { TrainingStore, TrainingStoreModel };
