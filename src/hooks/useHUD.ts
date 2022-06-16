import { useStoreState } from '../store/store';

export const useHUD = (): boolean => {
  const trainingSettings = useStoreState((store) => store.trainingSettings);

  const isHUDEnabled = trainingSettings.isDisplayingHUD;

  return isHUDEnabled;
};
