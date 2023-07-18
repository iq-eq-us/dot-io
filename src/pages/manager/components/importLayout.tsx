import React, { ReactElement } from 'react';
import { sendCommandString } from '../controls/mainControls';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { createChordLayout } from '../../../models/managerModels';

export function ImportChordLayout(): ReactElement {
  const clearDownloadedChordLayout = useStoreActions(
    (store) => store.clearDownloadedChordLayout,
  );
  const setDownloadedChordLayout = useStoreActions(
    (store) => store.setDownloadedChordLayout,
  );
  const downloadedChordsLayout = useStoreState(
    (store) => store.downloadedChordLayout.chordLayout,
  );
  const setImportedChordsLayout = useStoreActions(
    (store) => store.setImportedChordsLayout,
  );

  //const downloadedChordLayout = useStoreState((store) => store.downloadedChordLayout);

  const thisArray = [];
  const newArray = [];

  const delay = (delayInms) => {
    return new Promise((resolve) => setTimeout(resolve, delayInms));
  };

  async function storeAllChanges() {
    //console.log(thisArray.replace(/(\r\n|\n|\r)/gm, ""))
    for (let i = 0; i < thisArray.length; i++) {
      await sendCommandString(newArray[i].replace(/(\r\n|\n|\r)/gm, ''));
      await delay(10);
    }
  }

  async function importLayoutLibrary(e: any) {
    clearDownloadedChordLayout();
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file, 'UTF-8');
    const strValues = ['', '', '', ''];
    fileReader.onload = async (readerEvent) => {
      const content = readerEvent.target.result;
      console.log(content);
      //add here asdf
      const lines = content.split('\n');
      await lines.forEach(async (line) => {
        const strAllValues = line.split(',');

        //console.log('dur '+ strAllValues)
        //const myArray = value.split(' ');

        //strValues[0] = strAllValues[1];
        strValues[1] = strAllValues[0];
        strValues[2] = strAllValues[1];
        strValues[3] = strAllValues[2];
        strValues[4] = strAllValues[3];

        //_chordLayout.push([convertHexadecimalChordToHumanString(hexChordString),strValues[1]]); //this ultimately isn't used

        //await appendLayoutToRow(strValues, true);
        // thisArray.push("VAR B4 "+strAllValues[0] +" "+strAllValues[1] +" "+strAllValues[2]);
        const temp = createChordLayout(
          strAllValues[0],
          strAllValues[1],
          strAllValues[2],
        );
        thisArray.push(temp);
        newArray.push(
          'VAR B4 ' +
            strAllValues[0] +
            ' ' +
            strAllValues[1] +
            ' ' +
            strAllValues[2],
        );
      });
      setImportedChordsLayout(thisArray);
      await storeAllChanges();
    };
  }

  function click() {
    document.getElementById('file-input-layout').click();
    const element: HTMLInputElement = document.getElementById(
      'file-input-layout',
    ) as HTMLInputElement; //.innerHTML = "status: opened serial port";
    element.addEventListener('input', importLayoutLibrary);
  }

  return (
    <React.Fragment>
      <input
        id="file-input-layout"
        type="file"
        name="name"
        style={{ display: 'none' }}
        accept=".csv"
      />

      <button
        id="importLayoutLibrary"
        className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
        onClick={() => {
          click();
        }}
      >
        Import Layout
      </button>
    </React.Fragment>
  );
}
