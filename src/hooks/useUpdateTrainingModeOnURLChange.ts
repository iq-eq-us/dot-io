import { useLayoutEffect } from 'react';
import { useCurrentTrainingScenario } from './useCurrentTrainingScenario';
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
  const startLexicalTraining = useStoreActions(
    (store) => store.beginTrainingLexicalMode,
  );

  useLayoutEffect(() => {
    if (currentTrainingScenario === 'ALPHABET') startAlphabetTraining();
    else if (currentTrainingScenario === 'TRIGRAM') startTrigramTraining();
    else if (currentTrainingScenario === 'CHORDING') startChordTraining();
    else if (currentTrainingScenario === 'LEXICAL') startLexicalTraining();
  }, [currentTrainingScenario]);
}

export { useUpdateTrainingModeOnURLChange };
