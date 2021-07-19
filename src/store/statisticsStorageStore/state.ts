import { computed } from 'easy-peasy';
import { chordLibrary } from '../../data/chordLibrary';
import type { StatisticsStoreState } from '../../models/statisticsStorage';
import type { TrainingScenario } from '../../models/trainingScenario';
import type { TrainingStatistics } from '../../models/trainingStatistics';

/**
 * The storage keys for the saved data
 */
const SAVED_STATS_STORAGE_KEY = 'SAVED_STATS_STORAGE_KEY';
export const SAVED_FASTEST_WPM_KEY = 'FASTEST_WPM_KEY';

/**
 * The data is retrieved from storage when the application first boots up
 */
const storedTrainingStats: TrainingStatistics = JSON.parse(
  localStorage.getItem(SAVED_STATS_STORAGE_KEY) || '{"statistics":[]}',
) as TrainingStatistics;

const defaultWPM = JSON.stringify({
  ALPHABET: 0,
  TRIGRAM: 0,
  LEXICAL: 0,
  CHORDING: 0,
  LEXICOGRAPHIC: 0,
  SUPERSONIC: 0,
});

const fastestWPMFromStorage: Record<TrainingScenario, number> = JSON.parse(
  localStorage.getItem(SAVED_FASTEST_WPM_KEY) || defaultWPM,
);

/**
 * The saved data is then injected into the store.
 */
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
