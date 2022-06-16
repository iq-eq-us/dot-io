import React, { ReactElement, useRef } from 'react';
import { useHUD } from '../../../hooks/useHUD';
import usePopover from '../../../hooks/usePopover';
import { useStoreActions, useStoreState } from '../../../store/store';
import RefreshIcon from './RefreshIcon';

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

  const { parentProps, Popper } = usePopover(
    'Generate a new set of training text.',
  );

  return (
    <div className="w-full flex flex-row items-end mt-16 justify-center">
      {Popper}

      <span
        className={`mb-2 mr-2 text-white font-semibold ${
          !displayHUD && 'hidden'
        }`}
      >
        Last: {timeTakenToTypePreviousChord.toFixed()}
      </span>

      <input
        autoCorrect="off"
        autoCapitalize="none"
        className="bg-transparent focus:outline-none text-4xl min-h-[40px] mb-2 text-white font-bold text-center max-w-[60vw] pb-4 border-b-2 border-solid border-[#222]"
        ref={inputRef}
        autoFocus
        value={textTyped}
        onChange={(e) => {
          setStoreText(e.target.value);
        }}
      />

      <div
        className="p-2 bg-[#333] flex items-center justify-center rounded mb-2 ml-2 cursor-pointer hover:bg-[#444] active:bg-[#222]"
        onClick={() => {
          setStoreText('');
          regenerateTrainingText();
          inputRef.current?.focus();
        }}
        {...parentProps}
      >
        <RefreshIcon />
      </div>
    </div>
  );
}

export default ChordTextInput;
