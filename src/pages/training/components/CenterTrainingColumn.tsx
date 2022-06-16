import React, { ReactElement } from 'react';
import styled from 'styled-components';
import CharachorderOverlay from './CharachorderOverlay';
import CharachorderOverlayLite from './CharachorderOverlayCharachorderLite';
import { FullWidthFullHeightContainer } from './FullWidthFullHeightContainer';
import { GearIcon } from './GearIcon';
import { ProgressBar } from './ProgressBar';
import { StatisticsIcon } from './StatisticsIcon';
import { TextPrompt } from './TextPrompt';
import ChordTextInput from './ChordTextInput';

function CenterTrainingColumn(): ReactElement {
  return (
    <CenterTrainingColumnContainer>
      <SmallScreenButtons>
        <GearIcon />
        <StatisticsIcon />
      </SmallScreenButtons>
      <ProgressBar />
      <TextPrompt />
      <ChordTextInput />
      <FullWidthFullHeightContainer>
        <CharachorderOverlayLite />
      </FullWidthFullHeightContainer>
    </CenterTrainingColumnContainer>
  );
}

const CenterTrainingColumnContainer = styled.div.attrs({
  className: 'flex flex-col align-center w-full xl:w-1/2 m-8 lgml-36 relative',
})``;

const SmallScreenButtons = styled.div.attrs({
  className: 'xl:hidden flex flex-row justify-between w-full mb-4',
})``;

export default CenterTrainingColumn;
