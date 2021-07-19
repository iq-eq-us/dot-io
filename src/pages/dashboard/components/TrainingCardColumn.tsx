import React, { ReactElement } from 'react';
import { useHistory } from 'react-router-dom';
import type { TrainingScenario } from '../../../models/trainingScenario';
import type { ChordStatistics } from '../../../models/trainingStatistics';
import { useStoreActions, useStoreState } from '../../../store/store';
import { TierCardProps, TrainingTierCard } from './TrainingTierCard';

export function TrainingCardColumn(): ReactElement {
  const history = useHistory();
  const beginTraining = useStoreActions((store) => store.beginTrainingMode);

  const runFunctionThenGoToTrainingPage = (func: () => void) => {
    func();
    history.push('/training');
  };

  const trainingCardProps: TierCardProps[] = [
    {
      bodyText:
        'Purpose: Familiarize yourself with your CharaChorder layout. \nGoal: Surpass average human writing speed (13 words per minute)',
      tierTitle: 'Alphabetic',
      onPressTraining: () =>
        runFunctionThenGoToTrainingPage(() => beginTraining('ALPHABET')),
      orientationLink: 'https://www.youtube.com/watch?v=Vq8NJd3J0Ag',
      minWPM: 0,
      maxWPM: 13,
      scenario: 'ALPHABET',
    },
    {
      bodyText:
        'Purpose: Practice common letter groupings. \nGoal: Surpass average speed of "Hunt & Peck" typists (27 words per minute)',
      tierTitle: 'Amalgamate',
      onPressTraining: () =>
        runFunctionThenGoToTrainingPage(() => beginTraining('TRIGRAM')),
      orientationLink: 'https://www.youtube.com/watch?v=IiuEYX7QFjA',
      minWPM: 13,
      maxWPM: 27,
      scenario: 'TRIGRAM',
      previousScenario: 'ALPHABET',
    },
    {
      bodyText:
        'Purpose: Practice common words in character entry mode. \nGoal: Surpass average speed of a keyboard user (40 words per minute)',
      tierTitle: 'Lexical',
      onPressTraining: () =>
        runFunctionThenGoToTrainingPage(() => beginTraining('LEXICAL')),
      orientationLink: 'https://www.youtube.com/watch?v=HvVvxD48cDI',
      minWPM: 27,
      maxWPM: 40,
      scenario: 'LEXICAL',
      previousScenario: 'TRIGRAM',
    },
    {
      bodyText:
        'The average speed of a professional typist is 75 words per minute. \nProgress past 75 words per minute to move onto the next training section.',
      tierTitle: 'Chording',
      onPressTraining: () =>
        runFunctionThenGoToTrainingPage(() => beginTraining('CHORDING')),
      orientationLink: 'https://www.youtube.com/watch?v=-4QuWCf8PKM',
      minWPM: 40,
      maxWPM: 75,
      scenario: 'CHORDING',
      previousScenario: 'LEXICAL',
    },
    {
      bodyText:
        'The average speed of human speech is 120 words per minute. \nProgress past 120 words per minute to move onto the next training section.',
      tierTitle: 'Lexicographic',
      onPressTraining: () =>
        runFunctionThenGoToTrainingPage(() => beginTraining('LEXICOGRAPHIC')),
      minWPM: 75,
      maxWPM: 120,
      scenario: 'LEXICOGRAPHIC',
      previousScenario: 'CHORDING',
    },
    {
      bodyText:
        'The speed of USCRA Federal Certified Realtime Reporter is 200 words per minute. \nProgress past 200 words per minute to move onto the next training section.',
      tierTitle: 'SuperSonic',
      onPressTraining: () =>
        runFunctionThenGoToTrainingPage(() => beginTraining('SUPERSONIC')),
      minWPM: 120,
      maxWPM: 200,
      scenario: 'SUPERSONIC',
      previousScenario: 'LEXICOGRAPHIC',
    },
  ];

  const stats = useStoreState((store) => store.totalSavedTrainingStatistics);

  const getStatsFromIndex = (index: number): ChordStatistics[] | undefined => {
    // Don't return any stats for training modules 5 and 6
    if (index > 3) return undefined;

    const indexMap: Record<number, TrainingScenario> = {
      0: 'ALPHABET',
      1: 'TRIGRAM',
      2: 'LEXICAL',
      3: 'CHORDING',
      4: 'LEXICOGRAPHIC',
      5: 'SUPERSONIC',
    };

    return stats.statistics.filter((stat) => stat.scenario === indexMap[index]);
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
