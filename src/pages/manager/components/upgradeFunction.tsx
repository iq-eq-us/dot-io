import React, { ReactElement } from 'react';
import {
    MainControls,
     sendCommandString, 
     selectBase,
     readGetOneChordmap
    } from '../controls/mainControls'
    import {resetDataTable} from '../../manager/components/resetDataTable'

export async function upgrade(){
    await sendCommandString("RST UPGRADE")
    
  }
  export function UpgradeFunction(): ReactElement {
    return (
      <React.Fragment>
      <div id="statusDiv" style={{display:'none'}} >Status: </div>

      <button
      className="text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-absolute"
      color="pink"
      onClick={() => upgrade()}
      >Upgrade Chords </button>
      </React.Fragment>
    );
  }