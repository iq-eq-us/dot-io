import type { TrainingScenario } from './trainingScenario';

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
}

export interface TrainingStatistics {
  statistics: ChordStatisticsFromDevice[];
}

export const createEmptyChordStatisticsFromDevice = (
  id: string,
  scenario?: TrainingScenario,
  inChordsMastered?: Array<number>,
): ChordStatisticsFromDevice => {
  return {
    id,
    displayTitle: id,
    averageSpeed: 0,
    lastSpeed: 0,
    numberOfErrors: 0,
    numberOfOccurrences: 0,
    scenario,
    chordsMastered: inChordsMastered,
    dateAdded: new Date(),
  };
};

/** Expressed in deciseconds, or units of 1/10 of a second */
export const MAXIMUM_ALLOWED_SPEED_FOR_CHORD_STATS = 500;
