import React, { ReactElement } from 'react';
import SettingsColumn from './updated-components/SettingsColumn';
import CenterTrainingColumn from './updated-components/CenterTrainingColumn';
import { StatisticsColumn } from './updated-components/StatisticsColumn';
import styled from 'styled-components';

function TrainingPage(): ReactElement {
  return (
    <PageContainer>
      <SettingsColumn />
      <CenterTrainingColumn />
      <StatisticsColumn />
    </PageContainer>
  );
}

const height = 'height: calc(100vh - 64px);';

const PageContainer = styled.div.attrs({
  className: 'text-gray-600 body-font flex flex-row',
})`
  background-color: #151515;
  ${height}
`;

export default TrainingPage;
