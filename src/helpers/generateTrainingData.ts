import { chordLibrary } from '../data/chordLibrary';
import type { ChordStatistics } from '../models/trainingStatistics';

const getRandomElementFromArray = (list: any[]) =>
  list[Math.floor(Math.random() * list.length)];

/**
 * Generates a list of training chord, all of which being characters, based off of the users existing stats
 * If the recursion rate is high enough, this will provide chords that have been typed slowly
 * Otherwise, it will provide chords at random
 *
 * @param stats - The chord stats used to select the chords with the highest numeric speed
 * @param recursionRate - The chance that a chord will be selected based on speed rather than at random
 * @param recursionDepth - The number of stats to choose from out of the entire list
 * @param lineLength - The length of the total line to generate
 * @param recursionIsEnabledGlobally - Whether recursion should be used at all, overrides all other choices
 */
export const generateCharacterTrainingDataWithRecursionRate = (
  stats: ChordStatistics[],
  recursionRate: number,
  numberOfChords: number,
  recursionDepth: number,
  recursionIsEnabledGlobally: boolean,
): string[] => {
  return generateGenericTrainingData(
    stats,
    recursionDepth,
    numberOfChords,
    recursionRate,
    chordLibrary.letters,
    recursionIsEnabledGlobally,
  );
};

/**
 * Generates a list of training chords, based off of the users existing stats, coming from chordLibrary.chords
 * If the recursion rate is high enough, this will provide chords that have been typed slowly
 * Otherwise, it will provide chords at random
 *
 * @param stats - The chord stats used to select the chords with the highest numeric speed
 * @param recursionRate - The chance that a chord will be selected based on speed rather than at random
 * @param recursionDepth - The number of stats to choose from out of the entire list
 * @param lineLength - The length of the total line to generate
 * @param recursionIsEnabledGlobally - Whether recursion should be used at all, overrides all other choices
 */
export const generateChordTrainingDataWithRecursionRate = (
  stats: ChordStatistics[],
  recursionRate: number,
  numberOfChords: number,
  recursionDepth: number,
  recursionIsEnabledGlobally: boolean,
): string[] => {
  return generateGenericTrainingData(
    stats,
    recursionDepth,
    numberOfChords,
    recursionRate,
    chordLibrary.chords,
    recursionIsEnabledGlobally,
  );
};

/**
 * Generates a list of training chords, based off of the users existing stats, coming from chordLibrary.chords
 * If the recursion rate is high enough, this will provide chords that have been typed slowly
 * Otherwise, it will provide chords at random
 *
 * @param stats - The chord stats used to select the chords with the highest numeric speed
 * @param recursionRate - The chance that a chord will be selected based on speed rather than at random
 * @param recursionDepth - The number of stats to choose from out of the entire list
 * @param lineLength - The length of the total line to generate
 * @param recursionIsEnabledGlobally - Whether recursion should be used at all, overrides all other choices
 */
export const generateTrigramTrainingDataWithRecursionRate = (
  stats: ChordStatistics[],
  recursionRate: number,
  numberOfChords: number,
  recursionDepth: number,
  recursionIsEnabledGlobally: boolean,
): string[] => {
  return generateGenericTrainingData(
    stats,
    recursionDepth,
    numberOfChords,
    recursionRate,
    chordLibrary.trigrams,
    recursionIsEnabledGlobally,
  );
};

/**
 * Generates a list of training chords, based off of the users existing stats, coming from chordLibrary.chords
 * If the recursion rate is high enough, this will provide chords that have been typed slowly
 * Otherwise, it will provide chords at random
 *
 * @param stats - The chord stats used to select the chords with the highest numeric speed
 * @param recursionRate - The chance that a chord will be selected based on speed rather than at random
 * @param recursionDepth - The number of stats to choose from out of the entire list
 * @param lineLength - The length of the total line to generate
 * @param recursionIsEnabledGlobally - Whether recursion should be used at all, overrides all other choices
 */
export const generateLexicalTrainingDataWithRecursionRate = (
  stats: ChordStatistics[],
  recursionRate: number,
  numberOfChords: number,
  recursionDepth: number,
  recursionIsEnabledGlobally: boolean,
): string[] => {
  return generateGenericTrainingData(
    stats,
    recursionDepth,
    numberOfChords,
    recursionRate,
    chordLibrary.lexical,
    recursionIsEnabledGlobally,
  );
};

/**
 * Generates a list of training chords, based off of the users existing stats, coming from the supplied `chords` parameter
 * If the recursion rate is high enough, this will provide chords that have been typed slowly
 * Otherwise, it will provide chords at random
 *
 * @param stats - The chord stats used to select the chords with the highest numeric speed
 * @param recursionRate - The chance that a chord will be selected based on speed rather than at random
 * @param recursionDepth - The number of stats to choose from out of the entire list
 * @param lineLength - The number of chords to generate for this line
 * @param chords - The chords to select from if the recursive choice is not chosen
 */
function generateGenericTrainingData(
  stats: ChordStatistics[],
  recursionDepth: number,
  lineLength: number,
  recursionRate: number,
  chords: Record<string, string[]>,
  recursionIsEnabledGlobally: boolean,
): string[] {
  const allCharacters = [];
  const chordsSortedByTypingSpeed = stats.sort(
    (a, b) => b.averageSpeed - a.averageSpeed,
  );
  const slowestTypedChordsAccountingForDepth = chordsSortedByTypingSpeed
    .slice(0, recursionDepth)
    .map((s) => s.id);
  const chordLibraryCharacters = Object.keys(chords);

  while (allCharacters.join('').length < lineLength) {
    const shouldChooseBasedOnSpeed = recursionRate > Math.random() * 100;
    if (
      shouldChooseBasedOnSpeed &&
      recursionDepth > 0 &&
      recursionIsEnabledGlobally
    )
      allCharacters.push(
        getRandomElementFromArray(slowestTypedChordsAccountingForDepth),
      );
    else allCharacters.push(getRandomElementFromArray(chordLibraryCharacters));
  }

  return allCharacters;
}
