import { useStoreState } from '../store/store';

export const useContrast = (): string => {
  const trainingSettings = useStoreState((store) => store.trainingSettings);

  const alphaValue = trainingSettings.contrastPercentage / 100;
  return `rgb(${255 * (1 - alphaValue)}, ${255 * (1 - alphaValue)}, ${
    255 * (1 - alphaValue)
  })`;
};
