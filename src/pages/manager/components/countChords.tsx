import React, { ReactElement } from 'react';
import {sendCommandString, readGetChordmapCount, MainControls} from '../controls/mainControls'



export async function getCount(){
    await sendCommandString("SELECT BASE");
    await readGetChordmapCount();
    const element: HTMLElement = document.getElementById("countDiv") as HTMLInputElement; //.innerHTML = "status: opened serial port";
      element.innerHTML = "Count: "+ MainControls._chordmapCountOnDevice;
  }

  export function GetCountButton(): ReactElement {
    return (
      <React.Fragment>

      <button
      className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
      color="pink"
      onClick={() => getCount()}
      >Count </button>
      </React.Fragment>
    );
  }






  