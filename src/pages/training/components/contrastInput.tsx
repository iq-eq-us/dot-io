import React, { ReactElement } from 'react';
import { useTrainingSettings } from '../../../hooks/useTrainingSettings';

export default function ContrastInput(): ReactElement {
  const [trainingSettings, setTrainingSettings] = useTrainingSettings();

  return (
    <div className="flex flex-row">
      <label className="mr-1 ml-4">Contrast:</label>
      <input
        className="mr-2 leading-tight w-16 text-black"
        type="number"
        value={trainingSettings.contrastPercentage}
        step={5}
        max={100}
        min={50}
        onChange={(e) => {
          setTrainingSettings({
            ...trainingSettings,
            contrastPercentage: Number(e.target.value),
          });
        }}
      />
    </div>
  );
}
