import React, { ReactElement, useRef } from 'react';
import { useStoreActions, useStoreState } from '../../../store/store';

function InvisibleTextInput(): ReactElement {
  const setStoreText = useStoreActions((store) => store.setTypedTrainingText);
  const textTyped = useStoreState((store) => store.typedTrainingText);
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <input
      ref={inputRef}
      style={{ position: 'absolute', top: -1000 }}
      autoFocus
      value={textTyped}
      onChange={(e) => {
        setStoreText(e.target.value);
      }}
      onBlur={() => {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 10);
      }}
    />
  );
}

export default InvisibleTextInput;
