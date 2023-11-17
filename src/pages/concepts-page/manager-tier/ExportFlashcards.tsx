import React from 'react';
import { useStoreState } from '../../../store/store';
import downloadCSV from '../util/downloadCSV';

export const ExportFlashCards = () => {
  const flashCards = useStoreState((store) => store.flashCards);

  return (
    <React.Fragment>
      <div id="statusDiv" />
      <div id="countDiv" />
      <div id="device" />
      <button
        className="import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative"
        color="pink"
        onClick={() => downloadCSV(flashCards)}
      >
        Save Flashcards{' '}
      </button>
    </React.Fragment>
  );
};
