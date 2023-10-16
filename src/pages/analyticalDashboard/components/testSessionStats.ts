import React, { useState, ReactElement, useRef } from 'react';
import sessionStatsAnalyticalStoreActions from '../../../store/sessionStatsAnalytics/actions';
import store, { useStoreState, useStoreActions } from '../../../store/store';
import { toInteger } from 'lodash';
// Simply a test file to make sure other logic is working.

function sessionStatHistoryTest() {
  console.log('Inside test dataset.');

  const sessionHistoryTest = [
    {
      numberOfChordsMastered: 5,
    },
    {
      numberOfChordsMastered: 10,
    },
    {
      numberOfChordsMastered: 15,
    },
    {
      numberOfChordsMastered: 20,
    },
  ];

  const sessionStatHistory = [
    ['numberOfChordsMastered'],
    ...sessionHistoryTest.map((session) => [session.numberOfChordsMastered]),
  ]
    .map((session) => session.join(','))
    .join('\n');

  // debugging
  console.log(sessionStatHistory);
  console.log(
    'trying to store current number of words mastered:' +
      sessionHistoryTest[0].numberOfChordsMastered,
  );
  console.log(
    store
      .getActions()
      .addSessionStatsAnalytical(
        toInteger(sessionHistoryTest[0].numberOfChordsMastered),
      ),
  );
  console.log('stored current number of words mastered');
  console.log(
    'Getting stored number of chords mastered is: ' +
      store.getState().currNumberOfChordsMastered,
  );
}

export default sessionStatHistoryTest;
