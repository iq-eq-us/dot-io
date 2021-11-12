import React, { ReactElement } from 'react';
import { render } from 'react-dom';
import {
    MainControls,
     sendCommandString, 
     selectBase,
     readGetOneChordmap
    } from '../controls/mainControls'
    import {resetDataTable} from '../../manager/components/resetDataTable'

async function getGetAll(){
  resetDataTable();
    await selectBase(); //select BASE
    for(let i=0;i<MainControls._chordmapCountOnDevice;i++){
      console.log(MainControls._chordmapCountOnDevice);
      await sendCommandString("GETSOME "+(i+0).toString()+" "+(i+1).toString());
        console.log("MapID");
    console.log(MainControls._chordmapId);
      await readGetOneChordmap();
    }
    
  }
  export function Download(): ReactElement {
    return (
      <React.Fragment>
      <div id="statusDiv" style={{display:'none'}} >Status: </div>

      <button
      className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
      color="pink"
      onClick={() => getGetAll()}
      >Download Chords </button>
      </React.Fragment>
    );
  }