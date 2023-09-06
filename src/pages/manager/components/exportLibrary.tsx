import React, { ReactElement } from 'react';
import {
  sendCommandString,
  readGetChordmapCount,
  MainControls,
} from '../controls/mainControls';
import { _chordMaps } from '../controls/maps';
import { useStoreState, useStoreActions } from 'easy-peasy';

export function Export(): ReactElement {
  const clearDownloadedChords = useStoreActions(
    (store) => store.clearDownloadedChords,
  );
  const downloadedChords = useStoreState(
    (store) => store.downloadedChords.chords,
  );

  function exportChordMapLibrary() {
    let csvRows = [];
    //iterate through table from bottom to top to capture all the chords and phrases
    _chordMaps.splice(0, _chordMaps.length);
    for (let i = 0; i < downloadedChords.length; i++) {
      //start a 1 to skip the header
      _chordMaps.push(
        downloadedChords[i].currentChord +
          ',' +
          downloadedChords[i].currentPhrase,
      );
      _chordMaps.push();
    }
    csvRows.push(_chordMaps.join('\n'));

    //csvRows.push(_chordMaps.join(','))
    const csvData = csvRows.join('\n');
    //start a 1 to skip the header
    // Returning the array joining with new line
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'CharaChorder_ChordLibrary.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    csvRows = [];
  }

  return (
    <React.Fragment>
      {downloadedChords.length > 0 && (
        <button
          className="sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
          color="pink"
          onClick={() => exportChordMapLibrary()}
        >
          Export Library{' '}
        </button>
      )}
    </React.Fragment>
  );
}
