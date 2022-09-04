import React, { ReactElement } from 'react';
import styled from 'styled-components';
import CharachorderOverlayLite from './CharachorderOverlayCharachorderLite';
import { FullWidthFullHeightContainer } from './FullWidthFullHeightContainer';
import { TextPrompt } from './TextPrompt';
import ChordTextInput from './ChordTextInput';
import DropDown from '../../../models/keyboardDropDownFolder/keyboardDropDown';
import Footer from '../../../../src/components/footer';
import NextTestButton from './NextTestButton';
import RefreshButton from './RefreshButton';

function CenterTrainingColumn(): ReactElement {
  return (
    <React.Fragment>
      <CenterTrainingColumnContainer>
      <SmallScreenButtons/>
      <ChordTextInput />
      <TextPrompt />
      <ItemsContainer>
      <RefreshButton/>
      <NextTestButton/>
      </ItemsContainer>
      <FullWidthFullHeightContainer>
      <CharachorderOverlayLite />
      </FullWidthFullHeightContainer>
      <DropDown/>
      <Footer/>
      </CenterTrainingColumnContainer>
    </React.Fragment>
  );
}

const CenterTrainingColumnContainer = styled.div.attrs({
  className: 'flex flex-col text-center	 align-center w-full xl:w-5/6 ml-auto mr-auto lgml-36 relative bg-[#181818]' ,
})``;

const ItemsContainer = styled.div `
height: 50px;
display: flex;
position: relative;
flex-direction: row;
padding: '1rem';  
justify-content: center; 
align-items: center; 
`
//items-center justify-center content-center items-center
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
