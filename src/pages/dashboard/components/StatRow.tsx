import React, { ReactElement } from 'react';
import type { ChordStatistics } from '../../../models/trainingStatistics';

export function StatRow({
  i,
  stat,
}: {
  i: number;
  stat: ChordStatistics;
}): ReactElement {
  return (
    <tr key={stat.id} className={`${i % 2 === 0 ? 'bg-gray-100' : ''}`}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="text-sm ml-4 font-medium text-gray-900">
            {stat.displayTitle}
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {stat.averageSpeed?.toFixed()}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm text-gray-900">{stat.numberOfErrors}</div>
      </td>
      <div className="px-6 py-4 whitespace-nowrap">
        {stat.numberOfOccurrences}
      </div>
    </tr>
  );
}
