import type { testHistoryAnalyticsStoreStateModel } from '../../../src/models/testHistoryStatAnalytics';

// default state for sessionStatsAnalyticalStore
const testHistoryAnalyticalStoreState: testHistoryAnalyticsStoreStateModel = {
  currAccuracy: [],
  currConsistency: [],
  currentTestDate: [],
  currErrors: [],
  currCPM: [],
  currCPMTopSpeed: 0,
};

export default testHistoryAnalyticalStoreState;
