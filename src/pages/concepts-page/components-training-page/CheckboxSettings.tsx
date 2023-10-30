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
      helpText="Highlight keys on the CharaChorder overlay in the bottom center of your screen."
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
      helpText="When checked, this setting will prompt you to type chords that you struggle with more often to help you practice."
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
      helpText="Show or hide certain elements of the heads up display to increase focus on typing."
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
      helpText="Automatically save your statistics when you navigate away from this training session."
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
