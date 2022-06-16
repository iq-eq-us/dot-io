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
import TrainingControls from './TrainingControls';
import DropDown from '../../../models/keyboardDropDownFolder/keyboardDropDown';

function CenterTrainingColumn(): ReactElement {
  return (
    <React.Fragment>
    <CenterTrainingColumnContainer>
      <SmallScreenButtons>
      </SmallScreenButtons>
      <ChordTextInput />
      <TextPrompt />
      <FullWidthFullHeightContainer>
        <CharachorderOverlayLite />
      </FullWidthFullHeightContainer>
    <DropDown/>
    </CenterTrainingColumnContainer>
    </React.Fragment>
  );
}

const CenterTrainingColumnContainer = styled.div.attrs({
  className: 'flex flex-col text-center	 align-center w-full xl:w-5/6 ml-auto mr-auto lgml-36 relative bg-[#181818]' ,
})``;

const f = styled.div `

display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 40%;
  text-align: center;
  justify-content: center;
  flex-direction: column;
`;


const SmallScreenButtons = styled.div.attrs({
  className: 'xl:hidden flex flex-row justify-between w-full mb-4',
})``;

export default CenterTrainingColumn;
