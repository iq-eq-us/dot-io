import React, { ReactElement } from 'react';
import store, { useStoreActions } from '../../../store/store';

export function DeleteFlashcards(): ReactElement {
  const removeActiveFlashCardSet = useStoreActions(
    (store) => store.removeActiveFlashCardSet,
  );
  const updateLocalStorage = useStoreActions(
    (store) => store.updateLocalStorage,
  );

  return (
    <React.Fragment>
      <div id="statusDiv" />
      <div id="countDiv" />
      <div id="device" />
      <button
        className="import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative"
        color="pink"
        onClick={() => {
          removeActiveFlashCardSet();
          updateLocalStorage();
        }}
      >
        Delete Set
      </button>
    </React.Fragment>
  );
}
