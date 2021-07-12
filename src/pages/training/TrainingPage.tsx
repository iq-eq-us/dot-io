import React, { ReactElement } from 'react';
import SettingsColumn from './updated-components/SettingsColumn';
import CenterTrainingColumn from './updated-components/CenterTrainingColumn';
import { StatisticsColumn } from './updated-components/StatisticsColumn';
import styled from 'styled-components';
import { ClosingPrompt } from './components/closingPrompt';
import { useContrast } from '../../hooks/useContrast';
import EditChordsModal from './components/editChordsModal';

function TrainingPage(): ReactElement {
  const contrast = useContrast();

  return (
    <PageContainer contrast={contrast}>
      {/* This is responsible for prompting the user if they try and leave the page and don't have Auto Save enabled in the settings, so they don't lose their progress */}
      <ClosingPrompt />
      <EditChordsModal />

      <SettingsColumn />
      <CenterTrainingColumn />
      <StatisticsColumn />
    </PageContainer>
  );
}

const height = 'height: calc(100vh - 64px);';

interface PageContainerProps {
  contrast: string;
}

const PageContainer = styled.div.attrs<PageContainerProps>({
  className: 'text-gray-600 body-font flex flex-row',
})<PageContainerProps>`
  background-color: ${(props) => props.contrast};
  ${height}
`;

export default TrainingPage;
