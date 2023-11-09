import type { TrainingScenario } from './trainingScenario';

export interface ChordStatistics {
  [x: string]: any;
  id: string;
  displayTitle: string;
  averageSpeed: number;
  lastSpeed: number;
  numberOfErrors: number;
  numberOfOccurrences: number;
  scenario?: TrainingScenario;
  speedOfLastTen: Array<number>;
}

export interface StoredStMStatistics {
  sentenceIndex: string;
  averageTestSpeed: number;
  speedOfLastTenTests: Array<number>;
  lastSpeed: number;
  numberOfOccurrences: number;
  scenario?: TrainingScenario;
}

export interface ChordStatisticsFromDevice {
  id: string;
  displayTitle: string;
  averageSpeed: number;
  lastSpeed: number;
  numberOfErrors: number;
  numberOfOccurrences: number;
  scenario?: TrainingScenario;
  chordsMastered?: Array<number>;
  dateAdded: Date;
  chord?: Array<string>;
}

export interface TrainingStatistics {
  statistics: ChordStatistics[];
  statisticsFromDevice?: ChordStatisticsFromDevice[];
  stmStatistics?: StoredStMStatistics[];
}

export const createEmptyLexicalStMStatistics = (
  id: string,
  scenario?: TrainingScenario,
): StoredStMStatistics => {
  return {
    sentenceIndex: id,
    averageTestSpeed: 0,
    speedOfLastTenTests: [],
    lastSpeed: 0,
    numberOfOccurrences: 0,
    scenario: scenario,
  };
};

export const createEmptyChordStatistics = (
  id: string,
  scenario?: TrainingScenario,
): ChordStatistics => {
  return {
    id,
    displayTitle: id,
    averageSpeed: 0,
    lastSpeed: 0,
    numberOfErrors: 0,
    numberOfOccurrences: 0,
    scenario,
    speedOfLastTen: [],
  };
};

export const createEmptyChordStatisticsFromDevice = (
  id: string,
  scenario?: TrainingScenario,
  inChordsMastered?: Array<number>,
  inChord?: Array<string>,
): ChordStatisticsFromDevice => {
  return {
    id,
    dateAdded: new Date(),
    displayTitle: id,
    averageSpeed: 0,
    lastSpeed: 0,
    numberOfErrors: 0,
    numberOfOccurrences: 0,
    scenario,
    chordsMastered: inChordsMastered,
    chord: inChord,
  };
};

/** Expressed in deciseconds, or units of 1/10 of a second */
export const MAXIMUM_ALLOWED_SPEED_FOR_CHORD_STATS = 500;
