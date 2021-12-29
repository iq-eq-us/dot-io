import React, { ReactElement } from 'react';
import SettingsColumn from './components/SettingsColumn';
import CenterTrainingColumn from './components/CenterTrainingColumn';
import { StatisticsColumn } from './components/StatisticsColumn';
import { useContrast } from '../../hooks/useContrast';
import EditChordsModal from './components/EditChordModal';
import { PageContainer } from './training.styled';
import useTrainingScenarioAsDocumentTitle from '../../hooks/useTrainingScenarioAsDocumentTitle';
import { useStoreState } from '../../store/store';
import { Redirect } from 'react-router-dom';

/**
 * This is the main training page.
 * It will adapt its content depending on which training scenario is currently active in the trainingStore.
 * Be sure to check out the contents of the trainingStore to understand the application logic.
 */

function TrainingPage(): ReactElement {
  const contrast = useContrast();
  const currentTrainingScenario = useStoreState((store) => store.currentTrainingScenario);
  useTrainingScenarioAsDocumentTitle();
  
  return (
    <PageContainer contrast={contrast}>
      {!currentTrainingScenario &&
        <Redirect to="" />
      }
      <EditChordsModal />
      <SettingsColumn />
      <CenterTrainingColumn />
      <StatisticsColumn />
    </PageContainer>
  );
}

export default TrainingPage;

