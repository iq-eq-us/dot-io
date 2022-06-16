import type { ChordStatistics } from '../models/trainingStatistics';

export const getCumulativeAverageChordTypeTime = (
  stats: ChordStatistics[],
): string => {
  const statsWithUntypedChordsRemoved = stats.filter(
    (stat) => stat.averageSpeed != 0,
    
  );

  
 
  const average =
    statsWithUntypedChordsRemoved.reduce(
      (a, b) => ({
        averageSpeed: a.averageSpeed + b.averageSpeed,
        // ? Could also be done this way to account for the number of occurrences of the given chord typed
        // averageSpeed: a.averageSpeed + b.averageSpeed * b.numberOfOccurrences,
      }),
      { averageSpeed: 0 },
    ).averageSpeed / statsWithUntypedChordsRemoved.length;

  return (isNaN(average) ? '0' : average?.toFixed()) || '0';
};

export const getCumulativeOccurence = (
  stats: ChordStatistics[],
): string => {
  const occur = stats.filter(
    (stat) => stat.numberOfOccurrences != 0,
    
  );
  return String(occur);
}

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
