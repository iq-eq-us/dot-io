import React, { ReactElement, useEffect, useRef } from 'react';
import { Grid } from 'gridjs';
import { useStoreState } from '../../../store/store';

// This is used to account for the header row as well as the "aggregate" row that shows average speed and
// a sum of errors and occurrences
const LIST_LENGTH_OFFSET = 2;

function CMdashboardTable(): ReactElement {
  const flashcard = useStoreState((state) => state.flashCards);
  const wrapperRef = useRef(null);

  const gridDate = [];

  flashcard.forEach((element) => {
    const accuracy = (
      ((element.timesTyped - element.timesErrored) / element.timesTyped) *
      100
    ).toFixed(2);

    gridDate.push([
      element.question,
      element.ebbinghausValue,
      element.timesErrored,
      element.timesTyped,
      accuracy,
    ]);
  });

  const grid = new Grid({
    pagination: {
      limit: 10,
      summary: true,
    },
    columns: ['FLASHCARD', 'EBBINGHAUS LEVEL', 'ERRORS', 'TIMES', 'ACCURACY'],
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
export default CMdashboardTable;
