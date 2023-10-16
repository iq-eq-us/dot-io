import type { Action, ActionOn, Computed, ThunkOn } from 'easy-peasy';

// individual session
export interface sessionStatsAnalytical {
  numberOfChordsMastered: number; // In a session, how many chords mastered
}

// history of sessions
export interface sessionStatsAnalyticalHistory {
  name: string;
  sessionStatsHistory: sessionStatsAnalytical[];
}

// set of actions
export interface sessionStatsAnalyticalActionModel {
  addSessionStatsAnalytical: Action<
    sessionStatsAnalyticalStoreStateModel,
    number
  >;
}

// set of state stores
export interface sessionStatsAnalyticalStoreStateModel {
  currNumberOfChordsMastered: number;
}

export type SessionStatsAnalyticalStoreModel =
  sessionStatsAnalyticalStoreStateModel & sessionStatsAnalyticalActionModel;
