import { useEffect } from 'react';
import { useCurrentTrainingScenario } from '../pages/training/useCurrentTrainingScenario';
import { useStoreActions } from '../store/store';

function useUpdateTrainingModeOnURLChange(): void {
  const currentTrainingScenario = useCurrentTrainingScenario();
  const startAlphabetTraining = useStoreActions(
    (store) => store.beginTrainingAlphabetMode,
  );
  const startTrigramTraining = useStoreActions(
    (store) => store.beginTrainingTrigramMode,
  );
  const startChordTraining = useStoreActions(
    (store) => store.beginTrainingChordMode,
  );

  useEffect(() => {
    if (currentTrainingScenario === 'ALPHABET') startAlphabetTraining();
    else if (currentTrainingScenario === 'TRIGRAM') startTrigramTraining();
    else if (currentTrainingScenario === 'CHORDING') startChordTraining();
  }, [currentTrainingScenario]);
}

export { useUpdateTrainingModeOnURLChange };
