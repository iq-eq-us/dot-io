import React, { ReactElement, useEffect } from 'react';
import useWindowSize from '../../../hooks/useWindowSize';
import { useStoreActions, useStoreState } from '../../../store/store';
import { AutoCustomSetting } from './AutoCustomSetting';
import {
  HighlightCheckboxSetting,
  RecursionCheckboxSetting,
  HUDCheckboxSetting,
  AutosaveSetting,
} from './CheckboxSettings';
import { ContrastInputSetting } from './ContrastInputSetting';
import { SettingsColumnContainer } from './SettingsColumnContainer';
import { SettingsForm } from './SettingsForm';
import { SettingsHeader } from './SettingsHeader';
import { CustomTrainingSettingsBox } from './CustomTrainingSettingsBox';
import TrainingControls from './TrainingControls';
import styled from 'styled-components';

const HIDDEN_BREAKPOINT = 1280;

function SettingsColumn(): ReactElement {
  const trainingSettings = useStoreState((store : any) => store.trainingSettings);
  const setTrainingSettings = useStoreActions(
    (store : any) => store.setTrainingSettings,
  );

  const setIsDisplayingSettingsModal = useStoreActions((store: any) => store.setIsDisplayingSettingsModal);
  const isDisplayingSettingsModal = useStoreState((store: any) => store.isDisplayingSettingsModal);

  const updateTrainingSetting = (newProperty: Record<string, unknown>) =>
    setTrainingSettings({ ...trainingSettings, ...newProperty });

  // If the screen size changes from a small size to a large size, show this column
  // If the screen size changes from a large size to a small size, make sure this column is hidden (until the user presses the button to open it again)
 
  const transitionTransform = `transform -translate-x-full transition-transform ${isDisplayingSettingsModal && '-translate-x-0'}`;

  const windowSize = useWindowSize();
  const onClickOutside = () => {
    if (windowSize.width < HIDDEN_BREAKPOINT)
    setIsDisplayingSettingsModal(false);
  };

  const handleSettingsTabClick = () => { //This method is used to handle if someone click the settings button
    const settingsVal = !isDisplayingSettingsModal;
    setIsDisplayingSettingsModal(settingsVal);


  };

  
  return (
    <React.Fragment>
    <SettingsColumnContainer
      isDisplayingModal={isDisplayingSettingsModal}
      onClick={onClickOutside}
    >
      <SettingsHeader transitionTransform={transitionTransform} />
      <SettingsForm
        onSubmit={(e) => {
          e.preventDefault();
        }}
        onClick={(e) => {
          e.stopPropagation();
        }}
        transitionTransform={transitionTransform}
      >  

        <TrainingControls/>      
        <HighlightCheckboxSetting
          trainingSettings={trainingSettings}
          updateTrainingSetting={updateTrainingSetting}
        />

        <RecursionCheckboxSetting
          trainingSettings={trainingSettings}
          updateTrainingSetting={updateTrainingSetting}
        />
        
        <HUDCheckboxSetting
          trainingSettings={trainingSettings}
          updateTrainingSetting={updateTrainingSetting}
        />

        <AutosaveSetting
          trainingSettings={trainingSettings}
          updateTrainingSetting={updateTrainingSetting}
        />

        <AutoCustomSetting />
        <ContrastInputSetting
          trainingSettings={trainingSettings}
          setTrainingSettings={setTrainingSettings}
        />
        <CustomTrainingSettingsBox
          trainingSettings={trainingSettings}
          setTrainingSettings={setTrainingSettings}
        />

        
      

      </SettingsForm>
      
    </SettingsColumnContainer>
        <svg
  onClick={handleSettingsTabClick}
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather xl:ml-8 feather-settings hover:text-gray-400 text-white cursor-pointer active:text-gray-700 ${isDisplayingSettingsModal == true ? 'absolute' : 'absolute'}`}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  </React.Fragment>
  );
}

export default SettingsColumn;
