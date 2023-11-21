import React, { ReactElement } from 'react';
import { useStoreState } from '../../../store/store';
import { FlashCard } from './FlashCard';

interface FlashCardColumnProps {
  selected: boolean[];
  setSelected: (index: number) => void;
  selectedTags: string[];
}

export function FlashCardColumn({
  selected,
  setSelected,
  selectedTags = [],
}: FlashCardColumnProps): ReactElement {
  const flashCards = useStoreState((state) => state.flashCards);

  const filteredFlashCards = flashCards.filter(
    (flashCard) =>
      selectedTags.length === 0 ||
      selectedTags.some((tag) => flashCard.tags.includes(tag)),
  );

  const flashCardMap = filteredFlashCards.map((flashCard, index) => {
    const originalIndex = flashCards.findIndex(
      (original) => original === flashCard,
    );
    return (
      <FlashCard
        key={originalIndex}
        flashCard={flashCard}
        index={index}
        selected={selected[originalIndex]}
        setSelected={setSelected}
      />
    );
  });

  return <React.Fragment>{flashCardMap}</React.Fragment>;
}
