import React, { ReactElement, useState, useEffect } from 'react';
import {
  ConceptsMasteredManagerPageContainer,
  Table,
  HorizontalRule,
  RightTable,
  ChordContainer,
  PageContainer,
  TopSectionContainer,
  Column,
  ConceptsRow,
} from './concepts-manager-page.style';
import { ConceptsMasteredHeader } from './components-manager-page/ConceptsMasteredHeader';
import { ImportFlashCards } from './components-manager-page/ImportFlashcards';
import { SaveFlashCards } from './components-manager-page/SaveFlashcards';
import { AddFlashCards } from './components-manager-page/AddFlashcards';
import { FlashCardColumn } from './components-manager-page/FlashCardColumn';
import { FlashCardSetSelection } from './components-manager-page/FlashCardSetSelection';
import { DeleteFlashcards } from './components-manager-page/DeleteFlashcards';

const ConceptsManagerPage = (): ReactElement => {
  const [rerender, setRerender] = useState<boolean>(false);

  React.useEffect(() => {
    document.title = 'dot i/o Concepts Mastered';
  }, [rerender]);

  const reset = () => {
    setRerender(!rerender);
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
              <AddFlashCards />
              <SaveFlashCards />
              <FlashCardSetSelection forceRerender={reset} />
              <DeleteFlashcards />
            </ConceptsRow>
          </Table>

          <PageContainer>
            <Column>
              <ChordContainer>
                <ImportFlashCards forceRerender={reset} />
              </ChordContainer>
              <FlashCardColumn />
            </Column>
            <div className="h-1 w-6/12 mt-16 bg-[#3A5A42] rounded mb-10" />
          </PageContainer>
        </TopSectionContainer>
      </ConceptsMasteredManagerPageContainer>
    </React.Fragment>
  );
};

export default ConceptsManagerPage;
