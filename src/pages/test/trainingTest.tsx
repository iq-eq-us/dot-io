import React, { ReactElement, useEffect } from 'react';
import SettingsColumn from './components/SettingsColumn';
import CenterTrainingColumn from './components/CenterTrainingColumn';
import { StatisticsColumn } from './components/StatisticsColumn';
import { useContrast } from '../../hooks/useContrast';
import EditChordsModal from './components/EditChordModal';
import { PageContainer } from './trainingTest.styled';
import useTrainingScenarioAsDocumentTitle from '../../hooks/useTrainingScenarioAsDocumentTitle';
import { useStoreState, useStoreActions } from '../../store/store';
import { Redirect } from 'react-router-dom';
import TrainingControls from './components/TrainingControls';
import { PreviousTest } from './components/PreviousTests';
import styled from 'styled-components';
import TestCompletePage from '../test-complete/testComplete';

/**
 * This is the main training page.
 * It will adapt its content depending on which training scenario is currently active in the trainingStore.
 * Be sure to check out the contents of the trainingStore to understand the application logic.
 */


function TrainingTestPage(): ReactElement {
  const contrast = useContrast();
  const currentTrainingScenario = useStoreState((store : any) => store.currentTriningScenario);
  const currentTrainingVal = useStoreState((store : any) => store.WordTrainingValues);
  useTrainingScenarioAsDocumentTitle();
  const beginTraining = useStoreActions((store: any) => store.beginTrainingMode);
  const currentTrainingSetting = useStoreState((store : any) => store.trainingSettings);
  const isTrainingTestDone = currentTrainingSetting.isTestDone;
  const wordTestNumber = useStoreState((store : any) => store.wordTestNumber);

  

  //isTrainingTestDone = currentTrainingSetting.setIsDisplayingTestComplete;


  useEffect(() => {
    document.title = "IQ-EQ Test"

    sessionStorage.removeItem("tempTestDeIncrement");
    let payload : any [] = []
    payload.push('LEXICAL');
    if(wordTestNumber != undefined){
      payload.push(wordTestNumber);
    } else{
    payload.push('10');
    }
    beginTraining(payload);    
    
    
  }, []); // <-- dependency array

  return (
    <React.Fragment>
        <PageContainer contrast={contrast}>
      {!currentTrainingScenario &&
        <Redirect to="" />
      }
       {(isTrainingTestDone == false) && (
        <React.Fragment>
        <EditChordsModal />
      <SettingsColumn/>
      <CenterTrainingColumn />
      <PreviousTest/>
      </React.Fragment>
       )}
       {(isTrainingTestDone == true) && (
        <React.Fragment>
        <TestCompletePage/>
      </React.Fragment>
       )}
      
      </PageContainer>
     
          </React.Fragment>

  );
}

export default TrainingTestPage;

const TestandStatsContainer = styled.div.attrs({
  className: 'grid ',
})``;
