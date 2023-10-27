import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useStoreState } from '../../../store/store';
import { FlashCardManagerCard } from './FlashCardManagerCard';

export function FlashCardColumn(): ReactElement {
  const activeFlashCards = useStoreState(
    (state) => state.allFlashCardSets[state.activeFlashCardSetIndex],
  );
  console.log(activeFlashCards);

  const renderedFlashCards = activeFlashCards.flashCards.map(
    (flashCard, index) => {
      return <FlashCardManagerCard flashCard={flashCard} key={index} />;
    },
  );

  return <CardColumn>{renderedFlashCards}</CardColumn>;
}

const CardColumn = styled.div.attrs({
  className: `flex flex-wrap flex-row items-center center justify-center`,
})``;
