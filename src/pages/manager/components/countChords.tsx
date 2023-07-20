import React, { ReactElement } from 'react';
import { sendCommandString, MainControls } from '../controls/mainControls';

export async function getCount() {
  await sendCommandString('CML C0');
  const { value } = await MainControls.lineReader.read();
  const chordCountSplit = value.split(' ');
  const chordCountParsedValue = parseInt(
    chordCountSplit[chordCountSplit.length - 1],
  );

  const element: HTMLElement = document.getElementById(
    'countDiv',
  ) as HTMLInputElement; //.innerHTML = "status: opened serial port";
  if (element != null) {
    element.innerHTML = 'Count: ' + chordCountParsedValue;
  }
}

export function GetCountButton(): ReactElement {
  return (
    <React.Fragment>
      <button
        className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
        color="pink"
        onClick={() => getCount()}
      >
        Count{' '}
      </button>
    </React.Fragment>
  );
}
