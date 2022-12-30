import React, { ReactElement } from 'react';
import {
  MainControls,
    pressCommitButton,
    sendCommandString,
    readGetOneChordLayout

} from '../controls/mainControls'


export async function commitAll(){
    await sendCommandString("VAR B0");

  }
  
  export function CommitAllLayoutChanges(): ReactElement {
    return (
      <React.Fragment>

      <button
      className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
      color="pink"
      onClick={() => commitAll()}
      >Save Changes </button>
      </React.Fragment>
    );
  }