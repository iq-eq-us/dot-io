import { chordLibrary } from '../data/chordLibrary';

const generateNRandomLetters = (n: number) => {
  const array = [];
  for (let i = 0; i < n; i++)
    array.push(String.fromCharCode(97 + Math.floor(Math.random() * 26)));

  return array;
};

export const generateCharacterTrainingData = (): string[][] => {
  return [generateNRandomLetters(20)];
};

export const generateTrigramTrainingData = (): string[][] => {
  return [['thing', 'nto', 'ive', 'hem', 'ast', 'his', 'ion', 'din', 'and']];
};

export const generateLexicalTrainingData = (): string[][] => {
  return [
    [
      'up',
      'soon',
      'those',
      'talk',
      'use',
      'mean',
      'enough',
      'hear',
      'should',
      'this',
    ],
  ];
};

/**
 * Generates an array multi-dimensional array of chords based on the number of lines, and the number of characters to include in each line
 * @param numberOfLines - Number of lines of chords to generate
 * @param lengthOfIndividualLines - Number of characters that should be included in each line
 */
export const generateChordsForChordedTrainingRandomly = (
  numberOfLines: number,
  lengthOfIndividualLines: number,
): string[][] => {
  const chordKeys = Object.keys(chordLibrary.chords);
  const totalChords: string[][] = [];

  const getLengthOfLine = (outerIndex: number, chords: string[][]) =>
    chords[outerIndex].reduce((previous, current) => previous + current, '')
      .length;

  for (let i = 0; i < numberOfLines; i++) {
    if (!totalChords[i]) totalChords[i] = [];

    while (getLengthOfLine(i, totalChords) < lengthOfIndividualLines) {
      const randomObjectKey =
        chordKeys[Math.floor(Math.random() * chordKeys.length)];
      totalChords[i].push(randomObjectKey);
    }
  }

  return totalChords;
};
