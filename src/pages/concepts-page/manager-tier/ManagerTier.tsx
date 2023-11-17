import React, { ReactElement, useEffect, useState } from 'react';
import { useStoreState } from '../../../store/store';
import { ConceptsMasteredHeader } from './ConceptsMasteredHeader';
import { ImportFlashCards } from './ImportFlashcards';
import { ExportFlashCards } from './ExportFlashcards';
import { AddFlashCard } from './AddFlashcard';
import { FlashCardColumn } from './FlashCardColumn';
import { DialogPortal } from './DialogPortal';
import { TagSetDropdown } from './TagSetDropdown';
import { useStoreActions } from '../../../store/store';
import ImageSlider from '../imageSlider';
import {
  ConceptsMasteredManagerPageContainer,
  Table,
  HorizontalRule,
  PageContainer,
  TopSectionContainer,
  Column,
  ConceptsRow,
} from './ManagerTier.styled';

export const ManagerTier = (): ReactElement => {
  const flashCards = useStoreState((state) => state.flashCards);
  const tags = useStoreState((state) => state.tags);

  const [selectedFlashCards, setSelectedFlashCards] = useState<boolean[]>(
    new Array(flashCards.length).fill(false),
  );
  const [selectedTag, setSelectedTag] = useState<string>('');

  const setTag = useStoreActions((actions) => actions.setSelectedTag); // Add this line

  useEffect(() => {
    if (flashCards.length !== selectedFlashCards.length) {
      setSelectedFlashCards(new Array(flashCards.length).fill(false));
    }
  }, [flashCards]);

  const setSelected = (selected: number) => {
    setSelectedFlashCards((prev) => {
      const newSelected = [...prev];
      newSelected[selected] = !prev[selected];
      return newSelected;
    });
  };

  const selectedFlashcardIndices = selectedFlashCards.reduce(
    (indices, isSelected, index) => {
      if (isSelected) {
        indices.push(index);
      }
      return indices;
    },
    [],
  );

  //filter tags
  /*const filteredTags =
    selectedTag === 'All' || selectedTag === ''
      ? flashCards
      : flashCards.filter((flashCard) => flashCard.tags.includes(selectedTag));
      console.log('filteredTags: ' + filteredTags);*/

  return (
    <React.Fragment>
      <ConceptsMasteredManagerPageContainer>
        <TopSectionContainer>
          <ConceptsMasteredHeader />
          <HorizontalRule />
          <div className="font-mono text-xl text-center ml-2">
            Flash Card Library: Training images and translations
          </div>
          <HorizontalRule />
          <Table>
            <ConceptsRow>
              <ImportFlashCards />
              <ExportFlashCards />
            </ConceptsRow>
            <ConceptsRow>
              <AddFlashCard />
              <DialogPortal
                selectedFlashcardIndices={selectedFlashcardIndices}
              />
              <TagSetDropdown
                selectedTag={selectedTag}
                setSelectedTag={setSelectedTag}
              />
            </ConceptsRow>
          </Table>
          <PageContainer>
            <Column>
              <FlashCardColumn
                selected={selectedFlashCards}
                setSelected={setSelected}
                selectedTag={selectedTag}
              />
            </Column>
            <div className="h-1 w-6/12 mt-16 bg-[#3A5A42] rounded mb-10" />
          </PageContainer>
        </TopSectionContainer>
      </ConceptsMasteredManagerPageContainer>
    </React.Fragment>
  );
};
