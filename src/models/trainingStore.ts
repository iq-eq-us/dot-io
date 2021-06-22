import type { Action, Computed } from 'easy-peasy';
import type { KeyHighlightPosition } from './keyHighlightPositions';
import type { TrainingScenario } from './trainingScenario';
import type { TrainingSettingsState } from './trainingSettingsStateModel';
import type { TrainingStatistics } from './trainingStatistics';

export interface TrainingStoreModel {
  trainingSettings: TrainingSettingsState;
  setTrainingSettings: Action<TrainingStoreModel, TrainingSettingsState>;
  currentTrainingMode: Computed<TrainingStoreModel, TrainingScenario | void>;
  beginTrainingAlphabetMode: Action<TrainingStoreModel>;
  beginTrainingTrigramMode: Action<TrainingStoreModel>;
  beginTrainingChordMode: Action<TrainingStoreModel>;
  trainingText: string[][];
  currentLineOfTrainingText: number;
  currentSubindexInTrainingText: number;
  proceedToNextWord: Action<TrainingStoreModel>;
  targetWord: Computed<TrainingStoreModel, string | undefined>;
  currentlyHighlightedKeys: Computed<
    TrainingStoreModel,
    KeyHighlightPosition[]
  >;
  /**
   * * These training statistics are local to the current training session.
   * * To see the training stats that are stored between sessions and displayed on the dashboard,
   * * go to the statisticsStorageStore.ts file in the store directory.
   */
  trainingStatistics: TrainingStatistics;
  errorOccurredWhileAttemptingToTypeTargetChord: boolean;
  setErrorOccurredWhileAttemptingToTypeTargetChord: Action<
    TrainingStoreModel,
    boolean
  >;
  timeOfLastChordStarted: number;
  timeTakenToTypePreviousChord: number;
}
