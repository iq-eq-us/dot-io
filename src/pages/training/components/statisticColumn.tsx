import React, { ReactElement } from 'react';
import {
  getCumulativeAverageChordTypeTime,
  getCumulativeValueByPropertyName,
} from '../../../helpers/aggregation';
import { useHUD } from '../../../hooks/useHUD';

import { useTrainingSettings } from '../../../hooks/useTrainingSettings';
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

  const shouldDisplayHUD = useHUD();

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
            <th style={{ minWidth: 42 }}></th>
            <th style={{ minWidth: 42 }}>avg</th>
            <th style={{ minWidth: 42 }}>last</th>
            <th style={{ minWidth: 42 }}>err</th>
            <th style={{ minWidth: 42 }}>x</th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ color: 'skyblue' }}>
            <td className="w-28">Sum:</td>
            <td className={`${shouldDisplayHUD ? '' : 'invisible'}`}>
              {getCumulativeAverageChordTypeTime(sortedStats)}
            </td>
            <td>{timeTakenToTypePreviousChord?.toFixed(0)}</td>
            <td>
              {getCumulativeValueByPropertyName(sortedStats, 'numberOfErrors')}
            </td>
            <td className={`${shouldDisplayHUD ? '' : 'invisible'}`}>
              {getCumulativeValueByPropertyName(
                sortedStats,
                'numberOfOccurrences',
              )}
            </td>
          </tr>
          {sortedStats.map((stat, i) => (
            <tr key={stat.id}>
              <td>{stat.displayTitle}</td>
              <td className="relative">
                {stat?.averageSpeed?.toFixed(0)}{' '}
                {i < trainingSettings.targetChords && (
                  <div
                    className={`${
                      trainingSettings.autoOrCustom === 'AUTO'
                        ? 'bg-yellow-300'
                        : 'bg-gray-300'
                    } w-2 h-[26px] absolute right-0 top-0`}
                  ></div>
                )}
              </td>
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
