import React from 'react';
import { useStoreState, useStoreActions } from '../../../store/store';
import Dropdown from './Dropdown';

interface FlashCardSetSelectionProps {
  forceRerender: () => void;
}

export const FlashCardSetSelection = ({
  forceRerender,
}: FlashCardSetSelectionProps) => {
  const allFlashCardSets = useStoreState((state) => state.allFlashCardSets);
  const activeFlashCardSetIndex = useStoreState(
    (state) => state.activeFlashCardSetIndex,
  );

  const setActiveFlashCardSetIndex = useStoreActions(
    (actions) => actions.setActiveFlashCardSetIndex,
  );

  const setNames = allFlashCardSets.map((flashCardSet) => flashCardSet.name);
  console.log(activeFlashCardSetIndex);

  const onSelectedChange = (selected: number) => {
    setActiveFlashCardSetIndex(selected);
    forceRerender();
  };

  return (
    <Dropdown
      name="Select Flash Card"
      onSelectedChange={onSelectedChange}
      options={setNames}
      selected={activeFlashCardSetIndex}
    />
  );
};
