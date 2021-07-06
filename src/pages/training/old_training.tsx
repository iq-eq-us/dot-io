import React, { ReactElement } from 'react';
import styled from 'styled-components';
import SettingsMenu from './components/settingsMenu';
import MainTrainingColumn from './components/mainTrainingColumn';
import StatisticColumn from './components/statisticColumn';
import { useUpdateTrainingModeOnURLChange } from '../../hooks/useUpdateTrainingModeOnURLChange';
import { ClosingPrompt } from './components/closingPrompt';
import { useContrast } from '../../hooks/useContrast';
import EditChordsModal from './components/editChordsModal';

const Training = (): ReactElement => {
  useUpdateTrainingModeOnURLChange();
  const backgroundColor = useContrast();

  return (
    <PageContainer {...{ backgroundColor }}>
      <ClosingPrompt />
      <EditChordsModal />

      <MainContentRow>
        <FixedWidthColumn width="225px">
          <SettingsMenu />
        </FixedWidthColumn>
        <ContentColumn>
          <MainTrainingColumn />
        </ContentColumn>
        <FixedWidthColumn width="275px">
          <StatisticColumn />
        </FixedWidthColumn>
      </MainContentRow>
    </PageContainer>
  );
};

interface Props {
  backgroundColor: string;
}

const PageContainer = styled.div.attrs<Props>({
  className: 'h-screen w-screen text-white',
})<Props>`
  font-family: 'Courier New';
  background-color: ${(props) => props.backgroundColor};
`;

const MainContentRow = styled.div.attrs({
  className: 'flex flex-row px-4 justify-between',
})``;

const ContentColumn = styled.div.attrs({
  className: 'flex flex-col flex-1 max-w-[1000px]',
})``;

interface WidthProps {
  width: string;
}

const FixedWidthColumn = styled.div.attrs<WidthProps>({
  className: 'flex flex-col flex-1',
})<WidthProps>`
  ${(props) => `width: ${props.width}`};
  ${(props) => `max-width: ${props.width}`};
`;

export default Training;
