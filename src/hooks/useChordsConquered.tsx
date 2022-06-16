import { useStoreState } from '../store/store';

export default function useNumberOfChordsConquered(): number {
  const numberOfChords = useStoreState((store) => store.numberOfChordsForTrainingLevel);
  const trainingStats = useStoreState((store) => store.trainingStatistics);
  const trainingSettings = useStoreState((store) => store.trainingSettings);

  const statsLength = trainingStats.statistics.filter(
    (s) => s.averageSpeed > trainingSettings.speedGoal || s.averageSpeed === 0,
  ).length;

  return numberOfChords - statsLength;
}
