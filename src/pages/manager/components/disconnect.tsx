import React, { ReactElement } from 'react';
import {MainControls} from '../controls/mainControls'
import {resetDataTable} from '../../manager/components/resetDataTable'


  export async function disconnectSerialConnection(){
    console.log('disconnectSerialConnection()');
    if(MainControls.serialPort){
      console.log('closing serial port');
      MainControls.lineReader.releaseLock();
      console.log(MainControls.serialPort.readable);
      await MainControls.abortController1.abort();
      await MainControls.lineReaderDone.catch(() => { /* Ingore the error */});
      await MainControls.serialPort.close();
      MainControls.abortController1 = new AbortController();

      console.log('serial port is closed');

      const element: HTMLElement = document.getElementById("statusDiv") as HTMLInputElement; //.innerHTML = "status: opened serial port";
      element.innerHTML = "status: closed serial port";
      resetDataTable();
    }else{
      console.log('there is no serial connection open to close');
    }
  }



  export function DisconnectButton(): ReactElement {
    return (
      <React.Fragment>
      <div id="statusDiv" style={{display:'none'}} >status: </div>

      <button
      className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-absolute"
      color="pink"
      onClick={() => disconnectSerialConnection()}
      >Disconnect </button>
      </React.Fragment>
    );
  }