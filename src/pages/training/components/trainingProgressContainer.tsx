import React, { ReactElement } from 'react';
import { chordLibrary } from '../../../data/chordLibrary';
import { useStoreState } from '../../../store/store';
import { useCurrentTrainingScenario } from '../useCurrentTrainingScenario';
import ProgressBar from './progressBar';

const blueTextStyle = {
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
    if (trainingMode === 'ALPHABET')
      return Object.keys(chordLibrary.letters).length;
    if (trainingMode === 'CHORDING')
      return Object.keys(chordLibrary.chords).length;
    return 1;
  };

  const progress = Math.round(
    (trainingStatsWithAverageSpeedOverSpeedGoal.length /
      calculateTotalNumberOfChords()) *
      100,
  );

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl mb-4 text-[skyblue]">Lvl: 0</h1>
      <div className="flex flex-row">
        <div className="flex flex-col items-center">
          <p style={blueTextStyle}>Letters Conquered</p>
          <p style={blueTextStyle}>0</p>
        </div>
        <div className="flex flex-col px-8" style={{ width: '500px' }}>
          <ProgressBar progress={progress} />
          <p style={blueTextStyle}>∞ wpm</p>
        </div>
        <div className="flex flex-col items-center">
          <p style={blueTextStyle}>To Next Level</p>
          <p style={blueTextStyle}>0</p>
        </div>
      </div>
    </div>
  );
}

export default TrainingProgressContainer;
