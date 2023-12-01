import React, { ReactElement, useEffect, useRef } from 'react';
import { Grid } from 'gridjs';

// This is used to account for the header row as well as the "aggregate" row that shows average speed and
// a sum of errors and occurrences
const LIST_LENGTH_OFFSET = 2;

function VerticalStatsChMTier(): ReactElement {
  const x = JSON.parse(localStorage.getItem('CHM_LEXICAL'));
  const y = x.statistics;
  const wrapperRef = useRef(null);

  const gridDate = [];

  y.forEach((element) => {
    const occurencesOfWord = element.numberOfOccurrences;
    console.log(occurencesOfWord);
    const errorsForWord = element.numberOfErrors;
    console.log(errorsForWord);
    let accuracyForWord = (
      ((occurencesOfWord - errorsForWord) / occurencesOfWord) *
      100
    ).toFixed(2);
    console.log(accuracyForWord);

    const avgSpeedMilliseconds = element.averageSpeed * 10;
    const millisecondsPerCharacter =
      avgSpeedMilliseconds / (element.id.length + 1);
    const averageCharacterPerMin = 60000 / millisecondsPerCharacter;
    let awpm = (averageCharacterPerMin / 5).toFixed(0);
    let chm = (parseInt(awpm) / 100).toFixed(2);

    if (accuracyForWord == 'NaN') {
      accuracyForWord = '0';
    }

    if (awpm == 'Infinity') {
      awpm = (0).toFixed(0);
    }

    if (chm == 'NaN') {
      chm = (0).toFixed(0);
    }

    gridDate.push([element.displayTitle, accuracyForWord, awpm, chm]);
  });

  const grid = new Grid({
    pagination: {
      limit: 10,
      summary: true,
    },
    columns: ['WORD', 'Accuracy %', 'AWPM', 'CHM'],
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
export default VerticalStatsChMTier;
