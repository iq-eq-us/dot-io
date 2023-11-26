import React, { useState } from 'react';
import { CustomTrainingWelcome } from './CustomTrainingWelcome';
import { GearIcon } from '../trainingComponent/GearIcon';
import { StatisticsIcon } from '../trainingComponent/StatisticsIcon';
import { TrainingComponent } from '../trainingComponent/TrainingComponent';
import {
  FullWidthFullHeightContainer,
  SmallScreenButtons,
  ButtonContainer,
  FinishTrainingButton,
} from './CustomTrainingTier.styled';
import { useStoreActions } from '../../../store/store';

interface CustomTrainingTierProps {
  setCurrentTier: (tier: number) => void;
}

export const CustomTrainingTier = ({
  setCurrentTier,
}: CustomTrainingTierProps) => {
  const mergeSessionTrainingData = useStoreActions(
    (actions) => actions.mergeSessionTrainingData,
  );

  const [activeTraining, setActiveTraining] = useState<boolean>(false);

  const startTraining = () => {
    setActiveTraining(true);
  };

  const finishTraining = () => {
    mergeSessionTrainingData();
    setActiveTraining(false);
  };

  return (
    <React.Fragment>
      {activeTraining ? (
        <>
          <FullWidthFullHeightContainer>
            <SmallScreenButtons>
              <GearIcon />
              <StatisticsIcon />
            </SmallScreenButtons>
            <TrainingComponent setActiveTraining={startTraining} />
            <ButtonContainer>
              <FinishTrainingButton onClick={() => finishTraining()}>
                Finish Training
              </FinishTrainingButton>
            </ButtonContainer>
          </FullWidthFullHeightContainer>
        </>
      ) : (
        <FullWidthFullHeightContainer>
          <CustomTrainingWelcome setActiveTraining={startTraining} />
        </FullWidthFullHeightContainer>
      )}
    </React.Fragment>
  );
};
