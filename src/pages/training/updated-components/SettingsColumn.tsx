import React, { ReactElement, useEffect, useState } from 'react';
import useWindowSize, { WindowSize } from '../../../hooks/useWindowSize';
import { useStoreActions, useStoreState } from '../../../store/store';
import { stopPropagation } from '../components/editChordsModal';
import { AutoCustomSetting } from './AutoCustomSetting';
import {
  HighlightCheckboxSetting,
  RecursionCheckboxSetting,
  HUDCheckboxSetting,
} from './CheckboxSettings';
import { ContrastInputSetting } from './ContrastInputSetting';
import { SettingsColumnContainer } from './SettingsColumnContainer';
import { SettingsForm } from './SettingsForm';
import { SettingsHeader } from './SettingsHeader';
import { CustomTrainingSettingsBox } from './SettingsProps';

function SettingsColumn(): ReactElement {
  const trainingSettings = useStoreState((store) => store.trainingSettings);
  const setTrainingSettings = useStoreActions(
    (store) => store.setTrainingSettings,
  );

  const updateTrainingSetting = (newProperty: Record<string, unknown>) =>
    setTrainingSettings({ ...trainingSettings, ...newProperty });

  const screenSize = useWindowSize();
  const [oldScreenSize, setOldScreenSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (oldScreenSize.width > 1280 && screenSize.width <= 1280)
      updateTrainingSetting({
        isDisplayingSettingsModal: false,
      });

    if (oldScreenSize.width <= 1280 && screenSize.width > 1280)
      updateTrainingSetting({
        isDisplayingSettingsModal: true,
      });

    setOldScreenSize(screenSize);
  }, [screenSize]);

  const transitionTransform = `transform -translate-x-full transition-transform ${
    trainingSettings.isDisplayingSettingsModal && '-translate-x-0'
  }`;

  const onClickOutside = () => {
    updateTrainingSetting({ isDisplayingSettingsModal: false });
  };

  const shouldDisplayCustomSettings =
    trainingSettings.autoOrCustom === 'CUSTOM';

  return (
    <SettingsColumnContainer
      isDisplayingModal={trainingSettings.isDisplayingSettingsModal}
      onClick={onClickOutside}
    >
      <SettingsHeader transitionTransform={transitionTransform} />
      <SettingsForm
        onClick={stopPropagation}
        transitionTransform={transitionTransform}
      >
        <HighlightCheckboxSetting
          trainingSettings={trainingSettings}
          updateTrainingSetting={updateTrainingSetting}
        />

        <RecursionCheckboxSetting
          trainingSettings={trainingSettings}
          updateTrainingSetting={updateTrainingSetting}
        ></RecursionCheckboxSetting>

        <HUDCheckboxSetting
          trainingSettings={trainingSettings}
          updateTrainingSetting={updateTrainingSetting}
        ></HUDCheckboxSetting>

        <AutoCustomSetting />

        {shouldDisplayCustomSettings && (
          <CustomTrainingSettingsBox
            trainingSettings={trainingSettings}
            setTrainingSettings={setTrainingSettings}
          ></CustomTrainingSettingsBox>
        )}

        <ContrastInputSetting
          trainingSettings={trainingSettings}
          setTrainingSettings={setTrainingSettings}
        ></ContrastInputSetting>
      </SettingsForm>
    </SettingsColumnContainer>
  );
}

export default SettingsColumn;
