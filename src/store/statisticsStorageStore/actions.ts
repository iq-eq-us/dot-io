import { action } from 'easy-peasy';
import type {
  StatisticsStoreActions,
  StatisticsStoreState,
} from '../../models/statisticsStorage';
import {
  ChordStatistics,
  createEmptyChordStatistics,
  TrainingStatistics,
} from '../../models/trainingStatistics';
import store from '../store';
import { SAVED_FASTEST_WPM_KEY } from './state';

const SAVED_STATS_STORAGE_KEY = 'SAVED_STATS_STORAGE_KEY';

const ifHasOccurredAtLeastOnce = (e: ChordStatistics): boolean =>
  e.numberOfOccurrences !== 0;

/**
 * This section contains all the state for the saved items in storage.
 * It also handles merging existing stored data with new data.
 * This logic is rather complex so it may take a few tries to understand it.
 */
const statisticsStorageStoreActions: StatisticsStoreActions = {
  clearStatsForOneModule: action((state, payload) => {
    state.fastestRecordedWordsPerMinute[payload] = 0;
    updateWPMInLocalStorage(state as unknown as StatisticsStoreState);
    state.totalSavedTrainingStatistics = {
      statistics: state.totalSavedTrainingStatistics.statistics.filter(
        (stat) => stat.scenario !== payload,
      ),
    };
    localStorage.setItem(
      SAVED_STATS_STORAGE_KEY,
      JSON.stringify(state.totalSavedTrainingStatistics),
    );
  }),
  setTotalSavedTrainingStatistics: action((store, payload) => {
    // If there are no statistics, we can just set them
    // If statistics are already there, we need to merge them together

    const statisticsAlreadyExist =
      store.totalSavedTrainingStatistics?.statistics?.length > 0;

    if (statisticsAlreadyExist) {
      const objectToSave = {
        statistics: handleStatsMerge(
          store.totalSavedTrainingStatistics,
          payload,
        ),
      };
      store.totalSavedTrainingStatistics = objectToSave;
      localStorage.setItem(
        SAVED_STATS_STORAGE_KEY,
        JSON.stringify(objectToSave),
      );
    } else {
      console.log('Here we are handle merge');
      const objectToSave = {
        statistics: payload.statistics.filter(ifHasOccurredAtLeastOnce),
      };
      store.totalSavedTrainingStatistics = objectToSave;
      localStorage.setItem(
        SAVED_STATS_STORAGE_KEY,
        JSON.stringify(objectToSave),
      );
    }
  }),
  clearAllStorage: action((store) => {
    store.totalSavedTrainingStatistics = { statistics: [] };
    store.fastestRecordedWordsPerMinute = {
      ALPHABET: 0,
      TRIGRAM: 0,
      LEXICAL: 0,
      CHORDING: 0,
      LEXICOGRAPHIC: 0,
      SUPERSONIC: 0,
      CUSTOMTIER: 0,
    };
    localStorage.clear();
  }),
  setFastestRecordedWordsPerMinute: action((store, payload) => {
    store.fastestRecordedWordsPerMinute = payload;
    updateWPMInLocalStorage(store as unknown as StatisticsStoreState);
  }),
};

export const handleStatsMerge = (
  firstStats: TrainingStatistics,
  secondStats: TrainingStatistics,
): ChordStatistics[] => {
  const existingStatistics = {
    statistics: firstStats.statistics.filter(ifHasOccurredAtLeastOnce),
  };
  const statisticsToMerge = {
    statistics: secondStats.statistics.filter(ifHasOccurredAtLeastOnce),
  };

  // Get an array of all possible chord statistics
  const allChordKeys = [
    ...new Set([
      ...existingStatistics.statistics
        .filter((s: ChordStatistics) => s.numberOfOccurrences > 0)
        .map((s: ChordStatistics) => s.id),
      ...statisticsToMerge.statistics
        .filter((s: ChordStatistics) => s.numberOfOccurrences > 0)
        .map((s: ChordStatistics) => s.id),
    ]),
  ];

  //I need to build lloginc in that will read in the first word that has NAN and

  // Loop through all possible keys and construct a merged chord stat for that key
  const newStats: ChordStatistics[] = [];
  allChordKeys.map((key: string) => {
    const existingStat = existingStatistics.statistics.find(
      (s: ChordStatistics) => s.id === key,
    );
    const mergingStat = statisticsToMerge.statistics.find(
      (s: ChordStatistics) => s.id === key,
    );

    let newStat: ChordStatistics = createEmptyChordStatistics(key);

    // If there is both a stat to merge and an existing stat, we have to combine them
    // Otherwise we can just use the stat that exists already
    if (
      existingStat &&
      mergingStat &&
      existingStat.scenario === mergingStat.scenario
    ) {
      newStat = {
        averageSpeed:
          (existingStat.averageSpeed + mergingStat.averageSpeed) / 2,
        id: key,
        displayTitle: key,
        numberOfErrors:
          existingStat.numberOfErrors + mergingStat.numberOfErrors,
        numberOfOccurrences:
          existingStat.numberOfOccurrences + mergingStat.numberOfOccurrences,
        lastSpeed: 0,
        scenario: existingStat.scenario,
      };

      newStats.push(newStat);
    } else {
      if (mergingStat) newStats.push(mergingStat);
      if (existingStat) newStats.push(existingStat);
    }
  });
  return newStats;
};

function updateWPMInLocalStorage(state: StatisticsStoreState) {
  localStorage.setItem(
    SAVED_FASTEST_WPM_KEY,
    JSON.stringify(state.fastestRecordedWordsPerMinute),
  );
}

export default statisticsStorageStoreActions;
