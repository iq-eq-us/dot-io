import React, { ReactElement, useRef, useEffect } from 'react';
import { useHUD } from '../../../hooks/useHUD';
import usePopover from '../../../hooks/usePopover';
import { useStoreActions, useStoreState } from '../../../store/store';
import RefreshIcon from './RefreshIcon';

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
  const displayHUD = useHUD();

  const { parentProps, Popper } = usePopover(
    'Generate a new set of training text.',
  );
  useEffect(() => {
    const field = document.getElementById("txt_Name");
    console.log('listener')
    field.addEventListener('blur',() => 
   field.focus())    
  }, []); // <-- dependency array
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
        autoFocus
        id="txt_Name"
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
