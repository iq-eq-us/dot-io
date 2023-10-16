import { State, action, computed } from 'easy-peasy';
import type {
  sessionStatsAnalyticalHistory,
  sessionStatsAnalyticalActionModel,
} from '../../../src/models/sessionStatisticsAnalytics';

const sessionStatsAnalyticalStoreActions: sessionStatsAnalyticalActionModel = {
  addSessionStatsAnalytical: action((state, payload) => {
    console.log('PAYLOAD: ' + payload);
    state.currNumberOfChordsMastered = payload;
  }),
}; // closing for sessionStatsAnalyticalActions

export default sessionStatsAnalyticalStoreActions;
