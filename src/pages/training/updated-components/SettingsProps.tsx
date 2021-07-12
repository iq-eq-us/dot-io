import type { ActionCreator } from 'easy-peasy';
import React from 'react';
import styled from 'styled-components';
import type { TrainingSettingsState } from '../../../models/trainingSettingsStateModel';

export interface SettingsProps {
  trainingSettings: TrainingSettingsState;
  setTrainingSettings: ActionCreator<TrainingSettingsState>;
}

const DEFAULT_PROPS = {
  type: 'text',
  pattern: '[0-9]*',
};

export function CustomTrainingSettingsBox(props: SettingsProps): JSX.Element {
  return (
    <Container>
      <Row>
        <Label>Target Chords</Label>

        <Input
          onBlur={(e) => {
            props.setTrainingSettings({
              ...props.trainingSettings,
              targetChords: parseInt(e.target.value),
            });
          }}
          defaultValue={props.trainingSettings.targetChords}
          {...DEFAULT_PROPS}
        />
      </Row>

      <Row>
        <Label>Speed Goal</Label>
        <Input
          onBlur={(e) => {
            props.setTrainingSettings({
              ...props.trainingSettings,
              speedGoal: parseInt(e.target.value),
            });
          }}
          defaultValue={props.trainingSettings.speedGoal}
          {...DEFAULT_PROPS}
        />
      </Row>

      <Row>
        <Label>Rate (%)</Label>
        <Input
          onBlur={(e) => {
            props.setTrainingSettings({
              ...props.trainingSettings,
              recursionRate: parseInt(e.target.value),
            });
          }}
          defaultValue={props.trainingSettings.recursionRate}
          {...DEFAULT_PROPS}
        />
      </Row>
    </Container>
  );
}

const Label = styled.label.attrs({
  className: `block text-sm font-bold mb-2`,
})``;

const Input = styled.input.attrs({
  className: `mr-2 leading-tight text-black shadow rounded h-8 w-full border-[1px] pl-2 border-solid border-gray-100`,
})``;

const Row = styled.div.attrs({
  className: `w-full mt-4`,
})``;

const Container = styled.div.attrs({
  className: ``,
})``;
