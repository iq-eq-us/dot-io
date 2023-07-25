import React, { ReactElement } from 'react';
import { appendToRow } from '../../manager/controls/mainControls';
import { createChord } from '../../../models/managerModels';
import { useStoreActions, useStoreState } from 'easy-peasy';

export function AddChordMap(): ReactElement {
  const setSingleDownloadedChord = useStoreActions(
    (store) => store.setSingleDownloadedChord,
  );
  function addChordMap() {
    const newChordMap = createChord('', '', '', '');
    setSingleDownloadedChord(newChordMap);
  }
  return (
    <React.Fragment>
      <button
        className="sc-bYwzuL  text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222]"
        onClick={() => addChordMap()}
      >
        Add Chord Map
      </button>
    </React.Fragment>
  );
}
