import React, { ReactElement, useEffect, useRef } from 'react';
import { Grid } from 'gridjs';

// This is used to account for the header row as well as the "aggregate" row that shows average speed and
// a sum of errors and occurrences
const LIST_LENGTH_OFFSET = 2;

function VerticalStatsWords(): ReactElement {
  const x = JSON.parse(localStorage.getItem('CPM_LEXICAL'));
  const y = x.statistics;
  const wrapperRef = useRef(null);

  const gridDate = [];

  y.forEach((element) => {
    const avgSpeedMilliseconds = element.averageSpeed * 10;
    const millisecondsPerCharacter =
      avgSpeedMilliseconds / (element.id.length + 1);
    const averageCharacterPerMin = 60000 / millisecondsPerCharacter;
    let wpm = (averageCharacterPerMin / 5).toFixed(0);
    let cpm = ((averageCharacterPerMin / 5) * 5).toFixed(0);

    if (wpm == 'Infinity') {
      wpm = (0).toFixed(0);
    }

    if (cpm == 'Infinity') {
      cpm = (0).toFixed(0);
    }

    gridDate.push([
      element.displayTitle,
      cpm,
      wpm,
      element.numberOfErrors,
      element.numberOfOccurrences,
    ]);
  });

  const grid = new Grid({
    pagination: {
      limit: 10,
      summary: true,
    },
    columns: ['WORD', 'CPM', 'WPM', 'ERRORS', 'TIMES'],
    data: gridDate,
    style: {
      table: {
        border: '4px solid #878787',
      },
      th: {
        'padding-top': '12px',
        'padding-bottom': '12px',
        'text-align': 'center',
        'background-color': '#767676',
        color: 'white',
      },
      td: {
        'text-align': 'center',
        border: '1px solid #ddd',
        padding: '8px',
      },
    },
  });

  useEffect(() => {
    grid.render(wrapperRef.current);
  });

  return <div ref={wrapperRef} />;
}
export default VerticalStatsWords;
