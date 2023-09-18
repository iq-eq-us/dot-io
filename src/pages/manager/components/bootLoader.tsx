import React, { ReactElement } from 'react';
import {
  sendCommandString,
  readGetNone,
  MainControls,
} from '../controls/mainControls';

async function bootLoader() {
  //Sends the bootloader command to the charachorder via the serial API
  await sendCommandString('BOOTLOADER');
  await readGetNone();
  await sendCommandString('RST BOOTLOADER');
  await readGetNone();
}

function successfulBootLoader() {
  if (MainControls.serialPort != null) {
    alert(
      'Your CharaChorder will now appear as an external storage device on your computer’s file explorer or Finder app. It might be named one of the following: “Arduino”, “Seeduino”, “TinyUSB” or “CharaChorder X.',
    );
  } else {
    alert('There is no serial connection to bootload at this moment.');
  }
}

export function BootLoaderButton(): ReactElement {
  return (
    <React.Fragment>
      <button
        className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
        color="pink"
        onClick={() => bootLoader()}
        onClickCapture={() => successfulBootLoader()}
      >
        BootLoader{' '}
      </button>
    </React.Fragment>
  );
}
