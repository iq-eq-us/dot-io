import React, { ReactElement } from 'react';
import { useTrainingSettings } from '../../../hooks/useTrainingSettings';

export default function HighlightKeysToggle(): ReactElement {
  const [trainingSettings, setTrainingSettings] = useTrainingSettings();

  return (
    <label
      className="block text-gray-500 font-bold mb-4"
      style={{ color: 'skyblue', fontWeight: 500 }}
    >
      <input
        className="mr-2 leading-tight"
        type="checkbox"
        checked={trainingSettings.isHighlightingKeys}
        onChange={(e) => {
          setTrainingSettings({
            ...trainingSettings,
            isHighlightingKeys: e.target.checked,
          });
        }}
      />
      <span className="text-sm">Highlight Keys</span>
    </label>
  );
}
