import React, { ReactElement } from 'react';
import { useStoreActions, useStoreState } from '../../../store/store';
import type { flashCard } from 'src/models/flashCardsModel';
//import { AddHeaders } from './addHeaders';

export function AddFlashCards(): ReactElement {
  const addFlashCard = useStoreActions((actions) => actions.addFlashCard);
  const activeFlashCards = useStoreState(
    (state) => state.allFlashCardSets[state.activeFlashCardSetIndex],
  );
  const emptyFlashCard: flashCard = {
    image: false,
    question: '',
    answer: '',
    url: '',
    tags: [],
    ebbinghausValue: 0,
    lastReinforcement: new Date(),
  };

  function addNewFlashCard() {
    //const newFlashCard = activeFlashCards.flashCards.push(emptyFlashCard);
    addFlashCard(emptyFlashCard);
    console.log('flashCardSet', activeFlashCards);
  }

  return (
    <React.Fragment>
      <button
        className="import sc-bYwzuL text-white rounded p-2 mb-4 inline-block ml-2 bg-[#333] hover:bg-[#3b3b3b] active:bg-[#222] position-relative"
        color="pink"
        onClick={() => addNewFlashCard()}
      >
        Add Flashcards
      </button>
    </React.Fragment>
  );
}
