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

function TrainingModeSelector(): ReactElement {

  const beginTraining = useStoreActions((store: any) => store.beginTrainingMode);
  

  function TrainingPageFunction (){
    const payload : any [] = []
  payload.push('LEXICAL');
  payload.push('10');
    sessionStorage.removeItem("tempTestDeIncrement");
    beginTraining(payload);
 
  }
  function LearnPageFunction (value: string){
    const payload : any [] = []
    payload.push(value);
    sessionStorage.removeItem("tempTestDeIncrement");
    beginTraining(payload);
 
  }
    return (
      <React.Fragment>
      <p>Learn/Test</p> 
      <ItemsContainer>
      <button className="m-2" onClick={() => LearnPageFunction('ALPHABET')}>Alphabetic</button>
      <button className="m-2" onClick={() => LearnPageFunction('TRIGRAM')}>Amalgamate</button>
      <button className="m-2" onClick={() => LearnPageFunction('LEXICAL')}>Lexical</button>
      <button className="m-2" onClick={() => LearnPageFunction('SUPERSONIC')}>SuperSonic</button>
      </ItemsContainer>
      </React.Fragment>
  );
}

export default TrainingModeSelector;


const ItemsContainer = styled.div `
height: 50px;
display: flex;
position: relative;
flex-direction: row;
padding: '1rem';  
justify-content: center; 
align-items: center; 
`