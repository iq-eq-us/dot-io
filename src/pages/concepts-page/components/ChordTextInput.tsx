import React, { ReactElement, useRef, useState } from 'react';
import { useHUD } from '../../../hooks/useHUD';
import usePopover from '../../../hooks/usePopover';
import { useStoreActions, useStoreState } from '../../../store/store';

import { ForgotAnswer } from './ForgotAnswer';
import EditFlashcard from './EditFlashcard';
import EditIcon from './EditIcon';
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

interface TextInputProps {
  onKeyDown: (input: string) => void;
  onBlur: () => void;
  value: string;
}

function ChordTextInput({
  onKeyDown,
  onBlur,
  value,
}: TextInputProps): ReactElement {
  const { parentProps, Popper } = usePopover(
    'Forgot the answer, press here to move to next question.',
  );

  const inputBox = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full flex flex-row items-end mt-5 justify-center">
      {Popper}

      <input
        autoCorrect="off"
        autoCapitalize="none"
        className="text-black bg-white focus:outline-none text-4xl mb-2 rounded-3xl font-bold text-center max-w-[200vw] pb-4 border-b-2 border-solid border-[#222] position:center"
        ref={inputBox}
        autoFocus
        value={value}
        onKeyDown={(e) => onKeyDown(e.key)}
        readOnly={true}
        onBlur={() => onBlur()}
      />

      <div
        className="p-2 bg-[#333] text-white flex items-center justify-center rounded mb-4 ml-6 cursor-pointer bg-[#AD5050] hover:bg-[#ff0000]"
        onClick={() => {
          //inputRef.current?.focus();
        }}
        {...parentProps}
      >
        <ForgotAnswer />
      </div>

      <div
        className="p-2 text-white flex items-center rounded mb-4 ml-6 hover:text-gray-400"
        onClick={() => {
          //setStoreText('');
          //regenerateTrainingText();
          //setIsDisplaying(true);
          //updateTrainingSetting({ isDisplayingSettingsModal: true });
          //inputRef.current?.focus();
        }}
      >
        <EditFlashcard />
      </div>
    </div>
  );
}

export default ChordTextInput;
