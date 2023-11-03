import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { FullWidthFullHeightContainer } from './FullWidthFullHeightContainer';
import { GearIcon } from './GearIcon';
import { ProgressBar } from './ProgressBar';
import { StatisticsIcon } from './StatisticsIcon';
import { TextPrompt } from './TextPrompt';
import { useStoreActions, useStoreState } from '../../../store/store';
import {
  ConceptsMasteredManagerPageContainer,
  PageContainer,
  Column,
} from '../concepts-manager-page.style';
import {
  CardContainer,
  InputIdentifiersForPhrase,
  InputIdentifiers,
  FlashCardEditButton,
  FlashCardSaveButton,
  PhraseTextBox,
  ChordTextBox,
} from './FlashCardSetColumn.styled';

interface FlashCardSetColumnProps {
  setTier: (tier: number) => void;
}

export function ConceptsMasteredColumn({
  setTier,
}: FlashCardSetColumnProps): ReactElement {
  const allFlashCardSets = useStoreState((state) => state.allFlashCardSets);

  const setActiveFlashCardSetIndex = useStoreActions(
    (actions) => actions.setActiveFlashCardSetIndex,
  );
  const setSessionTrainingData = useStoreActions(
    (state) => state.setSessionTrainingData,
  );

  const [activeTraining, setActiveTraining] = useState(false);

  const editFlashCardSet = (index: number) => {
    setActiveFlashCardSetIndex(index);
    setTier(2);
  };

  const startTraining = (index: number) => {
    setActiveFlashCardSetIndex(index);
    setSessionTrainingData();
    setActiveTraining(true);
    console.log('startTraining');
  };

  let generatedFlashCardSetView;

  if (allFlashCardSets.length != 0) {
    console.log('rendering');
    generatedFlashCardSetView = allFlashCardSets.map((flashCardSet, index) => {
      return (
        <CardContainer key="index">
          <InputIdentifiersForPhrase>
            Set Name:
            <PhraseTextBox
              value={flashCardSet.name}
              style={{ pointerEvents: 'none' }}
            />
          </InputIdentifiersForPhrase>
          <InputIdentifiers>
            # Cards
            <ChordTextBox
              value={flashCardSet.flashCards.length.toString()}
              style={{ pointerEvents: 'none' }}
            />
          </InputIdentifiers>
          <InputIdentifiers>
            Idle Queue Size
            <ChordTextBox
              value={flashCardSet.flashCards
                .filter((flashCard) => {
                  flashCard.nextReinforcement > new Date();
                  console.log(flashCard.nextReinforcement);
                })
                .length.toString()}
              style={{ pointerEvents: 'none' }}
            />
          </InputIdentifiers>
          <FlashCardEditButton onClick={() => editFlashCardSet(index)}>
            Edit Set
          </FlashCardEditButton>
          <FlashCardSaveButton
            onClick={() => startTraining(index)}
            style={{ marginRight: '.5rem' }}
            disabled={flashCardSet.nextTrainingDate > new Date()}
          >
            Begin Training
          </FlashCardSaveButton>
        </CardContainer>
      );
    });
  } else {
    console.log('No Flashcard Sets');
    generatedFlashCardSetView = (
      <HelperContainer>
        <h1>No Flashcard Sets</h1>
      </HelperContainer>
    );
  }

  return (
    <ConceptsMasteredColumnContainer>
      {activeTraining ? (
        <>
          <SmallScreenButtons>
            <GearIcon />
            <StatisticsIcon />
          </SmallScreenButtons>
          <TextPrompt setActiveTraining={setActiveTraining} />
          <FullWidthFullHeightContainer />
        </>
      ) : (
        <ConceptsMasteredManagerPageContainer
          style={{ maxWidth: '1300px', alignSelf: 'center' }}
        >
          <PageContainer style={{ maxWidth: '1300px' }}>
            <Column style={{ maxWidth: '1300px', alignItems: 'center' }}>
              {generatedFlashCardSetView}
            </Column>
          </PageContainer>
        </ConceptsMasteredManagerPageContainer>
      )}
    </ConceptsMasteredColumnContainer>
  );
}

const ConceptsMasteredColumnContainer = styled.div.attrs({
  className: 'flex flex-col align-center w-full',
})``;

const SmallScreenButtons = styled.div.attrs({
  className: 'xl:hidden flex flex-row justify-between w-full mb-4',
})``;

const ForgotPasswordButton = styled.div.attrs({
  className: 'xl:hidden flex flex-row justify-center w-full mb-4',
})``;

const HelperContainer = styled.div.attrs({
  className:
    'xl:hidden flex flex-row justify-center w-full mb-4 text-white font-mono',
})``;

const NavBtnLink = styled.a`
  border-radius: 50px;
  white-space: nowrap;
  padding: 10px 22px;
  color: #222424;
  font-size: 16px;
  outline: none;
  border: 1px solid white;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    color: #ffff;
    background: #01a049;
    transition: 0.3s ease out;
  }
`;
