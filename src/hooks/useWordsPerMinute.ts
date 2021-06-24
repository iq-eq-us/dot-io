import { getCumulativeValueByPropertyName } from "../pages/training/components/statisticColumn";
import { useStoreState } from "../store/store"

export const useWordsPerMinute = (): number => {
  const timeAtTrainingStart = useStoreState((store) => store.timeAtTrainingStart);
  const timeAtTrainingStartInSeconds = timeAtTrainingStart * 0.001;
  const timeNowInSeconds = performance.now() * 0.001;
  const timeDifferenceInSeconds = timeNowInSeconds - timeAtTrainingStartInSeconds;
  const timeDifferenceInMinutes = timeDifferenceInSeconds / 60;
  const trainingStatistics = useStoreState((store) => store.trainingStatistics);

  const sumOfTrainingOccurrences = getCumulativeValueByPropertyName(
    trainingStatistics.statistics,
    'numberOfOccurrences',
  )

  return parseFloat(sumOfTrainingOccurrences) / timeDifferenceInMinutes;
}