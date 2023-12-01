import type { Action, ActionOn, Computed, ThunkOn } from 'easy-peasy';

// individual session
export interface testHistoryAnalytics {
  accuracy: number[];
  consistency: number[];
  testDate: string[];
  errors: number[];
  testCPM: number[];
  CPMTopSpeed: number;
  ChMChordsMastered: number;
}

// history of sessions
export interface testTakenAnalytics {
  name: string;
  testsTaken: testHistoryAnalytics[];
}

// set of actions
export interface testHistoryAnalyticsActionModel {
  addAccuracy: Action<testHistoryAnalyticsStoreStateModel, number[]>;
  addConsistency: Action<testHistoryAnalyticsStoreStateModel, number[]>;
  addTestDate: Action<testHistoryAnalyticsStoreStateModel, string[]>;
  addTestErrors: Action<testHistoryAnalyticsStoreStateModel, number[]>;
  addTestCPM: Action<testHistoryAnalyticsStoreStateModel, number[]>;
  addCPMTopSpeed: Action<testHistoryAnalyticsStoreStateModel, number>;
  addChMChordsMastered: Action<testHistoryAnalyticsStoreStateModel, number>;
}

// set of state stores
export interface testHistoryAnalyticsStoreStateModel {
  currAccuracy: number[];
  currConsistency: number[];
  currentTestDate: string[];
  currErrors: number[];
  currCPM: number[];
  currCPMTopSpeed: number;
  currChMChordsMastered: number;
}

export type TestHistoryAnalyticalStoreModel = testHistoryAnalyticsActionModel &
  testHistoryAnalyticsStoreStateModel;
