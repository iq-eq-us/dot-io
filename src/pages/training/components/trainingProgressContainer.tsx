import React, { ReactElement } from 'react';
import { chordLibrary } from '../../../data/chordLibrary';
import type { TrainingScenario } from '../../../models/trainingScenario';
import { useStoreState } from '../../../store/store';
import { useCurrentTrainingScenario } from '../useCurrentTrainingScenario';
import ProgressBar from './progressBar';

export const blueTextStyle = {
  color: 'SkyBlue',
  fontSize: '0.8rem',
};

function TrainingProgressContainer(): ReactElement {
  const trainingMode = useCurrentTrainingScenario();
  const trainingStats = useStoreState((store) => store.trainingStatistics);
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const trainingStatsWithAverageSpeedOverSpeedGoal =
    trainingStats.statistics.filter(
      (s) => s.averageSpeed < trainingSettings.speedGoal && s.averageSpeed != 0,
    );

  const calculateTotalNumberOfChords = () => {
    const chordsToCheckLengthOn =
      getChordLibraryForTrainingScenario(trainingMode || undefined) || {};

    return Object.keys(chordsToCheckLengthOn).length;
  };

  const totalNumberOfChords = calculateTotalNumberOfChords();
  const totalNumerOfChordsConquered =
    trainingStatsWithAverageSpeedOverSpeedGoal.length;
  const numberOfChordsRemaining =
    totalNumberOfChords - totalNumerOfChordsConquered;

  const progress = Math.round(
    (trainingStatsWithAverageSpeedOverSpeedGoal.length / totalNumberOfChords) *
      100,
  );

  const currentLevel = useStoreState((store) => store.currentLevel);

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl mb-4 text-[skyblue]">Lvl: {currentLevel}</h1>
      <div className="flex flex-row">
        <div className="flex flex-col items-center">
          <p style={blueTextStyle}>Letters Conquered</p>
          <p style={blueTextStyle}>{totalNumerOfChordsConquered}</p>
        </div>
        <div className="flex flex-col px-8" style={{ width: '500px' }}>
          <ProgressBar progress={progress} />
        </div>
        <div className="flex flex-col items-center">
          <p style={blueTextStyle}>To Next Level</p>
          <p style={blueTextStyle}>{numberOfChordsRemaining}</p>
        </div>
      </div>
    </div>
  );
}

const getChordLibraryForTrainingScenario = (
  scenario?: TrainingScenario,
): Record<string, string[]> | undefined => {
  if (scenario === 'ALPHABET') return chordLibrary.letters;
  else if (scenario === 'CHORDING') return chordLibrary.chords;
  else if (scenario === 'LEXICAL') return chordLibrary.lexical;
  else if (scenario === 'TRIGRAM') return chordLibrary.trigrams;

  return undefined;
};

export default TrainingProgressContainer;
