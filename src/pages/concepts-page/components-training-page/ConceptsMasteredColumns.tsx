import React, { ReactElement, useState } from 'react';
import styled from 'styled-components';
import CharachorderOverlay from './CharachorderOverlay';
import CharachorderOverlayLite from './CharachorderOverlayCharachorderLite';
import { FullWidthFullHeightContainer } from './FullWidthFullHeightContainer';
import { GearIcon } from './GearIcon';
import EditIcon from './EditIcon';
import { ProgressBar } from './ProgressBar';
import { StatisticsIcon } from './StatisticsIcon';
import { TextPrompt } from './TextPrompt';

export function ConceptsMasteredColumn(): ReactElement {
  console.log('rednering');

  return (
    <ConceptsMasteredColumnContainer>
      <SmallScreenButtons>
        <GearIcon />
        <StatisticsIcon />
      </SmallScreenButtons>
      <HelperContainer>Concepts Mastered</HelperContainer>
      <TextPrompt />
      <FullWidthFullHeightContainer />
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
