import React, { ReactElement } from 'react';
import { useStoreActions, useStoreState } from '../../../store/store';

export function AutoCustomSetting(): ReactElement {
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const setTrainingSettings = useStoreActions(
    (store) => store.setTrainingSettings,
  );

  return (
    <div>
      <label className="block text-sm font-bold mb-1 mt-4">Settings Mode</label>
      <label className="flex flex-row items-center">
        <div className="w-1/2">
          <input
            type="radio"
            name="auto"
            className="form-checkbox"
            checked={trainingSettings.autoOrCustom === 'AUTO'}
            onChange={() => {
              setTrainingSettings({
                ...trainingSettings,
                autoOrCustom: 'AUTO',
              });
            }}
          />
          <span className="ml-2">Auto</span>
        </div>

        <div className="w-1/2">
          <input
            type="radio"
            name="auto"
            className="form-checkbox"
            checked={trainingSettings.autoOrCustom === 'CUSTOM'}
            onChange={() => {
              setTrainingSettings({
                ...trainingSettings,
                autoOrCustom: 'CUSTOM',
              });
            }}
          />
          <span className="ml-2">Custom</span>
        </div>
      </label>
    </div>
  );
}
