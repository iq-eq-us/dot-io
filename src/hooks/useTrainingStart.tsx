import type { ActionCreator } from 'easy-peasy';
import { useStoreActions } from '../store/store';

export function useTrainingStart(): {
  startAlphabetTraining: ActionCreator<void>;
  startTrigramTraining: ActionCreator<void>;
  startLexicalTraining: ActionCreator<void>;
  startChordTraining: ActionCreator<void>;
} {
  const startAlphabetTraining = useStoreActions(
    (store) => store.beginTrainingAlphabetMode,
  );
  const startChordTraining = useStoreActions(
    (store) => store.beginTrainingChordMode,
  );
  const startTrigramTraining = useStoreActions(
    (store) => store.beginTrainingTrigramMode,
  );
  const startLexicalTraining = useStoreActions(
    (store) => store.beginTrainingLexicalMode,
  );
  return {
    startAlphabetTraining,
    startTrigramTraining,
    startLexicalTraining,
    startChordTraining,
  };
}
