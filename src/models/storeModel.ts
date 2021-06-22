import type { TrainingStoreModel } from 'src/store/trainingStore';

interface AppStoreModel {
  isDebug: boolean;
}

type CompleteStoreModel = AppStoreModel & TrainingStoreModel;

export { CompleteStoreModel };
