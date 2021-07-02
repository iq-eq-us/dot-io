import type { ActionCreator } from 'easy-peasy';
import React from 'react';
import type { TrainingSettingsState } from '../../../models/trainingSettingsStateModel';

export interface SettingsProps {
  trainingSettings: TrainingSettingsState;
  setTrainingSettings: ActionCreator<TrainingSettingsState>;
}
export function CustomTrainingSettingsBox(props: SettingsProps): JSX.Element {
  return (
    <div>
      <div className="w-full mt-4">
        <label className="block text-sm font-bold mb-2">Target Chords</label>
        <input
          onChange={(e) => {
            props.setTrainingSettings({
              ...props.trainingSettings,
              targetChords: parseInt(e.target.value),
            });
          }}
          value={props.trainingSettings.targetChords}
          type="text"
          pattern="[0-9]*"
          className="mr-2 leading-tight text-black shadow rounded h-8 w-full border-[1px] pl-2 border-solid border-gray-100"
        />
      </div>
      <div className="w-full mt-4">
        <label className="block text-sm font-bold mb-2">Speed Goal</label>
        <input
          type="text"
          onChange={(e) => {
            props.setTrainingSettings({
              ...props.trainingSettings,
              speedGoal: parseInt(e.target.value),
            });
          }}
          value={props.trainingSettings.speedGoal}
          pattern="[0-9]*"
          className="mr-2 leading-tight text-black shadow rounded h-8 w-full border-[1px] pl-2 border-solid border-gray-100"
        />
      </div>
      <div className="w-full mt-4">
        <label className="block text-sm font-bold mb-2">Rate (%)</label>
        <input
          onChange={(e) => {
            props.setTrainingSettings({
              ...props.trainingSettings,
              recursionRate: parseInt(e.target.value),
            });
          }}
          value={props.trainingSettings.recursionRate}
          type="text"
          pattern="[0-9]*"
          className="mr-2 leading-tight text-black shadow rounded h-8 w-full border-[1px] pl-2 border-solid border-gray-100"
        />
      </div>
    </div>
  );
}
