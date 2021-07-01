import { action } from 'easy-peasy';
import type {
  StatisticsStore,
  StatisticsStoreActions,
} from '../../models/statisticsStorage';
import {
  ChordStatistics,
  createEmptyChordStatistics,
  TrainingStatistics,
} from '../../models/trainingStatistics';

const SAVED_STATS_STORAGE_KEY = 'SAVED_STATS_STORAGE_KEY';

const ifHasOccurredAtLeastOnce = (e: ChordStatistics): boolean =>
  e.numberOfOccurrences !== 0;

const statisticsStorageStoreActions: StatisticsStoreActions = {
  setTotalSavedTrainingStatistics: action((store, payload) => {
    // If there are no statistics, we can just set them
    // If statistics are already there, we need to merge them together

    const statisticsAlreadyExist =
      store.totalSavedTrainingStatistics?.statistics?.length > 0;

    if (statisticsAlreadyExist) {
      const objectToSave = {
        statistics: handleStatsMerge(store.totalSavedChordStats, payload),
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
    localStorage.clear();
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

  const newStats: ChordStatistics[] = [];
  allChordKeys.map((key: string) => {
    const existingStat = existingStatistics.statistics.find(
      (s: ChordStatistics) => s.id === key,
    );
    const mergingStat = statisticsToMerge.statistics.find(
      (s: ChordStatistics) => s.id === key,
    );

    let newStat: ChordStatistics = createEmptyChordStatistics(key);

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
