import React, { useRef } from 'react';
import { ForgotAnswer } from './ForgotAnswer';

interface TextInputProps {
  onKeyDown: (input: string) => void;
  onBlur: () => void;
  value: string;
}

export const ChordTextInput = ({
  onKeyDown,
  onBlur,
  value,
}: TextInputProps) => {
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
    </div>
  );
};
