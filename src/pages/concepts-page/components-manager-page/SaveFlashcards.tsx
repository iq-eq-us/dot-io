import React, { ReactElement } from 'react';
import { useStoreActions } from '../../../store/store';

export function SaveFlashCards(): ReactElement {
  const exportActiveFlashCardSetCSV = useStoreActions(
    (store) => store.exportActiveFlashCardSetCSV,
  );

  return (
    <React.Fragment>
      <div id="statusDiv" />
      <div id="countDiv" />
      <div id="device" />
      <button
        className="import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative"
        color="pink"
        onClick={() => exportActiveFlashCardSetCSV()}
      >
        Save Flashcards{' '}
      </button>
    </React.Fragment>
  );
}
