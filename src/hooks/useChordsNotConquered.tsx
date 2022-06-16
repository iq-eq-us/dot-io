import { useStoreState } from '../store/store';

export function useTotalChordsToConquer(): number {
  return useStoreState((store) => store.numberOfChordsForTrainingLevel);
}

export default function useChordsNotConquered(): number {
  const trainingStats = useStoreState((store) => store.trainingStatistics);
  const trainingSettings = useStoreState((store) => store.trainingSettings);

  const statsWeCareAbout = trainingStats.statistics;
  const stats = statsWeCareAbout.filter(
    (s) => s.averageSpeed > trainingSettings.speedGoal || s.averageSpeed === 0,
  );

  return stats.length;
}
