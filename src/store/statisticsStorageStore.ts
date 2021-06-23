import { action, computed } from 'easy-peasy';
import { chordLibrary } from '../data/chordLibrary';
import type { StatisticsStore } from '../models/statisticsStorage';
import {
  ChordStatistics,
  createEmptyChordStatistics,
  TrainingStatistics,
} from '../models/trainingStatistics';

const SAVED_STATS_STORAGE_KEY = 'SAVED_STATS_STORAGE_KEY';
const storedTrainingStats: TrainingStatistics = JSON.parse(
  localStorage.getItem(SAVED_STATS_STORAGE_KEY) || '{"statistics":[]}',
) as TrainingStatistics;

const ifHasOccurredAtLeastOnce = (e: ChordStatistics): boolean =>
  e.numberOfOccurrences !== 0;

const TrainingStorageStore: StatisticsStore = {
  totalSavedTrainingStatistics: storedTrainingStats,
  setTotalSavedTrainingStatistics: action((store, payload) => {
    // If there are no statistics, we can just set them
    // If statistics are already there, we need to merge them together

    const statisticsAlreadyExist =
      store.totalSavedTrainingStatistics?.statistics?.length > 0;

    if (statisticsAlreadyExist) {
      handleStatsMerge(store as StatisticsStore, payload);
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
  totalSavedCharacterChordStats: computed((store) => {
    const totalSavedStats = store.totalSavedTrainingStatistics;
    const characterKeys = Object.keys(chordLibrary.letters);

    return {
      statistics: totalSavedStats.statistics.filter((s) =>
        characterKeys.includes(s.id),
      ),
    };
  }),
  totalSavedChordStats: computed((store) => {
    const totalSavedStats = store.totalSavedTrainingStatistics;
    const characterKeys = Object.keys(chordLibrary.chords);

    return {
      statistics: totalSavedStats.statistics.filter((s) =>
        characterKeys.includes(s.id),
      ),
    };
  }),
  clearAllStorage: action((store) => {
    store.totalSavedTrainingStatistics = { statistics: [] };
    localStorage.clear();
  }),
};

const handleStatsMerge = (
  store: StatisticsStore,
  payload: TrainingStatistics,
) => {
  const existingStatistics = {
    statistics: store.totalSavedTrainingStatistics.statistics.filter(
      ifHasOccurredAtLeastOnce,
    ),
  };
  const statisticsToMerge = {
    statistics: payload.statistics.filter(ifHasOccurredAtLeastOnce),
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

  const objectToSave = {
    statistics: newStats,
  };

  store.totalSavedTrainingStatistics = objectToSave;
  localStorage.setItem(SAVED_STATS_STORAGE_KEY, JSON.stringify(objectToSave));
};

export { TrainingStorageStore };
