import React, { ReactElement } from 'react';
import {appendToRow} from "../../manager/controls/mainControls"

export function addChordMap(){
    return appendToRow(["0000000000000000","< blank>","",""]);
  }

  export function AddChordMap(): ReactElement {
    return (
      <React.Fragment>
      <button
      className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
      onClick={() => addChordMap()}
      >Add Chord Map</button>
      </React.Fragment>
    );
  }