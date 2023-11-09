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

export function ConceptsMasteredColumn(): ReactElement {
  const nextTrainingDate = useStoreState((state) => state.nextTrainingDate);

  const setSessionTrainingData = useStoreActions(
    (state) => state.setSessionTrainingData,
  );

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
              <button
                onClick={() => {
                  setSessionTrainingData();
                  setActiveTraining(true);
                }}
              >
                start
              </button>
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

const ForgotPasswordButton = styled.div.attrs({
  className: 'xl:hidden flex flex-row justify-center w-full mb-4',
})``;

const HelperContainer = styled.div.attrs({
  className: 'flex flex-row justify-center w-full mb-4 text-white font-mono',
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
