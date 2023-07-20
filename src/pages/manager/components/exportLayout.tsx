import React, { ReactElement } from 'react';
import { useStoreState, useStoreActions } from 'easy-peasy';
import {
  sendCommandString,
  readGetOneChordLayout,
} from '../controls/mainControls';
import { _chordLayout } from '../controls/maps';
import { createChordLayout } from '../../../models/managerModels';

export function ExportChordLayout(): ReactElement {
  const setDownloadedChordLayout = useStoreActions(
    (store) => store.setDownloadedChordLayout,
  );
  const downloadedChordLayout = useStoreState(
    (store) => store.downloadedChordLayout.chordLayout,
  );

  async function exportChordMapLayout() {
    const tempHere = [];
    for (let i = 1; i < 4; i++) {
      for (let t = 0; t < 90; t++) {
        await sendCommandString('VAR B3 A' + i + ' ' + t);
        const inChordLayout = await readGetOneChordLayout();
        const tempCreated = createChordLayout(
          inChordLayout[1],
          inChordLayout[2],
          inChordLayout[3],
        );
        setDownloadedChordLayout(tempCreated);
        tempHere.push(tempCreated);
      }
    }

    //iterate through table from bottom to top to capture all the chords and phrases
    let csvRows = [];
    //iterate through table from bottom to top to capture all the chords and phrases
    _chordLayout.splice(0, _chordLayout.length);
    for (let i = 0; i < tempHere.length; i++) {
      //start a 1 to skip the header
      _chordLayout.push(
        tempHere[i].keyMap +
          ',' +
          tempHere[i].keyMapPosition +
          ',' +
          tempHere[i].keyMapValue,
      );
    }
    csvRows.push(_chordLayout.join('\n'));
    console.log(tempHere.length);
    console.log(_chordLayout);
    const csvData = csvRows.join('\n');

    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'CharaChorder_ChordLayout.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    csvRows = [];
  }
  return (
    <React.Fragment>
      <button
        className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
        color="pink"
        onClick={() => exportChordMapLayout()}
      >
        Export Layout{' '}
      </button>
    </React.Fragment>
  );
}
