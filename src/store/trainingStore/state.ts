import { computed } from 'easy-peasy';
import {
  ConvertStringToKeyHighlightPositions,
  CharacterEntryMode,
} from '../../helpers/convertStringToKeyHighlightPositions';
import {
  ConvertStringToKeyHighlightPositionsLite,
} from '../../helpers/convertStringToKeyHighlightPositionsCharachorderLite';
import { defaultTrainingSettings, defaultAlphabeticTestTraining } from '../../models/trainingSettingsStateModel';
import type { TrainingStoreStateModel } from '../../models/trainingStore';
import type { TrainingLevels } from '../..//models/trainingLevels';
import { generateNewChordRecordForAllChordsModule } from '../../pages/test/components/EditChordModal';

/**
 * Here is the training store state, which contains the majority of the application state
 * pertaining to the training sessions.
 *
 * This state is only modified by the actions in the ./actions.ts folder.
 */
const trainingStoreState: TrainingStoreStateModel = {
  // * State
  typedTrainingText: '',
  trainingText: [],
  compareText: [],
  numberOfWordsChorded: 0,
  currentLineOfTrainingText: 0,
  currentSubindexInTrainingText: 0,
  trainingSettings: JSON.parse(JSON.stringify(defaultAlphabeticTestTraining)),
  errorOccurredWhileAttemptingToTypeTargetChord: false,
  timeOfLastChordStarted: 0,
  timeTakenToTypePreviousChord: 0,
  isTestDone: false,
  restartTestMode: false,
  userIsEditingPreviousWord: false,
  allTypedCharactersStore: [],
  trainingLevel: 'CPM' as TrainingLevels,
  moduleCompleteModalToggle: false,
  downloadModulModalToggle: false,
  wasModuleShown: false,
  moduleNumber: 1,
  trainingStatistics: {
    statistics: [],
  },
  currentLevel: 0,
  timeAtTrainingStart: 0,
  numberOfChordsForTrainingLevel: 0,
  testTeirHighestWPM: 0,
  storedChordsRepresentation: generateNewChordRecordForAllChordsModule(JSON?.parse(localStorage?.getItem('chordsReadFromDevice'))),
  // * Computed State
  currentlyHighlightedKeys: computed((state) => {
    const highlightMode = state.characterEntryMode;
    if (!highlightMode) return [];

    return state.trainingSettings.isHighlightingKeys
      ? ConvertStringToKeyHighlightPositions(
        state.currentTrainingScenario,
          state.targetWord || '',
          highlightMode,
          state.targetCharacterIndex ?? -1,
          state.trainingLevel,
        )
      : [];
  }),
    characterEntryMode: computed((state) => {
    if (!state.currentTrainingScenario) return undefined;

    const highlightMode: CharacterEntryMode =
      state.currentTrainingScenario === 'ALPHABET' ||
      state.currentTrainingScenario === 'LEXICAL' ||
      state.currentTrainingScenario === 'TRIGRAM' ||
      state.currentTrainingScenario === 'LEXICALSENTENCES'||
      state.currentTrainingScenario === 'ALLCHORDS'||
      state.currentTrainingScenario === 'CUSTOMTIER'
        ? 'CHARACTER'
        : 'CHORD';
    return highlightMode;
  }),
  currentlyHighlightedKeysLite: computed((state) => {
    const highlightMode = state.characterEntryMode;
    if (!highlightMode) return [];

    return state.trainingSettings.isHighlightingKeys
      ? ConvertStringToKeyHighlightPositionsLite(
        state.currentTrainingScenario,
          state.targetWord || '',
          highlightMode,
          state.targetCharacterIndex ?? -1,
          state.trainingLevel,

        )
      : [];
  }),
  targetWord: computed((state) => {
    const trainingText = state.trainingText;
    const targetWord =
      trainingText?.[state.currentLineOfTrainingText]?.[
        state.currentSubindexInTrainingText
      ];

    return targetWord;
  }),
  targetCharacterIndex: computed((state) => {
    const targetWord = state.targetWord;
    const enteredText = state.typedTrainingText;

    if (targetWord) {
      const largestLength = Math.max(targetWord.length, enteredText.length);
      for (let i = 0; i < largestLength; i++) {
        const targetLetter = targetWord[i];
        const enteredLetter = enteredText[i];
        if (targetLetter !== enteredLetter) return i;
      }
    }

    return undefined;
  }),
  storedTestTextData: [],
  previousTargetChord: computed((state) => {
    const trainingText = state.trainingText;
    const theTargetWordIsAtTheBeginningOfALine =
      state.currentSubindexInTrainingText == 0;
    if (theTargetWordIsAtTheBeginningOfALine) {
      const previousLine = trainingText?.[state.currentLineOfTrainingText - 1];
      return previousLine?.[previousLine.length - 1];
    }

    return trainingText?.[state.currentLineOfTrainingText]?.[
      state.currentSubindexInTrainingText - 1
    ];
  }),
  currentTrainingScenario: undefined,
  isDisplayingChordEditModal: false,
  chordsToPullFrom: {},
  isShowingPlusIcon: false,
  targetTextLineOne: computed((state) => {
    return state.trainingText[state.currentLineOfTrainingText];
  }),
  targetTextLineTwo: computed((state) => {
    return state.trainingText[state.currentLineOfTrainingText + 1];
  }),
};

export default trainingStoreState;
