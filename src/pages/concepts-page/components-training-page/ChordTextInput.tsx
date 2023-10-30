import React, { ReactElement, useRef, useState } from 'react';
import { useHUD } from '../../../hooks/useHUD';
import { useStoreActions, useStoreState } from '../../../store/store';

import ForgotAnswer from './ForgotAnswer';
import EditFlashcard from './EditFlashcard';

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
  const inputBox = useRef<HTMLInputElement>(null);

  return (
    <div className="w-full flex flex-row items-end mt-5 justify-center">
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
      <ForgotAnswer />

      <EditFlashcard />
    </div>
  );
}

export default ChordTextInput;
