import React, { ReactElement } from 'react';
import { useStoreState } from '../../../store/store';
import { FlashCard } from './FlashCard';

interface FlashCardColumnProps {
  //flashCards: FlashCard[];
  selected: boolean[];
  setSelected: (index: number) => void;
  selectedTag: string;
}

export function FlashCardColumn({
  //flashCards,
  selected,
  setSelected,
  selectedTag,
}: FlashCardColumnProps): ReactElement {
  const flashCards = useStoreState((state) => state.flashCards);
  //const selectedTag = useStoreState((state) => state.selectedTags);

  // Filter flashcards based on the selected tag
  const filteredFlashCards =
    selectedTag === 'All' || selectedTag === ''
      ? flashCards
      : flashCards.filter((flashCard) => flashCard.tags.includes(selectedTag));

  const flashCardMap = filteredFlashCards.map((flashCard, index) => {
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
