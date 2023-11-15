import React from 'react';
import { useStoreActions } from '../../../store/store';

interface DeleteFlashcardsProps {
  selectedFlashCards: boolean[];
}

export const DeleteFlashcards = ({
  selectedFlashCards,
}: DeleteFlashcardsProps) => {
  const updateLocalStorage = useStoreActions(
    (store) => store.updateLocalStorage,
  );
  const removeFlashCard = useStoreActions((store) => store.removeFlashCard);

  const deleteSelectedFlashCards = () => {
    selectedFlashCards.forEach((selected, index) => {
      if (selected) {
        removeFlashCard(index);
      }
    });
    updateLocalStorage();
  };

  return (
    <React.Fragment>
      <div id="statusDiv" />
      <div id="countDiv" />
      <div id="device" />
      <button
        className="import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative"
        color="pink"
        onClick={() => {
          deleteSelectedFlashCards();
        }}
      >
        Delete Set
      </button>
    </React.Fragment>
  );
};
