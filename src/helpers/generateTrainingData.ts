export const generateCharacterTrainingData = (): string[][] => {
  return [
    ['p', 'j', 'f', 'v', 'y', 't', 'a', 'd', 'h', 'c', 'q', 'a', 'x'],
    ['a', 'a', 'c', 'd', 'f', 'h', 'j', 'q', 't', 'v', 'x', 'y', 'p'],
    ['y', 'x', 'v', 't', 'q', 'p', 'j', 'h', 'f', 'd', 'c', 'a', 'a'],
  ];
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

export const generateChordTrainingData = (): string[][] => {
  return [
    [
      'about',
      'above',
      'begin',
      'has',
      'about',
      'about',
      'no',
      'about',
      'walk',
      'mile',
    ],
  ];
};
