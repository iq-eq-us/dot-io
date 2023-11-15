import React from 'react';
import { CustomTrainingWelcome } from './CustomTrainingWelcome';
import { FullWidthFullHeightContainer } from './CustomTrainingTier.styled';

interface CustomTrainingTierProps {
  setCurrentTier: (tier: number) => void;
}

export const CustomTrainingTier = ({
  setCurrentTier,
}: CustomTrainingTierProps) => {
  return (
    <React.Fragment>
      <FullWidthFullHeightContainer>
        <CustomTrainingWelcome setCurrentTier={setCurrentTier} />
      </FullWidthFullHeightContainer>
    </React.Fragment>
  );
};
