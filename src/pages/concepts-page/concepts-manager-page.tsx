import React, { ReactElement, useEffect, useState } from 'react';
import {
  ConceptsMasteredManagerPageContainer,
  Table,
  HorizontalRule,
  ChordContainer,
  PageContainer,
  TopSectionContainer,
  Column,
  ConceptsRow,
} from './concepts-manager-page.style';
import { useStoreState } from '../../store/store';
import { ConceptsMasteredHeader } from './components-manager-page/ConceptsMasteredHeader';
import { ImportFlashCards } from './components-manager-page/ImportFlashcards';
import { ExportFlashCards } from './components-manager-page/ExportFlashcards';
import { AddFlashCard } from './components-manager-page/AddFlashcard';
import { FlashCardColumn } from './components-manager-page/FlashCardColumn';
import { DialogPortal } from './components-manager-page/DialogPortal';
import { TagSetDropdown } from './components-manager-page/TagSetDropdown';

const ConceptsManagerPage = (): ReactElement => {
  const flashCards = useStoreState((state) => state.flashCards);

  const tags = useStoreState((state) => state.tags);

  const [selectedFlashCards, setSelectedFlashCards] = useState<boolean[]>(
    new Array(flashCards.length).fill(false),
  );
  const [selectedTag, setSelectedTag] = useState<string>('');

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
              <DialogPortal />
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
              />
            </Column>
            <div className="h-1 w-6/12 mt-16 bg-[#3A5A42] rounded mb-10" />
          </PageContainer>
        </TopSectionContainer>
      </ConceptsMasteredManagerPageContainer>
    </React.Fragment>
  );
};

export default ConceptsManagerPage;
