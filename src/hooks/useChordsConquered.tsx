import { useStoreState } from '../store/store';

export default function useNumberOfChordsConquered(): number {
  const trainingStats = useStoreState((store) => store.trainingStatistics);
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const trainingStatsWithAverageSpeedOverSpeedGoal =
    trainingStats.statistics.filter(
      (s) => s.averageSpeed < trainingSettings.speedGoal && s.averageSpeed != 0,
    );

  const totalNumberOfChordsConquered =
    trainingStatsWithAverageSpeedOverSpeedGoal.length;

  return totalNumberOfChordsConquered;
}
