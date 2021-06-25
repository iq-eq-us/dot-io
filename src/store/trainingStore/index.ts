import type { TrainingStoreModel } from '../../models/trainingStore';
import trainingStoreActions from './actions';
import trainingStoreState from './state';

const TrainingStore: TrainingStoreModel = {
  ...trainingStoreState,
  ...trainingStoreActions,
};

export { TrainingStore, TrainingStoreModel };
