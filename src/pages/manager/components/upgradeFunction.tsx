import React, { ReactElement } from 'react';
import {
     sendCommandString, 
    } from '../controls/mainControls'


export async function upgrade(){
    await sendCommandString("RST UPGRADECML")
    
  }
  export function UpgradeFunction(): ReactElement {
    return (
      <React.Fragment>
      <div id="statusDiv" style={{display:'none'}} >Status: </div>

      <button
      className="text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-absolute"
      color="pink"
      onClick={() => upgrade()}
      >Upgrade Library </button>
      </React.Fragment>
    );
  }