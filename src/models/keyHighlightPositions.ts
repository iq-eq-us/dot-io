import type { SectorGroupSpecifier } from './sectorGroup';

export type Direction = 'NORTH' | 'EAST' | 'SOUTH' | 'WEST';

export interface KeyHighlightPosition {
  direction: Direction;
  sectorGroup: SectorGroupSpecifier;
}
