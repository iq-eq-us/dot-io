import React from 'react';
import { useStoreActions } from '../../../store/store';

export const AddFlashCard = () => {
  const addEmptyFlashCard = useStoreActions(
    (actions) => actions.addEmptyFlashCard,
  );
  const updateLocalStorage = useStoreActions(
    (actions) => actions.updateLocalStorage,
  );

  function addNewFlashCard() {
    addEmptyFlashCard();
    updateLocalStorage();
  }

  return (
    <React.Fragment>
      <button
        className="import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative"
        color="pink"
        onClick={() => addNewFlashCard()}
      >
        Add Empty Flashcard
      </button>
    </React.Fragment>
  );
};
