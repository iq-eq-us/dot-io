import type { ActionCreator } from 'easy-peasy';
import type { TrainingSettingsState } from '../models/trainingSettingsStateModel';
import { useStoreActions, useStoreState } from '../store/store';

function useTrainingSettings(): [
  TrainingSettingsState,
  ActionCreator<TrainingSettingsState>,
] {
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const setTrainingSettings = useStoreActions(
    (store) => store.setTrainingSettings,
  );

  return [trainingSettings, setTrainingSettings];
}

export { useTrainingSettings };
