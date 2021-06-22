import React, { ReactElement } from 'react';
import { useTrainingSettings } from '../../../hooks/useTrainingSettings';

export default function ErrorBurstInput(): ReactElement {
  const [trainingSettings, setTrainingSettings] = useTrainingSettings();

  return (
    <div className="flex flex-row">
      <span className="text-sm">Error Burst</span>
      <input
        className="ml-2 leading-tight"
        type="checkbox"
        checked={trainingSettings.isErrorBurst}
        onChange={(e) => {
          setTrainingSettings({
            ...trainingSettings,
            isErrorBurst: e.target.checked,
          });
        }}
      />
    </div>
  );
}
