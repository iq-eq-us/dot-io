import { action, actionOn } from 'easy-peasy';
import type { StatisticsStoreActions } from '../../models/statisticsStorage';
import {
  ChordStatistics,
  createEmptyChordStatistics,
  TrainingStatistics,
} from '../../models/trainingStatistics';
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
    store.fastestRecordedWordsPerMinute = 0;
    localStorage.clear();
  }),
  setFastestRecordedWordsPerMinute: action((store, payload) => {
    store.fastestRecordedWordsPerMinute = payload;
  }),
  onChangeFastestWPM: actionOn(
    (store) => store.setFastestRecordedWordsPerMinute,
    (state) => {
      localStorage.setItem(
        SAVED_FASTEST_WPM_KEY,
        state.fastestRecordedWordsPerMinute.toString(),
      );
    },
  ),
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
    if (existingStat && mergingStat) {
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
      };
    } else if (existingStat && !mergingStat) {
      newStat = existingStat;
    } else if (!existingStat && mergingStat) {
      newStat = mergingStat;
    }

    newStats.push(newStat);
  });

  return newStats;
};

export default statisticsStorageStoreActions;
