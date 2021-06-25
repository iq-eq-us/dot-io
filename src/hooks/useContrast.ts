import { useStoreState } from '../store/store';

export const useContrast = (): string => {
  const trainingSettings = useStoreState((store) => store.trainingSettings);

  const alphaValue = trainingSettings.contrastPercentage / 100;
  return `rgba(255, 255, 255, ${1 - alphaValue})`;
};
