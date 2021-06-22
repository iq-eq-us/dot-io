import { action, Action, computed, Computed } from 'easy-peasy';
import {
  generateCharacterTrainingData,
  generateChordTrainingData,
  generateTrigramTrainingData,
} from '../helpers/generateTrainingData';
import { ROUTER_PATHS } from '../components/router';
import {
  defaultTrainingSettings,
  TrainingSettingsState,
} from '../models/trainingSettingsStateModel';
import type { TrainingScenario } from '../types/trainingScenario';
import {
  ConvertStringToKeyHighlightPositions,
  KeyHighlightPosition,
} from '../helpers/convertStringToKeyHighlightPositions';

interface TrainingStoreModel {
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
}

const TrainingStore: TrainingStoreModel = {
  trainingText: [],
  currentLineOfTrainingText: 0,
  currentSubindexInTrainingText: 0,
  trainingSettings: defaultTrainingSettings,
  setTrainingSettings: action((state, payload) => {
    state.trainingSettings = payload;
  }),
  currentlyHighlightedKeys: computed((state) => {
    const targetWord = state.targetWord;
    return ConvertStringToKeyHighlightPositions(targetWord || '');
  }),
  currentTrainingMode: computed(() => {
    const location = document?.location;

    // This may need to change in the future if you want to switch up your training mode based on
    // something other than the url location

    // TODO: Add the rest of the training scenarios here and to the router page
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
  beginTrainingAlphabetMode: action((state) => {
    state.trainingText = generateCharacterTrainingData();
    state.currentLineOfTrainingText = 0;
    state.currentSubindexInTrainingText = 0;
  }),
  beginTrainingTrigramMode: action((state) => {
    state.trainingText = generateTrigramTrainingData();
    state.currentLineOfTrainingText = 0;
    state.currentSubindexInTrainingText = 0;
  }),
  beginTrainingChordMode: action((state) => {
    state.trainingText = generateChordTrainingData();
    state.currentLineOfTrainingText = 0;
    state.currentSubindexInTrainingText = 0;
  }),
  proceedToNextWord: action((state) => {
    console.log(
      ConvertStringToKeyHighlightPositions(
        state.trainingText[state.currentLineOfTrainingText][
          state.currentSubindexInTrainingText
        ],
      ),
    );
    const isReadyToAdvanceToNextLineOfTrainingText =
      state.currentSubindexInTrainingText + 1 >=
      state.trainingText[state.currentLineOfTrainingText].length;
    if (isReadyToAdvanceToNextLineOfTrainingText) {
      state.currentLineOfTrainingText += 1;
      state.currentSubindexInTrainingText = 0;
    } else {
      state.currentSubindexInTrainingText += 1;
    }
  }),
};

export { TrainingStore, TrainingStoreModel };
