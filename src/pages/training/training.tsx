import React, { ReactElement } from 'react';
import styled from 'styled-components';
import SettingsMenu from './components/settingsMenu';
import MainTrainingColumn from './components/mainTrainingColumn';
import StatisticColumn from './components/statisticColumn';
import { useUpdateTrainingModeOnURLChange } from '../../hooks/useUpdateTrainingModeOnURLChange';

const Training = (): ReactElement => {
  useUpdateTrainingModeOnURLChange();

  return (
    <PageContainer>
      <MainContentRow>
        <ContentColumn>
          <SettingsMenu />
        </ContentColumn>
        <ContentColumn>
          <MainTrainingColumn />
        </ContentColumn>
        <ContentColumn>
          <StatisticColumn />
        </ContentColumn>
      </MainContentRow>
    </PageContainer>
  );
};

const PageContainer = styled.div.attrs({
  className: 'bg-black h-screen w-screen text-white',
})``;

const MainContentRow = styled.div.attrs({
  className: 'flex flex-row px-4 justify-between',
})``;

const ContentColumn = styled.div.attrs({
  className: 'flex flex-col',
})``;

export default Training;
