import type { ActionCreator } from 'easy-peasy';
import React, { useState } from 'react';
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
  const [targetChords, setTargetChords] = useState<string | number>(
    props.trainingSettings.targetChords,
  );
  const [speedGoal, setSpeedGoal] = useState<string | number>(
    props.trainingSettings.speedGoal,
  );
  const [rate, setRate] = useState<string | number>(
    props.trainingSettings.recursionRate,
  );

  return (
    <Container>
      <Row>
        <Label>Target Chords</Label>

        <Input
          onBlur={(e) => {
            const isValid = isInt(e) && (isPositive(e) || isZero(e));

            if (isValid) {
              props.setTrainingSettings({
                ...props.trainingSettings,
                targetChords: parseInt(e.target.value),
              });
            } else {
              setTargetChords(props.trainingSettings.targetChords);
            }
          }}
          onChange={(e) => setTargetChords(e.target.value)}
          value={targetChords}
          {...DEFAULT_PROPS}
        />
      </Row>

      <Row>
        <Label>Speed Goal</Label>
        <Input
          onBlur={(e) => {
            const isValid = isInt(e) && isPositive(e);

            if (isValid) {
              props.setTrainingSettings({
                ...props.trainingSettings,
                speedGoal: parseInt(e.target.value),
              });
            } else {
              setSpeedGoal(props.trainingSettings.speedGoal);
            }
          }}
          onChange={(e) => setSpeedGoal(e.target.value)}
          value={speedGoal}
          {...DEFAULT_PROPS}
        />
      </Row>

      <Row>
        <Label>Rate (%)</Label>
        <Input
          onBlur={(e) => {
            const isValid =
              (isPositive(e) || isZero(e)) && isLessThanOrEqualTo100(e);

            if (isValid) {
              props.setTrainingSettings({
                ...props.trainingSettings,
                recursionRate: parseInt(e.target.value),
              });
            } else {
              setRate(props.trainingSettings.recursionRate);
            }
          }}
          onChange={(e) => setRate(e.target.value)}
          value={rate}
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

function isLessThanOrEqualTo100(e: React.FocusEvent<HTMLInputElement>) {
  return parseFloat(e.target.value) <= 100;
}

function isPositive(e: React.FocusEvent<HTMLInputElement>) {
  return parseFloat(e.target.value) > 0;
}

function isZero(e: React.FocusEvent<HTMLInputElement>) {
  return parseFloat(e.target.value) == 0;
}

function isInt(e: React.FocusEvent<HTMLInputElement>) {
  return (
    !isNaN(parseInt(e.target.value)) && parseFloat(e.target.value) % 1 === 0
  );
}
