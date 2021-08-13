import type { KeyHighlightPosition } from '../models/keyHighlightPositions';
import { chordLibrary } from '../data/chordLibrary';
import { keyPositions } from '../data/keyPositions';

export type CharacterEntryMode = 'CHARACTER' | 'CHORD';

export const ConvertStringToKeyHighlightPositions = (
  text: string,
  highlightMode: CharacterEntryMode,
  characterIndex: number,
): KeyHighlightPosition[] => {
  if (highlightMode === 'CHORD') {
    return getHighlightPositionForString(text);
  } else {
    if (characterIndex === -1) return getHighlightPositionForString(' ');
    return getHighlightPositionForString(text[characterIndex]);
  }
};

const getHighlightPositionForString = (text: string) => {
  const chord = chordLibrary?.all?.[text];
  if (chord) {
    const keyHighlightPositionsBeforeTransformation = chord.map(
      (nonTransformedKeyPosition) => keyPositions?.[nonTransformedKeyPosition],
    );
    return keyHighlightPositionsBeforeTransformation;
  }
  return [];
};
