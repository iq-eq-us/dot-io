import type {
  ChordStatistics,
  ChordStatisticsFromDevice,
} from '../models/trainingStatistics';

export const getCumulativeAverageChordTypeTime = (
  stats: ChordStatistics[],
): number => {
  const statsWithUntypedChordsRemoved = stats.filter(
    (stat) => stat.averageSpeed != 0,
  );

  const average =
    statsWithUntypedChordsRemoved.reduce(
      (a, b) => ({
        averageSpeed: a.averageSpeed + b.averageSpeed,
        // ? Could also be done this way to account for the number of occurrences of the given chord typed
        //averageSpeed: a.averageSpeed + b.averageSpeed * b.numberOfOccurrences,
      }),
      { averageSpeed: 0 },
    ).averageSpeed / statsWithUntypedChordsRemoved.length;

  return (isNaN(average) ? 0 : average) || 0;
};

export const getCumulativeAverageChordTypeTimeFromDevice = (
  stats: ChordStatisticsFromDevice[],
): string => {
  const statsWithUntypedChordsRemoved = stats?.filter(
    (stat) => stat.averageSpeed != 0,
  );

  const average =
    statsWithUntypedChordsRemoved?.reduce(
      (a, b) => ({
        averageSpeed: a.averageSpeed + b.averageSpeed,
        // ? Could also be done this way to account for the number of occurrences of the given chord typed
        // averageSpeed: a.averageSpeed + b.averageSpeed * b.numberOfOccurrences,
      }),
      { averageSpeed: 0 },
    ).averageSpeed / statsWithUntypedChordsRemoved?.length;

  return (isNaN(average) ? '0' : average?.toFixed()) || '0';
};

export const getCumulativeOccurrence = (stats: ChordStatistics[]): string => {
  const occur = stats.filter((stat) => stat.numberOfOccurrences != 0);
  return String(occur);
};
export const wpmMethodCalculator = (value: number, scenario?) => {
  const avgSpeedMilliseconds = value * 10;
  const millisecondsPerCharacter =
    avgSpeedMilliseconds / (scenario == 'ALPHABET' ? 1 : 5);
  const averageCharacterPerMin = 60000 / millisecondsPerCharacter;
  const wpm = averageCharacterPerMin / 5;

  return wpm;
};

export const wpmMethodCalculatorForStoredChords = (value: number[]) => {
  const sum = value?.reduce((a, b) => a + b, 0);
  const avg = sum / value?.length || 0;

  const avgSpeedMilliseconds = avg * 10;
  const millisecondsPerCharacter = avgSpeedMilliseconds / 5;
  const averageCharacterPerMin = 60000 / millisecondsPerCharacter;
  const wpm = averageCharacterPerMin / 5;

  return wpm;
};

export const avgCalculatorForTheSpeedOfLastTen = (value: number[]) => {
  const sum = value?.reduce((a, b) => a + b, 0);
  const avg = sum / value?.length || 0;
  return avg;
};

export const getCumulativeValueByPropertyName = <T>(
  object: T[],
  propertyName: keyof T,
): string => {
  return object
    .reduce(
      (previousValue, currentValue) => {
        return {
          [propertyName]:
            (previousValue[propertyName] as any) + // eslint-disable-line @typescript-eslint/no-explicit-any
            (currentValue[propertyName] as any), // eslint-disable-line @typescript-eslint/no-explicit-any
        };
      },
      { [propertyName]: 0 } as any, // eslint-disable-line @typescript-eslint/no-explicit-any
    )
    [propertyName].toString();
};
