import { State, action, computed } from 'easy-peasy';
import type {
  testTakenAnalytics,
  testHistoryAnalyticsActionModel,
} from '../../../src/models/testHistoryStatAnalytics';

const testHistoryAnalyticalStoreActions: testHistoryAnalyticsActionModel = {
  addAccuracy: action((state, payload) => {
    console.log('PAYLOAD: ' + payload);
    const storedAccuracy = JSON.parse(
      localStorage.getItem('TestAccuracy') || '[]',
    );
    localStorage.setItem(
      'TestAccuracy',
      JSON.stringify([...storedAccuracy, ...payload]),
    );
    state.currAccuracy = state.currAccuracy.concat(payload);
  }),
  addConsistency: action((state, payload) => {
    console.log('PAYLOAD: ' + payload);
    const storedCons = JSON.parse(
      localStorage.getItem('TestConsistency') || '[]',
    );
    localStorage.setItem(
      'TestConsistency',
      JSON.stringify([...storedCons, ...payload]),
    );
    state.currConsistency = state.currConsistency.concat(payload);
  }),
  addTestDate: action((state, payload) => {
    console.log('PAYLOAD: ' + payload);
    const storedDate = JSON.parse(localStorage.getItem('TestDate') || '[]');
    localStorage.setItem(
      'TestDate',
      JSON.stringify([...storedDate, ...payload]),
    );
    state.currentTestDate = state.currentTestDate.concat(payload);
  }),
  addTestErrors: action((state, payload) => {
    console.log('PAYLOAD: ' + payload);
    const storedErr = JSON.parse(localStorage.getItem('TestErrors') || '[]');
    localStorage.setItem(
      'TestErrors',
      JSON.stringify([...storedErr, ...payload]),
    );
    state.currErrors = state.currErrors.concat(payload);
  }),
  addTestCPM: action((state, payload) => {
    console.log('PAYLOAD: ' + payload);
    const storedCPM = JSON.parse(localStorage.getItem('TestCPM') || '[]');
    localStorage.setItem('TestCPM', JSON.stringify([...storedCPM, ...payload]));
    state.currCPM = state.currCPM.concat(payload);
  }),
  addCPMTopSpeed: action((state, payload) => {
    console.log('PAYLOAD: ' + payload);
    localStorage.setItem('CPMTopSpeed', JSON.stringify(payload));
    state.currCPMTopSpeed = payload;
  }),
  addChMChordsMastered: action((state, payload) => {
    console.log('PAYLOAD: ' + payload);
    localStorage.setItem('ChMChordsMastered', JSON.stringify(payload));
    state.currChMChordsMastered = payload;
  }),
}; // closing for testHistoryAnalyticalStoreActions

export default testHistoryAnalyticalStoreActions;
