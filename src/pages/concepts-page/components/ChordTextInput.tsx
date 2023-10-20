import React, { ReactElement, useRef, useState } from 'react';
import { useHUD } from '../../../hooks/useHUD';
import usePopover from '../../../hooks/usePopover';
import { useStoreActions, useStoreState } from '../../../store/store';
import { ForgotPassword } from './ForgotPassword';
function ChordTextInput(): ReactElement {
  const setStoreText = useStoreActions((store) => store.setTypedTrainingText);
  const textTyped = useStoreState((store) => store.typedTrainingText);
  const inputRef = useRef<HTMLInputElement>(null);
  const regenerateTrainingText = useStoreActions(
    (store) => store.resetTrainingText,
  );
  const timeTakenToTypePreviousChord = useStoreState(
    (store) => store.timeTakenToTypePreviousChord,
  );
  const displayHUD = useHUD();

  const beginTraining = useStoreActions(
    (store: any) => store.beginTrainingMode,
  );

  const currentTrainingScenario = useStoreState(
    (store: any) => store.currentTrainingScenario,
  );
  const setIsDisplaying = useStoreActions(
    (store) => store.setIsDisplayingStatisticsModal,
  );
  const setTrainingSettings = useStoreActions(
    (store: any) => store.setTrainingSettings,
  );
  const trainingSettings = useStoreState((store) => store.trainingSettings);

  const updateTrainingSetting = (newProperty: Record<string, unknown>) =>
    setTrainingSettings({ ...trainingSettings, ...newProperty });

  const payload: any[] = [];
  payload.push(currentTrainingScenario);

  const { parentProps, Popper } = usePopover(
    'Forgot the password, press here to move to next question.',
  );

  return (
    <div className="w-full flex flex-row items-end mt-5 justify-center">
      {Popper}

      <input
        autoCorrect="off"
        autoCapitalize="none"
        className="text-black bg-white focus:outline-none text-4xl mb-2 rounded-3xl font-bold text-center max-w-[200vw] pb-4 border-b-2 border-solid border-[#222] position:center"
        ref={inputRef}
        autoFocus
        value={textTyped}
      />

      <div
        className="p-2 bg-[#333] text-white flex items-center justify-center rounded mb-4 ml-6 cursor-pointer bg-[#AD5050] hover:bg-[#ff0000]"
        onClick={() => {
          setStoreText('');
          //regenerateTrainingText();
          //setIsDisplaying(true);
          //updateTrainingSetting({ isDisplayingSettingsModal: true });

          //inputRef.current?.focus();
        }}
        {...parentProps}
      >
        <ForgotPassword />
      </div>
    </div>
  );
}

export default ChordTextInput;
