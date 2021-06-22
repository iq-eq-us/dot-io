import {
  KeyboardKeysMap,
  BlankKey,
  AltKey,
  NumShiftKey,
  ShiftKey,
  AmbiThrowKey,
  CtrlKey,
} from './keyboardKeysMap';
import type { SectorGroupData, SectorGroupSpecifier } from './sectorGroup';

export const BlankSectorGroupData = {
  topKey: BlankKey,
  leftKey: BlankKey,
  rightKey: BlankKey,
  bottomKey: BlankKey,
};

export const SectorGroupMap: Record<SectorGroupSpecifier, SectorGroupData> = {
  1: {
    topKey: AltKey,
    leftKey: NumShiftKey,
    rightKey: ShiftKey,
    bottomKey: AmbiThrowKey,
  },
  2: {
    topKey: CtrlKey,
    leftKey: KeyboardKeysMap[6],
    rightKey: KeyboardKeysMap[7],
    bottomKey: KeyboardKeysMap[8],
  },
  3: {
    topKey: KeyboardKeysMap[9],
    leftKey: KeyboardKeysMap[10],
    rightKey: KeyboardKeysMap[11],
    bottomKey: KeyboardKeysMap[12],
  },
  4: {
    topKey: KeyboardKeysMap[13],
    leftKey: KeyboardKeysMap[16],
    rightKey: KeyboardKeysMap[14],
    bottomKey: KeyboardKeysMap[15],
  },
  5: {
    topKey: KeyboardKeysMap[17],
    leftKey: KeyboardKeysMap[18],
    rightKey: KeyboardKeysMap[19],
    bottomKey: KeyboardKeysMap[20],
  },
  6: {
    topKey: KeyboardKeysMap[21],
    rightKey: KeyboardKeysMap[22],
    bottomKey: KeyboardKeysMap[23],
    leftKey: KeyboardKeysMap[24],
  },
  7: {
    topKey: KeyboardKeysMap[25],
    rightKey: KeyboardKeysMap[26],
    bottomKey: KeyboardKeysMap[27],
    leftKey: KeyboardKeysMap[28],
  },
  8: {
    topKey: KeyboardKeysMap[29],
    rightKey: KeyboardKeysMap[30],
    bottomKey: KeyboardKeysMap[32],
    leftKey: KeyboardKeysMap[31],
  },
  10: {
    topKey: KeyboardKeysMap[37],
    rightKey: KeyboardKeysMap[38],
    bottomKey: KeyboardKeysMap[40],
    leftKey: KeyboardKeysMap[39],
  },
  9: {
    topKey: KeyboardKeysMap[33],
    rightKey: KeyboardKeysMap[36],
    bottomKey: KeyboardKeysMap[35],
    leftKey: KeyboardKeysMap[34],
  },
  11: {
    topKey: KeyboardKeysMap[41],
    rightKey: KeyboardKeysMap[44],
    bottomKey: KeyboardKeysMap[43],
    leftKey: KeyboardKeysMap[42],
  },
  12: {
    topKey: KeyboardKeysMap[45],
    rightKey: KeyboardKeysMap[48],
    bottomKey: KeyboardKeysMap[47],
    leftKey: KeyboardKeysMap[46],
  },
  13: {
    topKey: AltKey,
    leftKey: ShiftKey,
    rightKey: NumShiftKey,
    bottomKey: AmbiThrowKey,
  },
  14: {
    topKey: KeyboardKeysMap[49],
    leftKey: KeyboardKeysMap[50],
    rightKey: KeyboardKeysMap[52],
    bottomKey: KeyboardKeysMap[51],
  },
  15: {
    topKey: KeyboardKeysMap[53],
    leftKey: KeyboardKeysMap[54],
    rightKey: KeyboardKeysMap[56],
    bottomKey: KeyboardKeysMap[55],
  },
  16: {
    topKey: KeyboardKeysMap[57],
    leftKey: KeyboardKeysMap[58],
    rightKey: KeyboardKeysMap[28],
    bottomKey: KeyboardKeysMap[27],
  },
};
