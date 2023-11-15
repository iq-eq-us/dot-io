import React, { ReactElement } from 'react';
import { useStoreState } from '../../../store/store';
import { FlashCard } from './FlashCard';

interface FlashCardColumnProps {
  selected: boolean[];
  setSelected: (index: number) => void;
}

export function FlashCardColumn({
  selected,
  setSelected,
}: FlashCardColumnProps): ReactElement {
  const flashCards = useStoreState((state) => state.flashCards);

  const flashCardMap = flashCards.map((flashCard, index) => {
    return (
      <FlashCard
        key={index}
        flashCard={flashCard}
        index={index}
        selected={selected[index]}
        setSelected={setSelected}
      />
    );
  });

  return <React.Fragment>{flashCardMap}</React.Fragment>;
}
