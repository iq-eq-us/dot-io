import React, { ReactElement } from 'react';
import {
  sendCommandString,
  readGetNone

} from '../controls/mainControls'


async function bootLoader(){
    //Sends the bootloader command to the charachorder via the serial API
    await sendCommandString("BOOTLOADER");
    await readGetNone();
  }  
  
  export function BootLoaderButton(): ReactElement {
    return (
      <React.Fragment>

      <button
      className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
      color="pink"
      onClick={() => bootLoader()}
      >BootLoader </button>
      </React.Fragment>
    );
  }