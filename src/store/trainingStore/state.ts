import { computed } from 'easy-peasy';
import { ConvertStringToKeyHighlightPositions } from '../../helpers/convertStringToKeyHighlightPositions';
import { defaultTrainingSettings } from '../../models/trainingSettingsStateModel';
import type { TrainingStoreStateModel } from '../../models/trainingStore';

const trainingStoreState: TrainingStoreStateModel = {
  // * State
  typedTrainingText: '',
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
    return state.trainingSettings.isHighlightingKeys
      ? ConvertStringToKeyHighlightPositions(targetWord || '')
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
