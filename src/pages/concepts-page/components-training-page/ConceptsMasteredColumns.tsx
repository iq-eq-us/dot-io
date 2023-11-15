import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import { FullWidthFullHeightContainer } from './FullWidthFullHeightContainer';
import { GearIcon } from './GearIcon';
import { ProgressBar } from './ProgressBar';
import { StatisticsIcon } from './StatisticsIcon';
import { TextPrompt } from './TextPrompt';
import { useStoreState } from '../../../store/store';
import {
  ConceptsMasteredManagerPageContainer,
  PageContainer,
  Column,
} from '../concepts-manager-page.style';
import DailyTrainingWelcome from './DailyTrainingWelcome';

interface ConceptsMasteredColumnProps {
  setCurrentTier: (tier: number) => void;
}

export function ConceptsMasteredColumn({
  setCurrentTier,
}: ConceptsMasteredColumnProps): ReactElement {
  const nextTrainingDate = useStoreState((state) => state.nextTrainingDate);

  const [activeTraining, setActiveTraining] = useState(
    new Date() < nextTrainingDate,
  );

  return (
    <ConceptsMasteredColumnContainer>
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
    </ConceptsMasteredColumnContainer>
  );
}

const ConceptsMasteredColumnContainer = styled.div.attrs({
  className: 'flex flex-col align-center w-full',
})``;

const SmallScreenButtons = styled.div.attrs({
  className: 'flex flex-row justify-between w-full mb-4',
})``;

const HelperContainer = styled.div.attrs({
  className: 'flex flex-row justify-center w-full mb-4 text-white font-mono',
})``;
