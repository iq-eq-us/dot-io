import { action, actionOn, Actions, thunkOn } from 'easy-peasy';
import { chordLibrary, ChordLibraryRecord } from '../../data/chordLibrary';
import { generateChords } from '../../helpers/generateTrainingData';
import { defaultTrainingSettings } from '../../models/trainingSettingsStateModel';
import {
  ChordStatistics,
  createEmptyChordStatistics,
  MAXIMUM_ALLOWED_SPEED_FOR_CHORD_STATS,
  TrainingStatistics,
} from '../../models/trainingStatistics';
import type {
  TrainingStoreActionsModel,
  TrainingStoreModel,
  TrainingStoreStateModel,
} from '../../models/trainingStore';
import { getChordLibraryForTrainingScenario } from '../../pages/training/components/trainingProgressContainer';

const CHORD_LINE_LENGTH = 30;
const ALPHABET_LINE_LENGTH = 24;

const trainingStoreActions: TrainingStoreActionsModel = {
  setTrainingSettings: action((state, payload) => {
    state.trainingSettings = payload;
  }),
  setIsDisplayingStatisticsModal: action((state, payload) => {
    state.trainingSettings.isDisplayingStatisticsModal = payload;
  }),
  UNSAFE_setTrainingText: action((state, payload) => {
    state.trainingText = payload;
  }),
  beginTrainingLexicalMode: action((state) => {
    resetTrainingStore(state as unknown as TrainingStoreStateModel);
    state.trainingStatistics = generateEmptyChordStatistics(
      chordLibrary.lexical,
    );
    state.currentTrainingScenario = 'LEXICAL';
    state.chordsToPullFrom = getChordLibraryForTrainingScenario(
      state.currentTrainingScenario,
    ) as ChordLibraryRecord;
    generateStartingTrainingData(state as unknown as TrainingStoreStateModel);
  }),
  beginTrainingAlphabetMode: action((state) => {
    resetTrainingStore(state as unknown as TrainingStoreStateModel);
    state.trainingStatistics = generateEmptyChordStatistics(
      chordLibrary.letters,
    );
    state.currentTrainingScenario = 'ALPHABET';
    state.chordsToPullFrom = getChordLibraryForTrainingScenario(
      state.currentTrainingScenario,
    ) as ChordLibraryRecord;
    generateStartingTrainingData(state as unknown as TrainingStoreStateModel);
  }),
  beginTrainingTrigramMode: action((state) => {
    resetTrainingStore(state as unknown as TrainingStoreStateModel);
    state.trainingStatistics = generateEmptyChordStatistics(
      chordLibrary.trigrams,
    );
    state.currentTrainingScenario = 'TRIGRAM';
    state.chordsToPullFrom = getChordLibraryForTrainingScenario(
      state.currentTrainingScenario,
    ) as ChordLibraryRecord;
    generateStartingTrainingData(state as unknown as TrainingStoreStateModel);
  }),
  beginTrainingChordMode: action((state) => {
    resetTrainingStore(state as unknown as TrainingStoreStateModel);
    state.trainingStatistics = generateEmptyChordStatistics(
      chordLibrary.chords,
    );
    state.currentTrainingScenario = 'CHORDING';
    state.chordsToPullFrom = getChordLibraryForTrainingScenario(
      state.currentTrainingScenario,
    ) as ChordLibraryRecord;
    generateStartingTrainingData(state as unknown as TrainingStoreStateModel);
  }),
  proceedToNextWord: action((state) => {
    // TODO: Figure out the correct typing for these function calls so eslint and ts stop complaining
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    moveIndiciesOfTargetChord(state);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    calculateStatisticsForTargetChord(state);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resetTargetChordMetaInformation(state);
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    updateRecursionRateSettings(state);
  }),
  setErrorOccurredWhileAttemptingToTypeTargetChord: action((state, payload) => {
    state.errorOccurredWhileAttemptingToTypeTargetChord = payload;
  }),
  // Every time we advance to the next word, we check to see if we have "complete the level"
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

      if (hasCompletedLevel) state.isShowingPlusIcon = true;
      else state.isShowingPlusIcon = false;

      if (hasCompletedLevel && isSettingsSetToAuto) {
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

          state.trainingSettings.speedGoal = newSpeedGoal;
          state.trainingSettings.targetChords = newNumberOfTargetChords;
          state.currentLevel = Math.max(0, 200 - newSpeedGoal); // So that the level never goes negative
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
  resetTrainingText: action((store) => {
    store.trainingText = [];
    store.currentLineOfTrainingText = 0;
    store.currentSubindexInTrainingText = 0;
    generateNextLineOfInputdata(store as unknown as TrainingStoreStateModel);
    generateNextLineOfInputdata(store as unknown as TrainingStoreStateModel);
  }),
  setTypedTrainingText: action((state, payload) => {
    state.typedTrainingText = payload;
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
  updateChordsUsedForTraining: action((state, payload) => {
    // Need to regenerate the chord statistics on the right side of the screen
    // Need to generate two new lines of text for the input prompt
    // Need to clear out the old trainingText from the training store.
    // Need to update the level progress, letters conquered, and to next level fields.
    // Need to reset the settings on the bottom left if set to auto (should be done automatically)
    // Need to clear out the text input on the main training page.
    state.timeOfLastChordStarted = performance.now();
    state.chordsToPullFrom = payload;
    state.trainingStatistics = generateEmptyChordStatistics(
      state.chordsToPullFrom,
    );
    state.trainingText = [];
    state.currentLineOfTrainingText = 0;
    state.currentSubindexInTrainingText = 0;
    state.trainingSettings = JSON.parse(
      JSON.stringify(defaultTrainingSettings),
    );
    state.timeTakenToTypePreviousChord = 0;
    generateStartingTrainingData(state as unknown as TrainingStoreStateModel);
  }),
};

function checkIfShouldProceedToNextTargetChord(
  isInAlphabetMode: boolean,
  storeState: TrainingStoreStateModel,
  actions: Actions<TrainingStoreModel>,
) {
  const wordToCompare = isInAlphabetMode
    ? storeState.targetWord
    : storeState.targetWord + ' ';
  const userHasEnteredChordCorrectly =
    wordToCompare === storeState.typedTrainingText;
  if (userHasEnteredChordCorrectly) {
    actions.proceedToNextWord();
    actions.setTypedTrainingText('');
  }
}

function checkIfErrorExistsInUserEnteredText(
  storeState: TrainingStoreStateModel,
  isInAlphabetMode: boolean,
  actions: Actions<TrainingStoreActionsModel>,
) {
  const isErrorInUserEnteredText = storeState.targetWord
    ? !(
        isInAlphabetMode
          ? storeState.targetWord + '' // The superfluos addition of an empty string is here to silence the type warnings about Computed properties in the store
          : storeState.targetWord + ' '
      )?.startsWith(storeState.typedTrainingText) || false
    : false;
  if (isErrorInUserEnteredText)
    actions.setErrorOccurredWhileAttemptingToTypeTargetChord(true);
}

function resetTrainingStore(state: TrainingStoreStateModel) {
  state.currentLineOfTrainingText = 0;
  state.currentSubindexInTrainingText = 0;
  state.timeOfLastChordStarted = performance.now();
  state.timeTakenToTypePreviousChord = 0;
  state.timeAtTrainingStart = performance.now();
  state.trainingSettings = JSON.parse(JSON.stringify(defaultTrainingSettings));
}

function resetTargetChordMetaInformation(state: TrainingStoreModel) {
  state.errorOccurredWhileAttemptingToTypeTargetChord = false;
  state.timeOfLastChordStarted = performance.now();
}

function calculateStatisticsForTargetChord(store: TrainingStoreModel): void {
  const id = store.targetWord as unknown as string;
  if (!id) {
    console.error('Could not find chord by id: ' + id);
    return;
  }

  const emptyChordStats = createEmptyChordStatistics(id);
  // eslint-disable-next-line no-var
  let chordStats = store.trainingStatistics.statistics.find(
    (c: ChordStatistics) => c.id === id,
  ) as ChordStatistics;
  const couldFindChordInLibrary = !!chordStats;
  if (!couldFindChordInLibrary) chordStats = emptyChordStats;

  if (store.errorOccurredWhileAttemptingToTypeTargetChord)
    chordStats.numberOfErrors++;

  const timeTakenToTypeChord =
    (performance.now() - store.timeOfLastChordStarted) / 10;
  // Never let the last speed go above 500 milliseconds so the user's times dont get ruined if the walk away from their desk
  chordStats.lastSpeed = Math.min(
    timeTakenToTypeChord,
    MAXIMUM_ALLOWED_SPEED_FOR_CHORD_STATS,
  );
  store.timeTakenToTypePreviousChord = chordStats?.lastSpeed;
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
): TrainingStatistics {
  return {
    statistics: Object.keys(library).map((key) => {
      return createEmptyChordStatistics(key);
    }),
  };
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
      stats: state.trainingStatistics.statistics,
      lineLength,
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
      stats: state.trainingStatistics.statistics,
      lineLength,
    });

  state.trainingText = [generateOneLineOfChords(), generateOneLineOfChords()];
};

export default trainingStoreActions;
