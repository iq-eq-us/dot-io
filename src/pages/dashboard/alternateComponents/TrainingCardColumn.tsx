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
        'Purpose: Familiarize yourself with your CharaChorder layout. \nGoal: Surpass average human writing speed (13 words per minute)',
      tierTitle: 'Alphabetic',
      onPressTraining: () =>
        runFunctionThenGoToTrainingPage(startAlphabetTraining),
      orientationLink: 'https://www.youtube.com/watch?v=Vq8NJd3J0Ag',
      minWPM: 0,
      maxWPM: 13,
    },
    {
      bodyText:
        'Purpose: Pratice common letter groupings. \nGoal: Surpass average speed of "Hunt & Peck" typists (27 words per minute)',
      tierTitle: 'Trigram',
      onPressTraining: () =>
        runFunctionThenGoToTrainingPage(startTrigramTraining),
      orientationLink: 'https://www.youtube.com/watch?v=IiuEYX7QFjA',
      minWPM: 13,
      maxWPM: 27,
    },
    {
      bodyText:
        'Purpose: Practice common words in character entry mode. \nGoal: Surpass average speed of a keyboard user (40 words per minute)',
      tierTitle: 'Lexical',
      onPressTraining: () =>
        runFunctionThenGoToTrainingPage(startLexicalTraining),
      orientationLink: 'https://www.youtube.com/watch?v=HvVvxD48cDI',
      minWPM: 27,
      maxWPM: 40,
    },
    {
      bodyText:
        'The average speed of a professional typist is 75 words per minute. \nProgress past 75 words per minute to move onto the next training section.',
      tierTitle: 'Chording',
      onPressTraining: () =>
        runFunctionThenGoToTrainingPage(startChordTraining),
      orientationLink: 'https://www.youtube.com/watch?v=-4QuWCf8PKM',
      minWPM: 40,
      maxWPM: 75,
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
          statistics={getStatsFromIndex(i)}
          {...props}
        />
      ))}
    </div>
  );
}
