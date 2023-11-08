import FlashCard from './FlashCard';
import React, { ReactElement } from 'react';
import { useStoreState } from '../../../store/store';

export function FlashCardColumn(): ReactElement {
  const flashCards = useStoreState((state) => state.flashCards);

  //mapping over the flashcards and returning the flashcard and index
  const flashCardMap = flashCards.map((flashCard, index) => {
    return <FlashCard key={index} flashCard={flashCard} index={index} />;
  });

  return <React.Fragment>{flashCardMap}</React.Fragment>;
}
