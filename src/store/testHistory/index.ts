import type { TestHistoryAnalyticalStoreModel } from '../../../src/models/testHistoryStatAnalytics';
import testHistoryAnalyticsStoreStateModel from './state';
import testHistoryAnalyticsActionModel from './actions';

const testHistoryAnalyticalStore: TestHistoryAnalyticalStoreModel = {
  ...testHistoryAnalyticsStoreStateModel,
  ...testHistoryAnalyticsActionModel,
};

export { testHistoryAnalyticalStore };
