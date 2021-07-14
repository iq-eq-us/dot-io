import React, { ReactElement } from 'react';
import usePopover from '../../../hooks/usePopover';
import { useStoreActions, useStoreState } from '../../../store/store';
import HelpCircleIcon from './HelpCircleIcon';

export function AutoCustomSetting(): ReactElement {
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const setTrainingSettings = useStoreActions(
    (store) => store.setTrainingSettings,
  );

  const { parentProps, Popper } = usePopover(
    'Use our intelligent algorithm to determine your speed, target, and chords, or choose your own.',
  );

  const triggerResize = () => {
    // This is done to make sure that the popover elements are in the correct position
    // The only time their position is recalculated is on scroll or resize
    // So this needs to be triggered manually
    window.dispatchEvent(new Event('resize'));
  };

  const setAuto = () => {
    setTrainingSettings({
      ...trainingSettings,
      autoOrCustom: 'AUTO',
    });
    triggerResize();
  };
  const setCustom = () => {
    setTrainingSettings({
      ...trainingSettings,
      autoOrCustom: 'CUSTOM',
    });
    triggerResize();
  };
  return (
    <div>
      {Popper}
      <div
        className="text-sm font-bold mb-1 inline-flex flex-row gap-2 items-center"
        {...parentProps}
      >
        Settings Mode
        <HelpCircleIcon />
      </div>

      <div className="flex flex-row items-center">
        <div className="w-1/2">
          <input
            type="radio"
            name="auto"
            className="form-checkbox"
            checked={trainingSettings.autoOrCustom === 'AUTO'}
            onChange={setAuto}
          />
          <span className="ml-2 select-none" onClick={setAuto}>
            Auto
          </span>
        </div>

        <div className="w-1/2">
          <input
            type="radio"
            name="auto"
            className="form-checkbox"
            checked={trainingSettings.autoOrCustom === 'CUSTOM'}
            onChange={setCustom}
          />
          <span className="ml-2 select-none" onClick={setCustom}>
            Custom
          </span>
        </div>
      </div>
    </div>
  );
}
