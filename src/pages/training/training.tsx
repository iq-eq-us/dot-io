import React, { ReactElement } from 'react';
import styled from 'styled-components';
import SettingsMenu from './components/settingsMenu';
import MainTrainingColumn from './components/mainTrainingColumn';
import StatisticColumn from './components/statisticColumn';
import { useUpdateTrainingModeOnURLChange } from '../../hooks/useUpdateTrainingModeOnURLChange';
import { ClosingPrompt } from './components/closingPrompt';
import { useContrast } from '../../hooks/useContrast';

const Training = (): ReactElement => {
  useUpdateTrainingModeOnURLChange();
  const backgroundColor = useContrast();

  return (
    <PageContainer {...{ backgroundColor }}>
      <ClosingPrompt />

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

interface Props {
  backgroundColor: string;
}

const PageContainer = styled.div.attrs<Props>({
  className: 'h-screen w-screen text-white',
})`
  font-family: 'Courier New';
  background-color: ${(props) => props.backgroundColor};
`;

const MainContentRow = styled.div.attrs({
  className: 'flex flex-row px-4 justify-between',
})``;

const ContentColumn = styled.div.attrs({
  className: 'flex flex-col',
})``;

export default Training;
