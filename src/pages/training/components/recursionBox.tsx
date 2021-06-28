import React, { ReactElement } from 'react';
import { useContrast } from '../../../hooks/useContrast';
import { useTrainingSettings } from '../../../hooks/useTrainingSettings';

export default function RecursionBox(): ReactElement {
  const [trainingSettings, setTrainingSettings] = useTrainingSettings();
  const backgroundColor = useContrast();

  return (
    <label
      className="text-gray-500 font-bold flex flex-row absolute -top-3 left-4 box-content px-2"
      style={{ color: 'skyblue', backgroundColor }}
    >
      <span className="text-sm pr-2">Recursion</span>
      <input
        className="mr-2 leading-tight"
        type="checkbox"
        checked={trainingSettings.isUsingRecursion}
        onChange={(e) => {
          setTrainingSettings({
            ...trainingSettings,
            isUsingRecursion: e.target.checked,
          });
        }}
      />
    </label>
  );
}
