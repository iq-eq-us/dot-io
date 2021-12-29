import React, { ReactElement } from 'react';
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

const HIDDEN_BREAKPOINT = 1280;

function SettingsColumn(): ReactElement {
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const setTrainingSettings = useStoreActions(
    (store) => store.setTrainingSettings,
  );

  const updateTrainingSetting = (newProperty: Record<string, unknown>) =>
    setTrainingSettings({ ...trainingSettings, ...newProperty });

  // If the screen size changes from a small size to a large size, show this column
  // If the screen size changes from a large size to a small size, make sure this column is hidden (until the user presses the button to open it again)
  useScreenSizeBoundary({
    boundary: HIDDEN_BREAKPOINT,
    callback: (direction) => {
      updateTrainingSetting({
        isDisplayingSettingsModal: direction === 'ABOVE',
      });
    },
  });

  const transitionTransform = `transform -translate-x-full transition-transform ${trainingSettings.isDisplayingSettingsModal && '-translate-x-0'}`;

  const windowSize = useWindowSize();
  const onClickOutside = () => {
    if (windowSize.width < HIDDEN_BREAKPOINT)
      updateTrainingSetting({ isDisplayingSettingsModal: false });
  };

  return (
    <SettingsColumnContainer
      isDisplayingModal={trainingSettings.isDisplayingSettingsModal}
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
        <DropDown />
        
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

        <CustomTrainingSettingsBox
          trainingSettings={trainingSettings}
          setTrainingSettings={setTrainingSettings}
        />

        <ContrastInputSetting
          trainingSettings={trainingSettings}
          setTrainingSettings={setTrainingSettings}
        />

      </SettingsForm>
    </SettingsColumnContainer>
  );
}

export default SettingsColumn;
