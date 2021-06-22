import React, { ReactElement } from 'react';
import { useTrainingSettings } from '../../../hooks/useTrainingSettings';

export default function HUDToggle(): ReactElement {
  const [trainingSettings, setTrainingSettings] = useTrainingSettings();

  return (
    <div className="flex flex-row">
      <span className="text-sm">HUD</span>
      <input
        className="ml-2 leading-tight"
        type="checkbox"
        checked={trainingSettings.isDisplayingHUD}
        onChange={(e) => {
          setTrainingSettings({
            ...trainingSettings,
            isDisplayingHUD: e.target.checked,
          });
        }}
      />
    </div>
  );
}
