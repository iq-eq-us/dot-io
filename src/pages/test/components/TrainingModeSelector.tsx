import React, { ReactElement, useEffect } from 'react';
import useScreenSizeBoundary from '../../../hooks/useScreenSizeBoundary';
import useWindowSize from '../../../hooks/useWindowSize';
import { useStoreActions, useStoreState } from '../../../store/store';
import { AutoCustomSetting } from './AutoCustomSetting';
import {
  HighlightCheckboxSetting,
  RecursionCheckboxSetting,
  HUDCheckboxSetting,
  AutosaveSetting,
} from './CheckboxSettings';
import DropDown from '../../../models/keyboardDropDownFolder/keyboardDropDown';
import { ContrastInputSetting } from './ContrastInputSetting';
import { SettingsColumnContainer } from './SettingsColumnContainer';
import { SettingsForm } from './SettingsForm';
import { SettingsHeader } from './SettingsHeader';
import { CustomTrainingSettingsBox } from './CustomTrainingSettingsBox';
import TrainingControls from './TrainingControls';
import styled from 'styled-components';
import HelpCircleIcon from './HelpCircleIcon';
import { isNumber } from 'lodash';

function TrainingModeSelector(): ReactElement {

  const beginTraining = useStoreActions((store: any) => store.beginTrainingMode);
  const trainingScenario = useStoreState((store: any) => store.currentTrainingScenario);
  const testValue = useStoreState((store: any) => store.wordTestNumber);


  function LearnPageFunction (value: string){
    const payload : any [] = []
    payload.push(value);
    sessionStorage.removeItem("tempTestDeIncrement");
    beginTraining(payload);
  }
  function TestPageFunction (value: string, testLength : any){
    const payload : any [] = [];
    payload.push(value);
    payload.push(testLength);
        sessionStorage.removeItem("tempTestDeIncrement");
    sessionStorage.removeItem('Refresh');
    sessionStorage.setItem("CustomNonRefresh", JSON.stringify(1))
    sessionStorage.removeItem("tempTestDeIncrement");
    beginTraining(payload);
 
  }
    return (
      <React.Fragment>
      <ItemsContainer>
      <button {...trainingScenario == 'ALPHABET' ? {className:" text-white m-2"}: {className:" text-neutral-400 m-2"} } onClick={() => [LearnPageFunction('ALPHABET')]}>Letters</button>
      <div>/</div>
      <button  {...trainingScenario == 'TRIGRAM' ? {className:" text-white m-2"}: {className:" text-neutral-400 m-2"} } onClick={() => [LearnPageFunction('TRIGRAM'), document.getElementById('txt_Name')?.focus()]}>Trigrams</button>
      <div>/</div>
      <button {...trainingScenario == 'LEXICAL'&& isNumber(testValue) !=true ? {className:" text-white m-2"}: {className:" text-neutral-400 m-2"} } onClick={() => [LearnPageFunction('LEXICAL'), document.getElementById('txt_Name')?.focus()]}>Words</button>
      <div>/</div>
      <button {...trainingScenario == 'LEXICAL' && isNumber(testValue) ? {className:" text-white m-2"}: {className:" text-neutral-400 m-2"} } onClick={() => [TestPageFunction('LEXICAL', 26), document.getElementById('txt_Name')?.focus()]}>Test</button>
      </ItemsContainer>
      </React.Fragment>
  );
}

export default TrainingModeSelector;


const ItemsContainer = styled.div `
height: 50px;
display: flex;
color: white;
position: relative;
flex-direction: row;
padding: '1rem';  
justify-content: center; 
align-items: center; 
`