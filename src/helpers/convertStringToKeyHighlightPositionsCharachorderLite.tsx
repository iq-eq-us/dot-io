import type { KeyHighlightPositionLite } from '../models/keyHighlightPositionsCharachorderLite';
import { chordLibrary } from '../data/chordLibrary';
import { keyPositions } from '../data/keyPositionsCharachorderLite';

export type CharacterEntryModeLite = 'CHARACTER' | 'CHORD';

const SPACE_KEY_LOCATION = keyPositions?.['194-83'];

export const ConvertStringToKeyHighlightPositionsLite = (
  text: string,
  highlightMode: CharacterEntryModeLite,
  characterIndex: number,
): KeyHighlightPositionLite[] => {
  if (highlightMode === 'CHORD') {
    return getHighlightPositionForString(text);
  } else {
    if (characterIndex === -1) return [SPACE_KEY_LOCATION];
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
