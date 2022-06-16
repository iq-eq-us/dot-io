import type { KeyboardKey } from './keyboardKey';

export const AltKey: KeyboardKey = {
  title: 'Alt',
  id: 1,
  titleTransformOverride: 'rotate(135deg) translate(5px, 3px)',
};

export const NumShiftKey: KeyboardKey = {
  title: 'Num Shift',
  id: 2,
  titleTransformOverride: 'rotate(135deg) translate(8px, 17px) scale(0.8)',
};

export const AmbiThrowKey: KeyboardKey = {
  title: 'Ambi Throw',
  id: 3,
  titleTransformOverride: 'rotate(-45deg) translate(-10px, -20px) scale(0.8)',
};

export const ShiftKey: KeyboardKey = {
  title: 'Shift',
  id: 4,
  titleTransformOverride: 'rotate(135deg) translate(12px, 8px)',
};

export const CtrlKey: KeyboardKey = {
  title: 'Ctrl',
  id: 5,
  titleTransformOverride: 'rotate(135deg) translate(8px, 2px)',
};

export const BlankKey: KeyboardKey = {
  title: '',
  id: -1,
};

export const  KeyboardKeysMap: Record<number, KeyboardKey> = {
  [-1]: BlankKey,
  1: AltKey,
  2: NumShiftKey,
  3: AmbiThrowKey,
  4: ShiftKey,
  5: CtrlKey,
  6: {
    title: ',',
    id: 6,
  },
  7: {
    title: "'",
    id: 7,
  },
  8: {
    title: 'U',
    id: 8,
  },
  9: {
    title: 'Del',
    id: 9,
    titleTransformOverride: 'rotate(135deg) translate(8px, 2px)',
  },
  10: {
    title: '.',
    id: 10,
  },
  11: {
    title: 'I',
    id: 11,
  },
  12: {
    title: 'O',
    id: 12,
  },
  13: {
    title: 'BS',
    id: 13,
    titleTransformOverride: 'rotate(135deg) translate(5px, 1px)',
  },
  14: {
    title: 'R',
    id: 14,
  },
  15: {
    title: 'E',
    id: 15,
  },
  16: {
    title: 'Space',
    id: 16,
    titleTransformOverride: 'rotate(135deg) translate(13px, 10px) scale(0.8)',
  },
  17: {
    title: 'V',
    id: 17,
  },
  18: {
    title: 'M',
    id: 18,
  },
  19: {
    title: 'K',
    id: 19,
  },
  20: {
    title: 'C',
    id: 20,
  },
  21: {
    title: 'Click',
    id: 21,
    titleTransformOverride: 'rotate(135deg) translate(10px, 6px)',
  },
  22: {
    title: 'W',
    id: 22,
  },
  23: {
    title: 'Z',
    id: 23,
  },
  24: {
    title: 'G',
    id: 24,
  },
  25: {
    title: '_',
    id: 25,
    titleTransformOverride: 'translate(8px, 10px) rotate(135deg)',
  },
  26: {
    title: 'Middle Click',
    id: 26,
    titleTransformOverride: 'translate(-25px, -5px) rotate(135deg) scale(0.65)',
  },
  27: {
    title: 'Esc',
    id: 27,
    titleTransformOverride: 'rotate(-45deg) translate(-8px, -5px)',
  },
  28: {
    title: 'Win',
    id: 28,
    titleTransformOverride: 'rotate(135deg) translate(10px, 7px)',
  },
  // Arrows Keys Control
  29: {
    title: '🠕',
    id: 29,
  },
  30: {
    title: '🠖',
    id: 30,
  },
  31: {
    title: '🠔',
    id: 31,
  },
  32: {
    title: '🠗',
    id: 32,
  },
  33: {
    title: 'Enter',
    id: 33,
    titleTransformOverride: 'rotate(135deg) translate(12px, 7px)',
  },
  34: {
    title: 'A',
    id: 34,
  },
  35: {
    title: 'T',
    id: 35,
  },
  36: {
    title: '_',
    id: 36,
  },
  // Mouse Control Keys
  37: {
    title: '🠕',
    id: 37,
  },
  38: {
    title: '🠖',
    id: 38,
  },
  39: {
    title: '🠔',
    id: 39,
  },
  40: {
    title: '🠗',
    id: 40,
  },
  41: {
    title: 'Tab',
    id: 41,
    titleTransformOverride: 'rotate(135deg) translate(10px, 6px)',
  },
  42: {
    title: 'L',
    id: 42,
  },
  43: {
    title: 'N',
    id: 43,
  },
  44: {
    title: 'J',
    id: 44,
  },
  45: {
    title: 'Ctrl',
    id: 45,
    titleTransformOverride: 'rotate(135deg) translate(12px, 8px)',
  },
  46: {
    title: 'Y',
    id: 46,
  },
  47: {
    title: 'S',
    id: 47,
  },
  48: {
    title: ';',
    id: 48,
  },
  49: {
    title: 'P',
    id: 49,
  },
  50: {
    title: 'F',
    id: 50,
  },
  51: {
    title: 'D',
    id: 51,
  },
  52: {
    title: 'H',
    id: 52,
  },
  53: {
    title: 'X',
    id: 53,
  },
  54: {
    title: 'B',
    id: 54,
  },
  55: {
    title: 'Q',
    id: 55,
  },
  56: {
    title: 'dup',
    id: 56,
    titleTransformOverride: 'rotate(135deg) translate(8px, 3px)',
  },
  57: {
    title: '?',
    id: 57,
  },
  58: {
    title: 'Right Click',
    id: 58,
    titleTransformOverride: 'rotate(-45deg) translate(-8px, -18px) scale(0.7)',
  },59: {
    title: '1',
    id: 59,
  }
};
