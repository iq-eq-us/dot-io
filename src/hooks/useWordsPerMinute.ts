import { getCumulativeValueByPropertyName } from '../helpers/aggregation';
import { useStoreState, useStoreActions } from '../store/store';

export const useWordsPerMinute = (): number => {
  const timeAtTrainingStart = useStoreState(
    (store) => store.timeAtTrainingStart,
  );
  const fastestRecordedWPM = useStoreState(
    (store) => store.fastestRecordedWordsPerMinute,
  );
  const setFastestWPM = useStoreActions(
    (store) => store.setFastestRecordedWordsPerMinute,
  );
  const timeAtTrainingStartInSeconds = timeAtTrainingStart * 0.001;
  const timeNowInSeconds = performance.now() * 0.001;
  const timeDifferenceInSeconds =
    timeNowInSeconds - timeAtTrainingStartInSeconds;
  const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
  const trainingStatistics = useStoreState((store) => store.trainingStatistics);

  const sumOfTrainingOccurrences = getCumulativeValueByPropertyName(
    trainingStatistics.statistics,
    'numberOfOccurrences',
  );

  const wpm = parseFloat(sumOfTrainingOccurrences) / timeDifferenceInMinutes;

  if (wpm > fastestRecordedWPM) setFastestWPM(wpm);

  return wpm;
};
