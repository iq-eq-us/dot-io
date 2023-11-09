import React, { ReactElement, useState } from 'react';
import store, { useStoreState } from '../../../store/store';
import sessionStatHistoryTest from '../components/testSessionStats';
import HeatMap from '@uiw/react-heat-map';
import Tooltip from '@uiw/react-tooltip';
import styled from 'styled-components';

// Streak heatmap is a visual representation of practice streak.
export function StreakHeatmap(): ReactElement {
  // sessionStatHistoryTest();
  // getting dates and counts from the store
  let value = store.getState().sessionStatsHistory.map((session) => {
    return {
      date: session.sessionDate,
      count: session.numberOfChordsMastered,
    };
  });

  // if streakheatmap loads before actions is run, get local storage as backup
  if (value.length === 0) {
    const localBrowserStorage = localStorage.getItem('sessionStatsHistory');
    if (localBrowserStorage) {
      value = JSON.parse(localBrowserStorage).map((session: any) => {
        return {
          date: session.sessionDate,
          count: session.numberOfChordsMastered,
        };
      });
    }
  }

  // remove any 0 values from the array to help with look of heatmap (heatmap is based on lowest value for gradient)
  value = value.filter((session) => session.count > 0);

  return (
    <div className="flex justify-center">
      {/* <p>Streak Heatmap</p> */}
      {/* set the color to white */}
      <div style={{ color: 'white' }}>
        <HeatMap
          style={{ color: '#fff' }}
          value={value}
          width={600}
          rectSize={14}
          space={2}
          weekLabels={['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']}
          startDate={
            new Date(
              new Date().getFullYear(),
              new Date().getMonth() == 0
                ? new Date().getMonth()
                : new Date().getMonth() - 1,
              1,
            )
          }
          rectRender={(props, data) => {
            return (
              <Tooltip
                placement="top"
                content={`number of terms practiced: ${
                  data.count || 0
                }, date: ${data.date || 0}`}
              >
                <rect {...props} />
              </Tooltip>
            );
          }}
        />
      </div>
    </div>
  );
}

// const HeatMap = styled.div.attrs({
//   className: `
//     border-4
//     max-w-2xl
//     max-h-2xl`,
// })``;
