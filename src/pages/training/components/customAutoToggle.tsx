import React, { ReactElement } from 'react';
import { useTrainingSettings } from '../../../hooks/useTrainingSettings';

export default function CustomAutoToggle(): ReactElement {
  const [trainingSettings, setTrainingSettings] = useTrainingSettings();

  return (
    <div className="flex flex-row items-center mb-4">
      <span className="text-sm pr-2">Auto</span>
      <input
        className="mr-2 leading-tight"
        type="radio"
        name="selection"
        checked={trainingSettings.autoOrCustom === 'AUTO'}
        onChange={() => {
          setTrainingSettings({
            ...trainingSettings,
            autoOrCustom: 'AUTO',
          });
        }}
      />
      <span className="text-sm pr-2">Custom</span>
      <input
        className="mr-2 leading-tight"
        type="radio"
        name="selection"
        checked={trainingSettings.autoOrCustom === 'CUSTOM'}
        onChange={() => {
          setTrainingSettings({
            ...trainingSettings,
            autoOrCustom: 'CUSTOM',
          });
        }}
      />
    </div>
  );
}
