import React, { ReactElement } from 'react';
import usePopover from '../../../hooks/usePopover';

function ForgotAnswer(): ReactElement {
  const { parentProps, Popper } = usePopover(
    'Forgot the answer, press here to move to next question.',
  );

  return (
    <>
      {Popper}

      <div
        className="p-2 bg-[#333] text-white flex items-center justify-center rounded mb-4 ml-6 cursor-pointer bg-[#AD5050] hover:bg-[#ff0000]"
        onClick={() => {
          //inputRef.current?.focus();
        }}
        {...parentProps}
      >
        <button
          //className="import sc-bYwzuL text-white rounded-md bg-[#AD5050] hover:bg-[#FF0000] active:bg-[#222]"
          color="pink"
        >
          Forgot Answer
        </button>
      </div>
    </>
  );
}

export default ForgotAnswer;
