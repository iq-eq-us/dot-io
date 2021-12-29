import type { ChordLibraryRecord } from '../data/chordLibrary';
import type { ChordStatistics } from '../models/trainingStatistics';

const getRandomElementFromArray = <T>(list: T[]): T =>
  list[Math.floor(Math.random() * list.length)];

interface ChordGenerationParameters {
  stats: ChordStatistics[];
  recursionRate: number;
  numberOfTargetChords: number;
  lineLength: number;
  chordsToChooseFrom: ChordLibraryRecord;
  recursionIsEnabledGlobally: boolean;
  speedGoal: number;
}

/**
 * Generates a list of training chords, based off of the users existing stats, coming from the supplied `chords` parameter
 * If the recursion rate is high enough, this will provide chords that have been typed slowly
 * Otherwise, it will provide chords at random
 *
 * @param parameters
 * @see {@link ChordGenerationParameters}
 */
export const generateChords = (
  parameters: ChordGenerationParameters,
): string[] => {
  // * Uncomment the next two lines to use just the alphabet to test with
  // const IS_TESTING = true;
  // if (IS_TESTING) return [...'abcdefghijklmnopqrstuvwxyz'.split('')];

  const chordsSortedByTypingSpeed = parameters.stats.sort(
    (a, b) => b.averageSpeed - a.averageSpeed,
  );

  let chordToFeed = '';
  const numberOfChordsNotConquered = parameters.stats.filter(
    (s) => s.averageSpeed > parameters.speedGoal || s.averageSpeed === 0,
  ).length;
  if (numberOfChordsNotConquered > 0) {
    // Check for one remaining chord with zero speed
    // This happens on the first pass through the chord library
    const chordsWithZeroSpeed = parameters.stats.filter(
      (stat) => stat.averageSpeed === 0,
    );
    if (chordsWithZeroSpeed.length > 0)
      chordToFeed = getRandomElementFromArray(chordsWithZeroSpeed).displayTitle;
    // If there is no chord with zero speed, then we move onto the highest
    else chordToFeed = chordsSortedByTypingSpeed[0].displayTitle;
  }

  const allCharacters: string[] = [chordToFeed].filter((a) => !!a);

  const slowestTypedChordsAccountingForDepth = chordsSortedByTypingSpeed
    .slice(0, parameters.numberOfTargetChords)
    .map((s) => s.id);
  const chordLibraryCharacters = Object.keys(parameters.chordsToChooseFrom);

  while (allCharacters.join('').length < parameters.lineLength) {
    const shouldChooseBasedOnSpeed =
      parameters.recursionRate > Math.random() * 100;
    if (
      shouldChooseBasedOnSpeed &&
      parameters.numberOfTargetChords > 0 &&
      parameters.recursionIsEnabledGlobally
    )
      allCharacters.push(
        getRandomElementFromArray(slowestTypedChordsAccountingForDepth),
      );
    else allCharacters.push(getRandomElementFromArray(chordLibraryCharacters));
  }
  return allCharacters;
};
