import { action, computed } from 'easy-peasy';
import {
  generateCharacterTrainingData,
  generateChordsForChordedTrainingRandomly,
  generateTrigramTrainingData,
} from '../helpers/generateTrainingData';
import { ROUTER_PATHS } from '../components/router';
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

const CHORD_LINE_LENGTH = 40;

const TrainingStore: TrainingStoreModel = {
  // * State
  trainingText: [],
  currentLineOfTrainingText: 0,
  currentSubindexInTrainingText: 0,
  trainingSettings: defaultTrainingSettings,
  errorOccurredWhileAttemptingToTypeTargetChord: false,
  timeOfLastChordStarted: 0,
  timeTakenToTypePreviousChord: 0,
  trainingStatistics: {
    statistics: [],
  },
  // * Computed State
  currentlyHighlightedKeys: computed((state) => {
    const targetWord = state.targetWord;
    return ConvertStringToKeyHighlightPositions(targetWord || '');
  }),
  currentTrainingMode: computed(() => {
    const location = document?.location;

    /**
     * ? This may need to change in the future if you want to switch up your training mode based on
     * ? something other than the url location
     */

    if (location.toString().endsWith(ROUTER_PATHS.alphabetTraining))
      return 'ALPHABET';
    else if (location.toString().endsWith(ROUTER_PATHS.trigramTraining))
      return 'TRIGRAM';
    else if (location.toString().endsWith(ROUTER_PATHS.chordTraining))
      return 'CHORDING';

    return undefined;
  }),
  targetWord: computed((state) => {
    const trainingText = state.trainingText;
    const targetWord =
      trainingText?.[state.currentLineOfTrainingText]?.[
        state.currentSubindexInTrainingText
      ];

    return targetWord;
  }),
  // * Actions
  setTrainingSettings: action((state, payload) => {
    state.trainingSettings = payload;
  }),
  beginTrainingAlphabetMode: action((state) => {
    state.trainingText = generateCharacterTrainingData();
    state.trainingStatistics = generateEmptyChordStatistics('letters');
    resetTrainingStore(state);
  }),
  beginTrainingTrigramMode: action((state) => {
    state.trainingText = generateTrigramTrainingData();
    resetTrainingStore(state);
  }),
  beginTrainingChordMode: action((state) => {
    state.trainingText = generateChordsForChordedTrainingRandomly(
      2,
      CHORD_LINE_LENGTH,
    );
    state.trainingStatistics = generateEmptyChordStatistics('chords');
    resetTrainingStore(state);
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
  }),
  setErrorOccurredWhileAttemptingToTypeTargetChord: action((state, payload) => {
    state.errorOccurredWhileAttemptingToTypeTargetChord = payload;
  }),
};

export { TrainingStore, TrainingStoreModel };

function resetTrainingStore(state: TrainingStoreModel) {
  state.currentLineOfTrainingText = 0;
  state.currentSubindexInTrainingText = 0;
  state.timeOfLastChordStarted = performance.now();
  state.timeTakenToTypePreviousChord = 0;
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
    if ((state.currentTrainingMode as unknown as string) === 'CHORDING')
      state.trainingText = [
        ...state.trainingText,
        ...generateChordsForChordedTrainingRandomly(1, CHORD_LINE_LENGTH),
      ];
  } else {
    state.currentSubindexInTrainingText += 1;
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
