import React, { ReactElement } from 'react';
import { useStoreActions } from '../../../store/store';
import type { flashCard } from 'src/models/flashCardsModel';

export function AddFlashCards(): ReactElement {
  const addFlashCard = useStoreActions((actions) => actions.addFlashCard);

  const emptyFlashCard: flashCard = {
    image: false,
    question: '',
    answer: '',
    url: '',
    tags: [],
    ebbinghausValue: 0,
    lastReinforcement: new Date(),
  };

  return (
    <React.Fragment>
      <button
        className="import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative"
        color="pink"
        onClick={() => addFlashCard(emptyFlashCard)}
      >
        Add Flashcards
      </button>
    </React.Fragment>
  );
}
