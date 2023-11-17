import React, { useState } from 'react';
import { CustomTrainingWelcome } from './CustomTrainingWelcome';
import { GearIcon } from '../trainingComponent/GearIcon';
import { StatisticsIcon } from '../trainingComponent/StatisticsIcon';
import { TrainingComponent } from '../trainingComponent/TrainingComponent';
import {
  FullWidthFullHeightContainer,
  SmallScreenButtons,
} from './CustomTrainingTier.styled';

interface CustomTrainingTierProps {
  setCurrentTier: (tier: number) => void;
}

export const CustomTrainingTier = ({
  setCurrentTier,
}: CustomTrainingTierProps) => {
  const [activeTraining, setActiveTraining] = useState<boolean>(false);

  const startTraining = () => {
    setActiveTraining(true);
  };

  return (
    <React.Fragment>
      Under Construction
      {activeTraining ? (
        <>
          <FullWidthFullHeightContainer>
            <SmallScreenButtons>
              <GearIcon />
              <StatisticsIcon />
            </SmallScreenButtons>
            <TrainingComponent setActiveTraining={setActiveTraining} />
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
