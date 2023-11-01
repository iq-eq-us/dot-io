import type { SessionStatsAnalyticalStoreModel } from '../../../src/models/sessionStatisticsAnalytics';
import sessionStatsAnalyticalStoreStateModel from './state';
import sessionStatsAnalyticalActionModel from './actions';

const sessionStatsAnalyticalStore: SessionStatsAnalyticalStoreModel = {
  ...sessionStatsAnalyticalStoreStateModel,
  ...sessionStatsAnalyticalActionModel,
};

export { sessionStatsAnalyticalStore };
