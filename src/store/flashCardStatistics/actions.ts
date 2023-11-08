import { action } from 'easy-peasy';
import type {
  FlashcardStatisticsActions,
  FlashcardStatisticsStoreState,
} from './state';
import type { FlashcardStatistics } from '../../models/flashCardStatistics';
import { useFlashcardStatisticsState } from './state';
const SAVED_FLASHCARD_STATS_STORAGE_KEY = 'SAVED_FLASHCARD_STATS_STORAGE_KEY';

/**
 * This section contains all the state for the saved flashcard statistics in storage.
 * It also handles merging existing stored data with new data.
 */
const statistics = useFlashcardStatisticsState(
  (state) => state.totalSavedFlashCardStatistics.statistics,
);
const flashcardStatistics = useFlashcardStatisticsState(
  (state) => state.totalSavedFlashCardStatistics,
);

const flashcardStatisticsStorageStoreActions: FlashcardStatisticsActions = {
  clearStatsForOneFlashcard: action((state, payload) => {
    state.totalSavedFlashCardStatistics = {
      statistics: state.totalSavedFlashCardStatistics.statistics.filter(
        (stat) => stat.id !== payload,
      ),
    };
    localStorage.setItem(
      SAVED_FLASHCARD_STATS_STORAGE_KEY,
      JSON.stringify(state.totalSavedFlashCardStatistics),
    );
  }),
  setTotalSavedFlashCardStatistics: action((store, payload) => {
    // If there are no statistics, we can just set them
    // If statistics are already there, we need to merge them together

    const statisticsAlreadyExist =
      store.totalSavedFlashCardStatistics?.statistics?.length > 0;

    if (statisticsAlreadyExist) {
      const objectToSave = {
        statistics: handleStatsMerge(
          store.totalSavedFlashCardStatistics.statistics,
          payload,
        ),
      };
      store.totalSavedFlashCardStatistics = objectToSave;
      localStorage.setItem(
        SAVED_FLASHCARD_STATS_STORAGE_KEY,
        JSON.stringify(objectToSave),
      );
    } else {
      const objectToSave = {
        statistics: payload.map((s: FlashcardStatistics) => s),
      };
      store.totalSavedFlashCardStatistics = objectToSave;
      localStorage.setItem(
        SAVED_FLASHCARD_STATS_STORAGE_KEY,
        JSON.stringify(objectToSave),
      );
    }
  }),
  clearAllFlashcardStats: action((store) => {
    store.totalSavedFlashCardStatistics = { statistics: [] };
    localStorage.removeItem(SAVED_FLASHCARD_STATS_STORAGE_KEY);
  }),
};

export const handleStatsMerge = (
  firstStats: FlashcardStatistics,
  secondStats: FlashcardStatistics,
): FlashcardStatistics[] => {
  const existingStatistics = {
    statistics: firstStats.map((s: FlashcardStatistics) => s),
  };
  const statisticsToMerge = {
    statistics: secondStats.map((s: FlashcardStatistics) => s),
  };

  // Get an array of all possible flashcard IDs
  const allFlashcardIds = [
    ...new Set([
      ...existingStatistics.statistics.map((s: FlashcardStatistics) => s.id),
      ...statisticsToMerge.statistics.map((s: FlashcardStatistics) => s.id),
    ]),
  ];

  const newStats: FlashcardStatistics[] = [];
  allFlashcardIds.map((flashcardId: string) => {
    const existingStat = existingStatistics.statistics.find(
      (s: FlashcardStatistics) => s.id === flashcardId,
    );
    const mergingStat = statisticsToMerge.statistics.find(
      (s: FlashcardStatistics) => s.id === flashcardId,
    );

    // If there is both a stat to merge and an existing stat, we have to combine them
    // Otherwise we can just use the stat that exists already
    if (existingStat && mergingStat) {
      const newStat = {
        flashcardId,
        // Combine the statistics as needed
        // For example:
        // averageSpeed: (existingStat.averageSpeed + mergingStat.averageSpeed) / 2,
        numberOfErrors:
          existingStat.numberOfErrors + mergingStat.numberOfErrors,
        numberOfOccurrences:
          existingStat.numberOfOccurrences + mergingStat.numberOfOccurrences,
        // Other properties as needed...
      };

      newStats.push(newStat);
    } else {
      if (mergingStat) newStats.push(mergingStat);
      if (existingStat) newStats.push(existingStat);
    }
  });
  return newStats;
};

export default flashcardStatisticsStorageStoreActions;
