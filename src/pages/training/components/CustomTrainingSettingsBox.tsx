import type { ActionCreator } from 'easy-peasy';
import React, { useState } from 'react';
import styled from 'styled-components';
import usePopover from '../../../hooks/usePopover';
import type { TrainingSettingsState } from '../../../models/trainingSettingsStateModel';
import { useStoreState } from '../../../store/store';
import HelpCircleIcon from './HelpCircleIcon';

export interface SettingsProps {
  trainingSettings: TrainingSettingsState;
  setTrainingSettings: ActionCreator<TrainingSettingsState>;
}

const DEFAULT_PROPS = {
  type: 'text',
  pattern: '[0-9]*',
};

export function CustomTrainingSettingsBox(props: SettingsProps): JSX.Element {
  const trainingSettings = useStoreState((store) => store.trainingSettings);

  const shouldDisplayCustomSettings =
    trainingSettings.autoOrCustom === 'CUSTOM';

  const recursionDisabled = !useStoreState(
    (store) => store.trainingSettings.isUsingRecursion,
  );

  const [targetChords, setTargetChords] = useState<string | number>(
    props.trainingSettings.targetChords,
  );
  const [speedGoal, setSpeedGoal] = useState<string | number>(
    props.trainingSettings.speedGoal,
  );
  const [rate, setRate] = useState<string | number>(
    props.trainingSettings.recursionRate,
  );

  React.useEffect(() => {
    setTargetChords(trainingSettings.targetChords);
    setSpeedGoal(trainingSettings.speedGoal);
    setRate(trainingSettings.recursionRate);
  }, [trainingSettings]);

  const { parentProps: targetChordsProps, Popper: TargetChordPopover } =
    usePopover(
      'How many chords do you want to target to get better at through practice?',
    );

  const { parentProps: speedGoalProps, Popper: SpeelGoalPopover } = usePopover(
    'How fast do you want to type each chord? This is measured in hundreths of a second, so a speed goal of 100 would equate to 1 second.',
  );

  const { parentProps: recursionRateProps, Popper: RecursionRatePopover } =
    usePopover(
      'How often do you want to be prompted for chords you are slow at? 0% means never, while 100% means only prompt me for slow chords.',
    );

  const { parentProps: recursionHelperProps, Popper: RecursionHelperPopover } =
    usePopover(
      'Target chords is not used unless "Practice Slow Chords" is enabled.',
    );

  const { parentProps: rateHelperProps, Popper: RateHelperPopover } =
    usePopover('Rate % is not used unless "Practice Slow Chords" is enabled.');

  return (
    <Container>
      <Row>
        <Label {...targetChordsProps}>
          Target Chords
          <HelpCircleIcon />
          {TargetChordPopover}
          {recursionDisabled && RecursionHelperPopover}
        </Label>

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
          disabled={recursionDisabled || !shouldDisplayCustomSettings}
          onChange={(e) => setTargetChords(e.target.value)}
          value={targetChords}
          {...recursionHelperProps}
          {...DEFAULT_PROPS}
        />
      </Row>

      <Row>
        <Label {...speedGoalProps}>
          Speed Goal
          <HelpCircleIcon />
          {SpeelGoalPopover}
        </Label>
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
          disabled={!shouldDisplayCustomSettings}
          value={speedGoal}
          {...DEFAULT_PROPS}
        />
      </Row>

      <Row>
        <Label {...recursionRateProps}>
          Rate (%)
          <HelpCircleIcon />
          {RecursionRatePopover}
          {recursionDisabled && RateHelperPopover}
        </Label>
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
          disabled={recursionDisabled || !shouldDisplayCustomSettings}
          {...rateHelperProps}
          {...DEFAULT_PROPS}
        />
      </Row>
    </Container>
  );
}

const Label = styled.label.attrs({
  className: `block text-sm font-bold mb-2 inline-flex flex-row items-center gap-2`,
})``;

const Input = styled.input.attrs({
  className: `mr-2 leading-tight text-black shadow rounded h-8 w-full border-[1px] pl-2 border-solid border-gray-100 disabled:bg-gray-300 disabled:border-gray-400 disabled:text-gray-500`,
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
