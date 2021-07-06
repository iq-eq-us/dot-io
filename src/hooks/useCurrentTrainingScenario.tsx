import type { TrainingScenario } from '../models/trainingScenario';
import { useStoreState } from '../store/store';

export const useCurrentTrainingScenario = (): TrainingScenario | void => {
  const trainingScenario = useStoreState(
    (store) => store.currentTrainingScenario,
  );

  return trainingScenario;
};
