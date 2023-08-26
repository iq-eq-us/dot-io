import React, { ReactElement } from 'react';
import {
  MainControls,
  sendCommandString,
  selectBase,
  selectConfig,
} from '../controls/mainControls';
import { getId } from '../components/getID';
import { getCount } from '../../manager/components/countChords';
import { useStoreActions, useStoreState } from 'easy-peasy';

const CC_VENDOR_IDS = [0x239a, 0x303a]; // CharaChorder Vendor ID

export async function startSerialConnection() {
  console.log('startSerialConnection()');
  try {
    // Prompt user to select any serial port.

    MainControls.serialPort = await navigator?.serial?.requestPort({
      filters: CC_VENDOR_IDS.map((id) => ({ usbVendorId: id })),
    });
    console.log('requestPort()');
    // Wait for the serial port to open.
    await openSerialPort();
    await setupLineReader();
    await setCharaChorderToTypicalFunctionality();
    await getId();
    await getCount();
  } catch (error) {
    console.log(error);
    const element: HTMLInputElement = document?.getElementById(
      'statusDiv',
    ) as HTMLInputElement;

    if ('serial' in navigator) {
      // Browser supports Serial API
      element.innerHTML =
        'status: failed to open serial port; may already be open elsewhere';
    } else {
      // Browser does not support Serial API
      const element = document.getElementById('statusDiv') as HTMLInputElement;
      if (element != null) {
        element.innerHTML =
          'Your browser does not support the Serial API. <br /> Please use Google Chrome, Microsoft Edge, or another <a class="underline" href=https://caniuse.com/web-serial">browser that supports the Serial API.</a>';
      }
      return;
    }
  }
}

async function openSerialPort() {
  console.log('openSerialPort()');
  await MainControls.serialPort.open({ baudRate: 115200 });
  console.log('connected to serial port');

  const element: HTMLInputElement = document?.getElementById(
    'statusDiv',
  ) as HTMLInputElement; //.innerHTML = "status: opened serial port";
  //element.value = "Device: ";
  if (element != null) {
    element.innerHTML = 'status: opened serial port';
  }

  console.log(MainControls.serialPort.getInfo());
}

async function setupLineReader() {
  if (MainControls.serialPort) {
    console.log('setupLineReader()');
    const decoder = new TextDecoderStream();

    //preventAbort:true,

    console.log('writable ' + decoder.writable);
    console.log(MainControls.abortController1.signal.aborted);
    //MainControls.serialPort.readable.releaseLock()
    MainControls.abortController1 = new AbortController();
    MainControls.lineReaderDone = MainControls.serialPort.readable.pipeTo(
      decoder.writable,
      { signal: MainControls.abortController1.signal },
    );

    const inputStream = decoder.readable.pipeThrough(
      new TransformStream(new LineBreakTransformer()),
    );
    MainControls.lineReader = await inputStream.getReader();
    console.log('setup line reader');

    const element: HTMLElement = document.getElementById(
      'statusDiv',
    ) as HTMLInputElement; //.innerHTML = "status: opened serial port";
    if (element != null) {
      element.innerHTML = 'status: opened serial port and listening';
    }
  } else {
    console.log('serial port is not open yet');
  }
}

class LineBreakTransformer {
  chunks: any;

  constructor() {
    this.chunks = '';
  }

  transform(chunk: any, controller: any) {
    this.chunks += chunk;
    const lines = this.chunks.split('\r\n');
    this.chunks = lines.pop();
    lines.forEach((line: any) => controller.enqueue(line));
  }

  flush(controller: any) {
    controller.enqueue(this.chunks);
  }
}

async function setCharaChorderToTypicalFunctionality() {
  console.log('setCharaChorderToTypicalFunctionality()');
}
export async function exportableStartSerialConnection() {
  console.log('startSerialConnection()');
  try {
    // Prompt user to select any serial port.

    MainControls.serialPort = await navigator?.serial?.requestPort({
      filters: CC_VENDOR_IDS.map((id) => ({ usbVendorId: id })),
    });
    console.log('requestPort()');
    // Wait for the serial port to open.
    await openSerialPort();
    await setupLineReader();
    await setCharaChorderToTypicalFunctionality();
    await getId();
    await getCount();
  } catch (error) {
    console.log(error);

    const element: HTMLInputElement = document?.getElementById(
      'statusDiv',
    ) as HTMLInputElement;

    if ('serial' in navigator) {
      // Browser supports Serial API
      element.innerHTML =
        'status: failed to open serial port; may already be open elsewhere';
    } else {
      // Browser does not support Serial API
      const element = document.getElementById('statusDiv') as HTMLInputElement;
      if (element != null) {
        element.innerHTML =
          'Your browser does not support the Serial API. <br /> Please use Google Chrome, Microsoft Edge, or another <a class="underline" href=https://caniuse.com/web-serial">browser that supports the Serial API.</a>';
      }
      return;
    }
  }
}

export async function connectDeviceAndPopUp() {
  <div
    id="statusDiv"
    className="flex-row border-zinc-400 border-4	left-56 rounded-xl absolute ml-80 mt-24 justify-center h-2/5 bg-white"
  />;

  await exportableStartSerialConnection();
  await getId();
  await getCount();
  //window.dispatchEvent(new Event('resize'));

  //const manager: HTMLElement = document.getElementById("manager") as HTMLElement;
  //manager.classList.add("connected");
}

export function ConnectButton(): ReactElement {
  const setDeviceId = useStoreActions((store: any) => store.setDeviceId);

  const deviceId = useStoreState((store: any) => store.deviceId);

  async function startSerialConnection() {
    console.log('startSerialConnection()');
    try {
      // Prompt user to select any serial port.

      MainControls.serialPort = await navigator?.serial?.requestPort({
        filters: CC_VENDOR_IDS.map((id) => ({ usbVendorId: id })),
      });
      console.log('requestPort()');
      // Wait for the serial port to open.
      await openSerialPort();
      await setupLineReader();
      await setCharaChorderToTypicalFunctionality();
      const id = await getId();
      setDeviceId(id);
      console.log('this is the id' + id + ' ' + deviceId);
      await getCount();
    } catch (error) {
      console.log(error);

      const element: HTMLInputElement = document?.getElementById(
        'statusDiv',
      ) as HTMLInputElement;

      if ('serial' in navigator) {
        // Browser supports Serial API
        element.innerHTML =
          'status: failed to open serial port; may already be open elsewhere';
      } else {
        // Browser does not support Serial API
        const element = document.getElementById(
          'statusDiv',
        ) as HTMLInputElement;
        if (element != null) {
          element.innerHTML =
            'Your browser does not support the Serial API. <br /> Please use Google Chrome, Microsoft Edge, or another <a class="underline" href=https://caniuse.com/web-serial">browser that supports the Serial API.</a>';
        }
        return;
      }
    }
  }

  async function allFunc() {
    await startSerialConnection();
    await getCount();
    await getId();
    window.dispatchEvent(new Event('resize'));

    const manager: HTMLElement = document.getElementById(
      'manager',
    ) as HTMLElement;
    manager.classList.add('connected');
  }

  return (
    <React.Fragment>
      <div id="statusDiv" />
      <div id="countDiv" />
      <div id="device" />
      <button
        className="connect sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative"
        color="pink"
        onClick={() => allFunc()}
      >
        Connect{' '}
      </button>
    </React.Fragment>
  );
}
