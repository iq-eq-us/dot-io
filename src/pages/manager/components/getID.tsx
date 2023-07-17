import React, { ReactElement } from 'react';
import { _actionMap, _keyMapDefaults } from '../controls/maps';
import {
  MainControls,
  sendCommandString,
  readGetOneAndReturnOne,
} from '../controls/mainControls';

export async function getId() {
  await sendCommandString('CML C0');
  const { value } = await MainControls.lineReader.read().catch(console.error);

  await sendCommandString('ID');
  MainControls._chordmapId = await readGetOneAndReturnOne();

  await sendCommandString('VERSION');
  MainControls._firmwareVersion = await readGetOneAndReturnOne();

  console.log(
    'Just got here ' +
      MainControls._chordmapId +
      ' ' +
      MainControls._firmwareVersion,
  );
  const element: HTMLElement = document.getElementById(
    'statusDiv',
  ) as HTMLInputElement; //.innerHTML = "status: opened serial port";
  element.innerHTML =
    'Device ' +
    MainControls._chordmapId +
    ' --- CCOS ' +
    MainControls._firmwareVersion;
}

export function GetID(): ReactElement {
  return (
    <React.Fragment>
      <button
        className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
        color="pink"
        onClick={() => getId()}
      >
        Get ID{' '}
      </button>
    </React.Fragment>
  );
}
