import React, { ReactElement } from 'react';
import styled from 'styled-components';
import CharachorderOverlay from './charachorderOverlay';
import TrainingProgressContainer from './trainingProgressContainer';
import TrainingTextPrompt from './trainingTextPrompt';
import TrainingTextInput from './trainingTextInput';

export default function MainTrainingColumn(): ReactElement {
  return (
    <LocalColumn>
      <TrainingProgressContainer />
      <TrainingTextPrompt />
      <TrainingTextInput />

      <div className="relative h-full w-full">
        <CharachorderOverlay />
      </div>
    </LocalColumn>
  );
}

const LocalColumn = styled.div.attrs({
  className: 'flex flex-col items-center mt-4 relative mx-4 h-full',
})``;
