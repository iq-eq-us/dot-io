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
      <CharachorderOverlay />
    </LocalColumn>
  );
}

const LocalColumn = styled.div.attrs({
  className: 'flex flex-col items-center mt-4',
})`
  width: 1000px;
`;
