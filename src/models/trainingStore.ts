import type { Action, ActionOn, Computed } from 'easy-peasy';
import type { KeyHighlightPosition } from './keyHighlightPositions';
import type { TrainingSettingsState } from './trainingSettingsStateModel';
import type { TrainingStatistics } from './trainingStatistics';

export interface TrainingStoreActionsModel {
  setTrainingSettings: Action<TrainingStoreModel, TrainingSettingsState>;
  beginTrainingAlphabetMode: Action<TrainingStoreModel>;
  beginTrainingTrigramMode: Action<TrainingStoreModel>;
  beginTrainingChordMode: Action<TrainingStoreModel>;
  beginTrainingLexicalMode: Action<TrainingStoreModel>;
  proceedToNextWord: Action<TrainingStoreModel>;
  setErrorOccurredWhileAttemptingToTypeTargetChord: Action<
    TrainingStoreModel,
    boolean
  >;
  checkForAdvanceToNextTrainingLevel: ActionOn<TrainingStoreModel>;
  resetTrainingText: Action<TrainingStoreModel>;
}

export interface TrainingStoreStateModel {
  trainingSettings: TrainingSettingsState;
  trainingText: string[][];
  currentLineOfTrainingText: number;
  currentSubindexInTrainingText: number;
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
  timeOfLastChordStarted: number;
  timeTakenToTypePreviousChord: number;
  previousTargetChord: Computed<TrainingStoreModel, string | undefined>;
  currentLevel: number;
  timeAtTrainingStart: number;
}

export type TrainingStoreModel = TrainingStoreStateModel &
  TrainingStoreActionsModel;
