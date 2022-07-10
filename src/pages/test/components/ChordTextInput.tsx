import React, { ReactElement, useRef, useEffect } from 'react';
import { useHUD } from '../../../hooks/useHUD';
import usePopover from '../../../hooks/usePopover';
import { useStoreActions, useStoreState } from '../../../store/store';
import RefreshIcon from './RefreshIcon';
import { FocusModal } from './focusBreakModal';
import ReactDOM from 'react-dom';

function ChordTextInput(): ReactElement {
  const setStoreText = useStoreActions((store : any) => store.setTypedTrainingText);
  const textTyped = useStoreState((store : any) => store.typedTrainingText);
  const inputRef = useRef<HTMLInputElement>(null);
  const regenerateTrainingText = useStoreActions(
    (store : any) => store.resetTrainingText,
  );
  const timeTakenToTypePreviousChord = useStoreState(
    (store : any) => store.timeTakenToTypePreviousChord,
  );
  const trainingScenario = useStoreState(
    (store) => store.currentTrainingScenario);  const displayHUD = useHUD();
    const isShowingPortal = useStoreState(
      (store) => store.isDisplayingChordEditModal,
    );
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
      </span>

      <input
        autoCorrect="off"
        autoCapitalize="none"
        className="relative bg-transparent caret-transparent focus:outline-none w-0 text-4xl min-h-[40px] mb-2 text-white font-bold text-center max-w-[60vw] pb-4 border-b-2 border-solid border-transparent"
        ref={inputRef}
        id="txt_Name"
        autoFocus
        onBlurCapture={() => isShowingPortal == false ? document.getElementById('txt_Name')?.focus() : document.getElementById('ChordModalInput')?.focus()}
        onFocus={() => isShowingPortal == true ? document.getElementById('txt_Name')?.focus() : document.getElementById('txt_Name')?.focus()}
        value={textTyped}
        onChange={(e) => {
          console.log(e.target.value);
          setStoreText(e.target.value);
        }}
    
      />

      


    </div>
  );
}

export default ChordTextInput;
