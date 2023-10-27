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
} from '../concepts-mastered/concepts-mastered.style';
import { ConceptsMasteredHeader } from '../concepts-mastered/components/ConceptsMasteredHeader';
import { ImportFlashCards } from '../concepts-mastered/components/ImportFlashcards';
import { SaveFlashCards } from '../concepts-mastered/components/SaveFlashcards';
import { AddFlashCards } from '../concepts-mastered/components/AddFlashcards';
import { FlashCardColumn } from './components/FlashCardColumn';

const Concepts = (): ReactElement => {
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

export default Concepts;
