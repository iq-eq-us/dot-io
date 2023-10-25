import type { Action, ActionOn, Computed, ThunkOn } from 'easy-peasy';

// each session consists of a date and number of chords mastered
export interface sessionStatsAnalytical {
  sessionDate: string; // Date of session
  numberOfChordsMastered: number; // In a session, how many chords mastered
}

// set of actions
export interface sessionStatsAnalyticalActionModel {
  addSessionStatsAnalytical: Action<
    sessionStatsAnalyticalStoreStateModel,
    number
  >; // don't need to pass in the date, it will be generated
}

// set of state stores
export interface sessionStatsAnalyticalStoreStateModel {
  sessionStatsHistory: sessionStatsAnalytical[];
}

export type SessionStatsAnalyticalStoreModel =
  sessionStatsAnalyticalStoreStateModel & sessionStatsAnalyticalActionModel;
