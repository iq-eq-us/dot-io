import React, { ReactElement } from 'react';
//import SettingsColumn from './components/SettingsColumn';
import { ConceptsMasteredColumn } from './components/ConceptsMasteredColumns';
import StaticSector from './components/StaticSector';
import { useContrast } from '../../hooks/useContrast';
//import EditChordsModal from './components/EditChordModal';
import { PageContainer } from './concepts-page.styled';
//import useTrainingScenarioAsDocumentTitle from '../../hooks/useTrainingScenarioAsDocumentTitle';
//import { useStoreState } from '../../store/store';
import { Redirect } from 'react-router-dom';

/**
 * This is the main training page.
 * It will adapt its content depending on which training scenario is currently active in the trainingStore.
 * Be sure to check out the contents of the trainingStore to understand the application logic.
 */

function ConceptsPage(): ReactElement {
  //useTrainingScenarioAsDocumentTitle();

  return (
    <PageContainer>
      <ConceptsMasteredColumn />
    </PageContainer>
  );
}

export default ConceptsPage;
