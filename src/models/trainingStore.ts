import type { Action, ActionOn, Computed, ThunkOn } from 'easy-peasy';
import type { ChordLibraryRecord } from '../data/chordLibrary';
import type { CharacterEntryMode } from '../helpers/convertStringToKeyHighlightPositions';
import type { KeyHighlightPosition } from './keyHighlightPositions';
import type { KeyHighlightPositionLite } from './keyHighlightPositionsCharachorderLite';

import type { TrainingScenario } from './trainingScenario';
import type { TrainingSettingsState } from './trainingSettingsStateModel';
import type { TrainingStatistics } from './trainingStatistics';

export interface TrainingStoreActionsModel {
  setTrainingSettings: Action<TrainingStoreModel, TrainingSettingsState>;
  setIsDisplayingStatisticsModal: Action<TrainingStoreModel, boolean>;
  beginTrainingMode: Action<TrainingStoreModel, TrainingScenario>;
  proceedToNextWord: Action<TrainingStoreModel>;
  setErrorOccurredWhileAttemptingToTypeTargetChord: Action<
    TrainingStoreModel,
    boolean
  >;
  checkForAdvanceToNextTrainingLevel: ActionOn<TrainingStoreModel>;
  resetTrainingText: Action<TrainingStoreModel>;
  setTypedTrainingText: Action<TrainingStoreModel, string>;
  onChangeTypedTrainingText: ThunkOn<TrainingStoreModel>;
  toggleChordEditModal: Action<TrainingStoreModel>;
  clearTemporaryTrainingData: Action<TrainingStoreModel>;
  /**
   * This action allows you to manually update the chords used in a particular training mode
   * For example, if you were in Lexical training, you can use the top right "View/Edit" chords box
   * to remove a chord or add a new one. This action will take care of all the necessary changes that
   * occur when updating target chords.
   */
  updateChordsUsedForTraining: Action<TrainingStoreModel, ChordLibraryRecord>;
  /**
   * This should not be called directly, it is only used for testing purposes.
   * You should rely on the beginTrainingXYZMode actions to generate training data rather than set it directly with this action.
   * See: `beginTrainingAlphabetMode` || `beginTrainingTrigramMode` || `beginTrainingChordMode` || `beginTrainingLexicalMode`
   */
  UNSAFE_setTrainingText: Action<TrainingStoreModel, string[][]>;
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
  currentlyHighlightedKeysLite: Computed<
    TrainingStoreModel,
    KeyHighlightPositionLite[]
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
  typedTrainingText: string;
  currentTrainingScenario: TrainingScenario | undefined;
  isDisplayingChordEditModal: boolean;
  chordsToPullFrom: ChordLibraryRecord;
  isShowingPlusIcon: boolean;
  targetTextLineOne: Computed<TrainingStoreModel, string[] | undefined>;
  targetTextLineTwo: Computed<TrainingStoreModel, string[] | undefined>;
  numberOfChordsForTrainingLevel: number;
  characterEntryMode: Computed<
    TrainingStoreModel,
    CharacterEntryMode | undefined
  >;
  targetCharacterIndex: Computed<TrainingStoreModel, number | undefined>;
}

export type TrainingStoreModel = TrainingStoreStateModel &
  TrainingStoreActionsModel;
