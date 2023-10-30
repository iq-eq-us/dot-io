import React, { ReactElement } from 'react';
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

const ConceptsManagerPage = (): ReactElement => {
  React.useEffect(() => {
    document.title = 'dot i/o Concepts Mastered';
  }, []);

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
            </ConceptsRow>
          </Table>

          <PageContainer>
            <Column>
              <ChordContainer>
                <div />
                <div />
                <ImportFlashCards />
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
