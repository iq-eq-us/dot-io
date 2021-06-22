import type { SectorGroupSpecifier } from 'src/models/sectorGroupSpecifier';
import { chordLibrary } from '../data/chordLibrary';
import { keyPositions } from '../data/keyPositions';

export type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';

export interface KeyHighlightPosition {
  direction: Direction;
  sectorGroup: SectorGroupSpecifier;
}

export const ConvertStringToKeyHighlightPositions = (
  text: string,
): KeyHighlightPosition[] => {
  const chord = chordLibrary?.[text];
  if (chord) {
    const keyHighlightPositionsBeforeTransformation = chord.map(
      (nonTransformedKeyPosition) => keyPositions?.[nonTransformedKeyPosition],
    );
    return keyHighlightPositionsBeforeTransformation;
  }

  return [];
};
