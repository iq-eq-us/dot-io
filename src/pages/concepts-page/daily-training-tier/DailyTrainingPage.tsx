import React, { useState } from 'react';
import { useStoreState } from '../../../store/store';
import { GearIcon } from './GearIcon';
import { ProgressBar } from './ProgressBar';
import { StatisticsIcon } from './StatisticsIcon';
import { TextPrompt } from '../trainingComponent/TrainingComponent';
import { DailyTrainingWelcome } from './DailyTrainingWelcome';
import {
  DailyTrainingContainer,
  FullWidthFullHeightContainer,
  HelperContainer,
  SmallScreenButtons,
  ConceptsMasteredManagerPageContainer,
  PageContainer,
  Column,
} from './DailyTrainingPage.styled';

interface DailyTrainingPageProps {
  setCurrentTier: (tier: number) => void;
}

export const DailyTrainingPage = ({
  setCurrentTier,
}: DailyTrainingPageProps) => {
  const nextTrainingDate = useStoreState((state) => state.nextTrainingDate);

  const [activeTraining, setActiveTraining] = useState(
    new Date() < nextTrainingDate,
  );

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
            <TextPrompt setActiveTraining={setActiveTraining} />
          </FullWidthFullHeightContainer>
        </>
      ) : (
        <ConceptsMasteredManagerPageContainer
          style={{ maxWidth: '1300px', alignSelf: 'center' }}
        >
          <PageContainer style={{ maxWidth: '1300px' }}>
            <Column style={{ maxWidth: '1300px', alignItems: 'center' }}>
              <DailyTrainingWelcome
                setActiveTraining={setActiveTraining}
                setCurrentTier={setCurrentTier}
              />
            </Column>
          </PageContainer>
        </ConceptsMasteredManagerPageContainer>
      )}
    </DailyTrainingContainer>
  );
};
