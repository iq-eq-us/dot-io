import React, { ReactElement, useRef, useState } from 'react';
import { useHUD } from '../../../hooks/useHUD';
import usePopover from '../../../hooks/usePopover';
import { useStoreActions, useStoreState } from '../../../store/store';
import { ForgotPassword } from './ForgotPassword';

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
    'Forgot the password, press here to move to next question.',
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
        <ForgotPassword />
      </div>
    </div>
  );
}

export default ChordTextInput;
