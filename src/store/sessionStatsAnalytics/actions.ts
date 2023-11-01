import { action } from 'easy-peasy';
import type { sessionStatsAnalyticalActionModel } from '../../../src/models/sessionStatisticsAnalytics';

const sessionStatsAnalyticalStoreActions: sessionStatsAnalyticalActionModel = {
  // adding term count
  addSessionStatsAnalytical: action((state, payload) => {
    // find local storage
    let oldHistory = JSON.parse(localStorage.getItem('sessionStatsHistory'));

    // if it doesn't exist, create it
    if (oldHistory === null) {
      oldHistory = [];
    }

    // setting state to history (either local storage or empty array)
    state.sessionStatsHistory = oldHistory;

    // gets sum of all days you've completed terms (aka the total number of terms from history)
    // need running sum to subtract from payload
    const runningSum = state.sessionStatsHistory.reduce(
      (numTerms, currSum) => numTerms + currSum.numberOfChordsMastered,
      0,
    );

    // console.log(`payload is ${payload}, running sum is ${runningSum}, and state.sessionStatsHistory is ${JSON.stringify(state.sessionStatsHistory)}`);

    // getting new date and setting to current day
    const date = new Date();
    // format the date as "YYYY/MM/DD"
    // need to format for heatmap
    const dateStr = `${date.getFullYear()}/${
      date.getMonth() + 1
    }/${date.getDate()}`; // "2021/7/1
    // console.log('dateStr: ' + dateStr);

    let updatedFlag = false; // for checking if the day already exists
    for (let i = 0; i < state.sessionStatsHistory.length; i++) {
      // checking if the day already exists
      if (state.sessionStatsHistory[i].sessionDate === dateStr) {
        // if the day already exists, update the number of terms completed
        // checking if payload is less than the number of terms already recorded for today
        if (state.sessionStatsHistory[i].numberOfChordsMastered < payload) {
          state.sessionStatsHistory[i].numberOfChordsMastered = Math.abs(
            payload -
              (runningSum -
                state.sessionStatsHistory[i].numberOfChordsMastered),
          ); // getting the actual number of new terms
        }
        updatedFlag = true; // updating flag to true because day already exists
      }
    }

    // if day does not exist, create a new day and set number of terms to zero
    if (!updatedFlag) {
      state.sessionStatsHistory.push({
        sessionDate: dateStr,
        numberOfChordsMastered: 0,
      });
    }

    // saving current state to local storage
    localStorage.setItem(
      'sessionStatsHistory',
      JSON.stringify(state.sessionStatsHistory),
    );

    console.log(
      'Inside actions, current state: ' +
        JSON.stringify(state.sessionStatsHistory),
    );
  }),
};

export default sessionStatsAnalyticalStoreActions;
