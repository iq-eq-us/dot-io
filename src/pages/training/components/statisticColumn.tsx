import React, { ReactElement } from 'react';

import { useTrainingSettings } from '../../../hooks/useTrainingSettings';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import { useStoreState } from '../../../store/store';

export default function StatisticColumn(): ReactElement {
  const [trainingSettings, setTrainingSettings] = useTrainingSettings();
  const trainingStatistics = useStoreState((store) => store.trainingStatistics);
  const sortedStats = trainingStatistics.statistics.sort(
    (a, b) => b.averageSpeed - a.averageSpeed,
  );
  const timeTakenToTypePreviousChord = useStoreState(
    (store) => store.timeTakenToTypePreviousChord,
  );

  return (
    <div
      className="p-4 flex flex-col items-end overflow-y-scroll h-screen"
      style={{ fontWeight: 500 }}
    >
      <div className="flex flex-row">
        <input
          className="mr-2 leading-tight"
          type="checkbox"
          checked={trainingSettings.isAutoWrite}
          onChange={(e) => {
            setTrainingSettings({
              ...trainingSettings,
              isAutoWrite: e.target.checked,
            });
          }}
        />
        <span className="text-sm" style={{ color: 'skyblue' }}>
          AutoWrite
        </span>
      </div>

      <table className="text-gray-500">
        <thead>
          <tr>
            <th style={{ minWidth: 48 }}></th>
            <th style={{ minWidth: 48 }}>avg</th>
            <th style={{ minWidth: 48 }}>last</th>
            <th style={{ minWidth: 48 }}>err</th>
            <th style={{ minWidth: 48 }}>x</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ color: 'skyblue' }}>
            <td className="w-28">Cumulative:</td>
            <td>{getCumulativeAverageChordTypeTime(sortedStats)}</td>
            <td>{timeTakenToTypePreviousChord?.toFixed(0)}</td>
            <td>
              {getCumulativeValueByPropertyName(sortedStats, 'numberOfErrors')}
            </td>
            <td>
              {getCumulativeValueByPropertyName(
                sortedStats,
                'numberOfOccurrences',
              )}
            </td>
          </tr>
          {sortedStats.map((stat) => (
            <tr key={stat.id}>
              <td>{stat.displayTitle}</td>
              <td>{stat?.averageSpeed?.toFixed(0)}</td>
              <td>{stat?.lastSpeed?.toFixed(0)}</td>
              <td>{stat.numberOfErrors}</td>
              <td>{stat.numberOfOccurrences}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

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

export const getCumulativeValueByPropertyName = <T,>(
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
