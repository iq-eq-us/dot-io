import { expect } from 'chai';
import { Actions, createStore } from 'easy-peasy';
import { getCumulativeValueByPropertyName } from '../../helpers/aggregation';
import type { CompleteStoreModel } from '../../models/storeModel';
import { defaultStoreState } from '../../store/store';

const ALPHABET_CHORDS = 'abcdefghijklmnopqrstuvwxyz'.split('');

describe('<App>', () => {
  let timer: IMockPerfomance | null;

  beforeEach(() => {
    timer = mockPerformance();
  });

  afterEach(() => {
    timer?.uninstall();
    timer = null;
  });

  it('can successfully create a store', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    expect(store).is.not.null;
    expect(store).is.not.undefined;
  });

  it('starts at the very first chord in the training text', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const state = store.getState;

    expect(state().currentLineOfTrainingText).to.equal(0);
    expect(state().currentSubindexInTrainingText).to.equal(0);
  });

  it('should generate test data when beginning a training mode', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const state = store.getState;
    const actions = store.getActions;

    expect(state().trainingText).to.be.empty;

    const checkThatTrainingTextIsNotEmptyForMode = (action: () => void) => {
      action();
      expect(state().trainingText).to.not.be.empty;
    };

    checkThatTrainingTextIsNotEmptyForMode(() =>
      actions().beginTrainingMode('ALPHABET'),
    );
    checkThatTrainingTextIsNotEmptyForMode(() =>
      actions().beginTrainingMode('LEXICAL'),
    );
    checkThatTrainingTextIsNotEmptyForMode(() =>
      actions().beginTrainingMode('TRIGRAM'),
    );
    checkThatTrainingTextIsNotEmptyForMode(() =>
      actions().beginTrainingMode('CHORDING'),
    );
  });

  it('moves to second chord after typing the first chord', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const actions = store.getActions;
    const state = store.getState;

    actions().beginTrainingMode('ALPHABET');
    const firstChord = state().targetWord;

    expect(firstChord).to.exist;

    actions().setTypedTrainingText(firstChord || '');

    expect(state().currentLineOfTrainingText).to.equal(0);
    expect(state().currentSubindexInTrainingText).to.equal(1);
  });

  it('moves to the next line of training text after completing the first', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const actions = store.getActions;
    const state = store.getState;

    actions().beginTrainingMode('ALPHABET');
    const firstLineLength =
      state().trainingText[state().currentLineOfTrainingText].length;

    for (let i = 0; i < firstLineLength; i++)
      actions().setTypedTrainingText(state().trainingText[0][i]);

    expect(state().currentLineOfTrainingText).to.equal(1);
    expect(state().currentSubindexInTrainingText).to.equal(0);
  });

  it('generates two new lines of training text when resetting training text', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const actions = store.getActions;
    const state = store.getState;

    actions().beginTrainingMode('ALPHABET');
    const firstLineLength =
      state().trainingText[state().currentLineOfTrainingText].length;

    for (let i = 0; i < firstLineLength; i++)
      actions().setTypedTrainingText(state().trainingText[0][i]);

    expect(state().trainingText.length).to.equal(3);

    actions().resetTrainingText();

    expect(state().trainingText.length).to.equal(2);
  });

  it('does not prompt for spacebar after key in alphabet mode, but does for all other modes', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const actions = store.getActions;
    const state = store.getState;

    const testForCorrectSpacebarBehavior = () => {
      const firstChord =
        state().trainingText[state().currentLineOfTrainingText][
          state().currentSubindexInTrainingText
        ];

      actions().setTypedTrainingText(firstChord);

      expect(state().currentLineOfTrainingText).to.equal(0);
      expect(state().currentSubindexInTrainingText).to.equal(0);

      actions().setTypedTrainingText(firstChord + ' ');

      expect(state().currentLineOfTrainingText).to.equal(0);
      expect(state().currentSubindexInTrainingText).to.equal(1);
    };

    actions().beginTrainingMode('CHORDING');
    testForCorrectSpacebarBehavior();

    actions().beginTrainingMode('LEXICAL');
    testForCorrectSpacebarBehavior();

    actions().beginTrainingMode('TRIGRAM');
    testForCorrectSpacebarBehavior();

    actions().beginTrainingMode('ALPHABET');
    const firstAlphabetChord = state().targetWord as string;

    actions().setTypedTrainingText(firstAlphabetChord);

    expect(state().currentLineOfTrainingText).to.equal(0);
    expect(state().currentSubindexInTrainingText).to.equal(1);
  });

  it('does advance to next level after typing every chord in chord library', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const actions = store.getActions;
    const state = store.getState;

    actions().beginTrainingMode('ALPHABET');

    actions().UNSAFE_setTrainingText([ALPHABET_CHORDS]);

    for (let i = 0; i < ALPHABET_CHORDS.length; i++) {
      timer?.tick(1);
      actions().setTypedTrainingText(ALPHABET_CHORDS[i]);
    }

    expect(state().currentLevel).to.be.greaterThan(0);
  });

  it('does report an error if the user enters an incorrect chord', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const actions = store.getActions;
    const state = store.getState;

    actions().beginTrainingMode('ALPHABET');
    actions().UNSAFE_setTrainingText([ALPHABET_CHORDS]);

    expect(state().errorOccurredWhileAttemptingToTypeTargetChord).to.be.false;

    actions().setTypedTrainingText('d');

    expect(state().errorOccurredWhileAttemptingToTypeTargetChord).to.be.true;

    actions().setTypedTrainingText('a');

    expect(state().errorOccurredWhileAttemptingToTypeTargetChord).to.be.false;

    actions().beginTrainingMode('CHORDING');
    actions().UNSAFE_setTrainingText([['testing', 'fake']]);

    actions().setTypedTrainingText('');
    expect(state().errorOccurredWhileAttemptingToTypeTargetChord).to.be.false;

    actions().setTypedTrainingText('tes');
    expect(state().errorOccurredWhileAttemptingToTypeTargetChord).to.be.false;

    actions().setTypedTrainingText('tet');
    expect(state().errorOccurredWhileAttemptingToTypeTargetChord).to.be.true;

    actions().setTypedTrainingText('testing ');
    expect(state().errorOccurredWhileAttemptingToTypeTargetChord).to.be.false;
  });

  it('Adds target chords if you take too long to type', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const actions = store.getActions;
    const state = store.getState;

    actions().beginTrainingMode('ALPHABET');

    const firstChord = state().targetWord + '';
    actions().setTypedTrainingText(firstChord);

    timer?.tick(3000);

    const nextChord = state().targetWord + '';
    actions().setTypedTrainingText(nextChord);

    expect(state().trainingSettings.targetChords).to.equal(1);
  });

  it('Correctly calculates your speed goal', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const actions = store.getActions;
    const state = store.getState;

    actions().beginTrainingMode('ALPHABET');
    actions().UNSAFE_setTrainingText([ALPHABET_CHORDS]);

    for (let i = 0; i < ALPHABET_CHORDS.length; i++) {
      timer?.tick(100);
      actions().setTypedTrainingText(ALPHABET_CHORDS[i]);
    }

    const newSpeedGoal =
      state().trainingStatistics.statistics.sort(
        (a, b) => b.averageSpeed - a.averageSpeed,
      )[0].averageSpeed - 1;

    expect(state().trainingSettings.speedGoal).to.be.lessThan(200);
    expect(state().trainingSettings.speedGoal).to.equal(
      Math.floor(newSpeedGoal),
    );
  });

  it('correctly calculates your recursion rate in alphabet mode', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const actions = store.getActions;
    const state = store.getState;

    actions().beginTrainingMode('ALPHABET');
    expect(state().trainingSettings.recursionRate).to.equal(0);

    timer?.tick(100);
    actions().setTypedTrainingText(state().targetWord + '');

    timer?.tick(2500);
    actions().setTypedTrainingText(state().targetWord + '');
    expect(state().trainingSettings.recursionRate).to.equal(35);

    timer?.tick(2500);
    actions().setTypedTrainingText(state().targetWord + '');
    expect(state().trainingSettings.recursionRate).to.equal(70);

    timer?.tick(2500);
    actions().setTypedTrainingText(state().targetWord + '');
    expect(state().trainingSettings.recursionRate).to.equal(95);
  });

  it('correctly calculates your recursion rate in lexical mode', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const actions = store.getActions;
    const state = store.getState;

    actions().beginTrainingMode('LEXICAL');
    testRecursionRatePercentageInMode(actions, state);
  });

  it('correctly calculates your recursion rate in chord mode', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const actions = store.getActions;
    const state = store.getState;

    actions().beginTrainingMode('CHORDING');
    testRecursionRatePercentageInMode(actions, state);
  });

  it('correctly calculates your recursion rate in trigram mode', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const actions = store.getActions;
    const state = store.getState;

    actions().beginTrainingMode('TRIGRAM');
    testRecursionRatePercentageInMode(actions, state);
  });

  it('only updates settings if set to "auto"', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const actions = store.getActions;
    const state = store.getState;

    actions().beginTrainingMode('ALPHABET');

    actions().setTrainingSettings({
      ...state().trainingSettings,
      autoOrCustom: 'CUSTOM',
    });

    const oldSettings = JSON.stringify(state().trainingSettings);

    for (let i = 0; i < ALPHABET_CHORDS.length; i++) {
      timer?.tick(3000);
      actions().setTypedTrainingText(ALPHABET_CHORDS[i]);
    }

    expect(JSON.stringify(state().trainingSettings)).to.equal(oldSettings);
  });

  it('saves results if autowrite is enabled', () => {
    const store = createStore<CompleteStoreModel>(defaultStoreState);
    const actions = store.getActions;
    const state = store.getState;

    const { numberOfKeysAfterTraining, numberOfKeysBeforeTraining } =
      trainAlphabet(actions, state, timer);

    expect(numberOfKeysAfterTraining).to.be.greaterThan(
      numberOfKeysBeforeTraining,
    );

    // Do this twice to cover both code paths of settings vs merging
    // In the statisticsStorageStore file
    const {
      numberOfKeysAfterTraining: afterTrainingAgain,
      numberOfKeysBeforeTraining: beforeTrainingAgain,
    } = trainAlphabet(actions, state, timer);

    expect(afterTrainingAgain).to.be.greaterThan(beforeTrainingAgain);

    actions().clearAllStorage();

    expect(state().totalSavedCharacterChordStats.statistics.length).to.equal(0);
  });

  const testRecursionRatePercentageInMode = (
    actions: () => Actions<CompleteStoreModel>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    state: () => any,
  ) => {
    timer?.tick(100);
    actions().setTypedTrainingText(state().targetWord + ' ');

    timer?.tick(2500);
    actions().setTypedTrainingText(state().targetWord + ' ');
    expect(state().trainingSettings.recursionRate).to.equal(20);

    timer?.tick(2500);
    actions().setTypedTrainingText(state().targetWord + ' ');
    expect(state().trainingSettings.recursionRate).to.equal(28);
  };
});

/**
 * This mock performance function overrides the default `performance` object present on the main window.
 * It will then essentially freeze time until you manually call the `tick` function, to advance by `amount` milliseconds.
 * When you are done with the mock performance object, call `uninstall` to hand control back over to the browser.
 */
interface IMockPerfomance {
  tick: (arg0: number) => void;
  uninstall: () => void;
}

const mockPerformance = (): IMockPerfomance => {
  const oldPerformance = performance.now;
  let oldTime = performance.now();

  performance.now = () => oldTime;

  return {
    tick: (amount: number) => {
      oldTime += amount;
    },
    uninstall: () => {
      performance.now = oldPerformance;
    },
  };
};

function trainAlphabet(
  actions: () => Actions<CompleteStoreModel>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  state: any,
  timer: IMockPerfomance | null,
) {
  actions().beginTrainingMode('ALPHABET');

  const numberOfKeysBeforeTraining = parseFloat(
    getCumulativeValueByPropertyName(
      state().totalSavedCharacterChordStats.statistics,
      'numberOfOccurrences',
    ),
  );

  for (let i = 0; i < ALPHABET_CHORDS.length; i++) {
    timer?.tick(100);
    actions().setTypedTrainingText(ALPHABET_CHORDS[i]);
  }

  actions().setTotalSavedTrainingStatistics(state().trainingStatistics);

  const numberOfKeysAfterTraining = parseFloat(
    getCumulativeValueByPropertyName(
      state().totalSavedCharacterChordStats.statistics,
      'numberOfOccurrences',
    ),
  );
  return { numberOfKeysAfterTraining, numberOfKeysBeforeTraining };
}
