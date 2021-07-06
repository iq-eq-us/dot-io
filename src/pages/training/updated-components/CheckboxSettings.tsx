import React from 'react';
import type { TrainingSettingsState } from '../../../models/trainingSettingsStateModel';
import { CheckboxSetting } from './CheckboxSetting';

interface CheckboxProps {
  trainingSettings: TrainingSettingsState;
  updateTrainingSetting: (newProperty: Record<string, unknown>) => void;
}

export function HighlightCheckboxSetting(props: CheckboxProps): JSX.Element {
  return (
    <CheckboxSetting
      title="Highlight Keys"
      checked={props.trainingSettings.isHighlightingKeys}
      onChange={() =>
        props.updateTrainingSetting({
          isHighlightingKeys: !props.trainingSettings.isHighlightingKeys,
        })
      }
    />
  );
}

export function RecursionCheckboxSetting(props: CheckboxProps): JSX.Element {
  return (
    <CheckboxSetting
      title="Practice Slow Chords"
      checked={props.trainingSettings.isUsingRecursion}
      onChange={() => {
        props.updateTrainingSetting({
          isUsingRecursion: !props.trainingSettings.isUsingRecursion,
        });
      }}
    />
  );
}

export function HUDCheckboxSetting(props: CheckboxProps): JSX.Element {
  return (
    <CheckboxSetting
      title="Display HUD"
      checked={props.trainingSettings.isDisplayingHUD}
      onChange={() => {
        props.updateTrainingSetting({
          isDisplayingHUD: !props.trainingSettings.isDisplayingHUD,
        });
      }}
    />
  );
}

export function AutosaveSetting(props: CheckboxProps): JSX.Element {
  return (
    <CheckboxSetting
      title="Autosave Statistics"
      checked={props.trainingSettings.isAutoWrite}
      onChange={() => {
        props.updateTrainingSetting({
          isAutoWrite: !props.trainingSettings.isAutoWrite,
        });
      }}
    />
  );
}
