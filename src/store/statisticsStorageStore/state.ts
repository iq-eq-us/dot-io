import { computed } from 'easy-peasy';
import { chordLibrary } from '../../data/chordLibrary';
import type { StatisticsStoreState } from '../../models/statisticsStorage';
import type { TrainingStatistics } from '../../models/trainingStatistics';

const SAVED_STATS_STORAGE_KEY = 'SAVED_STATS_STORAGE_KEY';
export const SAVED_FASTEST_WPM_KEY = 'FASTEST_WPM_KEY';

const storedTrainingStats: TrainingStatistics = JSON.parse(
  localStorage.getItem(SAVED_STATS_STORAGE_KEY) || '{"statistics":[]}',
) as TrainingStatistics;

const fastestWPMFromStorage: number = parseFloat(
  JSON.parse(localStorage.getItem(SAVED_FASTEST_WPM_KEY) || '0'),
);

const statisticsStoreState: StatisticsStoreState = {
  totalSavedTrainingStatistics: storedTrainingStats,
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
  fastestRecordedWordsPerMinute: fastestWPMFromStorage,
};

export default statisticsStoreState;
