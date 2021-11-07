import React, { ReactElement } from 'react';
import {sendCommandString,readGetNone} from '../controls/mainControls'
import {startSerialConnection} from '../../manager/components/connect'
export async function reboot(){
    //Sends the restart command to the charachorder via the serial API
    await sendCommandString("RESTART");
    await readGetNone();
  }

  export async function here(){
    await navigator.serial.addEventListener('disconnect', e => {
      // Remove |e.port| from the UI. If the device was open the
      // disconnection can also be observed as a stream error.
      console.log('serial port disconnected');
    });

    await navigator.serial.addEventListener('connect', e => {
      // Add |e.port| to the UI or automatically connect.
      console.log('serial port connected');
    });
  }
  export function RebootButton(): ReactElement {
    return (
      <React.Fragment>

      <button
      className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
      color="pink"
      onClick={() => {here();reboot();}}
      >Reboot </button>
      </React.Fragment>
    );
  }