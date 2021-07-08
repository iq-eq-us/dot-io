import type { ActionCreator } from 'easy-peasy';
import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import { chordLibrary } from '../../../data/chordLibrary';
import { useTrainingStart } from '../../../hooks/useTrainingStart';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import { useStoreState } from '../../../store/store';
import { TierCardProps, TrainingTierCard } from './TrainingTierCard';

export function TrainingCardColumn(): ReactElement {
  const history = useHistory();
  const {
    startAlphabetTraining,
    startTrigramTraining,
    startLexicalTraining,
    startChordTraining,
  } = useTrainingStart();

  const runFunctionThenGoToTrainingPage = (func: ActionCreator<void>) => {
    func();
    history.push('/training');
  };

  const trainingCardProps: TierCardProps[] = [
    {
      bodyText:
        'The average writing speed is 13 words per minute. Progress past 13 words per minute to move onto the next training section.',
      tierTitle: 'Alphabetic',
      onPressTraining: () =>
        runFunctionThenGoToTrainingPage(startAlphabetTraining),
      orientationLink: 'https://www.youtube.com/watch?v=Vq8NJd3J0Ag',
      wpmToProgress: 13,
    },
    {
      bodyText:
        'The average speed of a "Hunt & Peck" typist is 27 wpm. Progress past 27 words per minute to move onto the next training section.',
      tierTitle: 'Trigram',
      onPressTraining: () =>
        runFunctionThenGoToTrainingPage(startTrigramTraining),
      orientationLink: 'https://www.youtube.com/watch?v=IiuEYX7QFjA',
      wpmToProgress: 27,
    },
    {
      bodyText:
        'The average speed of a keyboard user is 40 words per minute. Progress past 40 words per minute to move onto the next training section.',
      tierTitle: 'Lexical',
      onPressTraining: () =>
        runFunctionThenGoToTrainingPage(startLexicalTraining),
      orientationLink: 'https://www.youtube.com/watch?v=HvVvxD48cDI',
      wpmToProgress: 40,
    },
    {
      bodyText:
        'The average speed of a professional typist is 75 words per minute. Progress past 75 words per minute to move onto the next training section.',
      tierTitle: 'Chording',
      onPressTraining: () =>
        runFunctionThenGoToTrainingPage(startChordTraining),
      orientationLink: 'https://www.youtube.com/watch?v=-4QuWCf8PKM',
      wpmToProgress: 75,
    },
  ];

  const stats = useStoreState((store) => store.totalSavedTrainingStatistics);

  const getStatsFromIndex = (index: number): ChordStatistics[] | undefined => {
    const chordLibraryKeysAlphabet = Object.keys(chordLibrary.letters);
    const chordLibraryKeysChords = Object.keys(chordLibrary.chords);

    if (index === 0)
      return stats.statistics.filter((stat) =>
        chordLibraryKeysAlphabet.includes(stat.id),
      );
    else if (index === 3)
      return stats.statistics.filter((stat) =>
        chordLibraryKeysChords.includes(stat.id),
      );
    return undefined;
  };

  return (
    <div className="flex flex-wrap flex-col items-center">
      {trainingCardProps.map((props, i) => (
        <TrainingTierCard
          key={Math.random()}
          {...props}
          statistics={getStatsFromIndex(i)}
        />
      ))}
    </div>
  );
}
