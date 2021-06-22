import React, { ReactElement } from 'react';
import { useTrainingSettings } from '../../../hooks/useTrainingSettings';
import styled from 'styled-components';
import CustomAutoToggle from './customAutoToggle';
import HighlightKeysToggle from './highlightKeysToggle';
import RecursionBox from './recursionBox';
import NumberInput from './numberInput';
import ErrorBurstInput from './errorBurstInput';
import HUDToggle from './hudToggle';
import ContrastInput from './contrastInput';
import type { TrainingSettingsState } from '../../../models/trainingSettingsStateModel';
import type { ActionCreator } from 'easy-peasy';

export default function SettingsMenu(): ReactElement {
  const [trainingSettings, setTrainingSettings] = useTrainingSettings();

  return (
    <AlignCenterColumn>
      <HighlightKeysToggle />

      <div className="border-white border-2 border-solid p-4 flex flex-col items-center relative">
        <RecursionBox />

        <CustomAutoToggle />

        {targetChordinput(trainingSettings, setTrainingSettings)}

        {speedGoalInput(trainingSettings, setTrainingSettings)}

        {ratePercentageInput(trainingSettings, setTrainingSettings)}

        <ErrorBurstInput />
      </div>

      <div className="flex flex-row mt-2">
        <HUDToggle />

        <ContrastInput />
      </div>
    </AlignCenterColumn>
  );
}

const AlignCenterColumn = styled.div.attrs({
  className: 'flex flex-col items-center w-full justify-end h-screen pb-4',
})``;

function ratePercentageInput(
  trainingSettings: TrainingSettingsState,
  setTrainingSettings: ActionCreator<TrainingSettingsState>,
) {
  return (
    <NumberInput
      labelTitle="Target Chords:"
      value={trainingSettings.ratePercentage}
      onChange={(e) =>
        setTrainingSettings({
          ...trainingSettings,
          ratePercentage: Number(e.target.value),
        })
      }
    />
  );
}

function speedGoalInput(
  trainingSettings: TrainingSettingsState,
  setTrainingSettings: ActionCreator<TrainingSettingsState>,
) {
  return (
    <NumberInput
      labelTitle="Speed Goal:"
      value={trainingSettings.speedGoal}
      onChange={(e) =>
        setTrainingSettings({
          ...trainingSettings,
          speedGoal: Number(e.target.value),
        })
      }
    />
  );
}

function targetChordinput(
  trainingSettings: TrainingSettingsState,
  setTrainingSettings: ActionCreator<TrainingSettingsState>,
) {
  return (
    <NumberInput
      labelTitle="Target Chords:"
      value={trainingSettings.targetChords}
      onChange={(e) =>
        setTrainingSettings({
          ...trainingSettings,
          targetChords: Number(e.target.value),
        })
      }
    />
  );
}
