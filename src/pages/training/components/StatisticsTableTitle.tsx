import React, { ReactElement } from 'react';
import { useCurrentTrainingScenario } from '../../../hooks/useCurrentTrainingScenario';
import { useStoreState } from '../../../store/store';

export function StatisticsTableTitle(): ReactElement {
  const trainingMode = useCurrentTrainingScenario();
  const chords = useStoreState((store) => store.chordsToPullFrom);
  const numberOfChords = Object.keys(chords).length;

  const shouldDisplayNumberOfChords =
    trainingMode === 'LEXICAL' || trainingMode === 'TRIGRAM';
  return (
    <span className="text-white text-2xl font-semibold">
      Statistics{shouldDisplayNumberOfChords && ` - ${numberOfChords}`}
    </span>
  );
}
