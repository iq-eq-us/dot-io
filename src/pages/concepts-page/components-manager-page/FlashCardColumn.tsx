import styled from 'styled-components';
import FlashCard from './FlashCard';
import React, { ReactElement, useEffect } from 'react';
import type { flashCard } from '../../../models/flashCardsModel';
import { useStoreActions, useStoreState } from '../../../store/store';
import { Card, Dropdown } from 'react-bootstrap';

export function FlashCardColumn(): ReactElement {
  const [rerender, setRerender] = React.useState<boolean>(false);

  useEffect(() => {}, [rerender]);

  const reset = () => {
    setRerender(!rerender);
  };

  const activeFlashCards = useStoreState(
    (state) => state.allFlashCardSets[state.activeFlashCardSetIndex],
  );

  //mapping over the flashcards and returning the flashcard and index
  const flashCardMap = activeFlashCards.flashCards.map((flashCard, index) => {
    return (
      <FlashCard
        key="index"
        flashCard={flashCard}
        index={index}
        forceRerender={reset}
      />
    );
  });

  return <React.Fragment>{flashCardMap}</React.Fragment>;
}

const CardColumn = styled.div.attrs({
  className: 'flex flex-wrap flex-row items-center center justify-center',
})``;
