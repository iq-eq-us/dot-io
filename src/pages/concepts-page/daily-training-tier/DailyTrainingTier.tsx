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
  const nextTrainingDate = useStoreState((state) => state.nextTrainingDate);
  const setSessionTrainingData = useStoreActions(
    (actions) => actions.setSessionTrainingData,
  );
  const setNextDailyTraining = useStoreActions(
    (actions) => actions.setNextDailyTraining,
  );
  const updateLocalStorage = useStoreActions(
    (actions) => actions.updateLocalStorage,
  );

  const [activeTraining, setActiveTraining] = useState(
    new Date() < nextTrainingDate,
  );

  const startTraining = () => {
    setSessionTrainingData();
    setActiveTraining(true);
  };

  const endTraining = () => {
    setNextDailyTraining();
    updateLocalStorage();
    setActiveTraining(false);
  };

  return (
    <DailyTrainingContainer>
      {activeTraining ? (
        <>
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
        </>
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
