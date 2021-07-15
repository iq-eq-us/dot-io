import React, { ReactElement } from 'react';
import SettingsColumn from './components/SettingsColumn';
import CenterTrainingColumn from './components/CenterTrainingColumn';
import { StatisticsColumn } from './components/StatisticsColumn';
import { useContrast } from '../../hooks/useContrast';
import EditChordsModal from './components/EditChordModal';
import { PageContainer } from './training.styled';

function TrainingPage(): ReactElement {
  const contrast = useContrast();

  return (
    <PageContainer contrast={contrast}>
      <EditChordsModal />

      <SettingsColumn />
      <CenterTrainingColumn />
      <StatisticsColumn />
    </PageContainer>
  );
}

export default TrainingPage;
