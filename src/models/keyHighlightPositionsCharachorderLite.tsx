import type { RowGroupSpecifier } from './sectorGroupCharachorderLite';

export type Position = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 ;
export type Row = 1 | 2 | 3 | 4 | 5 ;

export interface KeyHighlightPositionLite {
  position: Position;
  rowGroup: RowGroupSpecifier;
}
