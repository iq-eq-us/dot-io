import { State, action, computed } from 'easy-peasy';
import type {
  testTakenAnalytics,
  testHistoryAnalyticsActionModel,
} from '../../../src/models/testHistoryStatAnalytics';

const testHistoryAnalyticalStoreActions: testHistoryAnalyticsActionModel = {
  addAccuracy: action((state, payload) => {
    console.log('PAYLOAD: ' + payload);
    const storedAccuracy = JSON.parse(
      localStorage.getItem('TestAccuracy5') || '[]',
    );
    localStorage.setItem(
      'TestAccuracy5',
      JSON.stringify([...storedAccuracy, ...payload]),
    );
    state.currAccuracy = state.currAccuracy.concat(payload);
  }),
  addConsistency: action((state, payload) => {
    console.log('PAYLOAD: ' + payload);
    const storedCons = JSON.parse(
      localStorage.getItem('TestConsistency5') || '[]',
    );
    localStorage.setItem(
      'TestConsistency5',
      JSON.stringify([...storedCons, ...payload]),
    );
    state.currConsistency = state.currConsistency.concat(payload);
  }),
  addTestDate: action((state, payload) => {
    console.log('PAYLOAD: ' + payload);
    const storedDate = JSON.parse(localStorage.getItem('TestDate5') || '[]');
    localStorage.setItem(
      'TestDate5',
      JSON.stringify([...storedDate, ...payload]),
    );
    state.currentTestDate = state.currentTestDate.concat(payload);
  }),
  addTestErrors: action((state, payload) => {
    console.log('PAYLOAD: ' + payload);
    const storedErr = JSON.parse(localStorage.getItem('TestErrors5') || '[]');
    localStorage.setItem(
      'TestErrors5',
      JSON.stringify([...storedErr, ...payload]),
    );
    state.currErrors = state.currErrors.concat(payload);
  }),
  /* addTestCPM: action((state, payload) => {
    console.log('PAYLOAD: ' + payload);
    const storedCPM = JSON.parse(localStorage.getItem('TestCPM4') || '[]');
    localStorage.setItem('TestCPM4', JSON.stringify([...storedCPM, ...payload]));
    state.currCPM = state.currCPM.concat(payload);
  }) */
}; // closing for testHistoryAnalyticalStoreActions

export default testHistoryAnalyticalStoreActions;
