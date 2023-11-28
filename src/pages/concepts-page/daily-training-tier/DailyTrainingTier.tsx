import React, { useState } from 'react';
import { useStoreState, useStoreActions } from '../../../store/store';
import { GearIcon } from '../trainingComponent/GearIcon';
import { ProgressBar } from './ProgressBar';
import { StatisticsIcon } from '../trainingComponent/StatisticsIcon';
import { TrainingComponent } from '../trainingComponent/TrainingComponent';
import { DailyTrainingWelcome } from './DailyTrainingWelcome';
import {
  DailyTrainingContainer,
  FullWidthFullHeightContainer,
  HelperContainer,
  SmallScreenButtons,
  ConceptsMasteredManagerPageContainer,
  PageContainer,
  Column,
} from './DailyTrainingTier.styled';

interface DailyTrainingPageProps {
  setCurrentTier: (tier: number) => void;
}

export const DailyTrainingTier = ({
  setCurrentTier,
}: DailyTrainingPageProps) => {
  const setSessionTrainingData = useStoreActions(
    (actions) => actions.setSessionTrainingData,
  );
  const updateLocalStorage = useStoreActions(
    (actions) => actions.updateLocalStorage,
  );
  const activeFlashCards = useStoreState((state) => state.activeFlashCards);
  console.log('Active Flashcards: ', activeFlashCards);

  const [activeTraining, setActiveTraining] = useState(false);

  const startTraining = (numberSelected: number) => {
    setSessionTrainingData(numberSelected);
    setActiveTraining(true);
  };

  const endTraining = () => {
    updateLocalStorage();
    setActiveTraining(false);
  };

  return (
    <DailyTrainingContainer>
      {activeTraining ? (
        <ConceptsMasteredManagerPageContainer>
          <FullWidthFullHeightContainer>
            <HelperContainer>
              <ProgressBar />
            </HelperContainer>
            <SmallScreenButtons>
              <GearIcon />
              <StatisticsIcon />
            </SmallScreenButtons>
            <TrainingComponent setActiveTraining={endTraining} />
          </FullWidthFullHeightContainer>
        </ConceptsMasteredManagerPageContainer>
      ) : (
        <ConceptsMasteredManagerPageContainer
          style={{ maxWidth: '1300px', alignSelf: 'center' }}
        >
          <PageContainer style={{ maxWidth: '1300px' }}>
            <Column style={{ maxWidth: '1300px', alignItems: 'center' }}>
              <DailyTrainingWelcome
                setActiveTraining={startTraining}
                setCurrentTier={setCurrentTier}
              />
            </Column>
          </PageContainer>
        </ConceptsMasteredManagerPageContainer>
      )}
    </DailyTrainingContainer>
  );
};
