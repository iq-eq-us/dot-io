import { action, actionOn, computed } from 'easy-peasy';
import {
  generateCharacterTrainingDataWithRecursionRate,
  generateChordTrainingDataWithRecursionRate,
  generateTrigramTrainingData,
} from '../helpers/generateTrainingData';
import { defaultTrainingSettings } from '../models/trainingSettingsStateModel';
import { ConvertStringToKeyHighlightPositions } from '../helpers/convertStringToKeyHighlightPositions';
import type { TrainingStoreModel } from '../models/trainingStore';
import {
  ChordStatistics,
  createEmptyChordStatistics,
  MAXIMUM_ALLOWED_SPEED_FOR_CHORD_STATS,
  TrainingStatistics,
} from '../models/trainingStatistics';
import { ChordLibrary, chordLibrary } from '../data/chordLibrary';
import { getCurrentTrainingScenario } from '../pages/training/useCurrentTrainingScenario';

const CHORD_LINE_LENGTH = 24;
export const DEFAULT_SPEED_GOAL = 200;

const TrainingStore: TrainingStoreModel = {
  // * State
  trainingText: [],
  currentLineOfTrainingText: 0,
  currentSubindexInTrainingText: 0,
  trainingSettings: JSON.parse(JSON.stringify(defaultTrainingSettings)),
  errorOccurredWhileAttemptingToTypeTargetChord: false,
  timeOfLastChordStarted: 0,
  timeTakenToTypePreviousChord: 0,
  trainingStatistics: {
    statistics: [],
  },
  currentLevel: 0,
  timeAtTrainingStart: 0,
  // * Computed State
  currentlyHighlightedKeys: computed((state) => {
    const targetWord = state.targetWord;
    return ConvertStringToKeyHighlightPositions(targetWord || '');
  }),
  targetWord: computed((state) => {
    const trainingText = state.trainingText;
    const targetWord =
      trainingText?.[state.currentLineOfTrainingText]?.[
        state.currentSubindexInTrainingText
      ];

    return targetWord;
  }),
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
  // * Actions
  setTrainingSettings: action((state, payload) => {
    state.trainingSettings = payload;
  }),
  beginTrainingLexicalMode: action((state) => {
    resetTrainingStore(state as any);
    state.trainingText = [];
    state.trainingStatistics = { statistics: [] };
  }),
  beginTrainingAlphabetMode: action((state) => {
    resetTrainingStore(state as any);
    state.trainingText = [
      generateCharacterTrainingDataWithRecursionRate(
        state.trainingStatistics.statistics,
        state.trainingSettings.recursionRate,
        CHORD_LINE_LENGTH,
        state.trainingSettings.targetChords,
        state.trainingSettings.isUsingRecursion,
      ),
      generateCharacterTrainingDataWithRecursionRate(
        state.trainingStatistics.statistics,
        state.trainingSettings.recursionRate,
        CHORD_LINE_LENGTH,
        state.trainingSettings.targetChords,
        state.trainingSettings.isUsingRecursion,
      ),
    ];
    state.trainingStatistics = generateEmptyChordStatistics('letters');
  }),
  beginTrainingTrigramMode: action((state) => {
    resetTrainingStore(state as any);
    state.trainingText = generateTrigramTrainingData();
  }),
  beginTrainingChordMode: action((state) => {
    resetTrainingStore(state as any);
    state.trainingText = [
      generateChordTrainingDataWithRecursionRate(
        state.trainingStatistics.statistics,
        state.trainingSettings.recursionRate,
        CHORD_LINE_LENGTH,
        state.trainingSettings.targetChords,
        state.trainingSettings.isUsingRecursion,
      ),
      generateChordTrainingDataWithRecursionRate(
        state.trainingStatistics.statistics,
        state.trainingSettings.recursionRate,
        CHORD_LINE_LENGTH,
        state.trainingSettings.targetChords,
        state.trainingSettings.isUsingRecursion,
      ),
    ];
    state.trainingStatistics = generateEmptyChordStatistics('chords');
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
    (state, target) => {
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
};

export { TrainingStore, TrainingStoreModel };

function resetTrainingStore(state: TrainingStoreModel) {
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

function generateNextLineOfInputdata(state: TrainingStoreModel) {
  if (getCurrentTrainingScenario() === 'CHORDING')
    state.trainingText = [
      ...state.trainingText,
      generateChordTrainingDataWithRecursionRate(
        state.trainingStatistics.statistics,
        state.trainingSettings.recursionRate,
        CHORD_LINE_LENGTH,
        state.trainingSettings.targetChords,
        state.trainingSettings.isUsingRecursion,
      ),
    ];
  if (getCurrentTrainingScenario() === 'ALPHABET') {
    state.trainingText = [
      ...state.trainingText,
      generateCharacterTrainingDataWithRecursionRate(
        state.trainingStatistics.statistics,
        state.trainingSettings.recursionRate,
        CHORD_LINE_LENGTH,
        state.trainingSettings.targetChords,
        state.trainingSettings.isUsingRecursion,
      ),
    ];
  }
}

function generateEmptyChordStatistics(
  library: keyof ChordLibrary,
): TrainingStatistics {
  const chordLibraryForChords = chordLibrary[library];
  return {
    statistics: Object.keys(chordLibraryForChords).map((key) => {
      return createEmptyChordStatistics(key);
    }),
  };
}

function updateRecursionRateSettings(state: TrainingStoreModel) {
  const chordsWithSpeedHigherThanSpeedGoal =
    state.trainingStatistics.statistics.filter(
      (s) => s.averageSpeed > state.trainingSettings.speedGoal,
    );
  const numberOfChordsAboveSpeedGoal =
    chordsWithSpeedHigherThanSpeedGoal.length;
  const currentTrainingScenario = getCurrentTrainingScenario();
  let recursionRate = 95;

  if (state.trainingSettings.autoOrCustom === 'AUTO') {
    if (currentTrainingScenario === 'ALPHABET') {
      if (numberOfChordsAboveSpeedGoal <= 2)
        recursionRate = numberOfChordsAboveSpeedGoal * 35;
      else if (numberOfChordsAboveSpeedGoal == 0) recursionRate = 0;
    } else if (currentTrainingScenario === 'CHORDING') {
      if (numberOfChordsAboveSpeedGoal <= 10)
        recursionRate = numberOfChordsAboveSpeedGoal * 8 + 12;
      else if (numberOfChordsAboveSpeedGoal == 0) recursionRate = 0;
    }

    state.trainingSettings.recursionRate = recursionRate;
  }
}
