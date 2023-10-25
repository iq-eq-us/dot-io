import type { testHistoryAnalyticsStoreStateModel } from '../../../src/models/testHistoryStatAnalytics';

// default state for sessionStatsAnalyticalStore
const testHistoryAnalyticalStoreState: testHistoryAnalyticsStoreStateModel = {
  currAccuracy: [],
  currConsistency: [],
  currentTestDate: [],
  currErrors: [],
  //currCPM: [],
};

export default testHistoryAnalyticalStoreState;
