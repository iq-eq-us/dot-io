import { useStoreState } from '../../store/store';
import type { TrainingScenario } from '../../models/trainingScenario';

export const useCurrentTrainingScenario = (): TrainingScenario | void => {
  const currentTrainingMode = useStoreState(
    (store) => store.currentTrainingMode,
  );
  return currentTrainingMode;
};
