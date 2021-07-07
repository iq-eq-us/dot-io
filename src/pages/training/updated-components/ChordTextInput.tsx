import React, { ReactElement, useRef } from 'react';
import { useStoreActions, useStoreState } from '../../../store/store';

function ChordTextInput(): ReactElement {
  const setStoreText = useStoreActions((store) => store.setTypedTrainingText);
  const textTyped = useStoreState((store) => store.typedTrainingText);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      className="mt-16 bg-transparent focus:outline-none text-4xl min-h-[40px] mb-2 mx-auto text-white font-bold text-center max-w-[80vw] pb-4 border-b-2 border-solid border-[#222]"
      ref={inputRef}
      autoFocus
      value={textTyped}
      onChange={(e) => {
        setStoreText(e.target.value);
      }}
      onBlur={() => {
        // setTimeout(() => {
        //   inputRef.current?.focus();
        // }, 1);
      }}
    />
  );
}

export default ChordTextInput;
