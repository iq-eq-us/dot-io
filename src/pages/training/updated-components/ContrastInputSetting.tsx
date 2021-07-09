import React, { ReactElement } from 'react';
import type { SettingsProps } from './SettingsProps';

export function ContrastInputSetting(props: SettingsProps): ReactElement {
  return (
    <div className="w-full mt-4">
      <label className="block text-sm font-bold mb-2">Contrast</label>
      <input
        onBlur={(e) => {
          const value = parseInt(e.target.value);
          if (!isNaN(value) && value >= 50 && value <= 100)
            props.setTrainingSettings({
              ...props.trainingSettings,
              contrastPercentage: value,
            });
        }}
        defaultValue={props.trainingSettings.contrastPercentage}
        type="text"
        pattern="[0-9]*"
        className="mr-2 leading-tight text-black shadow rounded h-8 w-full border-[1px] pl-2 border-solid border-gray-100"
      />
    </div>
  );
}
