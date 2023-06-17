import { action, actionOn, Actions, thunkOn } from 'easy-peasy';
import type { ChordLibraryRecord } from '../../data/chordLibrary';
import { generateChords } from '../../helpers/generateTrainingData';
import type { TrainingScenario } from '../../models/trainingScenario';
import {
  defaultTrainingSettings,
  defaultAlphabeticTestTraining,
  defaultTrigramsTestTraining,
  defaultTrainingSettingsState,
} from '../../models/trainingSettingsStateModel';
import {
  oldAsciiKeyReplacementDictionary,
  _keyMapDefaults,
} from '../../pages/manager/controls/maps';
import {
  ChordStatistics,
  createEmptyChordStatistics,
  createEmptyChordStatisticsFromDevice,
  MAXIMUM_ALLOWED_SPEED_FOR_CHORD_STATS,
  TrainingStatistics,
} from '../../models/trainingStatistics';
import type {
  TrainingStoreActionsModel,
  TrainingStoreModel,
  TrainingStoreStateModel,
} from '../../models/trainingStore';
import { getChordLibraryForTrainingScenario } from '../../pages/test/components/EditChordModal';
import type { WordTrainingValues } from 'src/models/wordTrainingValues';
import type { TrainingLevels } from 'src/models/trainingLevels';
import store from '../store';
import type { ChordStatisticsFromDevice } from 'src/models/trainingStatisticsFromDevice';
import { oneTimeCreateStoredChordStats } from '../../pages/test/components/TrainingModeSelector';
import { chordLibrary } from '../../data/chordLibrary';
import { avgCalculatorForTheSpeedOfLastTen } from '../../helpers/aggregation';

const CHORD_LINE_LENGTH = 30;
const ALPHABET_LINE_LENGTH = 24;

const dictNameOfLibrary = {
  ALPHABET: chordLibrary.letters,
  LEXICAL: chordLibrary.lexical,
  ENGLISH: chordLibrary.lexical,
  TRIGRAM: chordLibrary.trigrams,
  SUPERSONIC: chordLibrary.supersonic,
  LEXICOGRAPHIC: chordLibrary.lexicographic,
  LEXICALSENTENCES: chordLibrary.lexicalSentences,
  LEXICALSENTENCESDUOS: chordLibrary.lexicalSentencesDuos,
  LEXICALSENTENCESTRIOS: chordLibrary.lexicalSentencesTrios,
};

let globalDictionaries: Record<
  TrainingScenario,
  ChordLibraryRecord | undefined
> = {
  ALPHABET: undefined,
  CHORDING: undefined,
  LEXICAL: undefined,
  LEXICOGRAPHIC: undefined,
  SUPERSONIC: undefined,
  TRIGRAM: undefined,
  CUSTOMTIER: undefined,
  LEXICALSENTENCES: undefined,
  LEXICALSENTENCESDUOS: undefined,
  LEXICALSENTENCESTRIOS: undefined,
  ALLCHORDS: undefined,
};
export const getGlobalDictionaries = (): typeof globalDictionaries =>
  globalDictionaries;
export const setGlobalDictionaries = (
  dict: typeof globalDictionaries,
): void => {
  globalDictionaries = dict;
};

/**
 * Here are all of the actions that modify the state in the ./state folder.
 * Any change made to state here will automatically be reflected in any component that consumes this state.
 * The majority of the application logic exists here.
 */
const trainingStoreActions: TrainingStoreActionsModel = {
  setTrainingSettings: action((state, payload) => {
    state.trainingSettings = payload;
  }),
  setStoredChordsRepresentation: action((state, payload) => {
    state.storedChordsRepresentation = payload;
  }),
  setIsDisplayingStatisticsModal: action((state, payload) => {
    state.trainingSettings.isDisplayingStatisticsModal = payload;
  }),
  setIsDisplayingTestComplete: action((state, payload) => {
    state.trainingSettings.isTestDone = payload;
  }),
  setTextPromptUnFocused: action((state, payload) => {
    state.textPromptUnFocused = payload;
  }),
  setUserIsEditingPreviousWord: action((state, payload) => {
    state.userIsEditingPreviousWord = payload as unknown as boolean;
  }),
  clearTemporaryTrainingData: action((state) => {
    state.trainingStatistics = { statistics: [] };
    state.trainingText = [];
  }),
  setRestartTestMode: action((state, payload) => {
    state.restartTestMode = payload;
  }),
  setTrainingLevel: action((state, payload) => {
    state.trainingLevel = payload as TrainingLevels;
  }),
  setStoredChordsFromDevice: action((state) => {
    state.storedChordsFromDevice = JSON?.parse(
      localStorage?.getItem('chordsReadFromDevice'),
    );
  }),
  setStartTimer: action((state, payload) => {
    state.startTimer = payload as boolean;
  }),
  setTrainingTestCounter: action((state, payload) => {
    state.trainingTestCounter = payload;
  }),
  setModuleCompleteModalToggle: action((state, payload) => {
    state.moduleCompleteModalToggle = payload as boolean;
  }),
  setDownloadModulModalToggle: action((state, payload) => {
    state.downloadModulModalToggle = payload as boolean;
  }),
  setPasswordModulModalToggle: action((state, payload) => {
    state.passwordModulModalToggle = payload as boolean;
  }),
  setChmTierPasswordBypass: action((state, payload) => {
    localStorage.setItem('chmTierPasswordBypass', JSON.stringify(true));
    state.chmTierPasswordBypass = payload as boolean;
  }),
  setModuleNumber: action((state, payload) => {
    state.moduleNumber = payload as number;
  }),
  setIsDisplayingIntroductionModal: action((state, payload) => {
    state.isDisplayingIntroductionModal = payload as boolean;
  }),
  setTrainingIsDone: action((state, payload) => {
    state.trainingIsDone = payload as boolean;
  }),
  setTimerValue: action((state, payload) => {
    state.timerValue = payload;
  }),
  setLexicalSentencesIndex: action((state, payload) => {
    state.lexicalSentencesIndex = payload;
  }),

  /**
   * This must be run before you enter the training screen to ensure it is in the correct state for the corresponding scenario
   */
  beginTrainingMode: action((state, payload) => {
    savedStoredChordStats(state);
    resetTrainingStore(state as unknown as TrainingStoreStateModel);
    state.currentTrainingScenario = payload[0] as TrainingScenario;
    state.wordTestNumber = payload[1] as number;
    state.allTypedCharactersStore = [];
    state.compareText = [];
    state.isProgressBarDynamic = false;
    state.trainingTestCounter = 0;
    state.isTestDone = false;
    state.storedTestTextData = [];
    state.numberOfWordsChorded = 0;
    state.numberOfWordsTypedCorrectly = 0;
    state.trainingSessionErrors = 0;
    state.numberOfErrorsArrayForTestMode = [];
    state.startTimer = false;
    state.trainingIsDone = false;
    state.timeTakenToTypeEachWordInOrder = [];
    state.wordsPracticedInOrder = [];
    state.localTrainingStatistics = { statistics: [] };

    state.storedChordsFromDevice = JSON?.parse(
      localStorage?.getItem('chordsReadFromDevice'),
    );
    if (
      state.currentTrainingScenario !=
      ('ALLCHORDS' ||
        'LEXICOGRAPHIC' ||
        'LEXICALSENTENCES' ||
        'LEXICALSENTENCESDUOS' ||
        'LEXICALSENTENCESTRIOS')
    )
      oneTimeCreateStoredChordStats(
        state.currentTrainingScenario,
        state.trainingLevel,
        dictNameOfLibrary[state.currentTrainingScenario],
      );
    else if (
      state.currentTrainingScenario !=
      ('LEXICALSENTENCES' || 'LEXICALSENTENCESDUOS' || 'LEXICALSENTENCESTRIOS')
    )
      oneTimeCreateStoredChordStats(
        state.currentTrainingScenario,
        state.trainingLevel,
        dictNameOfLibrary[state.currentTrainingScenario],
      );
    //This data set is created in the TrainingModeSelector.tsx
    state.storedChordStatistics = JSON?.parse(
      localStorage?.getItem(state.trainingLevel + '_' + payload[0]),
    );

    //  console.log('Is this the current traing scenario ' + state.currentTrainingScenario);
    // Pull the chord library from memory if it's there, otherwise pull it from defaults
    if (state.currentTrainingScenario === 'ALLCHORDS') {
      //console.log('stored chord rep '+ state.storedChordsRepresentation)
      state.chordsToPullFrom = getChordLibraryForTrainingScenario(
        state.currentTrainingScenario,
        state.storedChordsRepresentation,
      ) as ChordLibraryRecord;
    } else if (
      typeof state.currentTrainingScenario === 'string' &&
      globalDictionaries[state.currentTrainingScenario] !== undefined
    ) {
      state.chordsToPullFrom = globalDictionaries[
        state.currentTrainingScenario
      ] as ChordLibraryRecord;
      console.log('stored chord rep ' + state.storedChordsRepresentation);
    } else {
      state.chordsToPullFrom = getChordLibraryForTrainingScenario(
        state.currentTrainingScenario,
      ) as ChordLibraryRecord;
    }

    state.trainingSettings = generateTrainingSettings(
      state as unknown as TrainingStoreStateModel,
    );
    if (state.currentTrainingScenario != 'ALLCHORDS')
      state.trainingStatistics = JSON.parse(
        localStorage.getItem(
          state.trainingLevel + '_' + state.currentTrainingScenario,
        ),
      );
    else state.trainingStatistics = state.storedChordsFromDevice;
    //state.lexicalSentencesIndex = generateLexicalSentenceIndex(
    //  state as unknown as TrainingStoreStateModel,
    //);
    if (
      state.currentTrainingScenario == 'LEXICAL' &&
      state.wordTestNumber != undefined &&
      state.restartTestMode == false
    ) {
      state.storedTestTextData = generateTestTrainingData(
        state.chordsToPullFrom,
        parseInt(state.wordTestNumber),
      );
    } else if (state.trainingLevel == 'StM' && state.restartTestMode == false) {
      state.storedTestTextData = Object.keys(
        state?.chordsToPullFrom[state?.lexicalSentencesIndex],
      );
    } else if (
      state.currentTrainingScenario == 'LEXICAL' &&
      state.wordTestNumber != undefined &&
      state.restartTestMode == true
    ) {
      const tempStoredState = state.storedTestTextData;
      state.storedTestTextData = tempStoredState;
    } else {
      state.storedTestTextData = [];
    }

    state.numberOfChordsForTrainingLevel =
      state?.trainingStatistics?.statistics?.length;
    generateStartingTrainingData(state as unknown as TrainingStoreStateModel);

    // Open the chord editing modal if the user is starting the fourth, fifth, or sixth training module
    if (
      payload[0] === 'LEXICOGRAPHIC' ||
      payload[0] === 'SUPERSONIC' ||
      payload[0] === 'CUSTOMTIER'
    )
      state.isDisplayingChordEditModal = true;
    else state.isDisplayingChordEditModal = false;
  }),
  proceedToNextWord: action((state) => {
    // TODO: Figure out the correct typing for these function calls so eslint and ts stop complaining
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    moveIndiciesOfTargetChord(state);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    calculateStatisticsForTargetChord(state);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resetTargetChordMetaInformation(state);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    updateRecursionRateSettings(state);

    console.log('THis is the storedLength' + state.storedTestTextData?.length);
    console.log(
      'THis is the storedLength allCharacters' +
        state.allTypedCharactersStore?.length,
    );

    if (
      state.storedTestTextData?.length == state.allTypedCharactersStore?.length
    ) {
      console.log('Yes training is done');
      state.trainingIsDone = true;
    }
  }),
  setErrorOccurredWhileAttemptingToTypeTargetChord: action((state, payload) => {
    state.errorOccurredWhileAttemptingToTypeTargetChord = payload;
  }),
  // Every time we advance to the next word, we check to see if we have "completed the level"
  // Which just means all the chords have been conquered
  // Which by extension means that all the chords we have typed have an average speed lower than
  // our configured speed goal.
  checkForAdvanceToNextTrainingLevel: actionOn(
    (actions) => actions.proceedToNextWord,
    (state) => {
      // Update the current level based on the formula (200 - speedGoal)
      // If the user is in "Auto" or "Goal Driven" mode, then the following properties are updated automatically on level change
      //    Speed goal is set to (1 - slowestChord.averageSpeed)
      //    Number of target chords is set to the number of existing chords whose average speed is greater than the new speed goal
      const speedThesholdToCompleteLevel = state.trainingSettings.speedGoal;
      const hasCompletedLevel =
        state.trainingStatistics.statistics.filter(
          (s) =>
            s.averageSpeed === 0 ||
            s.averageSpeed > speedThesholdToCompleteLevel,
        ).length === 0;
      const isSettingsSetToAuto =
        state.trainingSettings.autoOrCustom === 'AUTO';

      if (!hasCompletedLevel) state.isShowingPlusIcon = false;

      if (hasCompletedLevel) {
        // const targetChord = state.previousTargetChord;
        const targetChordStatistics = state.trainingStatistics.statistics.sort(
          (a, b) => b.averageSpeed - a.averageSpeed,
        )[0];

        if (targetChordStatistics) {
          const newSpeedGoal = Math.floor(
            targetChordStatistics?.averageSpeed - 1,
          );
          const newNumberOfTargetChords =
            state.trainingStatistics.statistics.filter(
              (s) => s.averageSpeed > newSpeedGoal,
            )?.length;

          const newLevel = Math.max(0, 200 - newSpeedGoal); // So that the level never goes negative
          if (newLevel <= state.currentLevel) return;

          state.currentLevel = newLevel;
          state.numberOfChordsForTrainingLevel = newNumberOfTargetChords;
          state.isShowingPlusIcon = true;

          if (isSettingsSetToAuto) {
            state.trainingSettings.speedGoal = newSpeedGoal;
            state.trainingSettings.targetChords = newNumberOfTargetChords;
          }
        } else {
          console.error(
            'Could not find the correct chord statistic to update the level.',
          );
        }
      } else if (isSettingsSetToAuto) {
        const newNumberOfTargetChords =
          state.trainingStatistics.statistics.filter(
            (s) => s.averageSpeed > state.trainingSettings.speedGoal,
          )?.length;

        state.trainingSettings.targetChords = newNumberOfTargetChords;
      }
    },
  ),
  setCurrentSubindexInTrainingText: action((store, payload) => {
    store.currentSubindexInTrainingText = payload;
  }),
  resetTrainingText: action((store) => {
    store.allTypedCharactersStore = [];
    store.trainingText = [];
    store.currentLineOfTrainingText = 0;
    store.currentSubindexInTrainingText = 0;
    generateNextLineOfInputdata(store as unknown as TrainingStoreStateModel);
    generateNextLineOfInputdata(store as unknown as TrainingStoreStateModel);
  }),
  setTypedTrainingText: action((state, payload) => {
    state.typedTrainingText = payload;
  }),
  setTestTeirHighestWPM: action((state, payload) => {
    state.testTeirHighestWPM = payload as number;
  }),
  // This needs to be a thunkOn so that we can dispatch multiple actions
  // when the target word matches the word the user has entered
  onChangeTypedTrainingText: thunkOn(
    (actions) => actions.setTypedTrainingText,
    (actions, _, { getState }) => {
      const storeState = getState();

      // Check for error
      const currentTrainingMode = storeState.currentTrainingScenario;
      const isInAlphabetMode = currentTrainingMode === 'ALPHABET';

      checkIfErrorExistsInUserEnteredText(
        storeState as unknown as TrainingStoreStateModel,
        isInAlphabetMode,
        actions,
      );

      checkIfShouldProceedToNextTargetChord(
        isInAlphabetMode,
        storeState as unknown as TrainingStoreStateModel,
        actions,
      );
    },
  ),
  toggleChordEditModal: action((state) => {
    state.isDisplayingChordEditModal = !state.isDisplayingChordEditModal;
  }),
  setAllTypedCharactersStore: action((state, payload) => {
    state.allTypedCharactersStore?.push(payload);
  }),
  setStoredTestTextData: action((state, payload) => {
    state.storedTestTextData = payload;
  }),
  updateChordsUsedForTraining: action((state, payload) => {
    state.timeOfLastChordStarted = performance.now();
    state.chordsToPullFrom = payload;
    state.trainingStatistics = generateEmptyChordStatistics(
      state.chordsToPullFrom,
      state.currentTrainingScenario,
    );
    state.trainingText = [];
    state.currentLineOfTrainingText = 0;
    state.currentSubindexInTrainingText = 0;
    const oldDisplay = {
      settings: state.trainingSettings.isDisplayingSettingsModal,
      stats: state.trainingSettings.isDisplayingStatisticsModal,
    };
    state.trainingSettings.isDisplayingStatisticsModal = oldDisplay.stats;
    state.trainingSettings.isDisplayingSettingsModal = oldDisplay.settings;
    state.timeTakenToTypePreviousChord = 0;
    state.numberOfChordsForTrainingLevel =
      state.trainingStatistics.statistics.length;
    generateStartingTrainingData(state as unknown as TrainingStoreStateModel);
  }),
  /**
   * Don't use this action unless you are testing.
   * The trainingText should be set automatically by other actions, rather than set directly here.
   */
  UNSAFE_setTrainingText: action((state, payload) => {
    state.trainingText = payload;
  }),
  setCompareText: action((state, payload) => {
    state.compareText = payload;
  }),
  toggleTestCompletePage: {
    type: 'action',
    payload: undefined,
    result: undefined,
  },

  setPopAllTypedCharactersStore: {
    type: 'action',
    payload: undefined,
    result: undefined,
  },
  setNumberOfWordsChorded: {
    type: 'action',
    payload: undefined,
    result: undefined,
  },
};

function checkIfShouldProceedToNextTargetChord(
  isInAlphabetMode: boolean,
  storeState: TrainingStoreStateModel,
  actions: Actions<TrainingStoreModel>,
) {
  const wordValue = document.getElementById('txt_Name')?.value;
  const wordToCompare = isInAlphabetMode
    ? storeState.targetWord
    : storeState.targetWord + ' ';
  const userHasEnteredChordCorrectly =
    wordToCompare === storeState.typedTrainingText;
  let isPhrase;
  //This logic here checks if the current word being tested is a phrase
  if (
    !isNaN(parseFloat(storeState?.targetWord?.indexOf(' '))) ||
    !isNaN(storeState?.targetCharacterIndex - 1)
  ) {
    isPhrase =
      storeState?.targetWord[storeState?.targetCharacterIndex - 1] === ' ' &&
      parseFloat(storeState?.targetWord?.indexOf(' ')) >= 0;

    storeState?.targetWord[storeState?.targetCharacterIndex - 1] === ' ';
  } else {
    isPhrase = false;
  }

  //storeState.targetWord[storeState.targetCharacterIndex]?.indexOf(' ') >= 0
  //Here we allow the user to go to the next work if they press space
  if (isInAlphabetMode && userHasEnteredChordCorrectly) {
    actions.setAllTypedCharactersStore(storeState.typedTrainingText);
    actions.proceedToNextWord();
    actions.setTypedTrainingText('');
  } else if (
    storeState.typedTrainingText.charAt(
      storeState.typedTrainingText.length - 1,
    ) == ' ' &&
    !isPhrase &&
    storeState.typedTrainingText.length > 0 &&
    wordValue[0] != ' ' &&
    wordValue[0] != undefined
  ) {
    console.log(
      'logging ' + storeState.compareText[storeState.compareText.length - 1],
    );

    actions.setAllTypedCharactersStore(storeState.typedTrainingText);
    actions.proceedToNextWord();
    actions.setTypedTrainingText('');
  }
}

function generateTrainingSettings(storeState: TrainingStoreStateModel) {
  if (storeState.currentTrainingScenario == 'ALPHABET') {
    return JSON.parse(JSON.stringify(defaultAlphabeticTestTraining));
  } else if (storeState.currentTrainingScenario == 'TRIGRAM') {
    return JSON.parse(JSON.stringify(defaultTrigramsTestTraining));
  } else if (storeState.currentTrainingScenario == 'ALLCHORDS') {
    return JSON.parse(JSON.stringify(defaultTrainingSettingsState));
  } else if (storeState.currentTrainingScenario == undefined) {
    return JSON.parse(JSON.stringify(defaultAlphabeticTestTraining));
  } else {
    return JSON.parse(JSON.stringify(defaultTrainingSettings));
  }
}

function checkIfErrorExistsInUserEnteredText(
  storeState: TrainingStoreStateModel,
  isInAlphabetMode: boolean,
  actions: Actions<TrainingStoreActionsModel>,
) {
  console.log(`"${storeState.targetWord}"`);
  if (!storeState.targetWord) return;

  if (isInAlphabetMode) {
    const isError = !String(storeState.targetWord)?.startsWith(
      storeState.typedTrainingText,
    );
    if (isError) actions.setErrorOccurredWhileAttemptingToTypeTargetChord(true);
  } else if (storeState.typedTrainingText.includes(' ')) {
    const isError = !String(storeState.targetWord + ' ')?.startsWith(
      storeState.typedTrainingText,
    );
    if (isError) actions.setErrorOccurredWhileAttemptingToTypeTargetChord(true);
  }
}

function resetTrainingStore(state: TrainingStoreStateModel) {
  state.currentLineOfTrainingText = 0;
  state.currentSubindexInTrainingText = 0;
  state.timeOfLastChordStarted = performance.now();
  state.timeTakenToTypePreviousChord = 0;
  state.timeAtTrainingStart = performance.now();
  state.trainingSettings = generateTrainingSettings(state);
  state.typedTrainingText = '';
  state.currentLevel = 0;
  state.isTestDone = false;
  state.errorOccurredWhileAttemptingToTypeTargetChord = false;
  state.isShowingPlusIcon = false;
  state.numberOfWordsTypedCorrectly = 0;
  state.numberOfErrorsArrayForTestMode = [];
}

function resetTargetChordMetaInformation(state: TrainingStoreModel) {
  state.errorOccurredWhileAttemptingToTypeTargetChord = false;
  state.timeOfLastChordStarted = performance.now();
}

export async function calculateStatisticsForTargetChord(
  store: TrainingStoreModel,
): Promise<void> {
  const id = store.targetWord as unknown as string;
  if (!id) {
    return;
  }

  //store.trainingTestCounter = store.trainingTestCounter +1;

  //Here is where I need to find the chord in the live chords stats array and pull the storedChordStats
  const emptyChordStats = createEmptyChordStatistics(id);
  // eslint-disable-next-line no-var
  let chordStats = store.trainingStatistics.statistics.find(
    (c: ChordStatistics) => c.id === id,
  ) as ChordStatistics;

  let localChordStats = store.localTrainingStatistics.statistics.find(
    (c: ChordStatistics) => c.id === id,
  ) as ChordStatistics;
  const couldFindChordInLibrary = !!chordStats;
  if (!couldFindChordInLibrary) chordStats = emptyChordStats;

  const couldFindChordInLocalLibrary = !!localChordStats;
  if (!couldFindChordInLocalLibrary) localChordStats = emptyChordStats;

  // Don't penalize the user if this is the first character they type
  // It can take time for them to get their hands on the keyboard, adjust their settings, etc.
  // So if this is their very first chord, we give them a very short time for it
  const userIsTypingFirstChord =
    store.currentLineOfTrainingText === 0 &&
    store.currentSubindexInTrainingText === 1; // We use 1 here because this value has already been incremented by the time chord statistics are calculated.
  // if (userIsTypingFirstChord) timeTakenToTypeChord = 1;

  //This if state increments the error stat if a user types a word inccorectly
  //But if the user got a word wrong and went back to correct and the correction was incorrect we do not add another error to the stat

  let timeTakenToTypeChord =
    (performance.now() - store.timeOfLastChordStarted) / 10;
  let numberOfOccurences = 0;

  // Don't penalize the user if this is the first character they type
  // It can take time for them to get their hands on the keyboard, adjust their settings, etc.
  // So if this is their very first chord, we give them a very short time for it

  // Never let the last speed go above 500 milliseconds so the user's times dont get ruined if the walk away from their desk

  //This logic handles local Chord stats merge
  localChordStats.lastSpeed = Math.min(
    timeTakenToTypeChord,
    MAXIMUM_ALLOWED_SPEED_FOR_CHORD_STATS,
  );

  if (!userIsTypingFirstChord) {
    if (
      store.errorOccurredWhileAttemptingToTypeTargetChord &&
      !store.userIsEditingPreviousWord &&
      !userIsTypingFirstChord
    ) {
      chordStats.numberOfErrors++;
      store.trainingSessionErrors = store.trainingSessionErrors + 1;
      store.trainingTestCounter = store.trainingTestCounter + 1;
      store.numberOfErrorsArrayForTestMode.push(1);
    } else if (
      store.errorOccurredWhileAttemptingToTypeTargetChord &&
      store.userIsEditingPreviousWord &&
      !userIsTypingFirstChord
    ) {
      store.numberOfErrorsArrayForTestMode.pop();
      store.numberOfErrorsArrayForTestMode.push(1);
    } else if (
      !store.errorOccurredWhileAttemptingToTypeTargetChord &&
      store.userIsEditingPreviousWord &&
      !userIsTypingFirstChord
    ) {
      store.numberOfErrorsArrayForTestMode.pop();
      store.trainingSessionErrors = store.trainingSessionErrors - 1;
      store.numberOfErrorsArrayForTestMode.push(0);
    } else {
      store.numberOfErrorsArrayForTestMode.push(0);
    }
  }

  const numberOfChordsConquered = store.trainingStatistics.statistics.filter(
    (s) =>
      s.averageSpeed > store.trainingSettings.speedGoal &&
      s.numberOfOccurrences >= 10,
  ).length;

  //This piece of the code triggers the Call to show the modal if the user completes that module.
  if (
    numberOfChordsConquered > store.trainingStatistics.statistics.length - 1 &&
    store.wasModuleShown == false
  ) {
    store.moduleCompleteModalToggle = true as boolean;
    store.wasModuleShown = true as boolean;
  }

  //This conditional takes the stored session value timeThat that is set in both ChordTextInput.tsx files. That
  // set value contains the time that the user first typed. We take that value and the value of went the word was complete to determine
  // The value for the first word

  const regulatedTimeToChord = Math.min(
    timeTakenToTypeChord,
    MAXIMUM_ALLOWED_SPEED_FOR_CHORD_STATS,
  );

  !userIsTypingFirstChord
    ? (store.trainingSessionAggregatedTime =
        store.trainingSessionAggregatedTime + regulatedTimeToChord)
    : '';

  if (userIsTypingFirstChord) {
    timeTakenToTypeChord = 0;
    numberOfOccurences = -1;
    store.startTimer = true;
  }
  if (!userIsTypingFirstChord && !store.userIsEditingPreviousWord) {
    store.wordsPracticedInOrder.push(id);
  }

  if (!userIsTypingFirstChord && !store.userIsEditingPreviousWord) {
    store.timeTakenToTypeEachWordInOrder.push(regulatedTimeToChord);
    store.timeTakenToTypePreviousChord = localChordStats?.lastSpeed;

    if (localChordStats.speedOfLastTen.length == 10) {
      localChordStats.speedOfLastTen.push(localChordStats.lastSpeed);
      localChordStats.speedOfLastTen.shift();
    } else {
      localChordStats.speedOfLastTen.push(localChordStats.lastSpeed);
    }

    localChordStats.averageSpeed = avgCalculatorForTheSpeedOfLastTen(
      chordStats.speedOfLastTen,
    );

    if (couldFindChordInLocalLibrary) {
      // Replace chord stats object in chord stats list
      store.localTrainingStatistics = {
        statistics: store.localTrainingStatistics.statistics.map(
          (e: ChordStatistics) => (e.id === chordStats.id ? chordStats : e),
        ),
      };
    } else {
      store.localTrainingStatistics.statistics.push(chordStats);
    }
  }

  // Never let the last speed go above 500 milliseconds so the user's times dont get ruined if the walk away from their desk
  if (
    store.currentTrainingScenario != 'ALLCHORDS' &&
    !userIsTypingFirstChord &&
    store.trainingLevel != 'StM'
  ) {
    chordStats.lastSpeed = Math.min(
      timeTakenToTypeChord,
      MAXIMUM_ALLOWED_SPEED_FOR_CHORD_STATS,
    );
    store.timeTakenToTypePreviousChord = chordStats?.lastSpeed;

    if (chordStats.speedOfLastTen.length == 10) {
      chordStats.speedOfLastTen.push(chordStats.lastSpeed);
      chordStats.speedOfLastTen.shift();
    } else {
      chordStats.speedOfLastTen.push(chordStats.lastSpeed);
    }

    //Need to aggregate the speeds in speedOfLastTen array and divide by the number if speeds in that array to derrive the avg speed
    chordStats.averageSpeed = avgCalculatorForTheSpeedOfLastTen(
      chordStats.speedOfLastTen,
    );

    if (userIsTypingFirstChord) {
      if (chordStats.numberOfOccurrences != 0)
        chordStats.numberOfOccurrences = chordStats.numberOfOccurrences - 1;
      else chordStats.numberOfOccurrences = chordStats.numberOfOccurrences = 0;
    } else {
      chordStats.numberOfOccurrences =
        chordStats.numberOfOccurrences + numberOfOccurences;
      store.userIsEditingPreviousWord === false
        ? chordStats.numberOfOccurrences++
        : '';
    }
    if (
      store.currentTrainingScenario != 'ALPHABET' &&
      store.userIsEditingPreviousWord &&
      store.storedTestTextData[store?.allTypedCharactersStore.length - 1] ==
        store?.allTypedCharactersStore[
          store?.allTypedCharactersStore?.length - 1
        ]?.slice(0, -1)
    ) {
      // Also need to add a check to see if the word is correct
      chordStats.numberOfErrors = chordStats.numberOfErrors - 1;
      store.trainingTestCounter = store.trainingTestCounter - 1;
    } else if (
      store.currentTrainingScenario == 'ALPHABET' &&
      store.userIsEditingPreviousWord &&
      store.storedTestTextData[store?.allTypedCharactersStore.length - 1] ==
        store?.allTypedCharactersStore[
          store?.allTypedCharactersStore?.length - 1
        ]
    ) {
      // Also need to add a check to see if the word is correct

      chordStats.numberOfErrors = chordStats.numberOfErrors - 1;
      store.trainingTestCounter = store.trainingTestCounter - 1;
    }

    if (couldFindChordInLibrary) {
      // Replace chord stats object in chord stats list
      store.trainingStatistics = {
        statistics: store.trainingStatistics.statistics.map(
          (e: ChordStatistics) => (e.id === chordStats.id ? chordStats : e),
        ),
      };
    } else {
      store.trainingStatistics.statistics.push(chordStats);
    }

    if (store.wordTestNumber == undefined)
      // this is to prevent stats from storing during the testing module
      localStorage.setItem(
        store.trainingLevel + '_' + store.currentTrainingScenario,
        JSON.stringify({ statistics: store.trainingStatistics.statistics }),
      ); //Store downloaded chords in local storage
  } else if (!userIsTypingFirstChord && store.trainingLevel != 'StM') {
    const chordStatsFromDevice = store?.storedChordsFromDevice?.statistics.find(
      (c: ChordStatisticsFromDevice) => c.id === id,
    ) as ChordStatisticsFromDevice;

    if (
      store.currentTrainingScenario != 'ALPHABET' &&
      store.userIsEditingPreviousWord &&
      store.storedTestTextData[store?.allTypedCharactersStore.length - 1] ==
        store?.allTypedCharactersStore[
          store?.allTypedCharactersStore?.length - 1
        ]?.slice(0, -1)
    ) {
      // Also need to add a check to see if the word is correct
      chordStatsFromDevice.numberOfErrors =
        chordStatsFromDevice.numberOfErrors - 1;
    }

    if (
      store.currentTrainingScenario == 'ALLCHORDS' &&
      !userIsTypingFirstChord
    ) {
      if (
        store.errorOccurredWhileAttemptingToTypeTargetChord &&
        !store.userIsEditingPreviousWord
      ) {
        chordStatsFromDevice.numberOfErrors++;
      }

      chordStatsFromDevice.lastSpeed = Math.min(
        timeTakenToTypeChord,
        MAXIMUM_ALLOWED_SPEED_FOR_CHORD_STATS,
      );

      chordStatsFromDevice.averageSpeed =
        (chordStatsFromDevice.averageSpeed *
          chordStatsFromDevice.numberOfOccurrences +
          chordStatsFromDevice.lastSpeed) /
        (chordStatsFromDevice.numberOfOccurrences + 1);

      if (userIsTypingFirstChord) {
        if (chordStatsFromDevice.numberOfOccurrences != 0) {
          chordStatsFromDevice.numberOfOccurrences =
            chordStatsFromDevice.numberOfOccurrences - 1;
          chordStatsFromDevice.numberOfErrors =
            chordStatsFromDevice.numberOfErrors - 1;
        } else {
          chordStatsFromDevice.numberOfOccurrences =
            chordStatsFromDevice.numberOfOccurrences = 0;
          chordStatsFromDevice.numberOfErrors =
            chordStatsFromDevice.numberOfErrors = 0;
        }
      } else {
        chordStatsFromDevice.numberOfOccurrences =
          chordStatsFromDevice.numberOfOccurrences + numberOfOccurences;
        store.userIsEditingPreviousWord === false
          ? chordStatsFromDevice.numberOfOccurrences++
          : '';
      }

      if (chordStatsFromDevice.chordsMastered?.length == 10) {
        chordStatsFromDevice.chordsMastered?.push(
          chordStatsFromDevice.averageSpeed,
        );
        chordStatsFromDevice.chordsMastered?.shift();
      } else {
        chordStatsFromDevice.chordsMastered?.push(
          chordStatsFromDevice.averageSpeed,
        );
      }

      const sum = chordStatsFromDevice?.chordsMastered?.reduce(
        (a, b) => a + b,
        0,
      );
      chordStatsFromDevice.averageSpeed =
        sum / chordStatsFromDevice.chordsMastered?.length || 0;

      store.trainingStatistics = {
        statistics: store.trainingStatistics.statistics.map(
          (e: ChordStatistics) => (e.id === chordStats.id ? chordStats : e),
        ),
      };

      store.storedChordsFromDevice = {
        statistics: store.storedChordsFromDevice.statistics.map(
          (e: ChordStatisticsFromDevice) =>
            e.id === chordStatsFromDevice.id &&
            e.chord === chordStatsFromDevice.chord
              ? chordStatsFromDevice
              : e,
        ),
      };
      const value = store.storedChordsFromDevice;
      window.addEventListener(
        'beforeunload',
        function () {
          // number of miliseconds to hold before unloading page
          const x = 500;
          const a = new Date().getTime() + x;

          localStorage.setItem('chordsReadFromDevice', JSON.stringify(value)); //Store downloaded chords in local storage

          // browser will hold with unloading your page for X miliseconds, letting
          // your localStorage call to finish
          while (new Date().getTime() < a) {
            //Not an Empty block statement en-list
          }
        },
        false,
      );
    }
  } else {
    chordStats.averageSpeed =
      (chordStats.averageSpeed * chordStats.numberOfOccurrences +
        chordStats.lastSpeed) /
      (chordStats.numberOfOccurrences + 1);
    chordStats.numberOfOccurrences++;

    if (couldFindChordInLibrary) {
      // Replace chord stats object in chord stats list
      store.trainingStatistics = {
        statistics: store.trainingStatistics.statistics.map(
          (e: ChordStatistics) => (e.id === chordStats.id ? chordStats : e),
        ),
      };
    } else {
      store.trainingStatistics.statistics.push(chordStats);
    }
  }
  if (!userIsTypingFirstChord) {
    if (
      store.storedTestTextData[store?.allTypedCharactersStore.length - 1] ==
        store?.allTypedCharactersStore[
          store?.allTypedCharactersStore?.length - 1
        ]?.slice(0, -1) &&
      store.currentTrainingScenario != 'ALPHABET'
    ) {
      store.numberOfWordsTypedCorrectly = store.numberOfWordsTypedCorrectly + 1;
      //Need to add an errors calculator here
    } else if (
      store.storedTestTextData[store?.allTypedCharactersStore.length - 1] ==
        store?.allTypedCharactersStore[
          store?.allTypedCharactersStore?.length - 1
        ] &&
      store.currentTrainingScenario == 'ALPHABET'
    ) {
      store.numberOfWordsTypedCorrectly = store.numberOfWordsTypedCorrectly + 1;
    }
  }

  store.userIsEditingPreviousWord = false;
}
export function savedStoredChordStats(state: TrainingStoreModel) {
  if (state.currentTrainingScenario == 'ALLCHORDS')
    localStorage.setItem(
      'chordsReadFromDevice',
      JSON.stringify(state.storedChordsFromDevice),
    ); //Store downloaded chords in local storage
}

function moveIndiciesOfTargetChord(state: TrainingStoreModel): void {
  const isReadyToAdvanceToNextLineOfTrainingText =
    state.currentSubindexInTrainingText + 1 >=
    state.trainingText[state.currentLineOfTrainingText].length;
  if (isReadyToAdvanceToNextLineOfTrainingText) {
    state.currentLineOfTrainingText += 1;
    state.currentSubindexInTrainingText = 0;
    generateNextLineOfInputdata(state);
  } else {
    state.currentSubindexInTrainingText += 1;
  }
}

function generateEmptyChordStatistics(
  library: ChordLibraryRecord,
  scenario?: TrainingScenario,
): TrainingStatistics {
  return {
    statistics: Object.keys(library).map((key) => {
      if (scenario == 'ALLCHORDS')
        return createEmptyChordStatisticsFromDevice(key, scenario, [], []);
      else return createEmptyChordStatistics(key, scenario);
    }),
  };
}

const getRandomElementFromArray = <T>(list: T[]): T =>
  list[Math.floor(Math.random() * list.length)];

function generateTestTrainingData(
  library: ChordLibraryRecord,
  wordTestNumber?: number | undefined,
) {
  const fullTestData = [];
  const chordLibraryToUse = Object.keys(library);
  for (let i = 0; i < wordTestNumber; i++) {
    fullTestData.push(getRandomElementFromArray(chordLibraryToUse));
  }
  return fullTestData;
}

function generateNextLineOfInputdata(state: TrainingStoreStateModel) {
  const lineLength =
    state.currentTrainingScenario === 'ALPHABET'
      ? ALPHABET_LINE_LENGTH
      : CHORD_LINE_LENGTH;
  state.trainingText = [
    ...state.trainingText,
    generateChords({
      chordsToChooseFrom: state.chordsToPullFrom,
      numberOfTargetChords: state.trainingSettings.targetChords,
      recursionIsEnabledGlobally: state.trainingSettings.isUsingRecursion,
      recursionRate: state.trainingSettings.recursionRate,
      stats: state?.trainingStatistics?.statistics,
      lineLength,
      speedGoal: state.trainingSettings.speedGoal,
      wordTestNumberValue: state.wordTestNumber,
      scenario: state.currentTrainingScenario,
      storedTestData: state.storedTestTextData,
      storedChordsFromDevice: state.storedChordsFromDevice?.statistics,
      lexicalSentenceToChoose: state.lexicalSentencesIndex,
      indexOfTrainingText: state.allTypedCharactersStore.length,
      allTypedText: state.allTypedCharactersStore,
      subIndexOfTrainingText: state.currentSubindexInTrainingText,
      trainingLevel: state.trainingLevel,
      moduleNumber: state.moduleNumber,
    }),
  ];
}

function updateRecursionRateSettings(state: TrainingStoreModel) {
  const chordsWithSpeedHigherThanSpeedGoal =
    state.trainingStatistics.statistics.filter(
      (s) => s.averageSpeed > state.trainingSettings.speedGoal,
    );
  const numberOfChordsAboveSpeedGoal =
    chordsWithSpeedHigherThanSpeedGoal.length;
  let recursionRate = 95;

  const currentTrainingScenario = state.currentTrainingScenario;

  if (state.trainingSettings.autoOrCustom === 'AUTO') {
    if (currentTrainingScenario === 'ALPHABET') {
      if (numberOfChordsAboveSpeedGoal <= 2)
        recursionRate = numberOfChordsAboveSpeedGoal * 35;
      if (numberOfChordsAboveSpeedGoal == 0) recursionRate = 0;
    } else if (
      currentTrainingScenario === 'CHORDING' ||
      currentTrainingScenario === 'LEXICAL' ||
      currentTrainingScenario === 'TRIGRAM'
    ) {
      if (numberOfChordsAboveSpeedGoal <= 10)
        recursionRate = numberOfChordsAboveSpeedGoal * 8 + 12;
      if (numberOfChordsAboveSpeedGoal == 0) recursionRate = 0;
    }

    state.trainingSettings.recursionRate = recursionRate;
  }
}
const generateLexicalSentenceIndex = (state: TrainingStoreStateModel) => {
  const allCharacters = Object.keys(state.chordsToPullFrom);
  const returnRandom =
    allCharacters[(allCharacters.length * Math.random()) | 0];
  return returnRandom;
};

const generateStartingTrainingData = (state: TrainingStoreStateModel) => {
  const lineLength =
    state.currentTrainingScenario === 'ALPHABET'
      ? ALPHABET_LINE_LENGTH
      : CHORD_LINE_LENGTH;

  const generateOneLineOfChords = () =>
    generateChords({
      chordsToChooseFrom: state.chordsToPullFrom,
      numberOfTargetChords: state.trainingSettings.targetChords,
      recursionIsEnabledGlobally: state.trainingSettings.isUsingRecursion,
      recursionRate: state.trainingSettings.recursionRate,
      stats: state?.trainingStatistics?.statistics,
      lineLength,
      speedGoal: state.trainingSettings.speedGoal,
      wordTestNumberValue: state.wordTestNumber,
      scenario: state.currentTrainingScenario,
      storedTestData: state.storedTestTextData,
      storedChordsFromDevice: state.storedChordsFromDevice?.statistics,
      lexicalSentenceToChoose: state.lexicalSentencesIndex,
      indexOfTrainingText: state.allTypedCharactersStore.length,
      allTypedText: state.allTypedCharactersStore,
      subIndexOfTrainingText: state.currentSubindexInTrainingText,
      trainingLevel: state.trainingLevel,
      moduleNumber: state.moduleNumber,
    });
  state.trainingText = [generateOneLineOfChords(), generateOneLineOfChords()];
  document.getElementById('txt_Name')?.focus();
};

export default trainingStoreActions;
