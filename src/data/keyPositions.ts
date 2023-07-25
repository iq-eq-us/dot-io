import type { KeyHighlightPosition } from '../models/keyHighlightPositions';

//SectorGroup 1 includes: Alt, Shift, Mirror, Num Shift
//SectorGroup 2 includes: U, , , ', Ctrl
//SectorGroup 3 includes: O, I, ., Del
//SectorGroup 4 includes: E, BS, Space, R
//SectorGroup 5 includes: K, C, V, M
//SectorGroup 6 includes: Click, W, Z, G
//SectorGroup 7 includes:
//SectorGroup 8 includes:
//SectorGroup 9 includes: A, Enter, T, Space
//SectorGroup 10 includes:
//SectorGroup 11 includes: Tab, L, N, J
//SectorGroup 12 includes: S, Y, ;, Ctrl
//SectorGroup 13 includes:
//SectorGroup 14 includes: P, F, H, D
//SectorGroup 15 includes: B, Q, Dup, X
//SectorGroup 16 includes: ?, Win, Esc, Right Click

export const keyPositions: Record<string, KeyHighlightPosition> = {
  '317-57': {
    //A
    sectorGroup: 9,
    direction: 'WEST',
  },
  '316-180': {
    //B
    sectorGroup: 15,
    direction: 'WEST',
  },
  '140-44': {
    //O
    sectorGroup: 3,
    direction: 'SOUTH',
  },
  '71-60': {
    //U
    sectorGroup: 2,
    direction: 'SOUTH',
  },
  '215-110': {
    sectorGroup: 5,
    direction: 'NORTH',
  },
  '194-82': {
    //E
    sectorGroup: 4,
    direction: 'SOUTH',
  },
  '194-83': {
    sectorGroup: 4,
    direction: 'WEST',
  },
  '303-146': {
    sectorGroup: 14,
    direction: 'SOUTH',
  },
  '187-180': {
    sectorGroup: 6,
    direction: 'WEST',
  },
  '169-18': {
    //I
    sectorGroup: 3,
    direction: 'EAST',
  },
  '169-19': {
    //I
    sectorGroup: 3,
    direction: 'WEST',
  },
  '377-44': {
    sectorGroup: 11,
    direction: 'SOUTH',
  },
  '223-56': {
    sectorGroup: 4,
    direction: 'EAST',
  },
  '371-19': {
    //L
    sectorGroup: 11,
    direction: 'WEST',
  },
  '207-121': {
    sectorGroup: 5,
    direction: 'WEST',
  },
  '224-179': {
    sectorGroup: 6,
    direction: 'EAST',
  },
  '224-180': {
    // Z
    sectorGroup: 6,
    direction: 'SOUTH',
  },
  '439-35': {
    sectorGroup: 12,
    direction: 'WEST',
  },
  '500-62': {
    sectorGroup: 13,
    direction: 'WEST',
  },
  '500-61': {
    sectorGroup: 13,
    direction: 'SOUTH',
  },
  '40-62': {
    sectorGroup: 1,
    direction: 'EAST',
  },
  '40-61': {
    sectorGroup: 1,
    direction: 'WEST',
  },
  '40-63': {
    sectorGroup: 1,
    direction: 'NORTH',
  },
  '40-60': {
    sectorGroup: 1,
    direction: 'SOUTH',
  },
  '333-121': {
    sectorGroup: 14,
    direction: 'EAST',
  },
  '446-60': {
    //S
    sectorGroup: 12,
    direction: 'SOUTH',
  },
  '101-35': {
    sectorGroup: 2,
    direction: 'EAST',
  },
  '243-121': {
    // K
    sectorGroup: 5,
    direction: 'EAST',
  },
  '353-179': {
    sectorGroup: 15,
    direction: 'EAST',
  },
  '214-146': {
    //C
    sectorGroup: 5,
    direction: 'SOUTH',
  },
  '296-121': {
    sectorGroup: 14,
    direction: 'WEST',
  },
  '33-62': {
    sectorGroup: 1,
    direction: 'SOUTH',
  },
  '10-87': {
    sectorGroup: 8,
    direction: 'SOUTH',
  },
  '324-82': {
    sectorGroup: 9,
    direction: 'SOUTH',
  },
  '323-168': {
    sectorGroup: 15,
    direction: 'NORTH',
  },
  '304-110': {
    //P
    sectorGroup: 14,
    direction: 'NORTH',
  },
  '507-87': {
    sectorGroup: 8,
    direction: 'SOUTH',
  },
  '407-18': {
    sectorGroup: 11,
    direction: 'EAST',
  },
  '323-204': {
    sectorGroup: 15,
    direction: 'SOUTH',
  },
  '407-204': {
    // This is ? and /
    sectorGroup: 16,
    direction: 'NORTH',
  },
  '407-205': {
    // ESC
    sectorGroup: 16,
    direction: 'SOUTH',
  },
  '407-206': {
    // WIN
    sectorGroup: 16,
    direction: 'EAST',
  },
  '407-207': {
    // RIGHT CLICK
    sectorGroup: 16,
    direction: 'WEST',
  },
};
